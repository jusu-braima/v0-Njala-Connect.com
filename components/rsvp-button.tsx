'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { RSVPStatus } from '@/lib/types'
import { Check, ChevronDown, X, Star, Loader2 } from 'lucide-react'

interface RSVPButtonProps {
  status: RSVPStatus
  onStatusChange: (status: RSVPStatus) => void
  isLoading?: boolean
  className?: string
  size?: 'default' | 'sm' | 'lg'
}

const rsvpOptions: { value: RSVPStatus; label: string; icon: typeof Check; color: string }[] = [
  { value: 'going', label: 'Going', icon: Check, color: 'text-success' },
  { value: 'interested', label: 'Interested', icon: Star, color: 'text-warning' },
  { value: 'not-going', label: 'Not Going', icon: X, color: 'text-muted-foreground' },
]

export function RSVPButton({ 
  status, 
  onStatusChange, 
  isLoading = false,
  className,
  size = 'default'
}: RSVPButtonProps) {
  const currentOption = rsvpOptions.find(opt => opt.value === status)

  if (!status) {
    return (
      <Button
        className={cn('gap-2', className)}
        size={size}
        onClick={() => onStatusChange('going')}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Check className="w-4 h-4" />
            RSVP
          </>
        )}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={status === 'going' ? 'default' : 'outline'}
          className={cn('gap-2', className)}
          size={size}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              {currentOption && (
                <currentOption.icon className={cn('w-4 h-4', currentOption.color)} />
              )}
              {currentOption?.label}
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {rsvpOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onStatusChange(option.value)}
            className={cn(
              'gap-2 cursor-pointer',
              status === option.value && 'bg-accent'
            )}
          >
            <option.icon className={cn('w-4 h-4', option.color)} />
            {option.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onClick={() => onStatusChange(null)}
          className="gap-2 cursor-pointer text-destructive"
        >
          <X className="w-4 h-4" />
          Cancel RSVP
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface RSVPButtonGroupProps {
  status: RSVPStatus
  onStatusChange: (status: RSVPStatus) => void
  isLoading?: boolean
  className?: string
}

export function RSVPButtonGroup({ 
  status, 
  onStatusChange, 
  isLoading = false,
  className 
}: RSVPButtonGroupProps) {
  return (
    <div className={cn('flex gap-2', className)}>
      {rsvpOptions.map((option) => (
        <Button
          key={option.value}
          variant={status === option.value ? 'default' : 'outline'}
          size="sm"
          className="gap-1.5 flex-1"
          onClick={() => onStatusChange(status === option.value ? null : option.value)}
          disabled={isLoading}
        >
          <option.icon className={cn(
            'w-4 h-4',
            status === option.value ? 'text-current' : option.color
          )} />
          {option.label}
        </Button>
      ))}
    </div>
  )
}
