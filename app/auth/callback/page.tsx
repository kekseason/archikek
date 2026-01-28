'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const [status, setStatus] = useState('Signing you in...')

  useEffect(() => {
    const handleCallback = async () => {
      console.log('[CALLBACK] Starting...')
      console.log('[CALLBACK] Full URL:', window.location.href)
      console.log('[CALLBACK] Hash:', window.location.hash)
      console.log('[CALLBACK] Search:', window.location.search)
      
      // Wait a moment for Supabase to auto-process
      await new Promise(r => setTimeout(r, 1000))
      
      // Check session
      const { data: { session }, error } = await supabase.auth.getSession()
      
      console.log('[CALLBACK] Session:', session?.user?.email || 'none')
      console.log('[CALLBACK] Error:', error?.message || 'none')
      
      if (session) {
        setStatus('Success! Redirecting to editor...')
        // Hard redirect to /create
        setTimeout(() => {
          window.location.replace('/create')
        }, 500)
      } else {
        setStatus('Login failed. Please try again.')
        setTimeout(() => {
          window.location.replace('/')
        }, 2000)
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
