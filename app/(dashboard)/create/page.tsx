'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { AccessDenied } from '@/components/access-denied'
import { BottomNav } from '@/components/bottom-nav'
import { RoleBadge } from '@/components/role-badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  ArrowLeft,
  ChevronRight,
  Megaphone,
  CalendarDays,
  Gift,
  SearchX,
  PenSquare,
  LucideIcon,
} from 'lucide-react'

interface PostAction {
  title: string
  description: string
  href: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

const postActions: PostAction[] = [
  {
    title: 'Post an Announcement',
    description: 'Publish news, notices, exam updates and general information for students.',
    href: '/announcements/create',
    icon: Megaphone,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Create an Event',
    description: 'Share an upcoming campus event with date, location and agenda.',
    href: '/events/create',
    icon: CalendarDays,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    title: 'Post an Opportunity',
    description: 'Add scholarships, internships, jobs, trainings and competitions.',
    href: '/opportunities/create',
    icon: Gift,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Report Lost or Found Item',
    description: 'Post a lost or found item to the campus Lost & Found board.',
    href: '/lost-found/report',
    icon: SearchX,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
  },
]

export default function CreateHubPage() {
  const { isAuthenticated, canPost, profile } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  if (!canPost) {
    return <AccessDenied />
  }

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-primary to-emerald-600 shadow-lg shadow-primary/20 lg:hidden">
        <div className="relative flex items-center justify-between px-4 h-16 max-w-lg mx-auto">
          <Link href="/dashboard" aria-label="Back to dashboard">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <PenSquare className="w-5 h-5 text-white/80" />
            <h1 className="text-lg font-bold text-white">Create Post</h1>
          </div>
          <span className="w-9" />
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto lg:max-w-4xl">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">Create &amp; Publish</h1>
            <p className="text-sm text-muted-foreground">
              Choose what you would like to share with the campus community.
            </p>
          </div>
          {profile?.role && <RoleBadge role={profile.role} size="sm" />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {postActions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.href} href={action.href}>
                <Card className="h-full cursor-pointer border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', action.iconBg)}>
                      <Icon className={cn('w-6 h-6', action.iconColor)} strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground self-center group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>

      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  )
}
