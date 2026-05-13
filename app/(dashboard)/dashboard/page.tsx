'use client'

import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { WelcomeBanner } from '@/components/welcome-banner'
import { useAuth } from '@/lib/auth-context'
import { 
  Megaphone, 
  CalendarDays, 
  MessageSquareWarning, 
  Search, 
  Briefcase, 
  BookOpen,
  LucideIcon
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface QuickAction {
  title: string
  description: string
  icon: LucideIcon
  href: string
  count?: number
  color: string
}

const quickActions: QuickAction[] = [
  {
    title: 'Announcements',
    description: 'Latest campus news',
    icon: Megaphone,
    href: '/announcements',
    count: 5,
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    title: 'Course Updates',
    description: 'Academic notices',
    icon: BookOpen,
    href: '/courses',
    count: 3,
    color: 'bg-emerald-500/10 text-emerald-600',
  },
  {
    title: 'Complaints',
    description: 'Report issues',
    icon: MessageSquareWarning,
    href: '/complaints',
    color: 'bg-amber-500/10 text-amber-600',
  },
  {
    title: 'Lost & Found',
    description: 'Find or report items',
    icon: Search,
    href: '/lost-found',
    color: 'bg-purple-500/10 text-purple-600',
  },
  {
    title: 'Events',
    description: 'Campus activities',
    icon: CalendarDays,
    href: '/events',
    count: 2,
    color: 'bg-rose-500/10 text-rose-600',
  },
  {
    title: 'Opportunities',
    description: 'Jobs & internships',
    icon: Briefcase,
    href: '/opportunities',
    color: 'bg-teal-500/10 text-teal-600',
  },
]

function QuickActionCard({ action }: { action: QuickAction }) {
  const Icon = action.icon

  return (
    <Link href={action.href}>
      <Card className="h-full hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer group">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', action.color)}>
              <Icon className="w-5 h-5" />
            </div>
            {action.count && action.count > 0 && (
              <Badge className="bg-primary text-primary-foreground text-xs">
                {action.count}
              </Badge>
            )}
          </div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {action.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {action.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [notificationCount, setNotificationCount] = useState(8)

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

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Welcome Banner */}
        <div className="mb-6">
          <WelcomeBanner userName={user?.fullName} />
        </div>

        {/* Section Title */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Quick Access</h2>
          <p className="text-sm text-muted-foreground">What would you like to do today?</p>
        </div>

        {/* 2x3 Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <QuickActionCard key={action.href} action={action} />
          ))}
        </div>
      </main>

      <BottomNav notificationCount={notificationCount} />
    </div>
  )
}
