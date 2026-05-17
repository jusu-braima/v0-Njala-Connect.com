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
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border animate-fade-in-down">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-foreground btn-press">
            <ArrowLeft className="w-5 h-5" />
            <span className="sr-only">Go back</span>
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-foreground pr-10">Login</h1>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-6 py-8 page-transition">
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-bounce-in">
          <Logo size="lg" variant="dark" />
        </div>

        {/* Form */}
        <div className="space-y-6 max-w-sm mx-auto w-full">
          <div className="text-center space-y-1 animate-initial animate-fade-in-up animate-delay-100">
            <h2 className="text-xl font-semibold text-foreground">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">Sign in to continue to NjalaConnect</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-scale-in">
                {error}
              </div>
            )}

            <div className="space-y-2 animate-initial animate-fade-in-up animate-delay-200">
              <Label htmlFor="email" className="text-foreground">Student ID or Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="e.g., NU2024001 or email@njala.edu.sl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl bg-background border-input transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2 animate-initial animate-fade-in-up animate-delay-300">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl pr-12 bg-background border-input transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 btn-press"
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
            </div>

            <div className="flex items-center justify-between animate-initial animate-fade-in-up animate-delay-400">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={isLoading}
                  className="border-primary data-[state=checked]:bg-primary transition-all duration-200"
                />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer text-foreground">
                  Remember me
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <div className="animate-initial animate-fade-in-up animate-delay-500">
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 btn-press transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner size="sm" /> : 'Login'}
              </Button>
            </div>
          </form>

          <div className="text-center animate-initial animate-fade-in-up animate-delay-600">
            <p className="text-muted-foreground text-sm">
              {"Don't have an account? "}
              <Link href="/register" className="text-primary font-medium hover:underline transition-colors">
                Create Account
              </Link>
            </p>
          </div>

          {/* Test Credentials Info */}
          <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border animate-initial animate-fade-in-up animate-delay-700">
            <p className="text-xs font-medium text-muted-foreground mb-2">Test Credentials:</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p><span className="font-medium">Student:</span> student@njala.edu.sl / student123</p>
              <p><span className="font-medium">Staff:</span> staff@njala.edu.sl / staff123</p>
              <p><span className="font-medium">Admin:</span> admin@njala.edu.sl / admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
