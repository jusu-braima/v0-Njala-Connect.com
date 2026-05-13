'use client'

import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { EmptyState } from '@/components/empty-state'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Bell, Check, Megaphone, CalendarDays, MessageSquareWarning, Info } from 'lucide-react'

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    title: 'New Announcement',
    message: 'Examination timetable has been released. Check announcements for details.',
    type: 'announcement',
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Event Reminder',
    message: 'Student Union meeting tomorrow at 2 PM in the Main Hall.',
    type: 'event',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: 'Complaint Update',
    message: 'Your complaint about hostel facilities has been marked as in-progress.',
    type: 'complaint',
    read: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '4',
    title: 'System Notice',
    message: 'Profile verification completed successfully.',
    type: 'system',
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
]

const typeIcons = {
  announcement: Megaphone,
  event: CalendarDays,
  complaint: MessageSquareWarning,
  system: Info,
}

const typeColors = {
  announcement: 'bg-primary/10 text-primary',
  event: 'bg-emerald-500/10 text-emerald-600',
  complaint: 'bg-amber-500/10 text-amber-600',
  system: 'bg-muted text-muted-foreground',
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  return `${diffDays}d ago`
}

export default function NotificationsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState(mockNotifications)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader notificationCount={unreadCount} />

      <main className="px-4 py-6 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-foreground">Notifications</h1>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <Check className="w-4 h-4 mr-1" />
              Mark all read
            </Button>
          )}
        </div>

        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => {
              const Icon = typeIcons[notification.type as keyof typeof typeIcons]
              const colorClass = typeColors[notification.type as keyof typeof typeColors]

              return (
                <Card 
                  key={notification.id} 
                  className={`overflow-hidden cursor-pointer transition-colors ${!notification.read ? 'bg-primary/5 border-primary/20' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className={`font-medium text-foreground ${!notification.read ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatTimeAgo(notification.createdAt)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <EmptyState
            icon="inbox"
            title="No Notifications"
            description="You're all caught up! Check back later for updates."
          />
        )}
      </main>

      <BottomNav notificationCount={unreadCount} />
    </div>
  )
}
