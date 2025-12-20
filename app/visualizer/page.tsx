"use client"

/**
 * PinkSync Music Visualizer - Main Page
 * Integrates audio processing, 3D visualization, and haptic feedback
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import {
  Play,
  Pause,
  Square,
  Volume2,
  Sparkles,
  Settings,
  Share2,
  Download,
  Heart,
} from 'lucide-react'
import { AudioUploader } from '@/components/AudioUploader'
import { Visualizer3D } from '@/components/Visualizer3D'
import { HapticControls } from '@/components/HapticControls'
import { AccessibilityModes, AccessibilityMode } from '@/components/AccessibilityModes'
import { AudioAnalyzer, AudioData } from '@/lib/audio/analyzer'
import { BeatDetector, BeatInfo } from '@/lib/audio/beat-detector'
import { getDeviceManager } from '@/lib/haptic/device-manager'
import { HAPTIC_PATTERNS, getPatternByMood } from '@/lib/haptic/patterns'
import { getPinkSyncAPI } from '@/lib/pinksync-api'

export default function VisualizerPage() {
  // Audio state
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Visualizer state
  const [audioData, setAudioData] = useState<AudioData | null>(null)
  const [beatInfo, setBeatInfo] = useState<BeatInfo | null>(null)
  const [mode, setMode] = useState<AccessibilityMode>('combined')
  const [selectedPreset, setSelectedPreset] = useState('default')
  const [presets, setPresets] = useState<any[]>([])
  const [intensity, setIntensity] = useState(0.8)

  // Refs
  const analyzerRef = useRef<AudioAnalyzer | null>(null)
  const beatDetectorRef = useRef<BeatDetector | null>(null)
  const deviceManagerRef = useRef<any>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Initialize
  useEffect(() => {
    analyzerRef.current = new AudioAnalyzer()
    beatDetectorRef.current = new BeatDetector()
    deviceManagerRef.current = getDeviceManager()

    // Load presets
    const api = getPinkSyncAPI()
    api.getPresets().then(setPresets).catch(console.error)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      analyzerRef.current?.dispose()
    }
  }, [])

  // Handle audio load
  const handleAudioLoad = useCallback(async (audio: HTMLAudioElement) => {
    setAudioElement(audio)
    
    if (analyzerRef.current) {
      await analyzerRef.current.init()
      analyzerRef.current.connectAudioElement(audio)
    }

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime)
    })

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration)
    })

    audio.addEventListener('ended', () => {
      setIsPlaying(false)
    })

    audio.volume = volume
  }, [volume])

  // Audio analysis loop
  useEffect(() => {
    if (!isPlaying || !analyzerRef.current || !beatDetectorRef.current) return

    const analyze = () => {
      if (analyzerRef.current && beatDetectorRef.current) {
        const data = analyzerRef.current.getAudioData()
        const beat = beatDetectorRef.current.detectBeat(data)
        
        setAudioData(data)
        setBeatInfo(beat)

        // Trigger haptic feedback on beat
        if (beat.isBeat && mode !== 'visual' && deviceManagerRef.current) {
          const pattern = getPatternByMood(beat.energy)
          deviceManagerRef.current.vibrate(pattern.pattern)
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(analyze)
    }

    analyze()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, mode])

  // Playback controls
  const togglePlayPause = async () => {
    if (!audioElement) return

    if (isPlaying) {
      audioElement.pause()
      setIsPlaying(false)
    } else {
      await analyzerRef.current?.resume()
      await audioElement.play()
      setIsPlaying(true)
    }
  }

  const handleStop = () => {
    if (!audioElement) return
    audioElement.pause()
    audioElement.currentTime = 0
    setIsPlaying(false)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioElement) {
      audioElement.volume = newVolume
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioElement) {
      audioElement.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  // Get current preset
  const currentPreset = presets.find(p => p.id === selectedPreset) || presets[0]

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full cosmic-gradient flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold neon-text">PinkSync Visualizer</h1>
              <p className="text-xs text-muted-foreground">Feel the Beat. See the Sound.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {beatInfo?.bpm || 0} BPM
            </Badge>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Controls */}
          <div className="space-y-6">
            <AudioUploader onAudioLoad={handleAudioLoad} />
            <AccessibilityModes currentMode={mode} onModeChange={setMode} />
            {mode !== 'visual' && <HapticControls />}

            {/* Preset Selection */}
            {presets.length > 0 && (
              <Card className="p-4">
                <Label className="mb-2 block">Visual Preset</Label>
                <div className="space-y-2">
                  {presets.slice(0, 3).map((preset) => (
                    <Button
                      key={preset.id}
                      variant={selectedPreset === preset.id ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setSelectedPreset(preset.id)}
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </Card>
            )}

            {/* Intensity Control */}
            <Card className="p-4">
              <Label className="mb-2 block">Intensity</Label>
              <Slider
                value={[intensity]}
                onValueChange={(val) => setIntensity(val[0])}
                min={0}
                max={1}
                step={0.1}
              />
            </Card>
          </div>

          {/* Center - Visualizer */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-0 overflow-hidden">
              <div className="aspect-video bg-black relative">
                {mode !== 'haptic' && currentPreset && (
                  <Visualizer3D
                    audioData={audioData}
                    colorPalette={currentPreset.colorPalette?.colors}
                    particleCount={currentPreset.particleCount}
                    intensity={intensity}
                  />
                )}
                {mode === 'haptic' && (
                  <div className="absolute inset-0 flex items-center justify-center text-white/60">
                    <div className="text-center">
                      <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Haptic Mode</p>
                      <p className="text-sm">Feel the vibrations</p>
                    </div>
                  </div>
                )}

                {/* Beat indicator */}
                {beatInfo?.isBeat && (
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary"
                  />
                )}
              </div>

              {/* Playback Controls */}
              {audioElement && (
                <div className="p-4 space-y-4 bg-card">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <Slider
                      value={[currentTime]}
                      onValueChange={handleSeek}
                      min={0}
                      max={duration || 100}
                      step={0.1}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="lg"
                        onClick={togglePlayPause}
                        className="rounded-full w-12 h-12"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-1" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleStop}
                      >
                        <Square className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                      <Slider
                        value={[volume]}
                        onValueChange={handleVolumeChange}
                        min={0}
                        max={1}
                        step={0.01}
                        className="w-24"
                      />
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Info Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Bass</p>
                <p className="text-2xl font-bold">
                  {Math.round((audioData?.bass || 0) * 100)}%
                </p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Mid</p>
                <p className="text-2xl font-bold">
                  {Math.round((audioData?.mid || 0) * 100)}%
                </p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Treble</p>
                <p className="text-2xl font-bold">
                  {Math.round((audioData?.treble || 0) * 100)}%
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
