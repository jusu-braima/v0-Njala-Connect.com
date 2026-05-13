import { Faculty, Announcement, Notification, Course, CourseUpdate } from './types'

export const faculties: Faculty[] = [
  {
    id: 'agriculture',
    name: 'Faculty of Agriculture',
    departments: [
      { id: 'agric-econ', name: 'Agricultural Economics', facultyId: 'agriculture' },
      { id: 'agric-extension', name: 'Agricultural Extension', facultyId: 'agriculture' },
      { id: 'animal-science', name: 'Animal Science', facultyId: 'agriculture' },
      { id: 'crop-science', name: 'Crop Science', facultyId: 'agriculture' },
      { id: 'soil-science', name: 'Soil Science', facultyId: 'agriculture' },
    ],
  },
  {
    id: 'education',
    name: 'Faculty of Education',
    departments: [
      { id: 'edu-admin', name: 'Educational Administration', facultyId: 'education' },
      { id: 'curriculum', name: 'Curriculum Studies', facultyId: 'education' },
      { id: 'guidance', name: 'Guidance & Counselling', facultyId: 'education' },
      { id: 'edu-tech', name: 'Educational Technology', facultyId: 'education' },
    ],
  },
  {
    id: 'environmental',
    name: 'Faculty of Environmental Sciences',
    departments: [
      { id: 'env-science', name: 'Environmental Science', facultyId: 'environmental' },
      { id: 'forestry', name: 'Forestry', facultyId: 'environmental' },
      { id: 'geography', name: 'Geography', facultyId: 'environmental' },
    ],
  },
  {
    id: 'social',
    name: 'Faculty of Social Sciences',
    departments: [
      { id: 'economics', name: 'Economics', facultyId: 'social' },
      { id: 'mass-comm', name: 'Mass Communication', facultyId: 'social' },
      { id: 'political-science', name: 'Political Science', facultyId: 'social' },
      { id: 'sociology', name: 'Sociology', facultyId: 'social' },
    ],
  },
  {
    id: 'basic-sciences',
    name: 'Faculty of Basic Sciences',
    departments: [
      { id: 'biology', name: 'Biological Sciences', facultyId: 'basic-sciences' },
      { id: 'chemistry', name: 'Chemistry', facultyId: 'basic-sciences' },
      { id: 'mathematics', name: 'Mathematics', facultyId: 'basic-sciences' },
      { id: 'physics', name: 'Physics', facultyId: 'basic-sciences' },
    ],
  },
  {
    id: 'community-health',
    name: 'Faculty of Community Health Sciences',
    departments: [
      { id: 'nursing', name: 'Nursing', facultyId: 'community-health' },
      { id: 'public-health', name: 'Public Health', facultyId: 'community-health' },
      { id: 'clinical-sciences', name: 'Clinical Sciences', facultyId: 'community-health' },
    ],
  },
]

export const yearOfStudyOptions = [
  { value: '1', label: 'Year 1' },
  { value: '2', label: 'Year 2' },
  { value: '3', label: 'Year 3' },
  { value: '4', label: 'Year 4' },
  { value: '5', label: 'Year 5 (Postgraduate)' },
]

// Mock Announcements Data
export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Second Semester Examination Timetable Released',
    content: 'The examination timetable for the second semester 2024/2025 academic year has been released. All students are advised to check the academic portal and departmental notice boards for their specific examination schedules. Ensure you arrive at least 30 minutes before each examination. Any clashes should be reported to the Examinations Office immediately.\n\nImportant Notes:\n- Bring your student ID card to all examinations\n- No electronic devices allowed in examination halls\n- Late arrivals beyond 30 minutes will not be admitted',
    excerpt: 'The examination timetable for the second semester has been released. Check the academic portal for details.',
    author: 'Examinations Office',
    department: 'Academic Registry',
    category: 'exams',
    priority: 'high',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Course Registration Deadline Extended',
    content: 'Due to technical difficulties experienced on the student portal, the course registration deadline has been extended by one week. All students who have not completed their registration should do so before the new deadline.\n\nNew Deadline: December 20, 2024\n\nStudents experiencing difficulties should contact the ICT Help Desk or visit the Academic Registry Office.',
    excerpt: 'Course registration deadline extended by one week due to technical issues.',
    author: 'Academic Registry',
    department: 'Academic Registry',
    category: 'registration',
    priority: 'urgent',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: 'New Scholarship Opportunities for 2025',
    content: 'Applications are now open for the following scholarship programs:\n\n1. Government of Sierra Leone Merit Scholarship\n2. African Development Bank Education Grant\n3. Njala University Vice Chancellor\'s Award\n\nEligible students should submit their applications through the Student Affairs Office. Deadline: January 15, 2025.',
    excerpt: 'Applications open for multiple scholarship programs including Government Merit Scholarship.',
    author: 'Student Affairs',
    department: 'Student Affairs Office',
    category: 'scholarships',
    priority: 'medium',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    title: 'Annual Cultural Day Celebration',
    content: 'Join us for the Annual Cultural Day celebration showcasing the rich cultural diversity of Sierra Leone. The event will feature traditional dances, music, fashion shows, and food from all regions.\n\nDate: December 18, 2024\nTime: 10:00 AM - 6:00 PM\nVenue: University Amphitheatre\n\nAll students, staff, and community members are welcome.',
    excerpt: 'Annual Cultural Day celebration featuring traditional dances, music, and food.',
    author: 'Student Union',
    department: 'Student Affairs Office',
    category: 'events',
    priority: 'low',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
  {
    id: '5',
    title: 'Library Operating Hours During Exams',
    content: 'During the examination period, the university library will operate extended hours to support student study needs.\n\nExtended Hours:\n- Monday to Friday: 7:00 AM - 11:00 PM\n- Saturday: 8:00 AM - 10:00 PM\n- Sunday: 9:00 AM - 9:00 PM\n\nThe quiet study areas and computer labs will be available throughout these hours.',
    excerpt: 'Library extends operating hours during examination period.',
    author: 'University Librarian',
    department: 'Library Services',
    category: 'general',
    priority: 'medium',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
  },
  {
    id: '6',
    title: 'Important: Student ID Card Collection',
    content: 'All first-year students who have completed their registration are required to collect their student ID cards from the Student Affairs Office.\n\nRequirements:\n- Receipt of payment\n- Admission letter\n- Two passport photographs\n\nCollection Hours: 9:00 AM - 4:00 PM (Monday - Friday)',
    excerpt: 'First-year students to collect ID cards from Student Affairs Office.',
    author: 'Student Affairs',
    department: 'Student Affairs Office',
    category: 'registration',
    priority: 'medium',
    createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000),
  },
]

// Mock Notifications Data
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'CSC 201 Assignment Deadline Updated',
    message: 'The deadline for Database Systems assignment has been extended to December 15th.',
    type: 'academic',
    read: false,
    userId: 'user-1',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Registration Closes in 2 Days',
    message: 'Complete your course registration before the deadline to avoid late fees.',
    type: 'administrative',
    read: false,
    userId: 'user-1',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: 'Innovation Workshop Tomorrow',
    message: 'Don\'t miss the Tech Innovation Workshop at the Main Hall, 2:00 PM.',
    type: 'event',
    read: false,
    userId: 'user-1',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '4',
    title: 'New Scholarship Opportunity',
    message: 'African Development Bank scholarship applications are now open.',
    type: 'scholarship',
    read: true,
    userId: 'user-1',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '5',
    title: 'Profile Verification Complete',
    message: 'Your student profile has been verified successfully.',
    type: 'system',
    read: true,
    userId: 'user-1',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
  {
    id: '6',
    title: 'New Course Material Available',
    message: 'Lecture slides for MAT 201 Week 10 have been uploaded.',
    type: 'academic',
    read: true,
    userId: 'user-1',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
  },
]

// Mock Courses Data
export const mockCourses: Course[] = [
  {
    id: 'csc201',
    code: 'CSC 201',
    title: 'Database Systems',
    lecturer: 'Dr. Mohamed Kamara',
    credits: 3,
    updateCount: 3,
  },
  {
    id: 'mat201',
    code: 'MAT 201',
    title: 'Linear Algebra',
    lecturer: 'Prof. Fatmata Bangura',
    credits: 3,
    updateCount: 2,
  },
  {
    id: 'csc202',
    code: 'CSC 202',
    title: 'Data Structures & Algorithms',
    lecturer: 'Dr. Ibrahim Sesay',
    credits: 4,
    updateCount: 5,
  },
  {
    id: 'eng201',
    code: 'ENG 201',
    title: 'Technical Writing',
    lecturer: 'Mrs. Mariama Conteh',
    credits: 2,
    updateCount: 1,
  },
  {
    id: 'phy201',
    code: 'PHY 201',
    title: 'Electricity & Magnetism',
    lecturer: 'Dr. Samuel Koroma',
    credits: 3,
    updateCount: 0,
  },
]

// Mock Course Updates Data
export const mockCourseUpdates: CourseUpdate[] = [
  {
    id: 'u1',
    courseId: 'csc201',
    type: 'assignment',
    title: 'Assignment 3: SQL Queries',
    description: 'Complete the SQL query exercises on normalization and joins.',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'u2',
    courseId: 'csc201',
    type: 'material',
    title: 'Lecture Slides: Week 12',
    description: 'Database indexing and query optimization slides uploaded.',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 'u3',
    courseId: 'csc201',
    type: 'announcement',
    title: 'Class Rescheduled',
    description: 'Friday class moved to Monday 10:00 AM in Room LT3.',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
  {
    id: 'u4',
    courseId: 'mat201',
    type: 'quiz',
    title: 'Quiz 4: Eigenvalues',
    description: 'Online quiz on eigenvalues and eigenvectors.',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: 'u5',
    courseId: 'mat201',
    type: 'material',
    title: 'Practice Problems Set 8',
    description: 'Additional practice problems for matrix operations.',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
  },
  {
    id: 'u6',
    courseId: 'csc202',
    type: 'assignment',
    title: 'Project: Binary Search Tree Implementation',
    description: 'Implement a BST with insert, delete, and search operations.',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: 'u7',
    courseId: 'csc202',
    type: 'schedule',
    title: 'Lab Session Change',
    description: 'Lab sessions now on Wednesdays 2-5 PM in Computer Lab 2.',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 'u8',
    courseId: 'eng201',
    type: 'material',
    title: 'Report Writing Guidelines',
    description: 'Updated guidelines for technical report formatting.',
    createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000),
  },
]

// Announcement categories for tabs
export const announcementCategories = [
  { id: 'all', label: 'All' },
  { id: 'exams', label: 'Exams' },
  { id: 'registration', label: 'Registration' },
  { id: 'scholarships', label: 'Scholarships' },
  { id: 'events', label: 'Events' },
  { id: 'general', label: 'General' },
] as const

// Notification type labels
export const notificationTypes = [
  { id: 'all', label: 'All' },
  { id: 'academic', label: 'Academic' },
  { id: 'administrative', label: 'Administrative' },
  { id: 'event', label: 'Events' },
  { id: 'scholarship', label: 'Scholarships' },
  { id: 'system', label: 'System' },
] as const
