'use client'

import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { DashboardCard } from '@/components/dashboard-card'
import { useAuth } from '@/lib/auth-context'
import { Megaphone, CalendarDays, MessageSquareWarning, Search, Briefcase, BookOpen } from 'lucide-react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const quickActions = [
    {
      title: 'Announcements',
      description: 'View latest updates',
      icon: Megaphone,
      href: '/announcements',
      count: 5,
      variant: 'primary' as const,
    },
    {
      title: 'Events',
      description: 'Campus activities',
      icon: CalendarDays,
      href: '/events',
      count: 3,
      variant: 'default' as const,
    },
    {
      title: 'Complaints',
      description: 'Report issues',
      icon: MessageSquareWarning,
      href: '/complaints',
      variant: 'default' as const,
    },
    {
      title: 'Lost & Found',
      description: 'Find or report items',
      icon: Search,
      href: '/lost-found',
      variant: 'default' as const,
    },
  ]

  // Additional cards based on role
  const roleSpecificCards = user?.role === 'student' ? [
    {
      title: 'Course Updates',
      description: 'Academic notices',
      icon: BookOpen,
      href: '/courses',
      variant: 'default' as const,
    },
  ] : user?.role === 'lecturer' ? [
    {
      title: 'My Courses',
      description: 'Manage your courses',
      icon: BookOpen,
      href: '/my-courses',
      variant: 'default' as const,
    },
  ] : user?.role === 'admin' ? [
    {
      title: 'Admin Panel',
      description: 'Manage platform',
      icon: Briefcase,
      href: '/admin',
      variant: 'default' as const,
    },
  ] : []

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader notificationCount={8} />

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-foreground">
            {"What would you like to do today?"}
          </h1>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action) => (
            <DashboardCard
              key={action.href}
              title={action.title}
              description={action.description}
              icon={action.icon}
              href={action.href}
              count={action.count}
              variant={action.variant}
            />
          ))}

          {/* Role-specific cards */}
          {roleSpecificCards.map((action) => (
            <DashboardCard
              key={action.href}
              title={action.title}
              description={action.description}
              icon={action.icon}
              href={action.href}
              variant={action.variant}
            />
          ))}
        </div>
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
