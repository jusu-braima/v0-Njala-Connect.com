'use client'

import { useState, useEffect, Suspense } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/lib/auth-context'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Loader2, Send, Shield, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

function ClaimItemForm() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const itemId = searchParams.get('itemId')
  
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // Form state
  const [fullName, setFullName] = useState('')
  const [studentId, setStudentId] = useState('')
  const [proofOfOwnership, setProofOfOwnership] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Pre-fill user data
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '')
      setStudentId(user.studentId || '')
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!fullName.trim() || !studentId.trim() || !proofOfOwnership.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (!isAuthenticated) {
    return null
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
          <div>
            <h1 className="text-xl font-bold text-foreground">Claim Item</h1>
            <p className="text-sm text-muted-foreground">Verify ownership of a found item</p>
          </div>
        </div>

        {isSubmitted ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Claim Submitted
              </h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                Your claim has been submitted successfully. The person who found the item will review your claim and contact you if verified.
              </p>
              <div className="flex flex-col gap-3">
                <Link href="/lost-found">
                  <Button className="w-full">Back to Lost & Found</Button>
                </Link>
                <Link href="/notifications">
                  <Button variant="outline" className="w-full">
                    View Notifications
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Security Notice */}
            <Card className="mb-6 border-primary/20 bg-primary/5">
              <CardContent className="p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Secure Claim Process</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    To prevent fraudulent claims, you must provide proof of ownership. Your information will only be shared with the person who found the item.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Student ID */}
              <div className="space-y-2">
                <Label htmlFor="studentId">
                  Student ID <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="studentId"
                  placeholder="e.g., NJU/2022/0456"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Proof of Ownership */}
              <div className="space-y-2">
                <Label htmlFor="proof">
                  Proof of Ownership <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="proof"
                  placeholder="Describe unique features only the owner would know (e.g., scratches, stickers, contents, serial number)..."
                  value={proofOfOwnership}
                  onChange={(e) => setProofOfOwnership(e.target.value)}
                  className="min-h-[100px] resize-none"
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  Include specific details that prove you own this item.
                </p>
              </div>

              {/* Additional Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Additional Information (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Any additional information to help verify your claim..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[80px] resize-none"
                  disabled={isLoading}
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting Claim...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Claim
                    </>
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}

export default function ClaimItemPage() {
  return (
    <Suspense fallback={null}>
      <ClaimItemForm />
    </Suspense>
  )
}
