# Sonsans Recipe App - Development Guide

## Overview
A modern React Native recipe application built with the sonsans design system, featuring recipe discovery, favorites management, search functionality, and user authentication.

## Tech Stack
- **React Native** with **Expo** for mobile development
- **TypeScript** for type safety
- **Styled Components** for styling with design tokens
- **React Navigation** for navigation
- **React Query** for data fetching and caching
- **AsyncStorage** for local storage
- **Supabase** (ready for integration) for backend services

## Project Structure
```
src/
├── components/          # Reusable UI components
├── navigation/          # Navigation setup
├── screens/            # App screens
├── services/           # API services and data layer
│   ├── api/           # API integration
│   ├── auth/          # Authentication
│   ├── favorites/     # Favorites management
│   └── hooks/         # React Query hooks
├── theme/              # Design tokens and styling
└── types/             # TypeScript type definitions
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm start
```

### 3. Run on Device/Simulator
- **iOS**: `npm run ios`
- **Android**: `npm run android`
- **Web**: `npm run web`

## Features Implemented

### ✅ Authentication System
- Email/password sign-up and login
- Session persistence
- Profile management
- Secure credential storage

### ✅ Recipe Management
- Recipe browsing with infinite scroll
- Detailed recipe views with ingredients and instructions
- Search and filtering functionality
- Category-based browsing

### ✅ Favorites System
- Add/remove favorites with optimistic updates
- Local storage with cloud sync capability
- Favorites screen with proper data loading

### ✅ Design System
- Complete sonsans design tokens implementation
- Reusable styled components (Button, Card, Input, Typography)
- Consistent theming throughout the app
- Style guide screen for design verification

### ✅ Navigation
- Bottom tab navigation with 5 tabs
- Stack navigation for detailed views
- Modal navigation for filters
- Proper deep linking support

### ✅ Data Layer
- React Query for caching and offline support
- Mock API with Spoonacular-ready integration
- Error handling and loading states
- Optimistic updates for better UX

## Mock Data
The app currently uses mock data for development. To integrate with real APIs:

1. **Spoonacular API**: Update `src/services/api/recipeApi.ts` with your API key
2. **Supabase**: Configure authentication in `src/services/auth/AuthContext.tsx`

## Development Commands
- `npm start` - Start Expo development server
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Code Quality
- TypeScript for type safety
- ESLint for code quality
- Consistent component structure
- Proper error handling
- Loading states throughout

## Ready for Production
The app is structured for easy scaling and production deployment:
- Modular architecture
- Type-safe components
- Error boundaries ready
- Performance optimizations
- Security best practices