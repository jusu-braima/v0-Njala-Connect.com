'use client'

import { LogoHorizontal } from '@/components/logo'
import { Bell, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DesktopSidebar } from '@/components/desktop-sidebar'

interface DashboardHeaderProps {
  notificationCount?: number
}

export function DashboardHeader({ notificationCount = 0 }: DashboardHeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-primary lg:hidden">
      <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="w-5 h-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <DesktopSidebar />
          </SheetContent>
        </Sheet>
        
        <LogoHorizontal size="sm" variant="light" />
        
        <Link href="/notifications">
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-medium text-white bg-destructive rounded-full px-1">
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
            <span className="sr-only">Notifications</span>
          </Button>
        </Link>
      </div>
    </header>
  )
}
