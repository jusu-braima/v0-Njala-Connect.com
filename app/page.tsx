'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function SplashPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #002855 0%, #001a33 100%)' }}>
      {/* Decorative curves at top */}
      <div className="absolute top-0 left-0 right-0 h-48 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[200%] h-64 rounded-[100%] bg-white/5" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="text-center space-y-4">
          {/* University Crest Logo */}
          <div className="w-36 h-36 mx-auto relative mb-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Njala.jfif-2xRQon4U6BqdG1zBrRnjalSVldfkPS.jpeg"
              alt="Njala University Crest"
              fill
              className="object-contain rounded-full bg-white p-1"
              priority
            />
          </div>
          
          {/* App Title */}
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              NJALA
            </h1>
            <h2 className="text-2xl font-semibold text-white/90">
              CAMPUS CONNECT
            </h2>
          </div>
          
          {/* Tagline */}
          <p className="text-white/80 text-base max-w-xs mx-auto leading-relaxed mt-4">
            Connecting Students, Lecturers & Administration
          </p>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="px-6 pb-10 pt-6 space-y-3 relative z-10">
        <Link href="/onboarding" className="block">
          <Button 
            size="lg" 
            className="w-full bg-white text-[#002855] hover:bg-white/95 font-semibold h-14 text-base rounded-xl shadow-lg"
          >
            Get Started
          </Button>
        </Link>
        <Link href="/login" className="block">
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full bg-transparent border-2 border-white/40 text-white hover:bg-white/10 font-semibold h-14 text-base rounded-xl"
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
