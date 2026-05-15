'use client'

import { useState, useMemo } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { StatsCard, StatsGrid } from '@/components/stats-card'
import { EventCard } from '@/components/event-card'
import { OpportunityCard } from '@/components/opportunity-card'
import { OrganizationCard } from '@/components/organization-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { 
  mockEvents, 
  mockOpportunities, 
  mockOrganizations,
  eventCategories 
} from '@/lib/data'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  Gift,
  Users,
  TrendingUp,
  Bookmark,
  CheckCircle,
  Plus,
  BarChart3
} from 'lucide-react'

export default function AdminEngagementPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Calculate stats
  const stats = useMemo(() => {
    const totalEvents = mockEvents.length
    const activeEvents = mockEvents.filter(e => e.status === 'upcoming' || e.status === 'ongoing').length
    const totalRSVPs = mockEvents.reduce((sum, e) => sum + e.rsvpCount, 0)
    const savedEvents = mockEvents.reduce((sum, e) => sum + e.savedCount, 0)
    const totalOpportunities = mockOpportunities.length
    const openOpportunities = mockOpportunities.filter(o => o.status !== 'closed').length
    const totalOrganizations = mockOrganizations.length
    const totalMembers = mockOrganizations.reduce((sum, o) => sum + o.memberCount, 0)

    return {
      totalEvents,
      activeEvents,
      totalRSVPs,
      savedEvents,
      totalOpportunities,
      openOpportunities,
      totalOrganizations,
      totalMembers,
    }
  }, [])

  // Events by category
  const eventsByCategory = useMemo(() => {
    return eventCategories.map(cat => ({
      ...cat,
      count: mockEvents.filter(e => e.category === cat.id).length,
    }))
  }, [])

  // Most active organizations
  const topOrganizations = useMemo(() => {
    return [...mockOrganizations]
      .sort((a, b) => b.memberCount - a.memberCount)
      .slice(0, 5)
  }, [])

  // Check if user is admin
  const isAdmin = user?.role === 'admin'

  if (!isAuthenticated) {
    return null
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <DashboardHeader notificationCount={8} />
        <main className="px-4 py-6 max-w-lg mx-auto">
          <div className="text-center py-12">
            <h1 className="text-lg font-semibold">Access Denied</h1>
            <p className="text-sm text-muted-foreground mt-1">
              You need administrator privileges to access this page.
            </p>
            <Button className="mt-4" onClick={() => router.push('/dashboard')}>
              Back to Dashboard
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
          onClick={() => router.push('/admin')}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Admin
        </Button>

        {/* Page Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-foreground">Engagement Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Monitor campus events, opportunities, and organizations
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mb-6">
          <Link href="/events/create" className="flex-1">
            <Button variant="outline" className="w-full gap-1" size="sm">
              <Plus className="w-4 h-4" />
              New Event
            </Button>
          </Link>
          <Link href="/opportunities/create" className="flex-1">
            <Button variant="outline" className="w-full gap-1" size="sm">
              <Plus className="w-4 h-4" />
              New Opportunity
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <StatsGrid className="mb-6">
          <StatsCard
            title="Total Events"
            value={stats.totalEvents}
            icon={Calendar}
            color="primary"
          />
          <StatsCard
            title="Active Events"
            value={stats.activeEvents}
            icon={CheckCircle}
            color="success"
          />
          <StatsCard
            title="Total RSVPs"
            value={stats.totalRSVPs}
            icon={TrendingUp}
            color="warning"
          />
          <StatsCard
            title="Saved Events"
            value={stats.savedEvents}
            icon={Bookmark}
            color="primary"
          />
        </StatsGrid>

        <StatsGrid className="mb-6">
          <StatsCard
            title="Opportunities"
            value={stats.totalOpportunities}
            icon={Gift}
            color="warning"
          />
          <StatsCard
            title="Organizations"
            value={stats.totalOrganizations}
            icon={Users}
            color="success"
          />
        </StatsGrid>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="orgs">Organizations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Events by Category */}
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Events by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {eventsByCategory.map((cat) => (
                    <div key={cat.id} className="flex items-center justify-between">
                      <span className="text-sm">{cat.label}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(cat.count / stats.totalEvents) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-6 text-right">{cat.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Organizations */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Most Active Organizations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topOrganizations.map((org, index) => (
                    <div key={org.id} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{org.name}</p>
                        <p className="text-xs text-muted-foreground">{org.memberCount} members</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <div className="space-y-3">
              {mockEvents.slice(0, 5).map((event) => (
                <EventCard key={event.id} event={event} variant="compact" />
              ))}
            </div>
            <Link href="/events" className="block mt-4">
              <Button variant="outline" className="w-full">
                View All Events
              </Button>
            </Link>
          </TabsContent>

          <TabsContent value="orgs">
            <div className="space-y-3">
              {mockOrganizations.slice(0, 5).map((org) => (
                <OrganizationCard key={org.id} organization={org} variant="compact" />
              ))}
            </div>
            <Link href="/organizations" className="block mt-4">
              <Button variant="outline" className="w-full">
                View All Organizations
              </Button>
            </Link>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
