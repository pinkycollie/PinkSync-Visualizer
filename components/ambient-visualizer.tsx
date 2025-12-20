"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface AmbientVisualizerProps {
  intensity?: number
  colorTheme?: "rainbow" | "pink" | "teal" | "purple"
  enabled?: boolean
}

export function AmbientVisualizer({ intensity = 50, colorTheme = "pink", enabled = true }: AmbientVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const particlesRef = useRef<AmbientParticle[]>([])
  const timeRef = useRef(0)

  class AmbientParticle {
    x: number
    y: number
    baseX: number
    baseY: number
    size: number
    speedX: number
    speedY: number
    angle: number
    angleSpeed: number
    color: string

    constructor(canvas: HTMLCanvasElement) {
      this.baseX = Math.random() * canvas.width
      this.baseY = Math.random() * canvas.height
      this.x = this.baseX
      this.y = this.baseY
      this.size = Math.random() * 3 + 1
      this.speedX = (Math.random() - 0.5) * 0.5
      this.speedY = (Math.random() - 0.5) * 0.5
      this.angle = Math.random() * Math.PI * 2
      this.angleSpeed = (Math.random() - 0.5) * 0.02
      this.color = this.getColor()
    }

    getColor(): string {
      const colors = {
        rainbow: [
          "rgba(255, 28, 203, 0.6)",
          "rgba(169, 84, 255, 0.6)",
          "rgba(0, 255, 224, 0.6)",
          "rgba(255, 200, 50, 0.6)",
        ],
        pink: [
          "rgba(255, 28, 203, 0.6)",
          "rgba(255, 105, 180, 0.6)",
          "rgba(255, 192, 203, 0.6)",
        ],
        teal: [
          "rgba(0, 255, 224, 0.6)",
          "rgba(64, 224, 208, 0.6)",
          "rgba(72, 209, 204, 0.6)",
        ],
        purple: [
          "rgba(169, 84, 255, 0.6)",
          "rgba(138, 43, 226, 0.6)",
          "rgba(147, 112, 219, 0.6)",
        ],
      }
      const themeColors = colors[colorTheme]
      return themeColors[Math.floor(Math.random() * themeColors.length)]
    }

    update(time: number) {
      // Floating motion
      this.x = this.baseX + Math.sin(this.angle + time * 0.001) * 50
      this.y = this.baseY + Math.cos(this.angle + time * 0.001) * 50

      // Drift
      this.baseX += this.speedX
      this.baseY += this.speedY

      // Wrap around edges
      if (this.baseX < 0) this.baseX = canvasRef.current?.width || 0
      if (this.baseX > (canvasRef.current?.width || 0)) this.baseX = 0
      if (this.baseY < 0) this.baseY = canvasRef.current?.height || 0
      if (this.baseY > (canvasRef.current?.height || 0)) this.baseY = 0

      this.angle += this.angleSpeed
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color
      ctx.shadowBlur = 15
      ctx.shadowColor = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const animate = () => {
    if (!canvasRef.current || !enabled) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    timeRef.current += 1

    // Clear with fade trail
    ctx.fillStyle = "rgba(18, 18, 18, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      particle.update(timeRef.current)
      particle.draw(ctx)
    })

    // Draw connections between nearby particles
    ctx.strokeStyle = "rgba(255, 28, 203, 0.1)"
    ctx.lineWidth = 1
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const dx = particlesRef.current[i].x - particlesRef.current[j].x
        const dy = particlesRef.current[i].y - particlesRef.current[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          ctx.globalAlpha = (1 - distance / 150) * 0.3
          ctx.beginPath()
          ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
          ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
          ctx.stroke()
          ctx.globalAlpha = 1
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight

        // Initialize particles
        const particleCount = Math.floor((canvas.width * canvas.height) / 20000) * (intensity / 50)
        particlesRef.current = []
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push(new AmbientParticle(canvas))
        }
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    if (enabled) {
      animate()
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [enabled, intensity, colorTheme])

  if (!enabled) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 pointer-events-none z-0"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}
