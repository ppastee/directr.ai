import type { ToolsMap } from './db'
import type { Category } from '@/data/tools'

// QWERTY keyboard adjacency — adjacent keys get reduced substitution cost (0.5 vs 1.0)
// This makes "videa" → "video" cheaper than a random transposition would imply.
const ADJACENCY: Record<string, string> = {
  q:'wa',      w:'qeasd',   e:'wrsdf',   r:'etdfg',   t:'ryfgh',
  y:'tughj',   u:'yihjk',   i:'uojkl',   o:'ipkl',    p:'ol',
  a:'qwsz',    s:'awedxz',  d:'serfcx',  f:'drtgvc',  g:'ftyhbv',
  h:'gyujnb',  j:'huikmn',  k:'jiolm',   l:'kop',
  z:'asx',     x:'zsdc',    c:'xdfv',    v:'cfgb',     b:'vghn',
  n:'bhjm',    m:'njk',
}

function adjacentKey(a: string, b: string): boolean {
  return !!(ADJACENCY[a]?.includes(b) || ADJACENCY[b]?.includes(a))
}

// Optimal String Alignment distance with:
// - Adjacent-key substitutions cost 0.5  (likely finger typo)
// - Regular substitutions cost 1.0
// - Transpositions cost 1.0             (finger-swap typo: "teh" → "the")
// - Early row-min exit when best possible score exceeds maxDist
function editDistance(a: string, b: string, maxDist: number): number {
  if (Math.abs(a.length - b.length) > maxDist) return maxDist + 1
  const m = a.length, n = b.length
  // Full 2-D table (words are ≤15 chars — at most 256 cells, negligible cost)
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  )
  for (let i = 1; i <= m; i++) {
    let rowMin = Infinity
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        const sub = adjacentKey(a[i - 1], b[j - 1]) ? 0.5 : 1
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,            // deletion
          dp[i][j - 1] + 1,            // insertion
          dp[i - 1][j - 1] + sub,      // substitution
        )
        // Transposition (OSA — only valid when no previous edit interferes)
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1)
        }
      }
      rowMin = Math.min(rowMin, dp[i][j])
    }
    if (rowMin > maxDist) return maxDist + 1 // prune early
  }
  return dp[m][n]
}

// ── Static vocabulary ──────────────────────────────────────────────────────
// All words a user is likely to type when searching for AI tools.
// Includes category cue words, phrase intent words, common verbs/nouns.
const BASE_VOCAB: string[] = [
  // Creation verbs
  'make','create','generate','build','design','produce','edit','render',
  'animate','write','code','develop','record','capture','transcribe',
  'convert','transform','export','publish','deploy','automate','clone',
  'train','summarize','analyse','analyze','extract','detect','remove',
  'replace','enhance','upscale','resize','compress','translate','narrate',
  'dub','subtitle','caption','draft','outline','proofread','schedule',
  'track','manage','search','browse','compare','synthesize','stream',
  'scrape','parse','classify','label','annotate','moderate','score',
  // Media / output types
  'video','image','photo','audio','music','voice','text','animation',
  'model','avatar','website','app','presentation','document','spreadsheet',
  'podcast','reel','short','clip','footage','film','movie','thumbnail',
  'logo','icon','illustration','art','artwork','headshot','portrait',
  'background','script','article','blog','essay','copy','email',
  'newsletter','caption','tweet','post','ad','banner','slide','deck',
  'report','invoice','contract','chart','graph','dashboard','dataset',
  'workflow','template','resume','song','track','voiceover','memo',
  'pitch','proposal','brief','summary','transcript','subtitle','dub',
  // Platforms and contexts
  'tiktok','youtube','instagram','linkedin','twitter','facebook','slack',
  'notion','figma','canva','shopify','wordpress','webflow','github',
  'google','discord','zoom','teams','salesforce','hubspot','stripe',
  // Features and attributes
  'free','fast','cheap','professional','studio','quality','realistic',
  'watermark','api','bulk','batch','unlimited','commercial','open-source',
  'privacy','secure','multilingual','realtime','offline','cloud','local',
  // Category names (users often type these)
  'animation','image','writing','coding','audio','chat','productivity',
  'marketing','finance','accounting','legal','education','construction',
  'data','hiring','recruitment','analytics',
  // Category cue words (from CATEGORY_CUES in search.ts)
  'animate','reels','youtube','footage','picture','poster','visual',
  'novel','headline','tagline','program','developer','frontend',
  'backend','builder','tracker','mobile','song','dub','dubbing','tts',
  'assistant','answer','question','reasoning','research','meeting',
  'meetings','calendar','task','tasks','outreach','stock','stocks',
  'portfolio','invest','investing','trade','trading','etf','retirement',
  'bookkeeping','receipt','receipts','ledger','quickbooks','xero',
  'lawyer','attorney','clause','nda','litigation','recruit','recruiting',
  'hire','hiring','candidate','candidates','interview','onboard',
  'onboarding','site','blueprint','blueprints','rfi','bim','crane',
  'takeoff','sql','csv','learn','learning','tutor','tutoring','study',
  'student','studying','course','quiz','flashcard',
  // Phrase intent words (from PHRASE_INTENT in search.ts)
  'speech','synthesis','social','media','form','deep','meeting','notes',
  'explainer','training','landing','page','concept','product','launch',
  'demo','shot','shots','stack','full','web','mobile','game','unity',
  'unreal','engine','asset','assets','research','paper','analysis',
  'planning','optimization','sourcing','description','management',
  'documentation','lesson','plan','language','flash','cards',
  // Common adjectives and qualifiers
  'best','top','good','great','cheap','quick','easy','simple','powerful',
  'advanced','smart','intelligent','custom','automated','instant','live',
  'batch','high','low','real','time','large','small','enterprise','solo',
  // Common prepositions / conjunctions / stopwords (must NOT be corrected)
  'for','the','and','but','not','with','from','into','that','this',
  'then','when','what','how','who','which','than','also','just',
  'more','some','have','will','your','about','like','without',
]

export interface SpellCorrection {
  original: string
  corrected: string
}

export interface CorrectionResult {
  corrected: string
  corrections: SpellCorrection[]
  wasChanged: boolean
}

// Build deduplicated vocabulary structures from live tools data + base vocab.
// Call once when tools/categories load; results should be memoized by caller.
export function buildVocabulary(tools: ToolsMap, categories: Category[]): { set: Set<string>; list: string[] } {
  const words = new Set<string>(BASE_VOCAB)

  for (const cat of categories) {
    words.add(cat.id)
    for (const w of cat.name.toLowerCase().split(/\s+/)) words.add(w)
  }

  for (const catTools of Object.values(tools)) {
    for (const tool of catTools) {
      for (const w of tool.name.toLowerCase().split(/[\s\-_]+/)) words.add(w)
      for (const tag of tool.tags) {
        for (const w of tag.toLowerCase().split(/[\s\-_]+/)) words.add(w)
      }
      // First word of tagline (usually the core verb or noun)
      const firstWord = tool.tagline.toLowerCase().split(/\s+/)[0]
      if (firstWord) words.add(firstWord)
    }
  }

  // Keep only multi-char alphabetic words (numbers and single chars are noise)
  const list = Array.from(words).filter(w => w.length >= 2 && /^[a-z]/.test(w))
  return { set: new Set(list), list }
}

// Max edit distance allowed based on word length.
// Shorter words need tighter thresholds to avoid false corrections.
function maxDist(len: number): number {
  if (len <= 2) return 0  // never correct: too many valid short words
  if (len <= 4) return 1  // "mak" → "make", "vide" → "video"
  return 2                // "videa" → "video", "animte" → "animate"
}

// Find the best vocabulary match for a single misspelled token.
// Returns null if the word is already known or no confident correction exists.
function correctWord(
  word: string,
  vocabSet: Set<string>,
  vocabList: string[],
): string | null {
  if (word.length <= 2) return null
  if (vocabSet.has(word)) return null    // already a known word

  const threshold = maxDist(word.length)
  if (threshold === 0) return null

  let best: string | null = null
  let bestDist = threshold + 1
  let bestLen = 0

  for (const candidate of vocabList) {
    // Fast length pre-filter
    if (Math.abs(candidate.length - word.length) > threshold) continue
    const d = editDistance(word, candidate, threshold)
    // Prefer smaller distance; break ties by preferring longer (more specific) candidate
    if (d < bestDist || (d === bestDist && candidate.length > bestLen)) {
      bestDist = d
      best = candidate
      bestLen = candidate.length
    }
  }

  return bestDist <= threshold ? best : null
}

// Correct a full query, returning the corrected string and the list of changes made.
export function correctQuery(
  query: string,
  vocabSet: Set<string>,
  vocabList: string[],
): CorrectionResult {
  const raw = query.toLowerCase().trim()
  const tokens = raw.replace(/[^a-z0-9 \-]/g, ' ').split(/\s+/).filter(Boolean)
  const corrections: SpellCorrection[] = []

  const correctedTokens = tokens.map(token => {
    // Skip pure numbers
    if (/^\d+$/.test(token)) return token
    const fix = correctWord(token, vocabSet, vocabList)
    if (fix && fix !== token) {
      corrections.push({ original: token, corrected: fix })
      return fix
    }
    return token
  })

  const corrected = correctedTokens.join(' ')
  return { corrected, corrections, wasChanged: corrections.length > 0 }
}
