'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/empty-state'
import { mockAnnouncements, mockCourses, mockNotifications } from '@/lib/data'
import { 
  Search, 
  X, 
  ArrowLeft,
  Megaphone,
  BookOpen,
  Bell,
  CalendarDays,
  Clock,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { formatTimeAgo } from '@/components/announcement-card'

interface SearchResult {
  id: string
  type: 'announcement' | 'course' | 'notification' | 'event'
  title: string
  subtitle: string
  url: string
  meta?: string
}

const typeConfig = {
  announcement: { icon: Megaphone, color: 'bg-blue-500/10 text-blue-600', label: 'Announcement' },
  course: { icon: BookOpen, color: 'bg-emerald-500/10 text-emerald-600', label: 'Course' },
  notification: { icon: Bell, color: 'bg-amber-500/10 text-amber-600', label: 'Notification' },
  event: { icon: CalendarDays, color: 'bg-purple-500/10 text-purple-600', label: 'Event' },
}

export default function SearchPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [recentSearches] = useState(['Examination', 'Registration', 'CSC 201', 'Scholarship'])

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return []

    const q = query.toLowerCase()
    const searchResults: SearchResult[] = []

    // Search announcements
    mockAnnouncements.forEach(a => {
      if (
        a.title.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) ||
        a.department.toLowerCase().includes(q)
      ) {
        searchResults.push({
          id: `announcement-${a.id}`,
          type: 'announcement',
          title: a.title,
          subtitle: a.excerpt || a.content.slice(0, 100),
          url: `/announcements/${a.id}`,
          meta: formatTimeAgo(a.createdAt),
        })
      }
    })

    // Search courses
    mockCourses.forEach(c => {
      if (
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.lecturer.toLowerCase().includes(q)
      ) {
        searchResults.push({
          id: `course-${c.id}`,
          type: 'course',
          title: `${c.code} - ${c.title}`,
          subtitle: c.lecturer,
          url: `/courses/${c.id}`,
          meta: `${c.credits} credits`,
        })
      }
    })

    // Search notifications
    mockNotifications.forEach(n => {
      if (
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q)
      ) {
        searchResults.push({
          id: `notification-${n.id}`,
          type: 'notification',
          title: n.title,
          subtitle: n.message,
          url: '/notifications',
          meta: formatTimeAgo(n.createdAt),
        })
      }
    })

    return searchResults.slice(0, 15)
  }, [query])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center gap-2 px-4 h-14 max-w-2xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search announcements, courses, events..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 pr-9"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setQuery('')}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="px-4 py-4 max-w-2xl mx-auto">
        {!query && (
          <>
            {/* Recent Searches */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors"
                  >
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/announcements">
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Megaphone className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">All Announcements</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/courses">
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="font-medium">My Courses</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/notifications">
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <Bell className="w-4 h-4 text-amber-600" />
                      </div>
                      <span className="font-medium">Notifications</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </>
        )}

        {query && results.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </p>
            <div className="space-y-2">
              {results.map((result) => {
                const config = typeConfig[result.type]
                const Icon = config.icon

                return (
                  <Link key={result.id} href={result.url}>
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <div className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                            config.color
                          )}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {config.label}
                              </Badge>
                              {result.meta && (
                                <span className="text-xs text-muted-foreground">
                                  {result.meta}
                                </span>
                              )}
                            </div>
                            <h4 className="font-medium text-foreground line-clamp-1">
                              {result.title}
                            </h4>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {result.subtitle}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 self-center" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {query && results.length === 0 && (
          <EmptyState
            icon="search"
            title="No Results Found"
            description={`We couldn't find anything matching "${query}". Try different keywords.`}
            action={{
              label: 'Clear Search',
              onClick: () => setQuery(''),
            }}
          />
        )}
      </main>
    </div>
  )
}
