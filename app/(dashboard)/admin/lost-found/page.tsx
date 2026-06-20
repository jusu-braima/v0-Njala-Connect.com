'use client'

import { useState, useMemo } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { StatsCard, StatsGrid } from '@/components/stats-card'
import { StatusBadge, TypeBadge } from '@/components/status-badge'
import { FilterDropdown } from '@/components/filter-dropdown'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { mockLostItems, mockFoundItems, lostFoundCategories } from '@/lib/data'
import { format } from 'date-fns'
import Link from 'next/link'
import {
  Search,
  SearchX,
  Package,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Eye,
  Trash2
} from 'lucide-react'

export default function AdminLostFoundPage() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const allItems = useMemo(() => {
    return [...mockLostItems, ...mockFoundItems].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )
  }, [])

  const stats = useMemo(() => {
    const lost = mockLostItems.filter(i => i.status === 'active').length
    const found = mockFoundItems.filter(i => i.status === 'active').length
    const resolved = allItems.filter(i => i.status === 'resolved').length
    const claimed = allItems.filter(i => i.status === 'claimed').length
    return { lost, found, resolved, claimed, total: allItems.length }
  }, [allItems])

  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      if (typeFilter !== 'all' && item.type !== typeFilter) return false
      if (statusFilter !== 'all' && item.status !== statusFilter) return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query)
        )
      }
      return true
    })
  }, [allItems, typeFilter, statusFilter, searchQuery])

  if (!isAuthenticated) {
    return null
  }

  if (!isAdmin) {
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
            <h1 className="text-xl font-bold text-foreground">Admin: Lost & Found</h1>
            <p className="text-sm text-muted-foreground">Manage lost and found item reports</p>
          </div>
        </div>

        {/* Stats */}
        <StatsGrid className="mb-6 lg:grid-cols-4">
          <StatsCard
            title="Lost Items"
            value={stats.lost}
            icon={SearchX}
            color="destructive"
          />
          <StatsCard
            title="Found Items"
            value={stats.found}
            icon={Package}
            color="success"
          />
          <StatsCard
            title="Claimed"
            value={stats.claimed}
            icon={CheckCircle}
            color="primary"
          />
          <StatsCard
            title="Resolved"
            value={stats.resolved}
            icon={CheckCircle}
            color="success"
          />
        </StatsGrid>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <FilterDropdown
              label="Type"
              value={typeFilter}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'lost', label: 'Lost' },
                { value: 'found', label: 'Found' },
              ]}
              onChange={setTypeFilter}
            />
            <FilterDropdown
              label="Status"
              value={statusFilter}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'claimed', label: 'Claimed' },
                { value: 'resolved', label: 'Resolved' },
              ]}
              onChange={setStatusFilter}
            />
          </div>
        </div>

        {/* Items Table */}
        <Card>
          <CardContent className="p-0">
            {filteredItems.length === 0 ? (
              <div className="py-12">
                <EmptyState
                  icon="search"
                  title="No items found"
                  description="No items match your current filters."
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => {
                      const categoryInfo = lostFoundCategories.find(c => c.id === item.category)
                      return (
                        <TableRow key={item.id}>
                          <TableCell>
                            <TypeBadge type={item.type} />
                          </TableCell>
                          <TableCell className="max-w-[200px]">
                            <p className="truncate font-medium">{item.title}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {item.description}
                            </p>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{categoryInfo?.label}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {item.location}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={item.status} />
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {format(item.date, 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
