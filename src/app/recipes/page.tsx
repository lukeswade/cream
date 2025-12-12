'use client'

import { useState } from 'react'
import { Plus, Grid3x3, List } from 'lucide-react'
import Link from 'next/link'
import RecipeCard from '@/components/recipe/RecipeCard'
import Button from '@/components/ui/Button'
import { Recipe } from '@/types'

export default function MyRecipesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const recipes: Recipe[] = [] // Will be fetched from API

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Recipes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage your CREAMi recipes
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          {/* View Toggle */}
          <div className="flex items-center space-x-1 bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-700 text-pink-500'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Grid3x3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-700 text-pink-500'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
          
          {/* Add Recipe Button */}
          <Link href="/recipes/new">
            <Button variant="primary">
              <Plus className="h-5 w-5 mr-2" />
              New Recipe
            </Button>
          </Link>
        </div>
      </div>

      {/* Empty State */}
      {recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mb-6">
            <span className="text-6xl">🍦</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            No recipes yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
            Start creating your first CREAMi recipe and share it with the community!
          </p>
          <Link href="/recipes/new">
            <Button variant="primary" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Recipe
            </Button>
          </Link>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}
