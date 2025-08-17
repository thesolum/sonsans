import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recipeAPI } from '../api/recipeApi';
import { Recipe } from '../../types/navigation';

// Query keys
export const RECIPE_KEYS = {
  all: ['recipes'] as const,
  lists: () => [...RECIPE_KEYS.all, 'list'] as const,
  list: (filters: string) => [...RECIPE_KEYS.lists(), { filters }] as const,
  details: () => [...RECIPE_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...RECIPE_KEYS.details(), id] as const,
  search: (query: string, filters?: any) => [...RECIPE_KEYS.all, 'search', query, filters] as const,
  random: () => [...RECIPE_KEYS.all, 'random'] as const,
  category: (category: string) => [...RECIPE_KEYS.all, 'category', category] as const,
};

// Hook for fetching recipes with pagination
export function useRecipes(page = 1, limit = 10) {
  return useQuery({
    queryKey: RECIPE_KEYS.list(`page-${page}-limit-${limit}`),
    queryFn: () => recipeAPI.getRecipes(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
  });
}

// Hook for infinite scroll recipes
export function useInfiniteRecipes(limit = 10) {
  return useInfiniteQuery({
    queryKey: RECIPE_KEYS.list(`infinite-${limit}`),
    queryFn: ({ pageParam = 1 }) => recipeAPI.getRecipes(pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(lastPage.totalCount / limit);
      return pages.length < totalPages ? pages.length + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Hook for fetching a single recipe by ID
export function useRecipe(id: string) {
  return useQuery({
    queryKey: RECIPE_KEYS.detail(id),
    queryFn: () => recipeAPI.getRecipeById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Hook for searching recipes
export function useSearchRecipes(
  query: string,
  filters?: {
    category?: string;
    difficulty?: string;
    maxCookingTime?: number;
  }
) {
  return useQuery({
    queryKey: RECIPE_KEYS.search(query, filters),
    queryFn: () => recipeAPI.searchRecipes(query, filters),
    enabled: !!query.trim(),
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for fetching recipes by category
export function useRecipesByCategory(category: string) {
  return useQuery({
    queryKey: RECIPE_KEYS.category(category),
    queryFn: () => recipeAPI.getRecipesByCategory(category),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Hook for fetching random recipes
export function useRandomRecipes(count = 5) {
  return useQuery({
    queryKey: RECIPE_KEYS.random(),
    queryFn: () => recipeAPI.getRandomRecipes(count),
    staleTime: 1 * 60 * 1000, // 1 minute for random recipes
    gcTime: 5 * 60 * 1000,
  });
}

// Hook for prefetching a recipe (useful for recipe cards)
export function usePrefetchRecipe() {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: RECIPE_KEYS.detail(id),
      queryFn: () => recipeAPI.getRecipeById(id),
      staleTime: 10 * 60 * 1000,
    });
  };
}

// Mutation for adding to favorites (placeholder - would integrate with backend)
export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ recipeId, isFavorite }: { recipeId: string; isFavorite: boolean }) => {
      // TODO: Implement actual API call to toggle favorite
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      return { recipeId, isFavorite: !isFavorite };
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
}