'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge, PriorityBadge } from '@/components/status-badge'
import { Complaint } from '@/lib/types'
import { complaintCategories } from '@/lib/data'
import { cn } from '@/lib/utils'
import { 
  MapPin, 
  Clock, 
  ChevronRight,
  Building,
  Zap,
  Droplets,
  Wifi,
  GraduationCap,
  Shield
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

const categoryIcons = {
  hostel: Building,
  electricity: Zap,
  water: Droplets,
  internet: Wifi,
  academic: GraduationCap,
  security: Shield,
}

interface ComplaintCardProps {
  complaint: Complaint
  className?: string
  showActions?: boolean
}

export function ComplaintCard({ complaint, className, showActions = true }: ComplaintCardProps) {
  const categoryInfo = complaintCategories.find(c => c.id === complaint.category)
  const CategoryIcon = categoryIcons[complaint.category]

  return (
    <Link href={`/complaints/${complaint.id}`}>
      <Card className={cn(
        'hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer group',
        'gradient-fill-hover sparkle-container',
        className
      )}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
              'bg-primary/10 text-primary'
            )}>
              <CategoryIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {complaint.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {categoryInfo?.label}
              </p>
            </div>
            {showActions && (
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {complaint.description}
          </p>

          <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate max-w-[120px]">{complaint.location}</span>
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDistanceToNow(complaint.createdAt, { addSuffix: true })}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge status={complaint.status} />
            <PriorityBadge priority={complaint.priority} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

interface ComplaintCardSkeletonProps {
  className?: string
}

export function ComplaintCardSkeleton({ className }: ComplaintCardSkeletonProps) {
  return (
    <Card className={cn('animate-pulse', className)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-muted" />
          <div className="flex-1">
            <div className="h-5 bg-muted rounded w-3/4 mb-1" />
            <div className="h-3 bg-muted rounded w-1/4" />
          </div>
        </div>
        <div className="h-10 bg-muted rounded mb-3" />
        <div className="flex items-center gap-2 mb-3">
          <div className="h-3 bg-muted rounded w-24" />
          <div className="h-3 bg-muted rounded w-20" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 bg-muted rounded w-16" />
          <div className="h-5 bg-muted rounded w-14" />
        </div>
      </CardContent>
    </Card>
  )
}
