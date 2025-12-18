'use client'

import { useState } from 'react'

export default function LaserCutPage() {
  const [lat, setLat] = useState(39.754779)
  const [lng, setLng] = useState(30.481747)
  const [size, setSize] = useState(500)
  const [scale, setScale] = useState(500)
  const [thickness, setThickness] = useState(3)
  const [interval, setInterval] = useState(5)
  const [includeBuildings, setIncludeBuildings] = useState(true)
  
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<any>(null)
  const [error, setError] = useState('')

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://web-production-64f4.up.railway.app'

  const modelSizeMM = size / scale * 1000

  const getPreview = async () => {
    setLoading(true)
    setError('')
    setPreview(null)
    
    try {
      const response = await fetch(`${API_URL}/laser-cut/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat, lng, size, scale,
          material_thickness: thickness,
          contour_interval: interval,
          include_buildings: includeBuildings
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setPreview(data.preview)
      } else {
        setError(data.error || 'Failed to generate preview')
      }
    } catch (err: any) {
      setError(err.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  const downloadDXF = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`${API_URL}/laser-cut`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat, lng, size, scale,
          material_thickness: thickness,
          contour_interval: interval,
          include_buildings: includeBuildings
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate DXF')
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `laser_terrain_${lat.toFixed(4)}_${lng.toFixed(4)}.zip`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err: any) {
      setError(err.message || 'Download failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">🔥 Laser Cut Terrain Model</h1>
        <p className="text-gray-400 mb-8">Generate DXF files for laser cutting physical terrain models</p>

        {/* Location */}
        <div className="bg-[#111] border border-[#222] rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">📍 Location</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Latitude</label>
              <input
                type="number"
                step="0.0001"
                value={lat}
                onChange={(e) => setLat(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded-lg text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Longitude</label>
              <input
                type="number"
                step="0.0001"
                value={lng}
                onChange={(e) => setLng(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded-lg text-white"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Tip: Use Google Maps to find coordinates
          </p>
        </div>

        {/* Model Settings */}
        <div className="bg-[#111] border border-[#222] rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">⚙️ Model Settings</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Area Size (m)</label>
              <select
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded-lg text-white"
              >
                <option value={250}>250m × 250m</option>
                <option value={500}>500m × 500m</option>
                <option value={1000}>1000m × 1000m</option>
                <option value={2000}>2000m × 2000m</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Scale</label>
              <select
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded-lg text-white"
              >
                <option value={200}>1:200</option>
                <option value={500}>1:500</option>
                <option value={1000}>1:1000</option>
                <option value={2000}>1:2000</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Material Thickness (mm)</label>
              <select
                value={thickness}
                onChange={(e) => setThickness(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded-lg text-white"
              >
                <option value={2}>2mm</option>
                <option value={3}>3mm</option>
                <option value={4}>4mm</option>
                <option value={5}>5mm</option>
                <option value={6}>6mm</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Contour Interval (m)</label>
              <select
                value={interval}
                onChange={(e) => setInterval(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded-lg text-white"
              >
                <option value={2}>2m (detailed)</option>
                <option value={5}>5m (standard)</option>
                <option value={10}>10m (coarse)</option>
                <option value={20}>20m (very coarse)</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeBuildings}
              onChange={(e) => setIncludeBuildings(e.target.checked)}
              className="w-5 h-5 accent-amber-500"
            />
            <span className="text-sm text-gray-300">Include building footprints (etched on top layer)</span>
          </label>
        </div>

        {/* Model Info */}
        <div className="bg-[#111] border border-[#222] rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">📐 Model Dimensions</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-[#0a0a0a] p-3 rounded-lg">
              <span className="text-gray-400">Model Size</span>
              <p className="text-xl font-mono text-amber-500">{modelSizeMM.toFixed(0)} × {modelSizeMM.toFixed(0)} mm</p>
            </div>
            <div className="bg-[#0a0a0a] p-3 rounded-lg">
              <span className="text-gray-400">Scale</span>
              <p className="text-xl font-mono text-amber-500">1:{scale}</p>
            </div>
          </div>
        </div>

        {/* Preview Result */}
        {preview && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-green-400">✓ Preview Ready</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Layers</span>
                <p className="text-lg font-mono">{preview.num_layers}</p>
              </div>
              <div>
                <span className="text-gray-400">Total Height</span>
                <p className="text-lg font-mono">{preview.total_height_mm}mm</p>
              </div>
              <div>
                <span className="text-gray-400">Elevation Range</span>
                <p className="text-lg font-mono">{preview.elevation_range.min}m - {preview.elevation_range.max}m</p>
              </div>
              <div>
                <span className="text-gray-400">Material Needed</span>
                <p className="text-lg font-mono">{preview.estimated_material}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
            <p className="text-red-400">⚠️ {error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={getPreview}
            disabled={loading}
            className="flex-1 py-4 bg-[#222] text-white rounded-xl font-semibold hover:bg-[#333] disabled:opacity-50 transition-all"
          >
            {loading ? '⏳ Loading...' : '👁️ Preview'}
          </button>
          <button
            onClick={downloadDXF}
            disabled={loading}
            className="flex-1 py-4 bg-amber-500 text-black rounded-xl font-semibold hover:bg-amber-400 disabled:opacity-50 transition-all"
          >
            {loading ? '⏳ Generating...' : '⬇️ Download DXF'}
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-sm text-gray-500">
          <h3 className="font-semibold text-gray-400 mb-2">How it works:</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Enter coordinates or select on map</li>
            <li>Choose size, scale and material thickness</li>
            <li>Click Preview to see layer count</li>
            <li>Download ZIP with DXF + assembly guide</li>
            <li>Send DXF to laser cutter (RED=cut, BLUE=etch)</li>
            <li>Assemble layers - they nest into each other!</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
