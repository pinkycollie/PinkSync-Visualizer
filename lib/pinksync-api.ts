/**
 * PinkSync API Client
 * Interface for PinkSync backend services
 */

export interface ColorPalette {
  id: string
  name: string
  colors: string[]
  description: string
}

export interface VisualizerPreset {
  id: string
  name: string
  colorPalette: ColorPalette
  intensity: number
  particleCount: number
  hapticEnabled: boolean
}

export interface UserPreferences {
  userId: string
  favoritePresets: string[]
  customPalettes: ColorPalette[]
  hapticIntensity: number
  defaultMode: 'visual' | 'haptic' | 'combined'
}

export interface SaveVisualizationRequest {
  name: string
  audioFile?: string
  preset: string
  duration: number
}

export class PinkSyncAPI {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  }

  /**
   * Set authentication token
   */
  setToken(token: string): void {
    this.token = token
  }

  /**
   * Get authorization headers
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }
    
    return headers
  }

  /**
   * Get available color palettes
   */
  async getColorPalettes(): Promise<ColorPalette[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/visualizer/presets`, {
        headers: this.getHeaders(),
      })
      
      if (!response.ok) {
        throw new Error(`Failed to fetch palettes: ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching color palettes:', error)
      // Return default palettes as fallback
      return this.getDefaultPalettes()
    }
  }

  /**
   * Get visualizer presets
   */
  async getPresets(): Promise<VisualizerPreset[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/visualizer/presets`, {
        headers: this.getHeaders(),
      })
      
      if (!response.ok) {
        throw new Error(`Failed to fetch presets: ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching presets:', error)
      return this.getDefaultPresets()
    }
  }

  /**
   * Save user preferences
   */
  async savePreferences(preferences: UserPreferences): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/visualizer/save`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(preferences),
      })
      
      return response.ok
    } catch (error) {
      console.error('Error saving preferences:', error)
      return false
    }
  }

  /**
   * Save visualization session
   */
  async saveVisualization(request: SaveVisualizationRequest): Promise<string | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/visualizer/save`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(request),
      })
      
      if (!response.ok) {
        throw new Error(`Failed to save visualization: ${response.statusText}`)
      }
      
      const data = await response.json()
      return data.id
    } catch (error) {
      console.error('Error saving visualization:', error)
      return null
    }
  }

  /**
   * Get haptic patterns library
   */
  async getHapticPatterns(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/haptic/patterns`, {
        headers: this.getHeaders(),
      })
      
      if (!response.ok) {
        throw new Error(`Failed to fetch haptic patterns: ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching haptic patterns:', error)
      return []
    }
  }

  /**
   * Default color palettes (fallback)
   */
  private getDefaultPalettes(): ColorPalette[] {
    return [
      {
        id: 'rainbow',
        name: 'Rainbow',
        colors: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'],
        description: 'Classic rainbow spectrum',
      },
      {
        id: 'ocean',
        name: 'Ocean',
        colors: ['#0077BE', '#00A8E8', '#00C9FF', '#84FAB0', '#8FD3F4'],
        description: 'Cool ocean blues and teals',
      },
      {
        id: 'sunset',
        name: 'Sunset',
        colors: ['#FF6B6B', '#FF8E53', '#FFA500', '#FFD700', '#FF69B4'],
        description: 'Warm sunset colors',
      },
      {
        id: 'purple',
        name: 'Purple Dreams',
        colors: ['#8B00FF', '#9D4EDD', '#C77DFF', '#E0AAFF', '#F72585'],
        description: 'Vibrant purple shades',
      },
      {
        id: 'neon',
        name: 'Neon',
        colors: ['#FF10F0', '#00FFFF', '#FFFF00', '#FF0080', '#00FF00'],
        description: 'Electric neon colors',
      },
    ]
  }

  /**
   * Default presets (fallback)
   */
  private getDefaultPresets(): VisualizerPreset[] {
    const palettes = this.getDefaultPalettes()
    return [
      {
        id: 'default',
        name: 'Default',
        colorPalette: palettes[0],
        intensity: 0.8,
        particleCount: 100,
        hapticEnabled: true,
      },
      {
        id: 'calm',
        name: 'Calm Mode',
        colorPalette: palettes[1],
        intensity: 0.5,
        particleCount: 50,
        hapticEnabled: true,
      },
      {
        id: 'intense',
        name: 'Intense Mode',
        colorPalette: palettes[4],
        intensity: 1.0,
        particleCount: 200,
        hapticEnabled: true,
      },
    ]
  }
}

/**
 * Global API client instance
 */
let globalAPIClient: PinkSyncAPI | null = null

export function getPinkSyncAPI(): PinkSyncAPI {
  if (!globalAPIClient) {
    globalAPIClient = new PinkSyncAPI()
  }
  return globalAPIClient
}
