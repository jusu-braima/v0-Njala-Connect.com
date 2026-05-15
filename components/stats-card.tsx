'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  description?: string
  trend?: {
    value: number
    label: string
    positive?: boolean
  }
  color?: 'primary' | 'success' | 'warning' | 'destructive'
  className?: string
}

const colorClasses = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-destructive/10 text-destructive',
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  color = 'primary',
  className
}: StatsCardProps) {
  return (
    <Card className={cn('', className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <p className="text-2xl font-bold text-foreground">
              {value}
            </p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <span className={cn(
                  'text-xs font-medium',
                  trend.positive ? 'text-success' : 'text-destructive'
                )}>
                  {trend.positive ? '+' : ''}{trend.value}%
                </span>
                <span className="text-xs text-muted-foreground">
                  {trend.label}
                </span>
              </div>
            )}
          </div>
          <div className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
            colorClasses[color]
          )}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface StatsGridProps {
  children: React.ReactNode
  className?: string
}

export function StatsGrid({ children, className }: StatsGridProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-3', className)}>
      {children}
    </div>
  )
}
