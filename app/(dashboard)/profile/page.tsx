'use client'

import { BottomNav } from '@/components/bottom-nav'
import { ProfileAvatar } from '@/components/profile-avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { 
  Settings, 
  LogOut, 
  ChevronRight, 
  Mail, 
  Phone, 
  GraduationCap,
  Loader2
} from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const { profile, isAuthenticated, isLoading, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated || !profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-primary">
        <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ChevronRight className="w-5 h-5 rotate-180" />
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
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4 overflow-hidden">
                <ProfileAvatar 
                  name={profile.full_name || undefined} 
                  image={profile.avatar_url ? `/api/file?pathname=${encodeURIComponent(profile.avatar_url)}` : undefined} 
                  size="xl" 
                />
              </div>
              
              {/* Name */}
              <h2 className="text-xl font-bold text-foreground">
                {profile.full_name || 'No name set'}
              </h2>
              
              {/* Student ID */}
              <p className="text-sm text-muted-foreground mt-1">
                {profile.student_id || 'No Student ID'}
              </p>
              
              {/* Department */}
              <p className="text-sm text-muted-foreground">
                {profile.department || 'No department'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="mb-6 border border-border">
          <CardContent className="p-4 space-y-1">
            {/* Email */}
            <div className="flex items-center justify-between py-3 hover:bg-muted/50 rounded-lg px-2 -mx-2 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-foreground">{profile.email}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>

            {/* Phone */}
            <div className="flex items-center justify-between py-3 hover:bg-muted/50 rounded-lg px-2 -mx-2 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-foreground">{profile.phone || '+232 76 123456'}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>

            {/* View Academic Profile */}
            <Link href="/profile/academic">
              <div className="flex items-center justify-between py-3 hover:bg-muted/50 rounded-lg px-2 -mx-2 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">View Academic Profile</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full h-12 text-destructive border-destructive/30 hover:bg-destructive/10 font-medium"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </main>

      <BottomNav />
    </div>
  )
}
