import { Recipe } from '../../types/navigation';

// Mock API service - in production, this would connect to Spoonacular or similar
export class RecipeAPIService {
  private static instance: RecipeAPIService;
  private baseURL = 'https://api.spoonacular.com/recipes';
  private apiKey = process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY || 'mock-api-key';

  static getInstance(): RecipeAPIService {
    if (!RecipeAPIService.instance) {
      RecipeAPIService.instance = new RecipeAPIService();
    }
    return RecipeAPIService.instance;
  }

  private mockRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Classic Spaghetti Carbonara',
      description: 'A traditional Italian pasta dish made with eggs, cheese, pancetta, and black pepper.',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
      ingredients: [
        '400g spaghetti',
        '200g pancetta or guanciale, diced',
        '4 large egg yolks',
        '1 whole egg',
        '100g Pecorino Romano cheese, grated',
        '50g Parmesan cheese, grated',
        'Freshly ground black pepper',
        'Salt for pasta water'
      ],
      instructions: [
        'Bring a large pot of salted water to boil for the pasta.',
        'In a large bowl, whisk together egg yolks, whole egg, and both cheeses.',
        'Cook pancetta in a large skillet over medium heat until crispy.',
        'Cook spaghetti according to package directions until al dente.',
        'Reserve 1 cup pasta cooking water, then drain pasta.',
        'Add hot pasta to the pan with pancetta and toss.',
        'Remove from heat and add egg mixture, tossing quickly.',
        'Add pasta water as needed to create a creamy sauce.',
        'Season with black pepper and serve immediately.'
      ],
      cookingTime: 30,
      difficulty: 'Medium',
      category: 'Italian',
      nutrition: {
        calories: 520,
        protein: 24,
        carbs: 65,
        fat: 18,
      }
    },
    {
      id: '2',
      title: 'Fresh Garden Salad',
      description: 'A light and refreshing salad with seasonal vegetables and homemade vinaigrette.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      ingredients: [
        '6 cups mixed greens (lettuce, spinach, arugula)',
        '2 medium tomatoes, chopped',
        '1 cucumber, sliced',
        '1/2 red onion, thinly sliced',
        '1/4 cup olive oil',
        '2 tbsp lemon juice',
        '1 tsp Dijon mustard',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Wash and dry all vegetables thoroughly.',
        'Chop tomatoes and slice cucumber and red onion.',
        'In a large bowl, combine mixed greens, tomatoes, cucumber, and onion.',
        'In a small bowl, whisk together olive oil, lemon juice, and Dijon mustard.',
        'Season dressing with salt and pepper.',
        'Drizzle dressing over salad and toss gently.',
        'Serve immediately for best freshness.'
      ],
      cookingTime: 15,
      difficulty: 'Easy',
      category: 'Healthy',
      nutrition: {
        calories: 120,
        protein: 3,
        carbs: 8,
        fat: 10,
      }
    },
    {
      id: '3',
      title: 'Chocolate Chip Cookies',
      description: 'Soft and chewy homemade cookies with perfect chocolate chips in every bite.',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop',
      ingredients: [
        '2 1/4 cups all-purpose flour',
        '1 tsp baking soda',
        '1 tsp salt',
        '1 cup butter, softened',
        '3/4 cup granulated sugar',
        '3/4 cup packed brown sugar',
        '2 large eggs',
        '2 tsp vanilla extract',
        '2 cups chocolate chips'
      ],
      instructions: [
        'Preheat oven to 375°F (190°C).',
        'Mix flour, baking soda, and salt in a bowl.',
        'In a large bowl, cream butter and both sugars until fluffy.',
        'Beat in eggs one at a time, then add vanilla.',
        'Gradually blend in flour mixture.',
        'Stir in chocolate chips.',
        'Drop rounded tablespoons of dough onto ungreased cookie sheets.',
        'Bake 9-11 minutes or until golden brown.',
        'Cool on baking sheet for 2 minutes before removing.'
      ],
      cookingTime: 45,
      difficulty: 'Easy',
      category: 'Dessert',
      nutrition: {
        calories: 180,
        protein: 2,
        carbs: 26,
        fat: 8,
      }
    },
    {
      id: '4',
      title: 'Vegetarian Stir Fry',
      description: 'Colorful and nutritious vegetable stir fry with a savory Asian-inspired sauce.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      ingredients: [
        '2 tbsp vegetable oil',
        '2 cloves garlic, minced',
        '1 inch fresh ginger, grated',
        '1 bell pepper, sliced',
        '1 zucchini, sliced',
        '1 cup snap peas',
        '1 carrot, julienned',
        '3 tbsp soy sauce',
        '1 tbsp sesame oil',
        '1 tsp cornstarch',
        '2 green onions, chopped',
        'Sesame seeds for garnish'
      ],
      instructions: [
        'Heat vegetable oil in a large wok or skillet over high heat.',
        'Add garlic and ginger, stir-fry for 30 seconds.',
        'Add bell pepper and carrot, stir-fry for 2 minutes.',
        'Add zucchini and snap peas, cook for 2 more minutes.',
        'Mix soy sauce, sesame oil, and cornstarch in a small bowl.',
        'Pour sauce over vegetables and toss to coat.',
        'Cook for 1 minute until sauce thickens.',
        'Garnish with green onions and sesame seeds.',
        'Serve immediately over rice or noodles.'
      ],
      cookingTime: 20,
      difficulty: 'Easy',
      category: 'Vegetarian',
      nutrition: {
        calories: 150,
        protein: 5,
        carbs: 12,
        fat: 10,
      }
    },
    {
      id: '5',
      title: 'Grilled Chicken Tacos',
      description: 'Flavorful grilled chicken tacos with fresh toppings and zesty lime crema.',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      ingredients: [
        '1 lb chicken breast, sliced',
        '2 tbsp olive oil',
        '2 tsp cumin',
        '2 tsp chili powder',
        '1 tsp paprika',
        '8 small tortillas',
        '1 cup shredded lettuce',
        '1 tomato, diced',
        '1/2 red onion, diced',
        '1/4 cup cilantro',
        '1 avocado, sliced',
        'Lime wedges for serving'
      ],
      instructions: [
        'Season chicken with olive oil, cumin, chili powder, and paprika.',
        'Heat grill pan over medium-high heat.',
        'Grill chicken for 6-7 minutes per side until cooked through.',
        'Let chicken rest, then slice into strips.',
        'Warm tortillas in a dry pan or microwave.',
        'Fill tortillas with chicken, lettuce, tomato, and onion.',
        'Top with cilantro and avocado slices.',
        'Serve with lime wedges.'
      ],
      cookingTime: 25,
      difficulty: 'Medium',
      category: 'Mexican',
      nutrition: {
        calories: 320,
        protein: 28,
        carbs: 25,
        fat: 14,
      }
    }
  ];

  // Simulate API delay
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getRecipes(page = 1, limit = 10): Promise<{ recipes: Recipe[]; totalCount: number }> {
    await this.delay(800); // Simulate network delay
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const recipes = this.mockRecipes.slice(startIndex, endIndex);
    
    return {
      recipes,
      totalCount: this.mockRecipes.length
    };
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    await this.delay(500);
    return this.mockRecipes.find(recipe => recipe.id === id) || null;
  }

  async searchRecipes(query: string, filters?: {
    category?: string;
    difficulty?: string;
    maxCookingTime?: number;
  }): Promise<Recipe[]> {
    await this.delay(600);
    
    let results = this.mockRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase()) ||
      recipe.category.toLowerCase().includes(query.toLowerCase())
    );

    if (filters) {
      if (filters.category && filters.category !== 'All') {
        results = results.filter(recipe =>
          recipe.category.toLowerCase() === filters.category!.toLowerCase()
        );
      }
      
      if (filters.difficulty) {
        results = results.filter(recipe =>
          recipe.difficulty === filters.difficulty
        );
      }
      
      if (filters.maxCookingTime) {
        results = results.filter(recipe =>
          recipe.cookingTime <= filters.maxCookingTime!
        );
      }
    }

    return results;
  }

  async getRecipesByCategory(category: string): Promise<Recipe[]> {
    await this.delay(500);
    
    if (category === 'All') {
      return this.mockRecipes;
    }
    
    return this.mockRecipes.filter(recipe =>
      recipe.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getRandomRecipes(count = 5): Promise<Recipe[]> {
    await this.delay(400);
    
    const shuffled = [...this.mockRecipes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}

export const recipeAPI = RecipeAPIService.getInstance();