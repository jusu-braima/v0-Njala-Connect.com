import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/users - List all users (admin only)
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  
  // Check authentication
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Parse query params
  const { searchParams } = request.nextUrl
  const role = searchParams.get('role')
  const search = searchParams.get('search')
  const limit = parseInt(searchParams.get('limit') || '50')
  const offset = parseInt(searchParams.get('offset') || '0')

  let query = supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (role) {
    query = query.eq('role', role)
  }

  if (search) {
    query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,student_id.ilike.%${search}%`)
  }

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ 
    users: data, 
    total: count,
    limit,
    offset 
  })
}
