'use client'

import { GraduationCap } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  variant?: 'light' | 'dark'
  className?: string
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
}

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-4xl',
}

export function Logo({ size = 'md', showText = true, variant = 'dark', className = '' }: LogoProps) {
  const iconColor = variant === 'light' ? 'text-white' : 'text-primary'
  const textColor = variant === 'light' ? 'text-white' : 'text-foreground'

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center ${variant === 'light' ? 'bg-white/20' : 'bg-primary/10'}`}>
        <GraduationCap className={`${iconColor} ${size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-7 h-7' : size === 'lg' ? 'w-10 h-10' : 'w-14 h-14'}`} />
      </div>
      {showText && (
        <div className="text-center">
          <h1 className={`font-bold ${textSizeClasses[size]} ${textColor} tracking-tight`}>
            NjalaConnect
          </h1>
        </div>
      )}
    </div>
  )
}
