# Steady Mind 🌿

![Build & Test](https://github.com/kevinslawinski/steady-mind/actions/workflows/build-and-test.yml/badge.svg)
![Deploy](https://github.com/kevinslawinski/steady-mind/actions/workflows/deploy.yml/badge.svg)

A simple mental health app designed to help users identify grounding techniques and coping mechanisms through guided prompts and interactive experiences.

> **⚠️ Project Status**: This project is in **active development** and not yet production-ready. Features are being built iteratively.

> **Important Disclaimer**: Steady Mind is NOT a replacement for professional therapy or medical treatment. This is a supportive tool to help users explore common coping mechanisms during difficult moments.

## ✨ Features

### Current Implementation

- **🏠 Home/Guided Support** - Mobile-first Q&A interface for immediate support (combined landing + guided prompts)
- **💬 Interactive Questions** - Progressive question system with emoji-based options and progress tracking
- **📚 Coping Library** - Curated collection of grounding techniques (foundation implemented)
- **🆘 Crisis Resources** - Prominent access to crisis hotlines and professional resources
- **🌓 Light/Dark Mode** - Accessible theme toggle with system preference detection
- **♿ Accessibility First** - WCAG 2.1 AA compliant with keyboard navigation and screen reader support

### Design Principles

- **Calm and Grounding** - Peaceful, supportive design with soft color palettes
- **Modern and Clean** - Minimalist interface with transparent header and unified scroll
- **Compassionate** - Warm, supportive language throughout
- **Mobile-First** - Direct access to support without landing page friction
- **Privacy First** - Transparent about data handling, minimal data collection

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at `http://localhost:4200/`

### Available Scripts

```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run unit tests
npm run watch    # Build in watch mode
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── layout/          # Header (transparent, sticky), Navigation components
│   │   └── services/        # Theme service, etc.
│   ├── features/
│   │   ├── home/            # Main guided Q&A interface (mobile-first)
│   │   ├── coping-library/  # Coping mechanisms library (foundation)
│   │   └── crisis-resources/ # Crisis hotlines & resources (fully implemented)
│   ├── app.ts               # Root component
│   └── app.routes.ts        # Route configuration
├── globals/
│   └── app.constants.ts     # App-wide constants (APP_TITLE, etc.)
└── styles.scss              # Global styles & theme variables
```

## 🎨 Design System

### Color Palette

**Light Mode:**

- Primary: Calming Blue (#4a90e2)
- Secondary: Soft Green (#66bb6a)
- Accent: Warm Support (#ff7043)

**Dark Mode:**

- Automatically adjusts for gentle, non-jarring experience
- Respects system preferences

### Accessibility Features

- ✅ Keyboard navigation support
- ✅ Screen reader compatible
- ✅ Focus indicators on all interactive elements
- ✅ Sufficient color contrast ratios
- ✅ Reduced motion support
- ✅ Skip to main content link
- ✅ Semantic HTML throughout

## 🛠️ Technology Stack

- **Angular** - Modern framework with signals and standalone components
- **TypeScript** - Strongly-typed development
- **SCSS** - Advanced styling with CSS custom properties
- **RxJS** - Reactive programming
- **Vitest** - Fast unit testing framework

### Modern Angular Features

- ✅ Signals for reactive state management
- ✅ Standalone components (no NgModules)
- ✅ New control flow syntax (@if, @for)
- ✅ OnPush change detection strategy
- ✅ Lazy-loaded routes
- ✅ input() and output() functions

## 📋 Roadmap

### Phase 1 (Current) ✅

- [x] Core application structure
- [x] Navigation and layout (transparent header, side drawer)
- [x] Theme system with light/dark mode
- [x] Crisis resources page (fully implemented)
- [x] Mobile-first home page with guided Q&A interface
- [x] Interactive question system with progress tracking
- [x] Accessibility features (WCAG 2.1 AA)

### Phase 2 (Next)

- [ ] Complete recommendation logic for guided prompts
- [ ] Build coping mechanisms database/library
- [ ] Add search and filtering for coping techniques
- [ ] Create breathing exercises component
- [ ] Add grounding techniques (5-4-3-2-1, etc.)

### Phase 3 (Future)

- [ ] User preferences and personalization
- [ ] Offline support (PWA)
- [ ] Multi-language support
- [ ] iOS/Android app versions
- [ ] Backend integration (optional)

## 🎯 Development Priorities

This personal project prioritizes:

- User wellbeing and safety
- Privacy and data security
- Accessibility for all users
- Evidence-based coping techniques
- Compassionate, non-clinical language

## 🆘 Mental Health Resources

If you or someone you know is in crisis:

- **988 Suicide & Crisis Lifeline**: Call or Text 988
- **Crisis Text Line**: Text HOME to 741741
- **SAMHSA National Helpline**: 1-800-662-4357
- **Emergency Services**: Call 911
