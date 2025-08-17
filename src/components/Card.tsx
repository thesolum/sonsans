import React from 'react';
import styled from 'styled-components/native';
import { ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const StyledCard = styled.View<{
  variant: string;
  padding: string;
}>`
  ${({ theme, variant, padding }) => {
    const paddingMap = {
      none: 0,
      sm: theme.spacing[3],
      md: theme.spacing[4],
      lg: theme.spacing[6],
    };

    const variantStyles = {
      default: {
        backgroundColor: theme.colors.background.primary,
        borderWidth: 0,
        ...theme.shadows.sm,
      },
      elevated: {
        backgroundColor: theme.colors.background.primary,
        borderWidth: 0,
        ...theme.shadows.md,
      },
      outlined: {
        backgroundColor: theme.colors.background.primary,
        borderWidth: 1,
        borderColor: theme.colors.border.light,
        ...theme.shadows.none,
      },
    };

    const styles = variantStyles[variant as keyof typeof variantStyles];
    
    return `
      background-color: ${styles.backgroundColor};
      border-radius: ${theme.borderRadius.lg}px;
      padding: ${paddingMap[padding as keyof typeof paddingMap]}px;
      ${styles.borderWidth ? `border-width: ${styles.borderWidth}px;` : ''}
      ${styles.borderColor ? `border-color: ${styles.borderColor};` : ''}
      ${styles.shadowOffset ? `
        shadow-offset: ${styles.shadowOffset.width}px ${styles.shadowOffset.height}px;
        shadow-opacity: ${styles.shadowOpacity};
        shadow-radius: ${styles.shadowRadius}px;
        shadow-color: ${styles.shadowColor || '#000'};
        elevation: ${styles.elevation};
      ` : ''}
    `;
  }}
`;

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  children,
  ...props
}) => {
  return (
    <StyledCard variant={variant} padding={padding} {...props}>
      {children}
    </StyledCard>
  );
};

export default Card;