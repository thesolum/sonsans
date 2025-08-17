import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../services/auth/AuthContext';
import { useFavoriteCount } from '../services/hooks/useFavorites';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const Header = styled.View`
  align-items: center;
  padding: ${({ theme }) => theme.spacing[8]}px ${({ theme }) => theme.spacing[6]}px;
`;

const AvatarContainer = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.primary[100]};
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
  ${({ theme }) => theme.shadows.md};
`;

const AvatarPlaceholder = styled.Text`
  font-size: 40px;
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  color: ${({ theme }) => theme.colors.primary[500]};
`;

const UserName = styled.Text`
  font-size: ${({ theme }) => theme.typography['2xl']}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[1]}px;
`;

const UserEmail = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[6]}px;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing[6]}px;
  margin: 0 ${({ theme }) => theme.spacing[6]}px ${({ theme }) => theme.spacing[8]}px;
`;

const StatItem = styled.View`
  align-items: center;
`;

const StatNumber = styled.Text`
  font-size: ${({ theme }) => theme.typography.xl}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[1]}px;
`;

const StatLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const MenuContainer = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spacing[6]}px;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border.light};
`;

const MenuIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing[3]}px;
`;

const MenuText = styled.Text`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const LogoutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing[4]}px;
  margin: ${({ theme }) => theme.spacing[6]}px ${({ theme }) => theme.spacing[6]}px ${({ theme }) => theme.spacing[4]}px;
`;

const LogoutButtonText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  color: ${({ theme }) => theme.colors.text.inverse};
  margin-left: ${({ theme }) => theme.spacing[2]}px;
`;

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { data: favoritesCount = 0, isLoading: loadingFavorites } = useFavoriteCount();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: signOut },
      ]
    );
  };

  const handleMenuPress = (item: string) => {
    Alert.alert('Coming Soon', `${item} feature will be available soon!`);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Container>
      <Header>
        <AvatarContainer>
          <AvatarPlaceholder>
            {user?.username ? getInitials(user.username) : 'U'}
          </AvatarPlaceholder>
        </AvatarContainer>
        <UserName>{user?.username || 'User'}</UserName>
        <UserEmail>{user?.email}</UserEmail>
      </Header>

      <StatsContainer>
        <StatItem>
          <StatNumber>
            {loadingFavorites ? (
              <ActivityIndicator size="small" color="#F97316" />
            ) : (
              favoritesCount
            )}
          </StatNumber>
          <StatLabel>Favorites</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>0</StatNumber>
          <StatLabel>My Recipes</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>0</StatNumber>
          <StatLabel>Following</StatLabel>
        </StatItem>
      </StatsContainer>

      <MenuContainer>
        <MenuItem onPress={() => handleMenuPress('Edit Profile')}>
          <MenuIcon>
            <Ionicons name="person-outline" size={20} color="#71717A" />
          </MenuIcon>
          <MenuText>Edit Profile</MenuText>
          <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
        </MenuItem>

        <MenuItem onPress={() => handleMenuPress('My Recipes')}>
          <MenuIcon>
            <Ionicons name="restaurant-outline" size={20} color="#71717A" />
          </MenuIcon>
          <MenuText>My Recipes</MenuText>
          <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
        </MenuItem>

        <MenuItem onPress={() => handleMenuPress('Settings')}>
          <MenuIcon>
            <Ionicons name="settings-outline" size={20} color="#71717A" />
          </MenuIcon>
          <MenuText>Settings</MenuText>
          <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
        </MenuItem>

        <MenuItem onPress={() => handleMenuPress('Help & Support')}>
          <MenuIcon>
            <Ionicons name="help-circle-outline" size={20} color="#71717A" />
          </MenuIcon>
          <MenuText>Help & Support</MenuText>
          <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
        </MenuItem>

        <MenuItem onPress={() => handleMenuPress('About')}>
          <MenuIcon>
            <Ionicons name="information-circle-outline" size={20} color="#71717A" />
          </MenuIcon>
          <MenuText>About</MenuText>
          <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
        </MenuItem>
      </MenuContainer>

      <LogoutButton onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="white" />
        <LogoutButtonText>Sign Out</LogoutButtonText>
      </LogoutButton>
    </Container>
  );
}