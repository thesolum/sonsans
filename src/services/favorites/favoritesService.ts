import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../../types/navigation';

const FAVORITES_KEY = '@favorites';
const FAVORITE_RECIPE_IDS_KEY = '@favorite_recipe_ids';

export class FavoritesService {
  private static instance: FavoritesService;

  static getInstance(): FavoritesService {
    if (!FavoritesService.instance) {
      FavoritesService.instance = new FavoritesService();
    }
    return FavoritesService.instance;
  }

  // Get all favorite recipe IDs
  async getFavoriteIds(): Promise<string[]> {
    try {
      const favoriteIds = await AsyncStorage.getItem(FAVORITE_RECIPE_IDS_KEY);
      return favoriteIds ? JSON.parse(favoriteIds) : [];
    } catch (error) {
      console.error('Error getting favorite IDs:', error);
      return [];
    }
  }

  // Check if a recipe is favorited
  async isFavorite(recipeId: string): Promise<boolean> {
    try {
      const favoriteIds = await this.getFavoriteIds();
      return favoriteIds.includes(recipeId);
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }

  // Add a recipe to favorites
  async addToFavorites(recipe: Recipe): Promise<void> {
    try {
      const favoriteIds = await this.getFavoriteIds();
      const favoritesData = await this.getFavoriteRecipes();

      if (!favoriteIds.includes(recipe.id)) {
        // Add to ID list
        const newFavoriteIds = [...favoriteIds, recipe.id];
        await AsyncStorage.setItem(FAVORITE_RECIPE_IDS_KEY, JSON.stringify(newFavoriteIds));

        // Add full recipe data
        const newFavoritesData = [...favoritesData, recipe];
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavoritesData));
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw new Error('Failed to add recipe to favorites');
    }
  }

  // Remove a recipe from favorites
  async removeFromFavorites(recipeId: string): Promise<void> {
    try {
      const favoriteIds = await this.getFavoriteIds();
      const favoritesData = await this.getFavoriteRecipes();

      // Remove from ID list
      const newFavoriteIds = favoriteIds.filter(id => id !== recipeId);
      await AsyncStorage.setItem(FAVORITE_RECIPE_IDS_KEY, JSON.stringify(newFavoriteIds));

      // Remove from recipe data
      const newFavoritesData = favoritesData.filter(recipe => recipe.id !== recipeId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavoritesData));
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw new Error('Failed to remove recipe from favorites');
    }
  }

  // Toggle favorite status
  async toggleFavorite(recipe: Recipe): Promise<boolean> {
    try {
      const isCurrentlyFavorite = await this.isFavorite(recipe.id);
      
      if (isCurrentlyFavorite) {
        await this.removeFromFavorites(recipe.id);
        return false;
      } else {
        await this.addToFavorites(recipe);
        return true;
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw new Error('Failed to toggle favorite status');
    }
  }

  // Get all favorite recipes
  async getFavoriteRecipes(): Promise<Recipe[]> {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorite recipes:', error);
      return [];
    }
  }

  // Get favorite count
  async getFavoriteCount(): Promise<number> {
    try {
      const favoriteIds = await this.getFavoriteIds();
      return favoriteIds.length;
    } catch (error) {
      console.error('Error getting favorite count:', error);
      return 0;
    }
  }

  // Clear all favorites (useful for logout)
  async clearFavorites(): Promise<void> {
    try {
      await AsyncStorage.removeItem(FAVORITES_KEY);
      await AsyncStorage.removeItem(FAVORITE_RECIPE_IDS_KEY);
    } catch (error) {
      console.error('Error clearing favorites:', error);
      throw new Error('Failed to clear favorites');
    }
  }

  // Sync favorites with cloud (placeholder for future implementation)
  async syncWithCloud(userId: string): Promise<void> {
    try {
      // TODO: Implement cloud sync with Supabase or chosen backend
      console.log('Syncing favorites with cloud for user:', userId);
      
      // For now, just log the operation
      const favorites = await this.getFavoriteRecipes();
      console.log('Local favorites to sync:', favorites.length);
    } catch (error) {
      console.error('Error syncing favorites with cloud:', error);
    }
  }
}

export const favoritesService = FavoritesService.getInstance();