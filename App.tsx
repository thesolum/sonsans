import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { theme } from './src/theme';
import { AuthProvider } from './src/services/auth/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <AuthProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </AuthProvider>
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}