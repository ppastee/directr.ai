import { NextResponse } from 'next/server'
import { getAllTools, getCategories } from '@/lib/db'

export const revalidate = 3600

export async function GET() {
  const [tools, categories] = await Promise.all([getAllTools(), getCategories()])
  return NextResponse.json({ tools, categories })
}
