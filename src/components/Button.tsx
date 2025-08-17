import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';
import { Theme } from '../theme';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
}

const getButtonStyles = (theme: Theme, variant: string, size: string, disabled: boolean) => {
  const sizes = {
    sm: {
      paddingVertical: theme.spacing[2],
      paddingHorizontal: theme.spacing[3],
      fontSize: theme.typography.sm,
    },
    md: {
      paddingVertical: theme.spacing[3],
      paddingHorizontal: theme.spacing[4],
      fontSize: theme.typography.base,
    },
    lg: {
      paddingVertical: theme.spacing[4],
      paddingHorizontal: theme.spacing[6],
      fontSize: theme.typography.lg,
    },
  };

  const variants = {
    primary: {
      backgroundColor: disabled ? theme.colors.neutral[200] : theme.colors.primary[500],
      borderColor: 'transparent',
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: disabled ? theme.colors.neutral[100] : theme.colors.background.secondary,
      borderColor: disabled ? theme.colors.neutral[200] : theme.colors.border.medium,
      borderWidth: 1,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: disabled ? theme.colors.neutral[200] : theme.colors.primary[500],
      borderWidth: 2,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 0,
    },
  };

  return {
    ...sizes[size as keyof typeof sizes],
    ...variants[variant as keyof typeof variants],
  };
};

const getTextColor = (theme: Theme, variant: string, disabled: boolean) => {
  if (disabled) {
    return theme.colors.text.tertiary;
  }

  switch (variant) {
    case 'primary':
      return theme.colors.text.inverse;
    case 'secondary':
      return theme.colors.text.primary;
    case 'outline':
      return theme.colors.primary[500];
    case 'ghost':
      return theme.colors.text.primary;
    default:
      return theme.colors.text.primary;
  }
};

const StyledButton = styled.TouchableOpacity<{
  variant: string;
  size: string;
  disabled: boolean;
}>`
  ${({ theme, variant, size, disabled }) => {
    const styles = getButtonStyles(theme, variant, size, disabled);
    return `
      background-color: ${styles.backgroundColor};
      border-color: ${styles.borderColor};
      border-width: ${styles.borderWidth}px;
      border-radius: ${theme.borderRadius.md}px;
      padding-vertical: ${styles.paddingVertical}px;
      padding-horizontal: ${styles.paddingHorizontal}px;
      align-items: center;
      justify-content: center;
    `;
  }}
  ${({ theme }) => theme.shadows.sm};
`;

const ButtonText = styled.Text<{
  variant: string;
  size: string;
  disabled: boolean;
}>`
  ${({ theme, variant, size, disabled }) => {
    const styles = getButtonStyles(theme, variant, size, disabled);
    return `
      font-size: ${styles.fontSize}px;
      font-family: ${theme.typography.fontFamily.semiBold};
      color: ${getTextColor(theme, variant, disabled)};
    `;
  }}
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      {...props}
    >
      <ButtonText variant={variant} size={size} disabled={disabled}>
        {children}
      </ButtonText>
    </StyledButton>
  );
};

export default Button;