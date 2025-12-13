import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const result = await prisma.$queryRaw`SELECT 1 as ok`
    return NextResponse.json({ status: 'ok', result })
  } catch (error) {
    console.error('[DB_HEALTHCHECK_ERROR]', error)
    return NextResponse.json({ status: 'error', message: 'Unable to reach database' }, { status: 500 })
  }
}
