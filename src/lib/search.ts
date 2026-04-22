import { TOOLS, CATEGORIES, Tool } from '@/data/tools'

export interface Result {
  tool: Tool
  catId: string
  catName: string
  score: number
}

export function scoreTools(query: string, limit = 7): Result[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  const words = q.split(/\s+/).filter(w => w.length > 1)
  if (!words.length) return []
  const results: Result[] = []

  for (const [catId, tools] of Object.entries(TOOLS)) {
    const catName = CATEGORIES.find(c => c.id === catId)?.name ?? catId
    for (const tool of tools) {
      let score = 0
      const name = tool.name.toLowerCase()
      const tagline = tool.tagline.toLowerCase()
      const desc = tool.desc.toLowerCase()
      const tags = tool.tags.map(t => t.toLowerCase()).join(' ')
      const cat = catName.toLowerCase()

      for (const w of words) {
        if (name === w)              score += 120
        else if (name.startsWith(w)) score += 80
        else if (name.includes(w))   score += 50
        if (tagline.includes(w))     score += 30
        if (tags.includes(w))        score += 35
        if (desc.includes(w))        score += 10
        if (cat.includes(w))         score += 25
      }

      if (score > 0) results.push({ tool, catId, catName, score })
    }
  }

  const sorted = results.sort((a, b) => b.score - a.score)
  return limit > 0 ? sorted.slice(0, limit) : sorted
}
