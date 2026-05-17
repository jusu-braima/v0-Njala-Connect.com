'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Megaphone, MessageSquareWarning, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/announcements', icon: Megaphone, label: 'Announcements' },
  { href: '/complaints', icon: MessageSquareWarning, label: 'Complaints' },
  { href: '/profile', icon: User, label: 'Profile' },
]

interface BottomNavProps {
  notificationCount?: number
}

export function BottomNav({ notificationCount = 0 }: BottomNavProps) {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border lg:hidden animate-fade-in-up">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href || 
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full relative transition-all duration-300 py-2 btn-press',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={cn(
                'flex items-center justify-center w-10 h-10 rounded-full mb-0.5 transition-all duration-300',
                isActive && 'bg-primary text-white scale-110 shadow-lg shadow-primary/30'
              )}>
                <Icon className={cn('w-5 h-5 transition-transform duration-300', isActive && 'scale-110')} />
              </div>
              <span className={cn(
                'text-[10px] font-medium transition-all duration-300',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}>
                {item.label}
              </span>
              
              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-scale-in" />
              )}
            </Link>
          )
        })}
      </div>
      {/* Safe area padding */}
      <div className="h-safe-area-inset-bottom bg-background" />
    </nav>
  )
}
