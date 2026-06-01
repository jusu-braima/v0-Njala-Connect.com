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
  Bookmark,
  Users,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'

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
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      {/* Header - mobile only */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-gradient-to-r from-primary to-emerald-600 shadow-lg shadow-primary/20 lg:hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-emerald-600/95 backdrop-blur-md" />
        <div className="relative flex items-center justify-between px-4 h-16 max-w-lg mx-auto">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-xl">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-white/80" />
            <h1 className="text-lg font-bold text-white font-display">Events</h1>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/events/my-events">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-xl">
                <Sparkles className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </motion.header>

      {/* Status Tabs */}
      <div className="bg-background/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-30">
        <div className="px-4 py-3 max-w-lg mx-auto lg:max-w-5xl xl:max-w-6xl">
          <div className="flex gap-2">
            {(['upcoming', 'ongoing', 'past'] as const).map((tab, index) => (
              <motion.button
                key={tab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 capitalize flex-1',
                  activeTab === tab
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {tab}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <main className="px-4 py-5 max-w-lg mx-auto lg:max-w-5xl xl:max-w-6xl">
        <AnimatePresence mode="wait">
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <EmptyState
                icon="event"
                title={`No ${activeTab} events`}
                description={`There are no ${activeTab} events at the moment.`}
              />
            </motion.div>
          ) : (
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-3"
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href={`/events/${event.id}`}>
                    <div className="flex gap-4 p-4 bg-card border border-border/50 rounded-2xl hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 group">
                      {/* Date Badge */}
                      <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-emerald-100 border border-primary/10 text-primary flex-shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          {format(event.startDate, 'MMM')}
                        </span>
                        <span className="text-2xl font-bold leading-none">
                          {format(event.startDate, 'd')}
                        </span>
                      </div>
                      
                      {/* Event Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>
                          <motion.button 
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Bookmark className="w-4 h-4" />
                          </motion.button>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                              <Clock className="w-3 h-3 text-primary" />
                            </div>
                            <span>{format(event.startDate, 'h:mm a')} - {format(event.endDate, 'h:mm a')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                              <MapPin className="w-3 h-3 text-primary" />
                            </div>
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="w-3 h-3 text-primary" />
                            </div>
                            <span>{event.rsvpCount} attending</span>
                          </div>
                        </div>
                      </div>
                      
                      <ChevronRight className="w-4 h-4 text-muted-foreground self-center group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Button */}
        {filteredEvents.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <Button variant="outline" className="w-full text-primary border-primary/30 hover:bg-primary/5 rounded-xl font-semibold">
              View All Events
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>
        )}
      </main>

      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  )
}
