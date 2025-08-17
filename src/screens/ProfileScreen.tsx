import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '../theme/ThemeProvider';

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background.primary};
`;

const Header = styled.View`
  padding: ${(props) => props.theme.spacing['2xl']}px ${(props) => props.theme.spacing.lg}px;
  padding-top: ${(props) => props.theme.spacing['4xl']}px;
  background-color: ${(props) => props.theme.colors.primary[50]};
`;

const ProfileSection = styled.View`
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing['2xl']}px;
`;

const AvatarPlaceholder = styled.View`
  width: 80px;
  height: 80px;
  border-radius: ${(props) => props.theme.borderRadius.full}px;
  background-color: ${(props) => props.theme.colors.primary[200]};
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
`;

const AvatarText = styled.Text`
  font-size: 32px;
  color: ${(props) => props.theme.colors.primary[700]};
`;

const UserName = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.h1.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.h1.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
`;

const UserEmail = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.body.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  color: ${(props) => props.theme.colors.text.secondary};
`;

const Content = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.spacing.lg}px;
`;

const MenuSection = styled.View`
  margin-bottom: ${(props) => props.theme.spacing['2xl']}px;
`;

const SectionTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.h2.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.h2.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.semiBold};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background.primary};
  border-radius: ${(props) => props.theme.borderRadius.lg}px;
  padding: ${(props) => props.theme.spacing.lg}px;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
  ${(props) => props.theme.elevation.sm};
`;

const MenuIconContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: ${(props) => props.theme.borderRadius.lg}px;
  background-color: ${(props) => props.theme.colors.primary[100]};
  justify-content: center;
  align-items: center;
  margin-right: ${(props) => props.theme.spacing.lg}px;
`;

const MenuIcon = styled.Text`
  font-size: 20px;
`;

const MenuTextContainer = styled.View`
  flex: 1;
`;

const MenuTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.body.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.semiBold};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 2px;
`;

const MenuSubtitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.caption.fontSize}px;
  line-height: ${(props) => props.theme.typography.fontSize.caption.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  color: ${(props) => props.theme.colors.text.tertiary};
`;

const LogoutButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.error[50]};
  border: 1px solid ${(props) => props.theme.colors.error[200]};
  border-radius: ${(props) => props.theme.borderRadius.lg}px;
  padding: ${(props) => props.theme.spacing.lg}px;
  margin-top: ${(props) => props.theme.spacing.lg}px;
  align-items: center;
`;

const LogoutButtonText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSize.body.fontSize}px;
  font-weight: ${(props) => props.theme.typography.fontWeight.semiBold};
  color: ${(props) => props.theme.colors.error[600]};
`;

export const ProfileScreen: React.FC = () => {
  const theme = useTheme();
  
  const handleMenuItemPress = (item: string) => {
    console.log(`Pressed: ${item}`);
  };
  
  const handleLogout = () => {
    console.log('Logout pressed');
  };
  
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ProfileSection>
            <AvatarPlaceholder>
              <AvatarText>👤</AvatarText>
            </AvatarPlaceholder>
            <UserName>John Doe</UserName>
            <UserEmail>john.doe@example.com</UserEmail>
          </ProfileSection>
        </Header>
        
        <Content>
          <MenuSection>
            <SectionTitle>Account</SectionTitle>
            
            <MenuItem onPress={() => handleMenuItemPress('Edit Profile')}>
              <MenuIconContainer>
                <MenuIcon>✏️</MenuIcon>
              </MenuIconContainer>
              <MenuTextContainer>
                <MenuTitle>Edit Profile</MenuTitle>
                <MenuSubtitle>Update your personal information</MenuSubtitle>
              </MenuTextContainer>
            </MenuItem>
            
            <MenuItem onPress={() => handleMenuItemPress('My Recipes')}>
              <MenuIconContainer>
                <MenuIcon>📖</MenuIcon>
              </MenuIconContainer>
              <MenuTextContainer>
                <MenuTitle>My Recipes</MenuTitle>
                <MenuSubtitle>Recipes you've uploaded</MenuSubtitle>
              </MenuTextContainer>
            </MenuItem>
            
            <MenuItem onPress={() => handleMenuItemPress('Saved Collections')}>
              <MenuIconContainer>
                <MenuIcon>📚</MenuIcon>
              </MenuIconContainer>
              <MenuTextContainer>
                <MenuTitle>Saved Collections</MenuTitle>
                <MenuSubtitle>Organize your favorite recipes</MenuSubtitle>
              </MenuTextContainer>
            </MenuItem>
          </MenuSection>
          
          <MenuSection>
            <SectionTitle>Settings</SectionTitle>
            
            <MenuItem onPress={() => handleMenuItemPress('Notifications')}>
              <MenuIconContainer>
                <MenuIcon>🔔</MenuIcon>
              </MenuIconContainer>
              <MenuTextContainer>
                <MenuTitle>Notifications</MenuTitle>
                <MenuSubtitle>Manage your notification preferences</MenuSubtitle>
              </MenuTextContainer>
            </MenuItem>
            
            <MenuItem onPress={() => handleMenuItemPress('Privacy')}>
              <MenuIconContainer>
                <MenuIcon>🔒</MenuIcon>
              </MenuIconContainer>
              <MenuTextContainer>
                <MenuTitle>Privacy & Security</MenuTitle>
                <MenuSubtitle>Control your privacy settings</MenuSubtitle>
              </MenuTextContainer>
            </MenuItem>
            
            <MenuItem onPress={() => handleMenuItemPress('Help')}>
              <MenuIconContainer>
                <MenuIcon>❓</MenuIcon>
              </MenuIconContainer>
              <MenuTextContainer>
                <MenuTitle>Help & Support</MenuTitle>
                <MenuSubtitle>Get help with the app</MenuSubtitle>
              </MenuTextContainer>
            </MenuItem>
          </MenuSection>
          
          <LogoutButton onPress={handleLogout}>
            <LogoutButtonText>Sign Out</LogoutButtonText>
          </LogoutButton>
        </Content>
      </ScrollView>
    </Container>
  );
};