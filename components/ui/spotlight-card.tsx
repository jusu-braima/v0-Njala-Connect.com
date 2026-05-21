'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  spotlightColor?: string
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = 'oklch(0.52 0.17 155 / 0.1)',
  ...props
}: SpotlightCardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPosition({ x, y })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-300',
        'hover:shadow-lg hover:shadow-primary/5',
        className
      )}
      style={{
        '--spotlight-x': `${position.x}%`,
        '--spotlight-y': `${position.y}%`,
      } as React.CSSProperties}
      {...props}
    >
      {/* Spotlight effect */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 transition-opacity duration-300',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          background: `radial-gradient(circle at var(--spotlight-x) var(--spotlight-y), ${spotlightColor} 0%, transparent 50%)`,
        }}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
