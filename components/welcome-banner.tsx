'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface WelcomeBannerProps {
  userName?: string
}

export function WelcomeBanner({ userName }: WelcomeBannerProps) {
  return (
    <Card className="overflow-hidden bg-primary text-primary-foreground relative">
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/njalauniversity_cover.jfif-7VWDFFIMhViXiERgBJ12MTvXRYfXgE.jpeg)',
        }}
      />
      <CardContent className="p-5 relative z-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">
              Stay informed. Stay connected.
            </h2>
            <p className="text-sm text-primary-foreground/80">
              Your campus updates at a glance
            </p>
          </div>
          <Link href="/announcements">
            <Button 
              variant="secondary" 
              size="sm"
              className="flex-shrink-0"
            >
              View Updates
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
