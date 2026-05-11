import { NextResponse } from 'next/server'
import { getAllTools, getCategories, withoutEmbeddings } from '@/lib/db'

export const revalidate = 3600

export async function GET() {
  const [tools, categories] = await Promise.all([getAllTools(), getCategories()])
  // Strip embeddings — they're ~12 KB per tool and only the server needs them.
  return NextResponse.json({ tools: withoutEmbeddings(tools), categories })
}
