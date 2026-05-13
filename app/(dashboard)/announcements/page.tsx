'use client'

import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { EmptyState } from '@/components/empty-state'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Clock } from 'lucide-react'

// Mock data for announcements
const mockAnnouncements = [
  {
    id: '1',
    title: 'Examination Timetable Released',
    content: 'The first semester examination timetable has been published. Please check the academic portal for details.',
    category: 'academic',
    priority: 'high',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Library Extended Hours',
    content: 'During examination period, the library will remain open until 10 PM.',
    category: 'administrative',
    priority: 'medium',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: 'Student Union Elections',
    content: 'Student Union elections will be held on December 15th. Nominations are now open.',
    category: 'event',
    priority: 'low',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
]

const priorityColors = {
  urgent: 'bg-destructive text-destructive-foreground',
  high: 'bg-amber-500 text-white',
  medium: 'bg-primary text-primary-foreground',
  low: 'bg-muted text-muted-foreground',
}

const categoryLabels = {
  academic: 'Academic',
  administrative: 'Administrative',
  event: 'Event',
  general: 'General',
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  return `${diffDays}d ago`
}

export default function AnnouncementsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader notificationCount={8} />

      <main className="px-4 py-6 max-w-lg mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-foreground">Announcements</h1>
          <p className="text-sm text-muted-foreground">Stay updated with campus news</p>
        </div>

        {mockAnnouncements.length > 0 ? (
          <div className="space-y-3">
            {mockAnnouncements.map((announcement) => (
              <Card key={announcement.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {categoryLabels[announcement.category as keyof typeof categoryLabels]}
                      </Badge>
                      <Badge className={`text-xs ${priorityColors[announcement.priority as keyof typeof priorityColors]}`}>
                        {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{announcement.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{announcement.content}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimeAgo(announcement.createdAt)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="inbox"
            title="No Announcements"
            description="There are no announcements at this time. Check back later!"
          />
        )}
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
