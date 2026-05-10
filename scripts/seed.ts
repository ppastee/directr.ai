/**
 * One-time seed script: reads static tools.ts and inserts all tools into Supabase.
 *
 * Usage:
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co \
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... \
 *   npx tsx scripts/seed.ts
 *
 * Requires: npm install -D tsx
 * Run once after creating the table with supabase/schema.sql.
 * Safe to re-run — uses upsert.
 */

import { createClient } from '@supabase/supabase-js'
import { TOOLS } from '../src/data/tools'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)')
  process.exit(1)
}

const supabase = createClient(url, key)

const rows = Object.entries(TOOLS).flatMap(([category, tools]) =>
  tools.map((t) => ({
    id:              t.id,
    category,
    name:            t.name,
    emoji:           t.emoji,
    logo_domain:     t.logoDomain,
    url:             t.url,
    tagline:         t.tagline,
    description:     t.desc,
    price:           t.price,
    free:            t.free,
    free_tier:       t.freeTier ?? null,
    free_tier_label: t.freeTierLabel,
    rating:          t.rating,
    reviews:         t.reviews,
    tags:            t.tags,
    sponsored:       t.sponsored ?? false,
    api_access:      t.apiAccess,
    output_res:      t.outputRes,
    watermark:       t.watermark,
  }))
)

async function seed() {
  console.log(`Seeding ${rows.length} tools across ${Object.keys(TOOLS).length} categories…`)
  const { error } = await supabase.from('tools').upsert(rows, { onConflict: 'id' })
  if (error) {
    console.error('Seed failed:', error.message)
    process.exit(1)
  }
  console.log('Done.')
}

seed()
