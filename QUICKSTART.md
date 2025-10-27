# Quick Start Guide - Steady Mind Development

## 🏁 First Time Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm start
```

App will be available at: **http://localhost:4200/**

## 📁 Where to Find Things

### Adding a New Page/Feature

1. Create component in `src/app/features/feature-name/`
2. Add route to `src/app/app.routes.ts`
3. Add navigation link to `src/app/core/layout/navigation/navigation.component.ts`

### Styling

- **Global styles**: `src/styles.scss`
- **Theme variables**: `src/styles.scss` (CSS custom properties)
- **Component styles**: Each component has its own `.scss` file

### Theme Colors

Use CSS custom properties in your styles:

```scss
color: var(--primary-color); // Main brand color
color: var(--text-primary); // Main text
background: var(--surface-color); // Cards/panels
border-color: var(--border-color); // Borders
```

## 🎨 Component Template

### Creating a New Component

```typescript
// feature-name.component.ts
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'steady-feature-name',
  templateUrl: './feature-name.component.html',
  styleUrl: './feature-name.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureNameComponent {
  // Use signals for state
  protected readonly myState = signal('initial value');
}
```

```html
<!-- feature-name.component.html -->
<div class="feature-name">
  <div class="container">
    <h1>Feature Title</h1>

    <!-- Use new control flow -->
    @if (myState() === 'something') {
    <p>Content here</p>
    }
  </div>
</div>
```

```scss
// feature-name.component.scss
.feature-name {
  padding: 2rem 1.5rem;

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    color: var(--text-primary);
  }
}
```

## 🔧 Common Tasks

### Add a New Route

```typescript
// src/app/app.routes.ts
{
  path: 'your-path',
  loadComponent: () =>
    import('./features/your-feature/your-feature.component').then(
      (m) => m.YourFeatureComponent
    ),
}
```

### Toggle Theme

The theme service is already set up. Access it with:

```typescript
private readonly themeService = inject(ThemeService);

toggleTheme() {
  this.themeService.toggleTheme();
}
```

### Add Navigation Link

```typescript
// src/app/core/layout/navigation/navigation.component.ts
protected readonly navItems = [
  { path: '/your-path', label: 'Your Label', icon: '🎯' },
  // ... other items
];
```

## ✅ Testing Checklist

Before committing changes:

- [ ] Test in light mode
- [ ] Test in dark mode
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Test on mobile viewport
- [ ] Check color contrast (use browser DevTools)
- [ ] Verify reduced motion support works
- [ ] Run `npm test` (when tests are set up)

## 🎯 What to Work On Next

### High Priority

1. **Guided Prompts Q&A System**

   - Design question flow
   - Create question components
   - Implement routing between questions

2. **Coping Mechanisms Content**
   - Research techniques
   - Write clear instructions
   - Create data models

### Medium Priority

3. **Interactive Grounding Techniques**

   - Breathing exercise
   - 5-4-3-2-1 technique
   - Body scan meditation

4. **Search & Filtering**
   - Search bar component
   - Filter by category
   - Tag system

### Nice to Have

5. **User Preferences**
   - Save favorites
   - Remember settings
   - Personalization

## 📚 Helpful Resources

### Angular Documentation

- [Angular Signals](https://angular.dev/guide/signals)
- [Components Guide](https://angular.dev/essentials/components)
- [Control Flow](https://angular.dev/essentials/conditionals-and-loops)
- [Routing](https://angular.dev/guide/routing)

### Mental Health Resources (for content research)

- [SAMHSA](https://www.samhsa.gov/)
- [NAMI](https://www.nami.org/)
- [MentalHealth.gov](https://www.mentalhealth.gov/)

### Accessibility

- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)

## 🆘 Troubleshooting

### Server won't start

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### TypeScript errors

- Wait a moment for Angular language service to catch up
- Restart VS Code if errors persist
- Check that all imports are correct

### Styles not updating

- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check that CSS custom property is defined in `styles.scss`
- Verify component has `styleUrl` property

## 💡 Pro Tips

1. **Use Angular DevTools** (Chrome/Firefox extension) for debugging
2. **Enable Auto Save** in VS Code for faster development
3. **Use Copilot** for code suggestions (already configured)
4. **Check accessibility** early and often
5. **Keep components small** and focused
6. **Write meaningful commit messages**

---

**Happy coding! Remember: We're building something that helps people. 💚**
