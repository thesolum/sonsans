import React, { createContext, useContext, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { theme, Theme } from './index';

// Create theme context
const ThemeContext = createContext<Theme | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// Theme Provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};