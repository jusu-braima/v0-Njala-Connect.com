'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User as SupabaseUser } from '@supabase/supabase-js'

export type UserRole = 'student' | 'staff' | 'admin'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  student_id: string | null
  department: string | null
  role: UserRole
  avatar_url: string | null
  phone: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: SupabaseUser | null
  profile: Profile | null
  isAuthenticated: boolean
  isLoading: boolean
  isAdmin: boolean
  isStaff: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  refreshProfile: () => Promise<void>
  updateProfile: (data: Partial<Profile>) => Promise<boolean>
}

// Mock users for testing purposes
const MOCK_USERS = {
  'student@njala.edu.sl': {
    password: 'student123',
    profile: {
      id: 'mock-student-id',
      email: 'student@njala.edu.sl',
      full_name: 'John Student',
      student_id: 'NU2024001',
      department: 'Computer Science',
      role: 'student' as UserRole,
      avatar_url: null,
      phone: '+232 76 123456',
      bio: 'A dedicated computer science student at Njala University.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  },
  'staff@njala.edu.sl': {
    password: 'staff123',
    profile: {
      id: 'mock-staff-id',
      email: 'staff@njala.edu.sl',
      full_name: 'Jane Staff',
      student_id: null,
      department: 'Administration',
      role: 'staff' as UserRole,
      avatar_url: null,
      phone: '+232 76 654321',
      bio: 'Staff member at Njala University.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  },
  'admin@njala.edu.sl': {
    password: 'admin123',
    profile: {
      id: 'mock-admin-id',
      email: 'admin@njala.edu.sl',
      full_name: 'Admin User',
      student_id: null,
      department: 'IT Department',
      role: 'admin' as UserRole,
      avatar_url: null,
      phone: '+232 76 000000',
      bio: 'System administrator for NjalaConnect.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMockUser, setIsMockUser] = useState(false)
  const supabase = createClient()

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }
    return data as Profile
  }, [supabase])

  const refreshProfile = useCallback(async () => {
    if (user) {
      const profileData = await fetchProfile(user.id)
      setProfile(profileData)
    }
  }, [user, fetchProfile])

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
        
        if (session?.user) {
          const profileData = await fetchProfile(session.user.id)
          setProfile(profileData)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          const profileData = await fetchProfile(session.user.id)
          setProfile(profileData)
        } else {
          setProfile(null)
        }
        
        setIsLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, fetchProfile])

  const logout = async () => {
    if (isMockUser) {
      setUser(null)
      setProfile(null)
      setIsMockUser(false)
      return
    }
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  // Login function with mock user support for testing
  const login = async (email: string, password: string): Promise<boolean> => {
    // Check if it's a mock user first (for testing)
    const mockUser = MOCK_USERS[email.toLowerCase() as keyof typeof MOCK_USERS]
    if (mockUser && mockUser.password === password) {
      // Create a mock Supabase user object
      const mockSupabaseUser = {
        id: mockUser.profile.id,
        email: mockUser.profile.email,
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: mockUser.profile.created_at,
      } as SupabaseUser
      
      setUser(mockSupabaseUser)
      setProfile(mockUser.profile)
      setIsMockUser(true)
      return true
    }

    // Try real Supabase authentication
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Login error:', error)
        return false
      }

      if (data.user) {
        setUser(data.user)
        const profileData = await fetchProfile(data.user.id)
        setProfile(profileData)
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const updateProfile = async (data: Partial<Profile>): Promise<boolean> => {
    if (!user) return false

    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.id)

    if (error) {
      console.error('Error updating profile:', error)
      return false
    }

    await refreshProfile()
    return true
  }

  const isAdmin = profile?.role === 'admin'
  const isStaff = profile?.role === 'staff' || profile?.role === 'admin'

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        isLoading,
        isAdmin,
        isStaff,
        login,
        logout,
        refreshProfile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
