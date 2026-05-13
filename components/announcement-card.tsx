'use client'

import { Announcement } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Bookmark, Share2, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface AnnouncementCardProps {
  announcement: Announcement
  variant?: 'default' | 'compact'
  onBookmark?: (id: string) => void
  onShare?: (id: string) => void
  className?: string
}

const categoryColors: Record<string, string> = {
  exams: 'bg-red-500/10 text-red-600 border-red-200',
  registration: 'bg-blue-500/10 text-blue-600 border-blue-200',
  scholarships: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
  events: 'bg-amber-500/10 text-amber-600 border-amber-200',
  general: 'bg-slate-500/10 text-slate-600 border-slate-200',
  all: 'bg-primary/10 text-primary border-primary/20',
}

const priorityColors: Record<string, string> = {
  urgent: 'bg-destructive text-destructive-foreground',
  high: 'bg-amber-500 text-white',
  medium: 'bg-primary text-primary-foreground',
  low: 'bg-muted text-muted-foreground',
}

export function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function AnnouncementCard({
  announcement,
  variant = 'default',
  onBookmark,
  onShare,
  className,
}: AnnouncementCardProps) {
  const categoryLabel = announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)

  if (variant === 'compact') {
    return (
      <Link href={`/announcements/${announcement.id}`}>
        <Card className={cn('overflow-hidden hover:shadow-md transition-shadow cursor-pointer', className)}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant="outline" 
                className={cn('text-xs uppercase font-medium', categoryColors[announcement.category])}
              >
                {categoryLabel}
              </Badge>
              {announcement.priority === 'urgent' || announcement.priority === 'high' ? (
                <Badge className={cn('text-xs', priorityColors[announcement.priority])}>
                  {announcement.priority.toUpperCase()}
                </Badge>
              ) : null}
            </div>
            <h3 className="font-semibold text-foreground line-clamp-1 mb-1">{announcement.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{announcement.excerpt || announcement.content}</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{formatTimeAgo(announcement.createdAt)}</span>
              <span className="mx-1">·</span>
              <span>{announcement.department}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/announcements/${announcement.id}`}>
      <Card className={cn('overflow-hidden hover:shadow-md transition-shadow cursor-pointer group', className)}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge 
                variant="outline" 
                className={cn('text-xs uppercase font-medium', categoryColors[announcement.category])}
              >
                {categoryLabel}
              </Badge>
              {announcement.priority !== 'low' && (
                <Badge className={cn('text-xs', priorityColors[announcement.priority])}>
                  {announcement.priority.toUpperCase()}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onBookmark && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onBookmark(announcement.id)
                  }}
                >
                  <Bookmark className={cn('w-4 h-4', announcement.isBookmarked && 'fill-current')} />
                </Button>
              )}
              {onShare && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onShare(announcement.id)
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          
          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {announcement.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {announcement.excerpt || announcement.content}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{formatTimeAgo(announcement.createdAt)}</span>
              <span className="mx-1">·</span>
              <span>{announcement.department}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
