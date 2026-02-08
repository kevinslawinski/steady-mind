# Implementation Notes

## Built Features

### Layout & Navigation

- **Header Component**: Transparent with backdrop blur, sticky positioning, theme toggle, menu button
- **Navigation Component**: Side drawer with smooth animations, keyboard accessible
- **Theme Service**: Signal-based light/dark mode with system detection and localStorage persistence

### Pages

- **Home**: Mobile-first guided Q&A with progress tracking, emoji-based options, navigation controls
- **Coping Library**: Full searchable library with 5 default coping strategies, category/emotion filtering, favorites system, expandable step-by-step instructions
- **Crisis Resources**: Complete hotline information (988, Crisis Text Line, SAMHSA, Veterans Crisis Line)

### Services

- **Coping Strategies Service**: Signal-based state management for strategies, filtering (search, categories, emotions, favorites), localStorage persistence for user preferences, recommendation logic based on emotion tags

### Data Models

- **CopingStrategy Interface**: Structured strategy data with emotion tags for matching, difficulty levels, time estimates
- **Guided Prompt Questions**: Q&A data structure with emotion tag mapping for recommendations
- **5 Default Strategies**: Box breathing, 5-4-3-2-1 grounding, progressive muscle relaxation, thought challenging, body scan

### CSS Architecture

Utility-first system with global classes and SCSS mixins. See [CSS-ARCHITECTURE.md](CSS-ARCHITECTURE.md) for complete documentation.

### Accessibility

Fully WCAG 2.1 AA compliant. See [DEVELOPMENT.md](DEVELOPMENT.md#accessibility-standards) for detailed requirements.

## Planned Features

- **Guided Prompts → Recommendations Flow**: Connect guided prompts completion to personalized strategy recommendations (service method exists, UI integration needed)
- **Expand Strategy Library**: Add more strategies beyond the 5 defaults (foundation complete)
- **Custom Strategies**: Allow users to add their own coping strategies (service method exists, UI needed)
- **Interactive Exercises**: Add timer/guided versions for breathing exercises, step-through modes
- **PWA Support**: Offline capabilities, installable app
- **Analytics**: Track which strategies are most helpful (privacy-first, local only)
