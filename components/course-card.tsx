'use client'

import { Course } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ChevronRight, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface CourseCardProps {
  course: Course
  className?: string
}

export function CourseCard({ course, className }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className={cn('overflow-hidden hover:shadow-md transition-shadow cursor-pointer group gradient-fill-hover corner-accent', className)}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-primary">{course.code}</p>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                </div>
                {course.updateCount > 0 && (
                  <Badge className="bg-primary text-primary-foreground">
                    {course.updateCount} new
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                <User className="w-3.5 h-3.5" />
                <span className="line-clamp-1">{course.lecturer}</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 self-center" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
