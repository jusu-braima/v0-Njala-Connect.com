'use client'

import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { ImageUpload } from '@/components/image-upload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/lib/auth-context'
import { useRouter, useSearchParams } from 'next/navigation'
import { complaintCategories, priorityLevels } from '@/lib/data'
import { ComplaintCategory, ComplaintPriority } from '@/lib/types'
import { ArrowLeft, Loader2, Send, Save } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

const MAX_DESCRIPTION_LENGTH = 1000

export default function NewComplaintPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  // Form state
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<ComplaintCategory | ''>('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [priority, setPriority] = useState<ComplaintPriority>('medium')
  const [image, setImage] = useState<string | undefined>()

  // Prefill category from URL
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam && complaintCategories.find(c => c.id === categoryParam)) {
      setCategory(categoryParam as ComplaintCategory)
    }
  }, [searchParams])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !category || !description.trim() || !location.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success('Complaint submitted successfully!')
    router.push('/complaints')
  }

  const handleSaveDraft = async () => {
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    toast.success('Draft saved')
    setIsSaving(false)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader notificationCount={8} />

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Header with back button */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/complaints">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Submit Complaint</h1>
            <p className="text-sm text-muted-foreground">Report a campus issue</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Complaint Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Brief title describing the issue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-destructive">*</span>
            </Label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as ComplaintCategory)}
              disabled={isLoading}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {complaintCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">
                Detailed Description <span className="text-destructive">*</span>
              </Label>
              <span className="text-xs text-muted-foreground">
                {description.length}/{MAX_DESCRIPTION_LENGTH}
              </span>
            </div>
            <Textarea
              id="description"
              placeholder="Describe the issue in detail. Include when it started and how it affects you."
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH))}
              className="min-h-[120px] resize-none"
              disabled={isLoading}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">
              Location <span className="text-destructive">*</span>
            </Label>
            <Input
              id="location"
              placeholder="e.g., Block A Hostel, Room 205"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority Level</Label>
            <Select
              value={priority}
              onValueChange={(value) => setPriority(value as ComplaintPriority)}
              disabled={isLoading}
            >
              <SelectTrigger id="priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorityLevels.map((level) => (
                  <SelectItem key={level.id} value={level.id}>
                    <div className="flex flex-col">
                      <span>{level.label}</span>
                      <span className="text-xs text-muted-foreground">{level.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Photo Evidence (Optional)</Label>
            <ImageUpload
              value={image}
              onChange={setImage}
              disabled={isLoading}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Complaint
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isLoading || isSaving}
              className="w-full"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </>
              )}
            </Button>
          </div>
        </form>
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
