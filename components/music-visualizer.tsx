"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Music, Upload, Play, Pause, Volume2, Settings, Wand2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface VisualizerSettings {
  enabled: boolean
  intensity: number
  colorTheme: "rainbow" | "pink" | "teal" | "purple" | "fire"
  particleCount: number
  sensitivity: number
}

export function MusicVisualizer() {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [settings, setSettings] = useState<VisualizerSettings>({
    enabled: true,
    intensity: 70,
    colorTheme: "rainbow",
    particleCount: 100,
    sensitivity: 50,
  })
  const [showSettings, setShowSettings] = useState(false)
  const [frequencyData, setFrequencyData] = useState<number[]>([])

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])

  // Particle class for visual effects
  class Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    color: string
    life: number

    constructor(x: number, y: number, color: string) {
      this.x = x
      this.y = y
      this.vx = (Math.random() - 0.5) * 4
      this.vy = (Math.random() - 0.5) * 4
      this.size = Math.random() * 5 + 2
      this.color = color
      this.life = 1.0
    }

    update() {
      this.x += this.vx
      this.y += this.vy
      this.life -= 0.01
      this.vy += 0.1 // Gravity
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.globalAlpha = this.life
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1.0
    }

    isDead() {
      return this.life <= 0
    }
  }

  // Get color based on frequency and theme
  const getColor = useCallback(
    (frequency: number, index: number) => {
      const intensity = frequency / 255
      const themes = {
        rainbow: `hsl(${(index * 360) / frequencyData.length}, 100%, ${50 + intensity * 50}%)`,
        pink: `hsl(${322 + intensity * 30}, 100%, ${40 + intensity * 40}%)`,
        teal: `hsl(${180 + intensity * 30}, 100%, ${40 + intensity * 40}%)`,
        purple: `hsl(${280 + intensity * 30}, 100%, ${40 + intensity * 40}%)`,
        fire: `hsl(${(1 - intensity) * 60}, 100%, ${40 + intensity * 40}%)`,
      }
      return themes[settings.colorTheme]
    },
    [settings.colorTheme, frequencyData.length],
  )

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file)
      if (audioRef.current) {
        audioRef.current.src = URL.createObjectURL(file)
      }
    }
  }

  // Initialize audio context and analyzer
  const initAudio = useCallback(() => {
    if (!audioRef.current || audioContextRef.current) return

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 256
    const source = audioContext.createMediaElementSource(audioRef.current)
    source.connect(analyser)
    analyser.connect(audioContext.destination)

    audioContextRef.current = audioContext
    analyserRef.current = analyser
  }, [])

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      if (!audioContextRef.current) {
        initAudio()
      }
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Draw visualizer
  const drawVisualizer = useCallback(() => {
    if (!canvasRef.current || !analyserRef.current || !settings.enabled) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyserRef.current.getByteFrequencyData(dataArray)
    setFrequencyData(Array.from(dataArray))

    // Clear canvas with trail effect
    ctx.fillStyle = "rgba(18, 18, 18, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Calculate bars
    const barWidth = (canvas.width / bufferLength) * 2.5
    let x = 0

    // Draw frequency bars
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * canvas.height * (settings.intensity / 100)
      const color = getColor(dataArray[i], i)

      // Draw bar with glow
      ctx.fillStyle = color
      ctx.shadowBlur = 20
      ctx.shadowColor = color
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

      // Draw mirror effect
      ctx.globalAlpha = 0.3
      ctx.fillRect(x, 0, barWidth, barHeight)
      ctx.globalAlpha = 1.0

      x += barWidth + 2

      // Generate particles based on intensity
      if (dataArray[i] > 180 && Math.random() > 0.8) {
        const particleX = x
        const particleY = canvas.height - barHeight
        particlesRef.current.push(new Particle(particleX, particleY, color))
      }
    }

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.update()
      particle.draw(ctx)
      return !particle.isDead()
    })

    // Draw center circle pulsing with bass
    const avgFrequency = dataArray.reduce((a, b) => a + b, 0) / bufferLength
    const circleRadius = (avgFrequency / 255) * 100 * (settings.intensity / 100)
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    ctx.beginPath()
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, circleRadius)
    gradient.addColorStop(0, `rgba(255, 28, 203, ${avgFrequency / 255})`)
    gradient.addColorStop(0.5, `rgba(169, 84, 255, ${avgFrequency / 510})`)
    gradient.addColorStop(1, "rgba(0, 255, 224, 0)")
    ctx.fillStyle = gradient
    ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2)
    ctx.fill()

    // Continue animation
    animationFrameRef.current = requestAnimationFrame(drawVisualizer)
  }, [settings, getColor])

  // Start animation loop
  useEffect(() => {
    if (isPlaying && settings.enabled) {
      drawVisualizer()
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, settings.enabled, drawVisualizer])

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-6 h-6 text-primary" />
                Music Visualizer
              </CardTitle>
              <CardDescription>Experience music through colorful, accessible visual effects</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowSettings(!showSettings)}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Visualizer Canvas */}
          <div className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full" />

            {!audioFile && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/70">
                  <Wand2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Upload audio to see the magic</p>
                </div>
              </div>
            )}
          </div>

          {/* Audio Controls */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
                id="audio-upload"
              />
              <label htmlFor="audio-upload">
                <Button asChild className="cursor-pointer">
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Audio
                  </span>
                </Button>
              </label>

              {audioFile && (
                <>
                  <Button onClick={togglePlay} variant="outline">
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Play
                      </>
                    )}
                  </Button>
                  <span className="text-sm text-muted-foreground">{audioFile.name}</span>
                </>
              )}
            </div>

            <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
          </div>

          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6 border-t pt-6"
              >
                {/* Enable/Disable */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="visualizer-enabled" className="flex flex-col gap-1">
                    <span>Enable Visualizer</span>
                    <span className="text-xs text-muted-foreground font-normal">
                      Turn visual effects on or off
                    </span>
                  </Label>
                  <Switch
                    id="visualizer-enabled"
                    checked={settings.enabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, enabled: checked })}
                  />
                </div>

                {/* Intensity */}
                <div className="space-y-2">
                  <Label>
                    Intensity: {settings.intensity}%
                    <span className="text-xs text-muted-foreground ml-2">Controls visual strength</span>
                  </Label>
                  <Slider
                    value={[settings.intensity]}
                    onValueChange={([value]) => setSettings({ ...settings, intensity: value })}
                    min={10}
                    max={100}
                    step={5}
                    disabled={!settings.enabled}
                  />
                </div>

                {/* Sensitivity */}
                <div className="space-y-2">
                  <Label>
                    Sensitivity: {settings.sensitivity}%
                    <span className="text-xs text-muted-foreground ml-2">Audio detection threshold</span>
                  </Label>
                  <Slider
                    value={[settings.sensitivity]}
                    onValueChange={([value]) => setSettings({ ...settings, sensitivity: value })}
                    min={0}
                    max={100}
                    step={5}
                    disabled={!settings.enabled}
                  />
                </div>

                {/* Color Theme */}
                <div className="space-y-2">
                  <Label htmlFor="color-theme">Color Theme</Label>
                  <Select
                    value={settings.colorTheme}
                    onValueChange={(value: any) => setSettings({ ...settings, colorTheme: value })}
                    disabled={!settings.enabled}
                  >
                    <SelectTrigger id="color-theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rainbow">🌈 Rainbow</SelectItem>
                      <SelectItem value="pink">💖 PinkSync</SelectItem>
                      <SelectItem value="teal">🌊 Electric Teal</SelectItem>
                      <SelectItem value="purple">💜 Cosmic Purple</SelectItem>
                      <SelectItem value="fire">🔥 Fire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Accessibility Info */}
          <div className="text-xs text-muted-foreground space-y-1 p-4 bg-muted/50 rounded-lg">
            <p className="font-medium">♿ Accessibility Features:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Visual representation of audio frequencies for deaf/hard of hearing users</li>
              <li>Adjustable intensity and color themes for visual comfort</li>
              <li>Can be disabled for users sensitive to motion or flashing</li>
              <li>Keyboard accessible controls</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
