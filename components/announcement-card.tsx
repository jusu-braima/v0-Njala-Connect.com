'use client'

import { Announcement } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Bookmark, Share2, ChevronRight, Sparkles, AlertCircle, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface AnnouncementCardProps {
  announcement: Announcement
  variant?: 'default' | 'compact'
  onBookmark?: (id: string) => void
  onShare?: (id: string) => void
  className?: string
}

const categoryColors: Record<string, string> = {
  exams: 'bg-rose-500/10 text-rose-600 border-rose-200/50',
  registration: 'bg-blue-500/10 text-blue-600 border-blue-200/50',
  scholarships: 'bg-emerald-500/10 text-emerald-600 border-emerald-200/50',
  events: 'bg-amber-500/10 text-amber-600 border-amber-200/50',
  general: 'bg-slate-500/10 text-slate-600 border-slate-200/50',
  all: 'bg-primary/10 text-primary border-primary/20',
}

const categoryGradients: Record<string, string> = {
  exams: 'from-rose-500 to-pink-500',
  registration: 'from-blue-500 to-cyan-500',
  scholarships: 'from-emerald-500 to-teal-500',
  events: 'from-amber-500 to-orange-500',
  general: 'from-slate-500 to-gray-500',
}

const priorityColors: Record<string, string> = {
  urgent: 'bg-gradient-to-r from-red-500 to-rose-500 text-white border-0',
  high: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0',
  medium: 'bg-primary text-primary-foreground border-0',
  low: 'bg-muted text-muted-foreground border-0',
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
  const isUrgent = announcement.priority === 'urgent' || announcement.priority === 'high'

  if (variant === 'compact') {
    return (
      <Link href={`/announcements/${announcement.id}`}>
        <motion.div
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className={cn(
            'overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group border-border/50',
            'gradient-fill-hover',
            isUrgent && 'border-l-4 border-l-rose-500',
            className
          )}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge 
                  variant="outline" 
                  className={cn('text-[10px] uppercase font-bold tracking-wider', categoryColors[announcement.category])}
                >
                  {categoryLabel}
                </Badge>
                {isUrgent && (
                  <Badge className={cn('text-[10px] font-bold', priorityColors[announcement.priority])}>
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {announcement.priority.toUpperCase()}
                  </Badge>
                )}
              </div>
              <h3 className="font-bold text-foreground line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                {announcement.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{announcement.excerpt || announcement.content}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(announcement.createdAt)}</span>
                <span className="mx-1 text-border">|</span>
                <span>{announcement.department}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Link>
    )
  }

  return (
    <Link href={`/announcements/${announcement.id}`}>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className={cn(
          'overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer group border-border/50 relative',
          'orbs-bg noise-overlay sparkle-container',
          isUrgent && 'border-l-4 border-l-rose-500',
          className
        )}>
          {/* Gradient overlay on hover */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300",
            categoryGradients[announcement.category] || categoryGradients.general
          )} />
          
          {/* Urgent indicator */}
          {isUrgent && (
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
              <div className={cn(
                "absolute top-2 -right-6 w-24 text-center text-[8px] font-bold text-white py-1 transform rotate-45 shadow-sm",
                announcement.priority === 'urgent' ? 'bg-rose-500' : 'bg-amber-500'
              )}>
                {announcement.priority.toUpperCase()}
              </div>
            </div>
          )}

          <CardContent className="p-5 relative z-10">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge 
                  variant="outline" 
                  className={cn('text-[10px] uppercase font-bold tracking-wider', categoryColors[announcement.category])}
                >
                  {categoryLabel}
                </Badge>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {onBookmark && (
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-lg"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onBookmark(announcement.id)
                      }}
                    >
                      <Bookmark className={cn('w-4 h-4', announcement.isBookmarked && 'fill-primary text-primary')} />
                    </Button>
                  </motion.div>
                )}
                {onShare && (
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-lg"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onShare(announcement.id)
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
            
            <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors font-display text-lg">
              {announcement.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {announcement.excerpt || announcement.content}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted/50">
                  <TrendingUp className="w-3 h-3" />
                  <span>{formatTimeAgo(announcement.createdAt)}</span>
                </div>
                <span className="px-2 py-1 rounded-full bg-muted/50">{announcement.department}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}
