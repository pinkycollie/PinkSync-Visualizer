'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Upload, Vibrate, Eye, Hand } from 'lucide-react';

const PinkSyncMusicVisualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [mode, setMode] = useState('color'); // color, haptic, sign
  const [intensity, setIntensity] = useState(5);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Emotion-to-color mapping (bass = warm, treble = cool)
  const getEmotionColor = (bass: number, treble: number) => {
    const hue = Math.floor(bass * 60 + treble * 240); // 0-60 red/orange, 240+ blue/purple
    const saturation = 70 + Math.floor(treble * 30);
    const lightness = 40 + Math.floor(bass * 30);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // Haptic feedback simulation
  const triggerHaptic = (strength: number) => {
    if ('vibrate' in navigator && mode === 'haptic') {
      navigator.vibrate(strength * 20);
    }
  };

  // Initialize audio context and analyzer
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      analyserRef.current.smoothingTimeConstant = 0.8;
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      setAudioFile(url);
      if (audioRef.current) {
        audioRef.current.src = url;
      }
    }
  };

  // Play/pause control
  const togglePlay = async () => {
    if (!audioFile) return;

    initAudio();

    if (!sourceRef.current && audioRef.current && audioContextRef.current && analyserRef.current) {
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    }

    if (isPlaying) {
      audioRef.current?.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    } else {
      await audioRef.current?.play();
      visualize();
    }
    setIsPlaying(!isPlaying);
  };

  // Main visualization loop
  const visualize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    if (!ctx || !analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      // Clear with fade effect
      ctx.fillStyle = 'rgba(10, 10, 20, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate bass and treble
      const bass = dataArray.slice(0, bufferLength / 4).reduce((a, b) => a + b) / (bufferLength / 4) / 255;
      const treble = dataArray.slice(bufferLength * 3 / 4).reduce((a, b) => a + b) / (bufferLength / 4) / 255;
      
      // Trigger haptic on strong bass
      if (bass > 0.6) {
        triggerHaptic(bass * intensity);
      }

      // Draw frequency bars with emotion colors
      const barWidth = canvas.width / bufferLength * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
        const color = getEmotionColor(bass, treble);
        
        ctx.fillStyle = color;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }

      // Draw central pulse circle
      const radius = 50 + bass * 150 + treble * 100;
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, radius
      );
      gradient.addColorStop(0, getEmotionColor(bass, treble));
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw particles for high frequencies
      if (treble > 0.5) {
        ctx.fillStyle = `hsla(${200 + treble * 140}, 80%, 70%, 0.8)`;
        for (let i = 0; i < 5; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 100 + Math.random() * 150;
          const px = canvas.width / 2 + Math.cos(angle) * distance;
          const py = canvas.height / 2 + Math.sin(angle) * distance;
          ctx.beginPath();
          ctx.arc(px, py, 3 + treble * 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    draw();
  };

  // Canvas resize handler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioFile) {
        URL.revokeObjectURL(audioFile);
      }
    };
  }, [audioFile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 text-white p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            🎶 PinkSync Music Visualizer
          </h1>
          <p className="text-lg text-pink-200">Feel the Beat. See the Sound. Experience Music Differently.</p>
          <p className="text-sm text-purple-300 mt-2">Deaf-First Accessibility Tool • MBTQ Ecosystem</p>
        </div>

        {/* Visualizer Canvas */}
        <div className="relative bg-black/40 rounded-2xl overflow-hidden backdrop-blur-sm border-2 border-pink-500/30 mb-6" 
             style={{ height: '400px' }}>
          <canvas 
            ref={canvasRef}
            className="w-full h-full"
          />
          
          {!audioFile && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Upload className="w-16 h-16 mx-auto mb-4 text-pink-400 opacity-50" />
                <p className="text-xl text-gray-400">Upload music to begin</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/30">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2 text-pink-300">Upload Audio</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition"
              >
                <Upload className="w-5 h-5" />
                Choose Audio File
              </button>
            </div>

            {/* Play/Pause */}
            <div>
              <label className="block text-sm font-medium mb-2 text-pink-300">Playback</label>
              <button
                onClick={togglePlay}
                disabled={!audioFile}
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition ${
                  audioFile 
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500' 
                    : 'bg-gray-700 cursor-not-allowed'
                }`}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>

          {/* Accessibility Modes */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-pink-300">Accessibility Mode</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setMode('color')}
                className={`py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition ${
                  mode === 'color' 
                    ? 'bg-pink-600 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Eye className="w-5 h-5" />
                Color Emotion
              </button>
              <button
                onClick={() => setMode('haptic')}
                className={`py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition ${
                  mode === 'haptic' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Vibrate className="w-5 h-5" />
                Haptic Mode
              </button>
              <button
                onClick={() => setMode('sign')}
                className={`py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition ${
                  mode === 'sign' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Hand className="w-5 h-5" />
                Sign Overlay
              </button>
            </div>
          </div>

          {/* Intensity Slider */}
          {mode === 'haptic' && (
            <div>
              <label className="block text-sm font-medium mb-2 text-pink-300">
                Haptic Intensity: {intensity}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-600"
              />
            </div>
          )}
        </div>

        {/* Mode Info */}
        <div className="mt-6 bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/30">
          <h3 className="text-xl font-bold mb-3 text-pink-300">
            {mode === 'color' && '🔵 Color Emotion Mapping'}
            {mode === 'haptic' && '🟣 Haptic Feedback Mode'}
            {mode === 'sign' && '🟢 Sign Overlay Mode'}
          </h3>
          <p className="text-gray-300">
            {mode === 'color' && 'Bass frequencies generate warm colors (red/orange), while treble creates cool colors (blue/purple). Watch the emotion of the music unfold visually.'}
            {mode === 'haptic' && 'Your device vibrates in sync with bass frequencies. Strong beats = stronger vibrations. Adjust intensity to match your preference.'}
            {mode === 'sign' && 'Coming soon: Real-time sign language avatar overlay synced to lyrics and rhythm. Part of the PinkSync x DeafAUTH integration.'}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-purple-300">
          <p>⚡ Powered by MBTQ.dev • Designed for the Deaf-first community</p>
          <p className="mt-2">Built with React, Web Audio API, Canvas 2D • Part of the PinkSync Ecosystem</p>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default PinkSyncMusicVisualizer;
