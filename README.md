# The Living Word Bible Journey

An interactive, mobile-friendly Bible study web app that guides users through 100 key stories in chronological order while highlighting one unified redemptive narrative.

## 5W1H (Clear Product Summary)

### Who
- Bible readers who want structured guidance instead of random reading.
- Individuals, small groups, and new believers who need a simple entry point.
- Learners who benefit from visual structure, story-to-story continuity, and reflection prompts.

### What
- A React + Vite web app with a curated 100-story Bible journey.
- Includes guided reading mode, thematic exploration, related-story graph, progress tracking, and Full Bible chapter browsing by Act.
- Provides scripture text lookup from Bible API with retry and fallback links.

### When
- Daily devotional reading.
- Group study preparation.
- Any time a user wants to continue from their last-read story and keep momentum.

### Where
- Runs in any modern browser on desktop and mobile.
- Can be deployed as a static site (recommended: Vercel).

### Why
- Many users feel overwhelmed by where to begin in the Bible.
- This app reduces friction by offering one clear path, progressive disclosure of advanced tools, and habit-loop features (streaks, prompts, summary).

### How
- Built with React, TypeScript, and Vite.
- Story metadata is maintained locally in TypeScript data files.
- User progress and preferences persist in localStorage.
- Scripture text is fetched from https://bible-api.com and cached client-side for resilience.

## Core Features

- 100-story canonical journey with quick navigation.
- Full Bible Mode with all chapters grouped by 8 Acts and linked back to story context.
- Guided (simple) vs exploratory study experience.
- Last-read resume and recommended next action.
- Mobile dashboard expand/collapse for reduced cognitive load.
- Narrative movement, covenant context, and persona-aware framing.
- Related-story graph and thematic thread exploration.
- Optional Deep Dive supplemental chapter panels (genealogies, laws, and contextual material).
- Daily prompt, streak tracking, and session summary reinforcement.
- Scripture fetch retry + external fallback link.
- PWA support via generated service worker.

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- Motion
- Lucide React
- vite-plugin-pwa

## Local Development

### Prerequisites

- Node.js 18+ (recommended)
- npm 9+

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

The app starts on port 3000 by default; Vite will auto-select the next available port if needed.

## Build and Validate

```bash
npm run lint
npm run test
npm run build
```

## Deployment (Fastest Path: Vercel)

This project is ready for Vercel deployment using [vercel.json](vercel.json).

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Confirm settings:
   - Build Command: npm run build
   - Output Directory: dist
4. Deploy.
5. Add your custom domain in Vercel project settings.

## PWA Verification (2 Minutes)

Use this quick check after each production deploy.

1. Open the deployed HTTPS URL in Chrome.
2. Confirm installability:
   - Look for the in-app `Install App` button.
   - Or check Chrome address bar install icon.
3. Confirm manifest + icons:
   - Open DevTools -> Application -> Manifest.
   - Verify app name and PNG icons (`192x192` and `512x512`).
4. Confirm service worker registration:
   - DevTools -> Application -> Service Workers.
   - Ensure one active service worker is running.
5. Confirm offline fallback:
   - DevTools -> Network -> set `Offline`.
   - Refresh the app and verify `offline.html` appears.
6. Return network to online and reload.

Expected result:
- The app is installable, the service worker is active, icons render correctly, and offline mode shows the fallback page.

## Project Structure

```text
.
├── public/
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── CovenantTracker.tsx
│   │   ├── DeepDivePanel.tsx
│   │   ├── FullBibleModeToggle.tsx
│   │   ├── TimelineVisualizer.tsx
│   │   └── WhereIsJesus.tsx
│   ├── index.css
│   ├── main.tsx
│   └── data/
│       ├── bibleStories.ts
│       ├── chronologicalPath.ts
│       ├── chronologicalPath.test.ts
│       └── unifiedFramework.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vercel.json
```

## Notes

- Progress, streak, onboarding state, and scripture cache are stored in browser localStorage.
- Scripture fetch quality depends on external API availability.
- If the API is unavailable, users can retry or open the same reference externally.
# living-word-bible-journey
