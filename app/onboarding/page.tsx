'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Megaphone, MessageSquareWarning, CalendarDays, ChevronRight, ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const onboardingSteps = [
  {
    icon: Megaphone,
    title: 'Stay Informed',
    description: 'Receive verified academic and campus announcements in real time.',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/10 to-cyan-500/10',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/njalauniversity_cover.jfif-7VWDFFIMhViXiERgBJ12MTvXRYfXgE.jpeg',
  },
  {
    icon: MessageSquareWarning,
    title: 'Report Issues',
    description: 'Submit campus complaints and track their resolution progress.',
    gradient: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-500/10 to-orange-500/10',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images.jfif-zhPjAtFGdao46k2CHmNCTo4fBLvfd6.jpeg',
  },
  {
    icon: CalendarDays,
    title: 'Get Involved',
    description: 'Discover campus events, opportunities, and student activities.',
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-500/10 to-teal-500/10',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/njalauniversity_cover.jfif-7VWDFFIMhViXiERgBJ12MTvXRYfXgE.jpeg',
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setDirection(1)
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} transition-all duration-700`} />
      
      {/* Decorative elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"
      />

      {/* Skip button */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end p-4 relative z-10"
      >
        <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground font-semibold rounded-xl">
          Skip
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center px-6 pb-8 relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full flex flex-col items-center"
          >
            {/* Campus image */}
            <div className="relative w-full max-w-sm h-56 rounded-3xl overflow-hidden mb-8 shadow-2xl">
              <Image
                src={step.image}
                alt="Njala University Campus"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              
              {/* Floating icon */}
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={`absolute bottom-4 right-4 w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </motion.div>

              {/* Sparkle decorations */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-4 left-4"
              >
                <Sparkles className="w-5 h-5 text-white/70" />
              </motion.div>
            </div>

            {/* Text content */}
            <div className="text-center space-y-4 max-w-sm">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold text-foreground font-display"
              >
                {step.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground text-lg leading-relaxed"
              >
                {step.description}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2 pb-6 relative z-10">
        {onboardingSteps.map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentStep
                ? 'w-10 bg-primary shadow-lg shadow-primary/30'
                : index < currentStep
                ? 'w-2 bg-primary/50'
                : 'w-2 bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Bottom button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 pb-12 relative z-10"
      >
        <Button
          size="lg"
          onClick={handleNext}
          className="w-full h-14 text-base font-bold rounded-2xl shadow-xl shadow-primary/20 group"
        >
          {isLastStep ? 'Get Started' : 'Next'}
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.span>
        </Button>
      </motion.div>
    </div>
  )
}
