/**
 * Haptic Device Manager for PinkSync Music Visualizer
 * Manages vibration API and different device types
 */

import { VibrationPattern, scalePattern } from './patterns'

export interface HapticConfig {
  enabled: boolean
  intensity: number
  deviceType: 'phone' | 'watch' | 'wearable' | 'none'
}

export class DeviceManager {
  private config: HapticConfig
  private isVibrating: boolean = false
  private vibrationSupported: boolean = false

  constructor(config: Partial<HapticConfig> = {}) {
    this.config = {
      enabled: config.enabled ?? true,
      intensity: config.intensity ?? 0.8,
      deviceType: config.deviceType ?? this.detectDeviceType(),
    }
    
    this.vibrationSupported = this.checkVibrationSupport()
  }

  /**
   * Check if vibration API is supported
   */
  private checkVibrationSupport(): boolean {
    return 'vibrate' in navigator || 'mozVibrate' in navigator || 'webkitVibrate' in navigator
  }

  /**
   * Detect device type
   */
  private detectDeviceType(): 'phone' | 'watch' | 'wearable' | 'none' {
    const ua = navigator.userAgent.toLowerCase()
    
    if (ua.includes('watch') || ua.includes('wearable')) {
      return 'watch'
    }
    
    if (/android|iphone|ipad|ipod|mobile/.test(ua)) {
      return 'phone'
    }
    
    return 'none'
  }

  /**
   * Vibrate with pattern
   */
  vibrate(pattern: number[] | VibrationPattern): boolean {
    if (!this.config.enabled || !this.vibrationSupported) {
      return false
    }

    try {
      const vibratePattern = Array.isArray(pattern) ? pattern : pattern.pattern
      const scaledPattern = scalePattern(vibratePattern, this.config.intensity)
      
      // Use the standard API or vendor-specific ones
      if ('vibrate' in navigator) {
        navigator.vibrate(scaledPattern)
      } else if ('mozVibrate' in navigator) {
        (navigator as any).mozVibrate(scaledPattern)
      } else if ('webkitVibrate' in navigator) {
        (navigator as any).webkitVibrate(scaledPattern)
      }
      
      this.isVibrating = true
      
      // Calculate total duration
      const totalDuration = scaledPattern.reduce((sum, val) => sum + val, 0)
      setTimeout(() => {
        this.isVibrating = false
      }, totalDuration)
      
      return true
    } catch (error) {
      console.error('Vibration failed:', error)
      return false
    }
  }

  /**
   * Stop vibration
   */
  stopVibration(): void {
    if (this.vibrationSupported) {
      try {
        navigator.vibrate(0)
        this.isVibrating = false
      } catch (error) {
        console.error('Failed to stop vibration:', error)
      }
    }
  }

  /**
   * Quick pulse (for testing or single beats)
   */
  pulse(duration: number = 50): boolean {
    return this.vibrate([0, duration])
  }

  /**
   * Set intensity
   */
  setIntensity(intensity: number): void {
    this.config.intensity = Math.max(0, Math.min(1, intensity))
  }

  /**
   * Enable/disable haptics
   */
  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled
    if (!enabled) {
      this.stopVibration()
    }
  }

  /**
   * Get current configuration
   */
  getConfig(): HapticConfig {
    return { ...this.config }
  }

  /**
   * Check if device supports haptics
   */
  isSupported(): boolean {
    return this.vibrationSupported
  }

  /**
   * Check if currently vibrating
   */
  isActive(): boolean {
    return this.isVibrating
  }

  /**
   * Request permission for haptics (for future use with advanced APIs)
   */
  async requestPermission(): Promise<boolean> {
    // For now, Web Vibration API doesn't require permission
    // This is a placeholder for future integration with device-specific APIs
    return this.vibrationSupported
  }
}

/**
 * Global device manager instance
 */
let globalDeviceManager: DeviceManager | null = null

export function getDeviceManager(): DeviceManager {
  if (!globalDeviceManager) {
    globalDeviceManager = new DeviceManager()
  }
  return globalDeviceManager
}
