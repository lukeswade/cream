import { NextResponse } from 'next/server'

const randomRecipes = [
  {
    title: 'Sunrise Strawberry Swirl',
    summary: 'Bright strawberry and vanilla layers made for a quick morning treat.',
    ingredients: [
      '2 cups frozen strawberries',
      '1 cup vanilla yogurt',
      '1/2 cup whole milk',
      '2 tbsp honey',
    ],
    steps: [
      'Blend strawberries with honey until smooth and set aside.',
      'Whisk yogurt with milk until combined.',
      'Layer strawberry puree and yogurt mix into the CREAMi pint.',
      'Freeze for 24 hours and spin on the Sorbet setting.',
    ],
  },
  {
    title: 'Midnight Mint Chip',
    summary: 'A creamy chocolate-mint spin with plenty of crunch.',
    ingredients: [
      '1 1/4 cups heavy cream',
      '3/4 cup whole milk',
      '1/2 cup sugar',
      '1/2 tsp peppermint extract',
      '1/2 cup chopped chocolate chips',
    ],
    steps: [
      'Whisk dairy, sugar, and peppermint until sugar dissolves.',
      'Chill, pour into the CREAMi pint, and freeze for 24 hours.',
      'Spin on the Ice Cream setting and mix-in the chocolate chips.',
    ],
  },
  {
    title: 'Salted Caramel Cold Brew',
    summary: 'Coffee-forward gelato with a salty caramel ribbon.',
    ingredients: [
      '1 1/2 cups heavy cream',
      '1 cup cold brew concentrate',
      '1/2 cup caramel sauce',
      '1/3 cup sugar',
      'Pinch of flaky salt',
    ],
    steps: [
      'Stir cold brew, cream, sugar, and salt until smooth.',
      'Freeze in the CREAMi pint for 24 hours.',
      'Spin on Gelato and drizzle caramel between re-spins.',
    ],
  },
]

export async function GET() {
  const recipe = randomRecipes[Math.floor(Math.random() * randomRecipes.length)]
  return NextResponse.json({ recipe })
}
