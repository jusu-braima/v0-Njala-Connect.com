'use client'

import { useState, useMemo, useEffect } from 'react'
import { BottomNav } from '@/components/bottom-nav'
import { CategoryTabs } from '@/components/category-tabs'
import { NotificationCard } from '@/components/notification-card'
import { EmptyState } from '@/components/empty-state'
import { SkeletonList } from '@/components/skeleton-cards'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { mockNotifications, notificationTypes } from '@/lib/data'
import { Notification } from '@/lib/types'
import { Check, Trash2, Bell } from 'lucide-react'

export default function NotificationsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'all') {
      return notifications
    }
    return notifications.filter(n => n.type === activeFilter)
  }, [notifications, activeFilter])

  const unreadCount = useMemo(() => 
    notifications.filter(n => !n.read).length
  , [notifications])

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      {/* Header - mobile only */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border lg:hidden">
        <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Notifications</h1>
            {unreadCount > 0 && (
              <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs font-medium text-white bg-primary rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="w-4 h-4 mr-1" />
                Read All
              </Button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 pb-3 max-w-lg mx-auto lg:max-w-5xl xl:max-w-6xl">
          <CategoryTabs
            categories={notificationTypes}
            activeCategory={activeFilter}
            onCategoryChange={setActiveFilter}
          />
        </div>
      </header>

      <main className="px-4 py-4 max-w-lg mx-auto lg:max-w-5xl xl:max-w-6xl">
        {isLoading ? (
          <SkeletonList variant="notification" count={4} />
        ) : filteredNotifications.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            ))}
            
            {notifications.length > 0 && (
              <div className="pt-4 text-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={clearAll}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear All Notifications
                </Button>
              </div>
            )}
          </div>
        ) : (
          <EmptyState
            icon="inbox"
            title={activeFilter === 'all' ? "You're All Caught Up!" : 'No Notifications'}
            description={
              activeFilter === 'all'
                ? "You have no new notifications. Check back later for updates."
                : `No ${activeFilter} notifications at the moment.`
            }
          />
        )}
      </main>

      <div className="lg:hidden">
        <BottomNav notificationCount={unreadCount} />
      </div>
    </div>
  )
}
