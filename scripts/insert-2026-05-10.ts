/**
 * Inserts tools from the Directr daily brief — 10 May 2026.
 *
 * 5 tools: 1 coding (deepsec), 1 image (Adject), 2 ai-agents (AgentPeek, Cohesivity), 1 chat (Keel).
 * Tailgrids skipped — UI components library, not an AI tool primarily.
 *
 * Reads SUPABASE_SERVICE_ROLE_KEY from .env.local.
 *
 * Usage: npx tsx scripts/insert-2026-05-10.ts
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const envPath = join(process.cwd(), '.env.local')
const envText = readFileSync(envPath, 'utf8')
const env: Record<string, string> = {}
for (const line of envText.split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
}

const url = env.NEXT_PUBLIC_SUPABASE_URL
const key = env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(url, key)

const rows = [
  {
    id: 315,
    category: 'coding',
    name: 'deepsec',
    emoji: '🛡️',
    logo_domain: 'vercel.com',
    url: 'https://github.com/vercel-labs/deepsec',
    tagline: 'Open-source coding security harness',
    description:
      "Vercel's CLI security harness uses coding agents to trace data flows through large codebases and surface real vulnerabilities with severity ratings — not just static-analysis noise. Pluggable agent backends (Claude, Codex), sandbox-based scaling, and the same engine Vercel runs internally on its own repos. The most credible open-source option for teams that want AI-driven security review without locking into a vendor's cloud.",
    price: 'Free (open source)',
    free: true,
    free_tier: null,
    free_tier_label: 'Free',
    rating: 0,
    reviews: 0,
    tags: ['Security', 'CLI', 'Open source'],
    sponsored: false,
    api_access: false,
    output_res: null,
    watermark: false,
  },
  {
    id: 112,
    category: 'image',
    name: 'Adject',
    emoji: '📸',
    logo_domain: 'adject.ai',
    url: 'https://www.adject.ai',
    tagline: 'AI product photography for ecommerce',
    description:
      'Upload one product photo and Adject generates studio shots, lifestyle scenes, and ad-ready creatives that preserve the product\'s real shape, colour, and logo. Built specifically for sellers and ecommerce teams who would otherwise spend hundreds on a photo studio per drop. The closest thing to a one-click product photoshoot — fast, on-brand, and tuned for marketplaces and paid social rather than generic AI image quality.',
    price: 'Contact for pricing',
    free: true,
    free_tier: null,
    free_tier_label: 'Free trial',
    rating: 0,
    reviews: 0,
    tags: ['Product photos', 'Ecommerce', 'Ad creative'],
    sponsored: false,
    api_access: false,
    output_res: null,
    watermark: false,
  },
  {
    id: 1605,
    category: 'ai-agents',
    name: 'AgentPeek',
    emoji: '👀',
    logo_domain: 'agentpeek.app',
    url: 'https://agentpeek.app',
    tagline: 'Claude Code & Codex in your Mac notch',
    description:
      "A macOS notch app that surfaces what your Claude Code and Codex sessions are doing in real time — token usage, permissions, dev server status, and pinned project folders — without leaving your editor. Works across Ghostty, tmux, iTerm, and any terminal flavour. The right utility for anyone running multiple coding agents in parallel and tired of context-switching to check on them.",
    price: 'Lifetime license',
    free: false,
    free_tier: null,
    free_tier_label: null,
    rating: 0,
    reviews: 0,
    tags: ['macOS', 'Agent monitoring', 'Coding agents'],
    sponsored: false,
    api_access: false,
    output_res: null,
    watermark: false,
  },
  {
    id: 512,
    category: 'chat',
    name: 'Keel',
    emoji: '🗝️',
    logo_domain: 'keel-labs.github.io',
    url: 'https://keel-labs.github.io',
    tagline: 'AI assistant whose memory belongs to you',
    description:
      'A local-first AI assistant that stores everything as plain markdown in a folder you own (~/Keel by default) — no server, no tracking, no cloud database holding your context hostage. Swap between Claude, GPT, OpenRouter, or local Ollama models in settings without losing your history. The most credible answer yet for people who want assistant-grade memory without handing their notes to a vendor.',
    price: 'Free (open source)',
    free: true,
    free_tier: null,
    free_tier_label: 'Free',
    rating: 0,
    reviews: 0,
    tags: ['Local-first', 'Markdown', 'Memory'],
    sponsored: false,
    api_access: false,
    output_res: null,
    watermark: false,
  },
  {
    id: 1606,
    category: 'ai-agents',
    name: 'Cohesivity',
    emoji: '🧩',
    logo_domain: 'cohesivity.ai',
    url: 'https://cohesivity.ai',
    tagline: 'One API for AI agent backend services',
    description:
      'OpenRouter, but for backend infrastructure rather than models — one API provisions databases, auth, storage, vector search, hosting, Redis, and a dozen other services that agents typically need. Handles lifecycle and billing across all of them, so you stop juggling six dashboards to ship one agent. Early-stage but well-positioned for the moment when "spin up an agent" needs to be one command, not one weekend.',
    price: 'Contact for pricing',
    free: true,
    free_tier: null,
    free_tier_label: 'Free tier available',
    rating: 0,
    reviews: 0,
    tags: ['Agent backend', 'API', 'Infrastructure'],
    sponsored: false,
    api_access: true,
    output_res: null,
    watermark: false,
  },
]

async function run() {
  console.log(`Inserting ${rows.length} tools…`)
  const { error } = await supabase.from('tools').upsert(rows, { onConflict: 'id' })
  if (error) {
    console.error('Insert failed:', error.message)
    process.exit(1)
  }
  console.log('Done.')
  for (const r of rows) console.log(`  ${r.id} · ${r.category} · ${r.name}`)
}

run()
