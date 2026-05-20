'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  variant?: 'light' | 'dark'
  className?: string
  animated?: boolean
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
  xl: 'w-28 h-28',
}

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

export function Logo({ size = 'md', showText = true, variant = 'dark', className = '', animated = true }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-foreground'
  const subtextColor = variant === 'light' ? 'text-white/70' : 'text-muted-foreground'

  const Wrapper = animated ? motion.div : 'div'
  const wrapperProps = animated ? {
    whileHover: { scale: 1.02 },
    transition: { type: "spring", stiffness: 300 }
  } : {}

  return (
    <Wrapper className={cn('flex flex-col items-center gap-2', className)} {...wrapperProps}>
      <div className={cn(sizeClasses[size], 'relative')}>
        {/* Glow effect */}
        <div className={cn(
          "absolute inset-0 bg-primary/20 rounded-full blur-xl scale-110 animate-pulse-soft",
          size === 'sm' && 'scale-125'
        )} />
        
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Njala.jfif-2xRQon4U6BqdG1zBrRnjalSVldfkPS.jpeg"
          alt="Njala University Crest"
          fill
          className="object-contain relative z-10 drop-shadow-lg"
          priority
        />
      </div>
      {showText && (
        <div className="text-center">
          <h1 className={cn('font-bold tracking-tight font-display', textSizeClasses[size], textColor)}>
            NJALA CAMPUS CONNECT
          </h1>
          {(size === 'xl' || size === 'lg') && (
            <p className={cn('text-xs mt-1 font-medium tracking-wider', subtextColor)}>
              Knowledge and Service
            </p>
          )}
        </div>
      )}
    </Wrapper>
  )
}

export function LogoHorizontal({ size = 'md', variant = 'dark', className = '', animated = true }: Omit<LogoProps, 'showText'>) {
  const textColor = variant === 'light' ? 'text-white' : 'text-foreground'
  
  const imgSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
  }

  const Wrapper = animated ? motion.div : 'div'
  const wrapperProps = animated ? {
    whileHover: { scale: 1.02 },
    transition: { type: "spring", stiffness: 300 }
  } : {}

  return (
    <Wrapper className={cn('flex items-center gap-3', className)} {...wrapperProps}>
      <div className={cn(imgSizes[size], 'relative flex-shrink-0')}>
        {/* Subtle glow */}
        <div className="absolute inset-0 bg-primary/15 rounded-full blur-lg scale-125" />
        
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Njala.jfif-2xRQon4U6BqdG1zBrRnjalSVldfkPS.jpeg"
          alt="Njala University Crest"
          fill
          className="object-contain relative z-10 drop-shadow-md"
          priority
        />
      </div>
      <div>
        <h1 className={cn('font-bold tracking-tight font-display', textColor, size === 'sm' ? 'text-sm' : 'text-base')}>
          Njala Campus Connect
        </h1>
      </div>
    </Wrapper>
  )
}
