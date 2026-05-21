'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  glowColor?: 'primary' | 'emerald' | 'cyan' | 'amber'
  intensity?: 'subtle' | 'medium' | 'strong'
  animated?: boolean
}

const glowColors = {
  primary: {
    from: 'oklch(0.52 0.17 155)',
    via: 'oklch(0.6 0.15 190)',
    to: 'oklch(0.55 0.12 160)',
  },
  emerald: {
    from: 'oklch(0.6 0.17 160)',
    via: 'oklch(0.55 0.14 170)',
    to: 'oklch(0.65 0.13 155)',
  },
  cyan: {
    from: 'oklch(0.6 0.15 200)',
    via: 'oklch(0.55 0.14 210)',
    to: 'oklch(0.58 0.12 195)',
  },
  amber: {
    from: 'oklch(0.75 0.16 75)',
    via: 'oklch(0.7 0.18 65)',
    to: 'oklch(0.72 0.15 85)',
  },
}

const intensityMap = {
  subtle: { opacity: 0.3, blur: '15px' },
  medium: { opacity: 0.5, blur: '20px' },
  strong: { opacity: 0.7, blur: '30px' },
}

export function GlowingCard({
  children,
  className,
  glowColor = 'primary',
  intensity = 'medium',
  animated = true,
  ...props
}: GlowingCardProps) {
  const colors = glowColors[glowColor]
  const intensityConfig = intensityMap[intensity]

  return (
    <div className={cn('relative group', className)} {...props}>
      {/* Glow effect container */}
      <motion.div
        className="absolute -inset-[2px] rounded-[calc(var(--radius-lg)+2px)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, ${colors.from}, ${colors.via}, ${colors.to}, ${colors.from})`,
          backgroundSize: '300% 100%',
          filter: `blur(${intensityConfig.blur})`,
          opacity: intensityConfig.opacity,
        }}
        animate={
          animated
            ? {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }
            : {}
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Border gradient */}
      <motion.div
        className="absolute -inset-[1px] rounded-[calc(var(--radius-lg)+1px)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${colors.from}, ${colors.via}, ${colors.to}, ${colors.from})`,
          backgroundSize: '300% 100%',
        }}
        animate={
          animated
            ? {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Main card content */}
      <div className="relative bg-card rounded-lg p-4 h-full border border-border/50 transition-all duration-300 group-hover:border-transparent">
        {children}
      </div>
    </div>
  )
}
