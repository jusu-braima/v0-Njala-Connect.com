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
        {/* Background image with reduced opacity */}
        <div className="absolute inset-0 orbs-bg">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/njalauniversity_cover.jfif-7RILqIIA2wqoQ9BP4qqeGpQqWcJFCp.jpeg"
            alt="Njala University Campus"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-emerald-600/35 to-teal-700/40 group-hover:from-primary/50 group-hover:via-emerald-600/45 group-hover:to-teal-700/50 transition-all duration-500" />
          
          {/* Additional subtle overlay for better text contrast */}
          <div className="absolute inset-0 bg-radial-gradient from-black/5 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        </div>
        
        {/* Animated decorative elements */}
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.15, 0.08],
            x: [0, 8, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.12, 0.05],
            x: [0, -6, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-4 left-8 w-28 h-28 bg-emerald-300/10 rounded-full blur-2xl" 
        />

        {/* Floating icons with smooth animations */}
        <motion.div
          animate={{ 
            y: [0, -12, 0],
            rotate: [0, 15, 0],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 right-6 text-amber-300/60"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, -12, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-8 right-10 text-white/40"
        >
          <Star className="w-4 h-4" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -14, 0],
            x: [0, 6, 0],
            opacity: [0.35, 0.55, 0.35]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-10 left-1/2 text-emerald-200/50"
        >
          <Zap className="w-4 h-4" />
        </motion.div>
        
        <CardContent className="p-6 relative z-10">
          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-emerald-100/90 text-sm font-medium"
            >
              Welcome to
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl font-bold text-white font-display tracking-tight group-hover:text-emerald-50 transition-colors duration-500"
            >
              Njala Campus Connect
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-sm text-white/85 mt-3 flex items-center gap-2"
            >
              <motion.span 
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-emerald-300" 
              />
              Stay informed. Stay connected.
            </motion.p>
          </div>

          {/* Quick stats or badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-5 flex items-center gap-2"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold text-white/95 flex items-center gap-1.5 transition-all duration-300 hover:bg-white/20"
            >
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-emerald-400" 
              />
              Active
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold text-white/95 transition-all duration-300 hover:bg-white/20"
            >
              {new Date().toLocaleDateString('en-US', { weekday: 'short' })}
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
