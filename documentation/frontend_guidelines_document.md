# Frontend Guideline Document

This document outlines the architecture, design principles, and technologies for the mobile recipe app frontend. It uses plain language so that anyone—designer or developer—can understand the setup and contribute confidently.

## 1. Frontend Architecture

### Overview
- **Framework**: React Native with TypeScript. We build once and deploy on both iOS and Android. TypeScript adds safety by catching mistakes early.
- **Build Tools**: Expo (for rapid setup and over-the-air updates) or the bare React Native workflow (for custom native modules).
- **Styling**: Styled-components (or a Tailwind-compatible library) with a JSON theme of design tokens.
- **Data Layer**: React Query handles fetching, caching, and updating recipe data. Context API holds global bits like user authentication status and theme selection.
- **Navigation**: React Navigation manages screen transitions and the bottom tab bar.

### How It Scales
- **Design Tokens**: Central JSON file for colors, fonts, spacing, shadows, and border radii. Changing a token updates the entire app.
- **Component-Based**: UI is broken into small, reusable pieces. As the app grows, we add new components without rewriting existing ones.
- **Offline & Caching**: React Query’s cache and local storage let us support offline mode, reducing backend load.

### Maintainability & Performance
- TypeScript types guard against API changes.
- Styled-components keep styles close to components, avoiding global CSS conflicts.
- React Query ensures we only fetch data when we need it, and re-use cached results.

## 2. Design Principles

1. **Usability**
   - Keep screens simple: one primary action per view.
   - Clear labels and icons (e.g., heart for favorites).

2. **Accessibility**
   - WCAG AA compliance: contrast ratios, 44×44pt touch targets, and proper screen-reader labels.
   - All images include alt text equivalents.

3. **Responsiveness & Mobile-First**
   - Design for phones first; tablet support is basic scaling in v1.
   - Flexible layouts using Flexbox and percentage-based widths.

4. **Consistency**
   - Use design tokens everywhere: same colors, shadows, and fonts.
   - Follow atomic design: Atoms → Molecules → Organisms.

## 3. Styling and Theming

### Styling Approach
- **Methodology**: styled-components with a single theme object imported into every styled component.
- **Design Tokens**: Stored in a JSON file with keys for:
  - colors (primary, secondary, background, text, accents)
  - typography (font sizes, weights, line heights)
  - spacing (small, medium, large)
  - shadows and elevations
  - border radii

### Theming
- Single light theme for v1, with structure to add dark theme later.
- Theme provider at the root of the app wraps all screens.

### Visual Style
- **Overall Style**: Flat, modern, minimalist. No heavy gradients or skeuomorphic elements.
- **Color Palette**:
  - Primary Orange 700: #FF7043
  - Secondary Orange 300: #FFB74D
  - Neutral Dark: #424242
  - Neutral Medium: #757575
  - Background Light: #FAFAFA
  - White: #FFFFFF

- **Typography** (Poppins):
  - H1: 32px, weight 700
  - H2: 24px, weight 700
  - Body: 16px, weight 400
  - Caption: 12px, weight 400

- **Shadows / Elevation**:
  - Low (card): shadowOffset {width:0, height:1}, shadowOpacity .1, shadowRadius 3
  - Medium (modal): offset {0,4}, opacity .2, radius 6

- **Border Radius**:
  - Small: 4px
  - Medium: 8px
  - Large: 16px

## 4. Component Structure

### Organization
- **/src/components/** – Reusable UI parts, organized by atomic design:
  - **atoms/** (e.g., Button, Text, Icon)
  - **molecules/** (e.g., RecipeCard, InputWithLabel)
  - **organisms/** (e.g., Header, BottomTabBar)
- **/src/screens/** – Page-level components (Home, Search, Detail, Favorites, Profile).
- **/src/hooks/** – Custom React hooks (e.g., useAuth, useRecipes).
- **/src/navigation/** – React Navigation setup and type definitions.
- **/src/theme/** – Design token JSON and ThemeProvider.
- **/src/context/** – Context providers (AuthContext, ThemeContext).

### Reuse & Modularity
- Each component has its own folder with `.tsx` and optional `.test.tsx`.
- Props are strongly typed. Styling is scoped to the component.
- Avoid duplication by extracting shared behavior into hooks or utility functions.

## 5. State Management

### React Query
- **Fetching**: useQuery for lists (e.g., recipe feed) and details.
- **Mutations**: useMutation for actions like "favorite" or "sign out".
- **Cache**: Cached items auto-update UI and survive brief network outages.

### Context API
- **AuthContext**: holds user info and login/logout methods.
- **ThemeContext**: tracks current theme (light/dark) and toggle function.

Why It Works
- Keeps server state (recipes) separate from client UI state (modal open).
- Easy to reason about: queries for remote data, context for app-wide flags.

## 6. Routing and Navigation

- **Library**: React Navigation (v5+).
- **Structure**:
  1. **Auth Stack Navigator** (Welcome, SignIn, SignUp, ForgotPassword)
  2. **Main Tab Navigator** (Home, Search, Favorites, Profile)
  3. **Nested Stack** inside Home for Detail screens.

- **Deep Linking** and screen params typed via TypeScript.
- **Transition Animations**: default slide-from-right for stacks, fade for modals.

## 7. Performance Optimization

1. **Code Splitting & Lazy Loading**
   - Dynamically import large screens (e.g., Profile) only when needed.
2. **Image Optimization**
   - Use placeholder low-res image, then load full resolution.
   - React Native FastImage or built-in caching strategies.
3. **Virtualized Lists**
   - FlatList with windowSize and removeClippedSubviews for infinite scroll.
4. **Memoization**
   - React.memo on pure components, useCallback/useMemo for expensive computations.
5. **Bundle Size**
   - Tree-shaking dependencies.
   - Expo EAS build profiles minimize unused code.

## 8. Testing and Quality Assurance

### Unit Tests
- **Framework**: Jest with React Native preset.
- **Target**: Pure functions, utility hooks, and small components.

### Integration Tests
- **Library**: React Native Testing Library.
- **Focus**: Component interactions (e.g., button tap updates list).

### End-to-End Tests
- **Tool**: Detox (or alternative like Cypress with mobile support).
- **Scenarios**: Onboarding flow, login/logout, browsing recipes, adding/removing favorites.

### Linters & Formatters
- **ESLint**: with TypeScript and React Native rules.
- **Prettier**: shared config for code style.
- **Git Hooks**: Husky runs lint and test on pre-commit.

### Continuous Integration
- **GitHub Actions**: run lint, unit tests, and build on every pull request.

## 9. Conclusion and Overall Frontend Summary

We’ve built a frontend that balances beauty and function:
- A clear, token-driven architecture ensures all colors, fonts, and spacings stay in sync.
- React Native + TypeScript + Expo powers a fast, cross-platform experience.
- Component-based design, coupled with React Query and Context, keeps code organized and data flows predictable.
- React Navigation provides smooth transitions and a familiar bottom-bar layout.
- Performance measures—lazy loading, caching, image optimization—make the app feel snappy.
- A solid testing strategy guards against regressions.

By following these guidelines, the team can confidently extend the app, keeping it reliable, maintainable, and delightful for home cooks everywhere.