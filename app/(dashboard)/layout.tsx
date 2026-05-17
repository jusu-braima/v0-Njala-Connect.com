'use client'

import { DesktopSidebar } from '@/components/desktop-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <DesktopSidebar notificationCount={8} />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {children}
      </div>
    </div>
  )
}
