'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EngagementFeedItem, EngagementFeedType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { 
  Calendar, 
  Gift, 
  Users,
  Megaphone,
  ChevronRight
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

const feedTypeConfig: Record<EngagementFeedType, { 
  icon: typeof Calendar
  label: string
  className: string 
}> = {
  event: {
    icon: Calendar,
    label: 'Event',
    className: 'bg-primary/15 text-primary border-primary/30',
  },
  opportunity: {
    icon: Gift,
    label: 'Opportunity',
    className: 'bg-warning/15 text-warning border-warning/30',
  },
  organization: {
    icon: Users,
    label: 'Organization',
    className: 'bg-success/15 text-success border-success/30',
  },
  announcement: {
    icon: Megaphone,
    label: 'Announcement',
    className: 'bg-destructive/15 text-destructive border-destructive/30',
  },
}

interface EngagementFeedCardProps {
  item: EngagementFeedItem
  className?: string
}

export function EngagementFeedCard({ item, className }: EngagementFeedCardProps) {
  const config = feedTypeConfig[item.type]
  const Icon = config.icon

  return (
    <Link href={item.actionUrl}>
      <Card className={cn(
        'hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer group',
        'shine-hover gradient-fill-hover',
        className
      )}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
              'bg-primary/10'
            )}>
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge 
                  variant="outline" 
                  className={cn('text-xs', config.className)}
                >
                  {config.label}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(item.createdAt, { addSuffix: true })}
                </span>
              </div>
              <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {item.title}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                {item.description}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export function EngagementFeedCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-4 bg-muted rounded w-16" />
              <div className="h-3 bg-muted rounded w-20" />
            </div>
            <div className="h-4 bg-muted rounded w-3/4 mb-1" />
            <div className="h-3 bg-muted rounded w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
