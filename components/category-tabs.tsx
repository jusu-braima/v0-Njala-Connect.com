'use client'

import { cn } from '@/lib/utils'
import { AnnouncementCategory } from '@/lib/types'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface CategoryTabsProps {
  categories: readonly { id: string; label: string }[]
  activeCategory: string
  onCategoryChange: (category: string) => void
  className?: string
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}: CategoryTabsProps) {
  return (
    <ScrollArea className={cn('w-full whitespace-nowrap', className)}>
      <div className="flex gap-2 pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0',
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  )
}
