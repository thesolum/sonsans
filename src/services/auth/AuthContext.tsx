import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../types/navigation';
import { favoritesService } from '../favorites/favoritesService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username?: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // TODO: Implement actual authentication with Supabase
      // For now, create a mock user
      const mockUser: User = {
        id: '1',
        email,
        username: email.split('@')[0],
        favoriteRecipes: [],
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Sign in error:', error);
      throw new Error('Failed to sign in. Please try again.');
    }
  };

  const signUp = async (email: string, password: string, username?: string) => {
    try {
      // TODO: Implement actual authentication with Supabase
      // For now, create a mock user
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        username: username || email.split('@')[0],
        favoriteRecipes: [],
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Sign up error:', error);
      throw new Error('Failed to sign up. Please try again.');
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      // Clear favorites when signing out for privacy
      await favoritesService.clearFavorites();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      // TODO: Implement Google OAuth
      throw new Error('Google sign-in not implemented yet');
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!user) throw new Error('No user signed in');
      
      const updatedUser = { ...user, ...updates };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Update profile error:', error);
      throw new Error('Failed to update profile. Please try again.');
    }
  };

  const refreshUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        
        // Sync favorites with cloud when refreshing
        if (userData.id) {
          await favoritesService.syncWithCloud(userData.id);
        }
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    updateProfile,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}