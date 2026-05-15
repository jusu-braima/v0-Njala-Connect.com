'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import {
  ArrowLeft,
  Search,
  MoreVertical,
  UserCog,
  Trash2,
  Shield,
  Users,
  GraduationCap,
  Loader2,
  AlertTriangle,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface Profile {
  id: string
  email: string
  full_name: string | null
  student_id: string | null
  department: string | null
  role: 'student' | 'staff' | 'admin'
  avatar_url: string | null
  created_at: string
}

export default function AdminUsersPage() {
  const { profile, isAdmin } = useAuth()
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')

  const queryParams = new URLSearchParams()
  if (search) queryParams.set('search', search)
  if (roleFilter !== 'all') queryParams.set('role', roleFilter)

  const { data, error, isLoading, mutate } = useSWR<{ users: Profile[], total: number }>(
    `/api/users?${queryParams.toString()}`,
    fetcher
  )

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      })
      if (res.ok) {
        mutate()
      }
    } catch (error) {
      console.error('Failed to update role:', error)
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        mutate()
      }
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Admin</Badge>
      case 'staff':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Staff</Badge>
      default:
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Student</Badge>
    }
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <DashboardHeader notificationCount={0} />
        <main className="px-4 py-6 max-w-lg mx-auto">
          <Card>
            <CardContent className="py-12 text-center">
              <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Access Denied</h2>
              <p className="text-muted-foreground mb-4">
                You do not have permission to access user management.
              </p>
              <Link href="/dashboard">
                <Button>Return to Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <BottomNav notificationCount={0} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader notificationCount={0} />

      <main className="px-4 py-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">User Management</h1>
            <p className="text-sm text-muted-foreground">
              Manage all users and their roles
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data?.users?.filter(u => u.role === 'student').length || 0}</p>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data?.users?.filter(u => u.role === 'staff').length || 0}</p>
                <p className="text-xs text-muted-foreground">Staff</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data?.users?.filter(u => u.role === 'admin').length || 0}</p>
                <p className="text-xs text-muted-foreground">Admins</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or student ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              All Users ({data?.total || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-muted-foreground">
                Failed to load users. Please try again.
              </div>
            ) : data?.users?.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No users found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.users?.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={user.avatar_url || ''} />
                              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{user.full_name || 'No name'}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {user.student_id || '-'}
                        </TableCell>
                        <TableCell className="text-sm">
                          {user.department || '-'}
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleRoleChange(user.id, 'student')}
                                disabled={user.role === 'student' || user.id === profile?.id}
                              >
                                <GraduationCap className="mr-2 h-4 w-4" />
                                Set as Student
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleRoleChange(user.id, 'staff')}
                                disabled={user.role === 'staff' || user.id === profile?.id}
                              >
                                <UserCog className="mr-2 h-4 w-4" />
                                Set as Staff
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleRoleChange(user.id, 'admin')}
                                disabled={user.role === 'admin' || user.id === profile?.id}
                              >
                                <Shield className="mr-2 h-4 w-4" />
                                Set as Admin
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(user.id)}
                                disabled={user.id === profile?.id}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <BottomNav notificationCount={0} />
    </div>
  )
}
