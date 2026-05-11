import { Tool, Category } from '@/data/tools'
import type { ToolsMap } from './db'

export interface Result {
  tool: Tool
  catId: string
  catName: string
  score: number
}

// Words that carry no signal in a detailed query and should be ignored.
const STOP_WORDS = new Set([
  'a','an','the','and','or','but','if','of','at','by','for','with','about','to','from',
  'in','on','off','over','under','into','out','as','is','am','are','was','were','be','been','being',
  'have','has','had','do','does','did','will','would','should','could','can','may','might','must',
  'i','me','my','mine','we','us','our','you','your','yours','they','them','their','it','its',
  'this','that','these','those','some','any','all','no','not','only','just','very','really',
  'want','need','looking','looking','help','make','create','use','using','so','then',
  'how','what','which','who','where','when','why','because','than','also','too',
  'one','two','three','few','many','much','more','less',
  'ai','please','thanks','thank',
])

// Multi-word phrases worth boosting if they appear together in the query.
// Map a phrase → a list of category ids it strongly implies.
const PHRASE_INTENT: Record<string, string[]> = {
  'text to speech':       ['audio'],
  'voice clone':          ['audio'],
  'voice cloning':        ['audio'],
  'voice over':           ['audio'],
  'voice synthesis':      ['audio'],
  'speech to text':       ['audio', 'productivity'],
  'meeting notes':        ['productivity', 'audio'],
  'social media':         ['animation', 'marketing', 'image'],
  'short form':           ['animation'],
  'long form':            ['writing', 'animation'],
  'product demo':         ['animation', 'image'],
  'product launch':       ['animation', 'marketing'],
  'training video':       ['animation'],
  'explainer video':      ['animation'],
  'marketing copy':       ['writing', 'marketing'],
  'blog post':            ['writing'],
  'blog article':         ['writing'],
  'landing page':         ['coding', 'writing'],
  'full stack':           ['coding'],
  'full-stack':           ['coding'],
  'web app':              ['coding'],
  'mobile app':           ['coding'],
  'build an app':         ['coding'],
  'build a app':          ['coding'],
  'tracking app':         ['coding'],
  'fitness app':          ['coding'],
  'health app':           ['coding'],
  'app that':             ['coding'],
  'concept art':          ['image'],
  'product photo':        ['image'],
  'product shots':        ['image'],
  'no watermark':         ['image', 'animation'],
  'game asset':           ['3d', 'image'],
  'game assets':          ['3d', 'image'],
  '3d model':             ['3d'],
  '3d models':            ['3d'],
  '3d animation':         ['3d', 'animation'],
  'video game':           ['3d', 'image'],
  'unity game':           ['3d'],
  'unreal engine':        ['3d'],
  'deep research':        ['chat'],
  'research paper':       ['chat', 'writing'],
  'data analysis':        ['data', 'chat'],
  'spreadsheet analysis': ['data'],
  'tax planning':         ['finance', 'accounting'],
  'tax optimization':     ['finance', 'accounting'],
  'stock research':       ['finance'],
  'contract review':      ['legal'],
  'contract drafting':    ['legal'],
  'legal research':       ['legal'],
  'project management':   ['construction', 'productivity'],
  'site documentation':   ['construction'],
  'lesson plan':          ['education'],
  'language learning':    ['education'],
  'flash cards':          ['education'],
  'flashcards':           ['education'],
  'job description':      ['hr'],
  'candidate sourcing':   ['hr'],
  'video interview':      ['hr'],
  'video interviews':     ['hr'],
}

// Single-word category cues used to bias scoring when a detailed query
// mentions the category implicitly.
const CATEGORY_CUES: Record<string, string[]> = {
  animation:    ['video','animate','animation','reels','tiktok','youtube','short','clip','footage','film','movie'],
  image:        ['image','photo','picture','illustration','poster','logo','icon','visual','art','artwork','headshot'],
  writing:      ['write','copy','blog','article','essay','script','story','novel','headline','tagline','newsletter'],
  coding:       ['code','coding','program','developer','dev','api','app','apps','application','website','site','frontend','backend','script','build','building','builder','builders','tracker','tracking','mobile'],
  audio:        ['voice','audio','music','song','podcast','transcribe','transcript','dub','dubbing','tts'],
  chat:         ['chat','assistant','answer','answers','question','questions','reasoning','research','summarize','summary'],
  '3d':         ['3d','model','mesh','character','environment','asset','sculpt','rig','rigged','texture'],
  productivity: ['notes','meeting','meetings','schedule','calendar','task','tasks','workflow','automation','presentation'],
  marketing:    ['ad','ads','campaign','seo','social','brand','marketing','outreach'],
  finance:      ['stock','stocks','portfolio','invest','investing','trade','trading','etf','retirement'],
  accounting:   ['bookkeeping','invoice','invoices','receipt','receipts','ledger','quickbooks','xero','accounting'],
  legal:        ['contract','contracts','legal','lawyer','attorney','clause','nda','litigation'],
  hr:           ['recruit','recruiting','hire','hiring','candidate','candidates','interview','onboard','onboarding'],
  construction: ['site','building','blueprint','blueprints','rfi','bim','construction','crane','takeoff'],
  data:         ['data','dashboard','analytics','sql','spreadsheet','csv','chart','charts','dataset'],
  education:    ['learn','learning','tutor','tutoring','study','student','studying','course','quiz','flashcard'],
}

// Word-boundary match — prevents "sure" from hitting "ensure", etc.
// We intentionally skip word-boundary checks on tool *names* (handled
// separately with startsWith / includes) so "gpt" still finds "ChatGPT".
function wordInText(w: string, text: string): boolean {
  const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`\\b${escaped}\\b`, 'i').test(text)
}

function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9 \-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

function meaningfulWords(tokens: string[]): string[] {
  return tokens.filter(t => t.length >= 2 && !STOP_WORDS.has(t))
}

function findPhrases(tokens: string[]): string[] {
  // Two- and three-word contiguous phrases (stop words allowed inside).
  const joined = tokens.join(' ')
  const hits: string[] = []
  for (const phrase of Object.keys(PHRASE_INTENT)) {
    if (joined.includes(phrase)) hits.push(phrase)
  }
  return hits
}

export interface SearchSignals {
  words: string[]
  phrases: string[]
  // Category id → confidence weight (higher = stronger implied intent)
  categoryBias: Record<string, number>
}

export function extractSignals(query: string): SearchSignals {
  const tokens = tokenize(query)
  const words = meaningfulWords(tokens)
  const phrases = findPhrases(tokens)

  const categoryBias: Record<string, number> = {}
  for (const p of phrases) {
    for (const catId of PHRASE_INTENT[p] ?? []) {
      categoryBias[catId] = (categoryBias[catId] ?? 0) + 2
    }
  }
  for (const w of words) {
    const stem = w.length > 4 && w.endsWith('s') ? w.slice(0, -1) : w
    for (const [catId, cues] of Object.entries(CATEGORY_CUES)) {
      if (cues.includes(w) || (stem !== w && cues.includes(stem)))
        categoryBias[catId] = (categoryBias[catId] ?? 0) + 1
    }
  }
  return { words, phrases, categoryBias }
}

/**
 * Average embedding for each category, computed from its tools' embeddings.
 * Used as a "category centroid" to bias hybrid scoring towards categories
 * that the embedding model says the query belongs to — without us needing
 * to maintain a hand-curated keyword cue list.
 *
 * Cached by ToolsMap reference identity, since the underlying tool data
 * is cached in db.ts already and the same map gets reused across calls.
 */
const centroidCache = new WeakMap<ToolsMap, Record<string, number[]>>()

function computeCategoryCentroids(tools: ToolsMap): Record<string, number[]> {
  const cached = centroidCache.get(tools)
  if (cached) return cached

  const out: Record<string, number[]> = {}
  for (const [catId, catTools] of Object.entries(tools)) {
    const withEmbedding = catTools.filter(t => Array.isArray(t.embedding) && t.embedding.length > 0)
    if (withEmbedding.length === 0) continue
    const dim = withEmbedding[0].embedding!.length
    const sum = new Array<number>(dim).fill(0)
    for (const t of withEmbedding) {
      const e = t.embedding!
      for (let i = 0; i < dim; i++) sum[i] += e[i]
    }
    for (let i = 0; i < dim; i++) sum[i] /= withEmbedding.length
    out[catId] = sum
  }
  centroidCache.set(tools, out)
  return out
}

/**
 * Cosine similarity between two equal-length numeric vectors.
 * Both vectors from text-embedding-3-small are already L2-normalized,
 * so this is effectively a dot product — but we don't rely on that
 * assumption in case the model changes.
 */
export function cosineSim(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0
  let dot = 0
  let aMag = 0
  let bMag = 0
  for (let i = 0; i < a.length; i++) {
    dot  += a[i] * b[i]
    aMag += a[i] * a[i]
    bMag += b[i] * b[i]
  }
  const denom = Math.sqrt(aMag) * Math.sqrt(bMag)
  return denom === 0 ? 0 : dot / denom
}

interface HybridOpts {
  /** Weight for the semantic score in the final blend. Keyword weight = 1 - semanticWeight. */
  semanticWeight?: number
  /**
   * Saturation point for the keyword score. A keyword score >= kwSaturation
   * normalises to 1.0; everything else scales linearly below. Used because
   * keyword scores have no natural upper bound and we don't want min-max
   * normalisation across the result set (small sets get distorted).
   */
  kwSaturation?: number
  /**
   * Hard semantic gate. A tool whose cosine similarity is below this is
   * dropped regardless of keyword score. This is the line that prevents
   * "Buildots" (construction) from being returned for "build a chatbot"
   * — the keyword score on the name match is irrelevant when the
   * embedding model already knows the topics are unrelated.
   */
  semanticGate?: number
  /**
   * Final blended score floor. Tools whose blended score falls below this
   * are dropped. Catches tools that clear the semantic gate but still end
   * up with a weak overall match.
   */
  scoreFloor?: number
  /**
   * Relative gap filter. Drop tools whose score is less than this fraction
   * of the top tool's score. Cuts a "long tail" of half-matches without
   * pruning queries where every result sits in a tight band of relevance.
   * E.g. 0.78 = keep only tools within 22% of the top score.
   */
  gapThreshold?: number
  /** How many results to return. 0 = all. */
  limit?: number
}

/**
 * Hybrid ranking: blends absolute cosine similarity with a saturated
 * keyword score. Both signals live on a [0, 1] scale so they can be
 * blended directly without min-max normalisation distorting small
 * result sets.
 *
 * Falls back to keyword-only when queryEmbedding is missing or empty.
 */
export function scoreToolsHybrid(
  query: string,
  queryEmbedding: number[] | null | undefined,
  tools: ToolsMap,
  categories: Category[],
  opts: HybridOpts = {},
): Result[] {
  const limit = opts.limit ?? 0
  if (!queryEmbedding || queryEmbedding.length === 0) {
    return scoreTools(query, tools, categories, limit)
  }

  const semanticWeight = opts.semanticWeight ?? 0.65
  const keywordWeight  = 1 - semanticWeight
  const kwSaturation   = opts.kwSaturation ?? 200
  const semanticGate   = opts.semanticGate ?? 0.22
  const scoreFloor     = opts.scoreFloor ?? 0.20
  const gapThreshold   = opts.gapThreshold ?? 0.72

  // Run keyword scoring once over the full set. limit=0 returns every match.
  const keywordResults = scoreTools(query, tools, categories, 0)
  const keywordScore: Record<number, number> = {}
  for (const r of keywordResults) keywordScore[r.tool.id] = r.score

  // Compute query-to-category semantic alignment. The top-aligned categories
  // get no penalty; everyone else has their final score scaled down. This
  // is what stops "Buildots" (Construction) winning "build a chatbot" — its
  // category embedding is far from the chatbot query even when the tool's
  // own text mentions "build".
  const centroids = computeCategoryCentroids(tools)
  const catSimById: Record<string, number> = {}
  for (const [catId, centroid] of Object.entries(centroids)) {
    catSimById[catId] = Math.max(0, cosineSim(queryEmbedding, centroid))
  }
  const catSimValues = Object.values(catSimById)
  const catSimMax = catSimValues.length ? Math.max(...catSimValues) : 1
  const catSimMin = catSimValues.length ? Math.min(...catSimValues) : 0
  const catSimRange = catSimMax - catSimMin || 1

  const results: Result[] = []
  for (const [catId, catTools] of Object.entries(tools)) {
    const catName = categories.find(c => c.id === catId)?.name ?? catId
    for (const tool of catTools) {
      const sem = tool.embedding ? Math.max(0, cosineSim(queryEmbedding, tool.embedding)) : 0

      // Hard semantic gate — drop obvious topic mismatches before keyword
      // can save them. Tools without an embedding (shouldn't happen post-
      // backfill) skip the gate so they aren't penalised twice.
      if (tool.embedding && sem < semanticGate) continue

      const kw      = keywordScore[tool.id] ?? 0
      const normSem = sem
      const normKw  = Math.min(1, kw / kwSaturation)
      let score     = semanticWeight * normSem + keywordWeight * normKw

      // Category alignment penalty: scale down tools whose category is far
      // from the query's semantic centre. Quadratic curve (alignment²) so
      // the penalty bites harder for middle-aligned categories — flat
      // enough at the top that the best-fit category gets no penalty, but
      // sharp enough through the middle that "second-best" categories are
      // clearly worse. Range [0.45, 1.0].
      const catSim = catSimById[catId] ?? 0
      const catAlignment = (catSim - catSimMin) / catSimRange
      score *= 0.45 + 0.55 * catAlignment * catAlignment

      if (score < scoreFloor) continue

      results.push({ tool, catId, catName, score })
    }
  }

  const sorted = results.sort((a, b) => b.score - a.score)

  // Relative gap filter: cut tools clearly worse than the best. For
  // "build apps" the gap to Buildots is ~30% so it gets cut, but for
  // "edit videos for tiktok" all five tools sit within 15% of the top
  // so they survive.
  const top = sorted[0]?.score ?? 0
  const cutoff = top * gapThreshold
  const filtered = sorted.filter(r => r.score >= cutoff)

  return limit > 0 ? filtered.slice(0, limit) : filtered
}

export function scoreTools(query: string, tools: ToolsMap, categories: Category[], limit = 7): Result[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  const { words, phrases, categoryBias } = extractSignals(q)
  if (!words.length && !phrases.length) return []

  const results: Result[] = []

  for (const [catId, catTools] of Object.entries(tools)) {
    const catName = categories.find(c => c.id === catId)?.name ?? catId
    const catCue = (categoryBias[catId] ?? 0)

    for (const tool of catTools) {
      let score = 0
      const name = tool.name.toLowerCase()
      const tagline = tool.tagline.toLowerCase()
      const desc = tool.desc.toLowerCase()
      const tags = tool.tags.map(t => t.toLowerCase()).join(' ')
      const cat = catName.toLowerCase()
      const haystack = `${tagline} ${tags} ${desc}`

      // Phrase hits — strong signal, even on long queries.
      for (const p of phrases) {
        if (haystack.includes(p)) score += 60
      }

      // Word hits — capped per word so common words can't dominate.
      // Names use substring matching (intentional: "gpt" finds "ChatGPT").
      // All other fields use word-boundary matching to prevent false hits
      // like "sure" matching inside "ensure".
      for (const w of words) {
        let wordScore = 0
        if (name === w)                wordScore += 120
        else if (name.startsWith(w))   wordScore += 80
        else if (name.includes(w))     wordScore += 50
        if (wordInText(w, tagline))    wordScore += 30
        if (wordInText(w, tags))       wordScore += 35
        if (wordInText(w, desc))       wordScore += 10
        if (wordInText(w, cat))        wordScore += 25
        score += wordScore
      }

      // Category-context boost: if query implies this category, lift the
      // tool by a multiplier so detailed queries don't get overwhelmed by
      // off-category coincidental keyword hits.
      if (catCue > 0 && score > 0) score *= (1 + catCue * 0.30)

      // Require a minimum score to filter out pure coincidental description
      // matches (score 10 each). A meaningful hit should reach a tagline (30),
      // tag (35), or name (50+) to be surfaced.
      if (score >= 20) results.push({ tool, catId, catName, score })
    }
  }

  // Length normalisation: if the query was long, the absolute scores are
  // higher across the board — but the *relative* ordering is what matters.
  // No explicit normalisation needed since we only care about ranking.
  const sorted = results.sort((a, b) => b.score - a.score)
  return limit > 0 ? sorted.slice(0, limit) : sorted
}
