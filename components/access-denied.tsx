'use client'

import { useRouter } from 'next/navigation'
import { Lock, ArrowLeft, MessageSquareWarning } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface AccessDeniedProps {
  title?: string
  description?: string
  /** Where the primary button sends the user. Defaults to the dashboard. */
  backHref?: string
  backLabel?: string
}

/**
 * Shown when a student tries to reach a posting/creation screen.
 * Posting is restricted to admins and lecturers; students can still
 * file complaints and view all published content.
 */
export function AccessDenied({
  title = 'Posting is restricted',
  description = 'Only administrators and lecturers can publish content on NjalaConnect. As a student you can view everything posted here and file complaints.',
  backHref = '/dashboard',
  backLabel = 'Back to Dashboard',
}: AccessDeniedProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <Card className="max-w-md w-full border-border/60">
        <CardContent className="p-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">
            <Lock className="h-8 w-8 text-amber-600" />
          </div>
          <h1 className="text-xl font-bold text-foreground text-balance">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">
            {description}
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Button onClick={() => router.push(backHref)} className="w-full gap-2">
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/complaints/new')}
              className="w-full gap-2"
            >
              <MessageSquareWarning className="h-4 w-4" />
              File a Complaint Instead
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
