'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { trackViewContent } from '@/lib/tiktok'

// ============================================================
// PROPS
// ============================================================

interface CreateClientProps {
  discount: { percent: number; name: string; code: string } | null
  country: string
}

// ============================================================
// ANALYSIS THEMES (12 TEMA)
// ============================================================

const ANALYSIS_THEMES = [
  // ============ CLASSIC ============
  {
    id: 'figure_ground',
    name: 'Figure Ground',
    description: 'Classic black buildings on white',
    category: 'Classic',
    colors: {
      Zemin: '#ffffff', Binalar: '#1a1a1a', Bina_Stroke: '#1a1a1a', Su: '#7eb8da', Yesil: '#8fc08f',
      Yol_Otoyol: '#1a1a1a', Yol_Birincil: '#888888', Yol_Ikincil: '#aaaaaa', Yol_Konut: '#c0c0c0',
      Yol_Yaya: '#b0b0b0', Yol_Bisiklet: '#909090', Metro: '#e63946', Tram: '#2a9d8f', Bus: '#e9c46a', Ferry: '#264653', Metin: '#333333'
    }
  },
  {
    id: 'nolli',
    name: 'Nolli Map',
    description: 'White buildings on black',
    category: 'Classic',
    colors: {
      Zemin: '#0a0a0a', Binalar: '#ffffff', Bina_Stroke: '#ffffff', Su: '#2a5a9f', Yesil: '#2a6a2a',
      Yol_Otoyol: '#ff5555', Yol_Birincil: '#666666', Yol_Ikincil: '#555555', Yol_Konut: '#444444',
      Yol_Yaya: '#777777', Yol_Bisiklet: '#4ecdc4', Metro: '#ff5555', Tram: '#4ecdc4', Bus: '#ffe66d', Ferry: '#95e1d3', Metin: '#ffffff'
    }
  },
  {
    id: 'schwarzplan',
    name: 'Schwarzplan',
    description: 'German-style site plan',
    category: 'Classic',
    colors: {
      Zemin: '#ffffff', Binalar: '#000000', Bina_Stroke: '#000000', Su: '#6699cc', Yesil: '#66aa66',
      Yol_Otoyol: '#000000', Yol_Birincil: '#777777', Yol_Ikincil: '#999999', Yol_Konut: '#bbbbbb',
      Yol_Yaya: '#888888', Yol_Bisiklet: '#555555', Metro: '#cc0000', Tram: '#0066cc', Bus: '#cc9900', Ferry: '#006666', Metin: '#000000'
    }
  },
  // ============ MINIMAL ============
  {
    id: 'minimal_light',
    name: 'Minimal Light',
    description: 'Clean white aesthetic',
    category: 'Minimal',
    colors: {
      Zemin: '#fafafa', Binalar: '#808080', Bina_Stroke: '#606060', Su: '#5c9fd4', Yesil: '#6ab06a',
      Yol_Otoyol: '#505050', Yol_Birincil: '#707070', Yol_Ikincil: '#909090', Yol_Konut: '#b0b0b0',
      Yol_Yaya: '#a0a0a0', Yol_Bisiklet: '#5a9a5a', Metro: '#666666', Tram: '#666666', Bus: '#666666', Ferry: '#666666', Metin: '#333333'
    }
  },
  {
    id: 'minimal_dark',
    name: 'Minimal Dark',
    description: 'Sleek dark aesthetic',
    category: 'Minimal',
    colors: {
      Zemin: '#121212', Binalar: '#505050', Bina_Stroke: '#606060', Su: '#2a5a9a', Yesil: '#2a6a2a',
      Yol_Otoyol: '#808080', Yol_Birincil: '#606060', Yol_Ikincil: '#505050', Yol_Konut: '#404040',
      Yol_Yaya: '#505050', Yol_Bisiklet: '#407040', Metro: '#888888', Tram: '#888888', Bus: '#888888', Ferry: '#888888', Metin: '#c0c0c0'
    }
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    description: 'Single color grayscale',
    category: 'Minimal',
    colors: {
      Zemin: '#f8f8f8', Binalar: '#505050', Bina_Stroke: '#404040', Su: '#7090b0', Yesil: '#70a070',
      Yol_Otoyol: '#303030', Yol_Birincil: '#606060', Yol_Ikincil: '#808080', Yol_Konut: '#a0a0a0',
      Yol_Yaya: '#909090', Yol_Bisiklet: '#707070', Metro: '#404040', Tram: '#505050', Bus: '#606060', Ferry: '#404040', Metin: '#303030'
    }
  },
  // ============ ANALYSIS ============
  {
    id: 'street_hierarchy',
    name: 'Street Hierarchy',
    description: 'Road network analysis',
    category: 'Analysis',
    colors: {
      Zemin: '#1a1a2e', Binalar: '#4a4a6a', Bina_Stroke: '#5a5a7a', Su: '#3a6aaf', Yesil: '#3a6a4a',
      Yol_Otoyol: '#ff0000', Yol_Birincil: '#ff6600', Yol_Ikincil: '#ffcc00', Yol_Konut: '#88cc88',
      Yol_Yaya: '#66aaff', Yol_Bisiklet: '#ff66ff', Metro: '#ff0000', Tram: '#00ccff', Bus: '#ffcc00', Ferry: '#00ffcc', Metin: '#ffffff'
    }
  },
  {
    id: 'transit',
    name: 'Transit Network',
    description: 'Public transportation focus',
    category: 'Analysis',
    colors: {
      Zemin: '#0f0f1a', Binalar: '#4a4a6e', Bina_Stroke: '#5a5a7e', Su: '#3a6aaf', Yesil: '#3a6e3a',
      Yol_Otoyol: '#5a5a7a', Yol_Birincil: '#4a4a6a', Yol_Ikincil: '#3a3a5a', Yol_Konut: '#2a2a4a',
      Yol_Yaya: '#4a4a6a', Yol_Bisiklet: '#00ff88', Metro: '#ff0055', Tram: '#00ccff', Bus: '#ffcc00', Ferry: '#00ffcc', Metin: '#ffffff'
    }
  },
  {
    id: 'pedestrian',
    name: 'Pedestrian Flow',
    description: 'Walkability analysis',
    category: 'Analysis',
    colors: {
      Zemin: '#1a1a1a', Binalar: '#555555', Bina_Stroke: '#666666', Su: '#3a6a9f', Yesil: '#3a6a3a',
      Yol_Otoyol: '#606060', Yol_Birincil: '#707070', Yol_Ikincil: '#808080', Yol_Konut: '#909090',
      Yol_Yaya: '#ff9800', Yol_Bisiklet: '#8bc34a', Metro: '#f44336', Tram: '#2196f3', Bus: '#ffeb3b', Ferry: '#00bcd4', Metin: '#ffffff'
    }
  },
  {
    id: 'density',
    name: 'Density Study',
    description: 'Building mass analysis',
    category: 'Analysis',
    colors: {
      Zemin: '#fafafa', Binalar: '#c62828', Bina_Stroke: '#b71c1c', Su: '#5090d0', Yesil: '#60a060',
      Yol_Otoyol: '#1a1a1a', Yol_Birincil: '#808080', Yol_Ikincil: '#a0a0a0', Yol_Konut: '#b8b8b8',
      Yol_Yaya: '#909090', Yol_Bisiklet: '#4caf50', Metro: '#1a1a1a', Tram: '#c62828', Bus: '#e9724c', Ferry: '#255f85', Metin: '#333333'
    }
  },
  // ============ ENVIRONMENT ============
  {
    id: 'green_space',
    name: 'Green Space',
    description: 'Parks and vegetation',
    category: 'Environment',
    colors: {
      Zemin: '#f5f9f5', Binalar: '#707070', Bina_Stroke: '#505050', Su: '#2196f3', Yesil: '#2e7d32',
      Yol_Otoyol: '#505050', Yol_Birincil: '#707070', Yol_Ikincil: '#909090', Yol_Konut: '#b0b0b0',
      Yol_Yaya: '#4caf50', Yol_Bisiklet: '#388e3c', Metro: '#505050', Tram: '#505050', Bus: '#505050', Ferry: '#1565c0', Metin: '#333333'
    }
  },
  {
    id: 'blue_green',
    name: 'Blue-Green',
    description: 'Water and green corridors',
    category: 'Environment',
    colors: {
      Zemin: '#eceff1', Binalar: '#546e7a', Bina_Stroke: '#455a64', Su: '#1565c0', Yesil: '#2e7d32',
      Yol_Otoyol: '#37474f', Yol_Birincil: '#546e7a', Yol_Ikincil: '#607d8b', Yol_Konut: '#78909c',
      Yol_Yaya: '#43a047', Yol_Bisiklet: '#2e7d32', Metro: '#37474f', Tram: '#1565c0', Bus: '#e65100', Ferry: '#0277bd', Metin: '#263238'
    }
  },
  {
    id: 'topographic',
    name: 'Topographic',
    description: 'Elevation contours',
    category: 'Environment',
    colors: {
      Zemin: '#faf8f5', Binalar: '#5d4037', Bina_Stroke: '#4e342e', Su: '#1565c0', Yesil: '#2e7d32',
      Yol_Otoyol: '#c62828', Yol_Birincil: '#e65100', Yol_Ikincil: '#f9a825', Yol_Konut: '#9e9e9e',
      Yol_Yaya: '#757575', Yol_Bisiklet: '#1b5e20', Metro: '#b71c1c', Tram: '#0d47a1', Bus: '#e65100', Ferry: '#01579b', Metin: '#3e2723'
    }
  },
  // ============ AESTHETIC ============
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Deep blue night style',
    category: 'Aesthetic',
    colors: {
      Zemin: '#0d1b2a', Binalar: '#4a5a6a', Bina_Stroke: '#5a6a7a', Su: '#2a4a7a', Yesil: '#2a5a3a',
      Yol_Otoyol: '#8899aa', Yol_Birincil: '#6a7a8a', Yol_Ikincil: '#5a6a7a', Yol_Konut: '#4a5a6a',
      Yol_Yaya: '#5a6a7a', Yol_Bisiklet: '#27ae60', Metro: '#e74c3c', Tram: '#3498db', Bus: '#f39c12', Ferry: '#1abc9c', Metin: '#e0e1dd'
    }
  },
  {
    id: 'sepia',
    name: 'Sepia',
    description: 'Vintage warm tone',
    category: 'Aesthetic',
    colors: {
      Zemin: '#f5f0e6', Binalar: '#5d4037', Bina_Stroke: '#4e342e', Su: '#8d6e63', Yesil: '#6d4c41',
      Yol_Otoyol: '#3e2723', Yol_Birincil: '#5d4037', Yol_Ikincil: '#6d4c41', Yol_Konut: '#8d6e63',
      Yol_Yaya: '#a1887f', Yol_Bisiklet: '#5d4037', Metro: '#4e342e', Tram: '#3e2723', Bus: '#6d4c41', Ferry: '#4e342e', Metin: '#3e2723'
    }
  },
  {
    id: 'neon',
    name: 'Neon City',
    description: 'Cyberpunk neon glow',
    category: 'Aesthetic',
    colors: {
      Zemin: '#0a0a0f', Binalar: '#3a3a5a', Bina_Stroke: '#4a4a6a', Su: '#0044aa', Yesil: '#006600',
      Yol_Otoyol: '#ff00ff', Yol_Birincil: '#00ffff', Yol_Ikincil: '#ff00aa', Yol_Konut: '#7700ff',
      Yol_Yaya: '#00ff88', Yol_Bisiklet: '#ffff00', Metro: '#ff0055', Tram: '#00ffff', Bus: '#ffff00', Ferry: '#00ff88', Metin: '#ffffff'
    }
  },
  {
    id: 'sunset',
    name: 'Warm Sunset',
    description: 'Warm orange tones',
    category: 'Aesthetic',
    colors: {
      Zemin: '#fff8e7', Binalar: '#d84315', Bina_Stroke: '#bf360c', Su: '#e57350', Yesil: '#d84315',
      Yol_Otoyol: '#bf360c', Yol_Birincil: '#d84315', Yol_Ikincil: '#e65100', Yol_Konut: '#ff8a65',
      Yol_Yaya: '#ffab91', Yol_Bisiklet: '#bf360c', Metro: '#b71c1c', Tram: '#bf360c', Bus: '#e65100', Ferry: '#d84315', Metin: '#4e342e'
    }
  },
  {
    id: 'arctic',
    name: 'Arctic',
    description: 'Cool icy blue tones',
    category: 'Aesthetic',
    colors: {
      Zemin: '#e3f2fd', Binalar: '#1565c0', Bina_Stroke: '#0d47a1', Su: '#1976d2', Yesil: '#43a047',
      Yol_Otoyol: '#0d47a1', Yol_Birincil: '#1565c0', Yol_Ikincil: '#1976d2', Yol_Konut: '#42a5f5',
      Yol_Yaya: '#64b5f6', Yol_Bisiklet: '#2e7d32', Metro: '#0d47a1', Tram: '#1565c0', Bus: '#1976d2', Ferry: '#01579b', Metin: '#0d47a1'
    }
  },
  {
    id: 'gold',
    name: 'Gold Edition',
    description: 'Luxury black and gold',
    category: 'Aesthetic',
    colors: {
      Zemin: '#0a0a0a', Binalar: '#3a3a30', Bina_Stroke: '#d4af37', Su: '#2a2a4a', Yesil: '#2a3a2a',
      Yol_Otoyol: '#d4af37', Yol_Birincil: '#b8960c', Yol_Ikincil: '#8b7355', Yol_Konut: '#5a5a4a',
      Yol_Yaya: '#6b6b5a', Yol_Bisiklet: '#9a8a4a', Metro: '#d4af37', Tram: '#c9a227', Bus: '#b8960c', Ferry: '#d4af37', Metin: '#d4af37'
    }
  },
  {
    id: 'pastel',
    name: 'Pastel',
    description: 'Soft pastel colors',
    category: 'Aesthetic',
    colors: {
      Zemin: '#fef6f9', Binalar: '#d47fa1', Bina_Stroke: '#c46a91', Su: '#42a5f5', Yesil: '#66bb6a',
      Yol_Otoyol: '#ab47bc', Yol_Birincil: '#7e57c2', Yol_Ikincil: '#42a5f5', Yol_Konut: '#26c6da',
      Yol_Yaya: '#66bb6a', Yol_Bisiklet: '#43a047', Metro: '#ec407a', Tram: '#26a69a', Bus: '#ffca28', Ferry: '#26c6da', Metin: '#4e342e'
    }
  },
  // ============ PROFESSIONAL ============
  {
    id: 'blueprint',
    name: 'Blueprint',
    description: 'Technical drawing style',
    category: 'Professional',
    colors: {
      Zemin: '#0a2342', Binalar: '#ffffff', Bina_Stroke: '#ffffff', Su: '#2a5a8a', Yesil: '#2a6a7a',
      Yol_Otoyol: '#ffffff', Yol_Birincil: '#8ab4d4', Yol_Ikincil: '#6a94b4', Yol_Konut: '#4a7494',
      Yol_Yaya: '#7aa4c4', Yol_Bisiklet: '#7ec8ac', Metro: '#ff6b6b', Tram: '#4ecdc4', Bus: '#ffe66d', Ferry: '#f8b500', Metin: '#ffffff'
    }
  },
  {
    id: 'presentation',
    name: 'Presentation',
    description: 'Clean professional style',
    category: 'Professional',
    colors: {
      Zemin: '#ffffff', Binalar: '#37474f', Bina_Stroke: '#263238', Su: '#1976d2', Yesil: '#43a047',
      Yol_Otoyol: '#e53935', Yol_Birincil: '#546e7a', Yol_Ikincil: '#607d8b', Yol_Konut: '#78909c',
      Yol_Yaya: '#90a4ae', Yol_Bisiklet: '#388e3c', Metro: '#d32f2f', Tram: '#1565c0', Bus: '#f57c00', Ferry: '#0097a7', Metin: '#263238'
    }
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'High contrast B&W',
    category: 'Professional',
    colors: {
      Zemin: '#ffffff', Binalar: '#212121', Bina_Stroke: '#000000', Su: '#5090d0', Yesil: '#60a060',
      Yol_Otoyol: '#000000', Yol_Birincil: '#424242', Yol_Ikincil: '#616161', Yol_Konut: '#9e9e9e',
      Yol_Yaya: '#757575', Yol_Bisiklet: '#616161', Metro: '#000000', Tram: '#424242', Bus: '#616161', Ferry: '#424242', Metin: '#000000'
    }
  },
  {
    id: 'cad',
    name: 'CAD Style',
    description: 'AutoCAD-like appearance',
    category: 'Professional',
    colors: {
      Zemin: '#000000', Binalar: '#00ff00', Bina_Stroke: '#00ff00', Su: '#0066ff', Yesil: '#00cc00',
      Yol_Otoyol: '#ffffff', Yol_Birincil: '#ffff00', Yol_Ikincil: '#ff00ff', Yol_Konut: '#00ffff',
      Yol_Yaya: '#ff8800', Yol_Bisiklet: '#88ff00', Metro: '#ff0000', Tram: '#00ffff', Bus: '#ffff00', Ferry: '#0088ff', Metin: '#ffffff'
    }
  },
]

const THEME_CATEGORIES = ['Classic', 'Minimal', 'Analysis', 'Environment', 'Aesthetic', 'Professional']

// --- ICONS ---
const ArrowLeftIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
const DownloadIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
const SearchIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
const SquareIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
const PointerIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
const TrashIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
const ChevronDownIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
const PaletteIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="19" cy="11.5" r="2.5"/><circle cx="17" cy="18.5" r="2.5"/><circle cx="8.5" cy="16.5" r="2.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.7-.1 2.5-.3"/></svg>
const SlidersIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg>
const LoaderIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>

type SelectionMode = 'point' | 'rectangle'
type SelectionData = {
  mode: SelectionMode
  center?: { lat: number; lng: number }
  bounds?: { north: number; south: number; east: number; west: number }
  size?: number
}

export default function CreateClient({ discount, country }: CreateClientProps) {
  const { user, profile, loading: authLoading, signOut, refreshProfile, signInWithGoogle } = useAuth()
  const router = useRouter()
  
  // Calculate discounted prices
  const baseCreditsPrice = 14.99
  const baseProPrice = 18.99
  const creditsPrice = discount ? (baseCreditsPrice * (1 - discount.percent / 100)).toFixed(0) : baseCreditsPrice.toFixed(0)
  const proPrice = discount ? (baseProPrice * (1 - discount.percent / 100)).toFixed(0) : baseProPrice.toFixed(0)
  
  const [location, setLocation] = useState('')
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('point')
  const [selection, setSelection] = useState<SelectionData | null>(null)
  const [size, setSize] = useState(500)
  const [selectedTheme, setSelectedTheme] = useState(ANALYSIS_THEMES[0])
  
  // Custom settings
  const [customColors, setCustomColors] = useState(ANALYSIS_THEMES[0].colors)
  const [useCustomColors, setUseCustomColors] = useState(false)
  const [strokeWidths, setStrokeWidths] = useState({
    highway: 6.0, primary: 4.0, secondary: 3.0, residential: 2.0, pedestrian: 1.2, building: 0.5
  })
  const [showTransit, setShowTransit] = useState(true)
  const [showScale, setShowScale] = useState(true)
  const [transparent, setTransparent] = useState(false)
  const [showShadow, setShowShadow] = useState(true)
  const [showContours, setShowContours] = useState(false)
  const [contourInterval, setContourInterval] = useState(5)
  const [showLabels, setShowLabels] = useState(true)
  const [showFrame, setShowFrame] = useState(false)
  const [locationName, setLocationName] = useState('')
  const [exportFormat, setExportFormat] = useState<'svg' | 'dxf'>('svg')
  const [resolution, setResolution] = useState(1200)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [showLightbox, setShowLightbox] = useState(false)
  const [showTutorial, setShowTutorial] = useState(true)
  const [tutorialStep, setTutorialStep] = useState(1)
  
  // UI State
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [error, setError] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showColorPanel, setShowColorPanel] = useState(false)
  const [showStrokePanel, setShowStrokePanel] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Urban Form')
  
  // Map refs
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  
  // Drawing state refs
  const isDrawingRef = useRef(false)
  const drawStartRef = useRef<{lng: number, lat: number} | null>(null)

  // Track TikTok ViewContent event
  useEffect(() => {
    trackViewContent('Map Creator')
  }, [])

  // Auto-progress tutorial when user selects location
  useEffect(() => {
    if (selection && showTutorial) {
      setTutorialStep(3) // Jump to "Preview" step
    }
  }, [selection])

  // Hide tutorial when preview is generated
  useEffect(() => {
    if (previewUrl) {
      setShowTutorial(false)
    }
  }, [previewUrl])

  // Check if user has seen tutorial before
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('archikek_tutorial_seen')
    if (hasSeenTutorial) {
      setShowTutorial(false)
    }
  }, [])

  // Save tutorial completion
  const dismissTutorial = () => {
    setShowTutorial(false)
    localStorage.setItem('archikek_tutorial_seen', 'true')
  }

  // Restore selection from localStorage after login
  useEffect(() => {
    const savedState = localStorage.getItem('archikek_pending_map')
    if (savedState && user) {
      try {
        const state = JSON.parse(savedState)
        if (state.selection) setSelection(state.selection)
        if (state.size) setSize(state.size)
        if (state.theme) {
          const theme = ANALYSIS_THEMES.find(t => t.id === state.theme)
          if (theme) setSelectedTheme(theme)
        }
        if (state.locationName) setLocationName(state.locationName)
        if (state.showTransit !== undefined) setShowTransit(state.showTransit)
        if (state.showContours !== undefined) setShowContours(state.showContours)
        if (state.showFrame !== undefined) setShowFrame(state.showFrame)
        if (state.exportFormat) setExportFormat(state.exportFormat)
        
        // Clear saved state after restoring
        localStorage.removeItem('archikek_pending_map')
        
        // Auto-trigger preview after restore
        setTimeout(() => {
          if (state.selection?.center) {
            setPreviewLoading(true)
          }
        }, 500)
      } catch (e) {
        console.error('Failed to restore map state:', e)
        localStorage.removeItem('archikek_pending_map')
      }
    }
  }, [user])

  // Sync colors with theme
  useEffect(() => {
    if (!useCustomColors) setCustomColors(selectedTheme.colors)
  }, [selectedTheme, useCustomColors])

  // Auto-refresh preview ONLY when theme changes (not other settings)
  useEffect(() => {
    // Only auto-refresh if preview already exists and we have a selection
    if (!previewUrl || !selection || !selection.center) return
    
    const timeoutId = setTimeout(async () => {
      setPreviewLoading(true)
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://web-production-64f4.up.railway.app'
        const colors = useCustomColors ? customColors : selectedTheme.colors

        // Full quality with /generate
        const requestBody = {
          theme: selectedTheme.id,
          format: 'svg',
          resolution: 800,
          show_transit: showTransit,
          show_scale: showScale,
          show_contours: showContours,
          show_labels: showLabels,
          show_frame: showFrame,
          location_name: locationName,
          contour_interval: contourInterval,
          transparent: transparent,
          shadow: showShadow,
          custom_colors: colors,
          stroke_highway: strokeWidths.highway,
          stroke_primary: strokeWidths.primary,
          stroke_secondary: strokeWidths.secondary,
          stroke_residential: strokeWidths.residential,
          stroke_pedestrian: strokeWidths.pedestrian,
          stroke_building: strokeWidths.building,
          lat: selection.center?.lat || 0,
          lng: selection.center?.lng || 0,
          size: selection.size || size
        }

        const response = await fetch(`${API_URL}/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        })

        if (response.ok) {
          if (previewUrl) window.URL.revokeObjectURL(previewUrl)
          const blob = await response.blob()
          const url = window.URL.createObjectURL(blob)
          setPreviewUrl(url)
        }
      } catch (err) {
        console.error('Auto-preview error:', err)
      }
      setPreviewLoading(false)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [selectedTheme.id]) // ONLY theme change triggers auto-preview

  // =========================================
  // MAP INITIALIZATION (Native Mapbox - NO Draw plugin)
  // =========================================
  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return

    const initMap = async () => {
      const mapboxgl = (await import('mapbox-gl')).default
      
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

      const map = new mapboxgl.Map({
        container: mapRef.current!,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [28.9784, 41.0082],
        zoom: 12,
        attributionControl: false
      })

      map.on('load', () => {
        map.addControl(new mapboxgl.NavigationControl(), 'top-right')
        
        // Add rectangle source/layer for drawing
        map.addSource('draw-rectangle', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] }
        })
        
        map.addLayer({
          id: 'draw-rectangle-fill',
          type: 'fill',
          source: 'draw-rectangle',
          paint: {
            'fill-color': '#f59e0b',
            'fill-opacity': 0.15
          }
        })
        
        map.addLayer({
          id: 'draw-rectangle-line',
          type: 'line',
          source: 'draw-rectangle',
          paint: {
            'line-color': '#f59e0b',
            'line-width': 2,
            'line-dasharray': [2, 2]
          }
        })
        
        mapInstanceRef.current = map
      })

      // --- MOUSE EVENTS FOR DRAWING ---
      map.on('mousedown', (e) => {
        if (selectionMode !== 'rectangle') return
        
        isDrawingRef.current = true
        drawStartRef.current = { lng: e.lngLat.lng, lat: e.lngLat.lat }
        map.dragPan.disable()
        
        // Clear old marker if exists
        if (markerRef.current) {
          markerRef.current.remove()
          markerRef.current = null
        }
      })

      map.on('mousemove', (e) => {
        if (!isDrawingRef.current || !drawStartRef.current) return
        
        const start = drawStartRef.current
        const end = { lng: e.lngLat.lng, lat: e.lngLat.lat }
        
        const bounds = {
          west: Math.min(start.lng, end.lng),
          east: Math.max(start.lng, end.lng),
          south: Math.min(start.lat, end.lat),
          north: Math.max(start.lat, end.lat)
        }
        
        const geojson = {
          type: 'FeatureCollection' as const,
          features: [{
            type: 'Feature' as const,
            properties: {},
            geometry: {
              type: 'Polygon' as const,
              coordinates: [[
                [bounds.west, bounds.south],
                [bounds.east, bounds.south],
                [bounds.east, bounds.north],
                [bounds.west, bounds.north],
                [bounds.west, bounds.south]
              ]]
            }
          }]
        }
        
        const source = map.getSource('draw-rectangle') as any
        if (source) source.setData(geojson)
      })

      map.on('mouseup', (e) => {
        if (!isDrawingRef.current || !drawStartRef.current) return
        
        map.dragPan.enable()
        isDrawingRef.current = false
        
        const start = drawStartRef.current
        const end = { lng: e.lngLat.lng, lat: e.lngLat.lat }
        
        const bounds = {
          west: Math.min(start.lng, end.lng),
          east: Math.max(start.lng, end.lng),
          south: Math.min(start.lat, end.lat),
          north: Math.max(start.lat, end.lat)
        }
        
        const centerLng = (bounds.west + bounds.east) / 2
        const centerLat = (bounds.south + bounds.north) / 2
        const latMeters = (bounds.north - bounds.south) * 111000
        const lngMeters = (bounds.east - bounds.west) * 111000 * Math.cos(centerLat * Math.PI / 180)
        const avgSize = Math.round((latMeters + lngMeters) / 2)
        
        if (avgSize > 50) {
          setSelection({
            mode: 'rectangle',
            center: { lat: centerLat, lng: centerLng },
            bounds,
            size: avgSize
          })
          
          const areaKm = (latMeters * lngMeters) / 1000000
          setLocation(`${latMeters.toFixed(0)}m × ${lngMeters.toFixed(0)}m (${areaKm.toFixed(2)} km²)`)
        }
        
        drawStartRef.current = null
      })

      // --- CLICK EVENT (Point Mode) ---
      map.on('click', (e) => {
        if (selectionMode !== 'point') return
        
        const { lng, lat } = e.lngLat
        
        // Clear rectangle if exists
        const source = map.getSource('draw-rectangle') as any
        if (source) source.setData({ type: 'FeatureCollection', features: [] })
        
        setSelection({ mode: 'point', center: { lat, lng }, size: size })
        setLocation(`${lat.toFixed(6)}, ${lng.toFixed(6)}`)
        
        // Add/update marker
        if (markerRef.current) {
          markerRef.current.setLngLat([lng, lat])
        } else {
          const el = document.createElement('div')
          el.innerHTML = `<div style="width:28px;height:28px;background:#f59e0b;border:3px solid white;border-radius:50%;box-shadow:0 2px 10px rgba(0,0,0,0.3);cursor:pointer;"></div>`
          markerRef.current = new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map)
        }
      })
    }

    initMap()
    
    return () => {
      if (mapInstanceRef.current) mapInstanceRef.current.remove()
    }
  }, [])

  // Update selection mode behavior
  useEffect(() => {
    if (!mapInstanceRef.current) return
    
    const map = mapInstanceRef.current
    
    if (selectionMode === 'rectangle') {
      map.getCanvas().style.cursor = 'crosshair'
    } else {
      map.getCanvas().style.cursor = ''
    }
  }, [selectionMode])

  // Update size when slider changes (point mode only)
  useEffect(() => {
    if (selection?.mode === 'point') {
      setSelection(prev => prev ? { ...prev, size } : null)
    }
  }, [size])

  const clearSelection = useCallback(() => {
    if (mapInstanceRef.current) {
      const source = mapInstanceRef.current.getSource('draw-rectangle') as any
      if (source) source.setData({ type: 'FeatureCollection', features: [] })
    }
    if (markerRef.current) {
      markerRef.current.remove()
      markerRef.current = null
    }
    setSelection(null)
    setLocation('')
  }, [])

  const searchLocation = async () => {
    if (!location.trim()) return
    try {
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${token}`)
      const data = await response.json()
      if (data.features?.length > 0) {
        setSearchResults(data.features)
        setShowResults(true)
      }
    } catch (err) {
      console.error('Search error:', err)
    }
  }

  const selectResult = (result: any) => {
    const [lng, lat] = result.center
    setShowResults(false)
    setLocation(result.place_name)
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({ center: [lng, lat], zoom: 14 })
    }
  }

  const generateMap = async () => {
    if (!selection) {
      setError('Please select an area on the map')
      return
    }

    // Check if user is logged in
    if (!user) {
      setShowLoginModal(true)
      return
    }

    // Check credits (unless pro)
    const isPro = profile?.is_pro && (!profile?.pro_expires_at || new Date(profile.pro_expires_at) > new Date())
    
    if (!isPro && (!profile?.credits || profile.credits <= 0)) {
      setError('No credits remaining. Please purchase more credits.')
      return
    }
    
    setGenerating(true)
    setError('')
    
    try {
      // Use credit first
      const creditResponse = await fetch('/api/use-credit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          theme: selectedTheme.id,
          location: location,
          size: selection.size || size
        })
      })

      const creditData = await creditResponse.json()

      if (!creditResponse.ok) {
        setError(creditData.error || 'Failed to use credit')
        setGenerating(false)
        return
      }

      // Generate the map
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://web-production-64f4.up.railway.app'
      const colors = useCustomColors ? customColors : selectedTheme.colors
      
      const requestBody: any = {
        theme: selectedTheme.id,
        format: exportFormat,
        resolution: resolution,
        show_transit: showTransit,
        show_scale: showScale,
        show_contours: showContours,
        show_labels: showLabels,
        show_frame: showFrame,
        location_name: locationName,
        contour_interval: contourInterval,
        transparent: transparent,
        shadow: showShadow,
        custom_colors: colors,
        stroke_highway: strokeWidths.highway,
        stroke_primary: strokeWidths.primary,
        stroke_secondary: strokeWidths.secondary,
        stroke_residential: strokeWidths.residential,
        stroke_pedestrian: strokeWidths.pedestrian,
        stroke_building: strokeWidths.building,
        lat: selection.center!.lat,
        lng: selection.center!.lng,
        size: selection.size || size
      }
      
      const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })
      
      if (!response.ok) {
        const errorData = await response.text()
        console.error('API Error:', response.status, errorData)
        throw new Error(errorData || 'API error')
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      // Download the file
      const a = document.createElement('a')
      a.href = url
      a.download = `archikek_${selectedTheme.id}_${requestBody.size}m.${exportFormat}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
      // Refresh profile to get updated credits
      await refreshProfile()
      
      setGenerated(true)
    } catch (err: any) {
      console.error('Generate error:', err)
      setError(err.message || 'Failed to generate map. Please try again.')
    }
    
    setGenerating(false)
  }

  // Preview function - no credit, low resolution
  const previewMap = async () => {
    if (!selection) {
      setError('Please select a location first')
      return
    }

    setPreviewLoading(true)
    setError('')
    setPreviewUrl(null)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://web-production-64f4.up.railway.app'
      const colors = useCustomColors ? customColors : selectedTheme.colors

      // Full quality preview with /generate
      const requestBody = {
        theme: selectedTheme.id,
        format: 'svg',
        resolution: 800,
        show_transit: showTransit,
        show_scale: showScale,
        show_contours: showContours,
        show_labels: showLabels,
        show_frame: showFrame,
        location_name: locationName,
        contour_interval: contourInterval,
        transparent: transparent,
        shadow: showShadow,
        custom_colors: colors,
        stroke_highway: strokeWidths.highway,
        stroke_primary: strokeWidths.primary,
        stroke_secondary: strokeWidths.secondary,
        stroke_residential: strokeWidths.residential,
        stroke_pedestrian: strokeWidths.pedestrian,
        stroke_building: strokeWidths.building,
        lat: selection.center!.lat,
        lng: selection.center!.lng,
        size: selection.size || size
      }

      const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Preview error:', response.status, errorText)
        throw new Error(errorText || 'Preview failed')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      setPreviewUrl(url)
    } catch (err: any) {
      console.error('Preview catch:', err)
      if (err.message === 'Failed to fetch') {
        setError('Cannot connect to server. Please check your internet connection.')
      } else {
        setError(err.message || 'Preview failed. Try again.')
      }
    }

    setPreviewLoading(false)
  }

  const updateColor = (key: string, value: string) => {
    setUseCustomColors(true)
    setCustomColors((prev: any) => ({ ...prev, [key]: value }))
  }

  // Show loading screen while auth is initializing
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Mapbox CSS */}
      <link href="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css" rel="stylesheet" />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#1a1a1a]">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
            <ArrowLeftIcon />
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="ArchiKEK" width={28} height={28} className="rounded-md" />
              <span className="font-semibold text-amber-500">Archi<span className="text-white">KEK</span></span>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Credits display */}
            {user && profile && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#111] border border-[#222] rounded-lg">
                {profile.is_pro && (!profile.pro_expires_at || new Date(profile.pro_expires_at) > new Date()) ? (
                  <span className="text-amber-500 text-sm font-medium">✨ Pro</span>
                ) : (
                  <>
                    <span className="text-amber-500 text-sm font-medium">{profile.credits}</span>
                    <span className="text-gray-500 text-sm">credits</span>
                  </>
                )}
              </div>
            )}

            {/* User menu */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/pricing" className="hidden md:block text-gray-400 hover:text-white text-sm transition-colors">
                  Buy Credits
                </Link>
                <button 
                  onClick={signOut}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                href="/login"
                className="px-4 py-2 bg-amber-500 text-black rounded-lg text-sm font-medium hover:bg-amber-400 transition-colors"
              >
                Sign In
              </Link>
            )}

            <button 
              onClick={generateMap} 
              disabled={generating || !selection}
              className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                selection 
                  ? 'bg-amber-500 text-black hover:bg-amber-400' 
                  : 'bg-[#1a1a1a] text-gray-500 cursor-not-allowed'
              }`}
            >
              {generating ? <LoaderIcon /> : <DownloadIcon />}
              {generating ? 'Generating...' : `Generate ${exportFormat.toUpperCase()}`}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 pt-14 h-screen overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-80 bg-[#0a0a0a] border-r border-[#1a1a1a] overflow-y-auto flex-shrink-0">
          <div className="p-4 space-y-5">
            
            {/* PRICING BOX - NEW! */}
            <div className="p-4 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-amber-500 text-lg">💰</span>
                <span className="text-amber-500 font-semibold text-sm">Pricing</span>
                {discount && (
                  <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                    {discount.percent}% OFF
                  </span>
                )}
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">5 Maps</span>
                  <div className="text-right">
                    {discount ? (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs line-through">${baseCreditsPrice}</span>
                        <span className="text-white font-bold">${creditsPrice}</span>
                      </div>
                    ) : (
                      <span className="text-white font-bold">${baseCreditsPrice}</span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Unlimited</span>
                  <div className="text-right">
                    {discount ? (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs line-through">${baseProPrice}/mo</span>
                        <span className="text-white font-bold">${proPrice}/mo</span>
                      </div>
                    ) : (
                      <span className="text-white font-bold">${baseProPrice}/mo</span>
                    )}
                  </div>
                </div>
              </div>
              
              <Link 
                href="/pricing"
                className="block w-full py-2 bg-amber-500 text-black text-center rounded-lg text-sm font-semibold hover:bg-amber-400 transition-colors"
              >
                View Plans →
              </Link>
              
              {discount && (
                <p className="text-xs text-green-400/70 text-center mt-2">
                  🎉 {discount.name} discount applied!
                </p>
              )}
            </div>
            
            {/* Selection Tool */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">Selection Tool</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectionMode('point')} 
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border transition-all ${
                    selectionMode === 'point' 
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' 
                      : 'bg-[#111] border-[#222] text-gray-400 hover:border-[#333]'
                  }`}
                >
                  <PointerIcon />
                  <span className="text-sm">Point</span>
                </button>
                <button 
                  onClick={() => setSelectionMode('rectangle')} 
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border transition-all ${
                    selectionMode === 'rectangle' 
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' 
                      : 'bg-[#111] border-[#222] text-gray-400 hover:border-[#333]'
                  }`}
                >
                  <SquareIcon />
                  <span className="text-sm">Rectangle</span>
                </button>
              </div>
            </div>

            {/* Location Search */}
            <div className="relative">
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">Location</h3>
              <div className="relative">
                <input 
                  type="text" 
                  value={location} 
                  onChange={(e) => { setLocation(e.target.value); setShowResults(false) }} 
                  onKeyDown={(e) => e.key === 'Enter' && searchLocation()} 
                  placeholder="Search location..." 
                  className="w-full px-4 py-2.5 bg-[#111] border border-[#222] rounded-lg text-white text-sm placeholder-gray-500 focus:border-amber-500/50 focus:outline-none transition-colors" 
                />
                <button onClick={searchLocation} className="absolute right-3 top-2.5 text-gray-500 hover:text-white transition-colors">
                  <SearchIcon />
                </button>
              </div>
              
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#161616] border border-[#222] rounded-lg overflow-hidden z-30 shadow-xl">
                  {searchResults.slice(0, 5).map((result, i) => (
                    <button 
                      key={i} 
                      onClick={() => selectResult(result)} 
                      className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-[#222] border-b border-[#222] last:border-0 transition-colors"
                    >
                      {result.place_name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selection Info */}
            {selection && (
              <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-amber-500 text-xs font-medium uppercase tracking-wider">Selected</span>
                  <button onClick={clearSelection} className="text-gray-500 hover:text-red-400 transition-colors">
                    <TrashIcon />
                  </button>
                </div>
                <p className="text-amber-400/80 text-sm mt-1 truncate">{location}</p>
              </div>
            )}

            {/* Size Slider (Point mode only) */}
            {selectionMode === 'point' && (
              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">Area Size</h3>
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min="200" 
                    max="2000" 
                    step="100" 
                    value={size} 
                    onChange={(e) => setSize(Number(e.target.value))} 
                    className="flex-1 accent-amber-500" 
                  />
                  <span className="text-sm text-gray-400 w-14 text-right">{size}m</span>
                </div>
              </div>
            )}
            
            {/* Analysis Themes */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">Analysis Theme</h3>
              <div className="flex flex-wrap gap-1 mb-3">
                {THEME_CATEGORIES.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)} 
                    className={`px-2.5 py-1 text-xs rounded-md transition-all ${
                      activeCategory === cat 
                        ? 'bg-amber-500/20 text-amber-500' 
                        : 'bg-[#111] text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {ANALYSIS_THEMES.filter(t => t.category === activeCategory).map((theme) => (
                  <button 
                    key={theme.id} 
                    onClick={() => { setSelectedTheme(theme); setUseCustomColors(false) }} 
                    className={`aspect-square rounded-lg border-2 transition-all relative group overflow-hidden ${
                      selectedTheme.id === theme.id 
                        ? 'border-amber-500 scale-105 shadow-lg shadow-amber-500/10' 
                        : 'border-[#222] hover:border-[#444]'
                    }`} 
                    style={{ background: theme.colors.Zemin }}
                    title={theme.name}
                  >
                    <div className="w-full h-full p-1.5 flex flex-col gap-0.5">
                      <div className="flex-1 rounded-sm" style={{ background: theme.colors.Binalar }} />
                      <div className="h-1.5 rounded-sm" style={{ background: theme.colors.Yol_Otoyol }} />
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">{selectedTheme.name}</p>
            </div>

            {/* Color Customization */}
            <div>
              <button 
                onClick={() => setShowColorPanel(!showColorPanel)} 
                className="w-full flex items-center justify-between px-3 py-2.5 bg-[#111] border border-[#222] rounded-lg text-sm text-gray-300 hover:border-[#333] transition-colors"
              >
                <span className="flex items-center gap-2"><PaletteIcon /> Customize Colors</span>
                <ChevronDownIcon />
              </button>
              
              {showColorPanel && (
                <div className="mt-2 p-3 bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'Zemin', label: 'Background' },
                      { key: 'Binalar', label: 'Buildings' },
                      { key: 'Su', label: 'Water' },
                      { key: 'Yesil', label: 'Green' }
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center gap-2">
                        <input 
                          type="color" 
                          value={customColors[key as keyof typeof customColors] || '#000000'} 
                          onChange={(e) => updateColor(key, e.target.value)} 
                          className="w-8 h-8 rounded border border-[#333] cursor-pointer bg-transparent" 
                        />
                        <span className="text-xs text-gray-400">{label}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-[#222] pt-2">
                    <p className="text-xs text-gray-500 mb-2">Road Colors</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { key: 'Yol_Otoyol', label: 'Highway' },
                        { key: 'Yol_Birincil', label: 'Primary' },
                        { key: 'Yol_Ikincil', label: 'Secondary' },
                        { key: 'Yol_Konut', label: 'Residential' }
                      ].map(({ key, label }) => (
                        <div key={key} className="flex items-center gap-2">
                          <input 
                            type="color" 
                            value={customColors[key as keyof typeof customColors] || '#000000'} 
                            onChange={(e) => updateColor(key, e.target.value)} 
                            className="w-6 h-6 rounded border border-[#333] cursor-pointer bg-transparent" 
                          />
                          <span className="text-xs text-gray-500">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {useCustomColors && (
                    <button 
                      onClick={() => { setUseCustomColors(false); setCustomColors(selectedTheme.colors) }} 
                      className="w-full text-xs text-amber-500 hover:text-amber-400 transition-colors"
                    >
                      Reset to theme defaults
                    </button>
                  )}
                </div>
              )}
            </div>
            
            {/* Stroke Widths */}
            <div>
              <button 
                onClick={() => setShowStrokePanel(!showStrokePanel)} 
                className="w-full flex items-center justify-between px-3 py-2.5 bg-[#111] border border-[#222] rounded-lg text-sm text-gray-300 hover:border-[#333] transition-colors"
              >
                <span className="flex items-center gap-2"><SlidersIcon /> Line Weights</span>
                <ChevronDownIcon />
              </button>
              
              {showStrokePanel && (
                <div className="mt-2 p-3 bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg space-y-3">
                  {[
                    { key: 'highway', label: 'Highway', min: 2, max: 12 },
                    { key: 'primary', label: 'Primary', min: 1, max: 8 },
                    { key: 'secondary', label: 'Secondary', min: 0.5, max: 6 },
                    { key: 'residential', label: 'Residential', min: 0.5, max: 4 },
                    { key: 'building', label: 'Building', min: 0, max: 2 }
                  ].map(({ key, label, min, max }) => (
                    <div key={key}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">{label}</span>
                        <span className="text-gray-500">{strokeWidths[key as keyof typeof strokeWidths]}px</span>
                      </div>
                      <input 
                        type="range" 
                        min={min} 
                        max={max} 
                        step={0.1} 
                        value={strokeWidths[key as keyof typeof strokeWidths]} 
                        onChange={(e) => setStrokeWidths(prev => ({ ...prev, [key]: Number(e.target.value) }))} 
                        className="w-full accent-amber-500" 
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Options */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">Options</h3>
              <div className="space-y-2">
                {[
                  { checked: showContours, onChange: setShowContours, label: 'Topography contours' },
                  { checked: showLabels, onChange: setShowLabels, label: 'Landmark labels' },
                  { checked: showTransit, onChange: setShowTransit, label: 'Transit stops' },
                  { checked: showScale, onChange: setShowScale, label: 'Scale bar & north arrow' },
                  { checked: showShadow, onChange: setShowShadow, label: 'Building shadows' },
                  { checked: transparent, onChange: setTransparent, label: 'Transparent background' },
                  { checked: showFrame, onChange: setShowFrame, label: 'Frame with legend' }
                ].map(({ checked, onChange, label }) => (
                  <label key={label} className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={checked} 
                      onChange={(e) => onChange(e.target.checked)} 
                      className="w-4 h-4 accent-amber-500 rounded" 
                    />
                    <span className="text-sm text-gray-300">{label}</span>
                  </label>
                ))}
              </div>
              
              {/* Location Name - shown only when frame enabled */}
              {showFrame && (
                <div className="mt-3 p-3 bg-[#0f0f0f] border border-amber-500/30 rounded-lg">
                  <label className="text-xs text-gray-400 block mb-2">Title (optional)</label>
                  <input 
                    type="text" 
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="e.g., Istanbul, Kadıköy"
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none"
                  />
                  <p className="text-xs text-gray-600 mt-2">Leave empty for default title</p>
                </div>
              )}
              
              {/* Contour Interval - shown only when contours enabled */}
              {showContours && (
                <div className="mt-3 p-3 bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-400">Contour Interval</span>
                    <span className="text-amber-500 font-medium">{contourInterval}m</span>
                  </div>
                  <input 
                    type="range" 
                    min={1} 
                    max={20} 
                    step={1} 
                    value={contourInterval} 
                    onChange={(e) => setContourInterval(Number(e.target.value))} 
                    className="w-full accent-amber-500" 
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>1m</span>
                    <span>20m</span>
                  </div>
                </div>
              )}
            </div>

            {/* Export Format */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">Export Format</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'svg', label: 'SVG', desc: 'Vector graphics' },
                  { id: 'dxf', label: 'DXF', desc: 'CAD software' }
                ].map(({ id, label, desc }) => (
                  <button
                    key={id}
                    onClick={() => setExportFormat(id as 'svg' | 'dxf')}
                    className={`p-3 rounded-lg border transition-all text-center ${
                      exportFormat === id
                        ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                        : 'bg-[#111] border-[#222] text-gray-400 hover:border-[#333]'
                    }`}
                  >
                    <div className="text-sm font-semibold">{label}</div>
                    <div className="text-xs opacity-60 mt-0.5">{desc}</div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-2">💡 For PDF, export SVG then use Illustrator</p>
              
              {/* Resolution (only for SVG) */}
              {exportFormat === 'svg' && (
                <div className="mt-3 p-3 bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-400">Resolution</span>
                    <span className="text-amber-500 font-medium">{resolution}px</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: 1200, label: 'Standard' },
                      { val: 2400, label: 'High' },
                      { val: 4800, label: 'Ultra' }
                    ].map(({ val, label }) => (
                      <button
                        key={val}
                        onClick={() => setResolution(val)}
                        className={`py-2 px-3 rounded text-xs transition-all ${
                          resolution === val
                            ? 'bg-amber-500/20 border border-amber-500 text-amber-400'
                            : 'bg-[#1a1a1a] border border-[#222] text-gray-500 hover:border-[#333]'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Preview Button */}
            {selection && exportFormat === 'svg' && (
              <button
                onClick={previewMap}
                disabled={previewLoading}
                className="w-full py-3 bg-[#1a1a1a] border border-[#333] text-gray-300 rounded-xl font-medium hover:bg-[#222] hover:border-amber-500/50 transition-all flex items-center justify-center gap-2"
              >
                {previewLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    Creating preview...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview (Free)
                  </>
                )}
              </button>
            )}

            {/* Preview Display */}
            {previewUrl && (
              <div className="p-3 bg-[#0f0f0f] border border-amber-500/30 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-amber-500 font-medium">
                    {previewLoading ? '⟳ Updating...' : '✓ Preview Ready'}
                  </span>
                  <button 
                    onClick={() => { setPreviewUrl(null); window.URL.revokeObjectURL(previewUrl) }}
                    className="text-xs text-gray-500 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <div 
                  onClick={() => setShowLightbox(true)}
                  className="cursor-zoom-in group relative"
                >
                  <img 
                    src={previewUrl} 
                    alt="Map Preview" 
                    className={`w-full rounded border border-[#333] ${previewLoading ? 'opacity-50' : ''} group-hover:border-amber-500/50 transition-colors`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded">
                    <span className="bg-black/70 px-3 py-1.5 rounded-full text-xs text-white flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                        <path d="M11 8v6M8 11h6" />
                      </svg>
                      Click to enlarge
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {selectedTheme.name} • {selection?.size || size}m
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            {/* Mobile Generate Button */}
            <button 
              onClick={generateMap} 
              disabled={generating || !selection}
              className={`w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold transition-all md:hidden ${
                selection 
                  ? 'bg-amber-500 text-black hover:bg-amber-400' 
                  : 'bg-[#1a1a1a] text-gray-500 cursor-not-allowed'
              }`}
            >
              {generating ? <LoaderIcon /> : <DownloadIcon />}
              {generating ? 'Generating...' : `Generate ${exportFormat.toUpperCase()}`}
            </button>
          </div>
        </aside>

        {/* Map Area */}
        <main className="flex-1 relative bg-[#111]">
          <div ref={mapRef} className="w-full h-full" />
          
          {/* Instructions overlay */}
          <div className="absolute top-4 left-4 bg-[#161616]/95 backdrop-blur border border-[#222] rounded-xl px-4 py-3 z-10 pointer-events-none">
            <p className="text-gray-300 text-sm">
              {selectionMode === 'point' 
                ? '🎯 Click on the map to select center point' 
                : '📐 Click and drag to draw rectangle'}
            </p>
          </div>
          
          {/* Theme preview widget */}
          <div className="absolute bottom-4 left-4 bg-[#161616]/95 backdrop-blur border border-[#222] rounded-xl p-4 z-10">
            <p className="text-xs text-gray-500 mb-2 font-medium">Preview: {selectedTheme.name}</p>
            <div className="w-48 h-32 rounded-lg overflow-hidden" style={{ background: customColors.Zemin }}>
              <svg viewBox="0 0 200 130" className="w-full h-full">
                <ellipse cx="160" cy="100" rx="30" ry="20" fill={customColors.Su} />
                <path d="M 10 80 Q 30 60 60 75 L 70 130 L 10 130 Z" fill={customColors.Yesil} />
                <path d="M 0 70 Q 100 65 200 75" fill="none" stroke={customColors.Yol_Otoyol} strokeWidth={strokeWidths.highway * 0.8} strokeLinecap="round" />
                <line x1="100" y1="0" x2="95" y2="130" stroke={customColors.Yol_Birincil} strokeWidth={strokeWidths.primary * 0.8} />
                <line x1="50" y1="90" x2="150" y2="95" stroke={customColors.Yol_Konut} strokeWidth={strokeWidths.residential * 0.8} />
                <rect x="20" y="20" width="35" height="30" fill={customColors.Binalar} stroke={customColors.Bina_Stroke} strokeWidth={strokeWidths.building} />
                <rect x="70" y="25" width="45" height="25" fill={customColors.Binalar} stroke={customColors.Bina_Stroke} strokeWidth={strokeWidths.building} />
                <rect x="130" y="15" width="30" height="40" fill={customColors.Binalar} stroke={customColors.Bina_Stroke} strokeWidth={strokeWidths.building} />
                {showTransit && (
                  <>
                    <circle cx="45" cy="55" r="6" fill={customColors.Metro} stroke="white" strokeWidth="1.5" />
                    <text x="45" y="58" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">M</text>
                  </>
                )}
              </svg>
            </div>
          </div>
        </main>
      </div>

      {/* Preview Lightbox - Full Screen */}
      {showLightbox && previewUrl && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center cursor-zoom-out"
          onClick={() => setShowLightbox(false)}
        >
          <button 
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white/60 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <img 
            src={previewUrl} 
            alt="Map Preview" 
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-2 rounded-full text-sm text-white/80">
            {selectedTheme.name} • {selection?.size || size}m • Click anywhere to close
          </div>
        </div>
      )}

      {/* Tutorial Overlay - First Time Users */}
      {showTutorial && !previewUrl && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          {/* Step 1: Search Location */}
          {tutorialStep === 1 && (
            <div className="absolute top-20 left-4 md:left-auto md:right-[340px] pointer-events-auto animate-pulse">
              <div className="bg-amber-500 text-black px-4 py-3 rounded-xl shadow-lg max-w-[280px]">
                <div className="flex items-start gap-2">
                  <span className="bg-black text-amber-500 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <div>
                    <p className="font-semibold text-sm">Search for a location</p>
                    <p className="text-xs mt-1 opacity-80">Type a city name or address in the search bar</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-black/20">
                  <button 
                    onClick={dismissTutorial}
                    className="text-xs opacity-70 hover:opacity-100"
                  >
                    Skip tutorial
                  </button>
                  <button 
                    onClick={() => setTutorialStep(2)}
                    className="text-xs font-semibold bg-black/20 px-3 py-1 rounded-full hover:bg-black/30"
                  >
                    Next →
                  </button>
                </div>
              </div>
              <div className="w-4 h-4 bg-amber-500 rotate-45 -mt-2 ml-6 md:ml-auto md:mr-6"></div>
            </div>
          )}

          {/* Step 2: Click on Map */}
          {tutorialStep === 2 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <div className="bg-amber-500 text-black px-4 py-3 rounded-xl shadow-lg max-w-[280px]">
                <div className="flex items-start gap-2">
                  <span className="bg-black text-amber-500 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <div>
                    <p className="font-semibold text-sm">Click on the map</p>
                    <p className="text-xs mt-1 opacity-80">Click anywhere to select the center of your map area</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-black/20">
                  <button 
                    onClick={() => setTutorialStep(1)}
                    className="text-xs opacity-70 hover:opacity-100"
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={() => setTutorialStep(3)}
                    className="text-xs font-semibold bg-black/20 px-3 py-1 rounded-full hover:bg-black/30"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preview */}
          {tutorialStep === 3 && (
            <div className="absolute bottom-32 right-4 md:right-[100px] pointer-events-auto">
              <div className="bg-amber-500 text-black px-4 py-3 rounded-xl shadow-lg max-w-[280px]">
                <div className="flex items-start gap-2">
                  <span className="bg-black text-amber-500 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <div>
                    <p className="font-semibold text-sm">Click "Preview" button</p>
                    <p className="text-xs mt-1 opacity-80">Generate a preview to see your map before downloading</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-black/20">
                  <button 
                    onClick={() => setTutorialStep(2)}
                    className="text-xs opacity-70 hover:opacity-100"
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={dismissTutorial}
                    className="text-xs font-semibold bg-black/20 px-3 py-1 rounded-full hover:bg-black/30"
                  >
                    Got it! ✓
                  </button>
                </div>
              </div>
              <div className="w-4 h-4 bg-amber-500 rotate-45 -mt-2 ml-auto mr-10"></div>
            </div>
          )}
        </div>
      )}

      {/* Login Modal - Conversion Optimized */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred background showing the map */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowLoginModal(false)} />
          
          {/* Modal */}
          <div className="relative bg-[#0a0a0a] border border-[#222] rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            {/* Close button */}
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>

            {/* Headline - Action Oriented */}
            <h3 className="text-2xl font-semibold text-center mb-2">
              Your Map is Ready! 🎉
            </h3>
            <p className="text-gray-400 text-center text-sm mb-6">
              Sign in to download your project
            </p>

            {/* Google Button */}
            <button
              onClick={async () => {
                // Save current map state before redirecting to Google
                const stateToSave = {
                  selection,
                  size,
                  theme: selectedTheme.id,
                  locationName,
                  showTransit,
                  showContours,
                  showFrame,
                  exportFormat
                }
                localStorage.setItem('archikek_pending_map', JSON.stringify(stateToSave))
                await signInWithGoogle()
              }}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-[#222]" />
              <span className="text-gray-600 text-xs">or</span>
              <div className="flex-1 h-px bg-[#222]" />
            </div>

            {/* Email option */}
            <button
              onClick={() => {
                // Save current map state before redirecting
                const stateToSave = {
                  selection,
                  size,
                  theme: selectedTheme.id,
                  locationName,
                  showTransit,
                  showContours,
                  showFrame,
                  exportFormat
                }
                localStorage.setItem('archikek_pending_map', JSON.stringify(stateToSave))
                setShowLoginModal(false)
                router.push('/signup')
              }}
              className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-xl text-white font-medium hover:bg-[#1a1a1a] transition-colors text-sm"
            >
              Sign up with Email
            </button>

            {/* Trust Signals */}
            <div className="mt-6 pt-4 border-t border-[#222]">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  No credit card
                </span>
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  1 Free Map
                </span>
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Secure
                </span>
              </div>
            </div>

            {/* Already have account */}
            <p className="text-center text-gray-500 text-xs mt-4">
              Already have an account?{' '}
              <button 
                onClick={() => {
                  // Save current map state before redirecting
                  const stateToSave = {
                    selection,
                    size,
                    theme: selectedTheme.id,
                    locationName,
                    showTransit,
                    showContours,
                    showFrame,
                    exportFormat
                  }
                  localStorage.setItem('archikek_pending_map', JSON.stringify(stateToSave))
                  setShowLoginModal(false)
                  router.push('/login')
                }}
                className="text-amber-500 hover:text-amber-400"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {generated && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#161616] border border-[#222] rounded-2xl p-8 max-w-md text-center mx-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Map Downloaded!</h3>
            <p className="text-gray-400 text-sm mb-6">
              Your SVG file has been downloaded. Open it in Adobe Illustrator or any vector editor.
            </p>
            <button
              onClick={() => setGenerated(false)}
              className="w-full px-5 py-3 bg-amber-500 text-black rounded-xl font-semibold hover:bg-amber-400 transition-colors"
            >
              Create Another Map
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
