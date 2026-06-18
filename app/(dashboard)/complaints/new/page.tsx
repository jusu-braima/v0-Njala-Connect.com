'use client'

import { useState, useEffect, Suspense } from 'react'
import { BottomNav } from '@/components/bottom-nav'
import { ImageUpload } from '@/components/image-upload'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
import { complaintCategories } from '@/lib/data'
import { ComplaintCategory } from '@/lib/types'
import { ArrowLeft, Loader2, MessageSquareWarning } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

const MAX_DESCRIPTION_LENGTH = 250

function NewComplaintForm() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [isLoading, setIsLoading] = useState(false)
  
  // Form state
  const [category, setCategory] = useState<ComplaintCategory | ''>('')
  const [subCategory, setSubCategory] = useState('')
  const [description, setDescription] = useState('')
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
    
    if (!category || !description.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success('Complaint submitted successfully!')
    router.push('/complaints')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary">
        <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
          <Link href="/complaints">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-white">New Complaint</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </header>

      <main className="px-4 py-5 max-w-lg mx-auto">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageSquareWarning className="w-10 h-10 text-primary" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-foreground">Submit a Complaint</h2>
          <p className="text-sm text-muted-foreground">Let us know how we can help you.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-foreground">Category</Label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as ComplaintCategory)}
              disabled={isLoading}
            >
              <SelectTrigger id="category" className="h-12 rounded-xl">
                <SelectValue placeholder="Select category" />
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

          {/* Sub-Category */}
          <div className="space-y-2">
            <Label htmlFor="subCategory" className="text-foreground">Sub-Category</Label>
            <Select
              value={subCategory}
              onValueChange={setSubCategory}
              disabled={isLoading || !category}
            >
              <SelectTrigger id="subCategory" className="h-12 rounded-xl">
                <SelectValue placeholder="Select sub-category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="water-supply">Water Supply</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="drainage">Drainage</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description" className="text-foreground">Description</Label>
              <span className="text-xs text-muted-foreground">
                {description.length}/{MAX_DESCRIPTION_LENGTH}
              </span>
            </div>
            <Textarea
              id="description"
              placeholder="Please describe your issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH))}
              className="min-h-[100px] resize-none rounded-xl"
              disabled={isLoading}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-foreground">Upload Photo (Optional)</Label>
            <Card className="border-dashed border-2 border-border">
              <CardContent className="p-4">
                <ImageUpload
                  value={image}
                  onChange={setImage}
                  disabled={isLoading}
                />
              </CardContent>
            </Card>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full h-14 text-base font-semibold rounded-xl"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Complaint'
            )}
          </Button>
        </form>
      </main>

      <BottomNav />
    </div>
  )
}

export default function NewComplaintPage() {
  return (
    <Suspense fallback={null}>
      <NewComplaintForm />
    </Suspense>
  )
}
