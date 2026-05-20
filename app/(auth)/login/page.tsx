'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Logo } from '@/components/logo'
import { LoadingSpinner } from '@/components/loading-spinner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, ArrowLeft, Mail, Lock, Sparkles, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)
    const success = await login(email, password)
    
    if (success) {
      router.push('/dashboard')
    } else {
      setError('Invalid credentials. Please try again.')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-mesh opacity-40" />
      
      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -25, 0], rotate: [0, 8, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 right-8 w-36 h-36 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -6, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 left-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 right-4 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl"
      />

      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center p-4 border-b border-border/50 bg-background/80 backdrop-blur-xl relative z-10"
      >
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-foreground btn-press rounded-xl hover:bg-muted/80 hover:shadow-md transition-all duration-300">
            <ArrowLeft className="w-5 h-5" />
            <span className="sr-only">Go back</span>
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-lg font-bold text-foreground pr-10 font-display">Login</h1>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-6 py-8 relative z-10">
        {/* Logo */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/15 rounded-full blur-2xl scale-150 animate-pulse-soft" />
            <Logo size="lg" variant="dark" />
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="space-y-6 max-w-sm mx-auto w-full"
        >
          {/* Welcome Header */}
          <div className="text-center space-y-2">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="flex items-center justify-center gap-2 mb-1"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wider uppercase">Secure Login</span>
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground font-display">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">Sign in to continue to NjalaConnect</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm font-medium flex items-center gap-3 shadow-lg shadow-destructive/5"
              >
                <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                {error}
              </motion.div>
            )}

            {/* Email Input */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <Label htmlFor="email" className="text-foreground font-medium">Student ID or Email</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                <Input
                  id="email"
                  type="text"
                  placeholder="e.g., NU2024001 or email@njala.edu.sl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-13 pl-11 rounded-xl bg-background border-input hover:border-primary/50 focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/10 hover:shadow-md"
                  disabled={isLoading}
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-13 pl-11 pr-12 rounded-xl bg-background border-input hover:border-primary/50 focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/10 hover:shadow-md"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 btn-press rounded-xl hover:bg-muted transition-all duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">
                    {showPassword ? 'Hide password' : 'Show password'}
                  </span>
                </Button>
              </div>
            </motion.div>

            {/* Remember & Forgot */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={isLoading}
                  className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-md transition-all duration-200 hover:border-primary"
                />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer text-foreground hover:text-primary transition-colors">
                  Remember me
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline font-medium transition-all hover:text-primary/80"
              >
                Forgot password?
              </Link>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="pt-2"
            >
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-base font-bold rounded-xl bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 btn-press transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98] group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    Login
                    <motion.span
                      className="ml-2 inline-block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Sign Up Link */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <p className="text-muted-foreground text-sm">
              {"Don't have an account? "}
              <Link href="/register" className="text-primary font-semibold hover:underline transition-colors">
                Create Account
              </Link>
            </p>
          </motion.div>


        </motion.div>
      </div>
    </div>
  )
}
