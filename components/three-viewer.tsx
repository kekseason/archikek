'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface ThemeColors {
  terrain: string
  building: string
  road: string
  water: string
  green: string
}

interface ThreeViewerProps {
  lat?: number
  lng?: number
  size?: number
  layers?: {
    buildings: boolean
    roads: boolean
    water: boolean
    green: boolean
  }
  themeColors?: ThemeColors
}

// Convert hex to THREE.Color number
function hexToNumber(hex: string): number {
  return parseInt(hex.replace('#', ''), 16)
}

export default function ThreeViewer({ lat, lng, size = 500, layers, themeColors }: ThreeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const meshGroupsRef = useRef<{ [key: string]: THREE.Group }>({})
  const frameIdRef = useRef<number>(0)
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Default colors if no theme provided
  const colors = themeColors || {
    terrain: '#1a1a1a',
    building: '#666666',
    road: '#444444',
    water: '#4a90d9',
    green: '#228b22'
  }

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return

    // Scene
    const scene = new THREE.Scene()
    // Use terrain color for background, darkened slightly
    const bgColor = themeColors ? hexToNumber(themeColors.terrain) : 0x0a0a0a
    scene.background = new THREE.Color(bgColor).multiplyScalar(0.5)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      1,
      10000
    )
    camera.position.set(size * 0.8, size * 0.6, size * 0.8)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.maxPolarAngle = Math.PI / 2.1
    controls.minDistance = 50
    controls.maxDistance = size * 3
    controlsRef.current = controls

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(size * 0.5, size, size * 0.5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.near = 1
    directionalLight.shadow.camera.far = size * 3
    directionalLight.shadow.camera.left = -size
    directionalLight.shadow.camera.right = size
    directionalLight.shadow.camera.top = size
    directionalLight.shadow.camera.bottom = -size
    scene.add(directionalLight)

    // Grid helper only (no ground plane - terrain data will serve as ground)
    const gridHelper = new THREE.GridHelper(size * 2, 20, 0x333333, 0x222222)
    gridHelper.position.y = -1 // Slightly below terrain to avoid z-fighting
    scene.add(gridHelper)

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    // Keyboard controls for camera rotation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!controls || !camera) return
      
      const rotateSpeed = 0.05
      const panSpeed = size * 0.05
      
      switch (e.key) {
        case 'ArrowLeft':
          controls.autoRotate = false
          // Rotate camera around target (orbit left)
          const angleLeft = rotateSpeed
          const xLeft = camera.position.x - controls.target.x
          const zLeft = camera.position.z - controls.target.z
          camera.position.x = controls.target.x + xLeft * Math.cos(angleLeft) - zLeft * Math.sin(angleLeft)
          camera.position.z = controls.target.z + xLeft * Math.sin(angleLeft) + zLeft * Math.cos(angleLeft)
          camera.lookAt(controls.target)
          break
        case 'ArrowRight':
          controls.autoRotate = false
          // Rotate camera around target (orbit right)
          const angleRight = -rotateSpeed
          const xRight = camera.position.x - controls.target.x
          const zRight = camera.position.z - controls.target.z
          camera.position.x = controls.target.x + xRight * Math.cos(angleRight) - zRight * Math.sin(angleRight)
          camera.position.z = controls.target.z + xRight * Math.sin(angleRight) + zRight * Math.cos(angleRight)
          camera.lookAt(controls.target)
          break
        case 'ArrowUp':
          controls.autoRotate = false
          // Move camera up (increase Y, decrease distance)
          camera.position.y = Math.min(camera.position.y + panSpeed, size * 2)
          camera.lookAt(controls.target)
          break
        case 'ArrowDown':
          controls.autoRotate = false
          // Move camera down
          camera.position.y = Math.max(camera.position.y - panSpeed, size * 0.1)
          camera.lookAt(controls.target)
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKeyDown)
      cancelAnimationFrame(frameIdRef.current)
      controls.dispose()
      renderer.dispose()
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [size])

  // Fetch and render 3D data
  useEffect(() => {
    if (!lat || !lng || !sceneRef.current) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://web-production-64f4.up.railway.app'
        
        const response = await fetch(`${API_URL}/preview-3d`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lat, lng, size })
        })

        if (!response.ok) {
          throw new Error('Failed to load 3D preview')
        }

        const data = await response.json()
        
        // Clear existing meshes
        Object.values(meshGroupsRef.current).forEach(group => {
          sceneRef.current?.remove(group)
        })
        meshGroupsRef.current = {}

        // Create mesh groups for each layer
        const layerConfigs = [
          { key: 'terrain', color: hexToNumber(colors.terrain), data: data.terrain },
          { key: 'buildings', color: hexToNumber(colors.building), data: data.buildings },
          { key: 'roads', color: hexToNumber(colors.road), data: data.roads },
          { key: 'water', color: hexToNumber(colors.water), data: data.water },
          { key: 'green', color: hexToNumber(colors.green), data: data.green },
        ]

        layerConfigs.forEach(({ key, color, data: layerData }) => {
          if (!layerData?.vertices?.length || !layerData?.faces?.length) return

          const group = new THREE.Group()
          group.name = key

          const geometry = new THREE.BufferGeometry()
          
          // Convert vertices
          const vertices: number[] = []
          layerData.vertices.forEach((v: number[]) => {
            vertices.push(v[0], v[1], v[2])
          })
          
          // Convert faces to indices
          const indices: number[] = []
          layerData.faces.forEach((f: number[]) => {
            indices.push(f[0], f[1], f[2])
          })

          geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
          geometry.setIndex(indices)
          geometry.computeVertexNormals()

          const material = new THREE.MeshStandardMaterial({
            color,
            roughness: 0.7,
            metalness: 0.1,
            side: THREE.DoubleSide
          })

          const mesh = new THREE.Mesh(geometry, material)
          mesh.castShadow = true
          mesh.receiveShadow = true
          group.add(mesh)

          meshGroupsRef.current[key] = group
          sceneRef.current?.add(group)
        })

        setLoading(false)
      } catch (err: any) {
        console.error('3D Preview error:', err)
        setError(err.message || 'Failed to load 3D preview')
        setLoading(false)
      }
    }

    fetchData()
  }, [lat, lng, size, colors])

  // Update layer visibility
  useEffect(() => {
    if (!layers) return
    
    Object.entries(layers).forEach(([key, visible]) => {
      const group = meshGroupsRef.current[key]
      if (group) {
        group.visible = visible
      }
    })
  }, [layers])

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px] relative">
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-[#0a0a0a]/80 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading 3D model...</p>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 bg-[#0a0a0a]/80 flex items-center justify-center z-10">
          <div className="text-center p-4">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-red-400 mb-2">{error}</p>
            <p className="text-gray-500 text-sm">Try selecting a different location</p>
          </div>
        </div>
      )}

      {/* Controls hint */}
      {!loading && !error && (
        <div className="absolute bottom-4 left-4 text-xs text-gray-500 bg-black/50 px-2 py-1 rounded">
          🖱️ Drag to rotate • Scroll to zoom • ⌨️ Arrow keys to orbit
        </div>
      )}
    </div>
  )
}
