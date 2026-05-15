'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge, TypeBadge } from '@/components/status-badge'
import { LostFoundItem } from '@/lib/types'
import { lostFoundCategories } from '@/lib/data'
import { cn } from '@/lib/utils'
import { 
  MapPin, 
  Calendar,
  Phone,
  ChevronRight,
  CreditCard,
  Smartphone,
  Wallet,
  Laptop,
  BookOpen,
  Key,
  Package
} from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'

const categoryIcons = {
  'student-id': CreditCard,
  phone: Smartphone,
  wallet: Wallet,
  laptop: Laptop,
  books: BookOpen,
  keys: Key,
  others: Package,
}

interface LostItemCardProps {
  item: LostFoundItem
  className?: string
  showActions?: boolean
}

export function LostItemCard({ item, className, showActions = true }: LostItemCardProps) {
  const categoryInfo = lostFoundCategories.find(c => c.id === item.category)
  const CategoryIcon = categoryIcons[item.category]

  return (
    <Card className={cn(
      'hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer group overflow-hidden',
      className
    )}>
      {item.imageUrl && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <TypeBadge type={item.type} />
            <StatusBadge status={item.status} />
          </div>
          {showActions && (
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </div>

        <div className="flex items-start gap-3 mb-3">
          <div className={cn(
            'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
            item.type === 'lost' 
              ? 'bg-destructive/10 text-destructive'
              : 'bg-success/10 text-success'
          )}>
            <CategoryIcon className="w-4.5 h-4.5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {categoryInfo?.label}
            </p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {item.description}
        </p>

        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{format(item.date, 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            <span>{item.contactInfo}</span>
          </div>
        </div>

        {showActions && item.status === 'active' && (
          <div className="mt-3 pt-3 border-t border-border">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              {item.type === 'lost' ? 'I Found This' : 'This is Mine'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface LostItemCardSkeletonProps {
  className?: string
}

export function LostItemCardSkeleton({ className }: LostItemCardSkeletonProps) {
  return (
    <Card className={cn('animate-pulse', className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 bg-muted rounded w-12" />
          <div className="h-5 bg-muted rounded w-14" />
        </div>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-muted" />
          <div className="flex-1">
            <div className="h-5 bg-muted rounded w-3/4 mb-1" />
            <div className="h-3 bg-muted rounded w-1/4" />
          </div>
        </div>
        <div className="h-10 bg-muted rounded mb-3" />
        <div className="flex flex-col gap-1.5">
          <div className="h-3 bg-muted rounded w-32" />
          <div className="h-3 bg-muted rounded w-24" />
          <div className="h-3 bg-muted rounded w-28" />
        </div>
      </CardContent>
    </Card>
  )
}
