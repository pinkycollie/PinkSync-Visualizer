/**
 * Haptic Patterns API Route
 * Provides haptic vibration patterns and device capabilities
 */

import { NextRequest, NextResponse } from 'next/server'
import { HAPTIC_PATTERNS } from '@/lib/haptic/patterns'

export async function GET(request: NextRequest) {
  try {
    // Convert patterns to API-friendly format
    const patterns = Object.entries(HAPTIC_PATTERNS).map(([key, pattern]) => ({
      id: key.toLowerCase(),
      ...pattern,
    }))

    return NextResponse.json({
      patterns,
      deviceSupport: {
        phone: true,
        watch: false, // Future: Apple Watch / WearOS integration
        wearable: false, // Future: Subpac, custom hardware
      },
      version: '1.0',
    })
  } catch (error) {
    console.error('Haptic patterns error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch haptic patterns' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { pattern, intensity } = body

    // Validate pattern
    if (!Array.isArray(pattern)) {
      return NextResponse.json(
        { error: 'Invalid pattern format' },
        { status: 400 }
      )
    }

    // Validate intensity
    if (typeof intensity !== 'number' || intensity < 0 || intensity > 1) {
      return NextResponse.json(
        { error: 'Intensity must be between 0 and 1' },
        { status: 400 }
      )
    }

    // In production, this could:
    // 1. Save custom patterns to user preferences
    // 2. Validate pattern safety (duration limits)
    // 3. Send to connected haptic devices

    return NextResponse.json({
      success: true,
      message: 'Pattern validated successfully',
    })
  } catch (error) {
    console.error('Haptic pattern validation error:', error)
    return NextResponse.json(
      { error: 'Failed to validate pattern' },
      { status: 500 }
    )
  }
}
