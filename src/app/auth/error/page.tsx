'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Button from '@/components/ui/Button'

const ERROR_HELP: Record<string, string> = {
  Configuration:
    'Missing NEXTAUTH_SECRET or OAuth credentials. Add the required environment variables and redeploy.',
  AccessDenied: 'Access was denied. Please try signing in with a different account.',
  OAuthAccountNotLinked:
    'This account is already linked with a different provider. Try signing in with the original provider.',
  EmailSignInError: 'There was a problem sending the sign-in email. Please try again later.',
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') || 'Configuration'
  const message = ERROR_HELP[error] || 'Something went wrong. Please try again.'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Authentication error</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{message}</p>
          {error === 'Configuration' && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Ensure NEXTAUTH_SECRET is set along with any provider credentials (e.g. GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET).
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Button asChild variant="primary" size="lg" className="w-full">
            <Link href="/auth/signin">Return to sign in</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/">Go to home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
