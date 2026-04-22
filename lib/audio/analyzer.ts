/**
 * Web Audio API Wrapper for PinkSync Music Visualizer
 * Handles audio context, analysis, and real-time frequency data extraction
 */

export interface AudioAnalyzerConfig {
  fftSize?: number
  smoothingTimeConstant?: number
  minDecibels?: number
  maxDecibels?: number
}

export interface AudioData {
  frequency: Uint8Array
  timeDomain: Uint8Array
  volume: number
  bass: number
  mid: number
  treble: number
  timestamp: number
}

export class AudioAnalyzer {
  private audioContext: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private source: MediaElementAudioSourceNode | AudioBufferSourceNode | null = null
  private frequencyData: Uint8Array | null = null
  private timeDomainData: Uint8Array | null = null
  private config: Required<AudioAnalyzerConfig>
  
  constructor(config: AudioAnalyzerConfig = {}) {
    this.config = {
      fftSize: config.fftSize || 2048,
      smoothingTimeConstant: config.smoothingTimeConstant || 0.8,
      minDecibels: config.minDecibels || -90,
      maxDecibels: config.maxDecibels || -10,
    }
  }

  /**
   * Initialize audio context and analyzer
   */
  async init(): Promise<void> {
    if (this.audioContext) return

    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    this.analyser = this.audioContext.createAnalyser()
    
    this.analyser.fftSize = this.config.fftSize
    this.analyser.smoothingTimeConstant = this.config.smoothingTimeConstant
    this.analyser.minDecibels = this.config.minDecibels
    this.analyser.maxDecibels = this.config.maxDecibels

    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount)
    this.timeDomainData = new Uint8Array(this.analyser.frequencyBinCount)
  }

  /**
   * Connect audio element to analyzer
   */
  connectAudioElement(element: HTMLAudioElement): void {
    if (!this.audioContext || !this.analyser) {
      throw new Error('AudioAnalyzer not initialized. Call init() first.')
    }

    // Disconnect existing source
    if (this.source) {
      this.source.disconnect()
    }

    this.source = this.audioContext.createMediaElementSource(element)
    this.source.connect(this.analyser)
    this.analyser.connect(this.audioContext.destination)
  }

  /**
   * Connect audio buffer to analyzer
   */
  async connectAudioBuffer(buffer: ArrayBuffer): Promise<void> {
    if (!this.audioContext || !this.analyser) {
      throw new Error('AudioAnalyzer not initialized. Call init() first.')
    }

    const audioBuffer = await this.audioContext.decodeAudioData(buffer)
    
    if (this.source) {
      this.source.disconnect()
    }

    const bufferSource = this.audioContext.createBufferSource()
    bufferSource.buffer = audioBuffer
    bufferSource.connect(this.analyser)
    this.analyser.connect(this.audioContext.destination)
    
    this.source = bufferSource
    bufferSource.start(0)
  }

  /**
   * Get current audio data for visualization
   */
  getAudioData(): AudioData {
    if (!this.analyser || !this.frequencyData || !this.timeDomainData) {
      throw new Error('AudioAnalyzer not initialized')
    }

    this.analyser.getByteFrequencyData(this.frequencyData)
    this.analyser.getByteTimeDomainData(this.timeDomainData)

    const bufferLength = this.frequencyData.length

    // Calculate volume (RMS)
    let sum = 0
    for (let i = 0; i < bufferLength; i++) {
      sum += this.frequencyData[i]
    }
    const volume = sum / bufferLength / 255

    // Calculate frequency ranges
    const bassEnd = Math.floor(bufferLength * 0.1)
    const midEnd = Math.floor(bufferLength * 0.5)

    let bassSum = 0
    let midSum = 0
    let trebleSum = 0

    for (let i = 0; i < bassEnd; i++) {
      bassSum += this.frequencyData[i]
    }
    for (let i = bassEnd; i < midEnd; i++) {
      midSum += this.frequencyData[i]
    }
    for (let i = midEnd; i < bufferLength; i++) {
      trebleSum += this.frequencyData[i]
    }

    const bass = bassSum / bassEnd / 255
    const mid = midSum / (midEnd - bassEnd) / 255
    const treble = trebleSum / (bufferLength - midEnd) / 255

    return {
      frequency: new Uint8Array(this.frequencyData),
      timeDomain: new Uint8Array(this.timeDomainData),
      volume,
      bass,
      mid,
      treble,
      timestamp: Date.now(),
    }
  }

  /**
   * Resume audio context (required after user interaction)
   */
  async resume(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
    }
  }

  /**
   * Cleanup and disconnect
   */
  dispose(): void {
    if (this.source) {
      this.source.disconnect()
      this.source = null
    }
    if (this.analyser) {
      this.analyser.disconnect()
      this.analyser = null
    }
    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
    }
  }
}
