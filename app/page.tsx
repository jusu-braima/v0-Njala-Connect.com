'use client'

import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import Link from 'next/link'
import { GraduationCap, Users, Building2 } from 'lucide-react'

export default function SplashPage() {
  return (
    <div className="min-h-screen gradient-splash flex flex-col relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-40 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        
        {/* Campus illustration overlay - subtle icons */}
        <div className="absolute top-1/4 left-8 opacity-10">
          <GraduationCap className="w-12 h-12 text-white" />
        </div>
        <div className="absolute top-1/3 right-12 opacity-10">
          <Users className="w-10 h-10 text-white" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 opacity-10">
          <Building2 className="w-14 h-14 text-white" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="text-center space-y-6">
          {/* Logo */}
          <Logo size="xl" variant="light" />
          
          {/* Subtitle */}
          <p className="text-white/80 text-lg font-medium max-w-xs mx-auto leading-relaxed">
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
