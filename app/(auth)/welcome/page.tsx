'use client'

import { Button } from '@/components/ui/button'
import { RoleBadge } from '@/components/role-badge'
import { ProfileAvatar } from '@/components/profile-avatar'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Sparkles } from 'lucide-react'

export default function WelcomePage() {
  const { user } = useAuth()
  const router = useRouter()

  const handleContinue = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8 relative z-10">
        {/* Success Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center space-y-3 max-w-sm mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome to NjalaConnect</h1>
          <p className="text-muted-foreground text-lg">
            {"Your account has been created successfully!"}
          </p>
        </div>

        {/* User Card */}
        <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <ProfileAvatar name={user?.fullName} image={user?.avatar} size="lg" />
            <div className="text-center space-y-2">
              <h2 className="font-semibold text-xl text-foreground">
                {user?.fullName || 'New User'}
              </h2>
              {user?.role && <RoleBadge role={user.role} size="md" />}
              {user?.department && (
                <p className="text-sm text-muted-foreground">{user.department}</p>
              )}
              {user?.faculty && (
                <p className="text-xs text-muted-foreground">{user.faculty}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom button */}
      <div className="px-6 pb-12 relative z-10">
        <Button
          size="lg"
          onClick={handleContinue}
          className="w-full h-14 text-base font-semibold rounded-xl"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}
