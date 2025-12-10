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

interface ThreeViewerProps {
  lat: number
  lng: number
  size: number
  layers: {
    buildings: boolean
    roads: boolean
    water: boolean
    green: boolean
  }
  onLoad?: () => void
  onError?: (error: string) => void
}

// Layer colors
const COLORS = {
  buildings: 0x444444,
  roads: 0x666666,
  water: 0x4a90d9,
  green: 0x5a8f5a,
  ground: 0x1a1a1a,
  ambient: 0xffffff,
  directional: 0xffffff,
  background: 0x0a0a0a
}

export default function ThreeViewer({ 
  lat, 
  lng, 
  size, 
  layers,
  onLoad,
  onError 
}: ThreeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const meshesRef = useRef<{ [key: string]: THREE.Mesh }>({})
  const frameRef = useRef<number>(0)
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(COLORS.background)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000)
    camera.position.set(size * 0.8, size * 0.6, size * 0.8)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 100
    controls.maxDistance = size * 3
    controls.maxPolarAngle = Math.PI / 2.1
    controlsRef.current = controls

    // Lights
    const ambientLight = new THREE.AmbientLight(COLORS.ambient, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(COLORS.directional, 0.8)
    directionalLight.position.set(size, size, size * 0.5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.near = 1
    directionalLight.shadow.camera.far = size * 4
    const shadowSize = size * 1.5
    directionalLight.shadow.camera.left = -shadowSize
    directionalLight.shadow.camera.right = shadowSize
    directionalLight.shadow.camera.top = shadowSize
    directionalLight.shadow.camera.bottom = -shadowSize
    scene.add(directionalLight)

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(size * 2, size * 2)
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: COLORS.ground,
      roughness: 0.9
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameRef.current)
      controls.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [size])

  // Fetch and render 3D data
  useEffect(() => {
    const fetchPreview = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preview-3d`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lat, lng, size: Math.min(size, 500) })
        })

        if (!response.ok) {
          throw new Error('Failed to fetch 3D preview')
        }

        const data: Preview3DData = await response.json()
        renderMeshes(data)
        onLoad?.()

      } catch (err: any) {
        const errorMsg = err.message || 'Failed to load 3D preview'
        setError(errorMsg)
        onError?.(errorMsg)
      } finally {
        setLoading(false)
      }
    }

    if (lat && lng && size) {
      fetchPreview()
    }
  }, [lat, lng, size])

  // Update layer visibility
  useEffect(() => {
    Object.entries(layers).forEach(([layerName, visible]) => {
      const mesh = meshesRef.current[layerName]
      if (mesh) {
        mesh.visible = visible
      }
    })
  }, [layers])

  const renderMeshes = (data: Preview3DData) => {
    if (!sceneRef.current) return

    // Remove old meshes
    Object.values(meshesRef.current).forEach(mesh => {
      sceneRef.current?.remove(mesh)
      mesh.geometry.dispose()
      if (mesh.material instanceof THREE.Material) {
        mesh.material.dispose()
      }
    })
    meshesRef.current = {}

    // Create meshes for each layer
    const layerConfigs: { key: keyof Preview3DData, color: number }[] = [
      { key: 'buildings', color: COLORS.buildings },
      { key: 'roads', color: COLORS.roads },
      { key: 'water', color: COLORS.water },
      { key: 'green', color: COLORS.green },
    ]

    layerConfigs.forEach(({ key, color }) => {
      const layerData = data[key]
      if (!layerData || !layerData.vertices.length) return

      const geometry = new THREE.BufferGeometry()
      
      // Flatten vertices
      const positions: number[] = []
      layerData.vertices.forEach(v => {
        positions.push(v[0], v[1], v[2])
      })
      
      // Flatten faces (indices)
      const indices: number[] = []
      layerData.faces.forEach(f => {
        indices.push(f[0], f[1], f[2])
      })

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geometry.setIndex(indices)
      geometry.computeVertexNormals()

      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: key === 'water' ? 0.2 : 0.7,
        metalness: key === 'water' ? 0.3 : 0.1,
        flatShading: key === 'buildings',
        side: THREE.DoubleSide
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.castShadow = key === 'buildings'
      mesh.receiveShadow = true
      mesh.visible = layers[key as keyof typeof layers] ?? true

      sceneRef.current?.add(mesh)
      meshesRef.current[key] = mesh
    })
  }

  // Reset camera view
  const resetView = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(size * 0.8, size * 0.6, size * 0.8)
      controlsRef.current.target.set(0, 0, 0)
      controlsRef.current.update()
    }
  }

  // Top view
  const topView = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, size * 1.2, 0)
      controlsRef.current.target.set(0, 0, 0)
      controlsRef.current.update()
    }
  }

  return (
    <div className="relative w-full h-full min-h-[300px] bg-[#0a0a0a] rounded-lg overflow-hidden">
      {/* 3D Canvas */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-400">Loading 3D Preview...</span>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <div className="text-center p-4">
            <p className="text-red-400 text-sm mb-2">❌ {error}</p>
            <p className="text-gray-500 text-xs">Select a location to preview</p>
          </div>
        </div>
      )}

      {/* Controls */}
      {!loading && !error && (
        <div className="absolute bottom-3 left-3 flex gap-2">
          <button
            onClick={resetView}
            className="px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-xs rounded-lg backdrop-blur-sm transition-colors"
          >
            Reset View
          </button>
          <button
            onClick={topView}
            className="px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-xs rounded-lg backdrop-blur-sm transition-colors"
          >
            Top View
          </button>
        </div>
      )}

      {/* Instructions */}
      {!loading && !error && (
        <div className="absolute bottom-3 right-3 text-[10px] text-gray-500">
          Drag to rotate • Scroll to zoom
        </div>
      )}
    </div>
  )
}
