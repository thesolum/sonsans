import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../types/navigation';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing[6]}px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.typography.h1.fontSize}px;
  font-family: ${({ theme }) => theme.typography.h1.fontFamily};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[2]}px;
`;

const Subtitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[10]}px;
`;

const Button = styled.TouchableOpacity<{ variant: 'primary' | 'secondary' }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[4]}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
  background-color: ${({ theme, variant }) => 
    variant === 'primary' ? theme.colors.primary[500] : theme.colors.background.primary};
  border: ${({ theme, variant }) => 
    variant === 'secondary' ? `2px solid ${theme.colors.primary[500]}` : 'none'};
`;

const ButtonText = styled.Text<{ variant: 'primary' | 'secondary' }>`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme, variant }) => 
    variant === 'primary' ? theme.colors.text.inverse : theme.colors.primary[500]};
`;

const IllustrationPlaceholder = styled.View`
  width: 200px;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.primary[100]};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']}px;
  margin-bottom: ${({ theme }) => theme.spacing[8]}px;
  align-items: center;
  justify-content: center;
`;

const PlaceholderText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  color: ${({ theme }) => theme.colors.primary[500]};
`;

type NavigationProp = StackNavigationProp<AuthStackParamList, 'Onboarding'>;

export default function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Container>
      <IllustrationPlaceholder>
        <PlaceholderText>Recipe Illustration</PlaceholderText>
      </IllustrationPlaceholder>
      
      <Title>Welcome to Sonsans</Title>
      <Subtitle>
        Discover amazing recipes, save your favorites, and create culinary masterpieces
      </Subtitle>
      
      <Button variant="primary" onPress={() => navigation.navigate('SignUp')}>
        <ButtonText variant="primary">Sign Up</ButtonText>
      </Button>
      
      <Button variant="secondary" onPress={() => navigation.navigate('Login')}>
        <ButtonText variant="secondary">Log In</ButtonText>
      </Button>
    </Container>
  );
}