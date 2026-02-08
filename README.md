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
- **📚 Coping Library** - Full searchable library with 5 strategies, category/emotion filtering, favorites, expandable instructions
- **🔍 Smart Filtering** - Search, category filters, emotion tags, and favorites system with localStorage persistence
- **🆘 Crisis Resources** - Prominent access to crisis hotlines and professional resources
- **🌓 Light/Dark Mode** - Accessible theme toggle with system preference detection
- **♿ Accessibility First** - WCAG 2.1 AA compliant with keyboard navigation and screen reader support

### Design Principles

- **Calm and Grounding** - Peaceful, supportive design with soft color palettes
- **Modern and Clean** - Minimalist interface with transparent header and unified scroll
- **Compassionate** - Warm, supportive language throughout
- **Mobile-First** - Direct access to support without landing page friction
- **Privacy First** - Transparent about data handling, minimal data collection

## 🚀 Try It Out

**Live Demo**: [https://kevinslawinski.github.io/steady-mind](https://kevinslawinski.github.io/steady-mind)

### For Developers

For detailed setup, scripts, architecture, and development guidelines, see [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

## 🏗️ Project Overview

Steady Mind is built with **Angular 20+** using modern patterns like signals, standalone components, and a utility-first CSS architecture. The app is organized into:

- **Core**: Layout components (header, navigation) and services (theme, coping strategies)
- **Features**: Home, guided prompts, coping library, crisis resources
- **Documentation**: All developer docs live in the `docs/` folder

For detailed architecture, see [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

## 🎨 Design Philosophy

- **Calming Colors** - Soft blues and greens in light mode, gentle dark theme
- **Accessible** - WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Responsive** - Mobile-first design that works beautifully on all devices
- **Compassionate** - Supportive, non-clinical language throughout

For CSS architecture and styling guidelines, see [docs/CSS-ARCHITECTURE.md](docs/CSS-ARCHITECTURE.md).

## 📋 Roadmap

### Phase 1 ✅ Complete

- [x] Mobile-first interface with immediate support access
- [x] Interactive guided questions with progress tracking
- [x] Coping library with 5 strategies (breathing, grounding, etc.)
- [x] Search and filter by category/emotion
- [x] Favorites system with localStorage
- [x] Crisis resources with prominent hotlines
- [x] Light/dark theme with system detection
- [x] Full accessibility (WCAG 2.1 AA)

### Phase 2 (Current Focus)

- [ ] Connect guided prompts to personalized recommendations
- [ ] Add custom strategy creation UI
- [ ] Expand strategy library beyond 5 defaults
- [ ] Interactive timers for breathing exercises
- [ ] Step-through mode for guided techniques
- [ ] Strategy usage analytics (privacy-first, local only)

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

## 📚 Documentation

- **[DEVELOPMENT.md](docs/DEVELOPMENT.md)** - Setup, architecture, conventions, state management
- **[IMPLEMENTATION.md](docs/IMPLEMENTATION.md)** - Current features, services, data models
- **[CSS-ARCHITECTURE.md](docs/CSS-ARCHITECTURE.md)** - Utility classes, SCSS mixins, best practices
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - GitHub Actions workflows, deployment guide

## 🆘 Mental Health Resources

If you or someone you know is in crisis:

- **988 Suicide & Crisis Lifeline**: Call or Text 988
- **Crisis Text Line**: Text HOME to 741741
- **SAMHSA National Helpline**: 1-800-662-4357
- **Emergency Services**: Call 911
