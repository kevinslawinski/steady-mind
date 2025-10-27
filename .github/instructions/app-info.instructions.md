---
applyTo: '**'
---

# Project Overview

This project is a web application called **Steady Mind**, a mental health companion that helps users identify grounding techniques and coping mechanisms through guided prompts and interactive Q&A.

**Important**: Steady Mind is NOT a replacement for professional therapy or medical treatment. No medical assumptions or diagnoses are made. This is a supportive tool to help users explore common coping mechanisms during difficult moments.

## Core Features

- **Guided Prompts**: Interactive Q&A system on home page for immediate support (currently implemented)
- **Coping Mechanism Library**: Curated collection of grounding techniques and coping strategies (foundation implemented)
- **Personalized Recommendations**: Suggest relevant coping mechanisms based on user responses (to be implemented)
- **Grounding Focus**: Help users re-center themselves when they're feeling overwhelmed or spiraling
- **Crisis Resources**: Immediate access to professional help and hotlines (fully implemented)

## Folder Structure

- `/src`: Contains the source code for the Angular frontend
  - `/app`: Application components, services, and modules
  - `/assets`: Static assets (images, fonts, etc.)
  - `/styles`: Global styles and theme configurations
- `/server`: Contains the source code for the Node.js backend (TBD)
- `/docs`: Contains documentation for the project, including API specifications and user guides
- `/.github`: GitHub-specific files including workflows and Copilot instructions for Angular best practices
- `/.claude`: Angular-specific best practices and guidelines for Gemini
- `/.gemini`: Angular-specific best practices and guidelines for Gemini

## Libraries and Frameworks

### Frontend

- **Angular v20**: Primary frontend framework
- **TypeScript**: Strongly-typed development
- UI Component Library: TBD (consider Angular Material, PrimeNG, or similar, or build your own)
- State Management: Angular Signals

### Backend & Data

- Backend is to be determined
- Data management solution is to be determined (consider NoSQL like mongoDB, or browser-based storage like local-storage or session-storage)
- User data privacy and security are top priorities

### Future Considerations

- Mobile app versions (iOS/Android) - potential future port from web app

## Coding Standards

### General Guidelines

- Reference `../copilot-instructions.md` for coding guidelines
- Use TypeScript strict mode
- Follow Angular style guide and best practices
- Write clean, self-documenting code with meaningful variable and function names
- Include JSDoc comments for complex functions and services

### Code Organization

- Use standalone components where appropriate (Angular 20 best practice)
- Implement lazy loading for feature modules
- Keep components focused and single-responsibility
- Extract reusable logic into services
- Use RxJS operators efficiently and avoid subscription leaks

### Testing

- Write unit tests for components and services
- Aim for meaningful test coverage, not just percentages
- Include integration tests for critical user flows
- Test accessibility features

## UI Guidelines

### Design Principles

- **Calm and Grounding**: Design should feel peaceful, supportive, and non-clinical
- **Modern and Clean**: Minimalist interface that doesn't overwhelm
- **Compassionate**: Use warm, supportive language and gentle interactions
- **Accessible**: Everyone should be able to use this tool

### Theme and Styling

- **Light/Dark Mode**: Provide a toggle to switch between themes
  - Light mode: Soft, calming colors
  - Dark mode: Gentle on the eyes, suitable for use during distress
- **Color Palette**: Choose calming, grounding colors (avoid harsh or alarming colors)
- **Typography**: Readable, calm fonts with appropriate sizing and spacing

### Accessibility Requirements

- **WCAG 2.1 AA Compliance** (minimum standard)
- Proper semantic HTML and ARIA labels
- Keyboard navigation support for all interactive elements
- Sufficient color contrast ratios
- Screen reader compatibility
- Focus indicators for all interactive elements
- Reduced motion support for users with vestibular disorders
- Clear, simple language (avoid clinical jargon)

### User Experience

- **Mobile-First**: Home page immediately presents guided questions - no landing page friction
- **Quick Access**: Users in distress get immediate support
- **Progressive Disclosure**: Don't overwhelm with too many options at once
- **Clear CTAs**: Make it obvious what actions users can take
- **Empathetic Microcopy**: All text should be supportive and non-judgmental
- **Privacy First**: Make users feel safe; be transparent about any data handling
- **Unified Scroll**: No separate scroll containers; natural page flow without unnecessary scrolling

## Mental Health Considerations

### Content Guidelines

- Use non-clinical, accessible language
- Avoid triggering content or imagery
- Include appropriate disclaimers about not being a replacement for professional help
- Consider crisis resources/hotline information prominently available
- Be mindful of language around mental health - avoid stigmatizing terms

### Privacy and Security

- Handle any user data with extreme care and respect
- Consider data minimization - only collect what's necessary
- Be transparent about data usage
- Allow users to control their data
- Consider anonymous usage options

## Development Workflow

- Use feature branches for new development
- Write meaningful commit messages
- Review PRs for code quality and accessibility
- Test on multiple devices and browsers
- Consider performance implications (app should load quickly for users in distress)

## Future Roadmap

- [x] Core web application with Angular v20
- [x] Home page with immediate guided support (mobile-first)
- [x] Interactive Q&A interface with progress tracking
- [x] Crisis resources page with hotlines
- [x] Light/Dark theme system
- [x] Transparent, sticky header with backdrop blur
- [x] Accessible navigation with side drawer
- [ ] Complete guided prompts recommendation logic
- [ ] Coping mechanism database/library content
- [ ] Search and filtering for coping mechanisms
- [ ] User preferences and personalization
- [ ] Offline support (PWA capabilities)
- [ ] iOS app port
- [ ] Android app port
- [ ] Multi-language support

---

**Remember**: We're building a tool to support people during difficult moments. Every decision should prioritize their wellbeing, privacy, and ease of use.
