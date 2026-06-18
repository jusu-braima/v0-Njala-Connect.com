'use client'

import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { StatsCard, StatsGrid } from '@/components/stats-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
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
  Gift,
  Megaphone,
  UserCog,
  Loader2,
  GraduationCap,
  Shield,
} from 'lucide-react'

interface AdminStats {
  users: {
    total: number
    students: number
    staff: number
    admins: number
    newThisWeek: number
  }
  announcements: {
    total: number
  }
  departments: Record<string, number>
}

// Mock stats for the frontend-only demo. Replace with data from the
// external backend once it is connected.
const MOCK_STATS: AdminStats = {
  users: {
    total: 1248,
    students: 1180,
    staff: 62,
    admins: 6,
    newThisWeek: 34,
  },
  announcements: {
    total: 6,
  },
  departments: {
    'Department of Computer Science': 210,
    'Crop Science': 154,
    'Maths and Statistics': 132,
    'Animal Science': 98,
    'Forestry': 76,
    'Chemistry': 64,
  },
}

export default function AdminDashboardPage() {
  const { isAuthenticated, isAdmin, isLoading: authLoading } = useAuth()

  const stats = isAdmin ? MOCK_STATS : undefined
  const statsLoading = false

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <DashboardHeader notificationCount={0} />
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
        <BottomNav notificationCount={0} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader notificationCount={0} />

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
          {statsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <StatsGrid className="lg:grid-cols-4">
              <StatsCard
                title="Total Users"
                value={stats?.users.total || 0}
                icon={Users}
                color="primary"
                description={`${stats?.users.newThisWeek || 0} new this week`}
              />
              <StatsCard
                title="Students"
                value={stats?.users.students || 0}
                icon={GraduationCap}
                color="success"
                description="Enrolled students"
              />
              <StatsCard
                title="Staff"
                value={stats?.users.staff || 0}
                icon={UserCog}
                color="warning"
                description="Faculty & staff"
              />
              <StatsCard
                title="Announcements"
                value={stats?.announcements.total || 0}
                icon={Megaphone}
                color="destructive"
                description="Total published"
              />
            </StatsGrid>
          )}
        </div>

        {/* Management Sections */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-foreground">Management</h2>
          
          {/* User Management */}
          <Link href="/admin/users">
            <Card className="hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      User Management
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Manage users, roles, and permissions
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-xs">
                        <GraduationCap className="w-3.5 h-3.5 text-success" />
                        <span className="text-muted-foreground">{stats?.users.students || 0} students</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <UserCog className="w-3.5 h-3.5 text-warning" />
                        <span className="text-muted-foreground">{stats?.users.staff || 0} staff</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Shield className="w-3.5 h-3.5 text-destructive" />
                        <span className="text-muted-foreground">{stats?.users.admins || 0} admins</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          </Link>

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
                        <span className="text-muted-foreground">Pending</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <TrendingUp className="w-3.5 h-3.5 text-primary" />
                        <span className="text-muted-foreground">In progress</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-success" />
                        <span className="text-muted-foreground">Resolved</span>
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
                  <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <SearchX className="w-7 h-7 text-destructive" />
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
                        <span className="text-muted-foreground">Lost items</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Package className="w-3.5 h-3.5 text-success" />
                        <span className="text-muted-foreground">Found items</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-primary" />
                        <span className="text-muted-foreground">Resolved</span>
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

        {/* Department Stats */}
        {stats?.departments && Object.keys(stats.departments).length > 0 && (
          <div className="mt-8">
            <h2 className="text-base font-semibold text-foreground mb-3">Users by Department</h2>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {Object.entries(stats.departments)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 6)
                    .map(([dept, count]) => (
                      <div key={dept} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{dept}</span>
                        <span className="text-sm font-medium text-muted-foreground">{count}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <BottomNav notificationCount={0} />
    </div>
  )
}
