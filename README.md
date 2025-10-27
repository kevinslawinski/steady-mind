# Steady Mind 🌿

A compassionate mental health companion built with Angular 20, designed to help users identify grounding techniques and coping mechanisms through guided prompts and interactive experiences.

> **Important Disclaimer**: Steady Mind is NOT a replacement for professional therapy or medical treatment. This is a supportive tool to help users explore common coping mechanisms during difficult moments.

## ✨ Features

### Current Implementation

- **🏠 Home Page** - Welcoming landing page with quick access to all features
- **💬 Guided Support** - Interactive Q&A system (foundation implemented, content coming soon)
- **📚 Coping Library** - Curated collection of grounding techniques (foundation implemented)
- **🆘 Crisis Resources** - Prominent access to crisis hotlines and professional resources
- **🌓 Light/Dark Mode** - Accessible theme toggle with system preference detection
- **♿ Accessibility First** - WCAG 2.1 AA compliant with keyboard navigation and screen reader support

### Design Principles

- **Calm and Grounding** - Peaceful, supportive design with soft color palettes
- **Modern and Clean** - Minimalist interface that doesn't overwhelm
- **Compassionate** - Warm, supportive language throughout
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
│   │   ├── layout/          # Header, Navigation components
│   │   └── services/        # Theme service, etc.
│   ├── features/
│   │   ├── home/            # Landing page
│   │   ├── guided-prompts/  # Q&A guided support
│   │   ├── coping-library/  # Coping mechanisms library
│   │   └── crisis-resources/ # Crisis hotlines & resources
│   ├── app.ts               # Root component
│   └── app.routes.ts        # Route configuration
├── globals/
│   └── app.constants.ts     # App-wide constants
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

- **Angular 20** - Latest Angular with signals and standalone components
- **TypeScript 5.9** - Strongly-typed development
- **SCSS** - Advanced styling with CSS custom properties
- **RxJS 7.8** - Reactive programming

### Modern Angular Features

- ✅ Signals for reactive state management
- ✅ Standalone components (no NgModules)
- ✅ New control flow syntax (@if, @for)
- ✅ OnPush change detection strategy
- ✅ Lazy-loaded routes
- ✅ input() and output() functions

## 📋 Roadmap

### Phase 1 (Current)

- [x] Core application structure
- [x] Navigation and layout
- [x] Theme system with light/dark mode
- [x] Crisis resources page
- [x] Foundation for all features

### Phase 2 (Next)

- [ ] Implement guided prompts Q&A system
- [ ] Build coping mechanisms database
- [ ] Add recommendation engine
- [ ] Create breathing exercises component
- [ ] Add grounding techniques (5-4-3-2-1, etc.)

### Phase 3 (Future)

- [ ] User preferences and personalization
- [ ] Offline support (PWA)
- [ ] Multi-language support
- [ ] iOS/Android app versions
- [ ] Backend integration (optional)

## 🤝 Contributing

This project prioritizes:

- User wellbeing and safety
- Privacy and data security
- Accessibility for all users
- Evidence-based coping techniques
- Compassionate, non-clinical language

## 📄 License

This project is private and not yet licensed for public use.

## 🆘 Mental Health Resources

If you or someone you know is in crisis:

- **988 Suicide & Crisis Lifeline**: Call or Text 988
- **Crisis Text Line**: Text HOME to 741741
- **SAMHSA National Helpline**: 1-800-662-4357
- **Emergency Services**: Call 911

---

Built with 💚 to support mental wellness

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.7 with the command:

```bash
ng new steady-mind --directory . --inline-style --inline-template --prefix=steady --routing --style=scss --zoneless
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
