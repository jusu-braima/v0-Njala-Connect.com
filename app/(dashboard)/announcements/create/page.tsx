'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { AccessDenied } from '@/components/access-denied'
import { BottomNav } from '@/components/bottom-nav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Loader2, CheckCircle, Megaphone } from 'lucide-react'
import { toast } from 'sonner'

const categories = [
  { id: 'general', label: 'General' },
  { id: 'exams', label: 'Exams' },
  { id: 'registration', label: 'Registration' },
  { id: 'scholarships', label: 'Scholarships' },
  { id: 'events', label: 'Events' },
]

const priorities = [
  { id: 'low', label: 'Low' },
  { id: 'medium', label: 'Medium' },
  { id: 'high', label: 'High' },
  { id: 'urgent', label: 'Urgent' },
]

export default function CreateAnnouncementPage() {
  const { isAuthenticated, canPost, profile } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'medium',
    content: '',
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.category || !formData.content.trim()) {
      toast.error('Please fill in the title, category and content.')
      return
    }
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setShowSuccess(true)
    setTimeout(() => {
      router.push('/announcements')
    }, 1800)
  }

  if (!isAuthenticated) {
    return null
  }

  if (!canPost) {
    return <AccessDenied />
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">Announcement Published!</h1>
          <p className="text-sm text-muted-foreground">Redirecting to announcements...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <header className="sticky top-0 z-40 bg-gradient-to-r from-primary to-emerald-600 shadow-lg shadow-primary/20 lg:hidden">
        <div className="relative flex items-center justify-between px-4 h-16 max-w-lg mx-auto">
          <button onClick={() => router.back()} aria-label="Go back" className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white hover:bg-white/10">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-white/80" />
            <h1 className="text-lg font-bold text-white">New Announcement</h1>
          </div>
          <span className="w-9" />
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto">
        <Button variant="ghost" size="sm" className="gap-1 mb-4 -ml-2 hidden lg:inline-flex" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="mb-6">
          <h1 className="text-xl font-bold text-foreground">Post an Announcement</h1>
          <p className="text-sm text-muted-foreground">
            Publishing as {profile?.full_name || 'Staff'}. This will be visible to all students.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Announcement Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Second Semester Exam Timetable Released"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(v) => handleChange('category', v)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(v) => handleChange('priority', v)}>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Write the full announcement..."
                  rows={6}
                  value={formData.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                'Publish Announcement'
              )}
            </Button>
          </div>
        </form>
      </main>

      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  )
}
