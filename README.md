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

Accessibility Modes:

🔵 Color Emotion Mapping (bass = pulse, treble = spark).

🟣 Haptic Mode (phone vibration / wearable feedback).

🟢 Sign Overlay Mode (syncs with signing avatars).

Browser-based MVP → No install required, just open and play.

PinkSync API Integration → Custom color palettes, vibration intensity settings.

🛠️ Tech Stack

Frontend: Next.js, React, TailwindCSS

Visual Engine: Three.js / WebGL, p5.js

Audio Processing: Web Audio API, Tone.js

Accessibility Layer: PinkSync API

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

Visit http://localhost:3000 in your browser.

### Access the Visualizer

- Local: http://localhost:3000/visualizer
- GitHub Pages: https://pinkycollie.github.io/PinkSync-Visualizer/visualizer

🎨 Roadmap

✅ Audio Upload & Visualizer MVP

 Live Streaming Integration (YouTube / Spotify / Twitch)

 Haptic Feedback Device API (Apple Watch, wristbands, VR haptics)

 Multi-user Shared Experience (sync visuals in real-time across rooms)

 VR Mode (PinkSync x VR4Deaf immersive concerts)

📦 Deployment

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

🤝 Community & Partnerships

PinkSync Music Visualizer is part of the MBTQ.dev Deaf-First ecosystem, supporting accessibility-driven entrepreneurship and entertainment.

Strategic integration partners:

🎧 VR4Deaf (wearables + immersive store)

🎥 Deaf creators & streamers (inclusive content)

🎤 Vocational Rehab & Workforce Programs (event accessibility)

📜 License

MIT — Open-source under the MBTQ.dev initiative.

⚡ PinkSync Music Visualizer — Powered by MBTQ.dev. Designed for the Deaf-first future.
Built to be felt, seen, and scaled. PinkSync — prepare to move audiences, devices, and markets.
