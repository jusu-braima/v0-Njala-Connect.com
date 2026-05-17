'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function SplashPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/njalauniversity_cover.jfif-7RILqIIA2wqoQ9BP4qqeGpQqWcJFCp.jpeg"
        alt="Njala University Campus"
        fill
        className="object-cover"
        priority
      />
      
      {/* Green Gradient Overlay */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: 'linear-gradient(180deg, rgba(21, 128, 61, 0.85) 0%, rgba(22, 101, 52, 0.92) 50%, rgba(20, 83, 45, 0.95) 100%)' 
        }} 
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="text-center space-y-4">
          {/* University Crest Logo */}
          <div className="w-32 h-32 mx-auto relative mb-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Njala.jfif-2xRQon4U6BqdG1zBrRnjalSVldfkPS.jpeg"
              alt="Njala University Crest"
              fill
              className="object-contain rounded-full bg-white p-1 shadow-lg"
              priority
            />
          </div>
          
          {/* App Title */}
          <div className="space-y-0">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              NJALA
            </h1>
            <h2 className="text-2xl font-semibold text-green-100">
              CAMPUS CONNECT
            </h2>
          </div>
          
          {/* Tagline */}
          <p className="text-white/90 text-base max-w-xs mx-auto leading-relaxed mt-6">
            Connecting Students, Lecturers & Administration
          </p>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="px-6 pb-12 pt-6 space-y-3 relative z-10">
        <Link href="/onboarding" className="block">
          <Button 
            size="lg" 
            className="w-full bg-green-600 text-white hover:bg-green-700 font-semibold h-14 text-base rounded-full shadow-lg border-0"
          >
            Get Started
          </Button>
        </Link>
        <Link href="/login" className="block">
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold h-14 text-base rounded-full"
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
