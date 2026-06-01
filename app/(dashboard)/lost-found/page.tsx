'use client'

import { useState, useMemo } from 'react'
import { BottomNav } from '@/components/bottom-nav'
import { LostItemCard } from '@/components/lost-item-card'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { mockLostItems, mockFoundItems } from '@/lib/data'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Plus,
  CalendarDays
} from 'lucide-react'

export default function LostFoundPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const items = useMemo(() => {
    return activeTab === 'lost' ? mockLostItems : mockFoundItems
  }, [activeTab])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      {/* Header - mobile only */}
      <header className="sticky top-0 z-40 bg-primary lg:hidden">
        <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-white">Lost & Found</h1>
          <Link href={`/lost-found/report?type=${activeTab}`}>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Plus className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Toggle Tabs */}
      <div className="bg-background border-b border-border sticky top-0 z-30">
        <div className="px-4 py-3 max-w-lg mx-auto lg:max-w-5xl xl:max-w-6xl">
          <div className="flex rounded-xl overflow-hidden bg-muted p-1">
            <button
              onClick={() => setActiveTab('lost')}
              className={cn(
                'flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors',
                activeTab === 'lost'
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Lost Items
            </button>
            <button
              onClick={() => setActiveTab('found')}
              className={cn(
                'flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors',
                activeTab === 'found'
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Found Items
            </button>
          </div>
        </div>
      </div>

      <main className="px-4 py-4 max-w-lg mx-auto lg:max-w-5xl xl:max-w-6xl">
        {/* Items List */}
        {items.length === 0 ? (
          <EmptyState
            icon={activeTab === 'lost' ? 'lost' : 'found'}
            title={`No ${activeTab} items`}
            description={activeTab === 'lost' 
              ? "No lost items have been reported yet."
              : "No found items have been reported yet."}
            action={{
              label: `Report ${activeTab === 'lost' ? 'Lost' : 'Found'} Item`,
              onClick: () => router.push(`/lost-found/report?type=${activeTab}`)
            }}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            {items.map((item) => (
              <Link key={item.id} href={`/lost-found/${item.id}`}>
                <div className="flex gap-3 p-3 bg-card border border-border rounded-xl hover:shadow-md transition-shadow">
                  {/* Item Image */}
                  <div className="w-20 h-20 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                    {item.imageUrl ? (
                      <Image 
                        src={item.imageUrl} 
                        alt={item.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <span className="text-3xl">
                          {item.category === 'student-id' ? '🪪' : 
                           item.category === 'phone' ? '📱' : 
                           item.category === 'wallet' ? '👛' : 
                           item.category === 'laptop' ? '💻' : 
                           item.category === 'keys' ? '🔑' : 
                           item.category === 'books' ? '📚' : '📦'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Item Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-medium text-sm text-foreground line-clamp-1">
                        {item.title}
                      </h3>
                      <span className={cn(
                        'text-[10px] font-medium px-2 py-0.5 rounded',
                        item.type === 'lost' 
                          ? 'bg-destructive/15 text-destructive'
                          : 'bg-success/15 text-success'
                      )}>
                        {item.type === 'lost' ? 'Lost' : 'Found'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 mb-1.5">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CalendarDays className="w-3 h-3" />
                      <span>{item.date.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  )
}
