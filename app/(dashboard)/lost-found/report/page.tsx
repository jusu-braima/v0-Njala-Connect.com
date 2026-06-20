'use client'

import { useState, useEffect, Suspense } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { ImageUpload } from '@/components/image-upload'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/lib/auth-context'
import { AccessDenied } from '@/components/access-denied'
import { useRouter, useSearchParams } from 'next/navigation'
import { lostFoundCategories } from '@/lib/data'
import { LostFoundCategory } from '@/lib/types'
import { format } from 'date-fns'
import { ArrowLeft, Loader2, Send, CalendarIcon, SearchX, Package } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const MAX_DESCRIPTION_LENGTH = 500

function ReportItemForm() {
  const { isAuthenticated, canPost } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState<'lost' | 'found'>('lost')
  
  // Form state
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<LostFoundCategory | ''>('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState<Date>(new Date())
  const [contactInfo, setContactInfo] = useState('')
  const [image, setImage] = useState<string | undefined>()

  // Get type from URL
  useEffect(() => {
    const typeParam = searchParams.get('type')
    if (typeParam === 'lost' || typeParam === 'found') {
      setType(typeParam)
    }
  }, [searchParams])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !category || !description.trim() || !location.trim() || !contactInfo.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success(`${type === 'lost' ? 'Lost' : 'Found'} item reported successfully!`)
    router.push('/lost-found')
  }

  if (!isAuthenticated) {
    return null
  }

  if (!canPost) {
    return <AccessDenied backHref="/lost-found" backLabel="Back to Lost & Found" />
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader notificationCount={8} />

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/lost-found">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center',
              type === 'lost' 
                ? 'bg-destructive/10 text-destructive'
                : 'bg-success/10 text-success'
            )}>
              {type === 'lost' ? <SearchX className="w-5 h-5" /> : <Package className="w-5 h-5" />}
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Report {type === 'lost' ? 'Lost' : 'Found'} Item
              </h1>
              <p className="text-sm text-muted-foreground">
                {type === 'lost' ? 'Describe the item you lost' : 'Describe the item you found'}
              </p>
            </div>
          </div>
        </div>

        {/* Type Toggle */}
        <div className="flex items-center gap-2 p-1 bg-muted rounded-lg mb-6">
          <Button
            type="button"
            variant={type === 'lost' ? 'default' : 'ghost'}
            size="sm"
            className={cn(
              'flex-1',
              type === 'lost' && 'bg-destructive hover:bg-destructive/90'
            )}
            onClick={() => setType('lost')}
          >
            <SearchX className="w-4 h-4 mr-2" />
            Lost Item
          </Button>
          <Button
            type="button"
            variant={type === 'found' ? 'default' : 'ghost'}
            size="sm"
            className={cn(
              'flex-1',
              type === 'found' && 'bg-success hover:bg-success/90'
            )}
            onClick={() => setType('found')}
          >
            <Package className="w-4 h-4 mr-2" />
            Found Item
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Item Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="e.g., Black Samsung Phone"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">
              Item Category <span className="text-destructive">*</span>
            </Label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as LostFoundCategory)}
              disabled={isLoading}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {lostFoundCategories.map((cat) => (
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
                Description <span className="text-destructive">*</span>
              </Label>
              <span className="text-xs text-muted-foreground">
                {description.length}/{MAX_DESCRIPTION_LENGTH}
              </span>
            </div>
            <Textarea
              id="description"
              placeholder={type === 'lost' 
                ? "Describe the item in detail - color, brand, distinguishing features..."
                : "Describe the item you found - include any identifying details..."
              }
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH))}
              className="min-h-[100px] resize-none"
              disabled={isLoading}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">
              {type === 'lost' ? 'Last Seen Location' : 'Found Location'} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="location"
              placeholder="e.g., Main Library, 2nd Floor"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>
              Date {type === 'lost' ? 'Lost' : 'Found'} <span className="text-destructive">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                  disabled={isLoading}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  disabled={(d) => d > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <Label htmlFor="contact">
              Contact Information <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact"
              placeholder="Phone number or email"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              This will be shown to others so they can contact you.
            </p>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Item Photo (Optional)</Label>
            <ImageUpload
              value={image}
              onChange={setImage}
              disabled={isLoading}
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={isLoading} 
              className={cn(
                'w-full',
                type === 'lost' 
                  ? 'bg-destructive hover:bg-destructive/90' 
                  : 'bg-success hover:bg-success/90'
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Report
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

export default function ReportItemPage() {
  return (
    <Suspense fallback={null}>
      <ReportItemForm />
    </Suspense>
  )
}
