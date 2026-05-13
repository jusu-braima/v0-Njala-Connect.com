'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ProfileAvatar } from '@/components/profile-avatar'
import { LoadingSpinner } from '@/components/loading-spinner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { Camera, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { yearOfStudyOptions } from '@/lib/data'
import Link from 'next/link'

export default function ProfileSetupPage() {
  const { user, updateProfile } = useAuth()
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar)
  const [bio, setBio] = useState(user?.bio || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [yearOfStudy, setYearOfStudy] = useState(user?.yearOfStudy?.toString() || '')
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await updateProfile({
      avatar,
      bio,
      phone,
      yearOfStudy: yearOfStudy ? parseInt(yearOfStudy) : undefined,
    })

    router.push('/welcome')
  }

  const handleSkip = () => {
    router.push('/welcome')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center p-4">
        <Link href="/register">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
            <span className="sr-only">Go back</span>
          </Button>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-6 pb-8 overflow-y-auto">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Complete Your Profile</h1>
            <p className="text-muted-foreground">Add more details to personalize your experience</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <ProfileAvatar name={user?.fullName} image={avatar} size="xl" />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full w-10 h-10 shadow-md"
                  onClick={handleAvatarClick}
                >
                  <Camera className="w-4 h-4" />
                  <span className="sr-only">Upload photo</span>
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <p className="text-sm text-muted-foreground">Tap to upload a profile photo</p>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us a little about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="min-h-[100px] rounded-xl resize-none"
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground text-right">{bio.length}/200</p>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+232 XX XXX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>

            {/* Year of Study - Only for students */}
            {user?.role === 'student' && (
              <div className="space-y-2">
                <Label>Year of Study</Label>
                <Select value={yearOfStudy} onValueChange={setYearOfStudy}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOfStudyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-3 pt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-base font-semibold rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner size="sm" /> : 'Save Profile'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="lg"
                className="w-full h-14 text-base font-semibold rounded-xl text-muted-foreground"
                onClick={handleSkip}
                disabled={isLoading}
              >
                Skip for Later
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
