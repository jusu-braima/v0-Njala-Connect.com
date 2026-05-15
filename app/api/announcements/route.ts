import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/announcements - List announcements
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  
  const { searchParams } = request.nextUrl
  const priority = searchParams.get('priority')
  const department = searchParams.get('department')
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = parseInt(searchParams.get('offset') || '0')

  let query = supabase
    .from('announcements')
    .select(`
      *,
      author:profiles!author_id(id, full_name, avatar_url)
    `, { count: 'exact' })
    .or('expires_at.is.null,expires_at.gt.now()')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (priority) {
    query = query.eq('priority', priority)
  }

  if (department) {
    query = query.eq('department', department)
  }

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ 
    announcements: data, 
    total: count,
    limit,
    offset 
  })
}

// POST /api/announcements - Create announcement (staff/admin only)
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check if user is staff or admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || !['staff', 'admin'].includes(profile.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  
  const { data, error } = await supabase
    .from('announcements')
    .insert({
      ...body,
      author_id: user.id,
    })
    .select(`
      *,
      author:profiles!author_id(id, full_name, avatar_url)
    `)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
