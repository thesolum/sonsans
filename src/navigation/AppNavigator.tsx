import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../services/auth/AuthContext';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import FilterScreen from '../screens/FilterScreen';
import LoadingScreen from '../screens/LoadingScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Main" component={MainNavigator} />
          <Stack.Screen 
            name="Filter" 
            component={FilterScreen}
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}