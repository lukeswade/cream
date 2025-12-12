# 🍦 CREAM - CREAMi Recipe Sharing Platform

A modern, full-featured web application for sharing and discovering Ninja CREAMi recipes. Built with Next.js, TypeScript, Prisma, and Tailwind CSS.

## ✨ Features

### Core Features
- **Authentication System**: Username/password and OAuth (Google, Apple, Facebook)
- **Recipe Management**: Create, edit, delete, and share recipes
- **Social Features**: Follow users, like, comment, and save recipes
- **CREAtion Book**: Organize saved recipes into custom collections
- **CREAMi Genius**: AI-powered ingredient analyzer and recipe suggestions
- **Responsive Design**: Mobile-first, works seamlessly on all devices
- **Dark Mode**: Beautiful light and dark themes

### User Experience
- Collapsible sidebar navigation
- Bottom/Top navigation bars
- Infinite scroll feed
- Advanced search and filters
- Recipe ratings and reviews
- Gamification with achievements
- Real-time notifications

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Neon PostgreSQL (serverless) with Prisma ORM
- **Database Adapter**: @prisma/adapter-neon for edge runtime compatibility
- **Authentication**: NextAuth.js
- **AI Integration**: OpenAI API
- **Icons**: Lucide React
- **Deployment**: Cloudflare Pages with @opennextjs/cloudflare

## 📋 Prerequisites

- Node.js 20+ 
- Neon PostgreSQL database (for Cloudflare Pages deployment) or standard PostgreSQL (for local dev)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/lukeswade/cream.git
cd cream
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/cream"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
OPENAI_API_KEY="your-openai-api-key"
```

4. **Set up the database**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
cream/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── recipes/           # Recipe pages
│   │   ├── connections/       # Social connections
│   │   ├── saved/             # Saved recipes (CREAtion Book)
│   │   ├── ai-genius/         # AI features
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── auth/             # Auth components
│   │   ├── layout/           # Layout components
│   │   ├── recipe/           # Recipe components
│   │   ├── social/           # Social features
│   │   ├── ai/               # AI components
│   │   └── ui/               # Reusable UI components
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts           # NextAuth configuration
│   │   └── db.ts             # Prisma client
│   ├── context/              # React context providers
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript types
│   └── utils/                # Helper functions
├── prisma/
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

## 🎨 Design Features

### Color Palette
- Primary: Pink to Purple gradient
- Background: Soft whites and grays
- Accent: Creamy pastels

### Key UI Components
- **RecipeCard**: Beautiful recipe display with images, stats, and actions
- **Sidebar**: Collapsible navigation with user profile
- **BottomNav/TopNav**: Responsive navigation
- **Button/Input**: Consistent, accessible form elements

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run pages:build  # Build for Cloudflare Pages
npm run preview      # Preview Cloudflare build locally
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma migrate   # Run database migrations
```

## ☁️ Cloudflare Pages Deployment

This application is configured for deployment on Cloudflare Pages using OpenNext.

### Prerequisites
- Cloudflare account
- Neon PostgreSQL database (serverless-compatible)

### Cloudflare Pages Settings

**Build command:**
```bash
npm run pages:build
```

**Build output directory:**
```
.open-next/assets
```

**Environment variables:**
```env
DATABASE_URL=your-neon-connection-string-with-pooling
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-api-key
```

**Important Notes:**
- The build uses `@opennextjs/cloudflare` for Next.js 16 compatibility
- Database uses `@prisma/adapter-neon` for edge runtime support
- Do NOT use `npx @cloudflare/next-on-pages` (deprecated) - use `npm run pages:build` instead
- The app automatically falls back to a placeholder DATABASE_URL during build if not set
- Actual DATABASE_URL from environment variables is used at runtime

## 🗄️ Database Schema

Key models:
- **User**: User accounts and profiles
- **Recipe**: Recipe data with ingredients and instructions
- **Collection**: User-created recipe collections
- **Connection**: User follows/connections
- **Comment, Like, Rating**: Social interactions
- **Notification**: User notifications
- **Achievement**: Gamification badges

## 🔐 Authentication

Supports multiple authentication methods:
- Email/Password (credentials)
- Google OAuth
- Apple Sign-In
- Facebook OAuth (configurable)

## 🤖 AI Features

**CREAMi Genius** uses OpenAI to:
- Analyze ingredient photos
- Suggest recipes based on ingredients
- Generate nutrition information
- Provide cooking tips

## 📱 Responsive Design

- Mobile-first approach
- Bottom navigation on mobile
- Top navigation on desktop
- Collapsible sidebar
- Touch-friendly interactions

## 🎯 Roadmap

- [ ] Email verification
- [ ] Password reset flow
- [ ] Push notifications
- [ ] Progressive Web App (PWA)
- [ ] Recipe video uploads
- [ ] Live cooking sessions
- [ ] Recipe contests/challenges
- [ ] Admin dashboard
- [ ] Advanced analytics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built for the Ninja CREAMi community
- Inspired by recipe sharing platforms
- Powered by modern web technologies

---

Made with ❤️ and 🍦
