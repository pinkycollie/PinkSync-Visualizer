# 🚀 Deployment Guide - PinkSync Music Visualizer

This guide covers deploying PinkSync Music Visualizer to production.

---

## 📋 Pre-Deployment Checklist

- [ ] All tests passing locally
- [ ] Environment variables configured
- [ ] Build succeeds without errors (`npm run build`)
- [ ] TypeScript type check passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] PWA manifest configured
- [ ] Service worker tested

---

## 🔧 Vercel Deployment (Recommended)

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pinkycollie/PinkSync-Visualizer)

### Manual Deployment

#### 1. Install Vercel CLI
```bash
npm i -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```

#### 3. Deploy to Preview
```bash
vercel
```

#### 4. Deploy to Production
```bash
vercel --prod
```

### Environment Variables

Add these in your Vercel project dashboard (Settings → Environment Variables):

```env
NEXT_PUBLIC_API_URL=https://api.pinksync.com
NEXT_PUBLIC_ENABLE_HAPTICS=true
NEXT_PUBLIC_ENABLE_3D_VISUALIZER=true
NEXT_PUBLIC_ENABLE_SOCIAL_SHARING=true
```

### Build Configuration

Vercel automatically detects Next.js. No configuration needed!

**Build Command:** `npm run build`
**Output Directory:** `.next`
**Install Command:** `npm install --legacy-peer-deps`

---

## 🐳 Docker Deployment

### Using Docker Compose

#### 1. Build and Run
```bash
docker-compose up -d
```

#### 2. Access Application
Visit `http://localhost:3000`

### Using Dockerfile

#### 1. Build Image
```bash
docker build -t pinksync-visualizer .
```

#### 2. Run Container
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.pinksync.com \
  pinksync-visualizer
```

---

## ☁️ AWS Deployment

### Option 1: AWS Amplify

1. Connect GitHub repository to Amplify
2. Configure build settings:
   - Build command: `npm run build`
   - Base directory: `/`
   - Output directory: `.next`
3. Add environment variables
4. Deploy

### Option 2: AWS ECS + Fargate

1. Build Docker image
2. Push to ECR
3. Create ECS task definition
4. Deploy to Fargate cluster

---

## 🌐 Netlify Deployment

### Deploy from Git

1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your repository
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables
6. Deploy

### Deploy from CLI

```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod
```

---

## 📱 PWA Setup

### Verify PWA Configuration

1. Build for production
2. Run Lighthouse audit:
   - Chrome DevTools → Lighthouse → Run audit
3. Check PWA score (should be 100)

### PWA Checklist

- [x] `manifest.json` configured
- [x] Service worker registered
- [x] Icons (192x192, 512x512)
- [x] HTTPS enabled (required for PWA)
- [x] Offline fallback page

### Test Installation

#### Desktop
1. Visit site in Chrome
2. Look for install icon in address bar
3. Click to install

#### Mobile
1. Visit site in mobile browser
2. Tap "Add to Home Screen"
3. Launch from home screen

---

## 🔐 Security Configuration

### Headers

Add these headers in `next.config.mjs`:

```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
      ],
    },
  ]
}
```

### CORS Configuration

For API routes, configure CORS:

```typescript
// app/api/*/route.ts
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
```

---

## 📊 Monitoring & Analytics

### Add Analytics

1. **Vercel Analytics** (Recommended)
   ```bash
   npm install @vercel/analytics
   ```
   
   Add to layout:
   ```tsx
   import { Analytics } from '@vercel/analytics/react'
   
   <Analytics />
   ```

2. **Google Analytics**
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

3. **Plausible Analytics** (Privacy-focused)
   ```env
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=visualizer.pinksync.com
   ```

### Error Tracking

Consider adding Sentry:

```bash
npm install @sentry/nextjs
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci --legacy-peer-deps
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🧪 Production Testing

### Smoke Tests

```bash
# Build succeeds
npm run build

# Type check passes
npm run type-check

# Linting passes
npm run lint

# Start production server
npm start

# Test in browser
open http://localhost:3000/visualizer
```

### Lighthouse Audit

```bash
npm install -g lighthouse
lighthouse http://localhost:3000/visualizer --view
```

Target scores:
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- PWA: 100

---

## 🌍 Domain & SSL

### Custom Domain

1. Add domain in Vercel dashboard
2. Configure DNS:
   ```
   A     @       76.76.21.21
   CNAME www     cname.vercel-dns.com
   ```
3. SSL automatically provisioned by Vercel

### Subdomain Setup

For `visualizer.pinksync.com`:
```
CNAME visualizer cname.vercel-dns.com
```

---

## 📈 Performance Optimization

### Checklist

- [x] Image optimization (Next.js Image)
- [x] Code splitting (automatic in Next.js)
- [x] Lazy loading (React.lazy for heavy components)
- [x] Service worker caching
- [x] Gzip compression (enabled by Vercel)
- [x] Tree shaking (automatic in Next.js)

### CDN Configuration

Vercel provides global CDN automatically. For custom CDN:

1. CloudFlare: Add site to CloudFlare
2. Configure DNS to point to CloudFlare
3. Set SSL/TLS mode to "Full"

---

## 🆘 Troubleshooting

### Build Failures

**Issue:** Dependency conflicts
```bash
npm install --legacy-peer-deps
```

**Issue:** TypeScript errors
```bash
npm run type-check
```

**Issue:** Out of memory
```bash
NODE_OPTIONS="--max_old_space_size=4096" npm run build
```

### Runtime Issues

**Issue:** Audio not working
- Check HTTPS is enabled
- Verify Web Audio API support
- Check browser permissions

**Issue:** Haptics not working
- Verify device supports Vibration API
- Check user gesture requirement (click/tap)
- Test on physical mobile device

### PWA Issues

**Issue:** Not installable
- Verify HTTPS
- Check manifest.json
- Ensure service worker registered
- Run Lighthouse audit

---

## 📞 Support

Need help deploying?

- 📧 Email: support@pinksync.com
- 💬 Discord: [discord.gg/pinksync](https://discord.gg/pinksync)
- 📚 Docs: [docs.pinksync.com](https://docs.pinksync.com)

---

## ✅ Post-Deployment

After successful deployment:

1. ✅ Test all features in production
2. ✅ Verify PWA installation works
3. ✅ Check analytics are working
4. ✅ Monitor error tracking
5. ✅ Test on multiple devices
6. ✅ Share with community! 🎉

---

**Happy Deploying! 🚀**
