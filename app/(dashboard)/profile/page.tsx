'use client'

import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { ProfileAvatar } from '@/components/profile-avatar'
import { RoleBadge } from '@/components/role-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { 
  Settings, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Mail, 
  Phone, 
  Building2, 
  BookOpen,
  Shield,
  Bell
} from 'lucide-react'

const menuItems = [
  { icon: Bell, label: 'Notification Settings', href: '/settings/notifications' },
  { icon: Shield, label: 'Privacy & Security', href: '/settings/privacy' },
  { icon: Settings, label: 'App Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', href: '/help' },
]

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader notificationCount={8} />

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Profile Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <ProfileAvatar name={user.fullName} image={user.avatar} size="xl" />
              <h2 className="mt-4 text-xl font-bold text-foreground">{user.fullName}</h2>
              <div className="mt-2">
                <RoleBadge role={user.role} size="md" />
              </div>
              {user.bio && (
                <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>
              )}
              <Button variant="outline" className="mt-4" onClick={() => router.push('/profile/edit')}>
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Section */}
        <Card className="mb-6">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-foreground">Information</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground truncate">{user.email}</p>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium text-foreground">{user.phone}</p>
                  </div>
                </div>
              )}

              {user.department && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="text-sm font-medium text-foreground">{user.department}</p>
                  </div>
                </div>
              )}

              {user.faculty && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Faculty</p>
                    <p className="text-sm font-medium text-foreground">{user.faculty}</p>
                  </div>
                </div>
              )}

              {user.studentId && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-xs font-bold text-muted-foreground">ID</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Student ID</p>
                    <p className="text-sm font-medium text-foreground">{user.studentId}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card className="mb-6">
          <CardContent className="p-2">
            {menuItems.map((item, index) => (
              <div key={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-between h-12 px-3"
                  onClick={() => router.push(item.href)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Button>
                {index < menuItems.length - 1 && <Separator className="my-1" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full h-12 text-destructive border-destructive/30 hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          NjalaConnect v1.0.0
        </p>
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
