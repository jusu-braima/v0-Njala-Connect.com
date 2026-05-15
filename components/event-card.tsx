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
  Star
} from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'

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
        <Card className={cn(
          'overflow-hidden hover:shadow-lg transition-all hover:scale-[1.01] cursor-pointer group',
          className
        )}>
          <div className="relative h-48 bg-muted">
            {event.imageUrl ? (
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Calendar className="w-16 h-16 text-primary/30" />
              </div>
            )}
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-primary-foreground">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
            <div className="absolute top-3 right-3 flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                onClick={(e) => {
                  e.preventDefault()
                  onSave?.(event.id)
                }}
              >
                <Bookmark className={cn('w-4 h-4', isSaved && 'fill-current')} />
              </Button>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {categoryInfo?.label}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Users className="w-3 h-3" />
                {event.rsvpCount} going
              </span>
            </div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
              {event.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {event.shortDescription}
            </p>
            <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>{format(event.startDate, 'EEE, MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>{format(event.startDate, 'h:mm a')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={`/events/${event.id}`}>
        <Card className={cn(
          'hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer group',
          className
        )}>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center">
              <span className="text-xs font-semibold text-primary">
                {format(event.startDate, 'MMM')}
              </span>
              <span className="text-lg font-bold text-primary leading-none">
                {format(event.startDate, 'd')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {event.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <span>{format(event.startDate, 'h:mm a')}</span>
                <span className="text-border">|</span>
                <span className="truncate">{event.location}</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/events/${event.id}`}>
      <Card className={cn(
        'hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer group',
        className
      )}>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-primary/10 flex flex-col items-center justify-center">
              <span className="text-xs font-semibold text-primary uppercase">
                {format(event.startDate, 'MMM')}
              </span>
              <span className="text-2xl font-bold text-primary leading-none">
                {format(event.startDate, 'd')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <Badge variant="outline" className="text-xs">
                  {categoryInfo?.label}
                </Badge>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={(e) => {
                      e.preventDefault()
                      onSave?.(event.id)
                    }}
                  >
                    <Bookmark className={cn('w-4 h-4', isSaved && 'fill-current text-primary')} />
                  </Button>
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
                </div>
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                {event.shortDescription}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{format(event.startDate, 'h:mm a')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[120px]">{event.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{event.rsvpCount}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export function EventCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'featured' | 'compact' }) {
  if (variant === 'featured') {
    return (
      <Card className="overflow-hidden animate-pulse">
        <div className="h-48 bg-muted" />
        <CardContent className="p-4">
          <div className="h-5 bg-muted rounded w-20 mb-2" />
          <div className="h-5 bg-muted rounded w-full mb-2" />
          <div className="h-4 bg-muted rounded w-3/4 mb-3" />
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded w-32" />
            <div className="h-3 bg-muted rounded w-24" />
            <div className="h-3 bg-muted rounded w-40" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'compact') {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-muted" />
          <div className="flex-1">
            <div className="h-4 bg-muted rounded w-3/4 mb-1" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="animate-pulse">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className="w-16 h-16 rounded-lg bg-muted" />
          <div className="flex-1">
            <div className="h-5 bg-muted rounded w-20 mb-2" />
            <div className="h-5 bg-muted rounded w-full mb-2" />
            <div className="h-4 bg-muted rounded w-3/4 mb-2" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
