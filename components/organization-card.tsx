'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { StudentOrganization } from '@/lib/types'
import { organizationCategories } from '@/lib/data'
import { cn } from '@/lib/utils'
import { 
  Users,
  ChevronRight,
  Mail,
  Calendar
} from 'lucide-react'
import Link from 'next/link'

interface OrganizationCardProps {
  organization: StudentOrganization
  className?: string
  variant?: 'default' | 'compact'
  onJoin?: (id: string) => void
}

export function OrganizationCard({ 
  organization, 
  className, 
  variant = 'default',
  onJoin
}: OrganizationCardProps) {
  const categoryInfo = organizationCategories.find(c => c.id === organization.category)
  const initials = organization.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  if (variant === 'compact') {
    return (
      <Link href={`/organizations/${organization.id}`}>
        <Card className={cn(
          'hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer group',
          'gradient-fill-hover corner-accent',
          className
        )}>
          <CardContent className="p-3 flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={organization.logoUrl} alt={organization.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {organization.name}
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <span>{categoryInfo?.label}</span>
                <span className="text-border">|</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {organization.memberCount} members
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/organizations/${organization.id}`}>
      <Card className={cn(
        'hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer group h-full',
        'orbs-bg shine-hover sparkle-container',
        className
      )}>
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-start gap-3 mb-3">
            <Avatar className="h-14 w-14">
              <AvatarImage src={organization.logoUrl} alt={organization.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <Badge variant="outline" className="text-xs mb-1">
                {categoryInfo?.label}
              </Badge>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {organization.name}
              </h3>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
            {organization.description}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span>{organization.memberCount} members</span>
            </div>
            {organization.meetingSchedule && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                <span className="truncate">{organization.meetingSchedule}</span>
              </div>
            )}
            {organization.contactEmail && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">{organization.contactEmail}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              View Profile
            </Button>
            <Button 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.preventDefault()
                onJoin?.(organization.id)
              }}
            >
              Join
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export function OrganizationCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted" />
          <div className="flex-1">
            <div className="h-4 bg-muted rounded w-3/4 mb-1" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="animate-pulse">
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-14 h-14 rounded-full bg-muted" />
          <div className="flex-1">
            <div className="h-4 bg-muted rounded w-20 mb-2" />
            <div className="h-5 bg-muted rounded w-3/4" />
          </div>
        </div>
        <div className="h-10 bg-muted rounded w-full mb-3" />
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-muted rounded w-24" />
          <div className="h-3 bg-muted rounded w-32" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 bg-muted rounded flex-1" />
          <div className="h-8 bg-muted rounded flex-1" />
        </div>
      </CardContent>
    </Card>
  )
}
