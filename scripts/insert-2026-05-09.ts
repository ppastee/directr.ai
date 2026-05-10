/**
 * Inserts tools from the Directr daily brief — 9 May 2026.
 *
 * Adds 4 to new "AI Agents" category and 2 to coding.
 * Reads SUPABASE_SERVICE_ROLE_KEY from .env.local.
 *
 * Usage: npx tsx scripts/insert-2026-05-09.ts
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
    id: 1601,
    category: 'ai-agents',
    name: 'Codex in Chrome',
    emoji: '🧭',
    logo_domain: 'openai.com',
    url: 'https://openai.com/codex',
    tagline: 'OpenAI browser agent extension',
    description:
      "OpenAI's official Chrome extension that lets Codex navigate web pages and complete multi-step tasks directly in the browser — fill forms, scrape data, drive web apps without copy-pasting between tabs. Browser-native agents are the new assistant battleground, and this is the most polished option for ChatGPT users who want their AI to actually do the work rather than just describe it.",
    price: 'Included with ChatGPT',
    free: true,
    free_tier: null,
    free_tier_label: 'Free tier available',
    rating: 0,
    reviews: 0,
    tags: ['Browser agent', 'OpenAI', 'Automation'],
    sponsored: false,
    api_access: false,
    output_res: null,
    watermark: false,
  },
  {
    id: 1602,
    category: 'ai-agents',
    name: 'Mochi.js',
    emoji: '🍡',
    logo_domain: 'mochijs.com',
    url: 'https://mochijs.com/',
    tagline: 'Bun-native browser automation',
    description:
      'Open-source browser automation built on Bun rather than Node, with an API designed for AI agent workflows from the ground up. Faster startup and lower memory overhead than Puppeteer or Playwright when spinning up disposable browser sessions for agents to drive — useful for any developer building autonomous web tasks at scale.',
    price: 'Free',
    free: true,
    free_tier: null,
    free_tier_label: 'Free',
    rating: 0,
    reviews: 0,
    tags: ['Browser automation', 'Bun', 'Open source'],
    sponsored: false,
    api_access: true,
    output_res: null,
    watermark: false,
  },
  {
    id: 1603,
    category: 'ai-agents',
    name: 'ClawTick',
    emoji: '⏰',
    logo_domain: 'clawtick.com',
    url: 'https://www.producthunt.com/products/clawtick',
    tagline: 'Cron jobs for AI agents',
    description:
      "Schedules recurring AI agent runs with one command and zero infrastructure — no servers, queues, or wrappers required. The plumbing layer for anyone running agents that need to wake up on a schedule rather than only on a user prompt, which covers most production agent use cases once you move past chat.",
    price: 'Contact for pricing',
    free: true,
    free_tier: null,
    free_tier_label: 'Free tier available',
    rating: 0,
    reviews: 0,
    tags: ['Agent infrastructure', 'Cron', 'Scheduling'],
    sponsored: false,
    api_access: true,
    output_res: null,
    watermark: false,
  },
  {
    id: 1604,
    category: 'ai-agents',
    name: 'Claude Agent SDK',
    emoji: '🧠',
    logo_domain: 'anthropic.com',
    url: 'https://docs.claude.com/en/api/agent-sdk',
    tagline: 'Build custom AI agents on Claude',
    description:
      "Anthropic's framework for building production AI agents on top of Claude — with built-in tool use, file system access, code execution, and the same orchestration that powers Claude Code itself. The most direct path for developers who want agent capabilities without rebuilding the harness from scratch, and the official SDK to use when you need to ship agents on Claude in production.",
    price: 'Pay per token',
    free: true,
    free_tier: null,
    free_tier_label: 'Free tier available',
    rating: 0,
    reviews: 0,
    tags: ['Agent SDK', 'Anthropic', 'Claude'],
    sponsored: false,
    api_access: true,
    output_res: null,
    watermark: false,
  },
  {
    id: 313,
    category: 'coding',
    name: 'Staff.rip',
    emoji: '🚢',
    logo_domain: 'staff.rip',
    url: 'https://staff.rip',
    tagline: 'Ship code from plain language',
    description:
      "Describe a code change in plain English and Staff.rip turns it into a production PR — branching, edits, tests, and a review-ready commit. Targets the long tail of small changes that don't need a full coding session but still take half an hour of context-switching to land. For teams that want lightweight async coding without spinning up a heavyweight agent every time.",
    price: 'Contact for pricing',
    free: false,
    free_tier: null,
    free_tier_label: null,
    rating: 0,
    reviews: 0,
    tags: ['NL to code', 'PR automation', 'Async coding'],
    sponsored: false,
    api_access: false,
    output_res: null,
    watermark: false,
  },
  {
    id: 314,
    category: 'coding',
    name: 'Clean',
    emoji: '🧼',
    logo_domain: 'producthunt.com',
    url: 'https://www.producthunt.com/products/clean-4',
    tagline: 'Self-improving AI IDE',
    description:
      "An IDE that learns your team's coding patterns over time and adapts its completions, refactors, and suggestions to match your codebase style. The bet is that generic AI assistants give the same answers to every team; Clean specialises to yours, which compounds in usefulness for engineers who stay in one repo for months at a time.",
    price: 'Contact for pricing',
    free: true,
    free_tier: null,
    free_tier_label: 'Free tier available',
    rating: 0,
    reviews: 0,
    tags: ['IDE', 'Adaptive AI', 'Team coding'],
    sponsored: false,
    api_access: false,
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
