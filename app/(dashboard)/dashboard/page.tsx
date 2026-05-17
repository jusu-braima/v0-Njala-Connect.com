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
  LucideIcon,
  Bell
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

function QuickActionCard({ action, index }: { action: QuickAction; index: number }) {
  const Icon = action.icon
  const delayClass = `animate-delay-${(index + 1) * 100}`

  return (
    <Link href={action.href}>
      <Card className={cn(
        'h-full card-hover cursor-pointer group border border-border animate-initial animate-fade-in-up',
        delayClass
      )}>
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110',
            action.color
          )}>
            <Icon className={cn('w-6 h-6 transition-transform duration-300 group-hover:scale-110', action.iconColor)} />
          </div>
          <h3 className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
            {action.title}
          </h3>
        </CardContent>
      </Card>
    </Link>
  )
}

// Category badge colors
const categoryColors: Record<string, string> = {
  exams: 'bg-primary text-white',
  registration: 'bg-blue-500 text-white',
  events: 'bg-amber-500 text-white',
  scholarships: 'bg-emerald-500 text-white',
  general: 'bg-slate-500 text-white',
}

function AnnouncementItem({ announcement, index }: { announcement: typeof mockAnnouncements[0]; index: number }) {
  const categoryLabel = announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)
  const delayClass = `animate-delay-${(index + 1) * 100}`
  
  return (
    <Link href={`/announcements/${announcement.id}`}>
      <div className={cn(
        'py-3 border-b border-border last:border-0 hover:bg-muted/30 px-1 -mx-1 rounded transition-all duration-300 animate-initial animate-slide-in-right',
        delayClass
      )}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={cn('text-[10px] font-medium h-5 rounded', categoryColors[announcement.category] || categoryColors.general)}>
                {categoryLabel.toUpperCase()}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(announcement.createdAt, { addSuffix: false })}
              </span>
            </div>
            <h4 className="font-medium text-sm text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
              {announcement.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              By: {announcement.author}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function DashboardPage() {
  const { profile, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [notificationCount, setNotificationCount] = useState(8)

  // Get latest 3 announcements
  const latestAnnouncements = mockAnnouncements.slice(0, 3)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const userName = profile?.full_name || 'Student'

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Custom Home Header */}
      <header className="bg-background border-b border-border sticky top-0 z-40 lg:hidden animate-fade-in-down">
        <div className="flex items-center justify-between px-4 h-16 max-w-lg mx-auto">
          <div>
            <p className="text-sm text-muted-foreground">Hello,</p>
            <h1 className="text-lg font-semibold text-foreground">{userName}</h1>
          </div>
          <Link href="/notifications">
            <button className="relative p-2 rounded-full hover:bg-muted transition-all duration-300 btn-press hover:scale-110">
              <Bell className="w-6 h-6 text-foreground" />
              {notificationCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-medium text-white bg-destructive rounded-full px-1 notification-pulse">
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </button>
          </Link>
        </div>
      </header>

      <main className="px-4 py-4 max-w-lg mx-auto">
        {/* Welcome Banner */}
        <div className="mb-5 animate-fade-in-up">
          <WelcomeBanner userName={userName} />
        </div>

        {/* Quick Access Section */}
        <div className="mb-5">
          <h2 className="text-base font-semibold text-foreground mb-3 animate-initial animate-fade-in-up animate-delay-100">Quick Access</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action, index) => (
              <QuickActionCard key={action.href} action={action} index={index} />
            ))}
          </div>
        </div>

        {/* Latest Announcements Section */}
        <div className="animate-initial animate-fade-in-up animate-delay-700">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">Latest Announcement</h2>
            <Link href="/announcements" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline group transition-colors">
              View all
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <Card className="border border-border card-hover">
            <CardContent className="p-3">
              {latestAnnouncements.map((announcement, index) => (
                <AnnouncementItem key={announcement.id} announcement={announcement} index={index} />
              ))}
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNav notificationCount={notificationCount} />
    </div>
  )
}
