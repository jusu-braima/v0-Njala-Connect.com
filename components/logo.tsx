'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  variant?: 'light' | 'dark'
  className?: string
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
  xl: 'w-28 h-28',
}

const textSizeClasses = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
  xl: 'text-2xl',
}

export function Logo({ size = 'md', showText = true, variant = 'dark', className = '' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-[#002855]'

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className={cn(sizeClasses[size], 'relative')}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Njala.jfif-2xRQon4U6BqdG1zBrRnjalSVldfkPS.jpeg"
          alt="Njala University Crest"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <div className="text-center">
          <h1 className={cn('font-bold tracking-tight', textSizeClasses[size], textColor)}>
            NJALA CAMPUS CONNECT
          </h1>
          {(size === 'xl' || size === 'lg') && (
            <p className={cn('text-xs mt-0.5', variant === 'light' ? 'text-white/70' : 'text-muted-foreground')}>
              Knowledge and Service
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export function LogoHorizontal({ size = 'md', variant = 'dark', className = '' }: Omit<LogoProps, 'showText'>) {
  const textColor = variant === 'light' ? 'text-white' : 'text-[#002855]'
  
  const imgSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn(imgSizes[size], 'relative flex-shrink-0')}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Njala.jfif-2xRQon4U6BqdG1zBrRnjalSVldfkPS.jpeg"
          alt="Njala University Crest"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div>
        <h1 className={cn('font-bold tracking-tight', textColor, size === 'sm' ? 'text-sm' : 'text-base')}>
          Njala Campus Connect
        </h1>
      </div>
    </div>
  )
}
