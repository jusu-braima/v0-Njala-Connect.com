'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/lib/auth-context'
import { mockAnnouncements } from '@/lib/data'
import { formatTimeAgo } from '@/components/announcement-card'
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  Clock, 
  Building2,
  CalendarDays
} from 'lucide-react'
import { cn } from '@/lib/utils'

const categoryColors: Record<string, string> = {
  exams: 'bg-red-500/10 text-red-600 border-red-200',
  registration: 'bg-blue-500/10 text-blue-600 border-blue-200',
  scholarships: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
  events: 'bg-amber-500/10 text-amber-600 border-amber-200',
  general: 'bg-slate-500/10 text-slate-600 border-slate-200',
}

const priorityColors: Record<string, string> = {
  urgent: 'bg-destructive text-destructive-foreground',
  high: 'bg-amber-500 text-white',
  medium: 'bg-primary text-primary-foreground',
  low: 'bg-muted text-muted-foreground',
}

export default function AnnouncementDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params)
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isRead, setIsRead] = useState(false)

  const announcement = mockAnnouncements.find(a => a.id === id)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Mark as read on mount
  useEffect(() => {
    setIsRead(true)
  }, [])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: announcement?.title,
        text: announcement?.excerpt || announcement?.content.slice(0, 100),
        url: window.location.href,
      })
    }
  }

  if (!isAuthenticated) {
    return null
  }

  if (!announcement) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="flex items-center gap-3 px-4 h-14 max-w-lg mx-auto">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-semibold">Announcement Not Found</h1>
          </div>
        </header>
        <main className="px-4 py-8 max-w-lg mx-auto text-center">
          <p className="text-muted-foreground">This announcement could not be found.</p>
          <Button className="mt-4" onClick={() => router.push('/announcements')}>
            Back to Announcements
          </Button>
        </main>
      </div>
    )
  }

  const categoryLabel = announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-semibold truncate">Announcement</h1>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={cn('w-5 h-5', isBookmarked && 'fill-current text-primary')} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Tags */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
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
          {isRead && (
            <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-200">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Read
            </Badge>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground mb-4 text-balance">
          {announcement.title}
        </h1>

        {/* Meta info card */}
        <Card className="mb-6">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Source</p>
                <p className="font-medium text-foreground">{announcement.department}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3 text-sm">
              <CalendarDays className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Published</p>
                <p className="font-medium text-foreground">
                  {announcement.createdAt.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Posted</p>
                <p className="font-medium text-foreground">{formatTimeAgo(announcement.createdAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="prose prose-slate max-w-none">
          <div className="text-foreground whitespace-pre-wrap leading-relaxed">
            {announcement.content}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={cn('w-4 h-4 mr-2', isBookmarked && 'fill-current')} />
            {isBookmarked ? 'Saved' : 'Save'}
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </main>
    </div>
  )
}
