/**
 * Haptic Vibration Pattern Library for PinkSync Music Visualizer
 * Defines vibration patterns for different audio characteristics
 */

export interface VibrationPattern {
  name: string
  description: string
  pattern: number[]
  intensity?: number
}

/**
 * Standard haptic patterns for music visualization
 */
export const HAPTIC_PATTERNS = {
  // Basic patterns
  PULSE: {
    name: 'Pulse',
    description: 'Simple pulse for beats',
    pattern: [0, 50, 100, 50],
  },
  
  DOUBLE_PULSE: {
    name: 'Double Pulse',
    description: 'Double pulse for emphasis',
    pattern: [0, 50, 50, 50, 100, 50],
  },

  // Bass patterns
  BASS_HEAVY: {
    name: 'Bass Heavy',
    description: 'Strong vibration for bass frequencies',
    pattern: [0, 200, 100, 100],
    intensity: 1.0,
  },

  BASS_LIGHT: {
    name: 'Bass Light',
    description: 'Gentle vibration for bass',
    pattern: [0, 100, 50, 50],
    intensity: 0.6,
  },

  // Rhythm patterns
  RHYTHM_STEADY: {
    name: 'Steady Rhythm',
    description: 'Consistent rhythm pattern',
    pattern: [0, 50, 100, 50, 100, 50, 100, 50],
  },

  RHYTHM_SYNCOPATED: {
    name: 'Syncopated',
    description: 'Off-beat rhythm pattern',
    pattern: [0, 30, 150, 30, 100, 30, 150, 30],
  },

  // Mood patterns
  CALM: {
    name: 'Calm',
    description: 'Gentle waves for calm music',
    pattern: [0, 150, 200, 150, 200, 150],
    intensity: 0.4,
  },

  ENERGETIC: {
    name: 'Energetic',
    description: 'Fast pulses for energetic music',
    pattern: [0, 30, 50, 30, 50, 30, 50, 30, 50, 30],
    intensity: 0.9,
  },

  INTENSE: {
    name: 'Intense',
    description: 'Powerful vibrations for intense music',
    pattern: [0, 100, 50, 100, 50, 100],
    intensity: 1.0,
  },

  // Special effects
  WAVE: {
    name: 'Wave',
    description: 'Gradual wave effect',
    pattern: [0, 200, 100, 200, 100, 200, 100, 200],
    intensity: 0.7,
  },

  SPARKLE: {
    name: 'Sparkle',
    description: 'Quick bursts for high frequencies',
    pattern: [0, 20, 80, 20, 80, 20, 80, 20, 80, 20],
    intensity: 0.5,
  },
} as const

/**
 * Generate custom vibration pattern based on audio data
 */
export function generateCustomPattern(
  bass: number,
  mid: number,
  treble: number,
  bpm: number
): number[] {
  const pattern: number[] = [0]
  
  // Base duration on BPM
  const beatDuration = bpm > 0 ? Math.floor(60000 / bpm) : 500
  
  // Bass: long vibration
  if (bass > 0.5) {
    pattern.push(Math.floor(beatDuration * 0.3 * bass))
  } else {
    pattern.push(50)
  }
  
  // Pause
  pattern.push(Math.floor(beatDuration * 0.2))
  
  // Mid: medium vibration
  if (mid > 0.4) {
    pattern.push(Math.floor(beatDuration * 0.2 * mid))
  }
  
  // Pause
  pattern.push(50)
  
  // Treble: short bursts
  if (treble > 0.3) {
    const burstCount = Math.floor(treble * 3)
    for (let i = 0; i < burstCount; i++) {
      pattern.push(30)
      pattern.push(30)
    }
  }
  
  return pattern
}

/**
 * Scale pattern intensity
 */
export function scalePattern(pattern: number[], intensity: number): number[] {
  return pattern.map((value, index) => {
    if (index === 0) return value // Keep initial delay
    return Math.floor(value * intensity)
  })
}

/**
 * Get pattern by mood/energy level
 */
export function getPatternByMood(energy: number): VibrationPattern {
  if (energy < 0.3) return HAPTIC_PATTERNS.CALM
  if (energy < 0.6) return HAPTIC_PATTERNS.RHYTHM_STEADY
  if (energy < 0.8) return HAPTIC_PATTERNS.ENERGETIC
  return HAPTIC_PATTERNS.INTENSE
}
