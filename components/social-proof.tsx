// components/social-proof.tsx
'use client'

import { useEffect, useState } from 'react'

interface SocialProofProps {
  variant?: 'default' | 'compact' | 'hero'
  className?: string
}

export default function SocialProof({ variant = 'default', className = '' }: SocialProofProps) {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats')
        const data = await res.json()
        if (data.success) {
          setCount(data.maps_created)
        }
      } catch (error) {
        // Fallback
        setCount(7500)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Sayıyı formatla (7500 -> 7,500)
  const formattedCount = count?.toLocaleString('en-US') || '---'

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 text-sm ${className}`}>
        <div className="flex -space-x-2">
          {['🇺🇸', '🇩🇪', '🇯🇵', '🇧🇷'].map((flag, i) => (
            <div 
              key={i} 
              className="w-6 h-6 rounded-full bg-[#1a1a1a] border-2 border-[#0a0a0a] flex items-center justify-center text-xs"
            >
              {flag}
            </div>
          ))}
        </div>
        <span className="text-gray-400">
          <span className="text-white font-semibold">{formattedCount}</span> maps created
        </span>
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <div className={`inline-flex items-center gap-3 bg-[#111] border border-[#222] rounded-full px-4 py-2 ${className}`}>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-500 text-xs font-medium">LIVE</span>
        </div>
        <div className="w-px h-4 bg-[#333]" />
        <span className="text-gray-400 text-sm">
          <span className="text-white font-bold">{formattedCount}</span> maps created worldwide
        </span>
      </div>
    )
  }

  // Default variant
  return (
    <div className={`flex items-center justify-center gap-6 ${className}`}>
      <div className="text-center">
        <div className="text-3xl font-bold text-white">{formattedCount}</div>
        <div className="text-sm text-gray-500">Maps Created</div>
      </div>
      <div className="w-px h-10 bg-[#222]" />
      <div className="text-center">
        <div className="text-3xl font-bold text-white">170+</div>
        <div className="text-sm text-gray-500">Countries</div>
      </div>
      <div className="w-px h-10 bg-[#222]" />
      <div className="text-center">
        <div className="text-3xl font-bold text-white">34</div>
        <div className="text-sm text-gray-500">Themes</div>
      </div>
    </div>
  )
}
