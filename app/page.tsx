'use client'

import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import Link from 'next/link'
import Image from 'next/image'

export default function SplashPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-primary">
      {/* Background campus image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/njalauniversity_cover.jfif-7VWDFFIMhViXiERgBJ12MTvXRYfXgE.jpeg"
          alt="Njala University Campus"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/95 to-primary" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-40 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="text-center space-y-6">
          {/* Logo with University Crest */}
          <div className="bg-white/95 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
            <Logo size="xl" variant="dark" />
          </div>
          
          {/* Tagline */}
          <p className="text-white/90 text-lg font-medium max-w-xs mx-auto leading-relaxed mt-6">
            One Campus. One Community. Connected.
          </p>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="px-6 pb-12 pt-6 space-y-3 relative z-10">
        <Link href="/onboarding" className="block">
          <Button 
            size="lg" 
            className="w-full bg-white text-primary hover:bg-white/90 font-semibold h-14 text-base rounded-xl shadow-lg"
          >
            Get Started
          </Button>
        </Link>
        <Link href="/login" className="block">
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full bg-transparent border-white/30 text-white hover:bg-white/10 font-semibold h-14 text-base rounded-xl"
          >
            Login
          </Button>
        </Link>
      </div>

      {/* Safe area padding for mobile */}
      <div className="h-safe-area-inset-bottom" />
    </div>
  )
}
