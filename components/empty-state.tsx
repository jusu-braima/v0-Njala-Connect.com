'use client'

import { cn } from '@/lib/utils'
import { FileQuestion, Inbox, Search, AlertCircle, Bell, BookOpen, Megaphone, CheckCircle, SearchX, Package, Calendar, Gift, Users } from 'lucide-react'

interface EmptyStateProps {
  icon?: 'inbox' | 'search' | 'file' | 'alert' | 'bell' | 'book' | 'megaphone' | 'check' | 'lost' | 'found' | 'event' | 'opportunity' | 'organization'
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

const icons = {
  inbox: Inbox,
  search: Search,
  file: FileQuestion,
  alert: AlertCircle,
  bell: Bell,
  book: BookOpen,
  megaphone: Megaphone,
  check: CheckCircle,
  lost: SearchX,
  found: Package,
  event: Calendar,
  opportunity: Gift,
  organization: Users,
}

export function EmptyState({
  icon = 'inbox',
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  const Icon = icons[icon]

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-lg text-foreground mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
    </div>
  )
}
