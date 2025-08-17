import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { mockRecipeApi } from '../services/mockRecipeApi';
import { Recipe, RecipeFilters } from '../types/recipe';

// Hook for fetching paginated recipes with infinite scroll
export const useRecipes = (filters?: RecipeFilters, limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['recipes', filters],
    queryFn: ({ pageParam = 1 }) => mockRecipeApi.getRecipes(pageParam, limit, filters),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};

// Hook for searching recipes
export const useSearchRecipes = (query: string, limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['searchRecipes', query],
    queryFn: ({ pageParam = 1 }) => mockRecipeApi.searchRecipes(query, pageParam, limit),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    enabled: query.length > 0, // Only run query if there's a search term
  });
};

// Hook for fetching a single recipe
export const useRecipe = (id: string) => {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => mockRecipeApi.getRecipe(id),
    enabled: !!id,
  });
};