import React, { useState } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert } from 'react-native';
import { AuthStackParamList } from '../types/navigation';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing[6]}px;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-family: ${({ theme }) => theme.typography.h2.fontFamily};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
  margin-top: ${({ theme }) => theme.spacing[12]}px;
`;

const Subtitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]}px;
`;

const InputContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const Label = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[1]}px;
`;

const Input = styled.TextInput<{ hasError?: boolean }>`
  border: 2px solid ${({ theme, hasError }) => 
    hasError ? theme.colors.error : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing[4]}px;
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  margin-top: ${({ theme }) => theme.spacing[1]}px;
`;

const Button = styled.TouchableOpacity<{ disabled?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[4]}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing[6]}px;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
  background-color: ${({ theme, disabled }) => 
    disabled ? theme.colors.neutral[200] : theme.colors.primary[500]};
`;

const ButtonText = styled.Text<{ disabled?: boolean }>`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme, disabled }) => 
    disabled ? theme.colors.text.tertiary : theme.colors.text.inverse};
`;

const LinkButton = styled.TouchableOpacity`
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing[4]}px;
`;

const LinkText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  color: ${({ theme }) => theme.colors.primary[500]};
`;

type NavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<NavigationProp>();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string}>({});

  const validateForm = () => {
    const newErrors: {email?: string} = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // TODO: Implement password reset functionality
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      Alert.alert(
        'Reset Link Sent', 
        'Please check your email for password reset instructions.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Reset Password</Title>
      <Subtitle>
        Enter your email address and we'll send you a link to reset your password.
      </Subtitle>
      
      <InputContainer>
        <Label>Email</Label>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          hasError={!!errors.email}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
      </InputContainer>
      
      <Button onPress={handleResetPassword} disabled={loading}>
        <ButtonText disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </ButtonText>
      </Button>
      
      <LinkButton onPress={() => navigation.navigate('Login')}>
        <LinkText>Back to Login</LinkText>
      </LinkButton>
    </Container>
  );
}