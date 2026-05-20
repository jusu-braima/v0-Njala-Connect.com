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
import { Filter, ArrowLeft, Megaphone, ChevronRight, TrendingUp, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'exams', label: 'Exams' },
  { id: 'general', label: 'General' },
  { id: 'events', label: 'Events' },
  { id: 'scholarships', label: 'Scholarships' },
]

// Category badge colors matching the design
const categoryColors: Record<string, string> = {
  exams: 'bg-rose-500 text-white',
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
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-gradient-to-r from-primary to-emerald-600 shadow-lg shadow-primary/20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-emerald-600/95 backdrop-blur-md" />
        <div className="relative flex items-center justify-between px-4 h-16 max-w-lg mx-auto">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-xl">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-white/80" />
            <h1 className="text-lg font-bold text-white font-display">Announcements</h1>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-xl">
              <Filter className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </motion.header>

      {/* Category Pills */}
      <div className="bg-background/80 backdrop-blur-xl border-b border-border/50 sticky top-16 z-30">
        <div className="px-4 py-3 max-w-lg mx-auto">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat, index) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300',
                  activeCategory === cat.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <main className="px-4 py-5 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {filteredAnnouncements.length > 0 ? (
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {filteredAnnouncements.map((announcement, index) => {
                const categoryLabel = announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)
                
                return (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/announcements/${announcement.id}`}>
                      <Card className="cursor-pointer border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <Badge className={cn('text-[10px] font-bold rounded-lg', categoryColors[announcement.category] || categoryColors.general)}>
                              {categoryLabel.toUpperCase()}
                            </Badge>
                            <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {formatDistanceToNow(announcement.createdAt, { addSuffix: false })}
                            </span>
                          </div>
                          
                          <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {announcement.title}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {announcement.excerpt || announcement.content}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              By: {announcement.author}
                            </p>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <EmptyState
                icon="megaphone"
                title="No Announcements Found"
                description="There are no announcements in this category yet."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav />
    </div>
  )
}
