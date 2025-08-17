export const typography = {
  // Font families - Poppins as specified
  fontFamily: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
  },
  
  // Typography scale as specified in README
  fontSize: {
    // H1 - Large headings
    h1: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: 'bold' as const,
      letterSpacing: -0.5,
    },
    
    // H2 - Section headings
    h2: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: 'semiBold' as const,
      letterSpacing: -0.25,
    },
    
    // Body - Main text
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 'regular' as const,
      letterSpacing: 0,
    },
    
    // Caption - Small text
    caption: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: 'regular' as const,
      letterSpacing: 0.25,
    },
    
    // Additional useful sizes
    xl: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: 'medium' as const,
      letterSpacing: -0.25,
    },
    
    sm: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: 'regular' as const,
      letterSpacing: 0.4,
    },
  },
  
  // Font weights
  fontWeight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
} as const;

export type Typography = typeof typography;