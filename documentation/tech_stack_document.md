# Tech Stack Document

## 1. Frontend Technologies

We chose a modern, mobile-first frontend stack to deliver a smooth and consistent user experience across iOS and Android devices.

- **React Native (TypeScript)**  
  Lets us write native-feeling mobile apps using familiar web technologies with the safety of TypeScript’s type checking.
- **Expo (or bare workflow)**  
  Provides tools to build, test, and publish mobile apps quickly. We can start with Expo for speed and eject to the bare workflow if we need custom native modules.
- **Styled-components (or Tailwind-compatible RN library)**  
  Allows us to apply the design tokens (colors, typography, shadows, border-radius) as theme values directly in our components, keeping styling consistent and maintainable.
- **Design Tokens via JSON theme**  
  A single source of truth for all colors, font sizes, weights, shadows, and corner radii. Developers simply import the token file and reference values by name (e.g., `theme.colors.primary`).
- **React Query**  
  Handles data fetching and caching out of the box, so recipe lists and details load quickly and update efficiently when data changes.
- **Context API**  
  Manages global state such as authentication status and theme (light/dark) without adding extra complexity.

How this enhances the user experience:
- Consistent look and feel by following the `sonsans` design tokens.
- Fast initial loads and smooth scrolling via React Query’s caching.
- Clean, maintainable code that’s easy to update as the design evolves.

## 2. Backend Technologies

Our backend setup focuses on quick setup, security, and reliable data storage.

- **Supabase (PostgreSQL + Auth)**  
  A hosted service that gives us a managed PostgreSQL database, built-in user authentication (email/password and Google OAuth), and real-time listeners for live updates.
- **External Recipe API (e.g., Spoonacular)**  
  Provides the core recipe data (titles, ingredients, instructions). We fetch this data on demand and cache it locally.
- **JSON Server (for mocks)**  
  A lightweight mock backend for development and testing when the real API is unavailable or rate-limited.

How these components work together:
1. The mobile app queries your Supabase JWT-protected endpoints for user data (profiles, favorites).  
2. Recipe content is fetched from the public API or JSON Server during development.  
3. Favorite recipes and user profiles are stored in Supabase, giving us persistence and offline support via local caching.

## 3. Infrastructure and Deployment

A solid infrastructure setup ensures that releases are reliable and easy to manage.

- **Git & GitHub**  
  Version control system and central repository for code collaboration, issue tracking, and code reviews.
- **GitHub Actions (CI/CD)**  
  Automatically runs tests, lints code, builds the app, and can even publish to Expo’s build service or app stores on merge to `main`.
- **Expo Application Services (EAS)**  
  Handles building production-ready iOS and Android binaries in the cloud without maintaining local native toolchains.
- **Supabase Hosting**  
  Our database and authentication services are hosted on Supabase’s cloud, which offers a 99.9% uptime SLA.

These choices contribute to:
- **Reliability**: Automated builds and tests catch issues early.  
- **Scalability**: Supabase scales with demand and Expo EAS handles multiple build jobs.  
- **Ease of Deployment**: One-click builds and exports to Google Play and App Store.

## 4. Third-Party Integrations

We’ve integrated a few services to accelerate development and add important features:

- **Spoonacular API (or similar)**  
  Supplies recipe data — names, descriptions, images, ingredients, and instructions.
- **Google OAuth**  
  Lets users sign in quickly with their Google account.
- **OpenAI API (optional future phase)**  
  Could power AI-driven recipe suggestions or chat-style cooking tips.
- **Analytics (e.g., Expo Analytics or Google Analytics for Firebase)**  
  Tracks user engagement, popular recipes, and retention metrics.

Benefits:
- Rapid access to a large recipe database without building our own content CMS.  
- Familiar, secure sign-in flows for users.  
- Insights into how people use the app, guiding future enhancements.

## 5. Security and Performance Considerations

Keeping our users’ data safe and the app fast is a top priority.

Security Measures:
- **HTTPS/TLS encryption** for all network requests.  
- **Supabase Auth** enforces secure password storage and token-based sessions.  
- **OWASP Mobile Top 10** guidelines followed to protect against common mobile vulnerabilities.
- **Role-based access** in Supabase to separate public recipe data from user-specific favorites.

Performance Optimizations:
- **React Query caching** minimizes repeated API calls and speeds up list and detail screens.  
- **Infinite scroll with pagination** ensures we only load what’s needed as the user scrolls.  
- **Progressive image loading** (low-res placeholder → high-res images) so screens feel snappy.  
- **Offline caching** of favorites and last-viewed recipes makes the app usable without a network.
- **Bundling and code splitting** (via Metro bundler or EAS) to keep initial download size small.

## 6. Conclusion and Overall Tech Stack Summary

We built our mobile recipe app using a cohesive set of technologies that align with our goals of a clean, modern, and reliable user experience:

- **Frontend**: React Native with TypeScript, styled-components, design tokens, React Query, Context API.
- **Backend**: Supabase (PostgreSQL, Auth), external recipe API (Spoonacular), JSON Server for mocks.
- **Infrastructure**: GitHub + GitHub Actions, Expo Application Services, Supabase hosting.
- **Integrations**: Google OAuth, analytics tools, optional OpenAI for AI features.
- **Security & Performance**: HTTPS, OWASP guidelines, caching, offline support, and image optimizations.

This tech stack lets us deliver a polished, fast, and secure mobile app that closely follows the `sonsans` design guidelines, keeps users engaged with beautiful visuals, and scales smoothly as our user base grows.