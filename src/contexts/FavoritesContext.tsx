import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { favoritesStorage } from '../utils/storage';

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (recipeId: string) => boolean;
  addFavorite: (recipeId: string) => Promise<void>;
  removeFavorite: (recipeId: string) => Promise<void>;
  toggleFavorite: (recipeId: string) => Promise<boolean>;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setIsLoading(true);
      const storedFavorites = await favoritesStorage.getFavorites();
      setFavorites(storedFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFavorite = (recipeId: string): boolean => {
    return favorites.includes(recipeId);
  };

  const addFavorite = async (recipeId: string): Promise<void> => {
    try {
      await favoritesStorage.addFavorite(recipeId);
      setFavorites(prev => prev.includes(recipeId) ? prev : [...prev, recipeId]);
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  };

  const removeFavorite = async (recipeId: string): Promise<void> => {
    try {
      await favoritesStorage.removeFavorite(recipeId);
      setFavorites(prev => prev.filter(id => id !== recipeId));
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  };

  const toggleFavorite = async (recipeId: string): Promise<boolean> => {
    try {
      const isFav = isFavorite(recipeId);
      if (isFav) {
        await removeFavorite(recipeId);
        return false;
      } else {
        await addFavorite(recipeId);
        return true;
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  };

  const value: FavoritesContextType = {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isLoading,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};