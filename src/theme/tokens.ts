// Sonsans Design Tokens
export const colors = {
  // Primary palette - pastel oranges
  primary: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316', // Main orange
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
  },
  
  // Neutral tones
  neutral: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
  },
  
  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#FAFAFA',
    tertiary: '#F4F4F5',
  },
  
  // Text colors
  text: {
    primary: '#18181B',
    secondary: '#3F3F46',
    tertiary: '#71717A',
    inverse: '#FFFFFF',
  },
  
  // Border colors
  border: {
    light: '#E4E4E7',
    medium: '#D4D4D8',
    dark: '#A1A1AA',
  },
};

// Typography scale
export const typography = {
  fontFamily: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
  },
  
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
  },
  
  // Semantic text styles
  h1: {
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    lineHeight: 1.25,
  },
  h2: {
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 1.25,
  },
  h3: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 1.25,
  },
  body: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    lineHeight: 1.5,
  },
  caption: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 1.25,
  },
};

// Shadow/Elevation tokens
export const shadows = {
  none: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowColor: '#000',
    elevation: 1,
  },
  sm: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: '#000',
    elevation: 2,
  },
  base: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowColor: '#000',
    elevation: 3,
  },
  md: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowColor: '#000',
    elevation: 4,
  },
  lg: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    shadowColor: '#000',
    elevation: 5,
  },
  xl: {
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    shadowColor: '#000',
    elevation: 8,
  },
};

// Border-radius scale
export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  base: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  '3xl': 32,
  full: 999,
};

// Spacing scale
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
};