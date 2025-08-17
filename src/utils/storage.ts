import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  FAVORITES: 'favorites',
  USER_PREFERENCES: 'user_preferences',
  CACHED_RECIPES: 'cached_recipes',
  LAST_CACHE_UPDATE: 'last_cache_update',
} as const;

// Favorites storage
export const favoritesStorage = {
  // Get all favorite recipe IDs
  getFavorites: async (): Promise<string[]> => {
    try {
      const favorites = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  // Add recipe to favorites
  addFavorite: async (recipeId: string): Promise<void> => {
    try {
      const favorites = await favoritesStorage.getFavorites();
      if (!favorites.includes(recipeId)) {
        const updatedFavorites = [...favorites, recipeId];
        await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  },

  // Remove recipe from favorites
  removeFavorite: async (recipeId: string): Promise<void> => {
    try {
      const favorites = await favoritesStorage.getFavorites();
      const updatedFavorites = favorites.filter(id => id !== recipeId);
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  },

  // Check if recipe is favorited
  isFavorite: async (recipeId: string): Promise<boolean> => {
    try {
      const favorites = await favoritesStorage.getFavorites();
      return favorites.includes(recipeId);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  },

  // Toggle favorite status
  toggleFavorite: async (recipeId: string): Promise<boolean> => {
    try {
      const isFav = await favoritesStorage.isFavorite(recipeId);
      if (isFav) {
        await favoritesStorage.removeFavorite(recipeId);
        return false;
      } else {
        await favoritesStorage.addFavorite(recipeId);
        return true;
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  },
};

// Recipe caching for offline access
export const recipeCache = {
  // Cache a recipe
  cacheRecipe: async (recipe: any): Promise<void> => {
    try {
      const cached = await recipeCache.getCachedRecipes();
      const updatedCache = {
        ...cached,
        [recipe.id]: {
          ...recipe,
          cachedAt: new Date().toISOString(),
        },
      };
      await AsyncStorage.setItem(STORAGE_KEYS.CACHED_RECIPES, JSON.stringify(updatedCache));
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_CACHE_UPDATE, new Date().toISOString());
    } catch (error) {
      console.error('Error caching recipe:', error);
    }
  },

  // Get all cached recipes
  getCachedRecipes: async (): Promise<{ [key: string]: any }> => {
    try {
      const cached = await AsyncStorage.getItem(STORAGE_KEYS.CACHED_RECIPES);
      return cached ? JSON.parse(cached) : {};
    } catch (error) {
      console.error('Error getting cached recipes:', error);
      return {};
    }
  },

  // Get a specific cached recipe
  getCachedRecipe: async (recipeId: string): Promise<any | null> => {
    try {
      const cached = await recipeCache.getCachedRecipes();
      return cached[recipeId] || null;
    } catch (error) {
      console.error('Error getting cached recipe:', error);
      return null;
    }
  },

  // Clear old cache entries (older than 7 days)
  clearOldCache: async (): Promise<void> => {
    try {
      const cached = await recipeCache.getCachedRecipes();
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      
      const freshCache = Object.keys(cached).reduce((acc, key) => {
        const recipe = cached[key];
        if (recipe.cachedAt && new Date(recipe.cachedAt) > sevenDaysAgo) {
          acc[key] = recipe;
        }
        return acc;
      }, {} as { [key: string]: any });

      await AsyncStorage.setItem(STORAGE_KEYS.CACHED_RECIPES, JSON.stringify(freshCache));
    } catch (error) {
      console.error('Error clearing old cache:', error);
    }
  },
};

// User preferences storage
export const userPreferences = {
  // Get user preferences
  getPreferences: async (): Promise<any> => {
    try {
      const prefs = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      return prefs ? JSON.parse(prefs) : {
        theme: 'light',
        notifications: true,
        units: 'metric',
      };
    } catch (error) {
      console.error('Error getting preferences:', error);
      return {
        theme: 'light',
        notifications: true,
        units: 'metric',
      };
    }
  },

  // Save user preferences
  savePreferences: async (preferences: any): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  },
};

// Clear all stored data
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
};