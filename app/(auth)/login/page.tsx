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
import { Eye, EyeOff, ArrowLeft, Mail, Lock, Sparkles } from 'lucide-react'
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
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      
      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 left-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl"
      />

      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center p-4 border-b border-border/50 bg-background/80 backdrop-blur-xl relative z-10"
      >
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-foreground btn-press rounded-xl">
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
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-150 animate-pulse-soft" />
            <Logo size="lg" variant="dark" />
          </div>
        </motion.div>

        {/* Form */}
        <div className="space-y-6 max-w-sm mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-2"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wider uppercase">Secure Login</span>
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground font-display">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">Sign in to continue to NjalaConnect</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium"
              >
                {error}
              </motion.div>
            )}

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <Label htmlFor="email" className="text-foreground font-medium">Student ID or Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="text"
                  placeholder="e.g., NU2024001 or email@njala.edu.sl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-13 pl-11 rounded-xl bg-background border-input hover:border-primary/50 focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/5"
                  disabled={isLoading}
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-13 pl-11 pr-12 rounded-xl bg-background border-input hover:border-primary/50 focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/5"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 btn-press rounded-xl hover:bg-muted"
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

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={isLoading}
                  className="border-primary data-[state=checked]:bg-primary rounded-md transition-all duration-200"
                />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer text-foreground">
                  Remember me
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline font-medium transition-colors hover:text-primary/80"
              >
                Forgot password?
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-base font-bold rounded-xl bg-primary hover:bg-primary/90 btn-press transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    Login
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <p className="text-muted-foreground text-sm">
              {"Don't have an account? "}
              <Link href="/register" className="text-primary font-semibold hover:underline transition-colors">
                Create Account
              </Link>
            </p>
          </motion.div>

          {/* Test Credentials Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-5 rounded-2xl bg-muted/30 border border-border/50 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary" />
              </div>
              <p className="text-xs font-bold text-foreground">Test Credentials</p>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                <span className="font-semibold text-foreground">Student</span>
                <span className="font-mono text-[10px]">student@njala.edu.sl / student123</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                <span className="font-semibold text-foreground">Staff</span>
                <span className="font-mono text-[10px]">staff@njala.edu.sl / staff123</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                <span className="font-semibold text-foreground">Admin</span>
                <span className="font-mono text-[10px]">admin@njala.edu.sl / admin123</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
