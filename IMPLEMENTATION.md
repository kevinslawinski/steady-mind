# Implementation Notes

## Built Features

### Layout & Navigation

- **Header Component**: Transparent with backdrop blur, sticky positioning, theme toggle, menu button
- **Navigation Component**: Side drawer with smooth animations, keyboard accessible
- **Theme Service**: Signal-based light/dark mode with system detection and localStorage persistence

### Pages

- **Home**: Mobile-first guided Q&A with progress tracking, emoji-based options, navigation controls
- **Coping Library**: Foundation page structure (content TBD)
- **Crisis Resources**: Complete hotline information (988, Crisis Text Line, SAMHSA, Veterans Crisis Line)

### Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation throughout
- Screen reader support with semantic HTML and ARIA labels
- Focus indicators on all interactive elements
- Respects `prefers-reduced-motion`

### Angular Patterns Used

- Signals for reactive state
- Standalone components (no NgModules)
- New control flow (`@if`, `@for`)
- `input()` and `output()` functions
- OnPush change detection
- Lazy-loaded routes

## Planned Features

- Complete guided prompts recommendation logic
- Coping mechanisms database with search/filtering
- Interactive exercises (box breathing, 5-4-3-2-1 grounding, etc.)
- User preferences and favorites
- PWA support for offline use
