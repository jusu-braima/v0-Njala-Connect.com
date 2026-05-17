'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

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

interface MockUser {
  id: string
  email: string
  app_metadata: Record<string, unknown>
  user_metadata: Record<string, unknown>
  aud: string
  created_at: string
}

interface AuthContextType {
  user: MockUser | null
  profile: Profile | null
  isAuthenticated: boolean
  isLoading: boolean
  isAdmin: boolean
  isStaff: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  refreshProfile: () => void
  updateProfile: (data: Partial<Profile>) => Promise<boolean>
}

// Mock users for testing purposes
const MOCK_USERS: Record<string, { password: string; profile: Profile }> = {
  'student@njala.edu.sl': {
    password: 'student123',
    profile: {
      id: 'mock-student-id',
      email: 'student@njala.edu.sl',
      full_name: 'Emmanuel Koroma',
      student_id: '20/ENG/0123',
      department: 'Department of Computer Science',
      role: 'student',
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
      role: 'staff',
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
      role: 'admin',
      avatar_url: null,
      phone: '+232 76 000000',
      bio: 'System administrator for NjalaConnect.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }
}

const STORAGE_KEY = 'njala_auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth from storage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const { user: storedUser, profile: storedProfile } = JSON.parse(stored)
        setUser(storedUser)
        setProfile(storedProfile)
      } catch (e) {
        console.error('Failed to parse stored auth:', e)
        sessionStorage.removeItem(STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const mockUser = MOCK_USERS[email.toLowerCase()]
    
    if (mockUser && mockUser.password === password) {
      const userObj: MockUser = {
        id: mockUser.profile.id,
        email: mockUser.profile.email,
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: mockUser.profile.created_at,
      }
      
      // Save to storage
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        user: userObj,
        profile: mockUser.profile
      }))
      
      setUser(userObj)
      setProfile(mockUser.profile)
      return true
    }
    
    return false
  }

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY)
    setUser(null)
    setProfile(null)
  }

  const refreshProfile = () => {
    // For mock users, profile is already in state
  }

  const updateProfile = async (data: Partial<Profile>): Promise<boolean> => {
    if (!profile) return false
    
    const updatedProfile = { ...profile, ...data }
    setProfile(updatedProfile)
    
    // Update storage
    if (user) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        user,
        profile: updatedProfile
      }))
    }
    
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
