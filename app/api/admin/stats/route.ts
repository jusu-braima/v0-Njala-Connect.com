import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/admin/stats - Get admin dashboard statistics
export async function GET() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check if user is admin or staff
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || !['staff', 'admin'].includes(profile.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Get user counts by role
  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const { count: totalStudents } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student')

  const { count: totalStaff } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'staff')

  const { count: totalAdmins } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'admin')

  // Get announcement count
  const { count: totalAnnouncements } = await supabase
    .from('announcements')
    .select('*', { count: 'exact', head: true })

  // Get recent users (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  
  const { count: newUsersThisWeek } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo.toISOString())

  // Get users by department
  const { data: departmentStats } = await supabase
    .from('profiles')
    .select('department')

  const departmentCounts: Record<string, number> = {}
  departmentStats?.forEach(p => {
    const dept = p.department || 'Unassigned'
    departmentCounts[dept] = (departmentCounts[dept] || 0) + 1
  })

  return NextResponse.json({
    users: {
      total: totalUsers || 0,
      students: totalStudents || 0,
      staff: totalStaff || 0,
      admins: totalAdmins || 0,
      newThisWeek: newUsersThisWeek || 0,
    },
    announcements: {
      total: totalAnnouncements || 0,
    },
    departments: departmentCounts,
  })
}
