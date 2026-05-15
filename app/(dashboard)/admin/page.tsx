'use client'

import { useMemo } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { StatsCard, StatsGrid } from '@/components/stats-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { mockComplaints, mockLostItems, mockFoundItems } from '@/lib/data'
import Link from 'next/link'
import {
  ArrowLeft,
  MessageSquareWarning,
  SearchX,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  Users,
  TrendingUp,
  CalendarDays,
  Gift
} from 'lucide-react'

export default function AdminDashboardPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const complaintStats = useMemo(() => {
    const pending = mockComplaints.filter(c => c.status === 'pending').length
    const inProgress = mockComplaints.filter(c => c.status === 'in-progress').length
    const resolved = mockComplaints.filter(c => c.status === 'resolved').length
    const urgent = mockComplaints.filter(c => c.priority === 'urgent').length
    return { pending, inProgress, resolved, urgent, total: mockComplaints.length }
  }, [])

  const lostFoundStats = useMemo(() => {
    const allItems = [...mockLostItems, ...mockFoundItems]
    const lost = mockLostItems.filter(i => i.status === 'active').length
    const found = mockFoundItems.filter(i => i.status === 'active').length
    const resolved = allItems.filter(i => i.status === 'resolved').length
    return { lost, found, resolved, total: allItems.length }
  }, [])

  if (!isAuthenticated) {
    return null
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background pb-20">
        <DashboardHeader notificationCount={8} />
        <main className="px-4 py-6 max-w-lg mx-auto">
          <Card>
            <CardContent className="py-12 text-center">
              <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Access Denied</h2>
              <p className="text-muted-foreground mb-4">
                You do not have permission to access the admin panel.
              </p>
              <Link href="/dashboard">
                <Button>Return to Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <BottomNav notificationCount={8} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader notificationCount={8} />

      <main className="px-4 py-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage student support services</p>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="mb-8">
          <h2 className="text-base font-semibold text-foreground mb-3">Overview</h2>
          <StatsGrid className="lg:grid-cols-4">
            <StatsCard
              title="Total Complaints"
              value={complaintStats.total}
              icon={MessageSquareWarning}
              color="primary"
              description={`${complaintStats.pending} pending`}
            />
            <StatsCard
              title="Urgent Issues"
              value={complaintStats.urgent}
              icon={AlertTriangle}
              color="destructive"
              description="Require immediate attention"
            />
            <StatsCard
              title="Lost Items"
              value={lostFoundStats.lost}
              icon={SearchX}
              color="warning"
              description="Active reports"
            />
            <StatsCard
              title="Found Items"
              value={lostFoundStats.found}
              icon={Package}
              color="success"
              description="Awaiting claim"
            />
          </StatsGrid>
        </div>

        {/* Management Sections */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-foreground">Management</h2>
          
          {/* Complaints Management */}
          <Link href="/admin/complaints">
            <Card className="hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquareWarning className="w-7 h-7 text-warning" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      Complaint Management
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Review, respond, and resolve student complaints
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Clock className="w-3.5 h-3.5 text-warning" />
                        <span className="text-muted-foreground">{complaintStats.pending} pending</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <TrendingUp className="w-3.5 h-3.5 text-primary" />
                        <span className="text-muted-foreground">{complaintStats.inProgress} in progress</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-success" />
                        <span className="text-muted-foreground">{complaintStats.resolved} resolved</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Lost & Found Management */}
          <Link href="/admin/lost-found">
            <Card className="hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <SearchX className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      Lost & Found Management
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Manage lost and found item reports
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-xs">
                        <SearchX className="w-3.5 h-3.5 text-destructive" />
                        <span className="text-muted-foreground">{lostFoundStats.lost} lost</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Package className="w-3.5 h-3.5 text-success" />
                        <span className="text-muted-foreground">{lostFoundStats.found} found</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-primary" />
                        <span className="text-muted-foreground">{lostFoundStats.resolved} resolved</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Engagement Dashboard */}
          <Link href="/admin/engagement">
            <Card className="hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="w-7 h-7 text-success" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      Engagement Dashboard
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Manage events, opportunities, and organizations
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-xs">
                        <CalendarDays className="w-3.5 h-3.5 text-primary" />
                        <span className="text-muted-foreground">Events</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Gift className="w-3.5 h-3.5 text-warning" />
                        <span className="text-muted-foreground">Opportunities</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Users className="w-3.5 h-3.5 text-success" />
                        <span className="text-muted-foreground">Organizations</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-base font-semibold text-foreground mb-3">Recent Activity</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {mockComplaints.slice(0, 3).map((complaint) => (
                  <div key={complaint.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <MessageSquareWarning className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {complaint.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {complaint.submittedBy.fullName} - {complaint.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
