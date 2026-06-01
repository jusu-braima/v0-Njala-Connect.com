'use client'

import { useState, useMemo } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { OrganizationCard, OrganizationCardSkeleton } from '@/components/organization-card'
import { FilterDropdown } from '@/components/filter-dropdown'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { mockOrganizations, organizationCategories } from '@/lib/data'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  Search,
  Users
} from 'lucide-react'

export default function OrganizationsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Filter organizations
  const filteredOrganizations = useMemo(() => {
    return mockOrganizations.filter(org => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (!org.name.toLowerCase().includes(query) && 
            !org.description.toLowerCase().includes(query)) {
          return false
        }
      }
      
      // Category filter
      if (categoryFilter !== 'all' && org.category !== categoryFilter) {
        return false
      }
      
      return true
    })
  }, [searchQuery, categoryFilter])

  // Total members
  const totalMembers = useMemo(() => {
    return mockOrganizations.reduce((sum, org) => sum + org.memberCount, 0)
  }, [])

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
          <h1 className="text-xl font-bold text-foreground">Student Organizations</h1>
          <p className="text-sm text-muted-foreground">
            {mockOrganizations.length} organizations, {totalMembers}+ active members
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search organizations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          <FilterDropdown
            label="Category"
            value={categoryFilter}
            options={[
              { value: 'all', label: 'All Categories' },
              ...organizationCategories.map(c => ({ value: c.id, label: c.label }))
            ]}
            onChange={setCategoryFilter}
          />
        </div>

        {/* Category Quick Links */}
        {!searchQuery && categoryFilter === 'all' && (
          <section className="mb-6">
            <h2 className="text-base font-semibold text-foreground mb-3">Browse by Category</h2>
            <div className="flex flex-wrap gap-2">
              {organizationCategories.map((category) => (
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

        {/* Organizations Grid */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">
              {categoryFilter !== 'all' 
                ? organizationCategories.find(c => c.id === categoryFilter)?.label + 's'
                : 'All Organizations'}
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

          {filteredOrganizations.length === 0 ? (
            <EmptyState
              icon="organization"
              title="No organizations found"
              description={searchQuery || categoryFilter !== 'all'
                ? "Try adjusting your search or filters to find organizations."
                : "No student organizations registered yet."}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredOrganizations.map((organization) => (
                <OrganizationCard key={organization.id} organization={organization} />
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
