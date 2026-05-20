'use client'

import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface DashboardCardProps {
  title: string
  description?: string
  icon: LucideIcon
  href: string
  count?: number
  variant?: 'default' | 'primary' | 'secondary'
  gradient?: string
  className?: string
}

const variantClasses = {
  default: 'bg-card hover:bg-accent/50 border-border/50',
  primary: 'bg-primary/5 hover:bg-primary/10 border-primary/20',
  secondary: 'bg-secondary hover:bg-secondary/80 border-border/50',
}

export function DashboardCard({
  title,
  description,
  icon: Icon,
  href,
  count,
  variant = 'default',
  gradient,
  className,
}: DashboardCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className={cn(
          'transition-all duration-300 cursor-pointer border overflow-hidden relative group',
          'hover:shadow-xl hover:shadow-primary/5',
          variantClasses[variant],
          className
        )}>
          {/* Gradient overlay on hover */}
          {gradient && (
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300",
              gradient
            )} />
          )}
          
          <CardContent className="p-4 relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300',
                    variant === 'primary' 
                      ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white' 
                      : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                  )}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                </motion.div>
                <div>
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{title}</h3>
                  {description && (
                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {count !== undefined && count > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-xs font-bold bg-primary text-primary-foreground px-2.5 py-1 rounded-full shadow-lg shadow-primary/20"
                  >
                    {count}
                  </motion.span>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}
