export type UserRole = 'student' | 'lecturer' | 'admin'

export interface User {
  id: string
  fullName: string
  email: string
  role: UserRole
  studentId?: string
  staffId?: string
  faculty?: string
  department?: string
  yearOfStudy?: number
  phone?: string
  bio?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Faculty {
  id: string
  name: string
  departments: Department[]
}

export interface Department {
  id: string
  name: string
  facultyId: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  author: User
  category: 'academic' | 'administrative' | 'event' | 'general'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  createdAt: Date
  expiresAt?: Date
}

export interface Event {
  id: string
  title: string
  description: string
  location: string
  startDate: Date
  endDate: Date
  organizer: User
  category: 'academic' | 'social' | 'sports' | 'career' | 'other'
}

export interface Complaint {
  id: string
  title: string
  description: string
  category: 'facilities' | 'academic' | 'administrative' | 'security' | 'other'
  status: 'pending' | 'in-progress' | 'resolved' | 'closed'
  submittedBy: User
  createdAt: Date
  updatedAt: Date
}

export interface LostFoundItem {
  id: string
  title: string
  description: string
  type: 'lost' | 'found'
  location: string
  date: Date
  contactInfo: string
  image?: string
  status: 'active' | 'resolved'
  submittedBy: User
  createdAt: Date
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'announcement' | 'event' | 'complaint' | 'system'
  read: boolean
  userId: string
  createdAt: Date
}
