'use client'

import { useState, useMemo } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { ComplaintCard } from '@/components/complaint-card'
import { FilterDropdown } from '@/components/filter-dropdown'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { mockComplaints, complaintCategories } from '@/lib/data'
import Link from 'next/link'
import { ArrowLeft, Search, Plus } from 'lucide-react'

export default function ComplaintHistoryPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const filteredComplaints = useMemo(() => {
    return mockComplaints.filter(complaint => {
      if (statusFilter !== 'all' && complaint.status !== statusFilter) return false
      if (categoryFilter !== 'all' && complaint.category !== categoryFilter) return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          complaint.title.toLowerCase().includes(query) ||
          complaint.description.toLowerCase().includes(query) ||
          complaint.location.toLowerCase().includes(query)
        )
      }
      return true
    })
  }, [searchQuery, statusFilter, categoryFilter])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader notificationCount={8} />

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/complaints">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Complaint History</h1>
            <p className="text-sm text-muted-foreground">{filteredComplaints.length} complaints</p>
          </div>
          <Link href="/complaints/new">
            <Button size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search complaints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
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
            label="Category"
            value={categoryFilter}
            options={[
              { value: 'all', label: 'All Categories' },
              ...complaintCategories.map(c => ({ value: c.id, label: c.label }))
            ]}
            onChange={setCategoryFilter}
          />
        </div>

        {/* Results */}
        {filteredComplaints.length === 0 ? (
          <EmptyState
            icon="inbox"
            title="No complaints found"
            description={searchQuery 
              ? `No results for "${searchQuery}". Try a different search term.`
              : "You haven't submitted any complaints yet."}
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
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
