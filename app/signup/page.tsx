'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/lib/auth-context'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const { signInWithGoogle, signInWithMicrosoft, signUpWithEmail } = useAuth()
  const router = useRouter()

  const handleGoogleSignUp = async () => {
    setLoading(true)
    setError('')
    await signInWithGoogle()
  }

  const handleMicrosoftSignUp = async () => {
    setLoading(true)
    setError('')
    await signInWithMicrosoft()
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Validate password strength
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    const { error } = await signUpWithEmail(email, password)
    if (error) {
      setError(error)
    } else {
      setMessage('Check your email for the confirmation link!')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(245,158,11,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.5) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-10">
          <Image src="/logo.png" alt="ArchiKEK" width={48} height={48} className="rounded-xl" />
          <span className="font-serif text-2xl font-semibold">
            Archi<span className="text-amber-500">KEK</span>
          </span>
        </Link>

        {/* Card */}
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8">
          <h1 className="text-2xl font-semibold text-center mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-400 text-center text-sm mb-8">
            Start creating professional site analysis maps
          </p>

          {/* Microsoft Button - Highlighted for Students */}
          <button
            onClick={handleMicrosoftSignUp}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-[#2F2F2F] text-white rounded-xl font-medium hover:bg-[#3F3F3F] transition-colors disabled:opacity-50 border border-[#444] mb-3"
          >
            <svg width="20" height="20" viewBox="0 0 23 23">
              <rect x="1" y="1" width="10" height="10" fill="#f25022"/>
              <rect x="12" y="1" width="10" height="10" fill="#7fba00"/>
              <rect x="1" y="12" width="10" height="10" fill="#00a4ef"/>
              <rect x="12" y="12" width="10" height="10" fill="#ffb900"/>
            </svg>
            Sign up with Microsoft
          </button>
          
          {/* Yaşar Student Notice */}
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-xs text-center text-blue-300">
              🎓 <span className="font-medium">Yaşar University students:</span> Sign up with @stu.yasar.edu.tr for <span className="text-amber-400 font-semibold">free Pro access!</span>
            </p>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#222]" />
            <span className="text-gray-500 text-sm">or sign up with email</span>
            <div className="flex-1 h-px bg-[#222]" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full px-4 py-3.5 bg-[#111] border border-[#222] rounded-xl text-white placeholder-gray-500 focus:border-amber-500/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min 6 characters)"
                required
                minLength={6}
                className="w-full px-4 py-3.5 bg-[#111] border border-[#222] rounded-xl text-white placeholder-gray-500 focus:border-amber-500/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
                minLength={6}
                className="w-full px-4 py-3.5 bg-[#111] border border-[#222] rounded-xl text-white placeholder-gray-500 focus:border-amber-500/50 focus:outline-none transition-colors"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {message && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm font-medium">✓ {message}</p>
                <p className="text-green-400/70 text-xs mt-1">Check your spam folder if you don't see it.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-amber-500 text-black rounded-xl font-semibold hover:bg-amber-400 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Terms */}
          <p className="text-center text-gray-500 text-xs mt-6">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-amber-500/70 hover:text-amber-500">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-amber-500/70 hover:text-amber-500">Privacy Policy</Link>
          </p>

          {/* Login Link */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-amber-500 hover:text-amber-400 font-medium">
              Sign In
            </Link>
          </p>
        </div>

        {/* Free credit notice */}
        <div className="text-center mt-6 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
          <p className="text-amber-500 font-medium">🎁 1 Free Map Credit</p>
          <p className="text-gray-400 text-sm mt-1">Create your first map on us!</p>
        </div>
      </div>
    </div>
  )
}
