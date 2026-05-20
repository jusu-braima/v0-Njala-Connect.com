'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Home, 
  Megaphone, 
  Bell, 
  BookOpen, 
  User,
  Search,
  CalendarDays,
  MessageSquareWarning,
  Settings,
  SearchX,
  HeadphonesIcon,
  Gift,
  Users,
  LogOut,
  Shield,
  Sparkles,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { useAuth } from '@/lib/auth-context'
import { ProfileAvatar } from '@/components/profile-avatar'
import { RoleBadge } from '@/components/role-badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { motion, AnimatePresence } from 'framer-motion'

const mainNavItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard', color: 'from-emerald-500 to-teal-600' },
  { href: '/announcements', icon: Megaphone, label: 'Announcements', color: 'from-blue-500 to-cyan-600' },
  { href: '/notifications', icon: Bell, label: 'Notifications', color: 'from-amber-500 to-orange-600' },
  { href: '/courses', icon: BookOpen, label: 'Courses', color: 'from-violet-500 to-purple-600' },
  { href: '/events', icon: CalendarDays, label: 'Events', color: 'from-pink-500 to-rose-600' },
  { href: '/opportunities', icon: Gift, label: 'Opportunities', color: 'from-green-500 to-emerald-600' },
  { href: '/organizations', icon: Users, label: 'Organizations', color: 'from-indigo-500 to-blue-600' },
  { href: '/complaints', icon: MessageSquareWarning, label: 'Complaints', color: 'from-red-500 to-orange-600' },
  { href: '/lost-found', icon: SearchX, label: 'Lost & Found', color: 'from-slate-500 to-gray-600' },
  { href: '/support', icon: HeadphonesIcon, label: 'Support', color: 'from-teal-500 to-cyan-600' },
]

const secondaryNavItems = [
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/settings', icon: Settings, label: 'Settings' },
]

interface DesktopSidebarProps {
  notificationCount?: number
}

export function DesktopSidebar({ notificationCount = 0 }: DesktopSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { profile, isAdmin, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  }

  return (
    <motion.aside 
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="hidden lg:flex flex-col w-72 h-screen bg-background/95 backdrop-blur-xl border-r border-border/50 fixed left-0 top-0"
    >
      {/* Gradient accent */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent" />

      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-5 border-b border-border/50"
      >
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <Logo size="md" />
        </Link>
      </motion.div>

      {/* Search */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4"
      >
        <Link href="/search">
          <Button 
            variant="outline" 
            className="w-full justify-start text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300 group rounded-xl h-11"
          >
            <Search className="w-4 h-4 mr-3 group-hover:text-primary transition-colors" />
            <span>Search...</span>
            <kbd className="ml-auto text-[10px] bg-muted px-2 py-0.5 rounded-md font-mono">
              ⌘K
            </kbd>
          </Button>
        </Link>
      </motion.div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto custom-scrollbar">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-1"
        >
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon
            const showBadge = item.label === 'Notifications' && notificationCount > 0

            return (
              <motion.div key={item.href} variants={itemVariants}>
                <Link href={item.href}>
                  <div
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                        : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    )}
                  >
                    {/* Animated background for active state */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBg"
                        className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-600"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    <div className={cn(
                      "relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
                      isActive 
                        ? "bg-white/20" 
                        : "bg-muted/50 group-hover:bg-primary/10"
                    )}>
                      <Icon className={cn(
                        'w-4 h-4 relative z-10 transition-all duration-300',
                        isActive ? 'text-white' : 'group-hover:text-primary group-hover:scale-110'
                      )} />
                    </div>
                    
                    <span className="flex-1 relative z-10">{item.label}</span>
                    
                    {showBadge && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={cn(
                          'relative z-10 min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs font-bold rounded-full',
                          isActive 
                            ? 'bg-white text-primary' 
                            : 'bg-destructive text-destructive-foreground'
                        )}
                      >
                        {notificationCount > 99 ? '99+' : notificationCount}
                      </motion.span>
                    )}
                    
                    {!isActive && (
                      <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-300" />
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        <Separator className="my-4 bg-border/50" />

        {/* Admin Link */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/admin">
              <div
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 mb-4 group relative overflow-hidden',
                  pathname.startsWith('/admin')
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20'
                    : 'text-muted-foreground hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-950/30'
                )}
              >
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
                  pathname.startsWith('/admin')
                    ? "bg-white/20"
                    : "bg-amber-100 dark:bg-amber-900/30 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50"
                )}>
                  <Shield className={cn(
                    'w-4 h-4',
                    pathname.startsWith('/admin') ? 'text-white' : 'text-amber-600'
                  )} />
                </div>
                <span>Admin Panel</span>
                <Sparkles className={cn(
                  "w-4 h-4 ml-auto",
                  pathname.startsWith('/admin') ? 'text-white' : 'text-amber-500'
                )} />
              </div>
            </Link>
          </motion.div>
        )}

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-1"
        >
          {secondaryNavItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <motion.div key={item.href} variants={itemVariants}>
                <Link href={item.href}>
                  <div
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                        : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    )}
                  >
                    <div className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
                      isActive 
                        ? "bg-white/20" 
                        : "bg-muted/50 group-hover:bg-primary/10"
                    )}>
                      <Icon className={cn(
                        'w-4 h-4 transition-all duration-300',
                        isActive ? 'text-white' : 'group-hover:text-primary group-hover:scale-110'
                      )} />
                    </div>
                    <span>{item.label}</span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </nav>

      {/* User Profile */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-4 border-t border-border/50 bg-muted/30"
      >
        <Link href="/profile">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-background transition-all duration-300 group">
            <div className="relative">
              <ProfileAvatar 
                name={profile?.full_name || undefined} 
                image={profile?.avatar_url || undefined} 
                size="sm" 
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {profile?.full_name || profile?.email || 'User'}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                {profile?.role && <RoleBadge role={profile.role} size="sm" />}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </Link>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout}
          className="w-full mt-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all duration-300 group"
        >
          <LogOut className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Sign Out
        </Button>
      </motion.div>
    </motion.aside>
  )
}
