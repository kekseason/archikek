// components/upsell-popup.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface UpsellPopupProps {
  isOpen: boolean
  onClose: () => void
  onContinueFree: () => void
  discount: { percent: number; name: string; code: string } | null
}

export default function UpsellPopup({ isOpen, onClose, onContinueFree, discount }: UpsellPopupProps) {
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  
  // Timer countdown
  useEffect(() => {
    if (!isOpen) return
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isOpen])
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  // Calculate prices
  const discountPercent = discount?.percent || 40
  const svgBasePrice = 8
  const proBasePrice = 19
  const svgPrice = Math.round(svgBasePrice * (1 - discountPercent / 100))
  const proPrice = Math.round(proBasePrice * (1 - discountPercent / 100))
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#222] rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10">
        {/* Glow effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="relative p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-4">
              <span className="text-amber-500 text-sm font-semibold">
                🎉 {discountPercent}% OFF {discount?.name ? `for ${discount.name}` : 'Special Offer'}
              </span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Upgrade for <span className="text-amber-500">Vector Quality</span>
            </h2>
            
            <p className="text-gray-400">
              You're downloading PNG. Get SVG/DXF for crisp exports at any scale.
            </p>
          </div>
          
          {/* Plans */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* Unlimited SVG Plan */}
            <div className="bg-[#111] border border-[#222] rounded-xl p-6 hover:border-amber-500/30 transition relative group">
              <h3 className="text-lg font-semibold text-white mb-1">Unlimited SVG</h3>
              <p className="text-gray-500 text-sm mb-4">Vector exports for design tools</p>
              
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-gray-500 line-through text-lg">${svgBasePrice}</span>
                <span className="text-3xl font-bold text-white">${svgPrice}</span>
                <span className="text-gray-500">/mo</span>
              </div>
              
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2 text-gray-300">
                  <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited SVG exports
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  DXF for AutoCAD
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Organized layers
                </li>
              </ul>
              
              <Link
                href={`/pricing?plan=unlimited&code=${discount?.code || ''}`}
                className="block w-full py-3 text-center bg-[#1a1a1a] hover:bg-[#222] text-white font-medium rounded-lg transition"
              >
                Get SVG Access
              </Link>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/30 rounded-xl p-6 relative">
              {/* Popular badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  BEST VALUE
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-1">Pro</h3>
              <p className="text-gray-500 text-sm mb-4">Everything including 3D models</p>
              
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-gray-500 line-through text-lg">${proBasePrice}</span>
                <span className="text-3xl font-bold text-amber-500">${proPrice}</span>
                <span className="text-gray-500">/mo</span>
              </div>
              
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2 text-gray-300">
                  <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Everything in Unlimited
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  3D Models (GLB, STL, 3DM, DAE)
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Rhino, SketchUp, Blender
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  3D printing ready (STL)
                </li>
              </ul>
              
              <Link
                href={`/pricing?plan=pro&code=${discount?.code || ''}`}
                className="block w-full py-3 text-center bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg transition"
              >
                Get Pro Access
              </Link>
            </div>
          </div>
          
          {/* Timer */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#222] rounded-lg">
              <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-400 text-sm">Offer expires in</span>
              <span className="text-amber-500 font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          {/* Continue free */}
          <button
            onClick={onContinueFree}
            className="w-full text-center text-gray-500 hover:text-gray-300 text-sm transition py-2"
          >
            No thanks, continue with free PNG →
          </button>
        </div>
      </div>
    </div>
  )
}
