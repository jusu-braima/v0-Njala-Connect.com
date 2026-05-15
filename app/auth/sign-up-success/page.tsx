import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { GraduationCap, Mail, CheckCircle } from 'lucide-react'

export default function SignUpSuccessPage() {
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
          </div>

          <Card className="border-green-200 shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Check Your Email</CardTitle>
              <CardDescription>
                {"We've sent you a confirmation link"}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6 rounded-lg bg-green-50 p-4">
                <Mail className="mx-auto mb-2 h-8 w-8 text-green-600" />
                <p className="text-sm text-muted-foreground">
                  Please check your email inbox and click the confirmation link to activate your account.
                </p>
              </div>
              
              <p className="mb-6 text-sm text-muted-foreground">
                {"Didn't receive the email? Check your spam folder or try signing up again."}
              </p>

              <div className="flex flex-col gap-3">
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                  <Link href="/auth/login">
                    Go to Login
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-green-200">
                  <Link href="/auth/sign-up">
                    Try Again
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
