'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
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
import { useAuth } from '@/lib/auth-context'
import { AccessDenied } from '@/components/access-denied'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { opportunityCategories } from '@/lib/data'
import { cn } from '@/lib/utils'
import {
  ArrowLeft,
  Plus,
  Trash2,
  Loader2,
  CheckCircle
} from 'lucide-react'

export default function CreateOpportunityPage() {
  const { isAuthenticated, canPost } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    provider: '',
    deadline: '',
    description: '',
    applicationLink: '',
  })
  
  const [eligibility, setEligibility] = useState<string[]>([''])
  const [requirements, setRequirements] = useState<string[]>([''])
  const [benefits, setBenefits] = useState<string[]>([''])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleListChange = (
    list: string[], 
    setList: React.Dispatch<React.SetStateAction<string[]>>, 
    index: number, 
    value: string
  ) => {
    const newList = [...list]
    newList[index] = value
    setList(newList)
  }

  const addListItem = (
    list: string[], 
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList([...list, ''])
  }

  const removeListItem = (
    list: string[], 
    setList: React.Dispatch<React.SetStateAction<string[]>>, 
    index: number
  ) => {
    if (list.length > 1) {
      setList(list.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (isDraft: boolean = false) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setShowSuccess(true)
    setTimeout(() => {
      router.push('/opportunities')
    }, 2000)
  }

  if (!isAuthenticated) {
    return null
  }

  if (!canPost) {
    return <AccessDenied backHref="/opportunities" backLabel="Back to Opportunities" />
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">Opportunity Created!</h1>
          <p className="text-sm text-muted-foreground">Redirecting to opportunities...</p>
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
          <h1 className="text-xl font-bold text-foreground">Create Opportunity</h1>
          <p className="text-sm text-muted-foreground">
            Post a new scholarship, internship, or opportunity for students
          </p>
        </div>

        {/* Opportunity Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(false) }}>
          {/* Basic Info */}
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Opportunity Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter opportunity title"
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
                    {opportunityCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="provider">Provider *</Label>
                <Input
                  id="provider"
                  placeholder="Organization offering this opportunity"
                  value={formData.provider}
                  onChange={(e) => handleInputChange('provider', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="deadline">Application Deadline *</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe this opportunity..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Eligibility */}
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {eligibility.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g., Sierra Leonean citizen"
                    value={item}
                    onChange={(e) => handleListChange(eligibility, setEligibility, index, e.target.value)}
                  />
                  {eligibility.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0 text-destructive"
                      onClick={() => removeListItem(eligibility, setEligibility, index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full gap-1"
                onClick={() => addListItem(eligibility, setEligibility)}
              >
                <Plus className="w-4 h-4" />
                Add Criterion
              </Button>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {requirements.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g., Academic transcripts"
                    value={item}
                    onChange={(e) => handleListChange(requirements, setRequirements, index, e.target.value)}
                  />
                  {requirements.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0 text-destructive"
                      onClick={() => removeListItem(requirements, setRequirements, index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full gap-1"
                onClick={() => addListItem(requirements, setRequirements)}
              >
                <Plus className="w-4 h-4" />
                Add Requirement
              </Button>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {benefits.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g., Full tuition coverage"
                    value={item}
                    onChange={(e) => handleListChange(benefits, setBenefits, index, e.target.value)}
                  />
                  {benefits.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0 text-destructive"
                      onClick={() => removeListItem(benefits, setBenefits, index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full gap-1"
                onClick={() => addListItem(benefits, setBenefits)}
              >
                <Plus className="w-4 h-4" />
                Add Benefit
              </Button>
            </CardContent>
          </Card>

          {/* Application Link */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Application Link</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="applicationLink">URL</Label>
                <Input
                  id="applicationLink"
                  type="url"
                  placeholder="https://..."
                  value={formData.applicationLink}
                  onChange={(e) => handleInputChange('applicationLink', e.target.value)}
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
                'Publish'
              )}
            </Button>
          </div>
        </form>
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
