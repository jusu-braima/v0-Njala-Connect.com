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
  Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { useAuth } from '@/lib/auth-context'
import { ProfileAvatar } from '@/components/profile-avatar'
import { RoleBadge } from '@/components/role-badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const mainNavItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/announcements', icon: Megaphone, label: 'Announcements' },
  { href: '/notifications', icon: Bell, label: 'Notifications' },
  { href: '/courses', icon: BookOpen, label: 'Courses' },
  { href: '/events', icon: CalendarDays, label: 'Events' },
  { href: '/opportunities', icon: Gift, label: 'Opportunities' },
  { href: '/organizations', icon: Users, label: 'Organizations' },
  { href: '/complaints', icon: MessageSquareWarning, label: 'Complaints' },
  { href: '/lost-found', icon: SearchX, label: 'Lost & Found' },
  { href: '/support', icon: HeadphonesIcon, label: 'Support' },
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

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-background border-r border-border fixed left-0 top-0">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo size="md" />
        </Link>
      </div>

      {/* Search */}
      <div className="p-4">
        <Link href="/search">
          <Button variant="outline" className="w-full justify-start text-muted-foreground">
            <Search className="w-4 h-4 mr-2" />
            Search...
          </Button>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <div className="space-y-1">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon
            const showBadge = item.label === 'Notifications' && notificationCount > 0

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1">{item.label}</span>
                {showBadge && (
                  <span className={cn(
                    'min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs font-medium rounded-full',
                    isActive 
                      ? 'bg-primary-foreground text-primary' 
                      : 'bg-destructive text-destructive-foreground'
                  )}>
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        <Separator className="my-4" />

        {/* Admin Link */}
        {isAdmin && (
          <Link
            href="/admin"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-4',
              pathname.startsWith('/admin')
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <Shield className="w-5 h-5" />
            <span>Admin Panel</span>
          </Link>
        )}

        <div className="space-y-1">
          {secondaryNavItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <Link href="/profile">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
            <ProfileAvatar 
              name={profile?.full_name || undefined} 
              image={profile?.avatar_url || undefined} 
              size="sm" 
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {profile?.full_name || profile?.email || 'User'}
              </p>
              <div className="flex items-center gap-1">
                {profile?.role && <RoleBadge role={profile.role} size="sm" />}
              </div>
            </div>
          </div>
        </Link>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout}
          className="w-full mt-2 text-muted-foreground hover:text-destructive"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
