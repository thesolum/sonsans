import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoritesService } from '../favorites/favoritesService';
import { Recipe } from '../../types/navigation';

// Query keys for favorites
export const FAVORITES_KEYS = {
  all: ['favorites'] as const,
  recipes: () => [...FAVORITES_KEYS.all, 'recipes'] as const,
  ids: () => [...FAVORITES_KEYS.all, 'ids'] as const,
  count: () => [...FAVORITES_KEYS.all, 'count'] as const,
  status: (id: string) => [...FAVORITES_KEYS.all, 'status', id] as const,
};

// Hook for getting all favorite recipes
export function useFavoriteRecipes() {
  return useQuery({
    queryKey: FAVORITES_KEYS.recipes(),
    queryFn: () => favoritesService.getFavoriteRecipes(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for getting favorite recipe IDs
export function useFavoriteIds() {
  return useQuery({
    queryKey: FAVORITES_KEYS.ids(),
    queryFn: () => favoritesService.getFavoriteIds(),
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Hook for checking if a recipe is favorited
export function useIsFavorite(recipeId: string) {
  return useQuery({
    queryKey: FAVORITES_KEYS.status(recipeId),
    queryFn: () => favoritesService.isFavorite(recipeId),
    enabled: !!recipeId,
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000,
  });
}

// Hook for getting favorite count
export function useFavoriteCount() {
  return useQuery({
    queryKey: FAVORITES_KEYS.count(),
    queryFn: () => favoritesService.getFavoriteCount(),
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Hook for toggling favorite status
export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipe: Recipe) => favoritesService.toggleFavorite(recipe),
    onMutate: async (recipe: Recipe) => {
      // Cancel outgoing queries to prevent conflicts
      await queryClient.cancelQueries({ queryKey: FAVORITES_KEYS.status(recipe.id) });
      await queryClient.cancelQueries({ queryKey: FAVORITES_KEYS.recipes() });
      await queryClient.cancelQueries({ queryKey: FAVORITES_KEYS.ids() });
      await queryClient.cancelQueries({ queryKey: FAVORITES_KEYS.count() });

      // Get current favorite status
      const previousStatus = queryClient.getQueryData(FAVORITES_KEYS.status(recipe.id)) ?? false;
      const previousRecipes = queryClient.getQueryData(FAVORITES_KEYS.recipes()) ?? [];
      const previousIds = queryClient.getQueryData(FAVORITES_KEYS.ids()) ?? [];
      const previousCount = queryClient.getQueryData(FAVORITES_KEYS.count()) ?? 0;

      // Optimistically update
      const newStatus = !previousStatus;
      queryClient.setQueryData(FAVORITES_KEYS.status(recipe.id), newStatus);

      if (newStatus) {
        // Adding to favorites
        queryClient.setQueryData(FAVORITES_KEYS.recipes(), (old: Recipe[] = []) => [...old, recipe]);
        queryClient.setQueryData(FAVORITES_KEYS.ids(), (old: string[] = []) => [...old, recipe.id]);
        queryClient.setQueryData(FAVORITES_KEYS.count(), (old: number = 0) => old + 1);
      } else {
        // Removing from favorites
        queryClient.setQueryData(FAVORITES_KEYS.recipes(), (old: Recipe[] = []) => 
          old.filter(r => r.id !== recipe.id)
        );
        queryClient.setQueryData(FAVORITES_KEYS.ids(), (old: string[] = []) => 
          old.filter(id => id !== recipe.id)
        );
        queryClient.setQueryData(FAVORITES_KEYS.count(), (old: number = 0) => Math.max(0, old - 1));
      }

      // Return context for rollback
      return {
        previousStatus,
        previousRecipes,
        previousIds,
        previousCount,
        recipe,
      };
    },
    onError: (error, recipe, context) => {
      // Rollback optimistic updates on error
      if (context) {
        queryClient.setQueryData(FAVORITES_KEYS.status(recipe.id), context.previousStatus);
        queryClient.setQueryData(FAVORITES_KEYS.recipes(), context.previousRecipes);
        queryClient.setQueryData(FAVORITES_KEYS.ids(), context.previousIds);
        queryClient.setQueryData(FAVORITES_KEYS.count(), context.previousCount);
      }
    },
    onSettled: (data, error, recipe) => {
      // Always refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: FAVORITES_KEYS.status(recipe.id) });
      queryClient.invalidateQueries({ queryKey: FAVORITES_KEYS.recipes() });
      queryClient.invalidateQueries({ queryKey: FAVORITES_KEYS.ids() });
      queryClient.invalidateQueries({ queryKey: FAVORITES_KEYS.count() });
    },
  });
}

// Hook for adding to favorites
export function useAddToFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipe: Recipe) => favoritesService.addToFavorites(recipe),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_KEYS.all });
    },
  });
}

// Hook for removing from favorites
export function useRemoveFromFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeId: string) => favoritesService.removeFromFavorites(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_KEYS.all });
    },
  });
}

// Hook for clearing all favorites
export function useClearFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => favoritesService.clearFavorites(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_KEYS.all });
    },
  });
}