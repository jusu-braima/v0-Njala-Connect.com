'use client'

import Image from 'next/image'

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
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
}

export function Logo({ size = 'md', showText = true, variant = 'dark', className = '' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-foreground'

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Njala.jfif-69pQDCqYf2xse8w8qT1X3fCj4VsjRU.jpeg"
          alt="Njala University Crest"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <div className="text-center">
          <h1 className={`font-bold ${textSizeClasses[size]} ${textColor} tracking-tight`}>
            NjalaConnect
          </h1>
          {size === 'xl' && (
            <p className={`text-sm ${variant === 'light' ? 'text-white/70' : 'text-muted-foreground'} mt-1`}>
              Knowledge and Service
            </p>
          )}
        </div>
      )}
    </div>
  )
}
