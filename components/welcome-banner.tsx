'use client'

import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Star } from 'lucide-react'

interface WelcomeBannerProps {
  userName?: string
}

export function WelcomeBanner({ userName }: WelcomeBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Card className="overflow-hidden relative rounded-2xl border-0 shadow-xl group neon-border">
        {/* Background image */}
        <div className="absolute inset-0 orbs-bg">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/njalauniversity_cover.jfif-7RILqIIA2wqoQ9BP4qqeGpQqWcJFCp.jpeg"
            alt="Njala University Campus"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-emerald-600/85 to-teal-700/90 transition-all duration-500" />
        </div>
        
        {/* Animated decorative elements */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-2 right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-2 left-6 w-20 h-20 bg-amber-300/10 rounded-full blur-xl" 
        />

        {/* Floating icons */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 right-4 text-amber-300/50"
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-6 right-8 text-white/30"
        >
          <Star className="w-3 h-3" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-8 left-1/2 text-emerald-200/40"
        >
          <Zap className="w-3 h-3" />
        </motion.div>
        
        <CardContent className="p-6 relative z-10">
          <div className="space-y-1">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-emerald-100/80 text-sm font-medium"
            >
              Welcome to
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white font-display tracking-tight"
            >
              Njala Campus Connect
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-white/80 mt-2 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              Stay informed. Stay connected.
            </motion.p>
          </div>

          {/* Quick stats or badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex items-center gap-2"
          >
            <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-white/90 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </div>
            <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-white/90">
              {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
