import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useTheme } from '../theme/ThemeProvider';
import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
  Profile: undefined;
};

const TabLabel = styled.Text<{ focused: boolean }>`
  font-size: ${(props) => props.theme.typography.fontSize.caption.fontSize}px;
  font-weight: ${(props) => 
    props.focused 
      ? props.theme.typography.fontWeight.semiBold 
      : props.theme.typography.fontWeight.regular
  };
  color: ${(props) => 
    props.focused 
      ? props.theme.colors.primary[600] 
      : props.theme.colors.text.muted
  };
  margin-top: 4px;
`;

export const TabNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Search':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Favorites':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'home-outline';
          }

          return (
            <Ionicons 
              name={iconName} 
              size={size} 
              color={focused ? theme.colors.primary[600] : theme.colors.text.muted} 
            />
          );
        },
        tabBarLabel: ({ focused, children }) => (
          <TabLabel focused={focused}>
            {children}
          </TabLabel>
        ),
        tabBarActiveTintColor: theme.colors.primary[600],
        tabBarInactiveTintColor: theme.colors.text.muted,
        tabBarStyle: {
          backgroundColor: theme.colors.background.primary,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border.primary,
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
          shadowColor: theme.colors.neutral[900],
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.fontSize.caption.fontSize,
          fontWeight: theme.typography.fontWeight.medium,
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{
          title: 'Search',
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};