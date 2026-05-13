'use client'

import { use, useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { EmptyState } from '@/components/empty-state'
import { SkeletonList } from '@/components/skeleton-cards'
import { useAuth } from '@/lib/auth-context'
import { mockCourses, mockCourseUpdates } from '@/lib/data'
import { CourseUpdate } from '@/lib/types'
import { formatTimeAgo } from '@/components/announcement-card'
import { 
  ArrowLeft, 
  BookOpen, 
  User,
  FileText,
  CalendarClock,
  ClipboardList,
  HelpCircle,
  Megaphone,
  Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'

const updateTypeConfig: Record<CourseUpdate['type'], { icon: typeof FileText; color: string; label: string }> = {
  assignment: {
    icon: ClipboardList,
    color: 'bg-blue-500/10 text-blue-600',
    label: 'Assignment',
  },
  material: {
    icon: FileText,
    color: 'bg-emerald-500/10 text-emerald-600',
    label: 'Material',
  },
  schedule: {
    icon: CalendarClock,
    color: 'bg-amber-500/10 text-amber-600',
    label: 'Schedule Change',
  },
  quiz: {
    icon: HelpCircle,
    color: 'bg-purple-500/10 text-purple-600',
    label: 'Quiz',
  },
  announcement: {
    icon: Megaphone,
    color: 'bg-rose-500/10 text-rose-600',
    label: 'Announcement',
  },
}

export default function CourseDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params)
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const course = mockCourses.find(c => c.id === id)
  const updates = useMemo(() => 
    mockCourseUpdates.filter(u => u.courseId === id).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )
  , [id])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (!isAuthenticated) {
    return null
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="flex items-center gap-3 px-4 h-14 max-w-lg mx-auto">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-semibold">Course Not Found</h1>
          </div>
        </header>
        <main className="px-4 py-8 max-w-lg mx-auto text-center">
          <p className="text-muted-foreground">This course could not be found.</p>
          <Button className="mt-4" onClick={() => router.push('/courses')}>
            Back to Courses
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14 max-w-lg mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold truncate">{course.code}</h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Course Info Card */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-primary">{course.code}</p>
                <h2 className="text-lg font-bold text-foreground">{course.title}</h2>
                <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{course.lecturer}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">{course.credits} Credits</Badge>
                  {course.updateCount > 0 && (
                    <Badge className="bg-primary text-primary-foreground">
                      {course.updateCount} Updates
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Activity Feed</h3>
          <p className="text-sm text-muted-foreground">Recent updates from this course</p>
        </div>

        {isLoading ? (
          <SkeletonList variant="notification" count={3} />
        ) : updates.length > 0 ? (
          <div className="space-y-3">
            {updates.map((update) => {
              const config = updateTypeConfig[update.type]
              const Icon = config.icon

              return (
                <Card key={update.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                        config.color
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Badge variant="outline" className="text-xs">
                            {config.label}
                          </Badge>
                          {update.dueDate && (
                            <Badge variant="secondary" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              Due {formatTimeAgo(update.dueDate)}
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-medium text-foreground mt-2">
                          {update.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {update.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Posted {formatTimeAgo(update.createdAt)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <EmptyState
            icon="inbox"
            title="No Updates Yet"
            description="There are no updates for this course at the moment."
          />
        )}
      </main>
    </div>
  )
}
