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
  logout: () => Promise<void>
  refreshProfile: () => Promise<void>
  updateProfile: (data: Partial<Profile>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
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
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
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
