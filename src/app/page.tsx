import RecipeCard from '@/components/recipe/RecipeCard'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Recipe } from '@/types'

// Mock data for demonstration
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Vanilla Bean Ice Cream',
    description: 'Creamy vanilla ice cream with real vanilla bean specks',
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    ingredients: [
      { name: 'Heavy cream', quantity: '2', unit: 'cups' },
      { name: 'Whole milk', quantity: '1', unit: 'cup' },
      { name: 'Sugar', quantity: '3/4', unit: 'cup' },
      { name: 'Vanilla bean', quantity: '1', unit: 'whole' },
    ],
    instructions: [
      'Mix all ingredients together',
      'Pour into CREAMi container',
      'Freeze for 24 hours',
      'Process on Ice Cream setting',
    ],
    images: [],
    creamiProgram: 'Ice Cream',
    prepTime: 10,
    freezeTime: 1440,
    difficulty: 'easy',
    servings: 4,
    tags: ['classic', 'vanilla'],
    category: 'Classic',
    visibility: 'public',
    views: 1234,
    likesCount: 89,
    savesCount: 45,
    sharesCount: 12,
    commentsCount: 23,
    averageRating: 4.5,
    calories: 280,
    protein: 3,
    carbs: 32,
    fat: 15,
    sugar: 28,
    user: {
      id: '1',
      name: 'Sarah Johnson',
      email: null,
      image: null,
      username: 'sarahcreams',
      bio: null,
      location: null,
      theme: 'light',
      measurementUnit: 'imperial',
      dietaryPrefs: [],
      points: 0,
      level: 1,
    },
  },
  {
    id: '2',
    title: 'Strawberry Sorbet',
    description: 'Refreshing and fruity strawberry sorbet',
    userId: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
    ingredients: [
      { name: 'Frozen strawberries', quantity: '3', unit: 'cups' },
      { name: 'Sugar', quantity: '1/2', unit: 'cup' },
      { name: 'Lemon juice', quantity: '2', unit: 'tbsp' },
    ],
    instructions: [
      'Blend strawberries with sugar and lemon juice',
      'Pour into CREAMi container',
      'Freeze for 24 hours',
      'Process on Sorbet setting',
    ],
    images: [],
    creamiProgram: 'Sorbet',
    prepTime: 5,
    freezeTime: 1440,
    difficulty: 'easy',
    servings: 3,
    tags: ['dairy-free', 'vegan', 'fruit'],
    category: 'Fruit-based',
    visibility: 'public',
    views: 876,
    likesCount: 67,
    savesCount: 34,
    sharesCount: 8,
    commentsCount: 15,
    averageRating: 4.8,
    calories: 120,
    protein: 1,
    carbs: 30,
    fat: 0,
    sugar: 25,
    user: {
      id: '2',
      name: 'Mike Chen',
      email: null,
      image: null,
      username: 'mikescreams',
      bio: null,
      location: null,
      theme: 'light',
      measurementUnit: 'imperial',
      dietaryPrefs: ['vegan'],
      points: 0,
      level: 1,
    },
  },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Discover CREAMi Creations
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore trending recipes from the community
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <button className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        {mockRecipes.map((recipe) => (
          <RecipeCard key={`${recipe.id}-2`} recipe={{ ...recipe, id: `${recipe.id}-2` }} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 flex justify-center">
        <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium hover:from-pink-600 hover:to-purple-600 transition-all">
          Load More Recipes
        </button>
      </div>
    </div>
  )
}
