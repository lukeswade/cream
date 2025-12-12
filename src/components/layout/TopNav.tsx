'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Users, Book, Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/recipes', icon: BookOpen, label: 'My Recipes' },
  { href: '/connections', icon: Users, label: 'Connections' },
  { href: '/saved', icon: Book, label: 'CREAtion Book' },
  { href: '/ai-genius', icon: Sparkles, label: 'CREAMi Genius' },
]

export default function TopNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center justify-center space-x-1 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all',
              isActive
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
