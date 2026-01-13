# Tiny Tools — Project Overview

## What is Tiny Tools?

**Tiny Tools** is a lightweight web app that collects small, single-purpose utilities you actually use in day-to-day work.

Instead of searching for random websites full of ads, popups, or paywalls, Tiny Tools gives you fast, clean tools in one place — instantly usable and offline-friendly.

---

## 🚀 Live Demo

**Check out the live demo:** [tinytools-preview.vercel.app](https://tinytools-preview.vercel.app)

---

## The Core Idea

> One tool. One purpose. Zero clutter.

Each tool in Tiny Tools:
- Solves **one specific problem**
- Fits on **a single screen**
- Updates **instantly** (no submit buttons)
- Requires **no login**
- Works **offline** when possible

If a tool needs a tutorial or multiple steps, it probably doesn't belong here.

---

## Who Is This For?

- Developers
- Designers
- Students
- Anyone who frequently needs quick utilities like:
  - Formatting data
  - Generating values
  - Converting text
  - Working with colors or UI values

---

## ✅ Available Tools

### Text & Dev Utilities
- **JSON Formatter & Validator** - Format and validate JSON with real-time feedback
- **Base64 Encoder / Decoder** - Two-way conversion with mode toggle
- **URL Encode / Decode** - Convert text to URL-safe format and back
- **UUID Generator** - Generate unique identifiers (1-100 at once)

### UI & Design Helpers
- **Color Palette Generator** - Create harmonious color palettes from any base color
- **CSS Gradient Generator** - Design beautiful gradients with live preview

### File & Misc
- More tools coming soon...

---

## Design Principles

### 1. Speed First
- No unnecessary animations
- Instant input → output
- Client-side processing whenever possible

### 2. Clean UI
- Minimal layouts
- Consistent tool structure
- Icons + subtle micro-interactions
- Dark & light mode support

### 3. Offline-Friendly
- Tools should work without an internet connection when possible
- Progressive Web App (PWA) support

### 4. Easy to Extend
- Each tool is isolated
- New tools can be added without touching unrelated code
- Shared layout and UI components

---

## Technical Stack

- **React** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **GSAP** for advanced animations
- **AOS** for scroll animations
- **Lucide React** for beautiful icons

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/evilshxt/tinytools.git
cd tinytools

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
tinytools/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Sidebar.tsx
│   │   └── ui/       # Individual tool implementations
│   │       ├── DefaultTool.tsx
│   │       ├── JsonFormatter.tsx
│   │       ├── Base64Encoder.tsx
│   │       ├── UuidGenerator.tsx
│   │       ├── UrlEncoder.tsx
│   │       ├── ColorPalette.tsx
│   │       └── CssGradient.tsx
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── styles/         # Global styles and Tailwind config
├── public/             # Static assets
│   ├── favicon.svg
│   └── manifest.json
└── dist/               # Build output
```

---

## What Tiny Tools Is *Not*

- ❌ A SaaS product (at least for now)
- ❌ A bloated "do-everything" app
- ❌ A replacement for full IDEs or professional tools
- ❌ An ad-heavy utility site

---

## Long-Term Vision

- Favorites & recently used tools
- Keyboard shortcuts
- Shareable tool URLs
- Optional AI-assisted helpers
- Community-contributed tools

---

## Philosophy

> Small tools compound into big productivity gains.

Tiny Tools focuses on usefulness, polish, and simplicity.  
If it saves you even 10 seconds, it's worth existing.

---

## Contributing

Ideas, improvements, and new tools are welcome.
If you can explain a tool in one sentence, it probably fits.

### Development Guidelines

1. Keep tools simple and focused
2. Follow the existing code structure
3. Ensure tools work offline when possible
4. Add proper TypeScript types
5. Test your tools before submitting

---

## License

MIT License - feel free to use this project for your own purposes!

---

## Acknowledgments

Built with modern web technologies to make developers' lives easier, one tiny tool at a time.

**Special thanks to the open-source community for the amazing tools and libraries that make this project possible!**
