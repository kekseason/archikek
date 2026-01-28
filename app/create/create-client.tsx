'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { trackViewContent } from '@/lib/tiktok'
import dynamic from 'next/dynamic'
import UpsellPopup from '@/components/upsell-popup'
import AdBanner from '@/components/AdBanner'

// Dynamic import for Three.js (client-side only)
const ThreeViewer = dynamic(() => import('@/components/three-viewer'), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[300px] bg-[#0a0a0a] rounded-lg flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
  </div>
})

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

// ============================================================
// 3D THEMES (10 TEMA)
// ============================================================

const THEMES_3D = [
  // ============ REALISTIC ============
  {
    id: 'default',
    name: 'Default',
    category: 'Realistic',
    description: 'Natural realistic colors',
    preview: { terrain: '#404040', building: '#b3ae9f', road: '#8c8c8c', water: '#3373bf', green: '#4da64d' }
  },
  {
    id: 'satellite',
    name: 'Satellite',
    category: 'Realistic',
    description: 'Earth tone colors',
    preview: { terrain: '#594d40', building: '#a6998c', road: '#595959', water: '#26598c', green: '#407338' }
  },
  {
    id: 'autumn',
    name: 'Autumn',
    category: 'Realistic',
    description: 'Warm fall colors',
    preview: { terrain: '#735940', building: '#e6cc99', road: '#806b59', water: '#5980a6', green: '#d98c40' }
  },
  // ============ MINIMAL ============
  {
    id: 'light',
    name: 'Light Mode',
    category: 'Minimal',
    description: 'Clean white aesthetic',
    preview: { terrain: '#ebe6e0', building: '#fff9f2', road: '#cccccc', water: '#a6d1f2', green: '#b3e0b3' }
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    category: 'Minimal',
    description: 'Dark background, bright objects',
    preview: { terrain: '#141419', building: '#a6a6b3', road: '#47474d', water: '#1a5999', green: '#267333' }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'Minimal',
    description: 'White buildings, dark roads',
    preview: { terrain: '#fafafa', building: '#ffffff', road: '#666666', water: '#cce0f2', green: '#d9e6d9' }
  },
  // ============ ARTISTIC ============
  {
    id: 'blueprint',
    name: 'Blueprint',
    category: 'Artistic',
    description: 'Architectural drawing style',
    preview: { terrain: '#1f2e59', building: '#739ad9', road: '#527ab3', water: '#2e5280', green: '#4d8c99' }
  },
  {
    id: 'vintage',
    name: 'Vintage',
    category: 'Artistic',
    description: 'Retro sepia tones',
    preview: { terrain: '#b8ad99', building: '#e0d1b8', road: '#a6997f', water: '#809eb3', green: '#8ca67a' }
  },
  {
    id: 'neon',
    name: 'Neon',
    category: 'Artistic',
    description: 'Bright neon colors',
    preview: { terrain: '#0d0514', building: '#bf73cc', road: '#1ab3cc', water: '#4d33cc', green: '#33e666' }
  },
  {
    id: 'ocean',
    name: 'Ocean',
    category: 'Artistic',
    description: 'Cool blue-green tones',
    preview: { terrain: '#335973', building: '#cce0eb', road: '#618099', water: '#2673b3', green: '#59a68c' }
  },
]

const THEME_3D_CATEGORIES = ['Realistic', 'Minimal', 'Artistic']

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
  
  // Calculate discounted Pro price
  const baseProPrice = 18.99
  const proPrice = discount ? (baseProPrice * (1 - discount.percent / 100)).toFixed(0) : baseProPrice.toFixed(0)
  
  // Calculate discounted Unlimited SVG price
  const baseUnlimitedPrice = 8
  const unlimitedPrice = discount ? Math.round(baseUnlimitedPrice * (1 - discount.percent / 100)) : baseUnlimitedPrice
  
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
  const [exportFormat, setExportFormat] = useState<'svg' | 'dxf' | 'png'>('svg')
  const [exportMode, setExportMode] = useState<'2d' | '3d'>('2d')
  const [format3D, setFormat3D] = useState<'glb' | 'stl' | '3dm' | 'dae'>('glb')
  const [theme3D, setTheme3D] = useState(THEMES_3D[0])
  const [active3DCategory, setActive3DCategory] = useState('Realistic')
  const [includeTerrain, setIncludeTerrain] = useState(true)
  const [raftThickness, setRaftThickness] = useState(0)  // STL için raft (mm)
  const [show3DPreview, setShow3DPreview] = useState(false)
  const [layers3D, setLayers3D] = useState({
    buildings: true,
    roads: true,
    water: true,
    green: true
  })
  
  // Export mode: '2d' or '3d'
  
  const [resolution, setResolution] = useState(1200)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [showLightbox, setShowLightbox] = useState(false)
  const [showMobilePanel, setShowMobilePanel] = useState(false)
  const [lightboxZoom, setLightboxZoom] = useState(1)
  const [showTutorial, setShowTutorial] = useState(true)
  const [tutorialStep, setTutorialStep] = useState(1)
  
  // UI State
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showProModal, setShowProModal] = useState(false)
  const [showUpsellPopup, setShowUpsellPopup] = useState(false)
  const [showPngComparePopup, setShowPngComparePopup] = useState(false)
  const hasSeenUpsell = useRef(false)
  const hasSeenPngCompare = useRef(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showColorPanel, setShowColorPanel] = useState(false)
  const [showStrokePanel, setShowStrokePanel] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Analysis')
  
  // Show toast helper
  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(''), 1500)
  }
  
  // Map refs
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  
  // Drawing state refs
  const isDrawingRef = useRef(false)
  const drawStartRef = useRef<{lng: number, lat: number} | null>(null)
  const selectionModeRef = useRef<SelectionMode>(selectionMode)
  const exportModeRef = useRef(exportMode)
  
  // Keep refs in sync with state
  useEffect(() => {
    selectionModeRef.current = selectionMode
  }, [selectionMode])
  
  useEffect(() => {
    exportModeRef.current = exportMode
  }, [exportMode])

  // Compute subscription status
  const isPro = profile?.is_pro && (!profile?.pro_expires_at || new Date(profile.pro_expires_at) > new Date())
  const hasUnlimitedSvg = profile?.has_unlimited_svg && (!profile?.unlimited_svg_expires_at || new Date(profile.unlimited_svg_expires_at) > new Date())
  
  // Export permissions
  const canExportSVG = isPro || hasUnlimitedSvg
  const canExportDXF = isPro || hasUnlimitedSvg
  const canExport3D = isPro

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

  // ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showLightbox) {
        setShowLightbox(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showLightbox])

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
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [selectedTheme.id]) // ONLY theme change triggers auto-preview

  // =========================================
  // MAP INITIALIZATION (Native Mapbox - NO Draw plugin)
  // =========================================
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Small delay to ensure DOM is ready after F5
    const timer = setTimeout(() => {
      if (!mapRef.current) return
      
      // If map already exists, don't reinitialize
      if (mapInstanceRef.current) return

      const initMap = async () => {
        try {
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
            if (selectionModeRef.current !== 'rectangle') return
            
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
            let avgSize = Math.round((latMeters + lngMeters) / 2)
            
            // Enforce max size limits based on export mode
            // 2D: max 3000m, 3D: max 2000m
            const maxSize = exportModeRef.current === '3d' ? 2000 : 3000
            const minSize = 100
            
            if (avgSize > maxSize) {
              avgSize = maxSize
              setError(`Maximum area is ${maxSize}m × ${maxSize}m for ${exportModeRef.current === '3d' ? '3D models' : '2D maps'}`)
              setTimeout(() => setError(''), 3000)
            }
            
            if (avgSize >= minSize) {
              setSelection({
                mode: 'rectangle',
                center: { lat: centerLat, lng: centerLng },
                bounds,
                size: avgSize
              })
              
              const areaKm = (latMeters * lngMeters) / 1000000
              setLocation(`${Math.min(latMeters, avgSize).toFixed(0)}m × ${Math.min(lngMeters, avgSize).toFixed(0)}m`)
            }
            
            drawStartRef.current = null
          })

          // --- CLICK EVENT (Point Mode) ---
          map.on('click', (e) => {
            if (selectionModeRef.current !== 'point') return
            
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
        } catch (error) {
          console.error('Map init error:', error)
        }
      }

      initMap()
    }, 100)
    
    return () => {
      clearTimeout(timer)
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      if (markerRef.current) {
        markerRef.current = null
      }
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

  const [searchLoading, setSearchLoading] = useState(false)
  
  const searchLocation = async () => {
    if (!location.trim()) {
      showToast('Please enter a location')
      return
    }
    
    setSearchLoading(true)
    try {
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${token}`)
      const data = await response.json()
      if (data.features?.length > 0) {
        setSearchResults(data.features)
        setShowResults(true)
      } else {
        showToast('No results found. Try a different search.')
      }
    } catch (err) {
      console.error('Search error:', err)
      showToast('Search failed. Please try again.')
    } finally {
      setSearchLoading(false)
    }
  }

  const selectResult = (result: any) => {
    const [lng, lat] = result.center
    setShowResults(false)
    setLocation(result.place_name)
    
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({ center: [lng, lat], zoom: 14 })
      
      // Auto-create selection after flying to location
      setTimeout(() => {
        const center = { lat, lng }
        setSelection({
          center,
          size: size,
          mode: 'rectangle' as const,
          bounds: {
            north: lat + (size / 2) / 111320,
            south: lat - (size / 2) / 111320,
            east: lng + (size / 2) / (111320 * Math.cos(lat * Math.PI / 180)),
            west: lng - (size / 2) / (111320 * Math.cos(lat * Math.PI / 180))
          }
        })
        showToast('Area selected! Scroll down to customize.')
      }, 1500)
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
    
    // Double-check session is still valid
    const { data: { session } } = await (await import('@/lib/supabase')).supabase.auth.getSession()
    if (!session) {
      setShowLoginModal(true)
      return
    }

    // Check format permissions
    // PNG = Free for everyone
    // SVG = Pro or Unlimited SVG subscription
    // DXF = Pro or Unlimited SVG subscription
    
    if (exportFormat === 'svg' && !canExportSVG) {
      setShowProModal(true)
      return
    }
    
    if (exportFormat === 'dxf' && !canExportDXF) {
      setShowProModal(true)
      return
    }
    
    // Show upsell popup for PNG users who haven't seen it yet
    // Don't show to Pro users or users with Unlimited SVG
    if (exportFormat === 'png' && !hasSeenUpsell.current && !canExportSVG) {
      setShowUpsellPopup(true)
      return
    }
    
    await executeMapGeneration()
  }
  
  const executeMapGeneration = async () => {
    if (!selection) {
      setError('Please select an area on the map')
      return
    }
    
    setGenerating(true)
    setError('')
    
    try {
      // Log download for analytics
      if (user) {
        fetch('/api/log-download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            theme: selectedTheme.id,
            location: location,
            size: selection.size || size,
            format: exportFormat
          })
        }).catch(() => {}) // Don't fail if logging fails
      }

      // Generate the map
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://web-production-64f4.up.railway.app'
      const colors = useCustomColors ? customColors : selectedTheme.colors
      
      // For PNG, we request SVG first then convert
      const backendFormat = exportFormat === 'png' ? 'svg' : exportFormat
      
      const requestBody: any = {
        theme: selectedTheme.id,
        format: backendFormat,
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
      
      // If PNG, convert SVG to PNG
      if (exportFormat === 'png') {
        const svgText = await blob.text()
        
        // Parse SVG to get dimensions
        const parser = new DOMParser()
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')
        const svgElement = svgDoc.querySelector('svg')
        
        // Get dimensions from SVG
        let width = 2000
        let height = 2000
        if (svgElement) {
          const viewBox = svgElement.getAttribute('viewBox')
          if (viewBox) {
            const parts = viewBox.split(' ').map(Number)
            width = parts[2] || 2000
            height = parts[3] || 2000
          } else {
            // Try width/height attributes
            width = parseInt(svgElement.getAttribute('width') || '2000')
            height = parseInt(svgElement.getAttribute('height') || '2000')
          }
        }
        
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        // Set canvas size (2x for high quality)
        const scale = 2
        canvas.width = width * scale
        canvas.height = height * scale
        
        // Create image from SVG
        const img = document.createElement('img')
        const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' })
        const svgUrl = URL.createObjectURL(svgBlob)
        
        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            if (ctx) {
              // Scale context for high resolution
              ctx.scale(scale, scale)
              // Draw SVG directly (it should have its own background)
              ctx.drawImage(img, 0, 0, width, height)
            }
            URL.revokeObjectURL(svgUrl)
            resolve()
          }
          img.onerror = (e) => {
            URL.revokeObjectURL(svgUrl)
            reject(e)
          }
          img.src = svgUrl
        })
        
        // Convert to PNG and download
        canvas.toBlob((pngBlob) => {
          if (pngBlob) {
            const url = window.URL.createObjectURL(pngBlob)
            const a = document.createElement('a')
            a.href = url
            a.download = `archikek_${selectedTheme.id}_${requestBody.size}m.png`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
            
            // Show PNG vs SVG comparison popup (only once per session, only for non-Pro users)
            if (!hasSeenPngCompare.current && !canExportSVG) {
              setTimeout(() => {
                setShowPngComparePopup(true)
                hasSeenPngCompare.current = true
              }, 1500)
            }
          }
        }, 'image/png', 1.0)
      } else {
        // SVG or DXF - download directly
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `archikek_${selectedTheme.id}_${requestBody.size}m.${exportFormat}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }
      
      // Refresh profile to get updated credits
      await refreshProfile()
      
      setGenerated(true)
    } catch (err: any) {
      console.error('Generate error:', err)
      setError(err.message || 'Failed to generate map. Please try again.')
    }
    
    setGenerating(false)
  }

  // 3D Model Generation
  const generate3DModel = async () => {
    if (!selection || !selection.center) {
      setError('Please select a location first')
      return
    }

    // Check if user is logged in
    if (!user) {
      setShowLoginModal(true)
      return
    }
    
    // Double-check session is still valid
    const { data: { session } } = await (await import('@/lib/supabase')).supabase.auth.getSession()
    if (!session) {
      setShowLoginModal(true)
      return
    }

    // Pro check - 3D export requires Pro subscription only
    if (!canExport3D) {
      setError('3D export requires Pro subscription')
      setShowProModal(true)
      return
    }

    setGenerating(true)
    setError('')

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://web-production-64f4.up.railway.app'
      
      const requestBody = {
        lat: selection.center.lat,
        lng: selection.center.lng,
        size: selection.size || size,
        format: format3D,
        include_terrain: includeTerrain,
        include_roads: layers3D.roads,
        include_water: layers3D.water,
        include_green: layers3D.green,
        raft_thickness: format3D === 'stl' ? raftThickness : 0,
        location_name: locationName || undefined,
        // Send theme colors explicitly
        color_terrain: theme3D.preview.terrain,
        color_building: theme3D.preview.building,
        color_road: theme3D.preview.road,
        color_water: theme3D.preview.water,
        color_green: theme3D.preview.green
      }

      // Log 3D export for analytics
      if (user) {
        fetch('/api/log-download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            theme: `3d_${format3D}`,
            location: locationName || `${selection.center.lat},${selection.center.lng}`,
            size: selection.size || size,
            format: format3D
          })
        }).catch(() => {}) // Don't fail if logging fails
      }

      console.log('3D Request v8 with colors:', requestBody)

      const response = await fetch(`${API_URL}/generate-3d`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || `Server error: ${response.status}`)
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      
      // Dosya uzantısını belirle
      const safeName = locationName ? locationName.replace(/\s+/g, '_') : 'archikek'
      let ext: string = format3D
      
      a.download = `${safeName}_3d_${requestBody.size}m.${ext}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      await refreshProfile()
      setGenerated(true)

    } catch (err: any) {
      console.error('3D Generate error:', err)
      setError(err.message || 'Failed to generate 3D model')
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

      // Request format based on export format
      // DXF gets CAD-style preview, others get regular SVG
      const previewFormat = exportFormat === 'dxf' ? 'dxf-preview' : 'svg'

      // Full quality preview with /generate
      const requestBody = {
        theme: selectedTheme.id,
        format: previewFormat,
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
      // Open correct viewer based on export mode
      if (exportMode === '3d') {
        setShow3DPreview(true) // Open 3D viewer
      } else {
        setShowLightbox(true) // Open 2D lightbox
        setLightboxZoom(1) // Reset zoom
      }
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
    // Debounced toast to avoid spam
    const label = key.replace('Yol_', '').replace('_', ' ')
    showToast(`${label} color updated`)
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#1a1a1a]" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className="flex items-center justify-between px-3 md:px-4 h-12 md:h-14">
          <Link href="/" className="flex items-center gap-2 md:gap-3 text-gray-400 hover:text-white transition-colors">
            <ArrowLeftIcon />
            <div className="flex items-center gap-1.5 md:gap-2">
              <Image src="/logo.png" alt="ArchiKEK" width={24} height={24} className="rounded-md md:w-7 md:h-7" />
              <span className="font-semibold text-amber-500 text-sm md:text-base">Archi<span className="text-white">KEK</span></span>
            </div>
          </Link>
          
          <div className="flex items-center gap-2 md:gap-4">
            {/* Pro badge - mobile */}
            {user && profile && profile.is_pro && (!profile.pro_expires_at || new Date(profile.pro_expires_at) > new Date()) && (
              <div className="flex md:hidden items-center gap-1 px-2 py-1 bg-[#111] border border-[#222] rounded-lg">
                <span className="text-amber-500 text-xs font-medium">✨ Pro</span>
              </div>
            )}
            
            {/* Pro badge - desktop */}
            {user && profile && profile.is_pro && (!profile.pro_expires_at || new Date(profile.pro_expires_at) > new Date()) && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#111] border border-[#222] rounded-lg">
                <span className="text-amber-500 text-sm font-medium">✨ Pro</span>
              </div>
            )}

            {/* User menu */}
            {user ? (
              <div className="flex items-center gap-2 md:gap-3">
                <Link href="/pricing" className="hidden md:block text-gray-400 hover:text-white text-sm transition-colors">
                  Buy Credits
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="text-gray-400 hover:text-white text-xs md:text-sm transition-colors"
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
              onClick={() => exportMode === '3d' ? generate3DModel() : generateMap()} 
              disabled={generating || !selection}
              className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                selection 
                  ? 'bg-amber-500 text-black hover:bg-amber-400' 
                  : 'bg-[#1a1a1a] text-gray-500 cursor-not-allowed'
              }`}
            >
              {generating ? <LoaderIcon /> : <DownloadIcon />}
              {generating ? 'Generating...' : exportMode === '3d' ? `Generate ${format3D.toUpperCase()}` : `Generate ${exportFormat.toUpperCase()}`}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 pt-12 md:pt-14 h-screen overflow-hidden">
        
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden md:flex md:flex-col w-80 bg-[#0a0a0a] border-r border-[#1a1a1a] flex-shrink-0 h-[calc(100vh-56px)]">
          <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-4">
            
            {/* Location Search - Compact */}
            <div className="relative">
              <div className="relative">
                <input 
                  type="text" 
                  value={location} 
                  onChange={(e) => { setLocation(e.target.value); setShowResults(false) }} 
                  onKeyDown={(e) => e.key === 'Enter' && searchLocation()} 
                  placeholder="🔍 Search location..." 
                  className="w-full px-4 py-2.5 bg-[#111] border border-[#222] rounded-lg text-white text-sm placeholder-gray-500 focus:border-amber-500/50 focus:outline-none transition-colors" 
                />
                <button 
                  onClick={searchLocation} 
                  disabled={searchLoading}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-white transition-colors disabled:opacity-50"
                >
                  {searchLoading ? (
                    <svg className="w-[18px] h-[18px] animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 11-6.219-8.56"/>
                    </svg>
                  ) : (
                    <SearchIcon />
                  )}
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

            {/* Selection Info + Size */}
            {selection ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                  <span className="text-amber-500 text-xs">✓</span>
                  <span className="text-amber-400/80 text-xs truncate flex-1">{location}</span>
                  <button onClick={clearSelection} className="text-gray-500 hover:text-red-400 transition-colors p-1">
                    <TrashIcon />
                  </button>
                </div>
                {/* Area Size Slider - Always visible when selection exists */}
                <div className="p-2 bg-[#111] rounded-lg">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Area Size</span>
                    <span className="text-amber-400">{selection.size || size}m × {selection.size || size}m</span>
                  </div>
                  <input
                    type="range"
                    min={250}
                    max={exportMode === '3d' ? 2000 : 3000}
                    step={50}
                    value={Math.min(selection.size || size, exportMode === '3d' ? 2000 : 3000)}
                    onChange={(e) => {
                      const newSize = Number(e.target.value)
                      setSize(newSize)
                      setSelection(prev => prev ? { ...prev, size: newSize } : null)
                    }}
                    className="w-full accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                    <span>250m</span>
                    <span>{exportMode === '3d' ? '2000m' : '3000m'}</span>
                  </div>
                </div>

                {/* ═══════════════════════════════════════════════════════ */}
                {/* 2D / 3D / LASER MODE SELECTION */}
                {/* ═══════════════════════════════════════════════════════ */}
                <div className="p-3 bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl">
                  <p className="text-xs text-gray-500 mb-2">Export Type</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setExportMode('2d')}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        exportMode === '2d'
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-[#222] bg-[#111] hover:border-[#333]'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                        </svg>
                        <span className={`font-semibold text-base ${exportMode === '2d' ? 'text-amber-400' : 'text-white'}`}>2D</span>
                      </div>
                      <p className="text-xs text-gray-500">SVG · PNG · DXF</p>
                    </button>
                    <button
                      onClick={() => setExportMode('3d')}
                      className={`p-4 rounded-xl border-2 transition-all text-left relative ${
                        exportMode === '3d'
                          ? 'border-amber-500 bg-amber-500/10'
                          : !canExport3D
                            ? 'border-amber-500/30 bg-[#111] hover:border-amber-500/50'
                            : 'border-[#222] bg-[#111] hover:border-[#333]'
                      }`}
                    >
                      {!canExport3D && (
                        <span className="absolute -top-2 -right-2 text-[9px] bg-amber-500 text-black px-1.5 py-0.5 rounded-full font-bold">PRO</span>
                      )}
                      <div className="flex items-center gap-3 mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span className={`font-semibold text-base ${exportMode === '3d' ? 'text-amber-400' : 'text-white'}`}>3D</span>
                      </div>
                      <p className="text-xs text-gray-500">GLB · STL · 3DM</p>
                    </button>
                  </div>
                </div>

                {/* ═══════════════════════════════════════════════════════ */}
                {/* 2D OPTIONS */}
                {/* ═══════════════════════════════════════════════════════ */}
                {exportMode === '2d' && (
                  <>
                    {/* 2D Theme Selection */}
                    <div className="p-3 bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {THEME_CATEGORIES.map(cat => (
                          <button 
                            key={cat} 
                            onClick={() => setActiveCategory(cat)} 
                            className={`px-2 py-1 text-xs rounded-md transition-all ${
                              activeCategory === cat 
                                ? 'bg-amber-500 text-black font-medium' 
                                : 'bg-[#1a1a1a] text-gray-500 hover:text-gray-300'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {ANALYSIS_THEMES.filter(t => t.category === activeCategory).map((theme) => (
                          <button 
                            key={theme.id} 
                            onClick={() => { setSelectedTheme(theme); setUseCustomColors(false) }} 
                            className={`aspect-square rounded-lg border-2 transition-all relative group overflow-hidden ${
                              selectedTheme.id === theme.id 
                                ? 'border-amber-500 ring-2 ring-amber-500/30' 
                                : 'border-[#333] hover:border-[#555]'
                            }`} 
                            style={{ background: theme.colors.Zemin }}
                            title={theme.name}
                          >
                            <div className="w-full h-full p-1 flex flex-col gap-0.5">
                              <div className="flex-1 rounded-sm" style={{ background: theme.colors.Binalar }} />
                              <div className="h-1 rounded-sm" style={{ background: theme.colors.Yol_Otoyol }} />
                            </div>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-center mt-2 text-amber-500 font-medium">{selectedTheme.name}</p>
                    </div>

                    {/* 2D Format Selection */}
                    <div className="p-3 bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl">
                      <p className="text-xs text-gray-500 mb-2">Format</p>
                      <div className="flex gap-2">
                        {[
                          { id: 'png', label: 'PNG', desc: 'Image', pro: false },
                          { id: 'svg', label: 'SVG', desc: 'Illustrator', pro: true },
                          { id: 'dxf', label: 'DXF', desc: 'AutoCAD', pro: true },
                        ].map(fmt => (
                          <button
                            key={fmt.id}
                            onClick={() => setExportFormat(fmt.id as 'svg' | 'dxf' | 'png')}
                            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all flex flex-col items-center relative ${
                              exportFormat === fmt.id
                                ? 'bg-amber-500 text-black'
                                : fmt.pro && !canExportSVG
                                  ? 'bg-[#1a1a1a] text-gray-500 border border-amber-500/30'
                                  : 'bg-[#1a1a1a] text-gray-400 hover:text-white'
                            }`}
                          >
                            {fmt.pro && !canExportSVG && (
                              <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-amber-500 text-black px-1 rounded font-bold">PRO</span>
                            )}
                            <span className="font-bold">{fmt.label}</span>
                            <span className={`text-[10px] ${exportFormat === fmt.id ? 'text-black/60' : 'text-gray-600'}`}>
                              {fmt.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* ═══════════════════════════════════════════════════════ */}
                {/* 3D OPTIONS */}
                {/* ═══════════════════════════════════════════════════════ */}
                {exportMode === '3d' && (
                  <>
                    {/* 3D Theme Selection - Same style as 2D with categories */}
                    <div className="p-3 bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {THEME_3D_CATEGORIES.map(cat => (
                          <button 
                            key={cat} 
                            onClick={() => setActive3DCategory(cat)} 
                            className={`px-2 py-1 text-xs rounded-md transition-all ${
                              active3DCategory === cat 
                                ? 'bg-amber-500 text-black font-medium' 
                                : 'bg-[#1a1a1a] text-gray-500 hover:text-gray-300'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {THEMES_3D.filter(t => t.category === active3DCategory).map((theme) => (
                          <button 
                            key={theme.id} 
                            onClick={() => setTheme3D(theme)} 
                            className={`aspect-square rounded-lg border-2 transition-all relative group overflow-hidden ${
                              theme3D.id === theme.id 
                                ? 'border-amber-500 ring-2 ring-amber-500/30' 
                                : 'border-[#333] hover:border-[#555]'
                            }`} 
                            style={{ background: theme.preview.terrain }}
                            title={theme.name}
                          >
                            <div className="w-full h-full p-1 flex flex-col gap-0.5">
                              <div className="flex-1 rounded-sm" style={{ background: theme.preview.building }} />
                              <div className="h-1 rounded-sm" style={{ background: theme.preview.road }} />
                            </div>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-center mt-2 text-amber-500 font-medium">{theme3D.name}</p>
                    </div>

                    {/* 3D Format Selection */}
                    <div className="p-3 bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl">
                      <p className="text-xs text-gray-500 mb-2">Format</p>
                      <div className="flex gap-2">
                        {[
                          { id: 'glb', label: 'GLB', desc: 'Blender, Web' },
                          { id: 'stl', label: 'STL', desc: '3D Print' },
                          { id: '3dm', label: '3DM', desc: 'Rhino' },
                          { id: 'dae', label: 'DAE', desc: 'SketchUp' },
                        ].map(fmt => (
                          <button
                            key={fmt.id}
                            onClick={() => setFormat3D(fmt.id as 'glb' | 'stl' | '3dm' | 'dae')}
                            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all flex flex-col items-center ${
                              format3D === fmt.id
                                ? 'bg-amber-500 text-black'
                                : 'bg-[#1a1a1a] text-gray-400 hover:text-white'
                            }`}
                          >
                            <span className="font-bold">{fmt.label}</span>
                            <span className={`text-[10px] ${format3D === fmt.id ? 'text-black/60' : 'text-gray-600'}`}>
                              {fmt.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3D Layer Toggles */}
                    <div className="p-3 bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl">
                      <p className="text-xs text-gray-500 mb-2">Layers</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { key: 'buildings', label: 'Buildings', icon: '🏢' },
                          { key: 'roads', label: 'Roads', icon: '🛣️' },
                          { key: 'water', label: 'Water', icon: '💧' },
                          { key: 'green', label: 'Green', icon: '🌳' },
                        ].map(layer => (
                          <button
                            key={layer.key}
                            onClick={() => setLayers3D(prev => ({ ...prev, [layer.key]: !prev[layer.key as keyof typeof prev] }))}
                            className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                              layers3D[layer.key as keyof typeof layers3D]
                                ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400'
                                : 'bg-[#1a1a1a] border border-transparent text-gray-500'
                            }`}
                          >
                            <span>{layer.icon}</span>
                            <span>{layer.label}</span>
                          </button>
                        ))}
                      </div>
                      
                      {/* Terrain Toggle */}
                      <label className="flex items-center justify-between mt-2 px-2 py-1.5 bg-[#1a1a1a] rounded-lg cursor-pointer hover:bg-[#222] transition-colors">
                        <div className="flex items-center gap-2">
                          <span>⛰️</span>
                          <span className="text-xs text-gray-300">Include Terrain</span>
                        </div>
                        <div className={`w-8 h-4 rounded-full transition-colors ${includeTerrain ? 'bg-amber-500' : 'bg-[#333]'}`}>
                          <div className={`w-3 h-3 bg-white rounded-full m-0.5 transition-transform ${includeTerrain ? 'translate-x-4' : ''}`} />
                        </div>
                        <input type="checkbox" checked={includeTerrain} onChange={(e) => setIncludeTerrain(e.target.checked)} className="hidden" />
                      </label>

                      {/* STL-specific: Raft Thickness */}
                      {format3D === 'stl' && (
                        <div className="mt-2 px-2 py-1.5 bg-[#1a1a1a] rounded-lg">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-300">🧱 Raft Thickness</span>
                            <span className="text-amber-400">{raftThickness}mm</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={5}
                            step={0.5}
                            value={raftThickness}
                            onChange={(e) => setRaftThickness(Number(e.target.value))}
                            className="w-full accent-amber-500 h-1"
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}

              </div>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectionMode('point')} 
                  className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg border text-xs transition-all ${
                    selectionMode === 'point' 
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' 
                      : 'bg-[#111] border-[#222] text-gray-400'
                  }`}
                >
                  <PointerIcon /> Point
                </button>
                <button 
                  onClick={() => setSelectionMode('rectangle')} 
                  className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg border text-xs transition-all ${
                    selectionMode === 'rectangle' 
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' 
                      : 'bg-[#111] border-[#222] text-gray-400'
                  }`}
                >
                  <SquareIcon /> Rectangle
                </button>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════ */}
            {/* PREVIEW & GENERATE - PRIMARY SECTION */}
            {/* ═══════════════════════════════════════════════════════ */}
            <div className="p-3 bg-gradient-to-b from-amber-500/10 border-amber-500/30 to-transparent border rounded-xl">
              
              {/* Preview Button - When no preview */}
              {!previewUrl && (
                <>
                  <button
                    onClick={exportMode === '3d' ? () => setShow3DPreview(true) : previewMap}
                    disabled={(exportMode === '2d' && previewLoading) || !selection}
                    className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                      selection 
                        ? 'bg-amber-500 text-black hover:bg-amber-400' 
                        : 'bg-[#1a1a1a] text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {previewLoading && exportMode === '2d' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Creating preview...
                      </>
                    ) : exportMode === '3d' ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                        </svg>
                        {selection ? 'Preview 3D Model' : 'Select location first'}
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {selection ? 'Preview' : 'Select location first'}
                      </>
                    )}
                  </button>
                  
                  {/* Format info - 2D only */}
                  {exportMode === '2d' && (
                    <div className="text-center text-[10px] text-gray-500">
                      {exportFormat === 'png' ? (
                        <span className="text-green-400">✓ PNG is free</span>
                      ) : exportFormat === 'svg' ? (
                        canExportSVG ? (
                          <span className="text-green-400">✓ SVG included in your plan</span>
                        ) : (
                          <span className="text-amber-400">✨ SVG requires subscription</span>
                        )
                      ) : exportFormat === 'dxf' ? (
                        canExportDXF ? (
                          <span className="text-green-400">✓ DXF included in your plan</span>
                        ) : (
                          <span className="text-amber-400">✨ DXF requires subscription</span>
                        )
                      ) : null}
                    </div>
                  )}
                </>
              )}

              {/* Mini Preview + Generate - When preview exists */}
              {previewUrl && (
                <div className="space-y-3">
                  {/* Clickable Mini Preview */}
                  <div 
                    onClick={() => { 
                      if (exportMode === '3d') {
                        setShow3DPreview(true);
                      } else {
                        setShowLightbox(true); 
                        setLightboxZoom(1); 
                      }
                    }}
                    className="cursor-zoom-in group relative rounded-lg overflow-hidden border-2 border-amber-500/50 hover:border-amber-500 transition-colors"
                  >
                    {exportMode === '3d' ? (
                      /* 3D Isometric Preview */
                      <div className="w-full aspect-square bg-gradient-to-br from-[#111] to-[#0a0a0a] p-4">
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                          {/* Ground */}
                          <polygon points="100,180 10,130 100,80 190,130" fill={theme3D.preview.terrain} stroke={theme3D.preview.road} strokeWidth="0.5" opacity="0.8"/>
                          
                          {/* Roads */}
                          <line x1="55" y1="105" x2="145" y2="155" stroke={theme3D.preview.road} strokeWidth="6" strokeLinecap="round"/>
                          <line x1="100" y1="130" x2="100" y2="80" stroke={theme3D.preview.road} strokeWidth="4" strokeLinecap="round"/>
                          
                          {/* Building 1 - Tall */}
                          <g>
                            <polygon points="30,115 30,50 50,40 50,105" fill={theme3D.preview.building}/>
                            <polygon points="30,50 70,65 70,130 30,115" fill={theme3D.preview.building} opacity="0.85"/>
                            <polygon points="30,50 50,40 90,55 70,65" fill={theme3D.preview.building} opacity="0.65"/>
                            <polygon points="30,115 70,130 90,120 50,105" fill={theme3D.preview.building} opacity="0.5"/>
                          </g>
                          
                          {/* Building 2 - Medium */}
                          <g>
                            <polygon points="80,135 80,95 100,85 100,125" fill={theme3D.preview.building} opacity="0.9"/>
                            <polygon points="80,95 120,110 120,150 80,135" fill={theme3D.preview.building} opacity="0.75"/>
                            <polygon points="80,95 100,85 140,100 120,110" fill={theme3D.preview.building} opacity="0.55"/>
                            <polygon points="80,135 120,150 140,140 100,125" fill={theme3D.preview.building} opacity="0.45"/>
                          </g>
                          
                          {/* Building 3 - Wide */}
                          <g>
                            <polygon points="130,150 130,120 155,108 155,138" fill={theme3D.preview.building} opacity="0.9"/>
                            <polygon points="130,120 180,138 180,168 130,150" fill={theme3D.preview.building} opacity="0.75"/>
                            <polygon points="130,120 155,108 205,126 180,138" fill={theme3D.preview.building} opacity="0.55"/>
                            <polygon points="130,150 180,168 205,156 155,138" fill={theme3D.preview.building} opacity="0.45"/>
                          </g>
                          
                          {/* Water */}
                          <ellipse cx="45" cy="145" rx="18" ry="10" fill={theme3D.preview.water} opacity="0.7"/>
                          
                          {/* Green */}
                          <ellipse cx="160" cy="170" rx="15" ry="8" fill={theme3D.preview.green} opacity="0.8"/>
                          <circle cx="95" cy="160" r="6" fill={theme3D.preview.green} opacity="0.7"/>
                        </svg>
                        
                        {/* Theme name overlay */}
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 rounded text-[10px] text-white/70">
                          {theme3D.name}
                        </div>
                      </div>
                    ) : (
                      /* 2D Map Preview */
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className={`w-full ${previewLoading ? 'opacity-50' : ''}`}
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                      <span className="bg-amber-500 text-black px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5">
                        {exportMode === '3d' ? (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                              <line x1="12" y1="22.08" x2="12" y2="12"/>
                            </svg>
                            Open 3D View
                          </>
                        ) : (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="11" cy="11" r="8" />
                              <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
                            </svg>
                            Click to zoom
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                  
                  {/* Generate Button */}
                  <button 
                    onClick={() => exportMode === '3d' ? generate3DModel() : generateMap()} 
                    disabled={generating}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 text-black rounded-lg font-semibold hover:bg-amber-400 transition-all"
                  >
                    {generating ? <LoaderIcon /> : <DownloadIcon />}
                    {generating ? 'Generating...' : exportMode === '3d' ? `Generate ${format3D.toUpperCase()}` : `Generate ${exportFormat.toUpperCase()}`}
                  </button>
                  
                  {/* Pricing Info - Only for 2D mode */}
                  {exportMode === '2d' && (
                    <div className="p-3 bg-[#0f0f0f] border border-[#222] rounded-lg text-center space-y-2">
                      {exportFormat === 'png' ? (
                        <p className="text-xs text-green-400 font-medium">✓ PNG is free</p>
                      ) : exportFormat === 'svg' || exportFormat === 'dxf' ? (
                        canExportSVG || canExportDXF ? (
                          <p className="text-xs text-green-400 font-medium">✓ {exportFormat.toUpperCase()} included in your plan</p>
                        ) : (
                          <>
                            <p className="text-xs text-amber-400 font-medium">✨ {exportFormat.toUpperCase()} requires subscription</p>
                            <Link 
                              href="/pricing" 
                              className="inline-block mt-1 px-4 py-1.5 bg-amber-500 text-black text-xs font-medium rounded-lg hover:bg-amber-400 transition-colors"
                            >
                              View Plans →
                            </Link>
                          </>
                        )
                      ) : null}
                      {(isPro || hasUnlimitedSvg) && (
                        <p className="text-xs text-amber-400 font-medium">
                          {isPro ? '✨ Pro Access' : '✨ Unlimited SVG+DXF'}
                        </p>
                      )}
                      <Link href="/pricing" className="block text-[10px] text-amber-500/70 hover:text-amber-500 hover:underline">
                        View all plans →
                      </Link>
                    </div>
                  )}
                  
                  {/* 3D Mode - Pro Required Notice */}
                  {exportMode === '3d' && !canExport3D && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center space-y-2">
                      <p className="text-xs text-amber-400 font-medium">✨ Pro Feature</p>
                      <p className="text-[10px] text-gray-400">3D export requires Pro subscription</p>
                      <Link 
                        href="/pricing" 
                        className="inline-block mt-1 px-4 py-1.5 bg-amber-500 text-black text-xs font-medium rounded-lg hover:bg-amber-400 transition-colors"
                      >
                        Upgrade to Pro →
                      </Link>
                    </div>
                  )}
                  
                  {exportMode === '3d' && canExport3D && (
                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                      <p className="text-xs text-green-400 font-medium">✓ 3D included in Pro</p>
                    </div>
                  )}
                  
                  {/* Instagram Follow CTA - Shows after successful download */}
                  {generated && (
                    <div className="p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg text-center space-y-1">
                      <p className="text-xs text-green-400 font-medium">✓ Downloaded!</p>
                      <p className="text-[10px] text-gray-400">Support us & never miss updates</p>
                      <a 
                        href="https://instagram.com/archikekapp" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-1 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-lg hover:opacity-90 transition-opacity"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        @archikekapp
                      </a>
                    </div>
                  )}
                  
                  {/* New Preview */}
                  <button
                    onClick={previewMap}
                    disabled={previewLoading}
                    className="w-full py-2 text-xs text-gray-400 hover:text-amber-400 transition-colors flex items-center justify-center gap-1"
                  >
                    {previewLoading ? 'Updating...' : '↻ Update preview'}
                  </button>
                </div>
              )}
            </div>

            {/* ═══════════════════════════════════════════════════════ */}
            {/* ADVANCED OPTIONS - Collapsible - Only for 2D mode */}
            {/* ═══════════════════════════════════════════════════════ */}
            {exportMode === '2d' && (
            <details className="group">
              <summary className="flex items-center justify-between px-3 py-2 bg-[#111] border border-[#222] rounded-lg cursor-pointer text-sm text-gray-400 hover:text-white transition-colors">
                <span>⚙️ Advanced Options</span>
                <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              
              <div className="mt-3 space-y-4 pl-1">
                {/* Color Customization */}
                <div>
                  <button 
                    onClick={() => {
                      setShowColorPanel(!showColorPanel)
                      if (!showColorPanel) showToast('Color panel opened')
                    }} 
                    className="w-full flex items-center justify-between px-3 py-2 bg-[#111] border border-[#222] rounded-lg text-sm text-gray-300 hover:border-[#333] transition-colors"
                  >
                    <span className="flex items-center gap-2"><PaletteIcon /> Customize Colors</span>
                    <svg className={`w-4 h-4 transition-transform ${showColorPanel ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showColorPanel && (
                    <div className="mt-2 p-3 bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg space-y-3">
                      {/* Area Colors */}
                      <div>
                        <p className="text-xs text-gray-500 mb-2">Area Colors</p>
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
                                className="w-6 h-6 rounded border border-[#333] cursor-pointer bg-transparent" 
                              />
                              <span className="text-xs text-gray-400">{label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Road Colors */}
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
                          Reset to theme colors
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Stroke Widths */}
                <div>
                  <button 
                    onClick={() => {
                      setShowStrokePanel(!showStrokePanel)
                      if (!showStrokePanel) showToast('Line weights panel opened')
                    }} 
                    className="w-full flex items-center justify-between px-3 py-2 bg-[#111] border border-[#222] rounded-lg text-sm text-gray-300 hover:border-[#333] transition-colors"
                  >
                    <span className="flex items-center gap-2"><SlidersIcon /> Line Weights</span>
                    <svg className={`w-4 h-4 transition-transform ${showStrokePanel ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showStrokePanel && (
                    <div className="mt-2 p-3 bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg space-y-2">
                      {[
                        { key: 'highway', label: 'Highway', min: 2, max: 12 },
                        { key: 'primary', label: 'Primary', min: 1, max: 8 },
                        { key: 'secondary', label: 'Secondary', min: 0.5, max: 6 },
                        { key: 'residential', label: 'Residential', min: 0.5, max: 4 },
                        { key: 'building', label: 'Building outline', min: 0, max: 2 }
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
                            onChange={(e) => {
                              setStrokeWidths(prev => ({ ...prev, [key]: Number(e.target.value) }))
                              showToast(`${label}: ${e.target.value}px`)
                            }} 
                            className="w-full accent-amber-500 h-1" 
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Map Title */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Map Title (optional)</p>
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="e.g., Barcelona Eixample"
                    className="w-full px-3 py-2 bg-[#111] border border-[#222] rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                {/* Options Toggles */}
                <div className="space-y-2">
                  {[
                    { state: showLabels, setter: setShowLabels, label: 'Building Names' },
                    { state: showTransit, setter: setShowTransit, label: 'Transit Stops' },
                    { state: showContours, setter: setShowContours, label: 'Contours' },
                    { state: showScale, setter: setShowScale, label: 'Scale Bar' },
                    { state: showFrame, setter: setShowFrame, label: 'Frame + Legend' },
                    { state: showShadow, setter: setShowShadow, label: 'Shadow Effect' },
                  ].map(({ state, setter, label }) => (
                    <label key={label} className="flex items-center justify-between px-3 py-2 bg-[#111] rounded-lg cursor-pointer hover:bg-[#161616] transition-colors">
                      <span className="text-sm text-gray-300">{label}</span>
                      <div className={`w-10 h-5 rounded-full transition-colors ${state ? 'bg-amber-500' : 'bg-[#333]'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full m-0.5 transition-transform ${state ? 'translate-x-5' : ''}`} />
                      </div>
                      <input type="checkbox" checked={state} onChange={(e) => {
                        setter(e.target.checked)
                        showToast(`${label}: ${e.target.checked ? 'On' : 'Off'}`)
                      }} className="hidden" />
                    </label>
                  ))}
                </div>

              </div>
            </details>
            )}

            {/* Error */}
            {error && (
              <div className="px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Toast notification */}
            {toast && (
              <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-amber-500 text-black text-sm font-medium rounded-full shadow-lg animate-pulse">
                ✓ {toast}
              </div>
            )}
          </div>
        </aside>

        {/* 3D Preview Modal */}
        {show3DPreview && selection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl h-[70vh] bg-[#111] rounded-2xl overflow-hidden border border-[#333]">
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
                <div>
                  <h3 className="text-white font-semibold">3D Preview</h3>
                  <p className="text-xs text-gray-400">{locationName || 'Selected Area'} • {size}m</p>
                </div>
                <button
                  onClick={() => setShow3DPreview(false)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Layer toggles in modal - use theme colors */}
              <div className="absolute top-16 left-4 z-10 flex flex-col gap-1">
                {[
                  { key: 'buildings', label: 'Buildings', color: theme3D.preview.building },
                  { key: 'roads', label: 'Roads', color: theme3D.preview.road },
                  { key: 'water', label: 'Water', color: theme3D.preview.water },
                  { key: 'green', label: 'Green', color: theme3D.preview.green },
                ].map(layer => (
                  <button
                    key={layer.key}
                    onClick={() => setLayers3D(prev => ({ ...prev, [layer.key]: !prev[layer.key as keyof typeof prev] }))}
                    className={`flex items-center gap-2 px-2 py-1 rounded text-xs transition-all ${
                      layers3D[layer.key as keyof typeof layers3D]
                        ? 'bg-black/60 text-white'
                        : 'bg-black/40 text-gray-500'
                    }`}
                  >
                    <div 
                      className="w-3 h-3 rounded-sm" 
                      style={{ backgroundColor: layers3D[layer.key as keyof typeof layers3D] ? layer.color : '#333' }}
                    />
                    {layer.label}
                  </button>
                ))}
              </div>
              
              {/* Download Buttons - Bottom Right */}
              <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
                <p className="text-[10px] text-gray-500 text-right mb-1">Download As</p>
                <div className="flex gap-2">
                  {[
                    { id: 'glb', label: 'GLB', desc: 'Blender' },
                    { id: 'stl', label: 'STL', desc: '3D Print' },
                    { id: '3dm', label: '3DM', desc: 'Rhino' },
                    { id: 'dae', label: 'DAE', desc: 'SketchUp' },
                  ].map(fmt => (
                    <button
                      key={fmt.id}
                      onClick={() => {
                        setFormat3D(fmt.id as 'glb' | 'stl' | '3dm' | 'dae')
                        setShow3DPreview(false)
                        setTimeout(() => generate3DModel(), 100)
                      }}
                      disabled={generating}
                      className="flex flex-col items-center px-3 py-2 bg-amber-500 hover:bg-amber-400 disabled:bg-gray-600 text-black rounded-lg transition-all"
                    >
                      <span className="text-xs font-bold">{fmt.label}</span>
                      <span className="text-[9px] opacity-70">{fmt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Three.js Viewer */}
              <ThreeViewer
                lat={selection.center?.lat || 0}
                lng={selection.center?.lng || 0}
                size={selection.size || size}
                layers={layers3D}
                themeColors={theme3D.preview}
              />
            </div>
          </div>
        )}

        {/* Mobile Bottom Panel */}
        <div 
          className={`md:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-out shadow-[0_-4px_20px_rgba(0,0,0,0.5)] ${
            showMobilePanel ? 'translate-y-0' : 'translate-y-[calc(100%-88px)]'
          }`}
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          {/* Handle bar to drag/toggle */}
          <div 
            onClick={() => setShowMobilePanel(!showMobilePanel)}
            className="bg-[#0a0a0a] border-t border-[#222] rounded-t-2xl cursor-pointer"
          >
            <div className="flex justify-center py-2">
              <div className="w-12 h-1 bg-gray-600 rounded-full" />
            </div>
            
            {/* Collapsed view - Quick actions */}
            {!showMobilePanel && (
              <div className="px-4 pb-4 flex items-center gap-2">
                {/* Location indicator or search prompt */}
                <div className="flex-1 bg-[#111] border border-[#222] rounded-lg px-3 py-2 text-sm">
                  {selection ? (
                    <span className="text-amber-400 truncate block">✓ {location || 'Location selected'}</span>
                  ) : (
                    <span className="text-gray-500">🔍 Tap to search location</span>
                  )}
                </div>
                
                {/* Quick preview/generate button */}
                {selection && !previewUrl && (
                  <button
                    onClick={(e) => { e.stopPropagation(); previewMap(); }}
                    disabled={previewLoading}
                    className="px-4 py-2 bg-amber-500 text-black rounded-lg font-medium text-sm"
                  >
                    {previewLoading ? '...' : 'Preview'}
                  </button>
                )}
                {previewUrl && (
                  <button
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if (exportMode === '3d') {
                        setShow3DPreview(true);
                      } else {
                        setShowLightbox(true); 
                      }
                    }}
                    className="px-4 py-2 bg-amber-500 text-black rounded-lg font-medium text-sm"
                  >
                    {exportMode === '3d' ? '3D View' : 'View'}
                  </button>
                )}
              </div>
            )}
          </div>
          
          {/* Expanded panel content */}
          <div className="bg-[#0a0a0a] max-h-[70vh] overflow-y-auto pb-20">
            <div className="p-4 space-y-4">
              {/* Location Search */}
              <div className="relative">
                <input 
                  type="text" 
                  value={location} 
                  onChange={(e) => { setLocation(e.target.value); setShowResults(false) }} 
                  onKeyDown={(e) => e.key === 'Enter' && searchLocation()} 
                  placeholder="🔍 Search location..." 
                  className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-lg text-white text-sm placeholder-gray-500 focus:border-amber-500/50 focus:outline-none" 
                />
                <button 
                  onClick={searchLocation} 
                  disabled={searchLoading}
                  className="absolute right-3 top-3 text-gray-500 hover:text-white disabled:opacity-50"
                >
                  {searchLoading ? (
                    <svg className="w-[18px] h-[18px] animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 11-6.219-8.56"/>
                    </svg>
                  ) : (
                    <SearchIcon />
                  )}
                </button>
                
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#161616] border border-[#222] rounded-lg overflow-hidden z-50 shadow-xl">
                    {searchResults.slice(0, 5).map((result, i) => (
                      <button 
                        key={i} 
                        onClick={() => { selectResult(result); setShowMobilePanel(false); }} 
                        className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-[#222] border-b border-[#222] last:border-0"
                      >
                        {result.place_name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selection Info + Size Slider */}
              {selection && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                    <span className="text-amber-500">✓</span>
                    <span className="text-amber-400/80 text-sm truncate flex-1">{location}</span>
                    <button onClick={clearSelection} className="text-gray-500 hover:text-red-400 p-1">
                      <TrashIcon />
                    </button>
                  </div>
                  {/* Area Size Slider */}
                  <div className="p-3 bg-[#111] rounded-lg">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-gray-500">Area Size</span>
                      <span className="text-amber-400">{selection.size || size}m × {selection.size || size}m</span>
                    </div>
                    <input
                      type="range"
                      min={250}
                      max={exportMode === '3d' ? 2000 : 3000}
                      step={50}
                      value={Math.min(selection.size || size, exportMode === '3d' ? 2000 : 3000)}
                      onChange={(e) => {
                        const newSize = Number(e.target.value)
                        setSize(newSize)
                        setSelection(prev => prev ? { ...prev, size: newSize } : null)
                      }}
                      className="w-full accent-amber-500"
                    />
                    <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                      <span>250m</span>
                      <span>{exportMode === '3d' ? '2000m' : '3000m'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Themes - Horizontal scroll */}
              <div>
                <div className="flex gap-1 mb-2 overflow-x-auto pb-1">
                  {THEME_CATEGORIES.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setActiveCategory(cat)} 
                      className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-all ${
                        activeCategory === cat 
                          ? 'bg-amber-500 text-black font-medium' 
                          : 'bg-[#1a1a1a] text-gray-500'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {ANALYSIS_THEMES.filter(t => t.category === activeCategory).map((theme) => (
                    <button 
                      key={theme.id} 
                      onClick={() => { setSelectedTheme(theme); setUseCustomColors(false) }} 
                      className={`w-14 h-14 flex-shrink-0 rounded-lg border-2 transition-all ${
                        selectedTheme.id === theme.id 
                          ? 'border-amber-500 ring-2 ring-amber-500/30' 
                          : 'border-[#333]'
                      }`} 
                      style={{ background: theme.colors.Zemin }}
                    >
                      <div className="w-full h-full p-1.5 flex flex-col gap-0.5">
                        <div className="flex-1 rounded-sm" style={{ background: theme.colors.Binalar }} />
                        <div className="h-1 rounded-sm" style={{ background: theme.colors.Yol_Otoyol }} />
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-center text-amber-500">{selectedTheme.name}</p>
              </div>

              {/* Preview & Generate */}
              <div className="space-y-3">
                {!previewUrl ? (
                  <button
                    onClick={previewMap}
                    disabled={previewLoading || !selection}
                    className={`w-full py-3.5 rounded-lg font-medium flex items-center justify-center gap-2 ${
                      selection 
                        ? 'bg-amber-500 text-black' 
                        : 'bg-[#1a1a1a] text-gray-500'
                    }`}
                  >
                    {previewLoading ? 'Creating preview...' : selection ? 'Preview (Free)' : 'Select location first'}
                  </button>
                ) : (
                  <>
                    <div 
                      onClick={() => { 
                        if (exportMode === '3d') {
                          setShow3DPreview(true);
                        } else {
                          setShowLightbox(true); 
                          setLightboxZoom(1); 
                        }
                      }}
                      className="cursor-pointer rounded-lg overflow-hidden border-2 border-amber-500/50"
                    >
                      <img src={previewUrl} alt="Preview" className="w-full" />
                      {exportMode === '3d' && (
                        <div className="bg-purple-500/20 text-purple-400 text-xs text-center py-1">
                          Tap for 3D View
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => exportMode === '3d' ? generate3DModel() : generateMap()} 
                      disabled={generating}
                      className="w-full py-3.5 bg-amber-500 text-black rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                      {generating ? 'Generating...' : exportMode === '3d' ? `Generate ${format3D.toUpperCase()}` : `Generate ${exportFormat.toUpperCase()}`}
                    </button>
                  </>
                )}
                
                {/* Pricing info */}
                <div className="text-center text-xs text-gray-500">
                  {exportMode === '3d' || exportFormat === 'dxf' ? (
                    <span className="text-amber-400">✨ Pro required</span>
                  ) : (
                    <span className="text-green-400">✓ {exportFormat.toUpperCase()} is free</span>
                  )}
                </div>
              </div>

              {/* Map Title - Mobile */}
              <div>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="Map title (optional)"
                  className="w-full px-3 py-2 bg-[#111] border border-[#222] rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Quick Options */}
              <div className="flex flex-wrap gap-2">
                {[
                  { state: showLabels, setter: setShowLabels, label: 'Labels' },
                  { state: showTransit, setter: setShowTransit, label: 'Transit' },
                  { state: showContours, setter: setShowContours, label: 'Contours' },
                  { state: showScale, setter: setShowScale, label: 'Scale' },
                  { state: showShadow, setter: setShowShadow, label: 'Shadow' },
                ].map(({ state, setter, label }) => (
                  <button
                    key={label}
                    onClick={() => setter(!state)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                      state 
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                        : 'bg-[#111] border-[#333] text-gray-500'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* 2D/3D Mode Toggle */}
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setExportMode('2d')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    exportMode === '2d' ? 'bg-amber-500 text-black' : 'bg-[#1a1a1a] text-gray-400'
                  }`}
                >
                  2D Map
                </button>
                <button
                  onClick={() => setExportMode('3d')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    exportMode === '3d' 
                      ? 'bg-amber-500 text-black' 
                      : !canExport3D
                        ? 'bg-[#1a1a1a] text-gray-500 border border-amber-500/30'
                        : 'bg-[#1a1a1a] text-gray-400'
                  }`}
                >
                  3D Model
                  {!canExport3D && (
                    <span className="absolute -top-1 -right-1 text-[8px] bg-amber-500 text-black px-1 rounded font-bold">PRO</span>
                  )}
                </button>
              </div>

              {/* Format selector */}
              {exportMode === '2d' ? (
                <div className="flex gap-2">
                  {[
                    { id: 'png', label: 'PNG', pro: false },
                    { id: 'svg', label: 'SVG', pro: true },
                    { id: 'dxf', label: 'DXF', pro: true },
                  ].map(fmt => (
                    <button
                      key={fmt.id}
                      onClick={() => setExportFormat(fmt.id as 'svg' | 'dxf' | 'png')}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all relative ${
                        exportFormat === fmt.id 
                          ? 'bg-amber-500 text-black' 
                          : fmt.pro && !canExportSVG
                            ? 'bg-[#1a1a1a] text-gray-500 border border-amber-500/30'
                            : 'bg-[#1a1a1a] text-gray-400'
                      }`}
                    >
                      {fmt.label}
                      {fmt.pro && !canExportSVG && (
                        <span className="absolute -top-1 -right-1 text-[8px] bg-amber-500 text-black px-1 rounded font-bold">PRO</span>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'glb', label: 'GLB' },
                      { id: 'stl', label: 'STL' },
                      { id: '3dm', label: '3DM' },
                      { id: 'dae', label: 'DAE' },
                    ].map(fmt => (
                      <button
                        key={fmt.id}
                        onClick={() => setFormat3D(fmt.id as 'glb' | 'stl' | '3dm' | 'dae')}
                        className={`py-2 rounded-lg text-sm font-medium transition-all ${
                          format3D === fmt.id ? 'bg-amber-500 text-black' : 'bg-[#1a1a1a] text-gray-400'
                        }`}
                      >
                        {fmt.label}
                      </button>
                    ))}
                  </div>
                  
                  {/* Layer toggles - mobile */}
                  <div className="flex gap-1.5 flex-wrap">
                    {[
                      { key: 'buildings', label: '🏢' },
                      { key: 'roads', label: '🛣️' },
                      { key: 'water', label: '💧' },
                      { key: 'green', label: '🌳' },
                    ].map(layer => (
                      <button
                        key={layer.key}
                        onClick={() => setLayers3D(prev => ({ ...prev, [layer.key]: !prev[layer.key as keyof typeof prev] }))}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          layers3D[layer.key as keyof typeof layers3D]
                            ? 'bg-amber-500/20 border border-amber-500/50'
                            : 'bg-[#1a1a1a] border border-transparent'
                        }`}
                      >
                        {layer.label}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setIncludeTerrain(!includeTerrain)}
                    className={`w-full py-2 rounded-lg text-sm border transition-all ${
                      includeTerrain 
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                        : 'bg-[#111] border-[#333] text-gray-500'
                    }`}
                  >
                    {includeTerrain ? '✓ ⛰️' : '⛰️'} Terrain
                  </button>
                  
                  {/* STL: Raft slider - Mobile */}
                  {format3D === 'stl' && (
                    <div className="px-3 py-2 bg-[#111] rounded-lg border border-[#333]">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-gray-300">📐 Print Raft</span>
                        <span className="text-xs text-amber-400 font-mono">
                          {raftThickness === 0 ? 'OFF' : `${raftThickness}mm`}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.5"
                        value={raftThickness}
                        onChange={(e) => setRaftThickness(parseFloat(e.target.value))}
                        className="w-full h-1 bg-[#333] rounded-lg appearance-none cursor-pointer
                                   [&::-webkit-slider-thumb]:appearance-none
                                   [&::-webkit-slider-thumb]:w-4
                                   [&::-webkit-slider-thumb]:h-4
                                   [&::-webkit-slider-thumb]:bg-amber-500
                                   [&::-webkit-slider-thumb]:rounded-full"
                      />
                    </div>
                  )}
                  
                  {/* 3D Preview Button - Mobile */}
                  {selection && (
                    <button
                      onClick={() => setShow3DPreview(true)}
                      className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Preview 3D
                    </button>
                  )}
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile overlay when panel is open */}
        {showMobilePanel && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setShowMobilePanel(false)}
          />
        )}

        {/* Map Area */}
        <main className="flex-1 relative bg-[#111]">
          <div ref={mapRef} className="w-full h-full" />
          
          {/* Instructions overlay - smaller on mobile */}
          <div className="absolute top-4 left-4 right-4 md:right-auto bg-[#161616]/95 backdrop-blur border border-[#222] rounded-xl px-3 py-2 md:px-4 md:py-3 z-10 pointer-events-none">
            <p className="text-gray-300 text-xs md:text-sm text-center md:text-left">
              {selectionMode === 'point' 
                ? '🎯 Tap on the map to select area' 
                : '📐 Tap and drag to draw rectangle'}
            </p>
          </div>
          
          {/* Theme preview widget - hidden on mobile - Shows only when area is selected */}
          {selection && (
            <div className="hidden md:block absolute bottom-4 left-4 bg-[#161616]/95 backdrop-blur border border-[#222] rounded-xl p-4 z-10">
              {exportMode === '2d' ? (
                <>
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
                </>
              ) : (
                <>
                  <p className="text-xs text-gray-500 mb-2 font-medium">3D Preview: {theme3D.name}</p>
                  <div className="w-48 h-32 rounded-lg overflow-hidden" style={{ background: `linear-gradient(180deg, ${theme3D.preview.terrain}88 0%, ${theme3D.preview.terrain} 100%)` }}>
                    <svg viewBox="0 0 200 130" className="w-full h-full">
                      {/* Ground/Terrain */}
                      <polygon points="100,120 10,85 100,50 190,85" fill={theme3D.preview.terrain} opacity="0.8"/>
                      <polygon points="100,120 10,85 100,50 190,85" fill="none" stroke={theme3D.preview.road} strokeWidth="0.5" opacity="0.5"/>
                      
                      {/* Main Road */}
                      <path d="M 30,72 L 170,98" stroke={theme3D.preview.road} strokeWidth="6" strokeLinecap="round" opacity="0.9"/>
                      <path d="M 100,85 L 100,50" stroke={theme3D.preview.road} strokeWidth="4" strokeLinecap="round" opacity="0.7"/>
                      
                      {/* Building 1 - Left Tall */}
                      <g>
                        <polygon points="35,75 35,30 50,22 50,67" fill={theme3D.preview.building}/>
                        <polygon points="35,30 75,42 75,87 35,75" fill={theme3D.preview.building} opacity="0.85"/>
                        <polygon points="35,30 50,22 90,34 75,42" fill={theme3D.preview.building} opacity="0.65"/>
                      </g>
                      
                      {/* Building 2 - Center Medium */}
                      <g>
                        <polygon points="85,82 85,55 100,48 100,75" fill={theme3D.preview.building}/>
                        <polygon points="85,55 120,67 120,94 85,82" fill={theme3D.preview.building} opacity="0.85"/>
                        <polygon points="85,55 100,48 135,60 120,67" fill={theme3D.preview.building} opacity="0.65"/>
                      </g>
                      
                      {/* Building 3 - Right Wide */}
                      <g>
                        <polygon points="130,92 130,68 145,61 145,85" fill={theme3D.preview.building}/>
                        <polygon points="130,68 175,82 175,106 130,92" fill={theme3D.preview.building} opacity="0.85"/>
                        <polygon points="130,68 145,61 190,75 175,82" fill={theme3D.preview.building} opacity="0.65"/>
                      </g>
                      
                      {/* Water - Ellipse */}
                      <ellipse cx="160" cy="112" rx="22" ry="10" fill={theme3D.preview.water} opacity="0.85"/>
                      <ellipse cx="160" cy="112" rx="18" ry="7" fill={theme3D.preview.water} opacity="0.5"/>
                      
                      {/* Trees/Green */}
                      <ellipse cx="25" cy="90" rx="12" ry="8" fill={theme3D.preview.green} opacity="0.9"/>
                      <ellipse cx="105" cy="105" rx="8" ry="5" fill={theme3D.preview.green} opacity="0.8"/>
                    </svg>
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Preview Lightbox - Full Screen with Zoom */}
      {showLightbox && previewUrl && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center"
          onClick={() => setShowLightbox(false)}
        >
          {/* Close button */}
          <button 
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white/60 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Side Ads - Desktop only, Free users only */}
          {!isPro && (
            <>
              <div className="hidden xl:block absolute left-4 top-1/2 -translate-y-1/2 w-[160px]" onClick={(e) => e.stopPropagation()}>
                <AdBanner slot="YOUR_AD_SLOT_3" format="vertical" />
              </div>
              <div className="hidden xl:block absolute right-20 top-1/2 -translate-y-1/2 w-[160px]" onClick={(e) => e.stopPropagation()}>
                <AdBanner slot="YOUR_AD_SLOT_3" format="vertical" />
              </div>
            </>
          )}
          
          {/* Zoom controls */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/70 px-4 py-2 rounded-full z-10">
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxZoom(Math.max(0.5, lightboxZoom - 0.25)); }}
              className="text-white/70 hover:text-white p-1"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35M8 11h6" />
              </svg>
            </button>
            <span className="text-white text-sm font-medium min-w-[60px] text-center">{Math.round(lightboxZoom * 100)}%</span>
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxZoom(Math.min(3, lightboxZoom + 0.25)); }}
              className="text-white/70 hover:text-white p-1"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
              </svg>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxZoom(1); }}
              className="text-white/50 hover:text-white text-xs ml-2"
            >
              Reset
            </button>
          </div>

          {/* Zoomable Image Container */}
          <div 
            className="flex-1 w-full overflow-auto flex items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => {
              e.preventDefault();
              const delta = e.deltaY > 0 ? -0.1 : 0.1;
              setLightboxZoom(Math.max(0.5, Math.min(3, lightboxZoom + delta)));
            }}
          >
            <img 
              src={previewUrl} 
              alt="Map Preview" 
              className="rounded-lg shadow-2xl transition-transform duration-200 max-w-full"
              style={{ transform: `scale(${lightboxZoom})`, transformOrigin: 'center' }}
              draggable={false}
            />
          </div>

          {/* Bottom bar with info and Generate button */}
          <div 
            className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black via-black/80 to-transparent"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-lg mx-auto flex flex-col items-center gap-3 md:gap-4">
              <p className="text-white/60 text-xs md:text-sm">
                {selectedTheme.name} • {selection?.size || size}m • {typeof window !== 'undefined' && 'ontouchstart' in window ? 'Pinch to zoom' : 'Scroll to zoom'}
              </p>
              
              {/* Main CTA - Context aware */}
              {exportFormat === 'png' ? (
                <button 
                  onClick={() => generateMap()} 
                  disabled={generating}
                  className="w-full max-w-sm flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-400 transition-all shadow-lg shadow-green-500/30 animate-pulse"
                >
                  {generating ? <LoaderIcon /> : <DownloadIcon />}
                  {generating ? 'Generating...' : '⬇ Download FREE PNG'}
                </button>
              ) : (
                <button 
                  onClick={() => exportMode === '3d' ? generate3DModel() : generateMap()} 
                  disabled={generating}
                  className="w-full max-w-sm flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-black rounded-xl font-bold text-lg hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/30"
                >
                  {generating ? <LoaderIcon /> : <DownloadIcon />}
                  {generating ? 'Generating...' : exportMode === '3d' ? `Generate ${format3D.toUpperCase()}` : `Generate ${exportFormat.toUpperCase()}`}
                </button>
              )}

              {/* Format switcher for non-logged users */}
              {!user && exportFormat !== 'png' && (
                <button
                  onClick={() => setExportFormat('png')}
                  className="text-white/70 hover:text-white text-sm underline underline-offset-2"
                >
                  Or download PNG for free →
                </button>
              )}
              
              {/* Pricing Info - Context Aware */}
              <div className="flex items-center gap-2 text-xs flex-wrap justify-center">
                {exportMode === '3d' ? (
                  // 3D requires Pro only
                  canExport3D ? (
                    <span className="text-green-400 font-medium">✓ 3D included in Pro</span>
                  ) : (
                    <>
                      <span className="text-amber-400 font-medium">✨ 3D requires Pro</span>
                      <Link href="/pricing" className="ml-2 px-3 py-1 bg-amber-500 text-black font-medium rounded-full hover:bg-amber-400 transition-colors">
                        Upgrade
                      </Link>
                    </>
                  )
                ) : exportFormat === 'png' ? (
                  // PNG is free
                  <span className="text-green-400 font-medium">✓ PNG is free</span>
                ) : exportFormat === 'svg' ? (
                  // SVG requires subscription
                  canExportSVG ? (
                    <span className="text-green-400 font-medium">✓ SVG included in your plan</span>
                  ) : (
                    <>
                      <span className="text-amber-400 font-medium">✨ SVG requires subscription</span>
                      <Link href="/pricing" className="ml-2 px-3 py-1 bg-amber-500 text-black font-medium rounded-full hover:bg-amber-400 transition-colors">
                        View Plans
                      </Link>
                    </>
                  )
                ) : exportFormat === 'dxf' ? (
                  // DXF requires subscription
                  canExportDXF ? (
                    <span className="text-green-400 font-medium">✓ DXF included in your plan</span>
                  ) : (
                    <>
                      <span className="text-amber-400 font-medium">✨ DXF requires subscription</span>
                      <Link href="/pricing" className="ml-2 px-3 py-1 bg-amber-500 text-black font-medium rounded-full hover:bg-amber-400 transition-colors">
                        View Plans
                      </Link>
                    </>
                  )
                ) : null}
                {(isPro || hasUnlimitedSvg) && (
                  <>
                    <span className="text-white/30">•</span>
                    <span className="text-amber-400 font-medium">{isPro ? '✨ Pro' : '✨ Unlimited'}</span>
                  </>
                )}
              </div>
              
              {/* Instagram Follow CTA - Shows after successful download */}
              {generated && (
                <div className="flex items-center gap-2 text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-4 py-2 rounded-full">
                  <span className="text-white/90">✓ Downloaded!</span>
                  <span className="text-white/50">•</span>
                  <span className="text-white/70">Support us & never miss updates →</span>
                  <a 
                    href="https://instagram.com/archikekapp" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-pink-400 font-medium hover:text-pink-300 transition-colors"
                  >
                    @archikekapp
                  </a>
                </div>
              )}
              
              <button 
                onClick={() => setShowLightbox(false)}
                className="text-white/40 hover:text-white text-sm transition-colors"
              >
                Click anywhere or press ESC to close
              </button>
            </div>
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

      {/* Sticky Pro Banner - Only for non-Pro users */}
      {!canExportSVG && !showLoginModal && !showProModal && !showPngComparePopup && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-amber-500/10 via-[#0a0a0a] to-amber-500/10 border-t border-amber-500/30">
          <div className="flex items-center justify-between px-4 sm:px-8 py-2.5">
            {/* Left */}
            <div className="flex items-center gap-2">
              <span className="text-amber-500 text-lg">✨</span>
              <span className="text-amber-200/80 text-sm hidden md:inline">Unlock vector exports</span>
            </div>
            
            {/* Center - Full width options */}
            <div className="flex items-center gap-4 sm:gap-8 md:gap-16">
              <button
                onClick={() => setShowProModal(true)}
                className="group flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
              >
                <span className="text-gray-300 font-medium text-sm sm:text-base">SVG + DXF</span>
                <span className="text-white font-bold text-base sm:text-lg">${unlimitedPrice}<span className="text-amber-500/70 text-xs sm:text-sm font-normal">/mo</span></span>
              </button>
              
              <div className="w-px h-6 bg-amber-500/30"></div>
              
              <button
                onClick={() => setShowProModal(true)}
                className="group flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
              >
                <span className="text-gray-300 font-medium text-sm sm:text-base">Pro <span className="text-amber-400">+3D</span></span>
                <span className="text-white font-bold text-base sm:text-lg">${proPrice}<span className="text-amber-500/70 text-xs sm:text-sm font-normal">/mo</span></span>
              </button>
            </div>
            
            {/* Right */}
            <div className="flex items-center gap-3 sm:gap-4">
              {discount && (
                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded font-bold animate-pulse">
                  {discount.percent}% OFF
                </span>
              )}
              <button
                onClick={() => setShowProModal(true)}
                className="px-4 sm:px-6 py-1.5 bg-amber-500 text-black rounded-full text-sm font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PNG vs SVG Comparison Popup */}
      {showPngComparePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowPngComparePopup(false)} />
          
          <div className="relative bg-[#0a0a0a] border border-[#222] rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            {/* Close button */}
            <button 
              onClick={() => setShowPngComparePopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-1">PNG Downloaded! 🎉</h3>
              <p className="text-gray-400 text-sm">Want even better quality?</p>
            </div>

            {/* Comparison */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* PNG */}
              <div className="bg-[#111] border border-[#222] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-green-500">✓</span>
                  <span className="font-medium">PNG</span>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">FREE</span>
                </div>
                <ul className="text-xs text-gray-400 space-y-1.5">
                  <li>• Raster image</li>
                  <li>• Good for web</li>
                  <li>• Fixed resolution</li>
                  <li className="text-red-400">• Blurry when scaled</li>
                </ul>
              </div>

              {/* SVG */}
              <div className="bg-[#111] border border-amber-500/50 rounded-xl p-4 relative">
                <div className="absolute -top-2 -right-2 text-xs bg-amber-500 text-black px-2 py-0.5 rounded-full font-bold">
                  PRO
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-amber-500">★</span>
                  <span className="font-medium">SVG</span>
                </div>
                <ul className="text-xs text-gray-400 space-y-1.5">
                  <li className="text-amber-400">• Vector graphics</li>
                  <li className="text-amber-400">• Infinite scaling</li>
                  <li className="text-amber-400">• Editable layers</li>
                  <li className="text-amber-400">• Print-ready quality</li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowPngComparePopup(false)
                  setShowProModal(true)
                }}
                className="w-full py-3 bg-amber-500 text-black rounded-xl font-semibold hover:bg-amber-400 transition-colors"
              >
                Upgrade to Pro — ${proPrice}/mo
                {discount && <span className="ml-2 text-sm opacity-80">({discount.percent}% off)</span>}
              </button>
              <button
                onClick={() => setShowPngComparePopup(false)}
                className="w-full py-2 text-gray-500 text-sm hover:text-gray-300 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
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
              onClick={() => {
                // Save current map state before redirect
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
                signInWithGoogle()
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
                // Save return URL so we come back here after login
                localStorage.setItem('archikek_return_url', '/create')
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
                  PNG Free
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
                  // Save return URL so we come back here after login
                  localStorage.setItem('archikek_return_url', '/create')
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

      {/* Pro Required Modal */}
      {showProModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowProModal(false)} />
          
          <div className="relative bg-[#0a0a0a] border border-amber-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            <button 
              onClick={() => setShowProModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Pro Icon */}
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>

            <h3 className="text-2xl font-semibold text-center mb-2">
              Pro Feature ✨
            </h3>
            <p className="text-gray-400 text-center text-sm mb-6">
              {exportMode === '3d' 
                ? '3D Model export (GLB, STL, 3DM, DAE) requires Pro subscription'
                : 'DXF export for AutoCAD/Rhino requires Pro subscription'
              }
            </p>

            {/* What's included */}
            <div className="bg-[#111] border border-[#222] rounded-xl p-4 mb-6">
              <p className="text-amber-400 text-sm font-medium mb-3">Pro includes:</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited SVG & PNG exports
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  DXF export (AutoCAD, Rhino)
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  3D Models (GLB, STL, 3DM, DAE)
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All 34 themes & customization
                </li>
              </ul>
            </div>

            <Link
              href="/pricing"
              className="block w-full px-4 py-3.5 bg-amber-500 text-black rounded-xl font-semibold hover:bg-amber-400 transition-colors text-center"
            >
              Upgrade to Pro →
            </Link>

            {/* Free option reminder */}
            <p className="text-center text-gray-500 text-xs mt-4">
              PNG exports are always free
            </p>
          </div>
        </div>
      )}

      {/* Upsell Popup for PNG users */}
      <UpsellPopup
        isOpen={showUpsellPopup}
        onClose={() => setShowUpsellPopup(false)}
        onContinueFree={() => {
          hasSeenUpsell.current = true
          setShowUpsellPopup(false)
          executeMapGeneration()
        }}
        discount={discount}
      />

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
            <h3 className="text-xl font-semibold mb-2">
              {exportMode === '3d' ? '3D Model Downloaded!' : 'Map Downloaded!'}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {exportMode === '3d' 
                ? `Your ${format3D.toUpperCase()} file has been downloaded. Open it in Rhino, SketchUp, Blender or any 3D software.`
                : `Your ${exportFormat.toUpperCase()} file has been downloaded. Open it in Adobe Illustrator or any vector editor.`
              }
            </p>
            <button
              onClick={() => setGenerated(false)}
              className="w-full px-5 py-3 bg-amber-500 text-black rounded-xl font-semibold hover:bg-amber-400 transition-colors"
            >
              {exportMode === '3d' ? 'Create Another Model' : 'Create Another Map'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
