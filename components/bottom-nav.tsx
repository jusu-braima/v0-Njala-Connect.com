'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Megaphone, MessageSquareWarning, User, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home', activeIcon: Home },
  { href: '/announcements', icon: Megaphone, label: 'News', activeIcon: Megaphone },
  { href: '/complaints', icon: MessageSquareWarning, label: 'Complaints', activeIcon: MessageSquareWarning },
  { href: '/profile', icon: User, label: 'Profile', activeIcon: User },
]

interface BottomNavProps {
  notificationCount?: number
}

export function BottomNav({ notificationCount = 0 }: BottomNavProps) {
  const pathname = usePathname()

  return (
    <motion.nav 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pb-[env(safe-area-inset-bottom)]"
    >
      {/* Glass background */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-t border-border/50" />
      
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative flex items-center justify-around h-16 w-full px-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href || 
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 h-full"
            >
              <motion.div
                className={cn(
                  'flex flex-col items-center justify-center h-full py-2 relative',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div
                      key="active"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="relative"
                    >
                      {/* Glow effect behind active icon */}
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150" />
                      
                      <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 shadow-lg shadow-primary/30">
                        <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                        
                        {/* Sparkle effect */}
                        <motion.div
                          className="absolute -top-1 -right-1"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                        >
                          <Sparkles className="w-3 h-3 text-amber-400" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="inactive"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center justify-center w-12 h-12"
                    >
                      <Icon className="w-5 h-5 transition-colors duration-300" strokeWidth={1.5} />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.span 
                  className={cn(
                    'text-[10px] font-semibold mt-0.5 tracking-wide',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                  animate={{ 
                    fontWeight: isActive ? 700 : 500,
                    y: isActive ? -2 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              </motion.div>
            </Link>
          )
        })}
      </div>
      
      {/* Safe area padding */}
      <div className="safe-area-inset-bottom bg-background/80 backdrop-blur-xl" />
    </motion.nav>
  )
}
