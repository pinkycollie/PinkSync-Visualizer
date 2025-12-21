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
🎶 # 🎶 PinkSync Music Visualizer

[![GitHub Stars](https://img.shields.io/github/stars/pinkycollie/PinkSync-Visualizer?style=for-the-badge)](https://github.com/pinkycollie/PinkSync-Visualizer/stargazers)
[![Forks](https://img.shields.io/github/forks/pinkycollie/PinkSync-Visualizer?style=for-the-badge)](https://github.com/pinkycollie/PinkSync-Visualizer/network/members)
[![Open Issues](https://img.shields.io/github/issues/pinkycollie/PinkSync-Visualizer?style=for-the-badge)](https://github.com/pinkycollie/PinkSync-Visualizer/issues)
[![Top Language](https://img.shields.io/github/languages/top/pinkycollie/PinkSync-Visualizer?style=for-the-badge)](https://github.com/pinkycollie/PinkSync-Visualizer)
[![License](https://img.shields.io/github/license/pinkycollie/PinkSync-Visualizer?style=for-the-badge)](https://github.com/pinkycollie/PinkSync-Visualizer/blob/main/LICENSE)
[![Acquisition Ready](https://img.shields.io/badge/Acquisition--Ready-Yes-brightgreen?style=for-the-badge)]()

> Feel the beat. See the sound. Build inclusive, multisensory music experiences — engineered for scale and acquisition.

Animated demo / hero GIF: ![demo-placeholder](./assets/demo.gif)  <!-- Replace with your demo GIF or screenshot -->

---

Why this repo matters
- Deaf-first, accessibility-driven visualizer that transforms audio into visuals, haptics, and emotional color mapping.
- **New: Interactive Music Visualizer** - Experience music through colorful visual effects with customizable themes and settings.
- Production-grade visual engine built on Web Audio API and Canvas animations.
- Designed for rapid enterprise adoption — modular, documented, and ready for due diligence.

Quick highlights
- 🎵 Interactive music visualizer with real-time audio analysis
- Real-time particle & shader-driven visuals
- Emotion & frequency-aware color mapping
- Mobile haptics + wearable-ready hooks
- Sign-avatar overlay support for inclusive experiences
- Browser-first: no install required (Next.js frontend)
- User-controlled visual effects (enable/disable, adjust intensity & colors)

Table of contents
- Features
- Architecture
- Quickstart
- Environment & config
- Deploy
- Roadmap
- Contributing & Code of Conduct
- Security
- License & Business / Acquisition

## 🚀 Features
- **🎵 Music Visualizer**: Transform audio into stunning visual effects with colorful animations
  - Real-time frequency analysis and visual mapping
  - Customizable color themes (Rainbow, PinkSync, Teal, Purple, Fire)
  - Particle effects that respond to audio intensity
  - Adjustable intensity and sensitivity settings
  - Accessibility-first design for deaf/hard of hearing users
- Upload or stream audio (MP3 / live input)
- High-fidelity visual engine: Three.js, p5.js, custom GLSL shaders
- Advanced audio analysis: Web Audio API + Tone.js
- Accessibility-first modes:
  - Color Emotion Mapping (bass → pulse, treble → spark)
  - Haptic Mode (phone vibration / wearable feedback)
  - Sign Overlay Mode (syncs with signing avatars)
- PinkSync API for palettes and haptic tuning
- Extensible plugin system for new visual presets & device integrations

## 🏗 Architecture (high level)
- Frontend: Next.js + React + Tailwind CSS
- Visual Engine: Three.js / WebGL + p5.js for particle systems
- Audio Pipeline: Web Audio API → FFT + feature extraction → visual mapping
- Integration Layer: PinkSync API for personalization, presets, and analytics
- Deployment: Vercel recommended for frontend; serverless or edge functions for API

Add architecture diagram: ./docs/architecture.svg or ./docs/mbtq_architecture.html

## ⚡ Quickstart (local)
1. Clone
   git clone https://github.com/pinkycollie/PinkSync-Visualizer.git
   cd PinkSync-Visualizer

2. Install
   npm ci

3. Dev
   npm run dev

4. Open
   http://localhost:3000

## 🔧 Environment (example)
Create a .env.local at project root:


(Replace with actual env vars used in codebase — update names if needed.)

## 📦 Recommended Deploy
One-click to Vercel:
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/pinkycollie/PinkSync-Visualizer)

Pro tips:
- Use edge functions for low-latency audio routing in production.
- Serve optimized static assets (LZ4 compressed GLTF / texture atlases) for fast cold starts.

## 🛣 Roadmap (acquisition-focused)
- Q1: Harden API + explicit enterprise onboarding docs
- Q2: Haptic SDK for Apple Watch & Android wearables
- Q3: Live-stream integrations (Spotify, YouTube, Twitch)
- Q4: Multi-user synchronized sessions & VR mode
- Ongoing: Accessibility audits and privacy/compliance docs for enterprise buyers

## 💼 Business / Acquisition Notes
This repository is being prepared for acquisition. Current preparations include:
- Clear, modular architecture and a single-purpose, audited codebase
- Developer and onboarding documentation for fast due diligence
- Demo-ready assets (demo GIFs, investor-ready deck available on request)
- Contact for acquisition conversation: @pinkycollie (open to NDA / LOI discussions)

If you're an investor or integrator and want an NDA'd walk-through or private branch access, open an issue or email contact@pinksync.example (replace with real contact).

## 🤝 Contributing
We welcome collaborators. To contribute:
1. Fork the repo
2. Create a branch: feat/your-feature
3. Add tests and docs
4. Open a PR referencing a related issue

Please use Conventional Commits for commit messages (feat/fix/chore/docs/refactor).

## 📜 Code of Conduct
This project follows a Code of Conduct to maintain a welcoming, inclusive community. By participating, you agree to abide by it. See CODE_OF_CONDUCT.md.

## 🔒 Security
To report security vulnerabilities responsibly, please open a private security issue or contact security@pinksync.example (replace with real email). Do not disclose vulnerabilities in public issues.

## 🧪 CI / Tests
Add CI workflows for:
- Linting (ESLint + Prettier)
- Unit tests (Jest / Vitest)
- Integration / visual regression tests (Playwright / Percy)
Include badge here when CI is enabled:
[![CI status](https://img.shields.io/badge/CI-not%20configured-lightgrey?style=for-the-badge)]()

## 📚 Docs & Assets
- User docs: ./docs/user-guide.md
- Developer docs: ./docs/developer-guide.md
- Architecture: ./docs/architecture.svg or ./docs/mbtq_architecture.html
- Demo assets: ./assets/

## 🙏 Acknowledgements & Partners
- MBTQ.dev — Deaf-first ecosystem
- VR4Deaf — wearable & immersive partner
- Deaf creators & community partners

## 📬 Contact
- Repo: https://github.com/pinkycollie/PinkSync-Visualizer
- Issues: https://github.com/pinkycollie/PinkSync-Visualizer/issues
- Owner: @pinkycollie

## ⚖️ License
MIT — see LICENSE

---

Feel the Beat. See the Sound. Experience Music Differently.

The PinkSync Music Visualizer is a Deaf-First accessibility tool that transforms music and sound into vibrations, visuals, and emotional color mapping. Built for the MBTQ ecosystem, this visualizer bridges rhythm and emotion across sight, touch, and motion — making sound universally accessible.

✨ Features

Upload or Stream Music → Drop an MP3 or connect to live audio.

Dynamic Visuals → Real-time particle animations powered by Three.js & Web Audio API.

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
🚀 Getting Started

### Local Development

1. Clone the Repo
```bash
git clone https://github.com/pinkycollie/PinkSync-Visualizer.git
cd PinkSync-Visualizer
```

2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

3. Run Dev Server
```bash
npm run dev
```

---

## 📊 Performance

- **Initial Load**: < 3s on 4G
- **Audio Analysis**: 60 FPS real-time
- **3D Rendering**: 60 FPS @ 1080p
- **PWA Size**: ~2MB (cached)
- **Max File Size**: 50MB audio files
### Access the Visualizer

- Local: http://localhost:3000/visualizer
- GitHub Pages: https://pinkycollie.github.io/PinkSync-Visualizer/visualizer

🎨 Roadmap

✅ Audio Upload & Visualizer MVP

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
### GitHub Pages (Automatic)

This project is configured for automatic deployment to GitHub Pages. Every push to the `main` branch triggers a deployment workflow.

To enable GitHub Pages:
1. Go to your repository Settings
2. Navigate to Pages section
3. Under "Build and deployment", select "GitHub Actions" as the source
4. The site will be deployed automatically

The visualizer will be available at: `https://pinkycollie.github.io/PinkSync-Visualizer/visualizer`

### Manual Build

To build the static site manually:
```bash
npm run build
```

The static files will be generated in the `out/` directory.

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
⚡ PinkSync Music Visualizer — Powered by MBTQ.dev. Designed for the Deaf-first future.
Built to be felt, seen, and scaled. PinkSync — prepare to move audiences, devices, and markets.
