/**
 * Beat Detection System for PinkSync Music Visualizer
 * Detects beats, tempo, and rhythm patterns in real-time
 */

import { AudioData } from './analyzer'

export interface BeatDetectorConfig {
  threshold?: number
  decayRate?: number
  holdTime?: number
  minTimeBetweenBeats?: number
}

export interface BeatInfo {
  isBeat: boolean
  confidence: number
  bpm: number
  energy: number
  timestamp: number
}

export class BeatDetector {
  private energyHistory: number[] = []
  private beatHistory: number[] = []
  private lastBeatTime: number = 0
  private config: Required<BeatDetectorConfig>
  private threshold: number = 1.3
  private historySize: number = 43 // ~1 second at 43fps
  
  constructor(config: BeatDetectorConfig = {}) {
    this.config = {
      threshold: config.threshold || 1.3,
      decayRate: config.decayRate || 0.98,
      holdTime: config.holdTime || 40,
      minTimeBetweenBeats: config.minTimeBetweenBeats || 200,
    }
  }

  /**
   * Detect beat from audio data
   */
  detectBeat(audioData: AudioData): BeatInfo {
    const now = Date.now()
    
    // Calculate current energy (weighted average of bass and volume)
    const energy = (audioData.bass * 0.7 + audioData.volume * 0.3)
    
    // Add to history
    this.energyHistory.push(energy)
    if (this.energyHistory.length > this.historySize) {
      this.energyHistory.shift()
    }

    // Calculate average energy
    const avgEnergy = this.energyHistory.reduce((sum, e) => sum + e, 0) / this.energyHistory.length
    
    // Calculate variance for confidence
    const variance = this.energyHistory.reduce((sum, e) => sum + Math.pow(e - avgEnergy, 2), 0) / this.energyHistory.length
    const confidence = Math.min(variance * 10, 1)

    // Detect beat
    const isBeat = 
      energy > avgEnergy * this.config.threshold && 
      now - this.lastBeatTime > this.config.minTimeBetweenBeats

    if (isBeat) {
      this.beatHistory.push(now)
      this.lastBeatTime = now
      
      // Keep only recent beats for BPM calculation
      const recentBeats = this.beatHistory.filter(time => now - time < 5000)
      this.beatHistory = recentBeats
    }

    // Calculate BPM
    const bpm = this.calculateBPM()

    return {
      isBeat,
      confidence,
      bpm,
      energy,
      timestamp: now,
    }
  }

  /**
   * Calculate BPM from beat history
   */
  private calculateBPM(): number {
    if (this.beatHistory.length < 2) return 0

    const intervals: number[] = []
    for (let i = 1; i < this.beatHistory.length; i++) {
      intervals.push(this.beatHistory[i] - this.beatHistory[i - 1])
    }

    // Calculate average interval
    const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length
    
    // Convert to BPM
    return Math.round(60000 / avgInterval)
  }

  /**
   * Reset detector state
   */
  reset(): void {
    this.energyHistory = []
    this.beatHistory = []
    this.lastBeatTime = 0
  }
}
