'use client'

import { useState } from 'react'
import { Upload, Sparkles, Camera, Type, Wand2 } from 'lucide-react'
import Button from '@/components/ui/Button'

type GeneratedRecipe = {
  title: string
  summary: string
  ingredients: string[]
  steps: string[]
}

export default function AIGeniusPage() {
  const [mode, setMode] = useState<'image' | 'text'>('image')
  const [ingredients, setIngredients] = useState('')
  const [result, setResult] = useState<GeneratedRecipe | null>(null)
  const [history, setHistory] = useState<GeneratedRecipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIngredients(`Use the ingredients detected in ${file.name}`)
    }
  }

  const runGeneration = async (prompt: string) => {
    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/ai-genius', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Unable to generate a recipe right now. Please try again.')
      }

      const data = await response.json()
      setResult(data.recipe)
      setHistory((prev) => [data.recipe, ...prev].slice(0, 5))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateRecipes = () => {
    if (!ingredients.trim()) {
      setError('Please add some ingredients first.')
      return
    }

    runGeneration(ingredients)
  }

  const handleRandomRecipe = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/ai-genius/random')
      if (!response.ok) {
        throw new Error('Could not fetch a random recipe. Please try again.')
      }
      const data = await response.json()
      setResult(data.recipe)
      setHistory((prev) => [data.recipe, ...prev].slice(0, 5))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">CREAMi Genius</h1>
        <p className="text-gray-600 dark:text-gray-400">AI-powered recipe suggestions based on your ingredients</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setMode('image')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              mode === 'image' ? 'bg-white dark:bg-gray-700 text-pink-500 shadow-sm' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <Camera className="h-5 w-5" />
            <span>Image Upload</span>
          </button>
          <button
            onClick={() => setMode('text')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              mode === 'text' ? 'bg-white dark:bg-gray-700 text-pink-500 shadow-sm' : 'text-gray-600 dark:text-gray-400'
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
              <p className="text-gray-600 dark:text-gray-400 mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Upload a photo of your ingredients</p>
              <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
            {ingredients && <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{ingredients}</p>}
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enter your ingredients</label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="E.g., heavy cream, strawberries, sugar, vanilla extract..."
              className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
            />
            <Button variant="primary" size="lg" className="w-full mt-4" onClick={handleGenerateRecipes} isLoading={isLoading}>
              <Wand2 className="h-5 w-5 mr-2" />
              What Can I Make?
            </Button>
          </div>
        )}
      </div>

      {/* Surprise Me Button */}
      <div className="text-center">
        <Button variant="outline" size="lg" onClick={handleRandomRecipe} disabled={isLoading}>
          <Sparkles className="h-5 w-5 mr-2" />
          Surprise Me with a Random Recipe
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/30">
          {error}
        </div>
      )}

      {/* Generated Result */}
      {result && (
        <div className="mt-8 space-y-4 rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-6 w-6 text-pink-500" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{result.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{result.summary}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ingredients</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-300">
              {result.ingredients.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Steps</h3>
            <ol className="mt-2 list-decimal space-y-2 pl-5 text-gray-700 dark:text-gray-300">
              {result.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* Search History */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Searches</h2>
        {history.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">No search history yet. Try generating some recipes!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item, idx) => (
              <div
                key={`${item.title}-${idx}`}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.summary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
