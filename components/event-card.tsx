'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CampusEvent } from '@/lib/types'
import { eventCategories } from '@/lib/data'
import { cn } from '@/lib/utils'
import { 
  MapPin, 
  Calendar, 
  Clock,
  Users,
  Bookmark,
  Share2,
  ChevronRight,
  Star,
  Sparkles
} from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface EventCardProps {
  event: CampusEvent
  className?: string
  variant?: 'default' | 'featured' | 'compact'
  onSave?: (eventId: string) => void
  onShare?: (eventId: string) => void
  isSaved?: boolean
}

export function EventCard({ 
  event, 
  className, 
  variant = 'default',
  onSave,
  onShare,
  isSaved = false
}: EventCardProps) {
  const categoryInfo = eventCategories.find(c => c.id === event.category)

  if (variant === 'featured') {
    return (
      <Link href={`/events/${event.id}`}>
        <motion.div
          whileHover={{ y: -6, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Card className={cn(
            'overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all cursor-pointer group border-border/50',
            className
          )}>
            <div className="relative h-48 bg-muted overflow-hidden">
              {event.imageUrl ? (
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Calendar className="w-16 h-16 text-primary/30" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 left-3">
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Featured
                </Badge>
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-9 w-9 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                    onClick={(e) => {
                      e.preventDefault()
                      onSave?.(event.id)
                    }}
                  >
                    <Bookmark className={cn('w-4 h-4', isSaved && 'fill-primary text-primary')} />
                  </Button>
                </motion.div>
              </div>
              {/* Date badge */}
              <div className="absolute bottom-3 left-3">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                    {format(event.startDate, 'MMM')}
                  </span>
                  <p className="text-xl font-bold text-foreground leading-none">
                    {format(event.startDate, 'd')}
                  </p>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant="outline" className="text-xs font-semibold">
                  {categoryInfo?.label}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {event.rsvpCount} going
                </span>
              </div>
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 font-display">
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {event.shortDescription}
              </p>
              <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-3 h-3 text-primary" />
                  </div>
                  <span>{format(event.startDate, 'h:mm a')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-3 h-3 text-primary" />
                  </div>
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={`/events/${event.id}`}>
        <motion.div
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Card className={cn(
            'hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group border-border/50',
            className
          )}>
            <CardContent className="p-3 flex items-center gap-3">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex flex-col items-center justify-center border border-primary/10">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                  {format(event.startDate, 'MMM')}
                </span>
                <span className="text-xl font-bold text-primary leading-none">
                  {format(event.startDate, 'd')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {event.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {format(event.startDate, 'h:mm a')}
                  </span>
                  <span className="text-border">|</span>
                  <span className="truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </CardContent>
          </Card>
        </motion.div>
      </Link>
    )
  }

  return (
    <Link href={`/events/${event.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className={cn(
          'hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group border-border/50',
          className
        )}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-emerald-100 flex flex-col items-center justify-center border border-primary/10">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                  {format(event.startDate, 'MMM')}
                </span>
                <span className="text-2xl font-bold text-primary leading-none">
                  {format(event.startDate, 'd')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <Badge variant="outline" className="text-xs font-semibold">
                    {categoryInfo?.label}
                  </Badge>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.preventDefault()
                          onSave?.(event.id)
                        }}
                      >
                        <Bookmark className={cn('w-4 h-4', isSaved && 'fill-primary text-primary')} />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.preventDefault()
                          onShare?.(event.id)
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                  {event.shortDescription}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{format(event.startDate, 'h:mm a')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span className="truncate max-w-[120px]">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    <span>{event.rsvpCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}

export function EventCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'featured' | 'compact' }) {
  if (variant === 'featured') {
    return (
      <Card className="overflow-hidden">
        <div className="h-48 skeleton" />
        <CardContent className="p-4">
          <div className="h-5 skeleton rounded w-20 mb-2" />
          <div className="h-5 skeleton rounded w-full mb-2" />
          <div className="h-4 skeleton rounded w-3/4 mb-3" />
          <div className="space-y-2">
            <div className="h-3 skeleton rounded w-32" />
            <div className="h-3 skeleton rounded w-24" />
            <div className="h-3 skeleton rounded w-40" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'compact') {
    return (
      <Card>
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl skeleton" />
          <div className="flex-1">
            <div className="h-4 skeleton rounded w-3/4 mb-1" />
            <div className="h-3 skeleton rounded w-1/2" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-xl skeleton" />
          <div className="flex-1">
            <div className="h-5 skeleton rounded w-20 mb-2" />
            <div className="h-5 skeleton rounded w-full mb-2" />
            <div className="h-4 skeleton rounded w-3/4 mb-2" />
            <div className="h-3 skeleton rounded w-1/2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
