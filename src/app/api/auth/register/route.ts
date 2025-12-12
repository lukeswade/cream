import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, username, password } = body

    // Validation
    if (!name || !email || !username || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    })

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { message: 'Email already registered' },
          { status: 400 }
        )
      }
      if (existingUser.username === username) {
        return NextResponse.json(
          { message: 'Username already taken' },
          { status: 400 }
        )
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
      },
    })

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
