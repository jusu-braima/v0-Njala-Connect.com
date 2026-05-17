'use client'

import { useState, useMemo, useEffect } from 'react'
import { BottomNav } from '@/components/bottom-nav'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { mockAnnouncements } from '@/lib/data'
import { Filter, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'exams', label: 'Exams' },
  { id: 'general', label: 'General' },
  { id: 'events', label: 'Events' },
  { id: 'scholarships', label: 'Scholarships' },
]

// Category badge colors matching the design
const categoryColors: Record<string, string> = {
  exams: 'bg-primary text-white',
  registration: 'bg-blue-500 text-white',
  events: 'bg-amber-500 text-white',
  scholarships: 'bg-emerald-500 text-white',
  general: 'bg-slate-500 text-white',
}

export default function AnnouncementsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState<string>('all')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const filteredAnnouncements = useMemo(() => {
    if (activeCategory === 'all') return mockAnnouncements
    return mockAnnouncements.filter(a => a.category === activeCategory)
  }, [activeCategory])

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
        {filteredAnnouncements.length > 0 ? (
          <div className="space-y-3">
            {filteredAnnouncements.map((announcement) => {
              const categoryLabel = announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)
              
              return (
                <Link key={announcement.id} href={`/announcements/${announcement.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge className={cn('text-[10px] font-medium rounded', categoryColors[announcement.category] || categoryColors.general)}>
                          {categoryLabel.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDistanceToNow(announcement.createdAt, { addSuffix: false })}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {announcement.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {announcement.excerpt || announcement.content}
                      </p>
                      
                      <p className="text-xs text-muted-foreground">
                        By: {announcement.author}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
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
