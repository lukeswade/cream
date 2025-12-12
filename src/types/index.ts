export interface Recipe {
  id: string
  title: string
  description: string | null
  userId: string
  createdAt: Date
  updatedAt: Date
  ingredients: Ingredient[]
  instructions: string[]
  images: string[]
  creamiProgram: string
  prepTime: number | null
  freezeTime: number | null
  difficulty: 'easy' | 'medium' | 'hard'
  servings: number
  tags: string[]
  category: string | null
  visibility: 'public' | 'private' | 'friends'
  views: number
  likesCount: number
  savesCount: number
  sharesCount: number
  commentsCount: number
  averageRating: number | null
  calories: number | null
  protein: number | null
  carbs: number | null
  fat: number | null
  sugar: number | null
  user?: User
  isLiked?: boolean
  isSaved?: boolean
}

export interface Ingredient {
  name: string
  quantity: string
  unit: string
}

export interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
  username: string | null
  bio: string | null
  location: string | null
  theme: string
  measurementUnit: string
  dietaryPrefs: string[]
  points: number
  level: number
  _count?: {
    recipes: number
    followers: number
    following: number
  }
}

export interface Collection {
  id: string
  name: string
  description: string | null
  userId: string
  createdAt: Date
  updatedAt: Date
  recipes?: SavedRecipe[]
}

export interface SavedRecipe {
  id: string
  userId: string
  recipeId: string
  savedAt: Date
  notes: string | null
  recipe?: Recipe
}

export interface Comment {
  id: string
  content: string
  userId: string
  recipeId: string
  createdAt: Date
  updatedAt: Date
  user?: User
}

export interface Notification {
  id: string
  userId: string
  type: string
  content: string
  link: string | null
  read: boolean
  createdAt: Date
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  points: number
}

export type CreamiProgram = 
  | 'Ice Cream'
  | 'Sorbet'
  | 'Gelato'
  | 'Milkshake'
  | 'Lite Ice Cream'
  | 'Mix-In'
  | 'Smoothie Bowl'
  | 'Slushie'

export type DietaryTag = 
  | 'vegan'
  | 'vegetarian'
  | 'dairy-free'
  | 'gluten-free'
  | 'low-sugar'
  | 'keto'
  | 'paleo'
  | 'nut-free'
  | 'low-calorie'
  | 'high-protein'
