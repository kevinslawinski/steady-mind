# Contributing to Steady Mind

Thank you for your interest in contributing to Steady Mind! This project has a special responsibility because it supports people during difficult moments.

## 🧭 Core Principles

When contributing to Steady Mind, please keep these principles in mind:

### 1. **User Wellbeing First**

- Every feature should prioritize user safety and wellbeing
- Never make assumptions about mental health diagnoses
- Always maintain that this is NOT a replacement for professional help

### 2. **Compassionate Language**

- Use warm, supportive, non-judgmental language
- Avoid clinical jargon or stigmatizing terms
- Keep language simple and accessible
- Never use language that could be triggering

### 3. **Privacy & Security**

- Minimize data collection
- Be transparent about any data usage
- Consider anonymous usage options
- Handle any user data with extreme care

### 4. **Accessibility**

- Maintain WCAG 2.1 AA compliance minimum
- Test with keyboard navigation
- Ensure screen reader compatibility
- Support reduced motion preferences
- Maintain sufficient color contrast

### 5. **Evidence-Based Content**

- Only include coping mechanisms backed by research
- Cite sources when possible
- Consult mental health professionals when adding new techniques
- Be clear about what is professional advice vs. self-help tools

## 🛠️ Development Guidelines

### Angular Best Practices

This project uses Angular 20+ with modern features:

- ✅ Use signals for state management
- ✅ Use standalone components (no NgModules)
- ✅ Use new control flow (@if, @for, @switch)
- ✅ Use input() and output() functions
- ✅ Set ChangeDetectionStrategy.OnPush
- ✅ Use inject() function instead of constructor injection
- ✅ Lazy load routes

See `.github/copilot-instructions.md` for detailed coding standards.

### Component Structure

```typescript
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'steady-example',
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  protected readonly state = signal('initial');
}
```

### Naming Conventions

- Components: `feature-name.component.ts`
- Services: `service-name.service.ts`
- Use descriptive, meaningful names
- Prefix all selectors with `steady-`

### Styling Guidelines

- Use CSS custom properties from the theme
- Support both light and dark modes
- Include hover and focus states for all interactive elements
- Test with reduced motion preferences
- Mobile-first responsive design

## 📝 Pull Request Process

1. **Create a feature branch** from `main`

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the guidelines above

3. **Test thoroughly**

   - Test in both light and dark modes
   - Test keyboard navigation
   - Test with a screen reader if possible
   - Check reduced motion support
   - Verify on mobile devices

4. **Write meaningful commit messages**

   ```
   feat: add breathing exercise component
   fix: improve color contrast in dark mode
   docs: update crisis resources
   ```

5. **Create a Pull Request** with:
   - Clear description of changes
   - Screenshots/videos for UI changes
   - Accessibility testing notes
   - Any mental health content review notes

## 🎨 Design System

### Colors

Use CSS custom properties from `styles.scss`:

```scss
color: var(--primary-color); // Primary actions
color: var(--secondary-color); // Secondary elements
color: var(--accent-color); // Urgent/important items
color: var(--text-primary); // Main text
color: var(--text-secondary); // Secondary text
background: var(--surface-color); // Cards, panels
```

### Typography

- Headings: System font stack (Segoe UI, Roboto, etc.)
- Body: Minimum 16px for readability
- Line height: 1.5-1.6 for comfortable reading

### Spacing

Use consistent spacing scale (0.25rem increments):

- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)

## 🧪 Testing

### What to Test

- Component functionality
- Accessibility (a11y)
- Keyboard navigation
- Screen reader announcements
- Theme switching
- Responsive layouts

### Running Tests

```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode
```

## 📚 Adding Mental Health Content

### Coping Mechanisms

When adding new coping mechanisms or grounding techniques:

1. **Research First**: Ensure the technique is evidence-based
2. **Clear Instructions**: Write step-by-step, easy-to-follow instructions
3. **Include Disclaimers**: Note if technique isn't suitable for everyone
4. **Cite Sources**: Link to research or professional resources
5. **Simple Language**: Avoid clinical jargon
6. **Be Inclusive**: Consider diverse experiences and backgrounds

### Crisis Resources

When updating crisis resources:

1. **Verify Information**: Ensure all contact info is current
2. **Include Multiple Options**: People need choices
3. **International Coverage**: Consider global audience
4. **Clear Purpose**: Explain what each resource provides
5. **Prominent Display**: Crisis help should always be easy to find

## ❓ Questions or Concerns?

If you have questions about:

- Mental health content appropriateness
- Accessibility requirements
- Technical implementation
- Design decisions

Please open an issue for discussion before implementing.

## 🙏 Thank You

Your contributions help create a safer, more supportive tool for people who need it. Thank you for taking the time to contribute thoughtfully and compassionately.

---

Remember: We're building a tool to support people during difficult moments. Every decision should prioritize their wellbeing, privacy, and ease of use.
