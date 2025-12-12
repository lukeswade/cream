'use client'

import { useState } from 'react'
import { Upload, Sparkles, Camera, Type, Wand2 } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function AIGeniusPage() {
  const [mode, setMode] = useState<'image' | 'text'>('image')
  const [ingredients, setIngredients] = useState('')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log('Image uploaded:', file.name)
      // Handle image upload and AI processing
    }
  }

  const handleGenerateRecipes = () => {
    console.log('Generating recipes with:', ingredients)
    // Handle AI recipe generation
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          CREAMi Genius
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          AI-powered recipe suggestions based on your ingredients
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setMode('image')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              mode === 'image'
                ? 'bg-white dark:bg-gray-700 text-pink-500 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <Camera className="h-5 w-5" />
            <span>Image Upload</span>
          </button>
          <button
            onClick={() => setMode('text')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              mode === 'text'
                ? 'bg-white dark:bg-gray-700 text-pink-500 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <Type className="h-5 w-5" />
            <span>Manual Input</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
        {mode === 'image' ? (
          <div className="text-center">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-pink-500 transition-colors"
            >
              <Upload className="h-12 w-12 text-gray-400 mb-3" />
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Upload a photo of your ingredients
              </p>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter your ingredients
            </label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="E.g., heavy cream, strawberries, sugar, vanilla extract..."
              className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
            />
            <Button
              variant="primary"
              size="lg"
              className="w-full mt-4"
              onClick={handleGenerateRecipes}
            >
              <Wand2 className="h-5 w-5 mr-2" />
              What Can I Make?
            </Button>
          </div>
        )}
      </div>

      {/* Surprise Me Button */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          <Sparkles className="h-5 w-5 mr-2" />
          Surprise Me with a Random Recipe
        </Button>
      </div>

      {/* Search History */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Searches
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No search history yet. Try generating some recipes!
          </p>
        </div>
      </div>
    </div>
  )
}
