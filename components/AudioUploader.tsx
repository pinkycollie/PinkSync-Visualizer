"use client"

/**
 * AudioUploader Component
 * Handles audio file upload and microphone input
 */

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, Music, Mic, X } from 'lucide-react'

interface AudioUploaderProps {
  onAudioLoad: (audio: HTMLAudioElement) => void
  onFileSelect?: (file: File) => void
}

export function AudioUploader({ onAudioLoad, onFileSelect }: AudioUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('audio/')) {
      alert('Please select an audio file')
      return
    }

    // Validate file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      alert('File size must be less than 50MB')
      return
    }

    setSelectedFile(file)
    setIsLoading(true)

    try {
      // Create audio element
      const audio = new Audio()
      const url = URL.createObjectURL(file)
      audio.src = url
      audio.crossOrigin = 'anonymous'

      audio.addEventListener('loadeddata', () => {
        audioRef.current = audio
        onAudioLoad(audio)
        setIsLoading(false)
      })

      audio.addEventListener('error', () => {
        alert('Failed to load audio file')
        setIsLoading(false)
        setSelectedFile(null)
      })

      if (onFileSelect) {
        onFileSelect(file)
      }
    } catch (error) {
      console.error('Error loading audio:', error)
      alert('Failed to load audio file')
      setIsLoading(false)
      setSelectedFile(null)
    }
  }

  const handleClear = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
    }
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Upload Your Music</h3>
            <p className="text-sm text-muted-foreground">
              Choose an audio file to visualize (MP3, WAV, OGG, WebM)
            </p>
          </div>

          {!selectedFile ? (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileSelect}
                className="hidden"
                id="audio-upload"
              />
              <label htmlFor="audio-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Click to upload audio file</p>
                    <p className="text-sm text-muted-foreground">or drag and drop</p>
                  </div>
                </div>
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Music className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                disabled={isLoading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {isLoading && (
            <div className="text-center text-sm text-muted-foreground">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              Loading audio...
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              disabled={!selectedFile || isLoading}
              onClick={() => audioRef.current?.play()}
            >
              <Music className="w-4 h-4 mr-2" />
              Play
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              disabled
              title="Microphone input coming soon"
            >
              <Mic className="w-4 h-4 mr-2" />
              Microphone
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
