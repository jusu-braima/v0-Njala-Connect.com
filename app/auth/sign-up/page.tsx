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
import { useState, useMemo } from 'react'
import { GraduationCap, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

// Faculties at Njala Campus with their departments
const facultiesAndDepartments = {
  'Faculty of Agriculture and Food Sciences': [
    'Agricultural Extension & Rural Sociology',
    'Agricultural Economics',
    'Crop Science',
    'Crop Protection',
    'Soil Science',
    'Animal Science',
    'Home Economics & Community Development',
  ],
  'Faculty of Environmental Sciences': [
    'Survey and Geo Informatics',
    'Land Management and Administration',
    'Environmental Management and Quality Control',
  ],
  'Faculty of Natural Resources Management': [
    'Forestry',
    'Horticulture',
    'Fisheries and Aquaculture',
    'Wildlife Management and Conservation',
    'Wood Science',
  ],
  'Faculty of Technology': [
    'Physics & Computer Science',
    'Industrial Technology',
    'Agricultural and Biosystems Engineering',
    'Maths and Statistics',
  ],
  'Faculty of Basic Sciences': [
    'Chemistry',
    'Biological Sciences',
  ],
  'Faculty of Veterinary Medicine and Animal Sciences': [
    'Veterinary Medicine',
    'Animal Sciences',
  ],
  'Faculty of Postgraduate Studies': [
    'Postgraduate Studies',
  ],
  'Other Academic/Research Units': [
    'Centre for Pedagogical Excellence',
    'Institute of Social Studies, Administration & Management (ISSAM)',
    'Institute of Moral & Religious Studies',
    'Institute of Languages and Cultural Studies',
  ],
}

const faculties = Object.keys(facultiesAndDepartments)

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    studentId: '',
    faculty: '',
    department: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Get departments based on selected faculty
  const availableDepartments = useMemo(() => {
    if (!formData.faculty) return []
    return facultiesAndDepartments[formData.faculty as keyof typeof facultiesAndDepartments] || []
  }, [formData.faculty])

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
            faculty: formData.faculty,
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
    setFormData(prev => {
      // Reset department when faculty changes
      if (field === 'faculty') {
        return { ...prev, [field]: value, department: '' }
      }
      return { ...prev, [field]: value }
    })
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/10 p-6 md:p-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col gap-6">
          {/* Logo & Branding */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <GraduationCap className="h-9 w-9" />
            </div>
            <h1 className="text-2xl font-bold font-heading bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">NjalaConnect</h1>
            <p className="text-sm text-muted-foreground">Create your student account</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-border/50 shadow-xl backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-heading">Sign Up</CardTitle>
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
                      />
                    </div>

                    {/* Faculty Selection */}
                    <div className="grid gap-2">
                      <Label htmlFor="faculty">
                        Faculty
                      </Label>
                      <Select 
                        value={formData.faculty} 
                        onValueChange={(value) => updateField('faculty', value)}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select your faculty" />
                        </SelectTrigger>
                        <SelectContent>
                          {faculties.map(faculty => (
                            <SelectItem key={faculty} value={faculty}>
                              {faculty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Department Selection */}
                    <div className="grid gap-2">
                      <Label htmlFor="department">
                        Department
                      </Label>
                      <Select 
                        value={formData.department} 
                        onValueChange={(value) => updateField('department', value)}
                        disabled={!formData.faculty}
                      >
                        <SelectTrigger className={`h-11 ${formData.department ? 'border-primary ring-1 ring-primary/20' : ''}`}>
                          <SelectValue placeholder={formData.faculty ? "Select your department" : "Select a faculty first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDepartments.map(dept => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
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
                      />
                    </div>

                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20"
                      >
                        {error}
                      </motion.div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full mt-2" 
                      size="lg"
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
                      className="font-semibold text-primary hover:underline underline-offset-4 transition-colors"
                    >
                      Sign in
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
