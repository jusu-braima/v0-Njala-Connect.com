'use client'

import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

interface WelcomeBannerProps {
  userName?: string
}

export function WelcomeBanner({ userName }: WelcomeBannerProps) {
  return (
    <Card className="overflow-hidden relative rounded-xl border-0 shadow-sm">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/njalauniversity_cover.jfif-7RILqIIA2wqoQ9BP4qqeGpQqWcJFCp.jpeg"
          alt="Njala University Campus"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 to-primary/70" />
      </div>
      <CardContent className="p-5 relative z-10">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-white">
            Welcome to
          </h2>
          <h3 className="text-xl font-bold text-white">
            Njala Campus Connect
          </h3>
          <p className="text-sm text-white/90 mt-2">
            Stay informed. Stay connected.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
