'use client'

import { useState, useMemo } from 'react'
import { BottomNav } from '@/components/bottom-nav'
import { ComplaintCard } from '@/components/complaint-card'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { mockComplaints, complaintCategories } from '@/lib/data'
import Link from 'next/link'
import {
  Plus,
  ArrowLeft,
  Building,
  Zap,
  Droplets,
  Wifi,
  GraduationCap,
  Shield,
  LucideIcon,
} from 'lucide-react'

const categoryIcons: Record<string, LucideIcon> = {
  hostel: Building,
  electricity: Zap,
  water: Droplets,
  internet: Wifi,
  academic: GraduationCap,
  security: Shield,
}

export default function ComplaintsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary">
        <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-white">Complaints</h1>
          <Link href="/complaints/new">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Plus className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="px-4 py-5 max-w-lg mx-auto">
        {/* Category Selection Grid */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-foreground mb-3">Select Category</h2>
          <div className="grid grid-cols-2 gap-3">
            {complaintCategories.map((category) => {
              const Icon = categoryIcons[category.id]
              return (
                <Link key={category.id} href={`/complaints/new?category=${category.id}`}>
                  <Card className="h-full hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer group border border-border">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-medium text-sm text-foreground">
                        {category.label}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Complaints */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">Recent Complaints</h2>
            <Link href="/complaints/history" className="text-sm text-primary font-medium hover:underline">
              View All
            </Link>
          </div>

          {mockComplaints.length === 0 ? (
            <EmptyState
              icon="inbox"
              title="No complaints yet"
              description="You haven't submitted any complaints yet."
              action={{
                label: 'Report Issue',
                onClick: () => router.push('/complaints/new')
              }}
            />
          ) : (
            <div className="space-y-3">
              {mockComplaints.slice(0, 3).map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
