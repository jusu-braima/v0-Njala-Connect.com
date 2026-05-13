'use client'

import { AuthProvider } from '@/lib/auth-context'
import { DesktopSidebar } from '@/components/desktop-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <DesktopSidebar notificationCount={8} />
        
        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {children}
        </div>
      </div>
    </AuthProvider>
  )
}
