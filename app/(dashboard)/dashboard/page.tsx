'use client'

import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { WelcomeBanner } from '@/components/welcome-banner'
import { useAuth } from '@/lib/auth-context'
import { 
  Megaphone, 
  CalendarDays, 
  MessageSquareWarning, 
  SearchX, 
  BookOpen,
  Star,
  ChevronRight,
  LucideIcon
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { mockAnnouncements } from '@/lib/data'
import { formatDistanceToNow } from 'date-fns'

interface QuickAction {
  title: string
  icon: LucideIcon
  href: string
  color: string
  iconColor: string
}

const quickActions: QuickAction[] = [
  {
    title: 'Announcements',
    icon: Megaphone,
    href: '/announcements',
    color: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    title: 'Course Updates',
    icon: BookOpen,
    href: '/courses',
    color: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    title: 'Complaints',
    icon: MessageSquareWarning,
    href: '/complaints',
    color: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    title: 'Lost & Found',
    icon: SearchX,
    href: '/lost-found',
    color: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    title: 'Events',
    icon: CalendarDays,
    href: '/events',
    color: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    title: 'Opportunities',
    icon: Star,
    href: '/opportunities',
    color: 'bg-primary/10',
    iconColor: 'text-primary',
  },
]

function QuickActionCard({ action }: { action: QuickAction }) {
  const Icon = action.icon

  return (
    <Link href={action.href}>
      <Card className="h-full hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer group border border-border">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-2', action.color)}>
            <Icon className={cn('w-6 h-6', action.iconColor)} />
          </div>
          <h3 className="text-xs font-medium text-foreground">
            {action.title}
          </h3>
        </CardContent>
      </Card>
    </Link>
  )
}

// Category badge colors
const categoryColors: Record<string, string> = {
  academic: 'bg-primary text-primary-foreground',
  administrative: 'bg-muted text-muted-foreground',
  event: 'bg-success/15 text-success',
  scholarship: 'bg-warning/15 text-warning',
  general: 'bg-muted text-foreground',
}

function AnnouncementItem({ announcement }: { announcement: typeof mockAnnouncements[0] }) {
  const categoryLabel = announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)
  
  return (
    <Link href={`/announcements/${announcement.id}`}>
      <div className="py-3 border-b border-border last:border-0 hover:bg-muted/30 px-1 -mx-1 rounded transition-colors">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={cn('text-[10px] font-medium h-5', categoryColors[announcement.category] || categoryColors.general)}>
                {categoryLabel.toUpperCase()}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(announcement.createdAt, { addSuffix: true })}
              </span>
            </div>
            <h4 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
              {announcement.title}
            </h4>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {announcement.summary}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              By: {announcement.author}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function DashboardPage() {
  const { profile, isAuthenticated } = useAuth()
  const router = useRouter()
  const [notificationCount, setNotificationCount] = useState(8)

  // Get latest 3 announcements
  const latestAnnouncements = mockAnnouncements.slice(0, 3)

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
      <DashboardHeader notificationCount={notificationCount} />

      <main className="px-4 py-4 max-w-lg mx-auto">
        {/* Welcome Banner */}
        <div className="mb-5">
          <WelcomeBanner userName={profile?.full_name || undefined} />
        </div>

        {/* Quick Access Section */}
        <div className="mb-5">
          <h2 className="text-base font-semibold text-foreground mb-3">Quick Access</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <QuickActionCard key={action.href} action={action} />
            ))}
          </div>
        </div>

        {/* Latest Announcements Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">Latest Announcement</h2>
            <Link href="/announcements" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <Card className="border border-border">
            <CardContent className="p-3">
              {latestAnnouncements.map((announcement) => (
                <AnnouncementItem key={announcement.id} announcement={announcement} />
              ))}
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNav notificationCount={notificationCount} />
    </div>
  )
}
