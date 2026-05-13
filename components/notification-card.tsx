'use client'

import { Notification, NotificationType } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  GraduationCap, 
  Building2, 
  CalendarDays, 
  Award, 
  Settings, 
  Trash2,
  Check
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatTimeAgo } from './announcement-card'

interface NotificationCardProps {
  notification: Notification
  onMarkAsRead?: (id: string) => void
  onDelete?: (id: string) => void
  className?: string
}

const typeConfig: Record<NotificationType, { icon: typeof GraduationCap; color: string; label: string }> = {
  academic: {
    icon: GraduationCap,
    color: 'bg-blue-500/10 text-blue-600',
    label: 'Academic',
  },
  administrative: {
    icon: Building2,
    color: 'bg-amber-500/10 text-amber-600',
    label: 'Administrative',
  },
  event: {
    icon: CalendarDays,
    color: 'bg-emerald-500/10 text-emerald-600',
    label: 'Event',
  },
  scholarship: {
    icon: Award,
    color: 'bg-purple-500/10 text-purple-600',
    label: 'Scholarship',
  },
  system: {
    icon: Settings,
    color: 'bg-slate-500/10 text-slate-600',
    label: 'System',
  },
}

export function NotificationCard({
  notification,
  onMarkAsRead,
  onDelete,
  className,
}: NotificationCardProps) {
  const config = typeConfig[notification.type]
  const Icon = config.icon

  return (
    <Card 
      className={cn(
        'overflow-hidden transition-all cursor-pointer group',
        !notification.read && 'bg-primary/5 border-primary/20',
        className
      )}
      onClick={() => onMarkAsRead?.(notification.id)}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
            config.color
          )}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className={cn(
                'font-medium text-foreground',
                !notification.read && 'font-semibold'
              )}>
                {notification.title}
              </h3>
              <div className="flex items-center gap-1">
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
              {notification.message}
            </p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                {formatTimeAgo(notification.createdAt)}
              </p>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {!notification.read && onMarkAsRead && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => {
                      e.stopPropagation()
                      onMarkAsRead(notification.id)
                    }}
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(notification.id)
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
