import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const fallbackRecipe = (prompt: string) => ({
  title: 'CREAMi Idea Based on Your Ingredients',
  summary: `A simple creation inspired by: ${prompt}`,
  ingredients: [
    '1 1/2 cups heavy cream',
    '1 cup whole milk',
    '3/4 cup sugar',
    'Pinch of salt',
    'Flavorings based on your ingredients',
  ],
  steps: [
    'Whisk the dairy, sugar, and salt until dissolved.',
    'Fold in your highlighted ingredients for flavor.',
    'Chill, add to the CREAMi pint, and freeze for 24 hours.',
    'Spin on the appropriate program and re-spin if needed.',
  ],
})

export async function POST(request: Request) {
  const { prompt } = await request.json()

  if (!prompt || typeof prompt !== 'string') {
    return NextResponse.json({ message: 'Prompt is required.' }, { status: 400 })
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ recipe: fallbackRecipe(prompt), source: 'fallback' })
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert Ninja CREAMi recipe creator. Return short, practical recipes as JSON with keys title, summary, ingredients (array of strings), and steps (array of strings).',
        },
        {
          role: 'user',
          content: `Create a Ninja CREAMi recipe using these ingredients: ${prompt}. Keep it concise and easy to follow.`,
        },
      ],
      temperature: 0.7,
    })

    const content = completion.choices[0].message?.content || ''
    let recipe

    try {
      recipe = JSON.parse(content)
    } catch {
      recipe = fallbackRecipe(prompt)
      recipe.summary = content || recipe.summary
    }

    return NextResponse.json({ recipe })
  } catch (error) {
    console.error('[AI_GENIUS_ERROR]', error)
    return NextResponse.json(
      { recipe: fallbackRecipe(prompt), message: 'Using fallback recipe due to an error.' },
      { status: 200 }
    )
  }
}
