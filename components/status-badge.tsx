'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ComplaintStatus, LostFoundStatus, ComplaintPriority } from '@/lib/types'

interface StatusBadgeProps {
  status: ComplaintStatus | LostFoundStatus
  className?: string
}

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-warning/15 text-warning border-warning/30',
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-primary/15 text-primary border-primary/30',
  },
  resolved: {
    label: 'Resolved',
    className: 'bg-success/15 text-success border-success/30',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-destructive/15 text-destructive border-destructive/30',
  },
  active: {
    label: 'Active',
    className: 'bg-primary/15 text-primary border-primary/30',
  },
  claimed: {
    label: 'Claimed',
    className: 'bg-success/15 text-success border-success/30',
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pending

  return (
    <Badge
      variant="outline"
      className={cn('font-medium', config.className, className)}
    >
      {config.label}
    </Badge>
  )
}

interface PriorityBadgeProps {
  priority: ComplaintPriority
  className?: string
}

const priorityConfig: Record<ComplaintPriority, { label: string; className: string }> = {
  low: {
    label: 'Low',
    className: 'bg-muted text-muted-foreground border-muted-foreground/30',
  },
  medium: {
    label: 'Medium',
    className: 'bg-primary/15 text-primary border-primary/30',
  },
  high: {
    label: 'High',
    className: 'bg-warning/15 text-warning border-warning/30',
  },
  urgent: {
    label: 'Urgent',
    className: 'bg-destructive/15 text-destructive border-destructive/30',
  },
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority]

  return (
    <Badge
      variant="outline"
      className={cn('font-medium', config.className, className)}
    >
      {config.label}
    </Badge>
  )
}

interface TypeBadgeProps {
  type: 'lost' | 'found'
  className?: string
}

export function TypeBadge({ type, className }: TypeBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'font-medium',
        type === 'lost' 
          ? 'bg-destructive/15 text-destructive border-destructive/30'
          : 'bg-success/15 text-success border-success/30',
        className
      )}
    >
      {type === 'lost' ? 'Lost' : 'Found'}
    </Badge>
  )
}
