'use client'

import { useState, useMemo } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { OpportunityCard } from '@/components/opportunity-card'
import { DeadlineBadge } from '@/components/opportunity-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import { useRouter, useParams } from 'next/navigation'
import { useEffect } from 'react'
import { mockOpportunities, opportunityCategories } from '@/lib/data'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  Building2,
  CheckCircle,
  Gift,
  FileText,
  ExternalLink,
  Bookmark,
  Share2
} from 'lucide-react'

export default function OpportunityDetailPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const params = useParams()
  const [isSaved, setIsSaved] = useState(false)

  const opportunity = useMemo(() => {
    return mockOpportunities.find(o => o.id === params.id)
  }, [params.id])

  const similarOpportunities = useMemo(() => {
    if (!opportunity) return []
    return mockOpportunities
      .filter(o => o.category === opportunity.category && o.id !== opportunity.id && o.status !== 'closed')
      .slice(0, 3)
  }, [opportunity])

  const categoryInfo = opportunity ? opportunityCategories.find(c => c.id === opportunity.category) : null

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: opportunity?.title,
          text: opportunity?.shortDescription,
          url: window.location.href,
        })
      } catch {
        // User cancelled or error
      }
    }
  }

  if (!isAuthenticated) {
    return null
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <DashboardHeader notificationCount={8} />
        <main className="px-4 py-6 max-w-lg mx-auto">
          <div className="text-center py-12">
            <h1 className="text-lg font-semibold">Opportunity not found</h1>
            <p className="text-sm text-muted-foreground mt-1">
              This opportunity may have been removed or doesn&apos;t exist.
            </p>
            <Button className="mt-4" onClick={() => router.push('/opportunities')}>
              Back to Opportunities
            </Button>
          </div>
        </main>
        <BottomNav notificationCount={8} />
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

        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              {categoryInfo?.label}
            </Badge>
            <DeadlineBadge deadline={opportunity.deadline} status={opportunity.status} />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">{opportunity.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="w-4 h-4" />
            <span>{opportunity.provider}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mb-6">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setIsSaved(!isSaved)}
          >
            <Bookmark className={cn('w-4 h-4', isSaved && 'fill-current text-primary')} />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        {/* Deadline Card */}
        <Card className="mb-6">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Application Deadline</p>
              <p className="text-lg font-bold text-primary">
                {format(opportunity.deadline, 'MMMM d, yyyy')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <section className="mb-6">
          <h2 className="font-semibold text-base mb-2">About This Opportunity</h2>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {opportunity.description}
          </p>
        </section>

        {/* Eligibility */}
        {opportunity.eligibility && opportunity.eligibility.length > 0 && (
          <section className="mb-6">
            <h2 className="font-semibold text-base mb-3">Eligibility Criteria</h2>
            <Card>
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {opportunity.eligibility.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Requirements */}
        {opportunity.requirements && opportunity.requirements.length > 0 && (
          <section className="mb-6">
            <h2 className="font-semibold text-base mb-3">Requirements</h2>
            <Card>
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {opportunity.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <FileText className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Benefits */}
        {opportunity.benefits && opportunity.benefits.length > 0 && (
          <section className="mb-6">
            <h2 className="font-semibold text-base mb-3">Benefits</h2>
            <Card>
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {opportunity.benefits.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Gift className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Apply Button */}
        {opportunity.status !== 'closed' && opportunity.applicationLink && (
          <div className="mb-6">
            <Button asChild className="w-full gap-2" size="lg">
              <a href={opportunity.applicationLink} target="_blank" rel="noopener noreferrer">
                Apply Now
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        )}

        {opportunity.status === 'closed' && (
          <Card className="mb-6 bg-muted">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">
                This opportunity is no longer accepting applications.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Similar Opportunities */}
        {similarOpportunities.length > 0 && (
          <section>
            <h2 className="font-semibold text-base mb-3">Similar Opportunities</h2>
            <div className="space-y-3">
              {similarOpportunities.map((opp) => (
                <OpportunityCard key={opp.id} opportunity={opp} variant="compact" />
              ))}
            </div>
          </section>
        )}
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
