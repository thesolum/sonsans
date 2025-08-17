import React from 'react';
import styled from 'styled-components/native';
import { TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'overline';
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'accent';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

const StyledText = styled.Text<{
  variant: string;
  color: string;
  weight: string;
  align: string;
}>`
  ${({ theme, variant, color, weight, align }) => {
    const variants = {
      h1: {
        fontSize: theme.typography.h1.fontSize,
        fontFamily: theme.typography.h1.fontFamily,
        lineHeight: theme.typography.h1.fontSize * theme.typography.h1.lineHeight,
      },
      h2: {
        fontSize: theme.typography.h2.fontSize,
        fontFamily: theme.typography.h2.fontFamily,
        lineHeight: theme.typography.h2.fontSize * theme.typography.h2.lineHeight,
      },
      h3: {
        fontSize: theme.typography.h3.fontSize,
        fontFamily: theme.typography.h3.fontFamily,
        lineHeight: theme.typography.h3.fontSize * theme.typography.h3.lineHeight,
      },
      body: {
        fontSize: theme.typography.body.fontSize,
        fontFamily: theme.typography.body.fontFamily,
        lineHeight: theme.typography.body.fontSize * theme.typography.body.lineHeight,
      },
      caption: {
        fontSize: theme.typography.caption.fontSize,
        fontFamily: theme.typography.caption.fontFamily,
        lineHeight: theme.typography.caption.fontSize * theme.typography.caption.lineHeight,
      },
      overline: {
        fontSize: theme.typography.xs,
        fontFamily: theme.typography.fontFamily.medium,
        lineHeight: theme.typography.xs * 1.5,
        textTransform: 'uppercase',
        letterSpacing: 1,
      },
    };

    const colors = {
      primary: theme.colors.text.primary,
      secondary: theme.colors.text.secondary,
      tertiary: theme.colors.text.tertiary,
      inverse: theme.colors.text.inverse,
      accent: theme.colors.primary[500],
    };

    const weights = {
      regular: theme.typography.fontFamily.regular,
      medium: theme.typography.fontFamily.medium,
      semiBold: theme.typography.fontFamily.semiBold,
      bold: theme.typography.fontFamily.bold,
    };

    const variantStyles = variants[variant as keyof typeof variants];
    
    return `
      font-size: ${variantStyles.fontSize}px;
      font-family: ${weight === 'regular' ? variantStyles.fontFamily : weights[weight as keyof typeof weights]};
      line-height: ${variantStyles.lineHeight}px;
      color: ${colors[color as keyof typeof colors]};
      text-align: ${align};
      ${variant === 'overline' ? `
        text-transform: ${variantStyles.textTransform};
        letter-spacing: ${variantStyles.letterSpacing}px;
      ` : ''}
    `;
  }}
`;

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = 'primary',
  weight = 'regular',
  align = 'left',
  children,
  ...props
}) => {
  return (
    <StyledText
      variant={variant}
      color={color}
      weight={weight}
      align={align}
      {...props}
    >
      {children}
    </StyledText>
  );
};

// Convenience components
export const Heading1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h1" {...props} />
);

export const Heading2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h2" {...props} />
);

export const Heading3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h3" {...props} />
);

export const Body: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="body" {...props} />
);

export const Caption: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="caption" {...props} />
);

export const Overline: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="overline" {...props} />
);

export default Typography;