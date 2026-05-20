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
import { GraduationCap, Loader2, BookOpen, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'

// Schools/Faculties at Njala Campus with their departments
const schoolsAndDepartments = {
  'School of Agriculture and Food Sciences': [
    'Agricultural Extension & Rural Sociology',
    'Agricultural Economics',
    'Crop Science',
    'Crop Protection',
    'Soil Science',
    'Animal Science',
    'Home Economics & Community Development',
  ],
  'School of Environmental Sciences': [
    'Department of Survey and Geo Informatics',
    'Department of Land Management and Administration',
    'Institute of Environmental Management and Quality Control',
  ],
  'School of Natural Resources Management': [
    'Department of Forestry',
    'Department of Horticulture',
    'Department of Fisheries and Aquaculture',
    'Department of Wildlife Management and Conservation',
    'Department of Wood Science',
  ],
  'School of Technology': [
    'Department of Physics & Computer Science',
    'Department of Industrial Technology',
    'Department of Agricultural and Biosystems Engineering',
    'Department of Maths and Statistics',
  ],
  'School of Basic Sciences': [
    'Department of Chemistry',
    'Department of Biological Sciences',
  ],
  'School of Veterinary Medicine and Animal Sciences': [
    'Veterinary Medicine',
    'Animal Sciences',
  ],
  'School of Postgraduate Studies': [
    'Postgraduate Studies',
  ],
  'Other Academic/Research Units': [
    'Centre for Pedagogical Excellence',
    'Institute of Social Studies, Administration & Management (ISSAM)',
    'Institute of Moral & Religious Studies',
    'Institute of Languages and Cultural Studies',
  ],
}

const schools = Object.keys(schoolsAndDepartments)

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    studentId: '',
    school: '',
    department: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Get departments based on selected school
  const availableDepartments = useMemo(() => {
    if (!formData.school) return []
    return schoolsAndDepartments[formData.school as keyof typeof schoolsAndDepartments] || []
  }, [formData.school])

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
            school: formData.school,
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
      // Reset department when school changes
      if (field === 'school') {
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

                    {/* School/Faculty Selection */}
                    <div className="grid gap-2">
                      <Label htmlFor="school" className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        School/Faculty
                      </Label>
                      <Select 
                        value={formData.school} 
                        onValueChange={(value) => updateField('school', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your school/faculty" />
                        </SelectTrigger>
                        <SelectContent>
                          {schools.map(school => (
                            <SelectItem key={school} value={school}>
                              {school}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Department Selection - Only show after school is selected */}
                    <motion.div 
                      className="grid gap-2"
                      initial={false}
                      animate={{ 
                        opacity: formData.school ? 1 : 0.5,
                        height: 'auto'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Label htmlFor="department" className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        Department
                      </Label>
                      <Select 
                        value={formData.department} 
                        onValueChange={(value) => updateField('department', value)}
                        disabled={!formData.school}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={formData.school ? "Select your department" : "Select a school first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDepartments.map(dept => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                    
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
