# Backend Structure Document

This document explains the backend setup for our mobile recipe app. It uses everyday language so anyone can understand how the backend is built, hosted, and maintained.

## 1. Backend Architecture

Overall, our backend follows a serverless/BaaS (Backend as a Service) model, centered around Supabase. Here’s how it all fits together:

- **Supabase as Core**: We use Supabase for user authentication, database storage (PostgreSQL), and API endpoints. Supabase handles many of the routine backend tasks so we can focus on building features.
- **External Recipe API**: For recipe content, we fetch data from a public API (e.g., Spoonacular). This keeps our content fresh without having to build and maintain our own recipe database.
- **Design Patterns & Frameworks**:
  - **RESTful APIs**: Supabase auto-generates REST endpoints for our tables.
  - **Serverless Functions (optional)**: If we need custom logic (e.g., merging external API results with user data), we can use Supabase Edge Functions or lightweight Node.js lambdas.
- **Scalability**:
  - Supabase automatically scales the database and API layer.
  - Serverless endpoints only run when invoked, so we pay for what we use.
- **Maintainability & Performance**:
  - Clear separation between user data (in Supabase) and third-party recipes (via external API).
  - Automated database migrations and version-controlled schema changes.

## 2. Database Management

We rely on PostgreSQL (a SQL database) provided by Supabase. Here’s how we handle our data:

- **Database Type**: Relational (PostgreSQL) via Supabase.
- **Key Tables**:
  - **Users**: Stores user profiles and authentication details.
  - **Favorites**: Tracks which recipes each user has saved.
- **Data Access**:
  - Supabase’s built-in REST endpoints handle CRUD operations.
  - Row-Level Security (RLS) policies ensure users only read/write their own data.
- **Practices**:
  - Use UUIDs for primary keys to avoid collisions.
  - Enforce NOT NULL constraints on critical columns (e.g., `user_id`, `recipe_id`).
  - Regular backups and point-in-time recovery via Supabase.

## 3. Database Schema

Below is a human-readable overview of our PostgreSQL schema, followed by the SQL definitions.

Tables:
- **users**: Holds account information.
- **favorites**: Links a user to a saved recipe.

PostgreSQL Definition:
```sql
-- USERS TABLE
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- FAVORITES TABLE
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipe_id TEXT NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, recipe_id)
);
```

## 4. API Design and Endpoints

We use Supabase’s auto-generated REST API plus a small proxy for the external recipe service. Key endpoints include:

- **Authentication** (`/auth/v1`):
  - Sign up (email/password)
  - Sign in (email/password, Google OAuth)
  - Password reset
- **User Profile** (`/rest/v1/users`):
  - GET current user
  - PATCH update profile
- **Favorites** (`/rest/v1/favorites`):
  - GET favorites for current user
  - POST add a favorite
  - DELETE remove a favorite
- **Recipe Content** (proxy or client):
  - GET `/api/recipes?query=…` fetches list from Spoonacular
  - GET `/api/recipes/{id}` fetches recipe details
- **Mock Server (dev only)**: JSON Server with the same endpoints for offline dev/testing.

These endpoints let the frontend talk to user data (via Supabase) and recipe content (via external API) in a clear, RESTful way.

## 5. Hosting Solutions

We chose managed cloud services to reduce operational overhead:

- **Supabase Hosting**:
  - Database, Auth, and REST API are all hosted on Supabase’s cloud platform.
  - Benefits: 99.9% uptime SLA, automatic scaling, built-in backups.
- **External API (Spoonacular)**:
  - Hosted by Spoonacular; we only consume their service.
- **CI/CD & App Builds**:
  - **GitHub Actions** runs tests, linting, and builds on every push.
  - **Expo Application Services (EAS)** builds production mobile binaries in the cloud.

Overall, this setup is reliable, cost-effective (pay for what you use), and easy to maintain.

## 6. Infrastructure Components

To keep performance high and users happy, we layer in a few extra services:

- **Load Balancers**: Supabase’s endpoints sit behind auto-scaling load balancers.
- **CDN**: We serve static assets (e.g., avatar images) through a CDN (Supabase Storage or Cloudflare) for fast global delivery.
- **CI/CD Pipeline**:
  - GitHub Actions for automated testing and builds.
  - Expo EAS for cloud-based app builds.
- **Local Caching**:
  - Frontend uses React Query to cache recipe lists and details.
  - Favorites are stored offline in local storage for instant access.

These pieces work together to deliver low latency and high availability.

## 7. Security Measures

Protecting user data is critical. We implement:

- **Encryption**:
  - All traffic over HTTPS/TLS.
  - Data at rest is encrypted in Supabase.
- **Authentication & Authorization**:
  - Supabase Auth for secure sign-up/sign-in (email/password, Google OAuth).
  - JSON Web Tokens (JWT) for session management.
  - Row-Level Security policies so users only see or modify their own records.
- **OWASP Mobile Top 10**:
  - Input validation, secure storage, and safe API usage.
- **Role-Based Access**:
  - Public vs. private data separated by policies in the database.

## 8. Monitoring and Maintenance

To keep everything running smoothly, we use:

- **Supabase Dashboard**:
  - Real-time metrics on database activity, API latency, and errors.
  - Automated backups and easy restores.
- **CI/CD Alerts**:
  - GitHub Actions failures notify the team via Slack or email.
- **Error Tracking**:
  - Integrate Sentry (or similar) in the mobile app for crash reporting.
- **Maintenance Strategy**:
  - Weekly dependency updates (npm packages, Supabase upgrades).
  - Scheduled performance reviews and database vacuuming.

## 9. Conclusion and Overall Backend Summary

Our backend is built around Supabase’s managed PostgreSQL and Auth services, combined with a public recipe API. This design:

- Ensures **scalability** by offloading infrastructure to a cloud provider.
- Simplifies **maintenance** with managed backups, migrations, and auto-scaling.
- Delivers strong **security** through HTTPS, JWTs, and database policies.
- Provides a clear **API layer** for both user data and recipe content.

By using these components together—Supabase, Spoonacular, GitHub Actions, and Expo EAS—we meet our goals for performance, reliability, and ease of development. This backend structure lets us focus on building features and delivering a delightful recipe app experience.