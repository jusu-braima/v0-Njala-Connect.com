'use client'

import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

interface WelcomeBannerProps {
  userName?: string
}

export function WelcomeBanner({ userName }: WelcomeBannerProps) {
  return (
    <Card className="overflow-hidden relative rounded-xl border-0 shadow-lg group">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/njalauniversity_cover.jfif-7RILqIIA2wqoQ9BP4qqeGpQqWcJFCp.jpeg"
          alt="Njala University Campus"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/75 transition-all duration-500" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-2 right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-pulse-soft" />
      <div className="absolute bottom-2 left-4 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
      
      <CardContent className="p-5 relative z-10">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-white animate-fade-in-up">
            Welcome to
          </h2>
          <h3 className="text-xl font-bold text-white animate-fade-in-up animate-delay-100">
            Njala Campus Connect
          </h3>
          <p className="text-sm text-white/90 mt-2 animate-fade-in-up animate-delay-200">
            Stay informed. Stay connected.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
