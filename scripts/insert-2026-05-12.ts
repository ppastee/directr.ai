/**
 * Inserts tools — 12 May 2026.
 *
 * 2 tools:
 *   - OpenClaw  → ai-agents (1610)
 *   - NemoClaw  → ai-agents (1611)
 *
 * Reads SUPABASE_SERVICE_ROLE_KEY from .env.local.
 *
 * Usage: npx tsx scripts/insert-2026-05-12.ts
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
    id: 1610,
    category: 'ai-agents',
    name: 'OpenClaw',
    emoji: '🦞',
    logo_domain: 'openclaw.ai',
    url: 'https://openclaw.ai',
    tagline: 'Open-source personal AI agent for any platform',
    description:
      "Peter Steinberger's open-source personal AI agent that lives inside the messaging apps you already use — WhatsApp, Telegram, Discord, Slack, Signal, iMessage — and can take real actions on your behalf: browse the web, run shell commands, read files, and orchestrate tasks across 50+ integrations. Bring-your-own model: cloud (Anthropic, OpenAI, Google) or fully local through Ollama or LM Studio if you want inference to stay on your hardware. Independent project, explicitly not affiliated with Anthropic, with persistent memory that carries context across sessions.",
    price: 'Free / BYO API key',
    free: true,
    free_tier: 'Fully free; bring your own model',
    free_tier_label: 'Free',
    rating: 0,
    reviews: 0,
    tags: ['Open-source', 'Personal agent', 'Multi-channel'],
    sponsored: false,
    api_access: true,
    output_res: null,
    watermark: false,
  },
  {
    id: 1611,
    category: 'ai-agents',
    name: 'NemoClaw',
    emoji: '🛡️',
    logo_domain: 'nvidia.com',
    url: 'https://www.nvidia.com/en-us/ai/nemoclaw/',
    tagline: "NVIDIA's secured runtime for OpenClaw agents",
    description:
      "NVIDIA's open-source stack that wraps OpenClaw in policy-based privacy and security guardrails via the NVIDIA OpenShell runtime — a sandbox that routes every inference call through declarative rules and gives operators control over which data leaves the machine. Built to run autonomous agents on your own hardware (GeForce RTX through DGX) using local Nemotron models, with the option to route specific calls to cloud LLMs through a privacy router. Currently in early preview — interfaces may still change — but the most credible answer yet to running always-on agents in environments where you cannot afford a data leak.",
    price: 'Free / Open-source',
    free: true,
    free_tier: 'Open-source; runs on your hardware',
    free_tier_label: 'Free',
    rating: 0,
    reviews: 0,
    tags: ['Open-source', 'Local inference', 'Enterprise security'],
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
