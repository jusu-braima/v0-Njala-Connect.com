'use client'

import { useState, useMemo } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { EventCard } from '@/components/event-card'
import { RSVPButton } from '@/components/rsvp-button'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth-context'
import { useRouter, useParams } from 'next/navigation'
import { useEffect } from 'react'
import { mockEvents, eventCategories } from '@/lib/data'
import { RSVPStatus } from '@/lib/types'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  Users,
  Bookmark,
  Share2,
  CheckCircle
} from 'lucide-react'

export default function EventDetailPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const params = useParams()
  const [rsvpStatus, setRsvpStatus] = useState<RSVPStatus>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [reminderEnabled, setReminderEnabled] = useState(false)
  const [showRSVPSuccess, setShowRSVPSuccess] = useState(false)

  const event = useMemo(() => {
    return mockEvents.find(e => e.id === params.id)
  }, [params.id])

  const similarEvents = useMemo(() => {
    if (!event) return []
    return mockEvents
      .filter(e => e.category === event.category && e.id !== event.id)
      .slice(0, 3)
  }, [event])

  const categoryInfo = event ? eventCategories.find(c => c.id === event.category) : null

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleRSVPChange = (status: RSVPStatus) => {
    setRsvpStatus(status)
    if (status === 'going' || status === 'interested') {
      setShowRSVPSuccess(true)
      setTimeout(() => setShowRSVPSuccess(false), 3000)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event?.title,
          text: event?.shortDescription,
          url: window.location.href,
        })
      } catch {
        // User cancelled or error
      }
    }
  }

  if (!isAuthenticated) {
    return null
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <DashboardHeader notificationCount={8} />
        <main className="px-4 py-6 max-w-lg mx-auto">
          <div className="text-center py-12">
            <h1 className="text-lg font-semibold">Event not found</h1>
            <p className="text-sm text-muted-foreground mt-1">
              This event may have been removed or doesn&apos;t exist.
            </p>
            <Button className="mt-4" onClick={() => router.push('/events')}>
              Back to Events
            </Button>
          </div>
        </main>
        <BottomNav notificationCount={8} />
      </div>
    )
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

        {/* Event Image */}
        <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-muted">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Calendar className="w-20 h-20 text-primary/30" />
            </div>
          )}
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsSaved(!isSaved)}
            >
              <Bookmark className={cn('w-4 h-4', isSaved && 'fill-current text-primary')} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 bg-background/80 backdrop-blur-sm"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* RSVP Success Message */}
        {showRSVPSuccess && (
          <div className="mb-4 p-3 bg-success/10 border border-success/30 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <p className="text-sm text-success font-medium">
              You have successfully responded to this event.
            </p>
          </div>
        )}

        {/* Event Header */}
        <div className="mb-4">
          <Badge variant="outline" className="mb-2">
            {categoryInfo?.label}
          </Badge>
          <h1 className="text-xl font-bold text-foreground mb-2">{event.title}</h1>
          <p className="text-sm text-muted-foreground">
            Organized by {event.organizer}
          </p>
        </div>

        {/* Event Details Card */}
        <Card className="mb-4">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{format(event.startDate, 'EEEE, MMMM d, yyyy')}</p>
                <p className="text-xs text-muted-foreground">
                  {format(event.startDate, 'h:mm a')} - {format(event.endDate, 'h:mm a')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{event.location}</p>
                <p className="text-xs text-muted-foreground">Njala Campus</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{event.rsvpCount} people going</p>
                <p className="text-xs text-muted-foreground">{event.savedCount} interested</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RSVP Section */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-3">RSVP to this event</h3>
            <RSVPButton
              status={rsvpStatus}
              onStatusChange={handleRSVPChange}
              className="w-full mb-3"
            />
            <div className="flex items-center justify-between">
              <Label htmlFor="reminder" className="text-sm text-muted-foreground">
                Remind me before this event
              </Label>
              <Switch
                id="reminder"
                checked={reminderEnabled}
                onCheckedChange={setReminderEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <section className="mb-6">
          <h2 className="font-semibold text-base mb-2">About This Event</h2>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {event.description}
          </p>
        </section>

        {/* Agenda */}
        {event.agenda && event.agenda.length > 0 && (
          <section className="mb-6">
            <h2 className="font-semibold text-base mb-3">Event Agenda</h2>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="text-xs font-medium text-primary w-20 flex-shrink-0">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.title}</p>
                        {item.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Contact Information */}
        {(event.contactPerson || event.contactEmail || event.contactPhone) && (
          <section className="mb-6">
            <h2 className="font-semibold text-base mb-3">Contact Information</h2>
            <Card>
              <CardContent className="p-4 space-y-2">
                {event.contactPerson && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{event.contactPerson}</span>
                  </div>
                )}
                {event.contactEmail && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a href={`mailto:${event.contactEmail}`} className="text-primary hover:underline">
                      {event.contactEmail}
                    </a>
                  </div>
                )}
                {event.contactPhone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a href={`tel:${event.contactPhone}`} className="text-primary hover:underline">
                      {event.contactPhone}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        )}

        {/* Similar Events */}
        {similarEvents.length > 0 && (
          <section>
            <h2 className="font-semibold text-base mb-3">Similar Events</h2>
            <div className="space-y-3">
              {similarEvents.map((evt) => (
                <EventCard key={evt.id} event={evt} variant="compact" />
              ))}
            </div>
          </section>
        )}
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
