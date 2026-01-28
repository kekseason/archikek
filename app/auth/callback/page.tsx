'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  useEffect(() => {
    // Supabase automatically handles the OAuth callback
    // Just wait a bit then redirect
    const timer = setTimeout(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        // Get saved return URL or default to /create
        const returnUrl = localStorage.getItem('archikek_return_url') || '/create'
        localStorage.removeItem('archikek_return_url')
        window.location.href = returnUrl
      } else {
        window.location.href = '/'
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Signing you in...</p>
      </div>
    </div>
  )
}
