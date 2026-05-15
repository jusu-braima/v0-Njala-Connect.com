'use client'

import { useState, useEffect, useMemo } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { StatusBadge, PriorityBadge } from '@/components/status-badge'
import { Timeline, TimelineSkeleton } from '@/components/timeline'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/lib/auth-context'
import { useRouter, useParams } from 'next/navigation'
import { mockComplaints, complaintCategories } from '@/lib/data'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import Link from 'next/link'
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Building,
  Zap,
  Droplets,
  Wifi,
  GraduationCap,
  Shield,
  Edit,
  Trash2,
  LucideIcon
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

const categoryIcons: Record<string, LucideIcon> = {
  hostel: Building,
  electricity: Zap,
  water: Droplets,
  internet: Wifi,
  academic: GraduationCap,
  security: Shield,
}

export default function ComplaintDetailPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const params = useParams()
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const complaint = useMemo(() => {
    return mockComplaints.find(c => c.id === params.id)
  }, [params.id])

  const categoryInfo = useMemo(() => {
    if (!complaint) return null
    return complaintCategories.find(c => c.id === complaint.category)
  }, [complaint])

  const CategoryIcon = complaint ? categoryIcons[complaint.category] : Building

  const handleDelete = async () => {
    setIsDeleting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Complaint deleted')
    router.push('/complaints')
  }

  if (!isAuthenticated) {
    return null
  }

  if (!complaint) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <DashboardHeader notificationCount={8} />
        <main className="px-4 py-6 max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/complaints">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">Complaint Not Found</h1>
          </div>
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">This complaint does not exist or has been removed.</p>
              <Link href="/complaints">
                <Button className="mt-4">Back to Complaints</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <BottomNav notificationCount={8} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader notificationCount={8} />

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/complaints">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Complaint Details</h1>
            <p className="text-sm text-muted-foreground">ID: {complaint.id}</p>
          </div>
        </div>

        {/* Status & Priority */}
        <div className="flex items-center gap-2 mb-4">
          <StatusBadge status={complaint.status} />
          <PriorityBadge priority={complaint.priority} />
        </div>

        {/* Title & Category */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CategoryIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">{complaint.title}</h2>
                <p className="text-sm text-muted-foreground">{categoryInfo?.label}</p>
              </div>
            </div>

            <Separator className="my-4" />

            <p className="text-sm text-foreground leading-relaxed">
              {complaint.description}
            </p>

            {complaint.imageUrl && (
              <div className="mt-4 rounded-lg overflow-hidden border border-border">
                <img 
                  src={complaint.imageUrl} 
                  alt="Complaint evidence" 
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Details */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{complaint.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">
                  Submitted on {format(complaint.createdAt, 'MMMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">
                  {complaint.submittedBy.fullName}
                </span>
              </div>
              {complaint.assignedTo && (
                <div className="flex items-center gap-3 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">
                    Assigned to: {complaint.assignedTo}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Timeline items={complaint.timeline} />
          </CardContent>
        </Card>

        {/* Actions */}
        {complaint.status === 'pending' && (
          <div className="flex items-center gap-3">
            <Link href={`/complaints/${complaint.id}/edit`} className="flex-1">
              <Button variant="outline" className="w-full">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex-1">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Complaint</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this complaint? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
