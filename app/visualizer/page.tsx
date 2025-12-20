"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MusicVisualizer } from "@/components/music-visualizer"
import { AmbientVisualizer } from "@/components/ambient-visualizer"
import { Music, Sparkles, ArrowLeft, Info } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VisualizerPage() {
  const [ambientEnabled, setAmbientEnabled] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative">
      {/* Ambient Background Visualizer */}
      <AmbientVisualizer enabled={ambientEnabled} intensity={30} colorTheme="pink" />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full cosmic-gradient flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-2xl font-bold neon-text">PinkSync</span>
              </div>
            </div>

            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Music className="w-4 h-4 mr-2" />
              Music Visualizer
            </Badge>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              <span className="neon-text">See</span> the Music
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Experience audio through stunning visual effects. Built for accessibility, designed for everyone.
            </p>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Music className="w-5 h-5 text-primary" />
                  Frequency Bars
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Real-time audio frequency analysis displayed as colorful, pulsing bars
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Particle Effects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Dynamic particles respond to audio intensity, creating mesmerizing visual patterns
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Accessibility First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Fully customizable settings for visual comfort and accessibility needs
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Visualizer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <MusicVisualizer />
          </motion.div>

          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
                <CardDescription>Making music accessible through visual technology</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">🎵 Audio Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      The Web Audio API analyzes audio frequencies in real-time, breaking down sound into its
                      component frequencies.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🎨 Visual Mapping</h4>
                    <p className="text-sm text-muted-foreground">
                      Each frequency range is mapped to visual elements: bass frequencies create larger, slower
                      movements, while treble creates rapid, bright effects.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">♿ Accessibility</h4>
                    <p className="text-sm text-muted-foreground">
                      Deaf and hard-of-hearing users can "see" music through these visual representations, making
                      audio content accessible.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">⚙️ Customization</h4>
                    <p className="text-sm text-muted-foreground">
                      Adjust intensity, colors, and sensitivity to match your preferences and comfort levels.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Use Cases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-bold mb-6">Perfect For</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { title: "Deaf Users", desc: "Experience music visually" },
                { title: "Music Production", desc: "Analyze audio frequencies" },
                { title: "Education", desc: "Learn about sound waves" },
                { title: "Entertainment", desc: "Enjoy visual music art" },
              ].map((useCase) => (
                <Card key={useCase.title} className="text-center p-6">
                  <h4 className="font-semibold mb-2">{useCase.title}</h4>
                  <p className="text-sm text-muted-foreground">{useCase.desc}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
