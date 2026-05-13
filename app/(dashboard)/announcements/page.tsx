'use client'

import { useState, useMemo, useEffect } from 'react'
import { BottomNav } from '@/components/bottom-nav'
import { CategoryTabs } from '@/components/category-tabs'
import { AnnouncementCard } from '@/components/announcement-card'
import { SearchBar } from '@/components/search-bar'
import { EmptyState } from '@/components/empty-state'
import { SkeletonList } from '@/components/skeleton-cards'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { mockAnnouncements, announcementCategories } from '@/lib/data'
import { AnnouncementCategory } from '@/lib/types'
import { Search, SlidersHorizontal, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AnnouncementsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const filteredAnnouncements = useMemo(() => {
    let filtered = mockAnnouncements

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(a => a.category === activeCategory)
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        a =>
          a.title.toLowerCase().includes(query) ||
          a.content.toLowerCase().includes(query) ||
          a.department.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [activeCategory, searchQuery])

  const handleBookmark = (id: string) => {
    // TODO: Implement bookmark functionality
    console.log('Bookmark:', id)
  }

  const handleShare = (id: string) => {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: 'Announcement',
        url: `/announcements/${id}`,
      })
    }
  }

  const unreadCount = 3 // Mock unread count

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
          {showSearch ? (
            <div className="flex items-center gap-2 w-full">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowSearch(false)
                  setSearchQuery('')
                }}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <SearchBar
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="flex-1"
                recentSearches={['Examination', 'Registration', 'Scholarship']}
                suggestions={['Exam timetable', 'Course registration', 'Library hours']}
              />
            </div>
          ) : (
            <>
              <div>
                <h1 className="text-xl font-bold text-foreground">Announcements</h1>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
                  <Search className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <SlidersHorizontal className="w-5 h-5" />
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Category Tabs */}
        {!showSearch && (
          <div className="px-4 pb-3 max-w-lg mx-auto">
            <CategoryTabs
              categories={announcementCategories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        )}
      </header>

      <main className="px-4 py-4 max-w-lg mx-auto">
        {isLoading ? (
          <SkeletonList variant="announcement" count={4} />
        ) : filteredAnnouncements.length > 0 ? (
          <div className="space-y-3">
            {filteredAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onBookmark={handleBookmark}
                onShare={handleShare}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="inbox"
            title="No Announcements Found"
            description={
              searchQuery
                ? `No results for "${searchQuery}". Try a different search term.`
                : 'There are no announcements in this category yet.'
            }
            action={
              searchQuery
                ? {
                    label: 'Clear Search',
                    onClick: () => setSearchQuery(''),
                  }
                : undefined
            }
          />
        )}
      </main>

      <BottomNav notificationCount={unreadCount} />
    </div>
  )
}
