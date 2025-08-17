import { colors, ColorPalette } from './colors';
import { typography, Typography } from './typography';
import { spacing, Spacing } from './spacing';
import { elevation, Elevation } from './elevation';
import { borderRadius, BorderRadius } from './borderRadius';

// Main theme object combining all design tokens
export const theme = {
  colors,
  typography,
  spacing,
  elevation,
  borderRadius,
} as const;

export type Theme = {
  colors: ColorPalette;
  typography: Typography;
  spacing: Spacing;
  elevation: Elevation;
  borderRadius: BorderRadius;
};

// Export individual modules
export { colors, typography, spacing, elevation, borderRadius };
export type { ColorPalette, Typography, Spacing, Elevation, BorderRadius };