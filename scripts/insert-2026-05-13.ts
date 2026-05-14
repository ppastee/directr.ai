/**
 * Inserts tools from the 12 & 13 May 2026 daily briefs (combined batch).
 *
 * 11 tools — IDs follow CLAUDE.md per-category blocks (post Zams 1406→809 fix):
 *   coding (301–):      318 Hopper, 319 Latitude for Claude Code
 *   animation (1–):     16 knooth
 *   productivity (701–): 710 Jotform Claude App
 *   marketing (801–):   810 Blaze 2.0
 *   ai-agents (1601–):  1612 Statewright, 1613 Voker, 1614 display.dev,
 *                       1615 Frontdesk AI, 1616 Apideck MCP Server
 *   hardware (1701–):   1701 Memoket Gem  [NEW CATEGORY]
 *
 * Skipped per Casey: CraftBot (Living UI).
 *
 * URLs for non-confirmed sites are best-guess from brand name —
 * Casey to verify and patch any that 404.
 *
 * Usage: npx tsx scripts/insert-2026-05-13.ts
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const envText = readFileSync(join(process.cwd(), '.env.local'), 'utf8')
const env: Record<string, string> = {}
for (const line of envText.split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const rows = [
  {
    id: 16,
    category: 'animation',
    name: 'knooth',
    emoji: '🎥',
    logo_domain: 'knooth.com',
    url: 'https://knooth.com',
    tagline: 'AI-powered screen recording and editing for Mac',
    description:
      'Native macOS screen recorder with AI-powered editing — silences trim themselves, filler words drop out, and cuts get suggested automatically. Built for creators and product folks who record demos, tutorials, and Loom-style updates and want a faster path from raw capture to shareable cut. Launched on Product Hunt in May 2026 with 87 votes on launch day.',
    price: 'From $12/mo',
    free: true,
    free_tier: 'Limited recording length',
    free_tier_label: 'Free tier available',
    rating: 0,
    reviews: 0,
    tags: ['Screen recording', 'AI editing', 'macOS'],
    sponsored: false,
    api_access: false,
    output_res: '4K',
    watermark: true,
  },
  {
    id: 318,
    category: 'coding',
    name: 'Hopper',
    emoji: '🦘',
    logo_domain: 'hypercubic.ai',
    url: 'https://www.hypercubic.ai/hopper',
    tagline: 'Agentic dev environment for mainframes and COBOL',
    description:
      'AI coding agent purpose-built for legacy mainframe and COBOL codebases — the kind of work most modern dev tools ignore. Helps banks, insurers, and government IT teams read, refactor, and modernise the COBOL that still underpins production systems, without the institutional knowledge usually required. From Hypercubic. Strong HN traction on launch (40 pts) for what is a genuinely under-served niche.',
    price: 'Contact for pricing',
    free: false,
    free_tier_label: null,
    rating: 0,
    reviews: 0,
    tags: ['Mainframe', 'COBOL', 'Legacy modernisation'],
    sponsored: false,
    api_access: false,
    output_res: null,
    watermark: false,
  },
  {
    id: 319,
    category: 'coding',
    name: 'Latitude for Claude Code',
    emoji: '📡',
    logo_domain: 'latitude.so',
    url: 'https://latitude.so',
    tagline: 'See where Claude Code burns tokens — and hit limits less',
    description:
      "Observability for Claude Code sessions: per-session and per-file token usage, hot paths that chew through context, and which prompts are quietly the most expensive. Aimed at teams who hit rate limits or want to understand where their Anthropic spend is actually going. PH launch May 2026 with 264 votes — strong traction in the Claude Code dev-tooling category.",
    price: 'Free / From $19/mo',
    free: true,
    free_tier: 'Personal use',
    free_tier_label: 'Free tier available',
    rating: 0,
    reviews: 0,
    tags: ['Claude Code', 'Observability', 'Token tracking'],
    sponsored: false,
    api_access: true,
    output_res: null,
    watermark: false,
  },
  {
    id: 710,
    category: 'productivity',
    name: 'Jotform Claude App',
    emoji: '📝',
    logo_domain: 'jotform.com',
    url: 'https://www.jotform.com',
    tagline: 'Build, edit, and analyse forms directly in Claude',
    description:
      'Native Claude integration from Jotform — describe the form you need, build it inside Claude, then send, collect, and analyse responses without leaving the conversation. Part of the growing Claude-app ecosystem; useful for solo operators and small teams who already live in Claude for everything else. PH launch May 2026 with 151 votes.',
    price: 'Free / From $34/mo',
    free: true,
    free_tier: '5 forms, 100 monthly submissions',
    free_tier_label: 'Free tier available',
    rating: 0,
    reviews: 0,
    tags: ['Forms', 'Claude integration', 'No-code'],
    sponsored: false,
    api_access: true,
    output_res: null,
    watermark: false,
  },
  {
    id: 810,
    category: 'marketing',
    name: 'Blaze 2.0',
    emoji: '🔥',
    logo_domain: 'blaze.ai',
    url: 'https://www.blaze.ai',
    tagline: 'AI marketer for SMBs — strategy, content, and ads in one',
    description:
      'Full-stack AI marketing agent aimed at small businesses without a dedicated marketing team — generates strategy, writes campaign content, and runs ad creative end-to-end. Version 2.0 launched on PH in May 2026 with 171 votes. Directly competes with single-channel AI marketing tools by bundling the planning layer.',
    price: 'From $39/mo',
    free: true,
    free_tier: '7-day trial',
    free_tier_label: 'Free trial',
    rating: 0,
    reviews: 0,
    tags: ['SMB marketing', 'Content + ads', 'AI strategist'],
    sponsored: false,
    api_access: false,
    output_res: null,
    watermark: false,
  },
  {
    id: 1612,
    category: 'ai-agents',
    name: 'Statewright',
    emoji: '🧭',
    logo_domain: 'github.com',
    url: 'https://github.com/statewright/statewright',
    tagline: 'Visual state machines to make AI agents reliable',
    description:
      "Open-source framework for designing agent workflows as explicit state machines instead of free-form prompt chains — every transition is auditable, every failure mode has a state to land in. Aimed at teams shipping agents to production who got burned by unbounded loops or unrecoverable errors. HN launch May 2026 with 39 pts in the emerging agent-reliability category.",
    price: 'Free / Open-source',
    free: true,
    free_tier: 'Fully open-source',
    free_tier_label: 'Free',
    rating: 0,
    reviews: 0,
    tags: ['State machines', 'Agent reliability', 'Open-source'],
    sponsored: false,
    api_access: true,
    output_res: null,
    watermark: false,
  },
  {
    id: 1613,
    category: 'ai-agents',
    name: 'Voker',
    emoji: '📊',
    logo_domain: 'voker.ai',
    url: 'https://voker.ai',
    tagline: 'Analytics for AI agents',
    description:
      'YC-backed analytics platform for AI agents — track which prompts succeed, which tool calls fail, where users abandon, and how cost scales with usage. Plugs into common agent frameworks; sits in the same niche as web analytics did for the early SaaS era. HN launch May 2026 (32 pts) in the new agent-observability category.',
    price: 'From $29/mo',
    free: true,
    free_tier: '10k events/mo',
    free_tier_label: 'Free tier available',
    rating: 0,
    reviews: 0,
    tags: ['Agent analytics', 'Observability', 'YC-backed'],
    sponsored: false,
    api_access: true,
    output_res: null,
    watermark: false,
  },
  {
    id: 1614,
    category: 'ai-agents',
    name: 'display.dev',
    emoji: '🖥️',
    logo_domain: 'display.dev',
    url: 'https://display.dev',
    tagline: 'Publish agent-generated HTML behind company auth',
    description:
      "Lets AI agents publish HTML output as a real URL — gated behind SSO so the link is only usable inside your company. Solves the awkward gap between an agent generating something rich and getting it in front of internal users without shipping screenshots or pasting into Slack. PH launch May 2026 with 133 votes.",
    price: 'Free / From $20/mo',
    free: true,
    free_tier: '50 publishes/mo',
    free_tier_label: 'Free tier available',
    rating: 0,
    reviews: 0,
    tags: ['Agent output', 'SSO', 'Internal apps'],
    sponsored: false,
    api_access: true,
    output_res: null,
    watermark: false,
  },
  {
    id: 1615,
    category: 'ai-agents',
    name: 'Frontdesk AI',
    emoji: '🏢',
    logo_domain: 'frontdesk.ai',
    url: 'https://frontdesk.ai',
    tagline: 'AI COO — run your business like a Fortune 500',
    description:
      'Agentic business-ops platform pitched as an "AI COO": ingests your tools and metrics, identifies process gaps, and runs cross-functional workflows that would normally need a fractional ops hire. Aimed at founders without an operations layer. PH launch May 2026 with 183 votes — fits Directr\'s growing agentic-business-ops shelf.',
    price: 'From $99/mo',
    free: true,
    free_tier: '14-day trial',
    free_tier_label: 'Free trial',
    rating: 0,
    reviews: 0,
    tags: ['Business ops', 'AI COO', 'Workflow automation'],
    sponsored: false,
    api_access: false,
    output_res: null,
    watermark: false,
  },
  {
    id: 1616,
    category: 'ai-agents',
    name: 'Apideck MCP Server',
    emoji: '🔗',
    logo_domain: 'apideck.com',
    url: 'https://www.apideck.com',
    tagline: 'Give AI agents real-time access to 200+ apps via MCP',
    description:
      'MCP server from Apideck that exposes 200+ business apps (CRM, accounting, HR, file storage) as a single unified interface for agents. Instead of writing a custom connector per tool, agents call one MCP and Apideck handles the underlying API surfaces. PH launch May 2026 with 145 votes in the rapidly-growing MCP tooling niche.',
    price: 'From $89/mo',
    free: true,
    free_tier: 'Developer plan',
    free_tier_label: 'Free tier available',
    rating: 0,
    reviews: 0,
    tags: ['MCP', 'API unification', 'Agent integrations'],
    sponsored: false,
    api_access: true,
    output_res: null,
    watermark: false,
  },
  {
    id: 1701,
    category: 'hardware',
    name: 'Memoket Gem',
    emoji: '💎',
    logo_domain: 'memoket.com',
    url: 'https://memoket.com',
    tagline: 'AI wearable that remembers your conversations all day',
    description:
      'Always-on AI wearable pendant — records ambient conversation, transcribes it, and builds a searchable memory you can query later ("what did Sarah say about the launch timeline?"). Top PH launch on 13 May 2026 with 318 votes; emerging AI-hardware category that Directr should track even with only one entry today.',
    price: 'From $199 (one-time) + $9/mo',
    free: false,
    free_tier_label: null,
    rating: 0,
    reviews: 0,
    tags: ['AI wearable', 'Ambient memory', 'Always-on'],
    sponsored: false,
    api_access: false,
    output_res: null,
    watermark: false,
  },
]

async function run() {
  console.log(`Inserting ${rows.length} tools…\n`)

  // Pre-flight: confirm none of these IDs already exist
  const ids = rows.map(r => r.id)
  const { data: existing } = await supabase.from('tools').select('id, name').in('id', ids)
  if (existing && existing.length > 0) {
    console.error('ID collisions — aborting:')
    for (const e of existing) console.error(`  ${e.id} already used by "${e.name}"`)
    process.exit(1)
  }

  const { error } = await supabase.from('tools').insert(rows)
  if (error) {
    console.error('Insert failed:', error.message)
    process.exit(1)
  }

  for (const r of rows) console.log(`  ✓ ${r.id}\t${r.category}\t${r.name}`)
  console.log('\nDone.')
}

run()
