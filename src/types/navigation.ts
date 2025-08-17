export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Filter: undefined;
};

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Upload: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  RecipeDetail: { recipeId: string };
};

// Recipe types
export type Recipe = {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
};

// User types
export type User = {
  id: string;
  email: string;
  username?: string;
  avatar?: string;
  favoriteRecipes: string[];
};