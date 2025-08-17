import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
}

const Container = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const Label = styled.Text<{ error?: boolean }>`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  color: ${({ theme, error }) => error ? theme.colors.error : theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[1]}px;
`;

const InputContainer = styled.View<{
  variant: string;
  size: string;
  focused: boolean;
  error?: boolean;
}>`
  ${({ theme, variant, size, focused, error }) => {
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
        paddingHorizontal: theme.spacing[5],
        fontSize: theme.typography.lg,
      },
    };

    const variants = {
      default: {
        backgroundColor: theme.colors.background.primary,
        borderWidth: 2,
        borderColor: error 
          ? theme.colors.error 
          : focused 
            ? theme.colors.primary[500] 
            : theme.colors.border.light,
      },
      filled: {
        backgroundColor: theme.colors.background.secondary,
        borderWidth: 0,
        borderColor: 'transparent',
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: error 
          ? theme.colors.error 
          : focused 
            ? theme.colors.primary[500] 
            : theme.colors.border.medium,
      },
    };

    const sizeStyles = sizes[size as keyof typeof sizes];
    const variantStyles = variants[variant as keyof typeof variants];
    
    return `
      flex-direction: row;
      align-items: center;
      background-color: ${variantStyles.backgroundColor};
      border-width: ${variantStyles.borderWidth}px;
      border-color: ${variantStyles.borderColor};
      border-radius: ${theme.borderRadius.md}px;
      padding-vertical: ${sizeStyles.paddingVertical}px;
      padding-horizontal: ${sizeStyles.paddingHorizontal}px;
    `;
  }}
`;

const StyledTextInput = styled.TextInput<{
  size: string;
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
}>`
  flex: 1;
  font-size: ${({ theme, size }) => {
    const sizes = {
      sm: theme.typography.sm,
      md: theme.typography.base,
      lg: theme.typography.lg,
    };
    return sizes[size as keyof typeof sizes];
  }}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-left: ${({ theme, hasLeftIcon }) => hasLeftIcon ? theme.spacing[2] : 0}px;
  margin-right: ${({ theme, hasRightIcon }) => hasRightIcon ? theme.spacing[2] : 0}px;
`;

const IconContainer = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing[1]}px;
`;

const HelperContainer = styled.View`
  margin-top: ${({ theme }) => theme.spacing[1]}px;
`;

const HelperText = styled.Text<{ error?: boolean }>`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  color: ${({ theme, error }) => error ? theme.colors.error : theme.colors.text.tertiary};
`;

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  variant = 'default',
  size = 'md',
  leftIcon,
  rightIcon,
  onRightIconPress,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <Container>
      {label && <Label error={!!error}>{label}</Label>}
      
      <InputContainer
        variant={variant}
        size={size}
        focused={focused}
        error={!!error}
      >
        {leftIcon && (
          <IconContainer>
            <Ionicons 
              name={leftIcon} 
              size={20} 
              color={error ? '#EF4444' : focused ? '#F97316' : '#71717A'} 
            />
          </IconContainer>
        )}
        
        <StyledTextInput
          size={size}
          hasLeftIcon={!!leftIcon}
          hasRightIcon={!!rightIcon}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholderTextColor="#A1A1AA"
          {...props}
        />
        
        {rightIcon && (
          <IconContainer onPress={onRightIconPress}>
            <Ionicons 
              name={rightIcon} 
              size={20} 
              color={error ? '#EF4444' : focused ? '#F97316' : '#71717A'} 
            />
          </IconContainer>
        )}
      </InputContainer>
      
      {(error || helperText) && (
        <HelperContainer>
          <HelperText error={!!error}>
            {error || helperText}
          </HelperText>
        </HelperContainer>
      )}
    </Container>
  );
};

export default Input;