'use client'

import { useState, useMemo } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { OpportunityCard, OpportunityCardSkeleton } from '@/components/opportunity-card'
import { FilterDropdown } from '@/components/filter-dropdown'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { mockOpportunities, opportunityCategories } from '@/lib/data'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  Search,
  Gift,
  Bookmark
} from 'lucide-react'

export default function OpportunitiesPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Filter opportunities
  const filteredOpportunities = useMemo(() => {
    return mockOpportunities.filter(opp => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (!opp.title.toLowerCase().includes(query) && 
            !opp.description.toLowerCase().includes(query) &&
            !opp.provider.toLowerCase().includes(query)) {
          return false
        }
      }
      
      // Category filter
      if (categoryFilter !== 'all' && opp.category !== categoryFilter) {
        return false
      }
      
      // Status filter
      if (statusFilter !== 'all' && opp.status !== statusFilter) {
        return false
      }
      
      return true
    })
  }, [searchQuery, categoryFilter, statusFilter])

  // Count by status
  const stats = useMemo(() => ({
    open: mockOpportunities.filter(o => o.status === 'open').length,
    closingSoon: mockOpportunities.filter(o => o.status === 'closing-soon').length,
    closed: mockOpportunities.filter(o => o.status === 'closed').length,
  }), [])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <div className="lg:hidden">
        <DashboardHeader notificationCount={8} />
      </div>

      <main className="px-4 py-6 max-w-lg mx-auto lg:max-w-5xl xl:max-w-6xl">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-foreground">Campus Opportunities</h1>
          <p className="text-sm text-muted-foreground">
            Scholarships, internships, competitions, trainings, and leadership opportunities.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search opportunities..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Quick Filters */}
        <div className="flex gap-2 mb-4">
          <Badge
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setStatusFilter('all')}
          >
            All ({mockOpportunities.length})
          </Badge>
          <Badge
            variant={statusFilter === 'open' ? 'default' : 'outline'}
            className="cursor-pointer bg-success/15 text-success border-success/30 hover:bg-success/25"
            onClick={() => setStatusFilter('open')}
          >
            Open ({stats.open})
          </Badge>
          <Badge
            variant={statusFilter === 'closing-soon' ? 'default' : 'outline'}
            className="cursor-pointer bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/25"
            onClick={() => setStatusFilter('closing-soon')}
          >
            Closing Soon ({stats.closingSoon})
          </Badge>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          <FilterDropdown
            label="Category"
            value={categoryFilter}
            options={[
              { value: 'all', label: 'All Categories' },
              ...opportunityCategories.map(c => ({ value: c.id, label: c.label }))
            ]}
            onChange={setCategoryFilter}
          />
        </div>

        {/* Category Quick Links */}
        {!searchQuery && categoryFilter === 'all' && (
          <section className="mb-6">
            <h2 className="text-base font-semibold text-foreground mb-3">Browse by Category</h2>
            <div className="flex flex-wrap gap-2">
              {opportunityCategories.map((category) => (
                <Badge
                  key={category.id}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors py-1.5 px-3"
                  onClick={() => setCategoryFilter(category.id)}
                >
                  {category.label}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Opportunities List */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">
              {categoryFilter !== 'all' 
                ? opportunityCategories.find(c => c.id === categoryFilter)?.label
                : 'All Opportunities'}
            </h2>
            {categoryFilter !== 'all' && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCategoryFilter('all')}
              >
                Clear filter
              </Button>
            )}
          </div>

          {filteredOpportunities.length === 0 ? (
            <EmptyState
              icon="opportunity"
              title="No opportunities found"
              description={searchQuery || categoryFilter !== 'all' || statusFilter !== 'all'
                ? "Try adjusting your search or filters to find opportunities."
                : "No opportunities posted yet. Check back soon!"}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {filteredOpportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))}
            </div>
          )}
        </section>
      </main>

      <div className="lg:hidden">
        <BottomNav notificationCount={8} />
      </div>
    </div>
  )
}
