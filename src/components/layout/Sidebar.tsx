'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import {
  User,
  Settings,
  Moon,
  Sun,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/utils/cn'

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const { data: session } = useSession()

  useEffect(() => {
    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    setTheme(savedTheme || systemTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out',
        'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 rounded-full bg-white dark:bg-gray-800 p-1 shadow-md border border-gray-200 dark:border-gray-700"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      <div className="flex h-full flex-col overflow-y-auto p-4">
        {/* Logo/Brand */}
        <div className="mb-6 flex items-center justify-center">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
            {isCollapsed ? 'C' : 'CREAM'}
          </div>
        </div>

        {/* User Profile Section */}
        {session?.user && (
          <div className="mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
            <Link href="/profile" className="flex items-center space-x-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  session.user.name?.[0]?.toUpperCase() || 'U'
                )}
              </div>
              {!isCollapsed && (
                <div className="flex-1 overflow-hidden">
                  <p className="truncate font-medium text-gray-900 dark:text-white">
                    {session.user.name || 'User'}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    View Profile
                  </p>
                </div>
              )}
            </Link>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1">
          <SidebarLink
            href="/settings/account"
            icon={<User className="h-5 w-5" />}
            label="Account Settings"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            href="/settings/preferences"
            icon={<Settings className="h-5 w-5" />}
            label="App Settings"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            href="/settings/notifications"
            icon={<Bell className="h-5 w-5" />}
            label="Notifications"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            href="/settings/privacy"
            icon={<Shield className="h-5 w-5" />}
            label="Privacy"
            isCollapsed={isCollapsed}
          />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex w-full items-center space-x-3 rounded-lg p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            {!isCollapsed && <span>Theme</span>}
          </button>

          <SidebarLink
            href="/help"
            icon={<HelpCircle className="h-5 w-5" />}
            label="Help & Support"
            isCollapsed={isCollapsed}
          />
        </nav>

        {/* Logout Button */}
        {session && (
          <button
            onClick={handleSignOut}
            className="mt-4 flex w-full items-center space-x-3 rounded-lg p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        )}
      </div>
    </aside>
  )
}

interface SidebarLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  isCollapsed: boolean
}

function SidebarLink({ href, icon, label, isCollapsed }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-3 rounded-lg p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      title={isCollapsed ? label : undefined}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  )
}
