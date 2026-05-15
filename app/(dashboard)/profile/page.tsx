'use client'

import { BottomNav } from '@/components/bottom-nav'
import { ProfileAvatar } from '@/components/profile-avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { 
  Settings, 
  LogOut, 
  ChevronRight, 
  Mail, 
  Phone, 
  GraduationCap,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

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
      {/* Header */}
      <header className="bg-primary">
        <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-white">Profile</h1>
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Profile Card */}
        <Card className="mb-6 border border-border">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <ProfileAvatar name={user.fullName} image={user.avatar} size="xl" />
              <h2 className="mt-4 text-xl font-bold text-foreground">{user.fullName}</h2>
              <p className="text-sm text-muted-foreground mt-1">{user.studentId || 'Student'}</p>
              <p className="text-sm text-muted-foreground">{user.department || 'Department of Computer Science'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="mb-6 border border-border">
          <CardContent className="p-4 space-y-1">
            <button 
              className="w-full flex items-center justify-between py-3 hover:bg-muted/50 rounded-lg px-2 -mx-2 transition-colors"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-foreground">{user.email}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>

            <button 
              className="w-full flex items-center justify-between py-3 hover:bg-muted/50 rounded-lg px-2 -mx-2 transition-colors"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-foreground">{user.phone || '+232 76 123456'}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>

            <button 
              className="w-full flex items-center justify-between py-3 hover:bg-muted/50 rounded-lg px-2 -mx-2 transition-colors"
              onClick={() => router.push('/profile/academic')}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-foreground">View Academic Profile</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full h-12 text-destructive border-destructive/30 hover:bg-destructive/10 font-medium"
          onClick={handleLogout}
        >
          Logout
        </Button>

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          NjalaConnect v1.0.0
        </p>
      </main>

      <BottomNav />
    </div>
  )
}
