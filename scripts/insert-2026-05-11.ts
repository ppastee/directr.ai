/**
 * Inserts tools from the Directr daily brief — 11 May 2026 (Tuesday AM Sydney).
 *
 * 6 tools:
 *   - Graphbit PRFlow → coding (316)
 *   - Genpire → 3d (610)
 *   - MiroMiro → coding (317)
 *   - ClawSecure → ai-agents (1607)
 *   - Weavable → ai-agents (1608)
 *   - Known Agents → ai-agents (1609)
 *
 * Reads SUPABASE_SERVICE_ROLE_KEY from .env.local.
 *
 * Usage: npx tsx scripts/insert-2026-05-11.ts
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
    id: 316,
    category: 'coding',
    name: 'Graphbit PRFlow',
    emoji: '🔍',
    logo_domain: 'graphbit.ai',
    url: 'https://graphbit.ai',
    tagline: 'AI code reviewer that catches what others miss',
    description:
      "PRFlow is Graphbit's code review agent built on a Rust-core, Python-first agent framework — designed for production review workflows rather than the lightweight comment bots most teams have already grown tired of. Token-based pricing with a generous launch allocation, observability and resilience baked in, and multi-LLM orchestration so you can route the actual reasoning to whichever model is best per file type. A serious option for engineering orgs that want an opinionated reviewer plugged into CI without giving up control of cost or model choice.",
    price: 'Token-based',
    free: true,
    free_tier: '200k tokens + 20 traces (launch offer)',
    free_tier_label: 'Free tier available',
    rating: 0,
    reviews: 0,
    tags: ['Code review', 'Agent framework', 'CI'],
    sponsored: false,
    api_access: true,
    output_res: null,
    watermark: false,
  },
  {
    id: 317,
    category: 'coding',
    name: 'MiroMiro',
    emoji: '🎨',
    logo_domain: 'miromiro.app',
    url: 'https://miromiro.app',
    tagline: "Inspect, edit, and export any website's design",
    description:
      'A browser extension that turns any live website into an editable design surface — hover to read styles, tweak colours, fonts, spacing, and shadows in place, then export the selection as clean Tailwind or HTML/CSS. Pulls SVGs, animations, design tokens, and runs accessibility contrast checks alongside. The fastest bridge from "I want it to look like that" to working code, especially for solo devs and designers who reverse-engineer references constantly.',
    price: 'Free / Pro tier',
    free: true,
    free_tier: '3-day full access',
    free_tier_label: 'Free trial',
    rating: 0,
    reviews: 0,
    tags: ['Browser extension', 'Design-to-code', 'Tailwind'],
    sponsored: false,
    api_access: false,
    output_res: null,
    watermark: false,
  },
  {
    id: 610,
    category: '3d',
    name: 'Genpire',
    emoji: '🏭',
    logo_domain: 'genpire.com',
    url: 'https://genpire.com',
    tagline: 'Make real physical products with AI',
    description:
      'Turns a prompt, sketch, or rough idea into factory-ready specs — technical drawings, multi-view renders, and full tech packs — in minutes, then connects you with vetted manufacturers for sampling and production. Covers eight categories including apparel, footwear, accessories, and furniture, with a Brand DNA feature on Pro plans for keeping a consistent design language across drops. A genuine novel angle on generative AI: not pixels on a screen, but objects you can hold.',
    price: 'Free / Pro plans',
    free: true,
    free_tier: 'Free tier (limited generations)',
    free_tier_label: 'Free tier available',
    rating: 0,
    reviews: 0,
    tags: ['Physical products', 'Tech packs', 'Manufacturing'],
    sponsored: false,
    api_access: false,
    output_res: null,
    watermark: false,
  },
  {
    id: 1607,
    category: 'ai-agents',
    name: 'ClawSecure',
    emoji: '🛡️',
    logo_domain: 'clawsecure.ai',
    url: 'https://www.clawsecure.ai',
    tagline: 'AI-powered antivirus for AI agents',
    description:
      'A security layer for OpenClaw and adjacent agent runtimes — pre-install code analysis to flag dangerous skills, real-time behavioural monitoring through its Watchtower component, and a sub-200ms verification API for production gating. Ships with a Security Companion Agent and full OWASP ASI coverage to catch data exfiltration patterns and unsafe tool calls before they execute. The first credible answer to "how do we let agents run code without giving them the keys to the kingdom."',
    price: 'Free / Enterprise',
    free: true,
    free_tier: 'Basic scanning (no signup)',
    free_tier_label: 'Free tier available',
    rating: 0,
    reviews: 0,
    tags: ['Agent security', 'OWASP', 'Runtime monitoring'],
    sponsored: false,
    api_access: true,
    output_res: null,
    watermark: false,
  },
  {
    id: 1608,
    category: 'ai-agents',
    name: 'Weavable',
    emoji: '🧵',
    logo_domain: 'weavable.ai',
    url: 'https://weavable.ai',
    tagline: 'Give every AI agent persistent work context',
    description:
      'Maintains a continuously updating changelog of what is happening across HubSpot, Slack, Zendesk, and the rest of the business stack, then serves it to your agents through a single MCP endpoint. Cuts roughly 90% of the tokens you would burn by giving agents raw API access while producing higher-quality outputs — the agent reads the curated context instead of crawling tools live. Aimed at the moment when "agent memory" stops being a research project and starts being infrastructure.',
    price: 'Contact for pricing',
    free: true,
    free_tier: '30-day full access, no card',
    free_tier_label: 'Free trial',
    rating: 0,
    reviews: 0,
    tags: ['Agent memory', 'MCP', 'Context'],
    sponsored: false,
    api_access: true,
    output_res: null,
    watermark: false,
  },
  {
    id: 1609,
    category: 'ai-agents',
    name: 'Known Agents',
    emoji: '👁️',
    logo_domain: 'knownagents.com',
    url: 'https://knownagents.com',
    tagline: 'Track the bots and AI agents crawling your website',
    description:
      'Real-time visibility into which bots and AI agents hit your site — which pages they read, where they came from, and what human referrals they end up generating from ChatGPT, Claude, and other LLM-backed surfaces. The right tool for the new reality that a lot of your traffic is no longer human and you still need to optimise for it. ~5 minute install, free for most sites, and one of the few products treating LLM referral as a first-class analytics signal.',
    price: 'Free / Paid tiers',
    free: true,
    free_tier: 'Free for most sites',
    free_tier_label: 'Free tier available',
    rating: 0,
    reviews: 0,
    tags: ['Bot analytics', 'LLM referral', 'Agent traffic'],
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
