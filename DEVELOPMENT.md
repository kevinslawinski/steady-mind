# Development Notes

Personal development reference for building Steady Mind.

## Project Setup

```bash
npm install
npm start  # Dev server at localhost:4200
npm test   # Run tests in watch mode
npm run test:no-watch  # Run tests once (CI)
npm run build-gh  # Build for GitHub Pages
```

## Architecture

### Angular Patterns Used

- **Signals** for reactive state management
- **Standalone components** (no NgModules)
- **New control flow** (@if, @for, @switch)
- **input()/output()** functions for component props
- **OnPush change detection** for performance
- **inject()** function instead of constructor injection
- **Lazy-loaded routes**

### Project Structure

```
src/app/
├── core/
│   ├── layout/        # Header, Navigation
│   └── services/      # Theme service, etc.
├── features/
│   ├── home/          # Guided Q&A interface
│   ├── coping-library/
│   └── crisis-resources/
└── globals/
    └── app.constants.ts
```

### Theming

CSS custom properties defined in `src/styles.scss`:

```scss
var(--primary-color)    // Main brand color
var(--text-primary)     // Main text
var(--surface-color)    // Cards/panels
var(--border-color)     // Borders
```

Both light and dark modes supported via ThemeService.

## Mental Health Considerations

Since this is a mental health support tool:

- Use warm, supportive, non-judgmental language
- Avoid clinical jargon or stigmatizing terms
- Never make assumptions about diagnoses
- Include coping mechanisms backed by research
- Always maintain disclaimer: NOT a replacement for professional help

## Accessibility Standards

Targeting WCAG 2.1 AA compliance:

- Keyboard navigation for all interactive elements
- Screen reader compatible (semantic HTML, ARIA labels)
- Sufficient color contrast ratios
- Focus indicators visible
- Reduced motion support
- Skip to main content link

## Component Conventions

```typescript
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'steady-feature-name',
  templateUrl: './feature-name.component.html',
  styleUrl: './feature-name.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureNameComponent {
  protected readonly myState = signal('initial');
}
```

### Naming

- Components: `feature-name.component.ts`
- Services: `service-name.service.ts`
- Selectors: `steady-` prefix

## Testing

- Unit tests use Vitest
- Run in watch mode during development: `npm test`
- CI runs: `npm run test:no-watch`
- Tests must pass before deployment

## Workflows

- Feature branches: `feature/*` - tests run but no deployment
- Main branch: tests run → artifacts uploaded → deployment triggered
- See DEPLOYMENT.md for details
