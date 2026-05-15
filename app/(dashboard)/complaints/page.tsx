'use client'

import { useState, useMemo } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { ComplaintCard, ComplaintCardSkeleton } from '@/components/complaint-card'
import { StatsCard, StatsGrid } from '@/components/stats-card'
import { FilterDropdown } from '@/components/filter-dropdown'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { mockComplaints, complaintCategories } from '@/lib/data'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  Building,
  Zap,
  Droplets,
  Wifi,
  GraduationCap,
  Shield,
  LucideIcon,
  ChevronRight
} from 'lucide-react'

const categoryIcons: Record<string, LucideIcon> = {
  hostel: Building,
  electricity: Zap,
  water: Droplets,
  internet: Wifi,
  academic: GraduationCap,
  security: Shield,
}

export default function ComplaintsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Calculate stats
  const stats = useMemo(() => {
    const pending = mockComplaints.filter(c => c.status === 'pending').length
    const inProgress = mockComplaints.filter(c => c.status === 'in-progress').length
    const resolved = mockComplaints.filter(c => c.status === 'resolved').length
    const highPriority = mockComplaints.filter(c => c.priority === 'high' || c.priority === 'urgent').length
    return { pending, inProgress, resolved, highPriority, total: mockComplaints.length }
  }, [])

  // Filter complaints
  const filteredComplaints = useMemo(() => {
    return mockComplaints.filter(complaint => {
      if (activeTab !== 'all' && complaint.category !== activeTab) return false
      if (statusFilter !== 'all' && complaint.status !== statusFilter) return false
      if (priorityFilter !== 'all' && complaint.priority !== priorityFilter) return false
      return true
    })
  }, [activeTab, statusFilter, priorityFilter])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader notificationCount={8} />

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Page Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-foreground">Student Support Center</h1>
            <p className="text-sm text-muted-foreground">Report and track campus-related issues</p>
          </div>
          <Link href="/complaints/new">
            <Button size="sm" className="gap-1">
              <Plus className="w-4 h-4" />
              Report
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <StatsGrid className="mb-6">
          <StatsCard
            title="Pending"
            value={stats.pending}
            icon={Clock}
            color="warning"
          />
          <StatsCard
            title="In Progress"
            value={stats.inProgress}
            icon={AlertTriangle}
            color="primary"
          />
          <StatsCard
            title="Resolved"
            value={stats.resolved}
            icon={CheckCircle}
            color="success"
          />
          <StatsCard
            title="High Priority"
            value={stats.highPriority}
            icon={AlertTriangle}
            color="destructive"
          />
        </StatsGrid>

        {/* Category Selection */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-foreground mb-3">Report by Category</h2>
          <div className="grid grid-cols-2 gap-3">
            {complaintCategories.map((category) => {
              const Icon = categoryIcons[category.id]
              return (
                <Link key={category.id} href={`/complaints/new?category=${category.id}`}>
                  <Card className="h-full hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer group">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                        {category.label}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Complaints */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">Your Complaints</h2>
            <Link href="/complaints/history">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
            <FilterDropdown
              label="Status"
              value={statusFilter}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'pending', label: 'Pending' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'resolved', label: 'Resolved' },
                { value: 'rejected', label: 'Rejected' },
              ]}
              onChange={setStatusFilter}
            />
            <FilterDropdown
              label="Priority"
              value={priorityFilter}
              options={[
                { value: 'all', label: 'All Priority' },
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
                { value: 'urgent', label: 'Urgent' },
              ]}
              onChange={setPriorityFilter}
            />
          </div>

          {/* Complaints List */}
          {filteredComplaints.length === 0 ? (
            <EmptyState
              icon="inbox"
              title="No complaints found"
              description={statusFilter !== 'all' || priorityFilter !== 'all' 
                ? "Try adjusting your filters to see more results."
                : "You haven't submitted any complaints yet. Report an issue to get started."}
              action={{
                label: 'Report Issue',
                onClick: () => router.push('/complaints/new')
              }}
            />
          ) : (
            <div className="space-y-3">
              {filteredComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
