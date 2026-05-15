'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { BottomNav } from '@/components/bottom-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { supportServices } from '@/lib/data'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Search,
  Monitor,
  Building,
  Users,
  GraduationCap,
  Shield,
  HeartPulse,
  ChevronRight,
  ExternalLink,
  LucideIcon,
  MessageSquareWarning
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  monitor: Monitor,
  building: Building,
  users: Users,
  'graduation-cap': GraduationCap,
  shield: Shield,
  'heart-pulse': HeartPulse,
}

interface SupportServiceCardProps {
  service: typeof supportServices[0]
}

function SupportServiceCard({ service }: SupportServiceCardProps) {
  const Icon = iconMap[service.icon] || Users
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className={cn(
      'transition-all',
      expanded && 'ring-2 ring-primary/20'
    )}>
      <CardContent className="p-4">
        <div 
          className="flex items-start gap-3 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground">{service.name}</h3>
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
              {service.description}
            </p>
          </div>
          <ChevronRight className={cn(
            'w-5 h-5 text-muted-foreground transition-transform',
            expanded && 'rotate-90'
          )} />
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-3">
            {service.contactPhone && (
              <a 
                href={`tel:${service.contactPhone}`}
                className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{service.contactPhone}</span>
              </a>
            )}
            {service.contactEmail && (
              <a 
                href={`mailto:${service.contactEmail}`}
                className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{service.contactEmail}</span>
              </a>
            )}
            {service.location && (
              <div className="flex items-center gap-3 text-sm text-foreground">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{service.location}</span>
              </div>
            )}
            {service.hours && (
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{service.hours}</span>
              </div>
            )}
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                <MessageSquareWarning className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function SupportPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const filteredServices = supportServices.filter(service => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      service.name.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query)
    )
  })

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader notificationCount={8} />

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-foreground">Support Center</h1>
          <p className="text-sm text-muted-foreground">Contact campus services and get help</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link href="/complaints">
            <Card className="h-full hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer group">
              <CardContent className="p-4">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center mb-2">
                  <MessageSquareWarning className="w-5 h-5 text-warning" />
                </div>
                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  Report Issue
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Submit a complaint
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/lost-found">
            <Card className="h-full hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer group">
              <CardContent className="p-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Search className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  Lost & Found
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Find lost items
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Services List */}
        <div>
          <h2 className="text-base font-semibold text-foreground mb-3">Campus Services</h2>
          <div className="space-y-3">
            {filteredServices.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No services found matching your search.</p>
                </CardContent>
              </Card>
            ) : (
              filteredServices.map((service) => (
                <SupportServiceCard key={service.id} service={service} />
              ))
            )}
          </div>
        </div>

        {/* Emergency Contact */}
        <Card className="mt-6 border-destructive/30 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Emergency Contact</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  For emergencies, contact campus security immediately.
                </p>
                <a 
                  href="tel:076-SEC-RITY"
                  className="inline-flex items-center gap-1 text-sm font-medium text-destructive mt-2 hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  076-SEC-RITY
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav notificationCount={8} />
    </div>
  )
}
