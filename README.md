# 🎶 PinkSync Music Visualizer

**Feel the Beat. See the Sound. Experience Music Differently.**

The PinkSync Music Visualizer is a **Deaf-First accessibility tool** that transforms music and sound into vibrations, visuals, and emotional color mapping. Built for the MBTQ ecosystem, this visualizer bridges rhythm and emotion across sight, touch, and motion — making sound universally accessible.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.4-black)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.160-green)](https://threejs.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue)](https://web.dev/pwa/)

---

## ✨ Features

### 🎵 Audio Processing
- **Upload & Play** - Support for MP3, WAV, OGG, WebM formats
- **Real-time Analysis** - Web Audio API with FFT for frequency analysis
- **Beat Detection** - Automatic BPM and rhythm detection
- **Advanced Processing** - Tone.js integration for music theory analysis

### 🌈 3D Visualization
- **GPU-Accelerated** - Three.js + WebGL particle systems
- **Dynamic Colors** - 8 built-in color palettes (Rainbow, Ocean, Neon, etc.)
- **Responsive Particles** - Up to 200 particles responding to audio frequencies
- **Real-time Animation** - Bass, mid, and treble frequency mapping

### 📳 Haptic Feedback
- **Deaf-First Design** - Vibration patterns synced to music
- **8 Pattern Types** - Pulse, Bass Heavy, Rhythm, Energetic, and more
- **Adjustable Intensity** - 0-100% vibration strength control
- **Auto Beat Sync** - Vibrates on detected beats

### ♿ Accessibility Modes
- **Visual Only** - See the music through colors and motion
- **Haptic Only** - Feel the music through vibrations
- **Combined Mode** - Full immersive experience (recommended)

### 📱 Progressive Web App
- **Install to Home Screen** - Works like a native app
- **Offline Support** - Service worker caching
- **Share Music** - Share audio files directly to visualizer
- **No App Store** - Install in 3 clicks from browser

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15.4 (App Router) |
| **Frontend** | React 19, TypeScript, TailwindCSS |
| **3D Graphics** | Three.js, React Three Fiber, @react-three/drei |
| **Audio** | Web Audio API, Tone.js, Meyda |
| **Haptics** | Web Vibration API, Custom Pattern Engine |
| **State** | React Hooks, Context API |
| **API** | Next.js API Routes (RESTful) |
| **Deployment** | Vercel, PWA Support |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- Modern browser with Web Audio API support

### 1. Clone the Repository
```bash
git clone https://github.com/pinkycollie/PinkSync-Visualizer.git
cd PinkSync-Visualizer
```

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
# or
pnpm install
```

### 3. Set Up Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and configure:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_HAPTICS=true
NEXT_PUBLIC_ENABLE_3D_VISUALIZER=true
```

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000/visualizer](http://localhost:3000/visualizer)

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 📂 Project Structure

```
PinkSync-Visualizer/
├── app/                          # Next.js 14 app router
│   ├── page.tsx                  # Landing page
│   ├── visualizer/               # Main visualizer app
│   │   └── page.tsx              # Visualizer UI
│   └── api/                      # API routes
│       ├── audio/route.ts        # Audio processing endpoints
│       ├── haptic/route.ts       # Haptic pattern API
│       └── visualizer/
│           ├── presets/route.ts  # Color palette presets
│           └── save/route.ts     # Save preferences
├── components/
│   ├── Visualizer3D.tsx          # Three.js 3D visualizer
│   ├── AudioUploader.tsx         # Audio file upload
│   ├── HapticControls.tsx        # Haptic feedback controls
│   └── AccessibilityModes.tsx    # Mode switcher
├── lib/
│   ├── audio/
│   │   ├── analyzer.ts           # Web Audio API wrapper
│   │   ├── tone-processor.ts     # Tone.js integration
│   │   └── beat-detector.ts      # Beat detection engine
│   ├── haptic/
│   │   ├── patterns.ts           # Vibration pattern library
│   │   └── device-manager.ts     # Device haptic manager
│   └── pinksync-api.ts           # PinkSync API client
├── public/
│   ├── manifest.json             # PWA manifest
│   └── sw.js                     # Service worker
└── package.json
```

---

## 🎨 Usage

### Basic Usage
1. Go to `/visualizer`
2. Click "Upload Your Music" and select an audio file
3. Choose an accessibility mode (Visual, Haptic, or Combined)
4. Press Play and experience the music!

### Customization
- **Presets**: Choose from Balanced, Calm, Energetic, Minimal, or Immersive
- **Intensity**: Adjust particle count and animation intensity
- **Haptic**: Configure vibration patterns and strength
- **Color Palette**: Select from 8 pre-built palettes

### Keyboard Shortcuts
- `Space` - Play/Pause
- `Arrow Keys` - Seek forward/backward
- `+/-` - Adjust volume

---

## 🔌 API Reference

### Audio Processing
```
POST /api/audio
- Upload and process audio files
- Returns: file metadata and processing status
```

### Haptic Patterns
```
GET /api/haptic
- Get available vibration patterns
- Returns: pattern library and device capabilities

POST /api/haptic
- Validate custom vibration patterns
- Body: { pattern: number[], intensity: number }
```

### Visualizer Presets
```
GET /api/visualizer/presets
- Get color palettes and visualizer presets
- Returns: palettes and preset configurations
```

### Save Preferences
```
POST /api/visualizer/save
- Save user preferences and visualizations
- Body: { userId, preferences, visualization }

GET /api/visualizer/save?userId=xxx
- Get saved user preferences
```

---

## 📱 PWA Installation

### Desktop (Chrome/Edge)
1. Visit the visualizer
2. Click the install icon in the address bar
3. Click "Install"

### Mobile (iOS Safari)
1. Visit the visualizer
2. Tap the Share button
3. Tap "Add to Home Screen"

### Mobile (Android Chrome)
1. Visit the visualizer
2. Tap the menu (⋮)
3. Tap "Install app"

---

## 🎯 Roadmap

### ✅ Phase 1: MVP (Current)
- [x] Audio upload and processing
- [x] 3D particle visualization
- [x] Haptic feedback system
- [x] Three accessibility modes
- [x] PWA support

### 🚧 Phase 2: Enhanced Features (In Progress)
- [ ] Microphone input support
- [ ] Video export with PinkSync watermark
- [ ] Social media sharing (TikTok, Instagram)
- [ ] Custom color palette creator
- [ ] Save and share visualizations

### 🔮 Phase 3: Platform Integration
- [ ] Spotify Web API integration
- [ ] YouTube audio streaming
- [ ] Apple Music integration
- [ ] Twitch live stream support
- [ ] DeafAUTH authentication

### 🌟 Phase 4: Advanced Features
- [ ] Multi-user sync (watch parties)
- [ ] VR mode integration
- [ ] Subpac wearable support
- [ ] Apple Watch haptic sync
- [ ] Custom hardware (Arduino/ESP32)

---

## 📦 Deployment

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pinkycollie/PinkSync-Visualizer)

### Environment Variables (Vercel)
Add these in your Vercel project settings:
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_ENABLE_HAPTICS`
- `NEXT_PUBLIC_ENABLE_3D_VISUALIZER`

---

## 🤝 Community & Partnerships

PinkSync Music Visualizer is part of the **MBTQ.dev Deaf-First ecosystem**, supporting accessibility-driven entrepreneurship and entertainment.

### Strategic Partners
- 🎧 **VR4Deaf** - Wearables + immersive store
- 🎥 **Deaf Creators** - Inclusive content production
- 🎤 **Vocational Rehab Programs** - Event accessibility
- 🌐 **Fibonrose** - Trust verification system

### Get Involved
- 💬 Join our [Discord community](https://discord.gg/pinksync)
- 🐛 Report bugs via [GitHub Issues](https://github.com/pinkycollie/PinkSync-Visualizer/issues)
- 💡 Request features via [Discussions](https://github.com/pinkycollie/PinkSync-Visualizer/discussions)
- 🤝 Contribute via [Pull Requests](https://github.com/pinkycollie/PinkSync-Visualizer/pulls)

---

## 📊 Performance

- **Initial Load**: < 3s on 4G
- **Audio Analysis**: 60 FPS real-time
- **3D Rendering**: 60 FPS @ 1080p
- **PWA Size**: ~2MB (cached)
- **Max File Size**: 50MB audio files

---

## 🔒 Security

- Client-side audio processing (no upload to server in MVP)
- CORS-compliant audio loading
- Service worker cache encryption
- No tracking or analytics by default

---

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

Open-source under the **MBTQ.dev** initiative.

---

## 👏 Credits

Built with ❤️ by the PinkSync team for the Deaf community.

**Special Thanks:**
- Deaf community feedback and testing
- MBTQ.dev ecosystem partners
- Open-source contributors

---

## 📧 Contact

- **Email**: support@pinksync.com
- **Twitter**: [@PinkSyncDev](https://twitter.com/PinkSyncDev)
- **Website**: [pinksync.com](https://pinksync.com)

---

⚡ **PinkSync Music Visualizer** — Powered by MBTQ.dev. Designed for the Deaf-first future.
