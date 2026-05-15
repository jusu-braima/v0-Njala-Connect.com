'use client'

import { useState, useMemo } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { EventCard } from '@/components/event-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { useRouter, useParams } from 'next/navigation'
import { useEffect } from 'react'
import { mockOrganizations, mockEvents, organizationCategories } from '@/lib/data'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  ArrowLeft,
  Users,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Clock,
  CheckCircle
} from 'lucide-react'

export default function OrganizationProfilePage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const params = useParams()
  const [isJoining, setIsJoining] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)

  const organization = useMemo(() => {
    return mockOrganizations.find(o => o.id === params.id)
  }, [params.id])

  const organizationEvents = useMemo(() => {
    if (!organization) return []
    return mockEvents
      .filter(e => e.organizerId === organization.id)
      .slice(0, 3)
  }, [organization])

  const categoryInfo = organization ? organizationCategories.find(c => c.id === organization.category) : null

  const initials = organization?.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || ''

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleJoin = async () => {
    setIsJoining(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setHasJoined(true)
    setIsJoining(false)
  }

  if (!isAuthenticated) {
    return null
  }

  if (!organization) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <DashboardHeader notificationCount={8} />
        <main className="px-4 py-6 max-w-lg mx-auto">
          <div className="text-center py-12">
            <h1 className="text-lg font-semibold">Organization not found</h1>
            <p className="text-sm text-muted-foreground mt-1">
              This organization may have been removed or doesn&apos;t exist.
            </p>
            <Button className="mt-4" onClick={() => router.push('/organizations')}>
              Back to Organizations
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

        {/* Organization Header */}
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={organization.logoUrl} alt={organization.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Badge variant="outline" className="mb-1">
              {categoryInfo?.label}
            </Badge>
            <h1 className="text-xl font-bold text-foreground">{organization.name}</h1>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Users className="w-4 h-4" />
              <span>{organization.memberCount} members</span>
            </div>
          </div>
        </div>

        {/* Join Button */}
        <div className="mb-6">
          {hasJoined ? (
            <Button variant="outline" className="w-full gap-2" disabled>
              <CheckCircle className="w-4 h-4 text-success" />
              Request Sent
            </Button>
          ) : (
            <Button 
              className="w-full" 
              onClick={handleJoin}
              disabled={isJoining}
            >
              {isJoining ? 'Sending Request...' : 'Request to Join'}
            </Button>
          )}
        </div>

        {/* Mission */}
        <section className="mb-6">
          <h2 className="font-semibold text-base mb-2">Our Mission</h2>
          <p className="text-sm text-muted-foreground">
            {organization.mission}
          </p>
        </section>

        {/* About */}
        <section className="mb-6">
          <h2 className="font-semibold text-base mb-2">About</h2>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {organization.description}
          </p>
        </section>

        {/* Leadership Team */}
        {organization.leaders && organization.leaders.length > 0 && (
          <section className="mb-6">
            <h2 className="font-semibold text-base mb-3">Leadership Team</h2>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {organization.leaders.map((leader, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={leader.imageUrl} alt={leader.name} />
                        <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                          {leader.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{leader.name}</p>
                        <p className="text-xs text-muted-foreground">{leader.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Meeting Schedule & Location */}
        <section className="mb-6">
          <h2 className="font-semibold text-base mb-3">Meeting Information</h2>
          <Card>
            <CardContent className="p-4 space-y-3">
              {organization.meetingSchedule && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Schedule</p>
                    <p className="font-medium text-sm">{organization.meetingSchedule}</p>
                  </div>
                </div>
              )}
              {organization.location && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-medium text-sm">{organization.location}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Contact Details */}
        <section className="mb-6">
          <h2 className="font-semibold text-base mb-3">Contact</h2>
          <Card>
            <CardContent className="p-4 space-y-2">
              {organization.contactPerson && (
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{organization.contactPerson}</span>
                </div>
              )}
              {organization.contactEmail && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${organization.contactEmail}`} className="text-primary hover:underline">
                    {organization.contactEmail}
                  </a>
                </div>
              )}
              {organization.contactPhone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a href={`tel:${organization.contactPhone}`} className="text-primary hover:underline">
                    {organization.contactPhone}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Upcoming Events */}
        {organizationEvents.length > 0 && (
          <section>
            <h2 className="font-semibold text-base mb-3">Upcoming Events</h2>
            <div className="space-y-3">
              {organizationEvents.map((event) => (
                <EventCard key={event.id} event={event} variant="compact" />
              ))}
            </div>
          </section>
        )}
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
