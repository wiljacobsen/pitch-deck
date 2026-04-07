import { useEffect, useRef } from 'react'

// ── Wave configuration ───────────────────────────────────────────

const WAVE_COUNT = 8
const POINTS_PER_WAVE = 120
const ELECTRON_COUNT = 12

interface Electron {
  waveIdx: number
  progress: number   // 0-1 along the wave
  speed: number      // progress per frame
  opacity: number
}

// ── Component ────────────────────────────────────────────────────

export default function SymphonyWaves({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const electronsRef = useRef<Electron[]>([])
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Init electrons once
    if (electronsRef.current.length === 0) {
      electronsRef.current = Array.from({ length: ELECTRON_COUNT }, () => ({
        waveIdx: Math.floor(Math.random() * WAVE_COUNT),
        progress: Math.random(),
        speed: 0.0008 + Math.random() * 0.0012,
        opacity: 0.4 + Math.random() * 0.5,
      }))
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1
      canvas!.width = canvas!.offsetWidth * dpr
      canvas!.height = canvas!.offsetHeight * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    function getWaveY(x: number, _w: number, h: number, waveIdx: number, time: number): number {
      const centerY = h * 0.5
      const spread = h * 0.35
      const normalizedIdx = (waveIdx / (WAVE_COUNT - 1)) - 0.5  // -0.5 to 0.5
      const baseY = centerY + normalizedIdx * spread

      // Multiple sine harmonics for organic wave shape
      const freq1 = 0.003 + waveIdx * 0.0004
      const freq2 = 0.006 + waveIdx * 0.0003
      const freq3 = 0.001
      const amp1 = 20 + waveIdx * 3
      const amp2 = 10 + waveIdx * 1.5
      const amp3 = 30

      const phase = time * 0.0003 * (1 + waveIdx * 0.1)

      return baseY
        + Math.sin(x * freq1 + phase) * amp1
        + Math.sin(x * freq2 - phase * 0.7) * amp2
        + Math.sin(x * freq3 + phase * 0.3 + waveIdx * 0.5) * amp3
    }

    function draw() {
      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      timeRef.current += 16 // ~60fps

      ctx!.clearRect(0, 0, w, h)

      const isDark = dark
      const baseAlpha = isDark ? 0.06 : 0.08

      // Draw waves
      for (let wi = 0; wi < WAVE_COUNT; wi++) {
        ctx!.beginPath()
        ctx!.strokeStyle = isDark
          ? `rgba(59, 130, 246, ${baseAlpha + wi * 0.005})`
          : `rgba(59, 130, 246, ${baseAlpha * 0.6 + wi * 0.003})`
        ctx!.lineWidth = 1

        for (let i = 0; i <= POINTS_PER_WAVE; i++) {
          const x = (i / POINTS_PER_WAVE) * w
          const y = getWaveY(x, w, h, wi, timeRef.current)
          if (i === 0) ctx!.moveTo(x, y)
          else ctx!.lineTo(x, y)
        }
        ctx!.stroke()
      }

      // Draw electrons
      for (const e of electronsRef.current) {
        e.progress += e.speed
        if (e.progress > 1) {
          e.progress = 0
          e.waveIdx = Math.floor(Math.random() * WAVE_COUNT)
          e.speed = 0.0008 + Math.random() * 0.0012
        }

        const x = e.progress * w
        const y = getWaveY(x, w, h, e.waveIdx, timeRef.current)

        // Glow
        const gradient = ctx!.createRadialGradient(x, y, 0, x, y, 8)
        const glowAlpha = isDark ? e.opacity * 0.4 : e.opacity * 0.25
        gradient.addColorStop(0, `rgba(59, 130, 246, ${glowAlpha})`)
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
        ctx!.fillStyle = gradient
        ctx!.beginPath()
        ctx!.arc(x, y, 8, 0, Math.PI * 2)
        ctx!.fill()

        // Core dot
        const coreAlpha = isDark ? e.opacity * 0.8 : e.opacity * 0.5
        ctx!.fillStyle = `rgba(59, 130, 246, ${coreAlpha})`
        ctx!.beginPath()
        ctx!.arc(x, y, 1.5, 0, Math.PI * 2)
        ctx!.fill()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [dark])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
