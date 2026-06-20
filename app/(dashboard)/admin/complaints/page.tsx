'use client'

import { useState, useMemo } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { StatsCard, StatsGrid } from '@/components/stats-card'
import { StatusBadge, PriorityBadge } from '@/components/status-badge'
import { FilterDropdown } from '@/components/filter-dropdown'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { mockComplaints, complaintCategories } from '@/lib/data'
import { ComplaintStatus } from '@/lib/types'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  Search,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowLeft,
  Eye,
  MessageSquare,
  UserCheck,
  Loader2
} from 'lucide-react'
import { toast } from 'sonner'

export default function AdminComplaintsPage() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedComplaint, setSelectedComplaint] = useState<typeof mockComplaints[0] | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('pending')
  const [responseMessage, setResponseMessage] = useState('')
  const [assignedTeam, setAssignedTeam] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const stats = useMemo(() => {
    const pending = mockComplaints.filter(c => c.status === 'pending').length
    const inProgress = mockComplaints.filter(c => c.status === 'in-progress').length
    const resolved = mockComplaints.filter(c => c.status === 'resolved').length
    const rejected = mockComplaints.filter(c => c.status === 'rejected').length
    return { pending, inProgress, resolved, rejected, total: mockComplaints.length }
  }, [])

  const filteredComplaints = useMemo(() => {
    return mockComplaints.filter(complaint => {
      if (statusFilter !== 'all' && complaint.status !== statusFilter) return false
      if (priorityFilter !== 'all' && complaint.priority !== priorityFilter) return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          complaint.title.toLowerCase().includes(query) ||
          complaint.description.toLowerCase().includes(query) ||
          complaint.submittedBy.fullName.toLowerCase().includes(query)
        )
      }
      return true
    })
  }, [searchQuery, statusFilter, priorityFilter])

  const handleUpdateStatus = async () => {
    if (!selectedComplaint) return
    
    setIsUpdating(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success('Complaint status updated successfully')
    setIsUpdating(false)
    setSelectedComplaint(null)
    setResponseMessage('')
    setAssignedTeam('')
  }

  if (!isAuthenticated) {
    return null
  }

  // Check if user is admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <DashboardHeader notificationCount={8} />
        <main className="px-4 py-6 max-w-lg mx-auto">
          <Card>
            <CardContent className="py-12 text-center">
              <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Access Denied</h2>
              <p className="text-muted-foreground mb-4">
                You do not have permission to access the admin panel.
              </p>
              <Link href="/dashboard">
                <Button>Return to Dashboard</Button>
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

      <main className="px-4 py-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Admin: Complaint Management</h1>
            <p className="text-sm text-muted-foreground">Manage and respond to student complaints</p>
          </div>
        </div>

        {/* Stats */}
        <StatsGrid className="mb-6 lg:grid-cols-4">
          <StatsCard
            title="Pending"
            value={stats.pending}
            icon={Clock}
            color="warning"
          />
          <StatsCard
            title="In Progress"
            value={stats.inProgress}
            icon={AlertTriangle}
            color="primary"
          />
          <StatsCard
            title="Resolved"
            value={stats.resolved}
            icon={CheckCircle}
            color="success"
          />
          <StatsCard
            title="Rejected"
            value={stats.rejected}
            icon={XCircle}
            color="destructive"
          />
        </StatsGrid>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search complaints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <FilterDropdown
              label="Status"
              value={statusFilter}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'pending', label: 'Pending' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'resolved', label: 'Resolved' },
                { value: 'rejected', label: 'Rejected' },
              ]}
              onChange={setStatusFilter}
            />
            <FilterDropdown
              label="Priority"
              value={priorityFilter}
              options={[
                { value: 'all', label: 'All Priority' },
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
                { value: 'urgent', label: 'Urgent' },
              ]}
              onChange={setPriorityFilter}
            />
          </div>
        </div>

        {/* Complaints Table */}
        <Card>
          <CardContent className="p-0">
            {filteredComplaints.length === 0 ? (
              <div className="py-12">
                <EmptyState
                  icon="inbox"
                  title="No complaints found"
                  description="No complaints match your current filters."
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Complaint</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredComplaints.map((complaint) => {
                      const categoryInfo = complaintCategories.find(c => c.id === complaint.category)
                      return (
                        <TableRow key={complaint.id}>
                          <TableCell className="font-medium">
                            {complaint.submittedBy.fullName}
                          </TableCell>
                          <TableCell className="max-w-[200px]">
                            <p className="truncate font-medium">{complaint.title}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {complaint.location}
                            </p>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{categoryInfo?.label}</Badge>
                          </TableCell>
                          <TableCell>
                            <PriorityBadge priority={complaint.priority} />
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={complaint.status} />
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {format(complaint.createdAt, 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Link href={`/complaints/${complaint.id}`}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => {
                                      setSelectedComplaint(complaint)
                                      setNewStatus(complaint.status)
                                    }}
                                  >
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Update Complaint Status</DialogTitle>
                                    <DialogDescription>
                                      Update the status and respond to this complaint.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label>New Status</Label>
                                      <Select
                                        value={newStatus}
                                        onValueChange={(v) => setNewStatus(v as ComplaintStatus)}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="pending">Pending</SelectItem>
                                          <SelectItem value="in-progress">In Progress</SelectItem>
                                          <SelectItem value="resolved">Resolved</SelectItem>
                                          <SelectItem value="rejected">Rejected</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Assign Team (Optional)</Label>
                                      <Input
                                        placeholder="e.g., Maintenance Team"
                                        value={assignedTeam}
                                        onChange={(e) => setAssignedTeam(e.target.value)}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Response Message</Label>
                                      <Textarea
                                        placeholder="Enter your response to the student..."
                                        value={responseMessage}
                                        onChange={(e) => setResponseMessage(e.target.value)}
                                        className="min-h-[100px]"
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      onClick={handleUpdateStatus}
                                      disabled={isUpdating}
                                    >
                                      {isUpdating ? (
                                        <>
                                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                          Updating...
                                        </>
                                      ) : (
                                        'Update Status'
                                      )}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
