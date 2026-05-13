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

export type AnnouncementCategory = 'all' | 'exams' | 'registration' | 'scholarships' | 'events' | 'general'

export interface Announcement {
  id: string
  title: string
  content: string
  excerpt?: string
  author: string
  department: string
  category: AnnouncementCategory
  priority: 'low' | 'medium' | 'high' | 'urgent'
  isBookmarked?: boolean
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

export type NotificationType = 'academic' | 'administrative' | 'event' | 'scholarship' | 'system'

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  userId: string
  createdAt: Date
}

export interface Course {
  id: string
  code: string
  title: string
  lecturer: string
  credits: number
  updateCount: number
}

export interface CourseUpdate {
  id: string
  courseId: string
  type: 'assignment' | 'material' | 'schedule' | 'quiz' | 'announcement'
  title: string
  description: string
  dueDate?: Date
  createdAt: Date
}

export interface SearchResult {
  id: string
  type: 'announcement' | 'course' | 'event' | 'notification'
  title: string
  description: string
  url: string
}
