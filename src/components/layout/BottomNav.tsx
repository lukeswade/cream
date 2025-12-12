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

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1',
                'transition-colors',
                isActive
                  ? 'text-pink-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              )}
            >
              <Icon className={cn('h-6 w-6', isActive && 'scale-110')} />
              <span className="mt-1 text-xs truncate">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
