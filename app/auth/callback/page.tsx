'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const [status, setStatus] = useState('Completing sign in...')

  useEffect(() => {
    const handleCallback = async () => {
      // Wait for Supabase to process the tokens from URL
      await new Promise(r => setTimeout(r, 500))
      
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        setStatus('Success! You can close this window.')
        
        // If opened as popup, close it
        if (window.opener) {
          setTimeout(() => window.close(), 1000)
        } else {
          // If not popup, redirect to create
          setTimeout(() => {
            window.location.href = '/create'
          }, 1000)
        }
      } else {
        setStatus('Login failed. Please try again.')
        setTimeout(() => {
          if (window.opener) {
            window.close()
          } else {
            window.location.href = '/'
          }
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
