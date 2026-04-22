/**
 * Tone.js Integration for Advanced Audio Analysis
 * Provides music theory analysis, chord detection, and mood mapping
 */

import * as Tone from 'tone'

export interface ToneAnalysis {
  pitch: number
  note: string
  octave: number
  frequency: number
  amplitude: number
}

export class ToneProcessor {
  private analyser: Tone.Analyser | null = null
  private fft: Tone.FFT | null = null
  private waveform: Tone.Waveform | null = null
  private initialized: boolean = false

  /**
   * Initialize Tone.js
   */
  async init(): Promise<void> {
    if (this.initialized) return

    await Tone.start()
    
    this.analyser = new Tone.Analyser('waveform', 256)
    this.fft = new Tone.FFT(2048)
    this.waveform = new Tone.Waveform(2048)
    
    this.initialized = true
  }

  /**
   * Connect audio element to Tone.js
   */
  connectAudioElement(element: HTMLAudioElement): void {
    if (!this.initialized) {
      throw new Error('ToneProcessor not initialized. Call init() first.')
    }

    const player = new Tone.Player({
      url: element.src,
      autostart: false,
    }).toDestination()

    if (this.fft && this.waveform) {
      player.connect(this.fft)
      player.connect(this.waveform)
    }
  }

  /**
   * Get current tone analysis
   */
  getToneAnalysis(): ToneAnalysis | null {
    if (!this.waveform) return null

    const waveformData = this.waveform.getValue()
    
    // Simple pitch detection using autocorrelation
    const pitch = this.detectPitch(waveformData as Float32Array)
    const frequency = pitch > 0 ? 440 * Math.pow(2, (pitch - 69) / 12) : 0
    
    // Convert to note
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    const noteIndex = Math.round(pitch % 12)
    const note = noteNames[noteIndex]
    const octave = Math.floor(pitch / 12) - 1

    // Calculate amplitude
    const amplitude = this.calculateAmplitude(waveformData as Float32Array)

    return {
      pitch,
      note,
      octave,
      frequency,
      amplitude,
    }
  }

  /**
   * Simple pitch detection using autocorrelation
   */
  private detectPitch(buffer: Float32Array): number {
    const SIZE = buffer.length
    const MAX_SAMPLES = Math.floor(SIZE / 2)
    let bestOffset = -1
    let bestCorrelation = 0
    let rms = 0

    // Calculate RMS
    for (let i = 0; i < SIZE; i++) {
      const val = buffer[i]
      rms += val * val
    }
    rms = Math.sqrt(rms / SIZE)

    // Not enough signal
    if (rms < 0.01) return -1

    // Autocorrelation
    let lastCorrelation = 1
    for (let offset = 0; offset < MAX_SAMPLES; offset++) {
      let correlation = 0
      for (let i = 0; i < MAX_SAMPLES; i++) {
        correlation += Math.abs(buffer[i] - buffer[i + offset])
      }
      correlation = 1 - correlation / MAX_SAMPLES
      
      if (correlation > 0.9 && correlation > lastCorrelation) {
        const foundGoodCorrelation = correlation > bestCorrelation
        if (foundGoodCorrelation) {
          bestCorrelation = correlation
          bestOffset = offset
        }
      }
      lastCorrelation = correlation
    }

    if (bestCorrelation > 0.01 && bestOffset !== -1) {
      const fundamentalFreq = 44100 / bestOffset
      return this.frequencyToMidi(fundamentalFreq)
    }

    return -1
  }

  /**
   * Convert frequency to MIDI note number
   */
  private frequencyToMidi(frequency: number): number {
    return Math.round(12 * Math.log2(frequency / 440) + 69)
  }

  /**
   * Calculate amplitude from waveform
   */
  private calculateAmplitude(buffer: Float32Array): number {
    let sum = 0
    for (let i = 0; i < buffer.length; i++) {
      sum += Math.abs(buffer[i])
    }
    return sum / buffer.length
  }

  /**
   * Get FFT data
   */
  getFFTData(): Float32Array | null {
    if (!this.fft) return null
    return this.fft.getValue() as Float32Array
  }

  /**
   * Cleanup
   */
  dispose(): void {
    if (this.analyser) {
      this.analyser.dispose()
      this.analyser = null
    }
    if (this.fft) {
      this.fft.dispose()
      this.fft = null
    }
    if (this.waveform) {
      this.waveform.dispose()
      this.waveform = null
    }
    this.initialized = false
  }
}
