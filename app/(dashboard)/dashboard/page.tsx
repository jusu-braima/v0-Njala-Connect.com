'use client'

import { BottomNav } from '@/components/bottom-nav'
import { WelcomeBanner } from '@/components/welcome-banner'
import { useAuth } from '@/lib/auth-context'
import { 
  Megaphone, 
  CalendarDays, 
  MessageSquareWarning, 
  SearchX, 
  BookOpen,
  Gift,
  ChevronRight,
  LucideIcon,
  Bell,
  Sparkles,
  TrendingUp
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { mockAnnouncements } from '@/lib/data'
import { formatDistanceToNow } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'

interface QuickAction {
  title: string
  description: string
  icon: LucideIcon
  href: string
  bgColor: string
  iconBgColor: string
  iconColor: string
  arrowBgColor: string
  arrowColor: string
}

const quickActions: QuickAction[] = [
  {
    title: 'Announcements',
    description: 'Stay updated with the latest news and notices.',
    icon: Megaphone,
    href: '/announcements',
    bgColor: 'bg-blue-50',
    iconBgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    arrowBgColor: 'bg-blue-100',
    arrowColor: 'text-blue-600',
  },
  {
    title: 'Course Updates',
    description: 'Check the latest updates and materials for your courses.',
    icon: BookOpen,
    href: '/courses',
    bgColor: 'bg-violet-50',
    iconBgColor: 'bg-violet-100',
    iconColor: 'text-violet-600',
    arrowBgColor: 'bg-violet-100',
    arrowColor: 'text-violet-600',
  },
  {
    title: 'Complaints',
    description: 'Raise an issue or track the status of your complaints.',
    icon: MessageSquareWarning,
    href: '/complaints',
    bgColor: 'bg-rose-50',
    iconBgColor: 'bg-rose-100',
    iconColor: 'text-rose-600',
    arrowBgColor: 'bg-rose-100',
    arrowColor: 'text-rose-600',
  },
  {
    title: 'Lost & Found',
    description: 'Report or find lost items on campus.',
    icon: SearchX,
    href: '/lost-found',
    bgColor: 'bg-slate-50',
    iconBgColor: 'bg-slate-100',
    iconColor: 'text-slate-600',
    arrowBgColor: 'bg-slate-100',
    arrowColor: 'text-slate-600',
  },
  {
    title: 'Events',
    description: 'Explore upcoming events and activities.',
    icon: CalendarDays,
    href: '/events',
    bgColor: 'bg-amber-50',
    iconBgColor: 'bg-amber-100',
    iconColor: 'text-amber-600',
    arrowBgColor: 'bg-amber-100',
    arrowColor: 'text-amber-600',
  },
  {
    title: 'Opportunities',
    description: 'Discover internships, jobs and other opportunities.',
    icon: Gift,
    href: '/opportunities',
    bgColor: 'bg-emerald-50',
    iconBgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    arrowBgColor: 'bg-emerald-100',
    arrowColor: 'text-emerald-600',
  },
]

function QuickActionCard({ action, index }: { action: QuickAction; index: number }) {
  const Icon = action.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.08,
        duration: 0.5
      }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={action.href}>
        <Card className={cn(
          'h-full cursor-pointer group border border-border/40 rounded-2xl overflow-hidden relative min-h-[220px]',
          'transition-all duration-300 hover:shadow-xl hover:shadow-black/5',
          action.bgColor
        )}>
          {/* Content */}
          <div className="p-5 flex flex-col h-full">
            {/* Icon circle */}
            <div 
              className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm',
                action.iconBgColor
              )}
            >
              <Icon className={cn('w-8 h-8', action.iconColor)} strokeWidth={1.5} />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-foreground mb-2">
              {action.title}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {action.description}
            </p>

            {/* Arrow button at bottom */}
            <div className="mt-4 flex justify-start">
              <motion.div 
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center shadow-sm',
                  action.arrowBgColor
                )}
                whileHover={{ scale: 1.1, x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className={cn('w-5 h-5', action.arrowColor)} strokeWidth={2.5} />
              </motion.div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

// Category badge colors
const categoryColors: Record<string, string> = {
  exams: 'bg-rose-500 text-white',
  registration: 'bg-blue-500 text-white',
  events: 'bg-amber-500 text-white',
  scholarships: 'bg-emerald-500 text-white',
  general: 'bg-slate-500 text-white',
}

function AnnouncementItem({ announcement, index }: { announcement: typeof mockAnnouncements[0]; index: number }) {
  const categoryLabel = announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + index * 0.1 }}
      whileHover={{ x: 4 }}
    >
      <Link href={`/announcements/${announcement.id}`}>
        <div className='py-3.5 border-b border-border/30 last:border-0 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent px-3 -mx-3 rounded-xl transition-all duration-300 group relative overflow-hidden'>
          {/* Hover indicator line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-8 bg-primary rounded-full transition-all duration-300" />
          
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <Badge className={cn('text-[10px] font-bold h-5 rounded-full px-2.5 shadow-sm', categoryColors[announcement.category] || categoryColors.general)}>
                  {categoryLabel.toUpperCase()}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {formatDistanceToNow(announcement.createdAt, { addSuffix: false })}
                </span>
              </div>
              <h4 className="font-semibold text-sm text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors duration-300">
                {announcement.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                By: {announcement.author}
              </p>
            </div>
            <motion.div
              className="mt-1 flex-shrink-0"
              whileHover={{ x: 2 }}
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all duration-300" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
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
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-3 border-primary/20 border-t-primary animate-spin" />
            <Sparkles className="w-5 h-5 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">Loading your dashboard...</p>
        </motion.div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const userName = profile?.full_name || 'Student'

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Custom Home Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-background/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-40 lg:hidden"
      >
        <div className="flex items-center justify-between px-4 h-16 max-w-lg mx-auto">
          <div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-muted-foreground"
            >
              Hello,
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-bold text-foreground font-display"
            >
              {userName}
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <Link href="/notifications">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 rounded-xl hover:bg-muted transition-all duration-300"
              >
                <Bell className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                {notificationCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white bg-rose-500 rounded-full px-1 shadow-lg shadow-rose-500/30"
                  >
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.header>

      <main className="px-4 py-5 max-w-lg mx-auto">
        {/* Welcome Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <WelcomeBanner userName={userName} />
        </motion.div>

        {/* Quick Access Section */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-5"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground font-display">Quick Access</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionCard key={action.href} action={action} index={index} />
            ))}
          </div>
        </div>

        {/* Latest Announcements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-primary" />
              <h2 className="text-base font-bold text-foreground font-display">Latest Announcements</h2>
            </div>
            <Link href="/announcements" className="text-sm text-primary font-semibold flex items-center gap-1 hover:underline group transition-colors">
              View all
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <Card className="border-0 bg-gradient-to-br from-card via-card to-muted/20 shadow-lg hover:shadow-xl transition-all duration-500 rounded-3xl relative overflow-hidden group">
            {/* Subtle gradient border */}
            <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-border/60 via-transparent to-border/60 group-hover:from-primary/30 group-hover:to-primary/30 transition-all duration-500" />
            <div className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] bg-card" />
            
            <CardContent className="p-4 relative z-10">
              {latestAnnouncements.map((announcement, index) => (
                <AnnouncementItem key={announcement.id} announcement={announcement} index={index} />
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <BottomNav notificationCount={notificationCount} />
    </div>
  )
}
