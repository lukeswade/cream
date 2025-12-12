import { Users, UserPlus, Search } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function ConnectionsPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Connections
      </h1>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for friends..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* Suggested Friends */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <UserPlus className="h-5 w-5 mr-2" />
          Suggested Friends
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ConnectionCard
            name="Emma Wilson"
            username="@emmacreams"
            mutualFriends={12}
            recipes={45}
          />
          <ConnectionCard
            name="James Brown"
            username="@jamesfrozen"
            mutualFriends={8}
            recipes={32}
          />
          <ConnectionCard
            name="Sofia Martinez"
            username="@sofiasweets"
            mutualFriends={5}
            recipes={28}
          />
        </div>
      </div>

      {/* My Connections */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2" />
          My Connections
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-12 w-12 text-gray-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            No connections yet. Start connecting with other CREAMi enthusiasts!
          </p>
        </div>
      </div>
    </div>
  )
}

interface ConnectionCardProps {
  name: string
  username: string
  mutualFriends: number
  recipes: number
}

function ConnectionCard({ name, username, mutualFriends, recipes }: ConnectionCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-3">
        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
          {name[0]}
        </div>
        <div className="ml-3 flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{username}</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
        <span>{mutualFriends} mutual</span>
        <span>{recipes} recipes</span>
      </div>
      <Button variant="primary" size="sm" className="w-full">
        Connect
      </Button>
    </div>
  )
}
