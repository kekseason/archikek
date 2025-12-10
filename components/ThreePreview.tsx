'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface Preview3DData {
  buildings: { vertices: number[][], faces: number[][] }
  roads: { vertices: number[][], faces: number[][] }
  water: { vertices: number[][], faces: number[][] }
  green: { vertices: number[][], faces: number[][] }
}

interface ThreePreviewProps {
  lat: number
  lng: number
  size: number
  onClose: () => void
}

// Layer colors
const LAYER_COLORS = {
  buildings: 0xcccccc,  // Light gray
  roads: 0x444444,      // Dark gray
  water: 0x4a90d9,      // Blue
  green: 0x7cb342       // Green
}

export default function ThreePreview({ lat, lng, size, onClose }: ThreePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [layers, setLayers] = useState({
    buildings: true,
    roads: true,
    water: true,
    green: true
  })
  
  const sceneRef = useRef<THREE.Scene | null>(null)
  const meshesRef = useRef<{ [key: string]: THREE.Mesh }>({})

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1a1a1a)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      1,
      10000
    )
    camera.position.set(500, 500, 500)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.maxPolarAngle = Math.PI / 2.1

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(200, 500, 300)
    scene.add(directionalLight)

    // Grid helper
    const gridHelper = new THREE.GridHelper(size, 20, 0x333333, 0x222222)
    scene.add(gridHelper)

    // Fetch preview data
    const fetchPreview = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preview-3d`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lat, lng, size: Math.min(size, 500) })
        })

        if (!response.ok) throw new Error('Failed to load preview')

        const data: Preview3DData = await response.json()
        
        // Create meshes for each layer
        Object.entries(data).forEach(([layerName, layerData]) => {
          if (!layerData.vertices.length) return

          const geometry = new THREE.BufferGeometry()
          
          // Flatten vertices
          const positions: number[] = []
          layerData.vertices.forEach((v: number[]) => {
            positions.push(v[0], v[1], v[2])
          })
          
          // Flatten faces (indices)
          const indices: number[] = []
          layerData.faces.forEach((f: number[]) => {
            indices.push(f[0], f[1], f[2])
          })

          geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
          geometry.setIndex(indices)
          geometry.computeVertexNormals()

          const material = new THREE.MeshLambertMaterial({
            color: LAYER_COLORS[layerName as keyof typeof LAYER_COLORS] || 0xcccccc,
            side: THREE.DoubleSide
          })

          const mesh = new THREE.Mesh(geometry, material)
          mesh.name = layerName
          scene.add(mesh)
          meshesRef.current[layerName] = mesh
        })

        // Center camera on model
        const box = new THREE.Box3().setFromObject(scene)
        const center = box.getCenter(new THREE.Vector3())
        controls.target.copy(center)
        
        setLoading(false)
      } catch (err: any) {
        setError(err.message || 'Failed to load 3D preview')
        setLoading(false)
      }
    }

    fetchPreview()

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [lat, lng, size])

  // Toggle layer visibility
  const toggleLayer = (layerName: string) => {
    setLayers(prev => {
      const newState = { ...prev, [layerName]: !prev[layerName as keyof typeof prev] }
      
      // Update mesh visibility
      const mesh = meshesRef.current[layerName]
      if (mesh) {
        mesh.visible = newState[layerName as keyof typeof newState]
      }
      
      return newState
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#333]">
        <div className="flex items-center gap-4">
          <h2 className="text-white font-semibold">3D Preview</h2>
          
          {/* Layer toggles */}
          <div className="flex gap-2">
            {Object.entries(layers).map(([name, visible]) => (
              <button
                key={name}
                onClick={() => toggleLayer(name)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  visible 
                    ? 'bg-amber-500 text-black' 
                    : 'bg-[#333] text-gray-500'
                }`}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* 3D Viewport */}
      <div ref={containerRef} className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#111]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-gray-400">Loading 3D preview...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#111]">
            <div className="text-center">
              <p className="text-red-400 mb-2">{error}</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#333] text-white rounded-lg hover:bg-[#444]"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controls hint */}
      <div className="p-3 border-t border-[#333] text-center text-xs text-gray-500">
        <span className="mr-4">🖱️ Left drag: Rotate</span>
        <span className="mr-4">🖱️ Right drag: Pan</span>
        <span>🖱️ Scroll: Zoom</span>
      </div>
    </div>
  )
}
