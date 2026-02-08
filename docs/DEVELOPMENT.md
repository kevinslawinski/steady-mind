# Development Notes

Personal development reference for building Steady Mind.

## Project Setup

```bash
npm install              # Install dependencies
npm start                # Dev server at localhost:4200
npm test                 # Run tests in watch mode
npm run test:no-watch    # Run tests once (CI)
npm run build            # Build for production
npm run build-gh         # Build for GitHub Pages
npm run watch            # Build in watch mode
```

## Technology Stack

- **Angular 20+** - Modern framework with signals and standalone components
- **TypeScript** - Strongly-typed development with strict mode
- **SCSS** - Advanced styling with CSS custom properties and mixins
- **RxJS** - Reactive programming (minimal usage, prefer signals)
- **Vitest** - Fast unit testing framework
- **GitHub Actions** - CI/CD for automated testing and deployment

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

**High-level organization:**

```
src/
├── app/
│   ├── core/              # Reusable components & services
│   │   ├── layout/        # Header, navigation
│   │   └── services/      # Theme, coping strategies
│   ├── features/          # Feature modules
│   │   ├── home/
│   │   ├── guided-prompts/
│   │   ├── coping-library/
│   │   └── crisis-resources/
│   └── app.{ts,routes.ts} # Root component & routing
├── globals/               # Shared constants & types
├── styles.scss            # Global utilities & theme
└── assets/                # Static files

docs/                      # All documentation
```

**Key files:**

- `app.constants.ts` - Types, interfaces, default strategies
- `theme.service.ts` - Light/dark mode management
- `coping-strategies.service.ts` - Strategy filtering & localStorage
- `styles.scss` - Utility classes, CSS variables, SCSS mixins

### Theming

CSS custom properties defined in `src/styles.scss`:

```scss
var(--primary-color)    // Main brand color
var(--text-primary)     // Main text
var(--surface-color)    // Cards/panels
var(--border-color)     // Borders
```

Both light and dark modes supported via ThemeService.

### CSS Architecture

Utility-first approach with global reusable classes:

- **Utilities in `styles.scss`**: `.btn`, `.card`, `.chip`, `.badge`, `.input-group`, `.grid-auto-fill`, etc.
- **SCSS Mixins**: Use `@include tablet`, `@include desktop` instead of raw media queries
- **Component Styles**: Only unique, component-specific styles
- **Documentation**: See `docs/CSS-ARCHITECTURE.md` for complete guide

Before adding CSS to a component, check if a utility class exists or if one should be created.

## State Management

Using Angular signals for all reactive state:

```typescript
// Services use signals for shared state
readonly allStrategies = computed(() => [...default, ...custom]);
readonly filteredStrategies = computed(() => /* filtering logic */);

// Components use signals for local UI state
protected readonly searchQuery = signal('');
protected readonly showFilters = signal(false);

// Computed signals derive state
protected readonly activeFiltersCount = computed(() => /* count */);
```

**Benefits**: Fine-grained reactivity, no zone.js overhead, automatic change detection with OnPush.

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
- See [DEPLOYMENT.md](DEPLOYMENT.md) for details
