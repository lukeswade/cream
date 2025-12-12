import { Book, Plus, Folder } from 'lucide-react'
import Button from '@/components/ui/Button'
import RecipeCard from '@/components/recipe/RecipeCard'
import { Recipe } from '@/types'

export default function SavedRecipesPage() {
  const savedRecipes: Recipe[] = [] // Will be fetched from API
  const collections = [
    { id: '1', name: 'Summer Favorites', count: 12 },
    { id: '2', name: 'Low Cal', count: 8 },
    { id: '3', name: 'Kids Love', count: 15 },
  ]

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            CREAtion Book
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your saved recipes and collections
          </p>
        </div>
        <Button variant="primary">
          <Plus className="h-5 w-5 mr-2" />
          New Collection
        </Button>
      </div>

      {/* Collections */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Collections
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* All Saved */}
          <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl p-4 text-white cursor-pointer hover:shadow-lg transition-shadow">
            <Book className="h-8 w-8 mb-2" />
            <h3 className="font-semibold mb-1">All Saved</h3>
            <p className="text-sm opacity-90">{savedRecipes.length} recipes</p>
          </div>
          
          {/* Custom Collections */}
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:border-pink-500 hover:shadow-lg transition-all"
            >
              <Folder className="h-8 w-8 mb-2 text-pink-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {collection.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {collection.count} recipes
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Recipes */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recently Saved
        </h2>
        {savedRecipes.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Book className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No saved recipes yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start exploring and save your favorite recipes!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
