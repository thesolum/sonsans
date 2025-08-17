import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import { RecipeDetailScreen } from '../screens/RecipeDetailScreen';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  MainTabs: undefined;
  RecipeDetail: { recipeId: string };
};

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="MainTabs" 
          component={TabNavigator}
          options={{
            title: 'Sonsans Recipe App',
          }}
        />
        <Stack.Screen 
          name="RecipeDetail" 
          component={RecipeDetailScreen}
          options={{
            title: 'Recipe Detail',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};