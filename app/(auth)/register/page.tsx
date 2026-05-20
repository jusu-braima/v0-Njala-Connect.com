'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Logo } from '@/components/logo'
import { LoadingSpinner } from '@/components/loading-spinner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, ArrowLeft, GraduationCap, BookOpen, Shield, User, Mail, Lock, Building2, Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { schools } from '@/lib/data'
import { UserRole } from '@/lib/types'
import { motion } from 'framer-motion'

type RegisterRole = 'student' | 'lecturer' | 'admin'

export default function RegisterPage() {
  const [role, setRole] = useState<RegisterRole>('student')
  const [fullName, setFullName] = useState('')
  const [studentId, setStudentId] = useState('')
  const [email, setEmail] = useState('')
  const [school, setSchool] = useState('')
  const [department, setDepartment] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  const { register } = useAuth()

  const selectedSchool = schools.find(s => s.id === school)
  const departments = selectedSchool?.departments || []

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!email.trim()) newErrors.email = 'Email is required'
    if (!email.includes('@')) newErrors.email = 'Please enter a valid email'
    if (role === 'student' && !studentId.trim()) newErrors.studentId = 'Student ID is required'
    if (!school) newErrors.school = 'Please select a school'
    if (!department) newErrors.department = 'Please select a department'
    if (!password) newErrors.password = 'Password is required'
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    const success = await register({
      fullName,
      email,
      studentId: role === 'student' ? studentId : undefined,
      role: role as UserRole,
      faculty: selectedSchool?.name,
      department: departments.find(d => d.id === department)?.name,
      password,
    })

    if (success) {
      router.push('/profile-setup')
    }
    setIsLoading(false)
  }

  const roleIcons = {
    student: GraduationCap,
    lecturer: BookOpen,
    admin: Shield,
  }

  const roleColors = {
    student: 'from-primary to-emerald-500',
    lecturer: 'from-blue-500 to-indigo-500',
    admin: 'from-amber-500 to-orange-500',
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-5 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-60 left-5 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"
      />

      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center p-4 border-b border-border/50 bg-background/80 backdrop-blur-xl relative z-10"
      >
        <Link href="/login">
          <Button variant="ghost" size="icon" className="text-foreground btn-press rounded-xl hover:bg-muted/80 transition-all duration-300">
            <ArrowLeft className="w-5 h-5" />
            <span className="sr-only">Go back</span>
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-lg font-bold text-foreground pr-10 font-display">Create Account</h1>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-6 pb-8 overflow-y-auto relative z-10">
        {/* Logo */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex justify-center my-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-150 animate-pulse-soft" />
            <Logo size="md" />
          </div>
        </motion.div>

        {/* Form */}
        <div className="space-y-6 max-w-md mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-2"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wider uppercase">Join Us Today</span>
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground font-display">Join NjalaConnect</h2>
            <p className="text-sm text-muted-foreground">Create your account to get started</p>
          </motion.div>

          {/* Role Selection Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Tabs value={role} onValueChange={(v) => setRole(v as RegisterRole)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-auto p-1.5 bg-muted/50 rounded-2xl backdrop-blur-sm border border-border/50 shadow-lg shadow-black/5">
                {(['student', 'lecturer', 'admin'] as const).map((r) => {
                  const Icon = roleIcons[r]
                  return (
                    <TabsTrigger
                      key={r}
                      value={r}
                      className={`flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r ${roleColors[r]} data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 hover:bg-muted/80`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-semibold capitalize">{r}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                {/* Full Name */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label htmlFor="fullName" className="text-foreground font-medium">Full Name</Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`h-12 pl-11 rounded-xl bg-background border-input hover:border-primary/50 focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/10 ${errors.fullName ? 'border-destructive focus:border-destructive' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.fullName && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive font-medium"
                    >
                      {errors.fullName}
                    </motion.p>
                  )}
                </motion.div>

                {/* Student ID - Only for students */}
                <TabsContent value="student" className="mt-0 space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="studentId" className="text-foreground font-medium">Student ID</Label>
                    <div className="relative group">
                      <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                      <Input
                        id="studentId"
                        type="text"
                        placeholder="e.g., NU2024001"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className={`h-12 pl-11 rounded-xl bg-background border-input hover:border-primary/50 focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/10 ${errors.studentId ? 'border-destructive' : ''}`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.studentId && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-destructive font-medium"
                      >
                        {errors.studentId}
                      </motion.p>
                    )}
                  </motion.div>
                </TabsContent>

                {/* Email */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-foreground font-medium">
                    {role === 'student' ? 'University Email' : 'Staff Email'}
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={role === 'student' ? 'student@njala.edu.sl' : 'staff@njala.edu.sl'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`h-12 pl-11 rounded-xl bg-background border-input hover:border-primary/50 focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/10 ${errors.email ? 'border-destructive' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive font-medium"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* School */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <Label className="text-foreground font-medium">School</Label>
                  <div className="relative group">
                    <Select value={school} onValueChange={(v) => { setSchool(v); setDepartment(''); }}>
                      <SelectTrigger className={`h-12 rounded-xl bg-background border-input hover:border-primary/50 focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/10 ${errors.school ? 'border-destructive' : ''} ${school ? 'border-primary/50' : ''}`}>
                        <div className="flex items-center gap-3">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <SelectValue placeholder="Select school" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-border/50 shadow-2xl">
                        {schools.map((s) => (
                          <SelectItem 
                            key={s.id} 
                            value={s.id}
                            className="rounded-lg focus:bg-primary/10 focus:text-primary cursor-pointer"
                          >
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.school && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive font-medium"
                    >
                      {errors.school}
                    </motion.p>
                  )}
                </motion.div>

                {/* Department */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <Label className="text-foreground font-medium">Department</Label>
                  <div className="relative group">
                    <Select value={department} onValueChange={setDepartment} disabled={!school}>
                      <SelectTrigger className={`h-12 rounded-xl bg-background border-input hover:border-primary/50 focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/10 ${errors.department ? 'border-destructive' : ''} ${department ? 'border-primary ring-2 ring-primary/20' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}>
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                          <SelectValue placeholder={school ? 'Select department' : 'Select school first'} />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-border/50 shadow-2xl">
                        {departments.map((d) => (
                          <SelectItem 
                            key={d.id} 
                            value={d.id}
                            className="rounded-lg focus:bg-primary/10 focus:text-primary cursor-pointer"
                          >
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.department && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive font-medium"
                    >
                      {errors.department}
                    </motion.p>
                  )}
                </motion.div>

                {/* Password */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`h-12 pl-11 pr-12 rounded-xl bg-background border-input hover:border-primary/50 focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/10 ${errors.password ? 'border-destructive' : ''}`}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl hover:bg-muted transition-all duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive font-medium"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </motion.div>

                {/* Confirm Password */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="space-y-2"
                >
                  <Label htmlFor="confirmPassword" className="text-foreground font-medium">Confirm Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`h-12 pl-11 pr-12 rounded-xl bg-background border-input hover:border-primary/50 focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl hover:bg-muted transition-all duration-200"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive font-medium"
                    >
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-base font-bold rounded-xl bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98] group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        Create Account
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
            </Tabs>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-center pb-4"
          >
            <p className="text-muted-foreground text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-primary font-semibold hover:underline transition-colors">
                Login
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
