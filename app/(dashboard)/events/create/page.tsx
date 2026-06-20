'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { ImageUpload } from '@/components/image-upload'
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
import { useAuth } from '@/lib/auth-context'
import { AccessDenied } from '@/components/access-denied'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { eventCategories } from '@/lib/data'
import { cn } from '@/lib/utils'
import {
  ArrowLeft,
  Plus,
  Trash2,
  Loader2,
  CheckCircle
} from 'lucide-react'

interface AgendaItem {
  time: string
  title: string
  description: string
}

export default function CreateEventPage() {
  const { isAuthenticated, canPost } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    organizer: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    imageUrl: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
  })
  
  const [agenda, setAgenda] = useState<AgendaItem[]>([
    { time: '', title: '', description: '' }
  ])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAgendaChange = (index: number, field: keyof AgendaItem, value: string) => {
    const newAgenda = [...agenda]
    newAgenda[index][field] = value
    setAgenda(newAgenda)
  }

  const addAgendaItem = () => {
    setAgenda([...agenda, { time: '', title: '', description: '' }])
  }

  const removeAgendaItem = (index: number) => {
    if (agenda.length > 1) {
      setAgenda(agenda.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (isDraft: boolean = false) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setShowSuccess(true)
    setTimeout(() => {
      router.push('/events')
    }, 2000)
  }

  if (!isAuthenticated) {
    return null
  }

  if (!canPost) {
    return <AccessDenied />
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">Event Created!</h1>
          <p className="text-sm text-muted-foreground">Redirecting to events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader notificationCount={8} />

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 mb-4 -ml-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-foreground">Create Event</h1>
          <p className="text-sm text-muted-foreground">
            Share an upcoming event with the campus community
          </p>
        </div>

        {/* Event Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(false) }}>
          {/* Basic Info */}
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="organizer">Organizer *</Label>
                <Input
                  id="organizer"
                  placeholder="Organization or department name"
                  value={formData.organizer}
                  onChange={(e) => handleInputChange('organizer', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Date & Time */}
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Date & Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Main Auditorium, Njala Campus"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Event Image */}
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Event Image</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={formData.imageUrl}
                onChange={(url) => handleInputChange('imageUrl', url)}
                label="Upload event banner"
              />
            </CardContent>
          </Card>

          {/* Agenda */}
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Event Agenda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {agenda.map((item, index) => (
                <div key={index} className="p-3 border border-border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Item {index + 1}</span>
                    {agenda.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive"
                        onClick={() => removeAgendaItem(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Time (e.g., 9:00 AM)"
                      value={item.time}
                      onChange={(e) => handleAgendaChange(index, 'time', e.target.value)}
                    />
                    <Input
                      placeholder="Activity title"
                      value={item.title}
                      onChange={(e) => handleAgendaChange(index, 'title', e.target.value)}
                    />
                  </div>
                  <Input
                    placeholder="Description (optional)"
                    value={item.description}
                    onChange={(e) => handleAgendaChange(index, 'description', e.target.value)}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full gap-1"
                onClick={addAgendaItem}
              >
                <Plus className="w-4 h-4" />
                Add Agenda Item
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  placeholder="Full name"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="email@njala.edu.sl"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="076-XXX-XXXX"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => handleSubmit(true)}
              disabled={isSubmitting}
            >
              Save Draft
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                'Publish Event'
              )}
            </Button>
          </div>
        </form>
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
