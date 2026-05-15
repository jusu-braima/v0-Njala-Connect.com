'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GraduationCap, Loader2 } from 'lucide-react'

const departments = [
  'Computer Science',
  'Agriculture',
  'Education',
  'Environmental Science',
  'Business Administration',
  'Nursing',
  'Engineering',
  'Social Sciences',
]

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    studentId: '',
    department: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback`,
          data: {
            full_name: formData.fullName,
            student_id: formData.studentId,
            department: formData.department,
            role: 'student',
          },
        },
      })
      if (error) throw error
      router.push('/auth/sign-up-success')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          {/* Logo & Branding */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-600 text-white">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-green-800">NjalaConnect</h1>
            <p className="text-sm text-muted-foreground">Create your student account</p>
          </div>

          <Card className="border-green-200 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Sign Up</CardTitle>
              <CardDescription>
                Join the Njala University community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      required
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      className="border-green-200 focus-visible:ring-green-500"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">University Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@njala.edu.sl"
                      required
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="border-green-200 focus-visible:ring-green-500"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      type="text"
                      placeholder="NU2024001"
                      value={formData.studentId}
                      onChange={(e) => updateField('studentId', e.target.value)}
                      className="border-green-200 focus-visible:ring-green-500"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="department">Department</Label>
                    <Select 
                      value={formData.department} 
                      onValueChange={(value) => updateField('department', value)}
                    >
                      <SelectTrigger className="border-green-200 focus:ring-green-500">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => updateField('password', e.target.value)}
                      className="border-green-200 focus-visible:ring-green-500"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => updateField('confirmPassword', e.target.value)}
                      className="border-green-200 focus-visible:ring-green-500"
                    />
                  </div>

                  {error && (
                    <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </div>
                <div className="mt-6 text-center text-sm">
                  Already have an account?{' '}
                  <Link
                    href="/auth/login"
                    className="font-medium text-green-600 hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
