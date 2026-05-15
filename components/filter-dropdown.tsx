'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Filter, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterOption {
  value: string
  label: string
}

interface FilterDropdownProps {
  label: string
  value: string
  options: FilterOption[]
  onChange: (value: string) => void
  className?: string
}

export function FilterDropdown({
  label,
  value,
  options,
  onChange,
  className
}: FilterDropdownProps) {
  const selectedOption = options.find(opt => opt.value === value)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn('gap-1', className)}
        >
          <Filter className="h-4 w-4" />
          {selectedOption?.label || label}
          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface MultiFilterProps {
  filters: {
    id: string
    label: string
    value: string
    options: FilterOption[]
    onChange: (value: string) => void
  }[]
  className?: string
}

export function MultiFilter({ filters, className }: MultiFilterProps) {
  return (
    <div className={cn('flex items-center gap-2 overflow-x-auto pb-1', className)}>
      {filters.map((filter) => (
        <FilterDropdown
          key={filter.id}
          label={filter.label}
          value={filter.value}
          options={filter.options}
          onChange={filter.onChange}
        />
      ))}
    </div>
  )
}
