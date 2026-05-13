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
import { Eye, EyeOff, ArrowLeft, GraduationCap, BookOpen, Shield } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { faculties } from '@/lib/data'
import { UserRole } from '@/lib/types'

type RegisterRole = 'student' | 'lecturer' | 'admin'

export default function RegisterPage() {
  const [role, setRole] = useState<RegisterRole>('student')
  const [fullName, setFullName] = useState('')
  const [studentId, setStudentId] = useState('')
  const [email, setEmail] = useState('')
  const [faculty, setFaculty] = useState('')
  const [department, setDepartment] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  const { register } = useAuth()

  const selectedFaculty = faculties.find(f => f.id === faculty)
  const departments = selectedFaculty?.departments || []

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!email.trim()) newErrors.email = 'Email is required'
    if (!email.includes('@')) newErrors.email = 'Please enter a valid email'
    if (role === 'student' && !studentId.trim()) newErrors.studentId = 'Student ID is required'
    if (!faculty) newErrors.faculty = 'Please select a faculty'
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
      faculty: selectedFaculty?.name,
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center p-4">
        <Link href="/login">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
            <span className="sr-only">Go back</span>
          </Button>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-6 pb-8 overflow-y-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo size="md" />
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
            <p className="text-muted-foreground">Join the NjalaConnect community</p>
          </div>

          {/* Role Selection Tabs */}
          <Tabs value={role} onValueChange={(v) => setRole(v as RegisterRole)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto p-1">
              {(['student', 'lecturer', 'admin'] as const).map((r) => {
                const Icon = roleIcons[r]
                return (
                  <TabsTrigger
                    key={r}
                    value={r}
                    className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs capitalize">{r}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`h-12 rounded-xl ${errors.fullName ? 'border-destructive' : ''}`}
                  disabled={isLoading}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>

              {/* Student ID - Only for students */}
              <TabsContent value="student" className="mt-0 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    type="text"
                    placeholder="e.g., NU2024001"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className={`h-12 rounded-xl ${errors.studentId ? 'border-destructive' : ''}`}
                    disabled={isLoading}
                  />
                  {errors.studentId && (
                    <p className="text-sm text-destructive">{errors.studentId}</p>
                  )}
                </div>
              </TabsContent>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  {role === 'student' ? 'University Email' : 'Staff Email'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={role === 'student' ? 'student@njala.edu.sl' : 'staff@njala.edu.sl'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`h-12 rounded-xl ${errors.email ? 'border-destructive' : ''}`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Faculty */}
              <div className="space-y-2">
                <Label>Faculty</Label>
                <Select value={faculty} onValueChange={(v) => { setFaculty(v); setDepartment(''); }}>
                  <SelectTrigger className={`h-12 rounded-xl ${errors.faculty ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    {faculties.map((f) => (
                      <SelectItem key={f.id} value={f.id}>
                        {f.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.faculty && (
                  <p className="text-sm text-destructive">{errors.faculty}</p>
                )}
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label>Department</Label>
                <Select value={department} onValueChange={setDepartment} disabled={!faculty}>
                  <SelectTrigger className={`h-12 rounded-xl ${errors.department ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder={faculty ? 'Select department' : 'Select faculty first'} />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-sm text-destructive">{errors.department}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`h-12 rounded-xl pr-12 ${errors.password ? 'border-destructive' : ''}`}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10"
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
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`h-12 rounded-xl pr-12 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10"
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
                  <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-base font-semibold rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner size="sm" /> : 'Create Account'}
              </Button>
            </form>
          </Tabs>

          <div className="text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
