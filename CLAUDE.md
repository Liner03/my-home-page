# CLAUDE.md - AI Assistant Guide for Personal AI OS Portfolio

## Project Overview

**Personal AI OS Portfolio** is a futuristic, interactive personal portfolio application built with Angular. It features an OS-like interface with glassmorphism design, fluid animations, and a navigation system that mimics desktop operating systems. The project was initially generated from AI Studio and showcases skills, projects, and experiences in an immersive environment.

**Project Type:** Angular 20.3 Single Page Application (SPA)
**UI Framework:** Tailwind CSS (CDN)
**State Management:** Angular Signals (Zoneless)
**Dev Server Port:** 3000

## Technology Stack

### Core Technologies
- **Angular 20.3.0** - Latest Angular framework with signal-based reactive programming
- **TypeScript 5.8.2** - Strongly-typed JavaScript with decorators enabled
- **RxJS 7.8.2** - Reactive Extensions for JavaScript
- **Tailwind CSS (latest)** - Utility-first CSS framework loaded via CDN

### Build Tools
- **Angular CLI 20.3.0** - Official Angular build tooling
- **Angular Build 20.3.0** - Modern application builder
- **Vite 6.2.0** - Fast development server and build tool

### Key Angular Features Used
- **Zoneless Change Detection** - Modern, performant change detection without Zone.js
- **OnPush Change Detection Strategy** - All components use OnPush for optimization
- **Signals API** - Primary state management mechanism
- **Standalone Components** - All components are standalone (no NgModule)
- **Control Flow Syntax** - New `@if`, `@switch`, `@for` template syntax

## Project Structure

```
my-home-page/
├── index.html              # Main HTML entry point with embedded styles
├── index.tsx               # Application bootstrap file (Angular entry)
├── package.json            # Dependencies and npm scripts
├── tsconfig.json          # TypeScript configuration
├── angular.json           # Angular CLI configuration
├── metadata.json          # AI Studio project metadata
├── README.md              # Project documentation
├── .gitignore            # Git ignore rules
└── src/
    ├── app.component.ts       # Root component with navigation logic
    ├── app.component.html     # Root component template
    └── components/
        ├── home/
        │   ├── home.component.ts
        │   └── home.component.html
        ├── about/
        │   ├── about.component.ts
        │   └── about.component.html
        ├── projects/
        │   ├── projects.component.ts
        │   └── projects.component.html
        └── notes/
            ├── notes.component.ts
            └── notes.component.html
```

## Architecture & Design Patterns

### Application Flow
1. **index.html** - Loads Tailwind CSS, fonts, defines global styles and animations
2. **index.tsx** - Bootstraps Angular with zoneless change detection
3. **AppComponent** - Root component managing view state and navigation
4. **View Components** - Home, About, Projects, Notes rendered based on state

### State Management Pattern
- Uses Angular **signals** exclusively for reactive state
- No Zone.js - application uses `provideZonelessChangeDetection()`
- All state changes are explicit and trackable
- Effects (`effect()`) handle side effects and animations

### Component Architecture
- **Standalone components** - No NgModule dependencies
- **OnPush change detection** - All components use `ChangeDetectionStrategy.OnPush`
- **Signal-based** - State managed via `signal()`, `computed()`, and `effect()`
- **Template-only logic** - HTML templates handle most rendering logic

## Component Structure & Conventions

### Standard Component Pattern
```typescript
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-[name]',
  templateUrl: './[name].component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ...], // Standalone imports
})
export class [Name]Component {
  // Signal-based state
  state = signal(initialValue);
}
```

### View Types
The application defines a `View` type with four possible values:
- `'home'` - Landing page with creator info
- `'about'` - About section
- `'projects'` - Projects showcase
- `'notes'` - Notes/blog section

### Navigation System
- Fixed bottom navigation bar (taskbar-style)
- Three main navigation items: About, Projects, Notes
- Clicking active item returns to home
- Directional animations based on navigation order
- Border marquee effect on module activation

## Development Workflow

### Getting Started
```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### File Organization Rules
- **One component per directory** - Each component has its own folder
- **Co-located templates** - `.html` files next to `.ts` files
- **Flat component structure** - All components in `src/components/`
- **No deep nesting** - Keep directory structure shallow

### When Adding New Components
1. Create new directory in `src/components/`
2. Create `[name].component.ts` and `[name].component.html`
3. Use `ChangeDetectionStrategy.OnPush`
4. Import as standalone component
5. Add to parent component's imports array
6. If adding to navigation, update `AppComponent.navItems`

## Styling Approach

### CSS Architecture
- **Tailwind CSS** via CDN (no build step required)
- **Custom CSS** in `index.html` `<style>` tag
- **Inline styles** for dynamic/computed values
- **Class bindings** `[class.foo]="condition"` for reactive styling

### Design System
- **Glassmorphism** - `.glass-card` class for frosted glass effect
- **Neon effects** - `.neon-glow` for subtle glowing borders
- **Taskbar glow** - `.taskbar-glow` for bottom navigation
- **Text glow** - `.text-glow` for luminous text
- **Logo glow** - `.logo-glow` for drop-shadow effects

### Custom Animations
Defined in `index.html`:
- `marquee-flash` - Border animation on module activation
- `marquee-path` - Border drawing animation
- `slide-in-from-right` - Right slide entrance
- `slide-out-to-left` - Left slide exit
- `slide-in-from-left` - Left slide entrance
- `slide-out-to-right` - Right slide exit
- `fade-in-scale` - Fade and scale entrance
- `fade-out-scale` - Fade and scale exit

### Animation Classes
- `.animate-fade-in` - General module entrance
- `.animate-fade-out` - General module exit
- `.animate-in-right` - Right directional entrance
- `.animate-out-left` - Left directional exit
- `.animate-in-left` - Left directional entrance
- `.animate-out-right` - Right directional exit

## State Management Details

### AppComponent Signals
```typescript
activeView = signal<View>('home');        // Current selected view
renderedView = signal<View>('home');      // Currently rendered view
isClosing = signal(false);                // Animation state flag
animationDirection = signal<'left' | 'right' | 'none'>('none');
showMarquee = signal(false);              // Border animation trigger
```

### Animation State Machine
1. User clicks navigation item
2. `setView()` determines animation direction
3. If closing current module: `isClosing = true`
4. After close animation: update `renderedView`
5. New module animates in with appropriate direction
6. Border marquee shows for 1.5s on non-home views

## Build & Deployment

### Build Configuration
- **Output directory:** `./dist`
- **Browser entry:** `index.tsx`
- **TypeScript config:** `tsconfig.json`
- **Production:** Includes output hashing
- **Development:** No optimization, includes source maps

### Production Build
```bash
npm run build
```
Output in `./dist/` ready for static hosting.

### Development Build
```bash
npm run dev
```
Runs on `http://localhost:3000` with hot reload.

## Key Files & Their Purposes

### index.tsx
- Application entry point
- Imports Angular compiler
- Bootstraps `AppComponent`
- Configures zoneless change detection
- **Note:** AI Studio always uses `index.tsx` for all project types

### index.html
- HTML shell
- Loads Tailwind CSS from CDN
- Loads Inter font from Google Fonts
- Contains all custom CSS and animations
- Defines import maps for Angular and RxJS
- Contains `<app-root>` element

### angular.json
- Angular CLI configuration
- Defines build and serve options
- Sets output paths and entry points
- Configures development vs production builds

### tsconfig.json
- TypeScript compiler options
- Target: ES2022
- Experimental decorators enabled
- Module resolution: bundler
- Path aliases: `@/*` maps to `./*`

### package.json
- Project dependencies
- NPM scripts: dev, build, preview
- Private package (not published)

## Common Tasks & Commands

### Adding a New View/Module
1. Create component in `src/components/[name]/`
2. Update `View` type in `app.component.ts`
3. Add navigation item to `navItems` array
4. Add case in template `@switch` block
5. Import component in `AppComponent.imports`

### Modifying Animations
- Edit keyframes in `index.html` `<style>` tag
- Adjust animation classes
- Update timing in component logic (setTimeout durations)
- Test directional navigation (left/right)

### Changing Styles
- Tailwind utilities: Add classes in component templates
- Custom styles: Add to `index.html` `<style>` tag
- Dynamic styles: Use `[style.property]="value"` bindings
- Glassmorphism: Apply `.glass-card` class

### Updating Background
- Edit background-image URL in `app.component.html`
- Modify gradient overlay values
- Adjust blur and opacity

## Code Conventions & Best Practices

### TypeScript
- Use signals for all reactive state
- Prefer `const` over `let`
- Type all function parameters and returns
- Use readonly when appropriate
- Avoid `any` type

### Angular
- Always use `ChangeDetectionStrategy.OnPush`
- Standalone components only (no NgModules)
- Use new control flow syntax (`@if`, `@for`, `@switch`)
- Import `CommonModule` when using common directives
- Avoid Zone.js dependencies

### Templates
- Use `@if` instead of `*ngIf`
- Use `@for` with track instead of `*ngFor`
- Use `@switch` instead of `*ngSwitch`
- Self-closing component tags: `<app-home />`
- Class bindings: `[class.active]="isActive()"`

### Styling
- Prefer Tailwind utilities over custom CSS
- Use custom CSS only for complex animations/effects
- Maintain mobile responsiveness (`sm:`, `md:` prefixes)
- Keep color scheme consistent (blues, purples, pinks)
- Use glassmorphism for card-like elements

### State Management
- Signal for primitive values: `signal(value)`
- Effect for side effects: `effect(() => {})`
- Untracked for reading without dependency: `untracked(signal)`
- Set signal values: `signal.set(newValue)`

## Important Notes for AI Assistants

### When Working with This Codebase

1. **Never Remove Zoneless Configuration**
   - The app uses `provideZonelessChangeDetection()`
   - Do not add Zone.js or traditional change detection

2. **Always Use Signals**
   - Use `signal()` for state, not class properties
   - Use `effect()` for side effects, not lifecycle hooks with subscriptions
   - Call signals with `()` in templates: `{{ mySignal() }}`

3. **Component Creation**
   - Always add `ChangeDetectionStrategy.OnPush`
   - Always make components standalone
   - Always import required modules in component metadata

4. **Template Syntax**
   - Use new control flow (`@if`, `@for`, `@switch`)
   - Don't use old structural directives (`*ngIf`, `*ngFor`)

5. **Styling**
   - Tailwind is loaded via CDN, not configured locally
   - Custom CSS goes in `index.html`, not separate files
   - Maintain the glassmorphism aesthetic

6. **File Structure**
   - Keep components in `src/components/`
   - Don't create deep directory hierarchies
   - Co-locate templates with TypeScript files

7. **Build System**
   - Entry point is `index.tsx`, not `main.ts`
   - Build output goes to `./dist/`
   - Dev server runs on port 3000

8. **Git Workflow**
   - Branch naming: Must start with `claude/` and end with session ID
   - Always push to designated feature branch
   - Use descriptive commit messages
   - Push format: `git push -u origin <branch-name>`

9. **Animation System**
   - Directional animations based on navigation order
   - Timing controlled in component (400-500ms)
   - Border marquee shows for 1.5s on activation
   - All animations defined in `index.html`

10. **Dependencies**
    - Angular and RxJS loaded via import maps (ESM)
    - Tailwind loaded via CDN
    - No bundled CSS processing
    - Minimal external dependencies

### Common Pitfalls to Avoid

- Don't add Zone.js or remove zoneless configuration
- Don't use old template syntax with `*`
- Don't create separate CSS files (use index.html or inline)
- Don't modify import maps unless absolutely necessary
- Don't change the dev server port (hardcoded to 3000)
- Don't add NgModules (app is fully standalone)
- Don't use ViewChild/ViewChildren without understanding signal interactions
- Don't add complex state management libraries (signals are sufficient)

### Testing Checklist

When making changes, verify:
- [ ] App runs without errors: `npm run dev`
- [ ] Animations work correctly (all directional transitions)
- [ ] Navigation between all views functions
- [ ] Home view accessible by clicking active nav item
- [ ] Border marquee appears on module activation
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] Glassmorphism effects render correctly
- [ ] No console errors or warnings
- [ ] TypeScript compiles without errors
- [ ] Production build succeeds: `npm run build`

### Debugging Tips

- Check browser console for Angular errors
- Verify signal updates using Angular DevTools
- Test animations by navigating in different orders
- Check network tab for failed CDN resources
- Verify TypeScript compilation in terminal
- Test with Angular dev server, not file:// protocol

## AI Studio Context

This project was generated with **AI Studio** and maintains some AI Studio conventions:
- `index.tsx` as entry point (AI Studio standard)
- `metadata.json` contains project metadata
- Import maps for CDN dependencies
- Designed to run in AI Studio environment

When deployed outside AI Studio, ensure:
- Import maps resolve correctly
- CDN resources are accessible
- Environment variables (if any) are configured

---

**Last Updated:** 2025-11-19
**Angular Version:** 20.3.0
**Project Status:** Active Development
