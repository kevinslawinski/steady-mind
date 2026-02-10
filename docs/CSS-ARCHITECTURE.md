# CSS Architecture & Utility Classes

This document describes the CSS architecture for Steady Mind, which uses a utility-first approach with global reusable classes to ensure consistency and maintainability.

## Color Palette

### Light Mode

- **Primary**: Calming Blue (#4a90e2) - Used for primary actions and accents
- **Secondary**: Soft Green (#66bb6a) - Used for success states and positive actions
- **Accent**: Warm Support (#ff7043) - Used for important highlights and favorites

### Dark Mode

- Automatically adjusts all colors for comfortable viewing
- Maintains proper contrast ratios for accessibility
- Respects system preferences via `prefers-color-scheme`

All colors are defined as CSS custom properties in `src/styles.scss` and automatically adapt based on the active theme.

## Architecture Overview

The application uses a two-tier CSS system:

1. **Global Utilities** (`src/styles.scss`) - Reusable classes for common patterns
2. **Component-Specific Styles** - Unique styles for each component's specific needs

This architecture ensures consistency across the application while keeping component files focused and maintainable.

## Global Utility Classes

### Layout Utilities

- **`.page-container`** - Standard page wrapper with consistent padding

  ```scss
  .page-container {
    min-height: 100vh;
    padding: 2rem 1.5rem;
    // Responsive: 1.5rem 1rem on mobile
  }
  ```

- **`.content-container`** - Max-width container (1200px) with auto margins
- **`.page-header`** - Centered page header with title and intro text
  - Includes nested `.page-intro` for subtitle text
- **`.grid-auto-fill`** - Responsive grid that auto-fills columns (min 320px)
- **`.grid-auto-fit`** - Responsive grid that auto-fits columns (min 280px)

### Card Utilities

- **`.card`** - Base card style (background, border-radius, shadow, padding)
- **`.card-hover`** - Adds hover lift effect to cards
- **`.card-bordered`** - Adds border to cards

### Button Utilities

- **`.btn`** - Base button styles (padding, border-radius, transitions)
- **`.btn-primary`** - Primary action button (blue background, white text)
- **`.btn-secondary`** - Secondary button (light background, border)
- **`.btn-ghost`** - Ghost/outline button style (transparent background)
- **`.btn-icon`** - Icon-only button (smaller padding, no text)

### Chip/Tag Utilities

- **`.chip`** - Base chip/tag style for filters and categories
- **`.chip-active`** - Active state for chips (colored background)

### Badge Utilities

- **`.badge`** - Base badge style for labels
- **`.badge-count`** - Small circular badge for counts (notifications, etc.)

### Input Utilities

- **`.input-group`** - Wrapper for input with icon and clear button
  - Use with nested `.input-icon` and `.input-clear`
  - Includes focus states and proper styling

### Text Utilities

- **`.text-center`** - Center-aligned text
- **`.text-muted`** - Secondary text color
- **`.text-subtle`** - Tertiary/subtle text color

### Animation Utilities

- **`.slide-down`** - Slide down animation (for filter panels, dropdowns)
- **`.expand-down`** - Expand down animation (for expandable sections)

## Component-Specific Styles

After consolidation, component SCSS files now contain only:

1. **Layout specific to that component** (e.g., `.search-section`, `.filter-panel`)
2. **Unique component styles** (e.g., `.strategy-card`, `.step-item`)
3. **Component-specific variations** of global utilities
4. **Complex animations** or interactions unique to that component

## Responsive Breakpoints

The application uses SCSS mixins for consistent responsive behavior across all components:

```scss
// Breakpoint values
$breakpoint-mobile: 480px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
$breakpoint-wide: 1440px;

// Responsive mixins
@mixin tablet {
  @media (min-width: 768px) {
    @content;
  }
}
@mixin desktop {
  @media (min-width: 1024px) {
    @content;
  }
}
@mixin wide {
  @media (min-width: 1440px) {
    @content;
  }
}
@mixin mobile-only {
  @media (max-width: 767px) {
    @content;
  }
}
@mixin tablet-only {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;
  }
}
```

**Usage Example:**

```scss
.options-grid {
  gap: 0.75rem; // Mobile default

  @include tablet {
    gap: 1rem; // 768px and up
  }

  @include desktop {
    gap: 1.5rem; // 1024px and up
  }
}

.page-header h1 {
  font-size: 2rem;

  @include mobile-only {
    font-size: 1.75rem; // Only on mobile
  }
}
```

**Benefits:**

- **Consistency** - All breakpoints use the same values across the app
- **Maintainability** - Change breakpoint values in one place
- **Readability** - `@include tablet` is clearer than `@media (min-width: 768px)`
- **Type safety** - Prevents typos in media query values

## CSS Variable System

All components use CSS variables for consistent theming:

```scss
// Transitions (used throughout)
--transition-fast: 150ms ease
--transition-normal: 250ms ease
--transition-slow: 350ms ease

// Colors
--primary-color,
--secondary-color,
--accent-color
--text-primary,
--text-secondary,
--text-tertiary
--surface-color,
--background-color,
--hover-color

// Shadows
--shadow-sm,
--shadow-md,
--shadow-lg;
```

## Benefits of This Architecture

- **Consistency** - UI elements behave the same across all pages
- **Maintainability** - Update once, applies everywhere
- **Developer Speed** - Build faster by composing utilities
- **Smaller Bundle** - Less duplicate CSS
- **Clear Intent** - Semantic class names are self-documenting

## Usage Examples

### Composing Utilities

Utilities are designed to be composed together:

```html
<!-- Card with hover effect and border -->
<article class="card card-bordered card-hover">
  <h2>Card Title</h2>
  <p class="text-muted">Card description</p>
</article>

<!-- Primary button -->
<button class="btn btn-primary">Save Changes</button>

<!-- Search input with icon -->
<div class="input-group">
  <span class="input-icon">🔍</span>
  <input type="text" placeholder="Search..." />
  <button class="input-clear">✕</button>
</div>

<!-- Filter chips -->
<button class="chip chip-active">Active Filter</button>
<button class="chip">Inactive Filter</button>
```

### Component-Specific Styles

Component SCSS files contain only styles unique to that component:

```scss
// coping-library.component.scss
.strategy-card {
  // Component-specific: only styles not covered by utilities

  &:hover {
    border-color: var(--accent-color); // Override specific to this component
  }
}

.resource-contact {
  font-family: monospace; // Unique styling for this element
  color: var(--accent-color);
}
```

## Guidelines for Adding New Styles

### When to Add a Global Utility

Add a new utility to `styles.scss` when:

- The pattern appears in **3+ components**
- The style represents a **common UI element** (button, card, input, tag, etc.)
- You want **consistent behavior** across the entire app
- The pattern is **generic** enough to be widely reused

### When to Keep Styles Component-Specific

Keep styles in component SCSS when:

- The style is **unique to one feature**
- The style represents **domain-specific** logic
- Creating a utility would be **overly specific**
- The style is a **one-off variation** unlikely to be reused

## Accessibility Notes

All utility classes include:

- **Focus states** (`:focus-visible` with outline)
- **Reduced motion** support (`@media (prefers-reduced-motion: reduce)`)
- **Hover effects** that are appropriately disabled for touch/reduced motion
- **Color contrast** meeting WCAG AA standards
- **Keyboard navigation** support

## File Organization

```
src/
├── styles.scss                    # Global utilities & variables
├── app/
│   ├── core/
│   │   └── layout/
│   │       ├── header/
│   │       │   └── header.component.scss    # Component-specific only
│   │       └── navigation/
│   │           └── navigation.component.scss # Component-specific only
│   └── features/
│       ├── coping-library/
│       │   └── coping-library.component.scss # Component-specific only
│       ├── crisis-resources/
│       │   └── crisis-resources.component.scss # Component-specific only
│       ├── guided-prompts/
│       │   └── guided-prompts.component.scss # Component-specific only
│       └── home/
│           └── home.component.scss # Component-specific only
```

## Best Practices

1. **Use utilities first** - Check if a utility exists before writing custom CSS
2. **Compose utilities** - Combine multiple utility classes for complex patterns
3. **Use CSS variables** - Reference theme variables for colors, spacing, and transitions
4. **Keep components minimal** - Only write styles unique to that component
5. **Document new utilities** - Add clear comments when creating new global utilities
6. **Test both themes** - Verify light and dark mode when adding styles

## Accessibility Requirements

All styles must include:

- **Focus states** - Use `:focus-visible` with proper outline
- **Reduced motion** - Support `@media (prefers-reduced-motion: reduce)`
- **Color contrast** - Meet WCAG AA standards (4.5:1 for text)
- **Keyboard navigation** - Ensure all interactive elements are accessible
