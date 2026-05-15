'use client'

import { cn } from '@/lib/utils'
import { ComplaintTimeline, ComplaintStatus } from '@/lib/types'
import { format } from 'date-fns'
import { Check, Clock, AlertCircle, X, CircleDot } from 'lucide-react'

const statusIcons: Record<ComplaintStatus, React.ComponentType<{ className?: string }>> = {
  pending: Clock,
  'in-progress': CircleDot,
  resolved: Check,
  rejected: X,
}

const statusColors: Record<ComplaintStatus, string> = {
  pending: 'bg-warning text-warning-foreground',
  'in-progress': 'bg-primary text-primary-foreground',
  resolved: 'bg-success text-success-foreground',
  rejected: 'bg-destructive text-destructive-foreground',
}

interface TimelineProps {
  items: ComplaintTimeline[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <AlertCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
        <p>No activity yet</p>
      </div>
    )
  }

  return (
    <div className={cn('relative', className)}>
      {/* Timeline line */}
      <div className="absolute left-[17px] top-3 bottom-3 w-0.5 bg-border" />
      
      <div className="space-y-6">
        {items.map((item, index) => {
          const StatusIcon = statusIcons[item.status]
          const isLast = index === items.length - 1

          return (
            <div key={item.id} className="relative flex gap-4">
              {/* Icon */}
              <div className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10',
                statusColors[item.status]
              )}>
                <StatusIcon className="w-4 h-4" />
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-medium text-sm text-foreground capitalize">
                    {item.status.replace('-', ' ')}
                  </span>
                  <time className="text-xs text-muted-foreground">
                    {format(item.createdAt, 'MMM d, yyyy h:mm a')}
                  </time>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Updated by: {item.updatedBy}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface TimelineSkeletonProps {
  count?: number
  className?: string
}

export function TimelineSkeleton({ count = 3, className }: TimelineSkeletonProps) {
  return (
    <div className={cn('relative animate-pulse', className)}>
      <div className="absolute left-[17px] top-3 bottom-3 w-0.5 bg-muted" />
      
      <div className="space-y-6">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="relative flex gap-4">
            <div className="w-9 h-9 rounded-full bg-muted flex-shrink-0 z-10" />
            <div className="flex-1 pb-2">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="h-4 bg-muted rounded w-24" />
                <div className="h-3 bg-muted rounded w-32" />
              </div>
              <div className="h-10 bg-muted rounded" />
              <div className="h-3 bg-muted rounded w-20 mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
