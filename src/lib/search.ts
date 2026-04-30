import { TOOLS, CATEGORIES, Tool } from '@/data/tools'

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

export function scoreTools(query: string, limit = 7): Result[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  const { words, phrases, categoryBias } = extractSignals(q)
  if (!words.length && !phrases.length) return []

  const results: Result[] = []

  for (const [catId, tools] of Object.entries(TOOLS)) {
    const catName = CATEGORIES.find(c => c.id === catId)?.name ?? catId
    const catCue = (categoryBias[catId] ?? 0)

    for (const tool of tools) {
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
      for (const w of words) {
        let wordScore = 0
        if (name === w)              wordScore += 120
        else if (name.startsWith(w)) wordScore += 80
        else if (name.includes(w))   wordScore += 50
        if (tagline.includes(w))     wordScore += 30
        if (tags.includes(w))        wordScore += 35
        if (desc.includes(w))        wordScore += 10
        if (cat.includes(w))         wordScore += 25
        score += wordScore
      }

      // Category-context boost: if query implies this category, lift the
      // tool by a multiplier so detailed queries don't get overwhelmed by
      // off-category coincidental keyword hits.
      if (catCue > 0 && score > 0) score *= (1 + catCue * 0.30)

      if (score > 0) results.push({ tool, catId, catName, score })
    }
  }

  // Length normalisation: if the query was long, the absolute scores are
  // higher across the board — but the *relative* ordering is what matters.
  // No explicit normalisation needed since we only care about ranking.
  const sorted = results.sort((a, b) => b.score - a.score)
  return limit > 0 ? sorted.slice(0, limit) : sorted
}
