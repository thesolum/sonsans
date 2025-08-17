import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
  justify-content: center;
  align-items: center;
`;

const Logo = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]}px;
`;

const LogoText = styled.Text`
  font-size: 32px;
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  color: ${({ theme }) => theme.colors.text.inverse};
`;

const AppName = styled.Text`
  font-size: ${({ theme }) => theme.typography['2xl']}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]}px;
`;

const Tagline = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[8]}px;
  text-align: center;
`;

export default function LoadingScreen() {
  return (
    <Container>
      <Logo>
        <LogoText>S</LogoText>
      </Logo>
      <AppName>Sonsans</AppName>
      <Tagline>Discover amazing recipes</Tagline>
      <ActivityIndicator size="large" color="#F97316" />
    </Container>
  );
}