import { colors, typography, shadows, borderRadius, spacing } from './tokens';

export const theme = {
  colors,
  typography,
  shadows,
  borderRadius,
  spacing,
};

export type Theme = typeof theme;

export * from './tokens';