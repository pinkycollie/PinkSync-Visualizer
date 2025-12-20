🎶 PinkSync Music Visualizer

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
