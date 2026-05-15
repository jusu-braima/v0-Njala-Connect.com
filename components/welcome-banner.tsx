'use client'

import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

interface WelcomeBannerProps {
  userName?: string
}

export function WelcomeBanner({ userName }: WelcomeBannerProps) {
  const firstName = userName?.split(' ')[0] || 'Student'

  return (
    <Card className="overflow-hidden relative rounded-xl border-0 shadow-sm">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/njalauniversity_cover.jfif-9BsjPBYwC2Ag7E6d35Cb4Ev3L5VDr5.jpeg"
          alt="Njala University Campus"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>
      <CardContent className="p-5 relative z-10">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white">
            Welcome Back!
          </h2>
          <p className="text-sm text-white/80">
            Stay updated, stay connected.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
