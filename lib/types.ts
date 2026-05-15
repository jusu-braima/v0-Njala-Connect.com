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

export type ComplaintCategory = 
  | 'hostel' 
  | 'electricity' 
  | 'water' 
  | 'internet' 
  | 'academic' 
  | 'security'

export type ComplaintStatus = 'pending' | 'in-progress' | 'resolved' | 'rejected'

export type ComplaintPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface ComplaintTimeline {
  id: string
  complaintId: string
  status: ComplaintStatus
  message: string
  updatedBy: string
  createdAt: Date
}

export interface Complaint {
  id: string
  title: string
  description: string
  category: ComplaintCategory
  status: ComplaintStatus
  priority: ComplaintPriority
  location: string
  imageUrl?: string
  submittedBy: User
  assignedTo?: string
  timeline: ComplaintTimeline[]
  createdAt: Date
  updatedAt: Date
}

export type LostFoundCategory = 
  | 'student-id' 
  | 'phone' 
  | 'wallet' 
  | 'laptop' 
  | 'books' 
  | 'keys' 
  | 'others'

export type LostFoundStatus = 'active' | 'claimed' | 'resolved'

export interface LostFoundItem {
  id: string
  title: string
  description: string
  type: 'lost' | 'found'
  category: LostFoundCategory
  location: string
  date: Date
  contactInfo: string
  imageUrl?: string
  status: LostFoundStatus
  submittedBy: User
  claimedBy?: User
  createdAt: Date
}

export interface ItemClaim {
  id: string
  itemId: string
  claimantName: string
  studentId: string
  proofOfOwnership: string
  description: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: Date
}

export interface SupportService {
  id: string
  name: string
  description: string
  icon: string
  contactPhone?: string
  contactEmail?: string
  location?: string
  hours?: string
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
  type: 'announcement' | 'course' | 'event' | 'notification' | 'complaint' | 'lost-found'
  title: string
  description: string
  url: string
}
