'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

// ============================================================
// ANALYSIS THEMES (12 TEMA)
// ============================================================

const ANALYSIS_THEMES = [
  {
    id: 'figure_ground',
    name: 'Figure Ground',
    description: 'Classic building-void relationship',
    category: 'Urban Form',
    colors: {
      Zemin: '#ffffff', Binalar: '#1a1a1a', Bina_Stroke: '#1a1a1a', Su: '#e8e8e8', Yesil: '#f0f0f0',
      Yol_Otoyol: '#d64045', Yol_Birincil: '#cccccc', Yol_Ikincil: '#dddddd', Yol_Konut: '#eeeeee',
      Yol_Yaya: '#f5f5f5', Yol_Bisiklet: '#aaaaaa', Metro: '#e63946', Tram: '#2a9d8f', Bus: '#e9c46a', Ferry: '#264653', Metin: '#333333'
    }
  },
  {
    id: 'nolli',
    name: 'Nolli Map',
    description: 'Public vs private space',
    category: 'Urban Form',
    colors: {
      Zemin: '#0d0d0d', Binalar: '#ffffff', Bina_Stroke: '#ffffff', Su: '#2c2c2c', Yesil: '#1a1a1a',
      Yol_Otoyol: '#ff6b6b', Yol_Birincil: '#333333', Yol_Ikincil: '#222222', Yol_Konut: '#1a1a1a',
      Yol_Yaya: '#444444', Yol_Bisiklet: '#4ecdc4', Metro: '#ff6b6b', Tram: '#4ecdc4', Bus: '#ffe66d', Ferry: '#95e1d3', Metin: '#ffffff'
    }
  },
  {
    id: 'street_hierarchy',
    name: 'Street Hierarchy',
    description: 'Road network analysis',
    category: 'Mobility',
    colors: {
      Zemin: '#1a1a2e', Binalar: '#252540', Bina_Stroke: '#252540', Su: '#1e3a5f', Yesil: '#1e3326',
      Yol_Otoyol: '#ff0000', Yol_Birincil: '#ff6600', Yol_Ikincil: '#ffcc00', Yol_Konut: '#88cc88',
      Yol_Yaya: '#66aaff', Yol_Bisiklet: '#ff66ff', Metro: '#ff0000', Tram: '#00ccff', Bus: '#ffcc00', Ferry: '#00ffcc', Metin: '#ffffff'
    }
  },
  {
    id: 'transit_analysis',
    name: 'Transit Analysis',
    description: 'Public transportation',
    category: 'Mobility',
    colors: {
      Zemin: '#0f0f1a', Binalar: '#1a1a2e', Bina_Stroke: '#252540', Su: '#1e3a5f', Yesil: '#1a2e1a',
      Yol_Otoyol: '#333344', Yol_Birincil: '#2a2a3a', Yol_Ikincil: '#222233', Yol_Konut: '#1a1a2a',
      Yol_Yaya: '#333344', Yol_Bisiklet: '#00ff88', Metro: '#ff0055', Tram: '#00ccff', Bus: '#ffcc00', Ferry: '#00ffcc', Metin: '#ffffff'
    }
  },
  {
    id: 'green_space',
    name: 'Green Space',
    description: 'Parks and vegetation',
    category: 'Environment',
    colors: {
      Zemin: '#f5f9f5', Binalar: '#d4d4d4', Bina_Stroke: '#c4c4c4', Su: '#7fcdff', Yesil: '#2d8a2d',
      Yol_Otoyol: '#888888', Yol_Birincil: '#aaaaaa', Yol_Ikincil: '#cccccc', Yol_Konut: '#dddddd',
      Yol_Yaya: '#90c090', Yol_Bisiklet: '#4caf50', Metro: '#666666', Tram: '#666666', Bus: '#666666', Ferry: '#4a90a4', Metin: '#333333'
    }
  },
  {
    id: 'blue_green',
    name: 'Blue-Green Network',
    description: 'Water and green corridors',
    category: 'Environment',
    colors: {
      Zemin: '#f0f4f8', Binalar: '#c8d4dc', Bina_Stroke: '#b8c4cc', Su: '#2196f3', Yesil: '#4caf50',
      Yol_Otoyol: '#78909c', Yol_Birincil: '#90a4ae', Yol_Ikincil: '#b0bec5', Yol_Konut: '#cfd8dc',
      Yol_Yaya: '#81c784', Yol_Bisiklet: '#66bb6a', Metro: '#455a64', Tram: '#1976d2', Bus: '#ffa726', Ferry: '#0288d1', Metin: '#263238'
    }
  },
  {
    id: 'density_study',
    name: 'Density Study',
    description: 'Building mass analysis',
    category: 'Urban Form',
    colors: {
      Zemin: '#fafafa', Binalar: '#8b2635', Bina_Stroke: '#6b1625', Su: '#e8e8e8', Yesil: '#f0f0f0',
      Yol_Otoyol: '#1a1a1a', Yol_Birincil: '#c4c4c4', Yol_Ikincil: '#dedede', Yol_Konut: '#ebebeb',
      Yol_Yaya: '#d0d0d0', Yol_Bisiklet: '#4caf50', Metro: '#1a1a1a', Tram: '#8b2635', Bus: '#e9724c', Ferry: '#255f85', Metin: '#333333'
    }
  },
  {
    id: 'pedestrian_flow',
    name: 'Pedestrian Flow',
    description: 'Walkability analysis',
    category: 'Mobility',
    colors: {
      Zemin: '#1a1a1a', Binalar: '#2d2d2d', Bina_Stroke: '#3d3d3d', Su: '#1e3a5f', Yesil: '#1a3a1a',
      Yol_Otoyol: '#333333', Yol_Birincil: '#444444', Yol_Ikincil: '#555555', Yol_Konut: '#666666',
      Yol_Yaya: '#ff9800', Yol_Bisiklet: '#8bc34a', Metro: '#f44336', Tram: '#2196f3', Bus: '#ffeb3b', Ferry: '#00bcd4', Metin: '#ffffff'
    }
  },
  {
    id: 'land_use',
    name: 'Land Use',
    description: 'Zoning classification',
    category: 'Planning',
    colors: {
      Zemin: '#f5f5f5', Binalar: '#ff8a65', Bina_Stroke: '#e57350', Su: '#4fc3f7', Yesil: '#81c784',
      Yol_Otoyol: '#5d4037', Yol_Birincil: '#795548', Yol_Ikincil: '#8d6e63', Yol_Konut: '#a1887f',
      Yol_Yaya: '#bcaaa4', Yol_Bisiklet: '#66bb6a', Metro: '#c62828', Tram: '#1565c0', Bus: '#f9a825', Ferry: '#00838f', Metin: '#333333'
    }
  },
  {
    id: 'historical',
    name: 'Historical Layer',
    description: 'Heritage documentation',
    category: 'Documentation',
    colors: {
      Zemin: '#f4efe4', Binalar: '#5d4037', Bina_Stroke: '#4e342e', Su: '#d7ccc8', Yesil: '#a1887f',
      Yol_Otoyol: '#3e2723', Yol_Birincil: '#5d4037', Yol_Ikincil: '#6d4c41', Yol_Konut: '#8d6e63',
      Yol_Yaya: '#a1887f', Yol_Bisiklet: '#5d4037', Metro: '#5d4037', Tram: '#3e2723', Bus: '#8d6e63', Ferry: '#4e342e', Metin: '#3e2723'
    }
  },
  {
    id: 'blueprint',
    name: 'Blueprint',
    description: 'Technical drawing style',
    category: 'Documentation',
    colors: {
      Zemin: '#0a2342', Binalar: '#ffffff', Bina_Stroke: '#ffffff', Su: '#153a5c', Yesil: '#1a4468',
      Yol_Otoyol: '#ffffff', Yol_Birincil: '#4a7faa', Yol_Ikincil: '#3a6a96', Yol_Konut: '#2a5580',
      Yol_Yaya: '#5a8fba', Yol_Bisiklet: '#7ec8ac', Metro: '#ff6b6b', Tram: '#4ecdc4', Bus: '#ffe66d', Ferry: '#f8b500', Metin: '#ffffff'
    }
  },
  {
    id: 'presentation',
    name: 'Presentation',
    description: 'Clean professional style',
    category: 'Documentation',
    colors: {
      Zemin: '#ffffff', Binalar: '#37474f', Bina_Stroke: '#263238', Su: '#81d4fa', Yesil: '#a5d6a7',
      Yol_Otoyol: '#ef5350', Yol_Birincil: '#78909c', Yol_Ikincil: '#90a4ae', Yol_Konut: '#b0bec5',
      Yol_Yaya: '#cfd8dc', Yol_Bisiklet: '#66bb6a', Metro: '#e53935', Tram: '#1e88e5', Bus: '#fdd835', Ferry: '#00acc1', Metin: '#263238'
    }
  },
  {
    id: 'topographic',
    name: 'Topographic',
    description: 'Elevation contour focused',
    category: 'Environment',
    colors: {
      Zemin: '#faf8f5', Binalar: '#8b4513', Bina_Stroke: '#6b3510', Su: '#4a90a4', Yesil: '#6b8e23',
      Yol_Otoyol: '#d32f2f', Yol_Birincil: '#f57c00', Yol_Ikincil: '#fbc02d', Yol_Konut: '#bdbdbd',
      Yol_Yaya: '#9e9e9e', Yol_Bisiklet: '#388e3c', Metro: '#d32f2f', Tram: '#1976d2', Bus: '#fbc02d', Ferry: '#0288d1', Metin: '#3e2723'
    }
  },
]

const THEME_CATEGORIES = ['Urban Form', 'Mobility', 'Environment', 'Planning', 'Documentation']

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

export default function CreatePage() {
  const { user, profile, loading: authLoading, signOut, refreshProfile } = useAuth()
  const router = useRouter()
  
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
  const [showContours, setShowContours] = useState(true)
  const [contourInterval, setContourInterval] = useState(5)
  const [showLabels, setShowLabels] = useState(true)
  const [exportFormat, setExportFormat] = useState<'svg' | 'dxf'>('svg')
  const [resolution, setResolution] = useState(1200)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  
  // UI State
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
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

  // Sync colors with theme
  useEffect(() => {
    if (!useCustomColors) setCustomColors(selectedTheme.colors)
  }, [selectedTheme, useCustomColors])

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
      router.push('/login')
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

      const requestBody = {
        theme: selectedTheme.id,
        format: 'svg',
        resolution: 600,  // Low res for preview
        show_transit: showTransit,
        show_scale: showScale,
        show_contours: showContours,
        show_labels: showLabels,
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
        throw new Error('Preview failed')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      setPreviewUrl(url)
    } catch (err: any) {
      setError('Preview failed. Try again.')
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
                    onClick={() => { setSelectedTheme(theme); setUseCustomColors(false); setPreviewUrl(null) }} 
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
                  { checked: transparent, onChange: setTransparent, label: 'Transparent background' }
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
                  <span className="text-xs text-amber-500 font-medium">✓ Preview Ready</span>
                  <button 
                    onClick={() => { setPreviewUrl(null); window.URL.revokeObjectURL(previewUrl) }}
                    className="text-xs text-gray-500 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <img 
                  src={previewUrl} 
                  alt="Map Preview" 
                  className="w-full rounded border border-[#333]"
                />
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
