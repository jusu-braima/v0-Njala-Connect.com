'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface SkeletonCardProps {
  variant?: 'announcement' | 'notification' | 'course' | 'dashboard'
  className?: string
}

export function SkeletonCard({ variant = 'announcement', className }: SkeletonCardProps) {
  if (variant === 'announcement') {
    return (
      <Card className={cn('overflow-hidden', className)}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-2/3 mb-3" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-24" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'notification') {
    return (
      <Card className={cn('overflow-hidden', className)}>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-5 w-2/3 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-16 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'course') {
    return (
      <Card className={cn('overflow-hidden', className)}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-5 w-2/3 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-5 w-5 rounded" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'dashboard') {
    return (
      <Card className={cn('overflow-hidden', className)}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-5 w-24 mb-1" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}

export function SkeletonList({ 
  variant = 'announcement', 
  count = 3,
  className 
}: { 
  variant?: 'announcement' | 'notification' | 'course' | 'dashboard'
  count?: number
  className?: string 
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} variant={variant} />
      ))}
    </div>
  )
}
