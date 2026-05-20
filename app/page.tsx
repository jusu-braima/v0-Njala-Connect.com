'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Users, BookOpen, Calendar, Shield } from 'lucide-react'

const features = [
  { icon: BookOpen, label: 'Courses' },
  { icon: Calendar, label: 'Events' },
  { icon: Users, label: 'Community' },
  { icon: Shield, label: 'Secure' },
]

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
      
      {/* Animated Gradient Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0" 
        style={{ 
          background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.88) 0%, rgba(5, 150, 105, 0.92) 50%, rgba(4, 120, 87, 0.96) 100%)' 
        }} 
      />

      {/* Decorative mesh gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-300 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-400 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="text-center space-y-6">
          {/* University Crest Logo */}
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15,
              delay: 0.2 
            }}
            className="w-36 h-36 mx-auto relative mb-8"
          >
            <div className="absolute inset-0 rounded-full bg-white/20 blur-2xl animate-pulse-soft scale-150" />
            <div className="absolute inset-0 rounded-full animate-spin-slow opacity-50">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/40 rounded-full" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/40 rounded-full" />
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 bg-white/40 rounded-full" />
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 bg-white/40 rounded-full" />
            </div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Njala.jfif-2xRQon4U6BqdG1zBrRnjalSVldfkPS.jpeg"
              alt="Njala University Crest"
              fill
              className="object-contain rounded-full bg-white p-1.5 shadow-2xl shadow-black/20 relative z-10"
              priority
            />
          </motion.div>
          
          {/* App Title */}
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span className="text-amber-200 text-sm font-medium tracking-widest uppercase">Welcome to</span>
              <Sparkles className="w-5 h-5 text-amber-300" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-white tracking-tight font-display"
            >
              NJALA
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-2xl md:text-3xl font-semibold text-emerald-100 tracking-wide font-display"
            >
              CAMPUS CONNECT
            </motion.h2>
          </div>
          
          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-white/90 text-lg max-w-sm mx-auto leading-relaxed"
          >
            Connecting Students, Lecturers & Administration
          </motion.p>

          {/* Features row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex items-center justify-center gap-6 mt-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, type: "spring", stiffness: 200 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] text-white/70 font-medium">{feature.label}</span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Bottom buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6, type: "spring" }}
        className="px-6 pb-12 pt-6 space-y-3 relative z-10"
      >
        <Link href="/onboarding" className="block">
          <Button 
            size="lg" 
            className="w-full bg-white text-emerald-700 hover:bg-white/95 font-bold h-14 text-base rounded-2xl shadow-2xl shadow-black/20 border-0 btn-press transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        <Link href="/login" className="block">
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full bg-transparent border-2 border-white/80 text-white hover:bg-white/10 font-semibold h-14 text-base rounded-2xl btn-press transition-all duration-300 backdrop-blur-sm"
          >
            Already have an account? Login
          </Button>
        </Link>
      </motion.div>

      {/* Decorative floating elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-20 left-10 w-3 h-3 bg-white/30 rounded-full blur-[1px]"
      />
      <motion.div 
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1 
        }}
        className="absolute top-40 right-16 w-4 h-4 bg-white/20 rounded-full blur-[1px]"
      />
      <motion.div 
        animate={{ 
          y: [0, -25, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2 
        }}
        className="absolute bottom-40 left-20 w-2 h-2 bg-white/25 rounded-full blur-[1px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/3 right-8 w-6 h-6 bg-amber-300/30 rounded-full blur-sm"
      />

      {/* Safe area padding for mobile */}
      <div className="h-safe-area-inset-bottom" />
    </div>
  )
}
