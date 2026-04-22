/**
 * Visualizer Presets API Route
 * Returns color palettes and visualizer presets
 */

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Default color palettes
    const colorPalettes = [
      {
        id: 'rainbow',
        name: 'Rainbow',
        colors: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'],
        description: 'Classic rainbow spectrum for balanced music',
      },
      {
        id: 'ocean',
        name: 'Ocean Waves',
        colors: ['#0077BE', '#00A8E8', '#00C9FF', '#84FAB0', '#8FD3F4'],
        description: 'Cool ocean blues and teals for calm, flowing music',
      },
      {
        id: 'sunset',
        name: 'Sunset Vibes',
        colors: ['#FF6B6B', '#FF8E53', '#FFA500', '#FFD700', '#FF69B4'],
        description: 'Warm sunset colors for energetic tracks',
      },
      {
        id: 'purple',
        name: 'Purple Dreams',
        colors: ['#8B00FF', '#9D4EDD', '#C77DFF', '#E0AAFF', '#F72585'],
        description: 'Vibrant purple shades for dreamy atmospheres',
      },
      {
        id: 'neon',
        name: 'Neon City',
        colors: ['#FF10F0', '#00FFFF', '#FFFF00', '#FF0080', '#00FF00'],
        description: 'Electric neon colors for EDM and electronic music',
      },
      {
        id: 'fire',
        name: 'Fire & Ice',
        colors: ['#FF0000', '#FF4500', '#FF6347', '#87CEEB', '#4169E1'],
        description: 'Contrasting hot and cold for dynamic tracks',
      },
      {
        id: 'forest',
        name: 'Forest',
        colors: ['#228B22', '#32CD32', '#90EE90', '#8B4513', '#D2691E'],
        description: 'Natural greens and browns for organic sounds',
      },
      {
        id: 'monochrome',
        name: 'Monochrome',
        colors: ['#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF'],
        description: 'Black and white for minimalist visualization',
      },
    ]

    // Visualizer presets
    const presets = [
      {
        id: 'default',
        name: 'Balanced',
        colorPalette: colorPalettes[0],
        intensity: 0.8,
        particleCount: 100,
        hapticEnabled: true,
        description: 'Balanced visualization for all music types',
      },
      {
        id: 'calm',
        name: 'Calm Mode',
        colorPalette: colorPalettes[1],
        intensity: 0.5,
        particleCount: 50,
        hapticEnabled: true,
        description: 'Gentle visualization for relaxing music',
      },
      {
        id: 'energetic',
        name: 'Energetic',
        colorPalette: colorPalettes[4],
        intensity: 1.0,
        particleCount: 150,
        hapticEnabled: true,
        description: 'High-energy visualization for upbeat music',
      },
      {
        id: 'minimal',
        name: 'Minimal',
        colorPalette: colorPalettes[7],
        intensity: 0.6,
        particleCount: 30,
        hapticEnabled: false,
        description: 'Minimalist visualization focused on form',
      },
      {
        id: 'immersive',
        name: 'Immersive',
        colorPalette: colorPalettes[3],
        intensity: 0.9,
        particleCount: 200,
        hapticEnabled: true,
        description: 'Immersive 3D experience with maximum particles',
      },
    ]

    return NextResponse.json({
      colorPalettes,
      presets,
      version: '1.0',
    })
  } catch (error) {
    console.error('Presets error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch presets' },
      { status: 500 }
    )
  }
}
