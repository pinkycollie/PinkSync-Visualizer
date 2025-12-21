"use client"

/**
 * HapticControls Component
 * Controls for haptic feedback intensity and patterns
 */

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Vibrate, Smartphone } from 'lucide-react'
import { getDeviceManager } from '@/lib/haptic/device-manager'
import { HAPTIC_PATTERNS } from '@/lib/haptic/patterns'

interface HapticControlsProps {
  onIntensityChange?: (intensity: number) => void
  onEnabledChange?: (enabled: boolean) => void
}

export function HapticControls({ onIntensityChange, onEnabledChange }: HapticControlsProps) {
  const [deviceManager] = useState(() => getDeviceManager())
  const [isSupported, setIsSupported] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const [intensity, setIntensity] = useState(0.8)
  const [selectedPattern, setSelectedPattern] = useState('pulse')

  useEffect(() => {
    setIsSupported(deviceManager.isSupported())
    const config = deviceManager.getConfig()
    setEnabled(config.enabled)
    setIntensity(config.intensity)
  }, [deviceManager])

  const handleEnabledChange = (value: boolean) => {
    setEnabled(value)
    deviceManager.setEnabled(value)
    if (onEnabledChange) {
      onEnabledChange(value)
    }
  }

  const handleIntensityChange = (value: number[]) => {
    const newIntensity = value[0]
    setIntensity(newIntensity)
    deviceManager.setIntensity(newIntensity)
    if (onIntensityChange) {
      onIntensityChange(newIntensity)
    }
  }

  const testVibration = () => {
    const pattern = HAPTIC_PATTERNS[selectedPattern.toUpperCase() as keyof typeof HAPTIC_PATTERNS]
    if (pattern) {
      deviceManager.vibrate(pattern.pattern)
    }
  }

  if (!isSupported) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vibrate className="w-5 h-5" />
            Haptic Feedback
          </CardTitle>
          <CardDescription>
            Haptic feedback is not supported on this device
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Vibrate className="w-5 h-5" />
          Haptic Feedback
        </CardTitle>
        <CardDescription>
          Feel the music through vibrations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/Disable */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="haptic-enabled">Enable Haptics</Label>
            <p className="text-xs text-muted-foreground">
              Vibrate in sync with the music
            </p>
          </div>
          <Switch
            id="haptic-enabled"
            checked={enabled}
            onCheckedChange={handleEnabledChange}
          />
        </div>

        {/* Intensity Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="haptic-intensity">Intensity</Label>
            <span className="text-sm text-muted-foreground">
              {Math.round(intensity * 100)}%
            </span>
          </div>
          <Slider
            id="haptic-intensity"
            min={0}
            max={1}
            step={0.1}
            value={[intensity]}
            onValueChange={handleIntensityChange}
            disabled={!enabled}
          />
        </div>

        {/* Pattern Selection */}
        <div className="space-y-2">
          <Label>Test Pattern</Label>
          <div className="grid grid-cols-2 gap-2">
            {['pulse', 'bass_heavy', 'rhythm_steady', 'energetic'].map((pattern) => (
              <Button
                key={pattern}
                variant={selectedPattern === pattern ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPattern(pattern)}
                disabled={!enabled}
              >
                {pattern.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Button>
            ))}
          </div>
        </div>

        {/* Test Button */}
        <Button
          onClick={testVibration}
          disabled={!enabled}
          className="w-full"
          variant="outline"
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Test Vibration
        </Button>

        {/* Device Info */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          Device: {deviceManager.getConfig().deviceType}
        </div>
      </CardContent>
    </Card>
  )
}
