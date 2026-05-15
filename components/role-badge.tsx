'use client'

import { cn } from '@/lib/utils'

type UserRole = 'student' | 'staff' | 'admin' | 'lecturer'

interface RoleBadgeProps {
  role: UserRole
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const roleConfig: Record<UserRole, { label: string; className: string }> = {
  student: {
    label: 'Student',
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  staff: {
    label: 'Staff',
    className: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
  },
  lecturer: {
    label: 'Lecturer',
    className: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
  },
  admin: {
    label: 'Admin',
    className: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  },
}

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
}

export function RoleBadge({ role, size = 'md', className }: RoleBadgeProps) {
  const config = roleConfig[role]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        config.className,
        sizeClasses[size],
        className
      )}
    >
      {config.label}
    </span>
  )
}
