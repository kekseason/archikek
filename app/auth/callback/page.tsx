'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check if there's a hash with tokens (OAuth callback)
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        
        if (accessToken && refreshToken) {
          console.log('Found tokens in hash, setting session...')
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          })
          
          if (error) {
            console.error('Error setting session:', error)
            setError(error.message)
            return
          }
          
          if (data.session) {
            console.log('Session set successfully, redirecting...')
            router.push('/create')
            return
          }
        }
        
        // Check for code in URL params (PKCE flow)
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        
        if (code) {
          console.log('Found code in URL, exchanging...')
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)
          
          if (error) {
            console.error('Error exchanging code:', error)
            setError(error.message)
            return
          }
          
          if (data.session) {
            console.log('Session created, redirecting...')
            router.push('/create')
            return
          }
        }
        
        // Fallback - check existing session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          console.log('Existing session found, redirecting...')
          router.push('/create')
        } else {
          console.log('No session found, redirecting to login...')
          router.push('/login')
        }
      } catch (e) {
        console.error('Callback error:', e)
        setError('Authentication failed')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <>
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={() => router.push('/login')}
              className="text-amber-500 hover:underline"
            >
              Back to Login
            </button>
          </>
        ) : (
          <>
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Signing you in...</p>
          </>
        )}
      </div>
    </div>
  )
}
