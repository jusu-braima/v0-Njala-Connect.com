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
      <Card className="overflow-hidden relative rounded-2xl border-0 shadow-xl group">
        {/* Background image - clearly visible */}
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/njalauniversity_cover.jfif-7RILqIIA2wqoQ9BP4qqeGpQqWcJFCp.jpeg"
            alt="Njala University Campus"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          {/* Light overlay for text readability - keeps image visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
        </div>
        
        {/* Subtle animated glow effects */}
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 right-8 w-32 h-32 bg-white/20 rounded-full blur-3xl pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-4 left-8 w-28 h-28 bg-white/15 rounded-full blur-2xl pointer-events-none" 
        />

        {/* Floating sparkle icons */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 right-6 text-amber-300"
        >
          <Sparkles className="w-5 h-5 drop-shadow-lg" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -8, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-8 right-10 text-white"
        >
          <Star className="w-4 h-4 drop-shadow-lg" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -12, 0],
            opacity: [0.45, 0.75, 0.45]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-10 left-1/2 text-emerald-300"
        >
          <Zap className="w-4 h-4 drop-shadow-lg" />
        </motion.div>
        
        <CardContent className="p-6 relative z-10">
          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/90 text-sm font-medium drop-shadow-md"
            >
              Welcome to
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl font-bold text-white font-display tracking-tight drop-shadow-lg"
            >
              Njala Campus Connect
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-sm text-white/90 mt-3 flex items-center gap-2 drop-shadow-md"
            >
              <motion.span 
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" 
              />
              Stay informed. Stay connected.
            </motion.p>
          </div>

          {/* Quick stats badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-5 flex items-center gap-2"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-3.5 py-2 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg"
            >
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" 
              />
              Active
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-3.5 py-2 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white shadow-lg"
            >
              {new Date().toLocaleDateString('en-US', { weekday: 'short' })}
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
