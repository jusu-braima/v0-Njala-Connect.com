'use client'

import { useState, useMemo } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { EventCard } from '@/components/event-card'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { mockEvents } from '@/lib/data'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  Bookmark,
  History
} from 'lucide-react'

// Mock user's saved/RSVP'd events (in a real app, this would come from API/state)
const mockUserEvents = {
  going: ['evt1', 'evt2'],
  saved: ['evt1', 'evt3', 'evt5'],
  past: ['evt7'],
}

export default function MyEventsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('going')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const goingEvents = useMemo(() => {
    return mockEvents.filter(e => mockUserEvents.going.includes(e.id))
  }, [])

  const savedEvents = useMemo(() => {
    return mockEvents.filter(e => mockUserEvents.saved.includes(e.id))
  }, [])

  const pastEvents = useMemo(() => {
    return mockEvents.filter(e => mockUserEvents.past.includes(e.id))
  }, [])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader notificationCount={8} />

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 mb-4 -ml-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-foreground">My Events</h1>
          <p className="text-sm text-muted-foreground">
            Events you&apos;re attending and have saved
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="going" className="gap-1.5">
              <Calendar className="w-4 h-4" />
              Going
            </TabsTrigger>
            <TabsTrigger value="saved" className="gap-1.5">
              <Bookmark className="w-4 h-4" />
              Saved
            </TabsTrigger>
            <TabsTrigger value="past" className="gap-1.5">
              <History className="w-4 h-4" />
              Past
            </TabsTrigger>
          </TabsList>

          <TabsContent value="going">
            {goingEvents.length === 0 ? (
              <EmptyState
                icon="event"
                title="No events yet"
                description="You haven't RSVP'd to any events. Browse upcoming events to find something interesting!"
                action={{
                  label: 'Browse Events',
                  onClick: () => router.push('/events')
                }}
              />
            ) : (
              <div className="space-y-3">
                {goingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved">
            {savedEvents.length === 0 ? (
              <EmptyState
                icon="event"
                title="No saved events"
                description="Save events you're interested in to keep track of them."
                action={{
                  label: 'Browse Events',
                  onClick: () => router.push('/events')
                }}
              />
            ) : (
              <div className="space-y-3">
                {savedEvents.map((event) => (
                  <EventCard key={event.id} event={event} isSaved />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastEvents.length === 0 ? (
              <EmptyState
                icon="event"
                title="No past events"
                description="Events you've attended will appear here."
              />
            ) : (
              <div className="space-y-3">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
