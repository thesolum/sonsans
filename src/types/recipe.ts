export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: number; // in minutes
  prepTime: number; // in minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string[];
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutrition?: Nutrition;
  rating?: number;
  reviewCount?: number;
  author?: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  isFavorite?: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

export interface Instruction {
  id: string;
  step: number;
  description: string;
  duration?: number; // in minutes
  image?: string;
}

export interface Nutrition {
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber?: number; // in grams
  sugar?: number; // in grams
}

export interface RecipeFilters {
  category?: string[];
  difficulty?: string[];
  maxCookTime?: number;
  minRating?: number;
  dietary?: string[]; // vegetarian, vegan, gluten-free, etc.
}

export interface PaginatedRecipes {
  recipes: Recipe[];
  totalCount: number;
  hasMore: boolean;
  nextPage?: number;
}