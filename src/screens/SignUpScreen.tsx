import React, { useState } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert } from 'react-native';
import { AuthStackParamList } from '../types/navigation';
import { useAuth } from '../services/auth/AuthContext';

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
  margin-bottom: ${({ theme }) => theme.spacing[8]}px;
  margin-top: ${({ theme }) => theme.spacing[12]}px;
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
  margin-top: ${({ theme }) => theme.spacing[2]}px;
`;

const LinkText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  color: ${({ theme }) => theme.colors.primary[500]};
`;

type NavigationProp = StackNavigationProp<AuthStackParamList, 'SignUp'>;

export default function SignUpScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { signUp } = useAuth();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string; 
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await signUp(email, password, username);
    } catch (error) {
      Alert.alert('Sign Up Failed', error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Create Account</Title>
      
      <InputContainer>
        <Label>Username</Label>
        <Input
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          autoCapitalize="none"
          hasError={!!errors.username}
        />
        {errors.username && <ErrorText>{errors.username}</ErrorText>}
      </InputContainer>
      
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
      
      <InputContainer>
        <Label>Password</Label>
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          hasError={!!errors.password}
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
      </InputContainer>
      
      <InputContainer>
        <Label>Confirm Password</Label>
        <Input
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
          hasError={!!errors.confirmPassword}
        />
        {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
      </InputContainer>
      
      <Button onPress={handleSignUp} disabled={loading}>
        <ButtonText disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </ButtonText>
      </Button>
      
      <LinkButton onPress={() => navigation.navigate('Login')}>
        <LinkText>Already have an account? Log In</LinkText>
      </LinkButton>
    </Container>
  );
}