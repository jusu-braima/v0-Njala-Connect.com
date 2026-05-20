'use client'

import { LogoHorizontal } from '@/components/logo'
import { Bell, Menu, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DesktopSidebar } from '@/components/desktop-sidebar'
import { motion, AnimatePresence } from 'framer-motion'

interface DashboardHeaderProps {
  notificationCount?: number
}

export function DashboardHeader({ notificationCount = 0 }: DashboardHeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-gradient-to-r from-primary to-emerald-600 lg:hidden shadow-lg shadow-primary/20"
    >
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-emerald-600/95 backdrop-blur-md" />
      
      <div className="relative flex items-center justify-between px-4 h-16 max-w-lg mx-auto">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-xl">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-0">
            <DesktopSidebar />
          </SheetContent>
        </Sheet>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <LogoHorizontal size="sm" variant="light" animated={false} />
        </motion.div>
        
        <Link href="/notifications">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10 rounded-xl">
              <Bell className="w-5 h-5" strokeWidth={1.5} />
              <AnimatePresence>
                {notificationCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white bg-rose-500 rounded-full px-1 shadow-lg shadow-rose-500/50"
                  >
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="sr-only">Notifications</span>
            </Button>
          </motion.div>
        </Link>
      </div>
      
      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </motion.header>
  )
}
