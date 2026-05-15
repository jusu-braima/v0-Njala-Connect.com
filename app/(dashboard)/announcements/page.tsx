'use client'

import { useState, useMemo, useEffect } from 'react'
import { BottomNav } from '@/components/bottom-nav'
import { AnnouncementCard } from '@/components/announcement-card'
import { EmptyState } from '@/components/empty-state'
import { SkeletonList } from '@/components/skeleton-cards'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { mockAnnouncements } from '@/lib/data'
import { Filter, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'academic', label: 'Exams' },
  { id: 'general', label: 'General' },
  { id: 'event', label: 'Events' },
  { id: 'scholarship', label: 'Scholarships' },
]

export default function AnnouncementsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

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
    if (activeCategory === 'all') return mockAnnouncements
    return mockAnnouncements.filter(a => a.category === activeCategory)
  }, [activeCategory])

  const handleBookmark = (id: string) => {
    console.log('Bookmark:', id)
  }

  const handleShare = (id: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Announcement',
        url: `/announcements/${id}`,
      })
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary">
        <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-white">Announcements</h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Category Pills */}
      <div className="bg-background border-b border-border sticky top-14 z-30">
        <div className="px-4 py-3 max-w-lg mx-auto">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  activeCategory === cat.id
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

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
            icon="megaphone"
            title="No Announcements Found"
            description="There are no announcements in this category yet."
          />
        )}
      </main>

      <BottomNav />
    </div>
  )
}
