'use client'

import { useState } from 'react'
import { BottomNav } from '@/components/bottom-nav'
import { ProfileAvatar } from '@/components/profile-avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { 
  Settings, 
  LogOut, 
  ChevronRight, 
  Mail, 
  Phone, 
  GraduationCap,
  ArrowLeft,
  Edit2,
  Loader2,
  Check,
  X
} from 'lucide-react'
import Link from 'next/link'
import { RoleBadge } from '@/components/role-badge'
import { FileUpload } from '@/components/file-upload'

export default function ProfilePage() {
  const { profile, isAuthenticated, isLoading, logout, updateProfile } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    bio: '',
    department: '',
    student_id: '',
  })

  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
  }

  const startEditing = () => {
    setFormData({
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
      bio: profile?.bio || '',
      department: profile?.department || '',
      student_id: profile?.student_id || '',
    })
    setIsEditing(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    const success = await updateProfile(formData)
    if (success) {
      setIsEditing(false)
    }
    setIsSaving(false)
  }

  const handleAvatarUpload = async (pathname: string) => {
    await updateProfile({ avatar_url: pathname })
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
              <div className="relative">
                <ProfileAvatar 
                  name={profile.full_name || undefined} 
                  image={profile.avatar_url ? `/api/file?pathname=${encodeURIComponent(profile.avatar_url)}` : undefined} 
                  size="xl" 
                />
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-background"
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
              
              {/* Hidden avatar upload */}
              <div className="hidden">
                <div id="avatar-upload">
                  <FileUpload
                    folder="avatars"
                    accept="image/*"
                    maxSize={5}
                    onUploadComplete={handleAvatarUpload}
                    preview={false}
                  />
                </div>
              </div>

              <h2 className="mt-4 text-xl font-bold text-foreground">
                {profile.full_name || 'No name set'}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {profile.student_id || profile.email}
              </p>
              <p className="text-sm text-muted-foreground">
                {profile.department || 'No department'}
              </p>
              <div className="mt-2">
                <RoleBadge role={profile.role} size="sm" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form or View Mode */}
        {isEditing ? (
          <Card className="mb-6 border border-border">
            <CardHeader>
              <CardTitle className="text-lg">Edit Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                  placeholder="Your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="student_id">Student ID</Label>
                <Input
                  id="student_id"
                  value={formData.student_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, student_id: e.target.value }))}
                  placeholder="NU2024001"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Computer Science"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+232 76 123456"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleSave} 
                  disabled={isSaving}
                  className="flex-1"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Contact Info */}
            <Card className="mb-6 border border-border">
              <CardContent className="p-4 space-y-1">
                <button 
                  className="w-full flex items-center justify-between py-3 hover:bg-muted/50 rounded-lg px-2 -mx-2 transition-colors"
                  onClick={startEditing}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{profile.email}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>

                <button 
                  className="w-full flex items-center justify-between py-3 hover:bg-muted/50 rounded-lg px-2 -mx-2 transition-colors"
                  onClick={startEditing}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{profile.phone || 'Add phone number'}</span>
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

            {/* Edit Profile Button */}
            <Button
              variant="outline"
              className="w-full h-12 font-medium mb-4"
              onClick={startEditing}
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </>
        )}

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full h-12 text-destructive border-destructive/30 hover:bg-destructive/10 font-medium"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
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
