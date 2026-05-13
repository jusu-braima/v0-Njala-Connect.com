'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { User, UserRole } from '@/lib/types'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock login - in production, this would call a real API
    if (email && password) {
      const mockUser: User = {
        id: '1',
        fullName: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email,
        role: email.includes('admin') ? 'admin' : email.includes('staff') ? 'lecturer' : 'student',
        studentId: email.includes('student') ? 'NU2024001' : undefined,
        department: 'Computer Science',
        faculty: 'Faculty of Basic Sciences',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setUser(mockUser)
      setIsLoading(false)
      return true
    }
    setIsLoading(false)
    return false
  }

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newUser: User = {
      id: Date.now().toString(),
      fullName: userData.fullName || '',
      email: userData.email || '',
      role: userData.role as UserRole || 'student',
      studentId: userData.studentId,
      department: userData.department,
      faculty: userData.faculty,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setUser(newUser)
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (user) {
      setUser({
        ...user,
        ...data,
        updatedAt: new Date(),
      })
    }
    setIsLoading(false)
    return true
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
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
