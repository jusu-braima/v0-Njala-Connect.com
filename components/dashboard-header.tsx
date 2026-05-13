'use client'

import { ProfileAvatar } from '@/components/profile-avatar'
import { RoleBadge } from '@/components/role-badge'
import { useAuth } from '@/lib/auth-context'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface DashboardHeaderProps {
  notificationCount?: number
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

export function DashboardHeader({ notificationCount = 0 }: DashboardHeaderProps) {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center justify-between px-4 h-16 max-w-lg mx-auto">
        <div className="flex items-center gap-3">
          <ProfileAvatar name={user?.fullName} image={user?.avatar} size="md" />
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground">{getGreeting()}</p>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-foreground">
                {user?.fullName?.split(' ')[0] || 'User'}
              </h2>
              {user?.role && <RoleBadge role={user.role} size="sm" />}
            </div>
          </div>
        </div>
        <Link href="/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-medium text-white bg-destructive rounded-full px-1">
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
            <span className="sr-only">Notifications</span>
          </Button>
        </Link>
      </div>
    </header>
  )
}
