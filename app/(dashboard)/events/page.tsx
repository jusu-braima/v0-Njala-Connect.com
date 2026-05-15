'use client'

import { useState, useMemo } from 'react'
import { BottomNav } from '@/components/bottom-nav'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { mockEvents } from '@/lib/data'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Bookmark
} from 'lucide-react'
import { format } from 'date-fns'

export default function EventsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'upcoming' | 'ongoing' | 'past'>('upcoming')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Filter events by status
  const filteredEvents = useMemo(() => {
    const now = new Date()
    return mockEvents.filter(event => {
      const startDate = new Date(event.startDate)
      const endDate = new Date(event.endDate)
      
      if (activeTab === 'upcoming') return startDate > now
      if (activeTab === 'ongoing') return startDate <= now && endDate >= now
      if (activeTab === 'past') return endDate < now
      return true
    })
  }, [activeTab])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary">
        <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-white">Events</h1>
          <Link href="/events/my-events">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <CalendarDays className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Status Tabs */}
      <div className="bg-background border-b border-border sticky top-14 z-30">
        <div className="px-4 py-3 max-w-lg mx-auto">
          <div className="flex gap-2">
            {(['upcoming', 'ongoing', 'past'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize',
                  activeTab === tab
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="px-4 py-4 max-w-lg mx-auto">
        {filteredEvents.length === 0 ? (
          <EmptyState
            icon="event"
            title={`No ${activeTab} events`}
            description={`There are no ${activeTab} events at the moment.`}
          />
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div className="flex gap-4 p-4 bg-card border border-border rounded-xl hover:shadow-md transition-shadow">
                  {/* Date Badge */}
                  <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <span className="text-[10px] font-medium uppercase">
                      {format(event.startDate, 'MMM')}
                    </span>
                    <span className="text-xl font-bold leading-none">
                      {format(event.startDate, 'd')}
                    </span>
                  </div>
                  
                  {/* Event Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm text-foreground line-clamp-1">
                        {event.title}
                      </h3>
                      <button className="text-muted-foreground hover:text-primary transition-colors">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{format(event.startDate, 'h:mm a')} - {format(event.endDate, 'h:mm a')}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View All Button */}
        {filteredEvents.length > 0 && (
          <div className="mt-6">
            <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary/5">
              View All Events
            </Button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
