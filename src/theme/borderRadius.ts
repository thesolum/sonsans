// Border-radius scale for consistent corner rounding as specified in README
export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999, // For circular elements
} as const;

export type BorderRadius = typeof borderRadius;