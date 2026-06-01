'use client'

import { useState, useEffect } from 'react'
import { BottomNav } from '@/components/bottom-nav'
import { CourseCard } from '@/components/course-card'
import { EmptyState } from '@/components/empty-state'
import { SkeletonList } from '@/components/skeleton-cards'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { mockCourses } from '@/lib/data'
import { BookOpen, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CoursesPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const totalUpdates = mockCourses.reduce((sum, course) => sum + course.updateCount, 0)

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      {/* Header - mobile only */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border lg:hidden">
        <div className="flex items-center gap-3 px-4 h-14 max-w-lg mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Course Updates</h1>
          </div>
          {totalUpdates > 0 && (
            <span className="ml-auto min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs font-medium text-white bg-primary rounded-full">
              {totalUpdates}
            </span>
          )}
        </div>
      </header>

      <main className="px-4 py-4 max-w-lg mx-auto lg:max-w-5xl xl:max-w-6xl">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {mockCourses.length} registered courses
          </p>
        </div>

        {isLoading ? (
          <SkeletonList variant="course" count={5} />
        ) : mockCourses.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            {mockCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="file"
            title="No Courses Found"
            description="You haven't registered for any courses yet."
          />
        )}
      </main>

      <div className="lg:hidden">
        <BottomNav notificationCount={3} />
      </div>
    </div>
  )
}
