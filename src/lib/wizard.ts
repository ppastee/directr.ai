import { scoreTools, extractSignals, Result } from './search'
import { Tool, Category } from '@/data/tools'
import type { ToolsMap } from './db'

export { extractSignals }

export interface QuestionOption {
  value: string
  label: string
  hint?: string
}

export interface Question {
  id: string
  text: string
  helper?: string
  options: QuestionOption[]
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

export interface WizardPlan {
  questions: Question[]
  // Answers we inferred from the query before asking — surfaced to the UI
  // so it can show "we already know X about you" and skip redundant Qs.
  prefilled: Record<string, { value: string; reason: string }>
  topCategoryId: string | null
  topCategoryName: string | null
  candidateCount: number
  // True when the query has no recognisable category or tool signal.
  // The UI should show a "no results" message rather than irrelevant questions.
  noIntent: boolean
}

// ── Universal questions ────────────────────────────────────────────────────

const BUDGET_QUESTION: Question = {
  id: 'budget',
  text: "What's your budget?",
  helper: 'We weight free and low-cost tools higher when budget is tight.',
  options: [
    { value: 'free',   label: 'Free only',         hint: 'Genuinely free or generous free tier' },
    { value: 'low',    label: 'Under $20/mo',      hint: 'Personal or small-team tier' },
    { value: 'mid',    label: 'Under $50/mo',      hint: 'Pro tiers, more output' },
    { value: 'any',    label: "Price isn't a concern", hint: 'Show the best regardless of price' },
  ],
}

const SKILL_QUESTION: Question = {
  id: 'skill',
  text: 'How technical are you?',
  helper: 'Affects whether we surface developer-focused tools and APIs.',
  options: [
    { value: 'none', label: 'Not technical',     hint: 'I want it to just work' },
    { value: 'some', label: 'Some experience',   hint: 'Comfortable with web tools' },
    { value: 'dev',  label: "I'm a developer",   hint: 'Give me APIs, CLIs, scripts' },
  ],
}

const URGENCY_QUESTION: Question = {
  id: 'urgency',
  text: 'How fast do you need this?',
  helper: 'Speed often trades off against quality and control.',
  options: [
    { value: 'now',     label: 'Right now',     hint: 'Need output today' },
    { value: 'week',    label: 'This week',     hint: 'Some learning curve OK' },
    { value: 'longterm',label: 'Long term',     hint: 'Worth investing in setup' },
  ],
}

// ── Category-specific questions ────────────────────────────────────────────

const CATEGORY_QUESTIONS: Record<string, Question[]> = {
  animation: [
    {
      id: 'use_case',
      text: "What kind of video are you making?",
      helper: 'Different tools dominate different use cases.',
      options: [
        { value: 'marketing', label: 'Marketing / Product demo', hint: 'Polished output for promotion' },
        { value: 'social',    label: 'Social media / Short clips', hint: 'TikTok, Reels, YouTube Shorts' },
        { value: 'training',  label: 'Training / Corporate',     hint: 'Multilingual, internal use' },
        { value: 'creative',  label: 'Creative / Cinematic',     hint: 'Film-style or artistic' },
      ],
    },
    {
      id: 'duration',
      text: 'How long is the output?',
      options: [
        { value: 'clip',  label: 'Under 30 seconds' },
        { value: 'short', label: '30 sec – 2 min' },
        { value: 'long',  label: '2 – 10 min' },
        { value: 'film',  label: 'Longer than 10 min' },
      ],
    },
    {
      id: 'realism',
      text: 'How realistic does it need to look?',
      options: [
        { value: 'cinematic', label: 'Photorealistic / Cinematic' },
        { value: 'avatar',    label: 'AI presenter / Talking head' },
        { value: 'stylized',  label: 'Stylized / Animated' },
        { value: 'doesntmatter', label: "Doesn't matter" },
      ],
    },
  ],
  image: [
    {
      id: 'use_case',
      text: 'What kind of images?',
      options: [
        { value: 'realistic',   label: 'Photorealistic',         hint: 'Photo-grade output' },
        { value: 'art',         label: 'Art / Illustration',     hint: 'Painterly, concept art' },
        { value: 'product',     label: 'Product shots / Mockups', hint: 'Commercial, e-commerce' },
        { value: 'graphic',     label: 'Graphics with text',     hint: 'Posters, ads, logos' },
      ],
    },
    {
      id: 'commercial',
      text: 'Will you use these commercially?',
      helper: 'Some models train on copyrighted data — matters for client work.',
      options: [
        { value: 'commercial', label: 'Yes, for clients or ads', hint: 'Need IP-clean output' },
        { value: 'personal',   label: 'Personal projects only' },
        { value: 'unsure',     label: 'Not sure yet' },
      ],
    },
    {
      id: 'watermark',
      text: 'Watermark on outputs?',
      options: [
        { value: 'nowatermark', label: 'Must be clean (no watermark)' },
        { value: 'okay',        label: 'Watermark is fine' },
      ],
    },
  ],
  writing: [
    {
      id: 'use_case',
      text: 'What are you writing?',
      options: [
        { value: 'marketing', label: 'Marketing / Ad copy' },
        { value: 'blog',      label: 'Blog articles / SEO content' },
        { value: 'technical', label: 'Technical docs / Reports' },
        { value: 'creative',  label: 'Fiction / Creative writing' },
      ],
    },
    {
      id: 'volume',
      text: 'How much do you write?',
      options: [
        { value: 'oneoff',  label: 'A one-off piece' },
        { value: 'regular', label: 'A few pieces a week' },
        { value: 'high',    label: 'High volume / At scale' },
      ],
    },
    {
      id: 'voice',
      text: 'Brand voice control?',
      helper: 'Some tools let you train on your existing writing.',
      options: [
        { value: 'critical', label: 'Critical — must sound like us' },
        { value: 'nice',     label: 'Nice to have' },
        { value: 'no',       label: "Doesn't matter" },
      ],
    },
  ],
  coding: [
    {
      id: 'use_case',
      text: 'How do you want to code with AI?',
      options: [
        { value: 'ide',     label: 'Inside my IDE',           hint: 'Plugin in VS Code, JetBrains' },
        { value: 'agent',   label: 'Standalone agent',         hint: 'Cursor, Windsurf, full-IDE' },
        { value: 'cli',     label: 'In the terminal',          hint: 'Claude Code, agentic CLI' },
        { value: 'browser', label: 'In the browser',           hint: 'Bolt, Lovable, v0' },
      ],
    },
    {
      id: 'project',
      text: 'What are you building?',
      options: [
        { value: 'webapp',   label: 'Web app or website' },
        { value: 'mobile',   label: 'Mobile app' },
        { value: 'scripts',  label: 'Scripts / Automation' },
        { value: 'data',     label: 'Data / ML / Analysis' },
      ],
    },
    {
      id: 'privacy',
      text: 'Code privacy needs?',
      options: [
        { value: 'cloud',   label: 'Cloud is fine',         hint: 'Most tools work this way' },
        { value: 'private', label: 'Must stay private',     hint: 'On-prem or self-hosted' },
      ],
    },
  ],
  audio: [
    {
      id: 'use_case',
      text: 'What kind of audio?',
      options: [
        { value: 'tts',        label: 'Voiceover / TTS',          hint: 'Generate spoken voice' },
        { value: 'music',      label: 'Music / Songs',            hint: 'Generate full tracks' },
        { value: 'transcribe', label: 'Transcription / Captions', hint: 'Speech to text' },
        { value: 'enhance',    label: 'Enhance / Clean audio',    hint: 'Noise removal, mastering' },
      ],
    },
    {
      id: 'quality',
      text: 'Quality bar?',
      options: [
        { value: 'production', label: 'Production-ready',     hint: 'Broadcast or podcast use' },
        { value: 'good',       label: 'Good enough',          hint: 'Internal or social' },
        { value: 'draft',      label: 'Quick draft',          hint: 'Just iterating' },
      ],
    },
    {
      id: 'cloning',
      text: 'Need voice cloning?',
      options: [
        { value: 'yes', label: 'Yes — clone my voice' },
        { value: 'no',  label: 'No, stock voices are fine' },
      ],
    },
  ],
  chat: [
    {
      id: 'use_case',
      text: 'What will you mostly use it for?',
      options: [
        { value: 'research',  label: 'Research & analysis',     hint: 'Long documents, citations' },
        { value: 'coding',    label: 'Coding help' },
        { value: 'writing',   label: 'Writing & editing' },
        { value: 'general',   label: 'General assistant' },
      ],
    },
    {
      id: 'context',
      text: 'Document handling?',
      helper: 'Some chat tools are much better at long-context tasks.',
      options: [
        { value: 'longdoc',  label: 'Yes — long PDFs, books' },
        { value: 'shortdoc', label: 'Sometimes — short files' },
        { value: 'nodoc',    label: "No, just chat" },
      ],
    },
    {
      id: 'citations',
      text: 'Need verified citations?',
      options: [
        { value: 'yes', label: 'Yes — must cite sources' },
        { value: 'no',  label: "No, I'll fact-check" },
      ],
    },
  ],
  '3d': [
    {
      id: 'use_case',
      text: 'What are you making?',
      options: [
        { value: 'gameasset', label: 'Game asset',         hint: 'Game-ready meshes' },
        { value: 'product',   label: 'Product visualization', hint: 'PBR materials, renders' },
        { value: 'character', label: 'Characters / Avatars' },
        { value: 'scene',     label: 'Scenes / Environments' },
      ],
    },
    {
      id: 'source',
      text: "What's your starting point?",
      options: [
        { value: 'text',   label: 'Text description' },
        { value: 'image',  label: 'A 2D image' },
        { value: 'video',  label: 'Video / Motion' },
      ],
    },
    {
      id: 'engine',
      text: 'Target engine or format?',
      options: [
        { value: 'unity',   label: 'Unity / Unreal' },
        { value: 'web',     label: 'Web / WebGL' },
        { value: 'render',  label: 'Renders only' },
        { value: 'any',     label: 'Any / Export options' },
      ],
    },
  ],
  productivity: [
    {
      id: 'use_case',
      text: 'What do you want to automate?',
      options: [
        { value: 'meetings',    label: 'Meeting notes / Transcripts' },
        { value: 'workflows',   label: 'Cross-app workflows' },
        { value: 'docs',        label: 'Notes & knowledge base' },
        { value: 'scheduling',  label: 'Calendar & scheduling' },
      ],
    },
    {
      id: 'team',
      text: 'How big is your team?',
      options: [
        { value: 'solo',  label: 'Just me' },
        { value: 'small', label: 'Small team (2–20)' },
        { value: 'large', label: 'Larger team or company' },
      ],
    },
    {
      id: 'stack',
      text: 'Main tool stack?',
      options: [
        { value: 'google',    label: 'Google Workspace' },
        { value: 'microsoft', label: 'Microsoft 365' },
        { value: 'notion',    label: 'Notion / Slack' },
        { value: 'mixed',     label: 'Mix of everything' },
      ],
    },
  ],
  marketing: [
    {
      id: 'use_case',
      text: "What's the goal?",
      options: [
        { value: 'ads',       label: 'Run paid ads' },
        { value: 'social',    label: 'Manage social media' },
        { value: 'listening', label: 'Brand listening / Sentiment' },
        { value: 'content',   label: 'Repurpose content' },
      ],
    },
    {
      id: 'channel',
      text: 'Primary channel?',
      options: [
        { value: 'meta',     label: 'Meta (Facebook, Instagram)' },
        { value: 'google',   label: 'Google ads / Search' },
        { value: 'linkedin', label: 'LinkedIn / B2B' },
        { value: 'multi',    label: 'Multi-channel' },
      ],
    },
    {
      id: 'team',
      text: 'Team size?',
      options: [
        { value: 'solo',  label: 'Solo / Founder' },
        { value: 'small', label: 'Small team' },
        { value: 'large', label: 'Agency or enterprise' },
      ],
    },
  ],
  finance: [
    {
      id: 'use_case',
      text: 'What are you trying to do?',
      options: [
        { value: 'portfolio', label: 'Manage my portfolio' },
        { value: 'research',  label: 'Stock research' },
        { value: 'trading',   label: 'Algorithmic trading' },
        { value: 'enterprise',label: 'Enterprise market intelligence' },
      ],
    },
    {
      id: 'level',
      text: 'How experienced?',
      options: [
        { value: 'beginner', label: 'New to investing' },
        { value: 'serious',  label: 'Serious retail' },
        { value: 'pro',      label: 'Professional / Institutional' },
      ],
    },
  ],
  accounting: [
    {
      id: 'use_case',
      text: "What's the workflow?",
      options: [
        { value: 'bookkeeping', label: 'Bookkeeping / Day-to-day' },
        { value: 'ap',          label: 'Accounts payable / Invoices' },
        { value: 'audit',       label: 'Audit / Risk' },
        { value: 'receipts',    label: 'Receipt & expense capture' },
      ],
    },
    {
      id: 'scale',
      text: 'Company size?',
      options: [
        { value: 'small',      label: 'Small business / Sole trader' },
        { value: 'midmarket',  label: 'Mid-market' },
        { value: 'enterprise', label: 'Enterprise' },
      ],
    },
  ],
  legal: [
    {
      id: 'use_case',
      text: 'Main need?',
      options: [
        { value: 'contracts', label: 'Contract review / Drafting' },
        { value: 'research',  label: 'Legal research' },
        { value: 'practice',  label: 'Practice management' },
        { value: 'consumer',  label: 'Consumer / Personal legal' },
      ],
    },
    {
      id: 'firm',
      text: 'Where do you work?',
      options: [
        { value: 'inhouse',  label: 'In-house counsel' },
        { value: 'biglaw',   label: 'Big law firm' },
        { value: 'small',    label: 'Small / Solo practice' },
        { value: 'individual',label: "I'm not a lawyer" },
      ],
    },
  ],
  hr: [
    {
      id: 'use_case',
      text: 'What stage of the funnel?',
      options: [
        { value: 'sourcing', label: 'Sourcing candidates' },
        { value: 'screening',label: 'Screening / Interviewing' },
        { value: 'jds',      label: 'Writing job descriptions' },
        { value: 'workforce',label: 'Workforce / Talent intelligence' },
      ],
    },
    {
      id: 'volume',
      text: 'Hiring volume?',
      options: [
        { value: 'low',  label: 'A few roles' },
        { value: 'mid',  label: 'Steady pipeline' },
        { value: 'high', label: 'High-volume hiring' },
      ],
    },
  ],
  construction: [
    {
      id: 'use_case',
      text: "What's your role?",
      options: [
        { value: 'estimator', label: 'Takeoff / Estimating' },
        { value: 'pm',        label: 'Project management' },
        { value: 'site',      label: 'Site documentation' },
        { value: 'safety',    label: 'Safety / Productivity' },
      ],
    },
  ],
  data: [
    {
      id: 'use_case',
      text: 'What do you need?',
      options: [
        { value: 'analysis',    label: 'Ad-hoc analysis' },
        { value: 'dashboard',   label: 'Dashboards & BI' },
        { value: 'predictive',  label: 'Predictive / ML' },
        { value: 'spreadsheet', label: 'Smart spreadsheet' },
      ],
    },
    {
      id: 'skill',
      text: 'Comfortable with code?',
      options: [
        { value: 'sql',     label: 'SQL & Python' },
        { value: 'nocode',  label: 'No code only' },
        { value: 'mixed',   label: 'A bit of both' },
      ],
    },
  ],
  education: [
    {
      id: 'use_case',
      text: "Who's it for?",
      options: [
        { value: 'k12',      label: 'K-12 student' },
        { value: 'higher',   label: 'University / Adult learner' },
        { value: 'language', label: 'Language learning' },
        { value: 'creator',  label: "I'm building a course" },
      ],
    },
    {
      id: 'subject',
      text: 'Subject?',
      options: [
        { value: 'math',     label: 'Maths / Science' },
        { value: 'language', label: 'Languages' },
        { value: 'research', label: 'Research / Papers' },
        { value: 'general',  label: 'General study' },
      ],
    },
  ],
}

// ── Auto-inference: detect signals in the query so we can skip questions ───

interface InferenceRule {
  questionId: string
  value: string
  patterns: RegExp[]
  reason: string
}

const INFERENCE_RULES: InferenceRule[] = [
  // Budget
  { questionId: 'budget', value: 'free',
    patterns: [/\bfree\b/, /\bno cost\b/, /\bopen[- ]source\b/, /\bopen[- ]weights?\b/],
    reason: 'You mentioned free' },
  { questionId: 'budget', value: 'any',
    patterns: [/\benterprise\b/, /\bagency\b/, /\bbudget is\b.*\bnot\b/, /\bunlimited budget\b/],
    reason: 'Enterprise / no-budget context' },

  // Skill
  { questionId: 'skill', value: 'dev',
    patterns: [/\bapi\b/, /\bdeveloper\b/, /\bcli\b/, /\bsdk\b/, /\bself[- ]hosted?\b/, /\bopen[- ]source\b/],
    reason: 'Developer-focused query' },
  { questionId: 'skill', value: 'none',
    patterns: [/\bno[- ]code\b/, /\bnon[- ]technical\b/, /\bnot a coder\b/, /\bnot technical\b/],
    reason: 'Non-technical query' },

  // Animation
  { questionId: 'use_case', value: 'marketing',
    patterns: [/\bmarketing\b/, /\bproduct (demo|launch)\b/, /\bad(s|vert)\b/, /\bcommercial\b/],
    reason: 'Marketing context' },
  { questionId: 'use_case', value: 'social',
    patterns: [/\bsocial media\b/, /\btiktok\b/, /\binstagram\b/, /\breels?\b/, /\byoutube shorts?\b/],
    reason: 'Social media context' },
  { questionId: 'use_case', value: 'training',
    patterns: [/\btraining\b/, /\bcorporate\b/, /\bonboarding\b/, /\bemployee\b/, /\binternal\b/],
    reason: 'Training / corporate context' },

  // Image
  { questionId: 'use_case', value: 'realistic',
    patterns: [/\bphotorealistic\b/, /\bphoto[- ]?real\b/, /\bphoto\b/],
    reason: 'Photorealistic intent' },
  { questionId: 'use_case', value: 'art',
    patterns: [/\billustration\b/, /\bconcept art\b/, /\bartwork\b/, /\bpainterly\b/],
    reason: 'Art / illustration intent' },
  { questionId: 'use_case', value: 'product',
    patterns: [/\bproduct (shot|photo|mockup)/, /\be[- ]commerce\b/],
    reason: 'Product imagery' },
  { questionId: 'use_case', value: 'graphic',
    patterns: [/\bposter\b/, /\blogo\b/, /\bicon\b/, /\btext in (image|graphic)/],
    reason: 'Graphic with text' },
  { questionId: 'watermark', value: 'nowatermark',
    patterns: [/\bno watermark\b/, /\bwithout watermark\b/, /\bclean (output|image)/],
    reason: 'No watermark required' },
  { questionId: 'commercial', value: 'commercial',
    patterns: [/\bcommercial\b/, /\bclient(s)?\b/, /\bfor a (client|brand)/],
    reason: 'Commercial use' },

  // Writing
  { questionId: 'use_case', value: 'blog',
    patterns: [/\bblog\b/, /\bseo\b/, /\barticle\b/, /\blong[- ]form\b/],
    reason: 'Long-form / blog' },
  { questionId: 'use_case', value: 'creative',
    patterns: [/\bnovel\b/, /\bfiction\b/, /\bscreenplay\b/, /\bstory\b/],
    reason: 'Creative writing' },

  // Coding
  { questionId: 'use_case', value: 'cli',
    patterns: [/\bcli\b/, /\bterminal\b/, /\bclaude code\b/],
    reason: 'CLI / terminal context' },
  { questionId: 'use_case', value: 'browser',
    patterns: [/\bbrowser[- ]based\b/, /\bbolt\b/, /\blovable\b/, /\bv0\b/],
    reason: 'Browser-based builder' },
  { questionId: 'project', value: 'mobile',
    patterns: [/\bmobile app\b/, /\bios\b/, /\bandroid\b/],
    reason: 'Mobile project' },
  { questionId: 'privacy', value: 'private',
    patterns: [/\bself[- ]hosted?\b/, /\bon[- ]prem\b/, /\bprivate\b/, /\bair[- ]gapped\b/],
    reason: 'Privacy required' },

  // Audio
  { questionId: 'use_case', value: 'tts',
    patterns: [/\btext[- ]to[- ]speech\b/, /\btts\b/, /\bvoice ?over\b/, /\bnarration\b/],
    reason: 'TTS / voiceover' },
  { questionId: 'use_case', value: 'music',
    patterns: [/\bmusic\b/, /\bsong\b/, /\btrack\b/, /\bcompose\b/],
    reason: 'Music generation' },
  { questionId: 'use_case', value: 'transcribe',
    patterns: [/\btranscri\w+/, /\bcaptions?\b/, /\bmeeting notes?\b/],
    reason: 'Transcription' },
  { questionId: 'cloning', value: 'yes',
    patterns: [/\bvoice clon\w+/, /\bclone (my )?voice\b/],
    reason: 'Voice cloning required' },

  // Chat
  { questionId: 'context', value: 'longdoc',
    patterns: [/\blong[- ]?context\b/, /\bbook\b/, /\b(huge|long|large) (pdf|document)/],
    reason: 'Long documents' },
  { questionId: 'citations', value: 'yes',
    patterns: [/\bcitation\b/, /\bcite sources?\b/, /\bverified\b/],
    reason: 'Citations needed' },

  // 3D
  { questionId: 'use_case', value: 'gameasset',
    patterns: [/\bgame (asset|ready)\b/, /\bgame[- ]ready\b/, /\bunity\b/, /\bunreal\b/],
    reason: 'Game asset use' },
  { questionId: 'source', value: 'image',
    patterns: [/\bimage[- ]to[- ]3d\b/, /\bfrom (a|an) (image|photo)/],
    reason: 'Image-to-3D' },
  { questionId: 'engine', value: 'unity',
    patterns: [/\bunity\b/, /\bunreal\b/],
    reason: 'Game engine target' },
  { questionId: 'engine', value: 'web',
    patterns: [/\bwebgl\b/, /\bbrowser\b/, /\bweb[- ]based\b/],
    reason: 'Web target' },
]

function applyInference(query: string): Record<string, { value: string; reason: string }> {
  const q = query.toLowerCase()
  const out: Record<string, { value: string; reason: string }> = {}
  for (const rule of INFERENCE_RULES) {
    if (out[rule.questionId]) continue // first match wins
    if (rule.patterns.some(p => p.test(q))) {
      out[rule.questionId] = { value: rule.value, reason: rule.reason }
    }
  }
  return out
}

// ── Plan the wizard for a query ────────────────────────────────────────────

export function planWizard(query: string, tools: ToolsMap, categories: Category[]): WizardPlan {
  const signals = extractSignals(query)
  const results = scoreTools(query, tools, categories, 0)
  const candidateCount = results.length

  // ── Intent gate ──────────────────────────────────────────────────────────
  // hasCategorySignal: the query contained a recognised category cue or
  //   multi-word phrase (e.g. "animate", "blog post", "voice clone").
  // hasStrongNameMatch: at least one tool name starts with or equals a query
  //   word (score ≥ 80), meaning the user is looking for a specific tool.
  //
  // If neither is true, we have no reliable signal to pick a category or
  // meaningful questions. Return early so the UI shows "no results" instead
  // of asking questions that are completely unrelated to what was typed.
  const hasCategorySignal = Object.keys(signals.categoryBias).length > 0
  const maxScore = candidateCount > 0 ? Math.max(...results.map(r => r.score)) : 0
  const hasStrongNameMatch = maxScore >= 80

  if (!hasCategorySignal && !hasStrongNameMatch) {
    return {
      questions: [],
      prefilled: {},
      topCategoryId: null,
      topCategoryName: null,
      candidateCount: 0,
      noIntent: true,
    }
  }
  // ─────────────────────────────────────────────────────────────────────────

  const catScores: Record<string, number> = {}
  for (const r of results) catScores[r.catId] = (catScores[r.catId] ?? 0) + r.score
  const ranked = Object.entries(catScores).sort((a, b) => b[1] - a[1])
  const topCatId = ranked[0]?.[0] ?? null
  const topCatName = topCatId ? categories.find(c => c.id === topCatId)?.name ?? null : null

  const prefilled = applyInference(query)

  // Only pull category-specific questions when the query itself expressed a
  // category intent. If the match was purely by tool name (e.g. "Midjourney"),
  // skip category questions — the user likely knows the tool already.
  const bank = hasCategorySignal && topCatId && CATEGORY_QUESTIONS[topCatId]
    ? CATEGORY_QUESTIONS[topCatId]
    : []
  const all: Question[] = [...bank, BUDGET_QUESTION, SKILL_QUESTION]

  // Drop any question whose answer was already inferred.
  const remaining = all.filter(q => !prefilled[q.id])

  // If we already inferred 2+ answers, keep the wizard short (3 max).
  // Otherwise allow up to 4 to give the user real refinement room.
  const limit = Object.keys(prefilled).length >= 2 ? 3 : 4
  const questions = remaining.slice(0, limit)

  return {
    questions,
    prefilled,
    topCategoryId: hasCategorySignal ? topCatId : null,
    topCategoryName: hasCategorySignal ? topCatName : null,
    candidateCount,
    noIntent: false,
  }
}

export function getQuestionsForQuery(query: string, tools: ToolsMap, categories: Category[]): Question[] {
  return planWizard(query, tools, categories).questions
}

// ── Answer-based score adjustment ──────────────────────────────────────────

const USE_CASE_KEYWORDS: Record<string, string[]> = {
  marketing:   ['corporate', 'marketing', 'business', 'ads', 'brand', 'commercial', 'promo'],
  social:      ['social media', 'short-form', 'reels', 'shorts', 'tiktok'],
  training:    ['corporate', 'multilingual', 'e-learning', 'lms', 'training'],
  creative:    ['creative', 'cinematic', 'film', 'storytelling'],
  realistic:   ['photorealistic', 'realistic', 'photo', 'photography'],
  art:         ['illustration', 'artistic', 'art', 'concept art', 'painterly'],
  product:     ['product', 'e-commerce', 'commercial', '3d', 'mockup'],
  graphic:     ['poster', 'logo', 'icon', 'brand', 'text rendering'],
  blog:        ['blog', 'seo', 'long-form', 'content marketing'],
  technical:   ['technical', 'documentation', 'api', 'developer'],
  webapp:      ['web', 'frontend', 'deployment', 'full-stack', 'react', 'browser-based'],
  mobile:      ['mobile', 'ios', 'android', 'react native'],
  scripts:     ['automation', 'scripting', 'devops', 'workflows'],
  data:        ['data', 'analysis', 'spreadsheet', 'sql', 'python'],
  ide:         ['ide plugin', 'vs code', 'jetbrains', 'autocomplete'],
  agent:       ['agentic', 'multi-step', 'agent', 'full-codebase'],
  cli:         ['cli', 'terminal', 'agentic'],
  browser:     ['browser-based', 'browser', 'no-install'],
  tts:         ['text-to-speech', 'voice synthesis', 'voice', 'tts', 'voiceover'],
  music:       ['music', 'composition', 'audio', 'song', 'genre control'],
  transcribe:  ['transcription', 'meeting notes', 'speech-to-text', 'subtitles', 'captions'],
  enhance:     ['noise removal', 'speech enhancement', 'mastering', 'cleanup'],
  research:    ['research', 'analysis', 'deep research', 'citations', 'sources'],
  general:     [],
  meetings:    ['transcription', 'meeting', 'summaries', 'notetaking'],
  workflows:   ['automation', 'workflows', 'integrations', '6000+ apps'],
  scheduling:  ['calendar', 'scheduling', 'focus time', 'habits'],
  docs:        ['notes', 'database', 'knowledge base'],
  gameasset:   ['game asset', 'game ready', 'fbx', 'glb'],
  scene:       ['environment', 'scene', '360°', 'skybox'],
  character:   ['character', 'avatar', 'humanoid'],
  sourcing:    ['sourcing', 'candidate', 'outreach'],
  screening:   ['interview', 'assessment', 'screening'],
  jds:         ['job description', 'dei', 'inclusive'],
  workforce:   ['workforce', 'talent intelligence', 'skills'],
  contracts:   ['contract', 'clm', 'drafting'],
  bookkeeping: ['bookkeeping', 'invoicing', 'quickbooks'],
  ap:          ['ap automation', 'invoice processing'],
  audit:       ['audit', 'risk', 'fraud'],
  receipts:    ['receipt', 'ocr', 'expense'],
  ads:         ['ad creative', 'performance ads', 'media buying'],
  listening:   ['social listening', 'sentiment', 'monitoring'],
  content:     ['content repurposing', 'social posts'],
  estimator:   ['takeoff', 'estimating'],
  pm:          ['project management', 'rfis', 'specs'],
  site:        ['site documentation', 'progress tracking'],
  safety:      ['safety', 'productivity'],
  analysis:    ['csv analysis', 'analysis'],
  dashboard:   ['dashboard', 'bi', 'enterprise'],
  predictive:  ['predictive', 'ml', 'forecasting'],
  spreadsheet: ['spreadsheet', 'no-code'],
  k12:         ['k-12', 'tutoring'],
  higher:      ['university', 'adult learner', 'certificates'],
  language:    ['languages', 'gamified', 'speaking'],
  creator:     ['course builder', 'scorm', 'e-learning'],
  math:        ['maths', 'adaptive'],
  portfolio:   ['portfolio', 'retirement'],
  trading:     ['algorithmic', 'trading', 'backtesting'],
  enterprise:  ['enterprise'],
}

function parseMonthlyPrice(price: string): number {
  const m = price.match(/\$(\d+(?:\.\d+)?)\s*\/mo/i)
  return m ? parseFloat(m[1]) : Infinity
}

function applyWeights(r: Result, answers: Record<string, string>): WizardResult {
  let mult = 1
  const mismatches: string[] = []
  const strengths: string[] = []

  const { budget, skill, watermark, commercial, privacy, cloning, citations, context } = answers
  const useCase = answers.use_case

  if (budget === 'free') {
    if (r.tool.freeTierLabel === 'Free') {
      mult *= 2.0; strengths.push('Genuinely free')
    } else if (r.tool.freeTierLabel === 'Free tier available') {
      mult *= 1.2; strengths.push('Free tier available')
    } else if (r.tool.freeTierLabel === 'Free trial') {
      mult *= 0.85
    } else {
      mult *= 0.6; mismatches.push('No free tier')
    }
  } else if (budget === 'low') {
    const monthly = parseMonthlyPrice(r.tool.price)
    if (r.tool.freeTierLabel === 'Free') {
      mult *= 1.7; strengths.push('Genuinely free')
    } else if (monthly <= 20) {
      mult *= 1.4
    } else if (monthly !== Infinity) {
      mult *= 0.8
      mismatches.push(`From ${r.tool.price.replace('From ', '')}`)
    }
  } else if (budget === 'mid') {
    const monthly = parseMonthlyPrice(r.tool.price)
    if (monthly <= 50 || r.tool.freeTierLabel === 'Free') mult *= 1.15
  }

  if (skill === 'dev' && r.tool.apiAccess) {
    mult *= 1.4; strengths.push('API access')
  } else if (skill === 'none' && !r.tool.apiAccess) {
    mult *= 1.1
  } else if (skill === 'dev' && !r.tool.apiAccess) {
    mult *= 0.9
  }

  if (watermark === 'nowatermark') {
    if (!r.tool.watermark) {
      mult *= 1.8; strengths.push('No watermark')
    } else {
      mult *= 0.55; mismatches.push('Adds watermark')
    }
  }

  if (commercial === 'commercial') {
    const haystack = [r.tool.tagline, r.tool.desc, ...r.tool.tags].join(' ').toLowerCase()
    if (haystack.includes('commercial') || haystack.includes('licensed')) {
      mult *= 1.25; strengths.push('Commercial-safe')
    }
  }

  if (privacy === 'private') {
    const haystack = [r.tool.tagline, r.tool.desc, ...r.tool.tags].join(' ').toLowerCase()
    if (haystack.includes('on-prem') || haystack.includes('self-hosted') ||
        haystack.includes('open source') || haystack.includes('local')) {
      mult *= 1.6; strengths.push('Self-hostable')
    } else {
      mult *= 0.7
    }
  }

  if (cloning === 'yes') {
    const haystack = [r.tool.tagline, r.tool.desc, ...r.tool.tags].join(' ').toLowerCase()
    if (haystack.includes('voice clon') || haystack.includes('clone')) {
      mult *= 1.5; strengths.push('Voice cloning')
    }
  }

  if (citations === 'yes') {
    const haystack = [r.tool.tagline, r.tool.desc, ...r.tool.tags].join(' ').toLowerCase()
    if (haystack.includes('citation') || haystack.includes('source')) {
      mult *= 1.4; strengths.push('Cites sources')
    }
  }

  if (context === 'longdoc') {
    const haystack = [r.tool.tagline, r.tool.desc, ...r.tool.tags].join(' ').toLowerCase()
    if (haystack.includes('long context') || haystack.includes('long-context') ||
        haystack.includes('document analysis')) {
      mult *= 1.35; strengths.push('Long-context')
    }
  }

  if (useCase) {
    const kws = USE_CASE_KEYWORDS[useCase] ?? []
    const haystack = [
      ...r.tool.tags.map(t => t.toLowerCase()),
      r.tool.tagline.toLowerCase(),
      r.tool.desc.toLowerCase(),
    ].join(' ')
    if (kws.length && kws.some(k => haystack.includes(k))) {
      mult *= 1.4
    }
  }

  // Passive strengths
  if (r.tool.rating >= 4.7 && r.tool.reviews >= 500 && strengths.length < 2) {
    strengths.push(`Rated ${r.tool.rating}/5`)
  }

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

export function getWizardResults(query: string, answers: Record<string, string>, tools: ToolsMap, categories: Category[]): WizardResult[] {
  const base = scoreTools(query, tools, categories, 0)
  if (!base.length) return []
  return base
    .map(r => applyWeights(r, answers))
    .sort((a, b) => b.adjustedScore - a.adjustedScore)
    .slice(0, 5)
}

// Convenience: combine inferred answers with user answers when running results.
export function mergeAnswers(
  prefilled: Record<string, { value: string; reason: string }>,
  answers: Record<string, string>,
): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(prefilled)) out[k] = v.value
  for (const [k, v] of Object.entries(answers)) out[k] = v
  return out
}

