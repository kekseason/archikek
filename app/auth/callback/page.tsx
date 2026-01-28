'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState('Processing...')

  useEffect(() => {
    const handleCallback = async () => {
      console.log('[CALLBACK] Starting...')
      console.log('[CALLBACK] URL:', window.location.href)
      
      try {
        // Check for error in URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const urlParams = new URLSearchParams(window.location.search)
        
        const error = hashParams.get('error') || urlParams.get('error')
        if (error) {
          console.error('[CALLBACK] Error in URL:', error)
          setStatus('Error: ' + error)
          setTimeout(() => router.push('/login'), 2000)
          return
        }

        // Method 1: Check hash for tokens (implicit flow)
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        
        if (accessToken && refreshToken) {
          console.log('[CALLBACK] Found tokens in hash')
          setStatus('Setting session...')
          
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          })
          
          if (error) {
            console.error('[CALLBACK] setSession error:', error)
            setStatus('Error: ' + error.message)
            setTimeout(() => router.push('/login'), 2000)
            return
          }
          
          if (data.session) {
            console.log('[CALLBACK] Session set successfully:', data.session.user.email)
            setStatus('Success! Redirecting...')
            const returnUrl = localStorage.getItem('archikek_return_url') || '/create'
            localStorage.removeItem('archikek_return_url')
            router.push(returnUrl)
            return
          }
        }

        // Method 2: Check for code (PKCE flow)
        const code = urlParams.get('code')
        if (code) {
          console.log('[CALLBACK] Found code in URL')
          setStatus('Exchanging code...')
          
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)
          
          if (error) {
            console.error('[CALLBACK] exchangeCode error:', error)
            setStatus('Error: ' + error.message)
            setTimeout(() => router.push('/login'), 2000)
            return
          }
          
          if (data.session) {
            console.log('[CALLBACK] Session created:', data.session.user.email)
            setStatus('Success! Redirecting...')
            const returnUrl = localStorage.getItem('archikek_return_url') || '/create'
            localStorage.removeItem('archikek_return_url')
            router.push(returnUrl)
            return
          }
        }

        // Method 3: Check if session already exists
        console.log('[CALLBACK] Checking existing session...')
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          console.log('[CALLBACK] Existing session found:', session.user.email)
          setStatus('Success! Redirecting...')
          const returnUrl = localStorage.getItem('archikek_return_url') || '/create'
          localStorage.removeItem('archikek_return_url')
          router.push(returnUrl)
          return
        }

        // No session found
        console.log('[CALLBACK] No session found')
        setStatus('No session. Redirecting to login...')
        setTimeout(() => router.push('/login'), 1000)
        
      } catch (e) {
        console.error('[CALLBACK] Exception:', e)
        setStatus('Error occurred')
        setTimeout(() => router.push('/login'), 2000)
      }
    }

    // Small delay to ensure page is loaded
    setTimeout(handleCallback, 100)
  }, [router])

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">{status}</p>
      </div>
    </div>
  )
}
