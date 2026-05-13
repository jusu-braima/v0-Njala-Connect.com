'use client'

import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface DashboardCardProps {
  title: string
  description?: string
  icon: LucideIcon
  href: string
  count?: number
  variant?: 'default' | 'primary' | 'secondary'
  className?: string
}

const variantClasses = {
  default: 'bg-card hover:bg-accent/50',
  primary: 'bg-primary/5 hover:bg-primary/10 border-primary/20',
  secondary: 'bg-secondary hover:bg-secondary/80',
}

export function DashboardCard({
  title,
  description,
  icon: Icon,
  href,
  count,
  variant = 'default',
  className,
}: DashboardCardProps) {
  return (
    <Link href={href}>
      <Card className={cn(
        'transition-all duration-200 hover:shadow-md cursor-pointer border',
        variantClasses[variant],
        className
      )}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center',
                variant === 'primary' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                {description && (
                  <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
                )}
              </div>
            </div>
            {count !== undefined && count > 0 && (
              <span className="text-xs font-medium bg-primary text-primary-foreground px-2 py-1 rounded-full">
                {count}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
