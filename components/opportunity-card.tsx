'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Opportunity } from '@/lib/types'
import { opportunityCategories } from '@/lib/data'
import { cn } from '@/lib/utils'
import { 
  Calendar, 
  Bookmark,
  ExternalLink,
  ChevronRight,
  Building2,
  Clock,
  AlertCircle
} from 'lucide-react'
import { format, formatDistanceToNow, differenceInDays } from 'date-fns'
import Link from 'next/link'

interface OpportunityCardProps {
  opportunity: Opportunity
  className?: string
  variant?: 'default' | 'compact'
  onSave?: (id: string) => void
  isSaved?: boolean
}

export function DeadlineBadge({ 
  deadline, 
  status,
  className 
}: { 
  deadline: Date
  status: 'open' | 'closing-soon' | 'closed'
  className?: string 
}) {
  const daysUntil = differenceInDays(deadline, new Date())
  
  if (status === 'closed') {
    return (
      <Badge variant="outline" className={cn(
        'bg-muted text-muted-foreground border-muted-foreground/30',
        className
      )}>
        Closed
      </Badge>
    )
  }
  
  if (status === 'closing-soon' || daysUntil <= 7) {
    return (
      <Badge variant="outline" className={cn(
        'bg-destructive/15 text-destructive border-destructive/30',
        className
      )}>
        <AlertCircle className="w-3 h-3 mr-1" />
        {daysUntil <= 0 ? 'Closes today' : `${daysUntil} day${daysUntil !== 1 ? 's' : ''} left`}
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className={cn(
      'bg-success/15 text-success border-success/30',
      className
    )}>
      Open
    </Badge>
  )
}

export function OpportunityCard({ 
  opportunity, 
  className, 
  variant = 'default',
  onSave,
  isSaved = false
}: OpportunityCardProps) {
  const categoryInfo = opportunityCategories.find(c => c.id === opportunity.category)

  if (variant === 'compact') {
    return (
      <Link href={`/opportunities/${opportunity.id}`}>
        <Card className={cn(
          'hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer group',
          'gradient-fill-hover corner-accent',
          className
        )}>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {opportunity.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <span>{opportunity.provider}</span>
                <span className="text-border">|</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(opportunity.deadline, { addSuffix: true })}
                </span>
              </div>
            </div>
            <DeadlineBadge deadline={opportunity.deadline} status={opportunity.status} />
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/opportunities/${opportunity.id}`}>
      <Card className={cn(
        'hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer group',
        'mesh-bg shine-hover sparkle-container',
        className
      )}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
              {categoryInfo?.label}
            </Badge>
            <div className="flex items-center gap-1">
              <DeadlineBadge deadline={opportunity.deadline} status={opportunity.status} />
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={(e) => {
                  e.preventDefault()
                  onSave?.(opportunity.id)
                }}
              >
                <Bookmark className={cn('w-4 h-4', isSaved && 'fill-current text-primary')} />
              </Button>
            </div>
          </div>
          
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
            {opportunity.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-2">
            {opportunity.provider}
          </p>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {opportunity.shortDescription}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>Deadline: {format(opportunity.deadline, 'MMM d, yyyy')}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>

          {opportunity.eligibility && opportunity.eligibility.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground mb-1">Eligibility:</p>
              <p className="text-xs text-foreground line-clamp-1">
                {opportunity.eligibility.slice(0, 2).join(' • ')}
                {opportunity.eligibility.length > 2 && ' ...'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

export function OpportunityCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted" />
          <div className="flex-1">
            <div className="h-4 bg-muted rounded w-3/4 mb-1" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
          <div className="h-5 bg-muted rounded w-16" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="animate-pulse">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="h-5 bg-muted rounded w-24" />
          <div className="h-5 bg-muted rounded w-16" />
        </div>
        <div className="h-5 bg-muted rounded w-full mb-2" />
        <div className="h-4 bg-muted rounded w-1/3 mb-2" />
        <div className="h-10 bg-muted rounded w-full mb-3" />
        <div className="h-3 bg-muted rounded w-40" />
      </CardContent>
    </Card>
  )
}
