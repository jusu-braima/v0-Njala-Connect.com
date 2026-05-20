'use client'

import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
  fullScreen?: boolean
}

const sizeClasses = {
  sm: { spinner: 'w-5 h-5', ring: 'w-4 h-4 border-2' },
  md: { spinner: 'w-8 h-8', ring: 'w-6 h-6 border-2' },
  lg: { spinner: 'w-12 h-12', ring: 'w-10 h-10 border-3' },
}

export function LoadingSpinner({ size = 'md', className, text, fullScreen }: LoadingSpinnerProps) {
  const content = (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn('flex flex-col items-center justify-center gap-3', className)}
    >
      <div className="relative">
        {/* Outer glow */}
        <div className={cn(
          "absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150 animate-pulse-soft"
        )} />
        
        {/* Spinning ring */}
        <div className={cn(
          "relative rounded-full border-primary/20 border-t-primary animate-spin",
          sizeClasses[size].spinner
        )} style={{ borderWidth: size === 'lg' ? '3px' : '2px' }} />
        
        {/* Center icon */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className={cn(
            'text-primary',
            size === 'sm' ? 'w-2.5 h-2.5' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
          )} />
        </motion.div>
      </div>
      
      {text && (
        <motion.p 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-muted-foreground font-medium"
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  )

  if (fullScreen) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-md z-50"
      >
        {content}
      </motion.div>
    )
  }

  return content
}
