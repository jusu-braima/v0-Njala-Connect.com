'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Megaphone, MessageSquareWarning, CalendarDays, ChevronRight } from 'lucide-react'

const onboardingSteps = [
  {
    icon: Megaphone,
    title: 'Stay Informed',
    description: 'Receive verified academic and campus announcements in real time.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: MessageSquareWarning,
    title: 'Report Issues',
    description: 'Submit campus complaints and track progress.',
    color: 'bg-amber-500/10 text-amber-600',
  },
  {
    icon: CalendarDays,
    title: 'Get Involved',
    description: 'Discover campus events, opportunities, and student activities.',
    color: 'bg-emerald-500/10 text-emerald-600',
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push('/register')
    }
  }

  const handleSkip = () => {
    router.push('/register')
  }

  const step = onboardingSteps[currentStep]
  const Icon = step.icon
  const isLastStep = currentStep === onboardingSteps.length - 1

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip button */}
      <div className="flex justify-end p-4">
        <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
          Skip
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        {/* Icon */}
        <div className={`w-28 h-28 rounded-3xl ${step.color} flex items-center justify-center mb-8 shadow-sm`}>
          <Icon className="w-14 h-14" />
        </div>

        {/* Text content */}
        <div className="text-center space-y-3 max-w-sm">
          <h1 className="text-2xl font-bold text-foreground">{step.title}</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2 pb-6">
        {onboardingSteps.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentStep
                ? 'w-8 bg-primary'
                : index < currentStep
                ? 'w-2 bg-primary/50'
                : 'w-2 bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Bottom button */}
      <div className="px-6 pb-12">
        <Button
          size="lg"
          onClick={handleNext}
          className="w-full h-14 text-base font-semibold rounded-xl"
        >
          {isLastStep ? 'Continue' : 'Next'}
          <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  )
}
