import { scoreTools, Result } from './search'
import { Tool } from '@/data/tools'

export interface Question {
  id: string
  text: string
  options: { value: string; label: string }[]
}

export interface WizardResult {
  tool: Tool
  catId: string
  catName: string
  baseScore: number
  adjustedScore: number
  mismatches: string[]
  strengths: string[]
}

// ── Question bank ──────────────────────────────────────────────────────────

const BUDGET_QUESTION: Question = {
  id: 'budget',
  text: "What's your budget?",
  options: [
    { value: 'free',  label: 'Free only' },
    { value: 'low',   label: 'Under $20/mo' },
    { value: 'any',   label: "Price isn't a concern" },
  ],
}

const SKILL_QUESTION: Question = {
  id: 'skill',
  text: 'How technical are you?',
  options: [
    { value: 'none', label: 'Not technical' },
    { value: 'some', label: 'Some experience' },
    { value: 'dev',  label: "I'm a developer" },
  ],
}

const CATEGORY_QUESTIONS: Record<string, Question> = {
  animation: {
    id: 'use_case',
    text: 'What are you creating?',
    options: [
      { value: 'marketing', label: 'Marketing content' },
      { value: 'social',    label: 'Social media' },
      { value: 'training',  label: 'Training videos' },
      { value: 'personal',  label: 'Personal project' },
    ],
  },
  image: {
    id: 'use_case',
    text: 'What kind of images?',
    options: [
      { value: 'realistic',   label: 'Photorealistic' },
      { value: 'art',         label: 'Art / Illustration' },
      { value: 'product',     label: 'Product shots' },
      { value: 'nowatermark', label: 'No watermark needed' },
    ],
  },
  writing: {
    id: 'use_case',
    text: 'What are you writing?',
    options: [
      { value: 'marketing', label: 'Marketing copy' },
      { value: 'blog',      label: 'Blog articles' },
      { value: 'technical', label: 'Technical docs' },
      { value: 'creative',  label: 'Creative writing' },
    ],
  },
  coding: {
    id: 'use_case',
    text: 'What are you building?',
    options: [
      { value: 'webapp',   label: 'Web app' },
      { value: 'automate', label: 'Automate tasks' },
      { value: 'debug',    label: 'Debug / review code' },
      { value: 'learn',    label: 'Learn to code' },
    ],
  },
  audio: {
    id: 'use_case',
    text: 'What do you need audio for?',
    options: [
      { value: 'tts',       label: 'Text to speech' },
      { value: 'music',     label: 'Generate music' },
      { value: 'transcribe',label: 'Transcribe meetings' },
      { value: 'sfx',       label: 'Sound effects' },
    ],
  },
  chat: {
    id: 'use_case',
    text: 'What do you need it for?',
    options: [
      { value: 'research', label: 'Research & analysis' },
      { value: 'coding',   label: 'Coding help' },
      { value: 'writing',  label: 'Writing assistance' },
      { value: 'general',  label: 'General assistant' },
    ],
  },
  '3d': {
    id: 'use_case',
    text: 'What are you creating?',
    options: [
      { value: 'models',     label: '3D models' },
      { value: 'product',    label: 'Product visualization' },
      { value: 'scene',      label: 'Scenes / Environments' },
      { value: 'characters', label: 'Characters' },
    ],
  },
  productivity: {
    id: 'use_case',
    text: 'What do you want to automate?',
    options: [
      { value: 'meetings',  label: 'Meeting notes' },
      { value: 'workflows', label: 'Workflows' },
      { value: 'writing',   label: 'Writing tasks' },
      { value: 'data',      label: 'Data processing' },
    ],
  },
}

export function getQuestionsForQuery(query: string): Question[] {
  const results = scoreTools(query, 0)

  // Tally scores by category to find the dominant intent
  const catScores: Record<string, number> = {}
  for (const r of results) {
    catScores[r.catId] = (catScores[r.catId] ?? 0) + r.score
  }
  const topCat = Object.entries(catScores).sort((a, b) => b[1] - a[1])[0]?.[0]

  const qs: Question[] = []
  if (topCat && CATEGORY_QUESTIONS[topCat]) qs.push(CATEGORY_QUESTIONS[topCat])
  qs.push(BUDGET_QUESTION)
  qs.push(SKILL_QUESTION)
  return qs.slice(0, 3)
}

// ── Answer-based score adjustment ──────────────────────────────────────────

const USE_CASE_KEYWORDS: Record<string, string[]> = {
  marketing:  ['corporate', 'marketing', 'business', 'ads', 'brand'],
  social:     ['social media', 'content creation', 'short-form', 'reels'],
  training:   ['corporate', 'multilingual', 'e-learning', 'lms'],
  personal:   ['creative', 'hobbyist'],
  realistic:  ['photorealistic', 'realistic', 'photo', 'photography'],
  art:        ['illustration', 'artistic', 'art', 'creative', 'concept art'],
  product:    ['product', 'e-commerce', 'commercial', '3d'],
  nowatermark:[],
  blog:       ['blog', 'seo', 'long-form', 'content'],
  technical:  ['technical', 'documentation', 'api', 'developer'],
  creative:   ['creative', 'fiction', 'storytelling', 'narrative'],
  webapp:     ['web', 'frontend', 'deployment', 'full-stack', 'react'],
  automate:   ['automation', 'scripting', 'devops', 'workflows'],
  debug:      ['debugging', 'code review', 'refactoring'],
  learn:      ['learning', 'education', 'beginner', 'tutorial'],
  tts:        ['text-to-speech', 'voice synthesis', 'voice', 'tts'],
  music:      ['music', 'composition', 'audio', 'beats', 'song'],
  transcribe: ['transcription', 'meeting notes', 'speech-to-text'],
  sfx:        ['sound effects', 'sfx'],
  research:   ['research', 'analysis', 'data', 'deep research'],
  coding:     ['coding', 'programming', 'code completion', 'autocomplete'],
  writing:    ['writing', 'copywriting', 'content', 'text'],
  general:    [],
  meetings:   ['transcription', 'meeting notes', 'summaries', 'notetaking'],
  workflows:  ['automation', 'workflows', 'integrations'],
  data:       ['data', 'analysis', 'processing', 'spreadsheet'],
  models:     ['3d modeling', '3d', 'mesh', 'modeling'],
  scene:      ['environment', 'scene', '3d', 'rendering'],
  characters: ['character', 'avatar', 'humanoid', 'figure'],
}

function parseMonthlyPrice(price: string): number {
  const m = price.match(/\$(\d+(?:\.\d+)?)\s*\/mo/i)
  return m ? parseFloat(m[1]) : Infinity
}

function applyWeights(r: Result, answers: Record<string, string>): WizardResult {
  let mult = 1
  const mismatches: string[] = []
  const strengths: string[] = []

  const { budget, skill, use_case: useCase } = answers

  if (budget === 'free') {
    if (r.tool.freeTierLabel === 'Free') {
      mult *= 2.0; strengths.push('Genuinely free')
    } else if (r.tool.freeTierLabel === 'Free tier available') {
      mult *= 1.2; strengths.push('Free tier available')
    } else if (r.tool.freeTierLabel === 'Free trial') {
      mult *= 0.85
    } else {
      mult *= 0.65; mismatches.push('No free tier')
    }
  } else if (budget === 'low') {
    const monthly = parseMonthlyPrice(r.tool.price)
    if (r.tool.freeTierLabel === 'Free') {
      mult *= 1.8; strengths.push('Genuinely free')
    } else if (monthly <= 20) {
      mult *= 1.4
    } else if (monthly !== Infinity) {
      mismatches.push(`Starts at ${r.tool.price.replace('From ', '')}`)
    }
  }

  if (skill === 'dev' && r.tool.apiAccess) {
    mult *= 1.35; strengths.push('API access')
  } else if (skill === 'none' && !r.tool.apiAccess) {
    mult *= 1.1
  }

  if (useCase) {
    if (useCase === 'nowatermark') {
      if (!r.tool.watermark) {
        mult *= 2.0; strengths.push('No watermark')
      } else {
        mult *= 0.6; mismatches.push('Adds watermark')
      }
    } else {
      const kws = USE_CASE_KEYWORDS[useCase] ?? []
      const haystack = [
        ...r.tool.tags.map(t => t.toLowerCase()),
        r.tool.tagline.toLowerCase(),
        r.tool.desc.toLowerCase(),
      ].join(' ')
      if (kws.some(k => haystack.includes(k))) mult *= 1.35
    }
  }

  // Passive strengths
  if (r.tool.rating >= 4.8 && r.tool.reviews >= 500) strengths.push(`Rated ${r.tool.rating}/5`)
  if (!r.tool.watermark && !strengths.includes('No watermark') && !useCase) strengths.push('No watermark')

  return {
    tool: r.tool,
    catId: r.catId,
    catName: r.catName,
    baseScore: r.score,
    adjustedScore: r.score * mult,
    mismatches,
    strengths: strengths.slice(0, 2),
  }
}

export function getWizardResults(query: string, answers: Record<string, string>): WizardResult[] {
  const base = scoreTools(query, 0)
  if (!base.length) return []
  return base
    .map(r => applyWeights(r, answers))
    .sort((a, b) => b.adjustedScore - a.adjustedScore)
    .slice(0, 5)
}
