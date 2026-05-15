'use client'

import { useState, useMemo } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { LostItemCard } from '@/components/lost-item-card'
import { FilterDropdown } from '@/components/filter-dropdown'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { mockLostItems, mockFoundItems, lostFoundCategories } from '@/lib/data'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  Search,
  SearchX,
  Package,
  ChevronRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

export default function LostFoundPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'all' | 'lost' | 'found'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
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

  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      if (activeTab !== 'all' && item.type !== activeTab) return false
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false
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
  }, [allItems, activeTab, categoryFilter, statusFilter, searchQuery])

  const stats = useMemo(() => {
    const lost = mockLostItems.filter(i => i.status === 'active').length
    const found = mockFoundItems.filter(i => i.status === 'active').length
    const resolved = allItems.filter(i => i.status === 'resolved' || i.status === 'claimed').length
    return { lost, found, resolved }
  }, [allItems])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader notificationCount={8} />

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-foreground">Lost & Found</h1>
          <p className="text-sm text-muted-foreground">Find or report lost items on campus</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link href="/lost-found/report?type=lost">
            <Card className="h-full hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer group border-destructive/20 bg-destructive/5">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <SearchX className="w-5 h-5 text-destructive" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-destructive transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-destructive transition-colors">
                  Report Lost Item
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Lost something? Let others help find it.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/lost-found/report?type=found">
            <Card className="h-full hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer group border-success/20 bg-success/5">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-success" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-success transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-success transition-colors">
                  Report Found Item
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Found something? Help reunite it with the owner.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 mb-6">
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-destructive">{stats.lost}</p>
            <p className="text-xs text-muted-foreground">Lost Items</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-success">{stats.found}</p>
            <p className="text-xs text-muted-foreground">Found Items</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-primary">{stats.resolved}</p>
            <p className="text-xs text-muted-foreground">Resolved</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'all' | 'lost' | 'found')} className="mb-4">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="lost" className="text-destructive data-[state=active]:text-destructive">
              Lost
            </TabsTrigger>
            <TabsTrigger value="found" className="text-success data-[state=active]:text-success">
              Found
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
          <FilterDropdown
            label="Category"
            value={categoryFilter}
            options={[
              { value: 'all', label: 'All Categories' },
              ...lostFoundCategories.map(c => ({ value: c.id, label: c.label }))
            ]}
            onChange={setCategoryFilter}
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

        {/* Items Feed */}
        {filteredItems.length === 0 ? (
          <EmptyState
            icon="search"
            title="No items found"
            description={searchQuery 
              ? `No results for "${searchQuery}". Try a different search term.`
              : "No items match your current filters."}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredItems.map((item) => (
              <LostItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
