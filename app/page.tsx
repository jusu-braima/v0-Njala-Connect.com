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
        className="object-cover animate-fade-in"
        priority
      />
      
      {/* Green Gradient Overlay */}
      <div 
        className="absolute inset-0 animate-fade-in" 
        style={{ 
          background: 'linear-gradient(180deg, rgba(21, 128, 61, 0.85) 0%, rgba(22, 101, 52, 0.92) 50%, rgba(20, 83, 45, 0.95) 100%)' 
        }} 
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="text-center space-y-4">
          {/* University Crest Logo */}
          <div className="w-32 h-32 mx-auto relative mb-6 animate-bounce-in">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Njala.jfif-2xRQon4U6BqdG1zBrRnjalSVldfkPS.jpeg"
              alt="Njala University Crest"
              fill
              className="object-contain rounded-full bg-white p-1 shadow-lg"
              priority
            />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-white/20 blur-xl animate-pulse-soft -z-10" />
          </div>
          
          {/* App Title */}
          <div className="space-y-0">
            <h1 className="text-4xl font-bold text-white tracking-tight animate-initial animate-fade-in-up animate-delay-200">
              NJALA
            </h1>
            <h2 className="text-2xl font-semibold text-green-100 animate-initial animate-fade-in-up animate-delay-300">
              CAMPUS CONNECT
            </h2>
          </div>
          
          {/* Tagline */}
          <p className="text-white/90 text-base max-w-xs mx-auto leading-relaxed mt-6 animate-initial animate-fade-in-up animate-delay-400">
            Connecting Students, Lecturers & Administration
          </p>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="px-6 pb-12 pt-6 space-y-3 relative z-10">
        <Link href="/onboarding" className="block animate-initial animate-fade-in-up animate-delay-500">
          <Button 
            size="lg" 
            className="w-full bg-green-600 text-white hover:bg-green-700 font-semibold h-14 text-base rounded-full shadow-lg border-0 btn-press transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
          >
            Get Started
          </Button>
        </Link>
        <Link href="/login" className="block animate-initial animate-fade-in-up animate-delay-600">
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold h-14 text-base rounded-full btn-press transition-all duration-300"
          >
            Login
          </Button>
        </Link>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-16 w-3 h-3 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-white/25 rounded-full animate-float" style={{ animationDelay: '2s' }} />

      {/* Safe area padding for mobile */}
      <div className="h-safe-area-inset-bottom" />
    </div>
  )
}
