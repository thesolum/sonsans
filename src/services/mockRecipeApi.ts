import { Recipe, PaginatedRecipes, RecipeFilters } from '../types/recipe';

// Mock recipe data
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Pasta Carbonara',
    description: 'A traditional Italian pasta dish with eggs, cheese, pancetta, and black pepper. Simple yet elegant comfort food.',
    image: 'https://picsum.photos/400/300?random=1',
    cookTime: 20,
    prepTime: 10,
    servings: 4,
    difficulty: 'Medium',
    category: ['Italian', 'Pasta', 'Dinner'],
    rating: 4.8,
    reviewCount: 142,
    author: {
      id: 'chef1',
      name: 'Maria Rossi',
      avatar: 'https://picsum.photos/100/100?random=101',
    },
    createdAt: '2024-01-15T10:30:00Z',
    ingredients: [
      { id: '1', name: 'Spaghetti', amount: 400, unit: 'g' },
      { id: '2', name: 'Pancetta', amount: 150, unit: 'g' },
      { id: '3', name: 'Large eggs', amount: 3, unit: 'pieces' },
      { id: '4', name: 'Parmesan cheese', amount: 100, unit: 'g', notes: 'freshly grated' },
      { id: '5', name: 'Black pepper', amount: 1, unit: 'tsp', notes: 'freshly ground' },
    ],
    instructions: [
      { id: '1', step: 1, description: 'Bring a large pot of salted water to boil. Cook spaghetti according to package directions until al dente.' },
      { id: '2', step: 2, description: 'Meanwhile, cook pancetta in a large skillet over medium heat until crispy, about 5 minutes.' },
      { id: '3', step: 3, description: 'In a bowl, whisk together eggs, Parmesan, and black pepper.' },
      { id: '4', step: 4, description: 'Reserve 1 cup pasta water, then drain spaghetti and add to skillet with pancetta.' },
      { id: '5', step: 5, description: 'Remove from heat and quickly stir in egg mixture, adding pasta water as needed to create a creamy sauce.' },
    ],
    nutrition: {
      calories: 520,
      protein: 22,
      carbs: 65,
      fat: 18,
      fiber: 3,
    },
  },
  {
    id: '2',
    title: 'Chicken Tikka Masala',
    description: 'Tender chunks of roasted chicken in a creamy, spiced tomato sauce. A beloved Indian-inspired dish perfect for dinner.',
    image: 'https://picsum.photos/400/300?random=2',
    cookTime: 45,
    prepTime: 30,
    servings: 6,
    difficulty: 'Medium',
    category: ['Indian', 'Chicken', 'Dinner', 'Curry'],
    rating: 4.6,
    reviewCount: 89,
    author: {
      id: 'chef2',
      name: 'Raj Patel',
      avatar: 'https://picsum.photos/100/100?random=102',
    },
    createdAt: '2024-01-10T14:20:00Z',
    ingredients: [
      { id: '1', name: 'Chicken breast', amount: 800, unit: 'g', notes: 'cut into chunks' },
      { id: '2', name: 'Greek yogurt', amount: 200, unit: 'ml' },
      { id: '3', name: 'Garam masala', amount: 2, unit: 'tsp' },
      { id: '4', name: 'Onion', amount: 1, unit: 'large', notes: 'diced' },
      { id: '5', name: 'Crushed tomatoes', amount: 400, unit: 'g' },
      { id: '6', name: 'Heavy cream', amount: 200, unit: 'ml' },
    ],
    instructions: [
      { id: '1', step: 1, description: 'Marinate chicken in yogurt and spices for at least 30 minutes.' },
      { id: '2', step: 2, description: 'Cook marinated chicken in a hot pan until browned and cooked through.' },
      { id: '3', step: 3, description: 'In the same pan, sauté onions until golden.' },
      { id: '4', step: 4, description: 'Add crushed tomatoes and simmer for 10 minutes.' },
      { id: '5', step: 5, description: 'Return chicken to pan, add cream, and simmer until heated through.' },
    ],
    nutrition: {
      calories: 380,
      protein: 35,
      carbs: 12,
      fat: 22,
      fiber: 2,
    },
  },
  {
    id: '3',
    title: 'Chocolate Chip Cookies',
    description: 'Classic homemade cookies with perfectly melted chocolate chips. Crispy edges with a soft, chewy center.',
    image: 'https://picsum.photos/400/300?random=3',
    cookTime: 12,
    prepTime: 15,
    servings: 24,
    difficulty: 'Easy',
    category: ['Dessert', 'Cookies', 'Baking'],
    rating: 4.9,
    reviewCount: 256,
    author: {
      id: 'chef3',
      name: 'Sarah Johnson',
      avatar: 'https://picsum.photos/100/100?random=103',
    },
    createdAt: '2024-01-08T09:15:00Z',
    ingredients: [
      { id: '1', name: 'All-purpose flour', amount: 225, unit: 'g' },
      { id: '2', name: 'Butter', amount: 115, unit: 'g', notes: 'softened' },
      { id: '3', name: 'Brown sugar', amount: 110, unit: 'g' },
      { id: '4', name: 'Granulated sugar', amount: 50, unit: 'g' },
      { id: '5', name: 'Large egg', amount: 1, unit: 'piece' },
      { id: '6', name: 'Chocolate chips', amount: 175, unit: 'g' },
    ],
    instructions: [
      { id: '1', step: 1, description: 'Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.' },
      { id: '2', step: 2, description: 'Cream butter and sugars until light and fluffy.' },
      { id: '3', step: 3, description: 'Beat in egg and vanilla extract.' },
      { id: '4', step: 4, description: 'Gradually mix in flour until just combined.' },
      { id: '5', step: 5, description: 'Fold in chocolate chips. Drop rounded spoonfuls onto baking sheets.' },
      { id: '6', step: 6, description: 'Bake for 9-12 minutes until golden brown around edges.' },
    ],
    nutrition: {
      calories: 145,
      protein: 2,
      carbs: 20,
      fat: 7,
      fiber: 1,
      sugar: 12,
    },
  },
  {
    id: '4',
    title: 'Mediterranean Quinoa Salad',
    description: 'Fresh and healthy salad with quinoa, vegetables, feta cheese, and a zesty lemon dressing.',
    image: 'https://picsum.photos/400/300?random=4',
    cookTime: 15,
    prepTime: 20,
    servings: 4,
    difficulty: 'Easy',
    category: ['Salad', 'Healthy', 'Mediterranean', 'Vegetarian'],
    rating: 4.4,
    reviewCount: 67,
    author: {
      id: 'chef4',
      name: 'Elena Kostas',
      avatar: 'https://picsum.photos/100/100?random=104',
    },
    createdAt: '2024-01-05T16:45:00Z',
    ingredients: [
      { id: '1', name: 'Quinoa', amount: 200, unit: 'g' },
      { id: '2', name: 'Cherry tomatoes', amount: 200, unit: 'g', notes: 'halved' },
      { id: '3', name: 'Cucumber', amount: 1, unit: 'large', notes: 'diced' },
      { id: '4', name: 'Red onion', amount: 0.5, unit: 'piece', notes: 'thinly sliced' },
      { id: '5', name: 'Feta cheese', amount: 150, unit: 'g', notes: 'crumbled' },
      { id: '6', name: 'Olive oil', amount: 4, unit: 'tbsp' },
      { id: '7', name: 'Lemon juice', amount: 2, unit: 'tbsp', notes: 'fresh' },
    ],
    instructions: [
      { id: '1', step: 1, description: 'Cook quinoa according to package directions. Let cool completely.' },
      { id: '2', step: 2, description: 'Chop all vegetables and place in a large bowl.' },
      { id: '3', step: 3, description: 'Add cooled quinoa to the bowl with vegetables.' },
      { id: '4', step: 4, description: 'Whisk together olive oil, lemon juice, salt, and pepper for dressing.' },
      { id: '5', step: 5, description: 'Pour dressing over salad and toss to combine. Top with crumbled feta.' },
    ],
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 35,
      fat: 16,
      fiber: 5,
    },
  },
  {
    id: '5',
    title: 'Beef Stir Fry',
    description: 'Quick and flavorful beef stir fry with fresh vegetables in a savory sauce. Perfect weeknight dinner.',
    image: 'https://picsum.photos/400/300?random=5',
    cookTime: 15,
    prepTime: 20,
    servings: 4,
    difficulty: 'Easy',
    category: ['Asian', 'Beef', 'Stir Fry', 'Quick & Easy'],
    rating: 4.5,
    reviewCount: 98,
    author: {
      id: 'chef5',
      name: 'Chen Wei',
      avatar: 'https://picsum.photos/100/100?random=105',
    },
    createdAt: '2024-01-03T12:30:00Z',
    ingredients: [
      { id: '1', name: 'Beef sirloin', amount: 500, unit: 'g', notes: 'sliced thin' },
      { id: '2', name: 'Bell peppers', amount: 2, unit: 'pieces', notes: 'mixed colors' },
      { id: '3', name: 'Broccoli', amount: 300, unit: 'g' },
      { id: '4', name: 'Soy sauce', amount: 3, unit: 'tbsp' },
      { id: '5', name: 'Garlic', amount: 3, unit: 'cloves', notes: 'minced' },
      { id: '6', name: 'Ginger', amount: 1, unit: 'tbsp', notes: 'fresh, minced' },
    ],
    instructions: [
      { id: '1', step: 1, description: 'Heat oil in a large wok or skillet over high heat.' },
      { id: '2', step: 2, description: 'Add beef and stir-fry until browned, about 3-4 minutes.' },
      { id: '3', step: 3, description: 'Add garlic and ginger, stir for 30 seconds.' },
      { id: '4', step: 4, description: 'Add vegetables and stir-fry until crisp-tender.' },
      { id: '5', step: 5, description: 'Add soy sauce and other seasonings, toss to combine.' },
    ],
    nutrition: {
      calories: 280,
      protein: 28,
      carbs: 12,
      fat: 14,
      fiber: 4,
    },
  },
];

// Mock API functions
export const mockRecipeApi = {
  // Get paginated recipes
  getRecipes: async (page: number = 1, limit: number = 10, filters?: RecipeFilters): Promise<PaginatedRecipes> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredRecipes = [...mockRecipes];
    
    // Apply filters
    if (filters?.category && filters.category.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.category.some(cat => filters.category?.includes(cat))
      );
    }
    
    if (filters?.difficulty && filters.difficulty.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        filters.difficulty?.includes(recipe.difficulty)
      );
    }
    
    if (filters?.maxCookTime) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.cookTime <= filters.maxCookTime!
      );
    }
    
    if (filters?.minRating) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        (recipe.rating || 0) >= filters.minRating!
      );
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);
    
    return {
      recipes: paginatedRecipes,
      totalCount: filteredRecipes.length,
      hasMore: endIndex < filteredRecipes.length,
      nextPage: endIndex < filteredRecipes.length ? page + 1 : undefined,
    };
  },
  
  // Get single recipe by ID
  getRecipe: async (id: string): Promise<Recipe | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const recipe = mockRecipes.find(r => r.id === id);
    return recipe || null;
  },
  
  // Search recipes
  searchRecipes: async (query: string, page: number = 1, limit: number = 10): Promise<PaginatedRecipes> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const filteredRecipes = mockRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase()) ||
      recipe.category.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
    );
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);
    
    return {
      recipes: paginatedRecipes,
      totalCount: filteredRecipes.length,
      hasMore: endIndex < filteredRecipes.length,
      nextPage: endIndex < filteredRecipes.length ? page + 1 : undefined,
    };
  },
};