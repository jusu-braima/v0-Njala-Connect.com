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
  icon: LucideIcon
  href: string
  gradient: string
  iconBg: string
}

const quickActions: QuickAction[] = [
  {
    title: 'Announcements',
    icon: Megaphone,
    href: '/announcements',
    gradient: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-500/10',
  },
  {
    title: 'Course Updates',
    icon: BookOpen,
    href: '/courses',
    gradient: 'from-violet-500 to-purple-500',
    iconBg: 'bg-violet-500/10',
  },
  {
    title: 'Complaints',
    icon: MessageSquareWarning,
    href: '/complaints',
    gradient: 'from-rose-500 to-pink-500',
    iconBg: 'bg-rose-500/10',
  },
  {
    title: 'Lost & Found',
    icon: SearchX,
    href: '/lost-found',
    gradient: 'from-slate-500 to-gray-500',
    iconBg: 'bg-slate-500/10',
  },
  {
    title: 'Events',
    icon: CalendarDays,
    href: '/events',
    gradient: 'from-amber-500 to-orange-500',
    iconBg: 'bg-amber-500/10',
  },
  {
    title: 'Opportunities',
    icon: Gift,
    href: '/opportunities',
    gradient: 'from-emerald-500 to-teal-500',
    iconBg: 'bg-emerald-500/10',
  },
]

function QuickActionCard({ action, index }: { action: QuickAction; index: number }) {
  const Icon = action.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.08,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={action.href}>
        <Card className="h-full cursor-pointer group border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden relative">
          {/* Gradient overlay on hover */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300",
            action.gradient
          )} />
          
          <CardContent className="p-4 flex flex-col items-center text-center relative z-10">
            <motion.div 
              className={cn(
                'w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 relative overflow-hidden',
                action.iconBg
              )}
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {/* Icon glow effect */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300",
                action.gradient
              )} />
              <Icon className={cn(
                'w-6 h-6 relative z-10 transition-all duration-300',
                'text-foreground group-hover:scale-110'
              )} strokeWidth={1.5} />
            </motion.div>
            <h3 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors tracking-tight">
              {action.title}
            </h3>
          </CardContent>
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
    >
      <Link href={`/announcements/${announcement.id}`}>
        <div className='py-3.5 border-b border-border/50 last:border-0 hover:bg-muted/50 px-2 -mx-2 rounded-lg transition-all duration-300 group'>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <Badge className={cn('text-[10px] font-bold h-5 rounded-md px-2', categoryColors[announcement.category] || categoryColors.general)}>
                  {categoryLabel.toUpperCase()}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {formatDistanceToNow(announcement.createdAt, { addSuffix: false })}
                </span>
              </div>
              <h4 className="font-semibold text-sm text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                {announcement.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                By: {announcement.author}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 mt-1 flex-shrink-0" />
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
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="text-base font-bold text-foreground font-display">Quick Access</h2>
          </motion.div>
          <div className="grid grid-cols-3 gap-3">
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
          <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-4">
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
