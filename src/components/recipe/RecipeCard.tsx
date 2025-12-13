'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Bookmark, Share2, MessageCircle, Eye } from 'lucide-react'
import { Recipe } from '@/types'
import { cn } from '@/utils/cn'

interface RecipeCardProps {
  recipe: Recipe
  onLike?: (recipeId: string) => void
  onSave?: (recipeId: string) => void
}

export default function RecipeCard({ recipe, onLike, onSave }: RecipeCardProps) {
  const [isLiked, setIsLiked] = useState(recipe.isLiked || false)
  const [isSaved, setIsSaved] = useState(recipe.isSaved || false)
  const [likes, setLikes] = useState(recipe.likesCount)

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
    onLike?.(recipe.id)
  }

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsSaved(!isSaved)
    onSave?.(recipe.id)
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.description || '',
          url: `/recipe/${recipe.id}`,
        })
      } catch {
        console.log('Share cancelled')
      }
    }
  }

  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div className="group overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-700">
          {recipe.images && recipe.images.length > 0 ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={recipe.images[0]}
                alt={recipe.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-400 to-purple-500">
              <span className="text-4xl text-white">🍦</span>
            </div>
          )}
          {/* Difficulty Badge */}
          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
            {recipe.difficulty}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
            {recipe.title}
          </h3>

          {/* Creator */}
          <div className="flex items-center mb-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white text-xs">
              {recipe.user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {recipe.user?.name || 'Anonymous'}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full text-xs">
              {recipe.creamiProgram}
            </span>
            {recipe.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={cn(
                  'flex items-center space-x-1 transition-colors',
                  isLiked ? 'text-red-500' : 'hover:text-red-500'
                )}
              >
                <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
                <span>{likes}</span>
              </button>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-5 w-5" />
                <span>{recipe.commentsCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-5 w-5" />
                <span>{recipe.views}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSave}
                className={cn(
                  'transition-colors',
                  isSaved ? 'text-pink-500' : 'hover:text-pink-500'
                )}
              >
                <Bookmark className={cn('h-5 w-5', isSaved && 'fill-current')} />
              </button>
              <button onClick={handleShare} className="hover:text-purple-500 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
