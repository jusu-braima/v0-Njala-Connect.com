'use client'

import { DesktopSidebar } from '@/components/desktop-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen relative">
      {/* Subtle background gradient mesh for the entire dashboard */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.01]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/[0.02] rounded-full blur-3xl" />
      </div>
      
      {/* Desktop Sidebar */}
      <DesktopSidebar notificationCount={8} />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64 relative z-10">
        {children}
      </div>
    </div>
  )
}
