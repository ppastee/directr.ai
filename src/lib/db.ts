import { unstable_cache } from 'next/cache'
import { getSupabase } from './supabase'
import { TOOLS as STATIC_TOOLS, CATEGORIES as STATIC_CATS, Tool, Category, nameToSlug } from '@/data/tools'

export type ToolsMap = Record<string, Tool[]>

function fromRow(row: Record<string, unknown>): Tool {
  return {
    id: row.id as number,
    name: row.name as string,
    emoji: row.emoji as string,
    logoDomain: row.logo_domain as string,
    url: row.url as string,
    tagline: row.tagline as string,
    desc: row.description as string,
    price: row.price as string,
    free: row.free as boolean,
    freeTier: (row.free_tier as string) ?? undefined,
    freeTierLabel: row.free_tier_label as string | null,
    rating: Number(row.rating),
    reviews: row.reviews as number,
    tags: row.tags as string[],
    sponsored: (row.sponsored as boolean) || undefined,
    apiAccess: row.api_access as boolean,
    outputRes: row.output_res as string | null,
    watermark: row.watermark as boolean,
  }
}

function buildCategories(toolsMap: ToolsMap): Category[] {
  return STATIC_CATS.map((c) => ({
    ...c,
    count: (toolsMap[c.id] ?? []).length,
  }))
}

const STATIC_NAME_BY_ID: Record<number, string> = Object.values(STATIC_TOOLS)
  .flat()
  .reduce((acc, t) => { acc[t.id] = t.name; return acc }, {} as Record<number, string>)

const fetchAllToolsFromDB = unstable_cache(
  async (): Promise<ToolsMap | null> => {
    const sb = getSupabase()
    if (!sb) return null
    const { data, error } = await sb.from('tools').select('*').order('id')
    if (error || !data) return null
    const map: ToolsMap = {}
    for (const row of data) {
      const cat = row.category as string
      if (!map[cat]) map[cat] = []
      const tool = fromRow(row as Record<string, unknown>)
      // Use static name as source of truth to avoid DB encoding issues
      if (STATIC_NAME_BY_ID[tool.id]) tool.name = STATIC_NAME_BY_ID[tool.id]
      map[cat].push(tool)
    }
    return map
  },
  ['all-tools'],
  { revalidate: 3600 }
)

export async function getAllTools(): Promise<ToolsMap> {
  const db = await fetchAllToolsFromDB()
  return db ?? STATIC_TOOLS
}

export async function getCategories(): Promise<Category[]> {
  const tools = await getAllTools()
  return buildCategories(tools)
}

export async function getToolsByCategory(catId: string): Promise<Tool[]> {
  const tools = await getAllTools()
  return tools[catId] ?? []
}

export async function dbFindToolBySlug(slug: string): Promise<{ tool: Tool; categoryId: string } | null> {
  const tools = await getAllTools()
  for (const [catId, catTools] of Object.entries(tools)) {
    const tool = catTools.find((t) => nameToSlug(t.name) === slug)
    if (tool) return { tool, categoryId: catId }
  }
  return null
}

export async function dbGetAllToolSlugs(): Promise<{ slug: string; categoryId: string }[]> {
  const tools = await getAllTools()
  return Object.entries(tools).flatMap(([catId, catTools]) =>
    catTools.map((t) => ({ slug: nameToSlug(t.name), categoryId: catId }))
  )
}
