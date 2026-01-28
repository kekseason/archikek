'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const [status, setStatus] = useState('Signing you in...')

  useEffect(() => {
    const handleCallback = async () => {
      console.log('[CALLBACK] URL:', window.location.href)
      
      try {
        // Check URL for tokens or code
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const urlParams = new URLSearchParams(window.location.search)
        
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        const code = urlParams.get('code')
        
        let session = null

        // Method 1: Set session from hash tokens
        if (accessToken && refreshToken) {
          console.log('[CALLBACK] Setting session from tokens...')
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          })
          if (data.session) {
            session = data.session
            console.log('[CALLBACK] Session set:', session.user.email)
          } else if (error) {
            console.error('[CALLBACK] setSession error:', error)
          }
        }
        
        // Method 2: Exchange code for session
        if (!session && code) {
          console.log('[CALLBACK] Exchanging code...')
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)
          if (data.session) {
            session = data.session
            console.log('[CALLBACK] Code exchanged:', session.user.email)
          } else if (error) {
            console.error('[CALLBACK] Exchange error:', error)
          }
        }
        
        // Method 3: Check existing session
        if (!session) {
          console.log('[CALLBACK] Checking existing session...')
          const { data } = await supabase.auth.getSession()
          session = data.session
        }

        if (session) {
          console.log('[CALLBACK] Success! Redirecting to /create')
          setStatus('Success! Redirecting...')
          window.location.href = '/create'
        } else {
          console.log('[CALLBACK] No session found')
          setStatus('Login failed. Redirecting...')
          setTimeout(() => { window.location.href = '/' }, 2000)
        }
      } catch (e) {
        console.error('[CALLBACK] Exception:', e)
        setStatus('Error occurred')
        setTimeout(() => { window.location.href = '/' }, 2000)
      }
    }

    handleCallback()
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">{status}</p>
      </div>
    </div>
  )
}
