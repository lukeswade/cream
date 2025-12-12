# Cloudflare Pages Setup Instructions

## Critical: You MUST change the build command in Cloudflare Pages Dashboard

By default, Cloudflare Pages detects this as a Next.js project and runs `npx @cloudflare/next-on-pages` automatically. **This is wrong and will fail.**

### Steps to Fix:

1. Go to your Cloudflare Pages project dashboard
2. Go to **Settings** → **Builds & deployments**
3. Set the **Build command** to:
   ```
   npm run pages:build
   ```
4. Set the **Build output directory** to:
   ```
   .open-next
   ```
5. Make sure these environment variables are set in **Settings** → **Environment variables**:
   - `DATABASE_URL` - Your Neon connection string with pooling enabled
   - `NEXTAUTH_URL` - Your production URL (e.g., https://creamininja.com)
   - `NEXTAUTH_SECRET` - Your NextAuth secret key
   - `OPENAI_API_KEY` - Your OpenAI API key (if using AI features)

6. Trigger a new deployment

## Why this is necessary

- The project uses `@opennextjs/cloudflare` for Next.js 16 support
- The old `@cloudflare/next-on-pages` package is deprecated and doesn't support Next.js 16
- Cloudflare's auto-detection uses the old package by default
- You must override it with the correct build command

## If you still get errors

Make sure your Neon DATABASE_URL:
- Uses the pooled connection string (not the direct connection)
- Is set in the Cloudflare Pages environment variables (not just locally)
- Is accessible from Cloudflare's network
