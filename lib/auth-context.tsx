'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import { supabase, Profile } from './supabase'
import { User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  profile: Profile | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>
  signUpWithEmail: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (data && !error) {
        setProfile(data)
      }
    } catch (e) {
      console.error('Profile fetch error:', e)
    }
  }, [])

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }, [user, fetchProfile])

  // Initialize auth - wait for Supabase to be ready
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    let mounted = true
    
    const initAuth = async () => {
      try {
        // Small delay to ensure localStorage is accessible
        await new Promise(resolve => setTimeout(resolve, 50))
        
        // Get session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!mounted) return
        
        if (session?.user) {
          setUser(session.user)
          await fetchProfile(session.user.id)
        }
        
        setLoading(false)
        setInitialized(true)
      } catch (e) {
        console.error('Auth init error:', e)
        setLoading(false)
        setInitialized(true)
      }
    }
    
    initAuth()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return
        
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [fetchProfile])

  // Realtime subscription for profile changes
  useEffect(() => {
    if (!initialized || !user) return

    const channel = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`
        },
        (payload) => {
          if (payload.new) {
            setProfile(payload.new as Profile)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [initialized, user])

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    })
    return { error: error?.message ?? null }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (e) {}
    
    setUser(null)
    setProfile(null)
    
    // Clear all auth data
    localStorage.removeItem('archikek-auth')
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('sb-')) localStorage.removeItem(key)
    })
    
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
