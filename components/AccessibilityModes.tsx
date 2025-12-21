"use client"

/**
 * AccessibilityModes Component
 * Switches between different accessibility visualization modes
 */

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Eye, Vibrate, Combine, Palette } from 'lucide-react'

export type AccessibilityMode = 'visual' | 'haptic' | 'combined'

interface AccessibilityModesProps {
  currentMode: AccessibilityMode
  onModeChange: (mode: AccessibilityMode) => void
}

export function AccessibilityModes({ currentMode, onModeChange }: AccessibilityModesProps) {
  const modes = [
    {
      id: 'visual' as AccessibilityMode,
      name: 'Visual Only',
      description: 'See the music through colors and motion',
      icon: Eye,
      color: 'from-blue-500 to-purple-600',
    },
    {
      id: 'haptic' as AccessibilityMode,
      name: 'Haptic Only',
      description: 'Feel the music through vibrations',
      icon: Vibrate,
      color: 'from-green-500 to-teal-600',
    },
    {
      id: 'combined' as AccessibilityMode,
      name: 'Combined',
      description: 'Experience both visual and haptic feedback',
      icon: Combine,
      color: 'from-pink-500 to-orange-600',
      recommended: true,
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Accessibility Modes
        </CardTitle>
        <CardDescription>
          Choose how you want to experience the music
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {modes.map((mode) => {
          const Icon = mode.icon
          const isActive = currentMode === mode.id
          
          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                isActive
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${mode.color} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{mode.name}</h4>
                    {mode.recommended && (
                      <Badge variant="secondary" className="text-xs">
                        Recommended
                      </Badge>
                    )}
                    {isActive && (
                      <Badge className="text-xs">Active</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{mode.description}</p>
                </div>
              </div>
            </button>
          )
        })}

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            💡 Tip: Combined mode provides the most immersive experience for Deaf users
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
