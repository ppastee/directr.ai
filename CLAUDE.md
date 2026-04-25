@AGENTS.md

## TOKEN USAGE — READ FIRST

**Every token has immense value. Be obsessively efficient.**

- Do the minimum viable work to complete the task — no padding, no over-explaining
- Read only the files you need; don't glob or cat speculatively
- Prefer targeted `Edit` over full `Write` rewrites
- Prefer `Grep` over reading whole files to find things
- Don't spawn agents for tasks you can do directly
- Don't repeat information back to Casey — just do the work
- Keep responses short and direct; skip summaries unless asked
- If a task can be done in one tool call, use one tool call

---

## Project Overview

**Directr.ai** — a search marketplace for AI tools. Users search by intent ("animate a logo"), browse categories, filter by pricing/features/rating, and sort results. Moving away from heavy comparison — pure discovery focus.

**Stack:** Next.js 16 (App Router, Turbopack) · TypeScript · CSS variables (no Tailwind — theming is via CSS custom properties) · Google Fonts via CSS `@import`

**To run:**
```bash
cd "/Users/caseybrown/Claude Code/directr.ai"
npm run dev
# the-guest may already be on :3000, so this often starts on :3001
```

---

## File Structure

```
src/
├── app/
│   ├── page.tsx          ← root client component: theme + page routing state ('home'|'category'|'search')
│   ├── layout.tsx        ← minimal layout, no font imports (fonts are in globals.css)
│   └── globals.css       ← ALL styles + 3 themes defined here
├── components/
│   ├── Nav.tsx           ← sticky nav: logo left, search bar centre (non-home pages), "List a Tool" right
│   ├── HomePage.tsx      ← animated hero, typewriter search, tool marquee, category grid
│   ├── CategoryPage.tsx  ← sidebar filters, sort pills, tool grid (no compare table)
│   ├── SearchResultsPage.tsx ← full search results page (all matches, re-searchable)
│   ├── SearchModal.tsx   ← animated overlay: live scoring search, top 7 results, Enter→full results
│   ├── ListToolModal.tsx ← "List a Tool" form modal with success state
│   ├── ToolCard.tsx      ← reusable tool card with real logo + Visit link
│   ├── CategoryIcon.tsx  ← custom SVG icons for each category (no emojis)
│   └── AnimatedBg.tsx    ← canvas: 5 nebulae + 12 orbs, theme-aware, higher opacity
└── data/
│   └── tools.ts          ← all tool data + TypeScript types
└── lib/
    └── search.ts         ← shared scoreTools() function used by SearchModal + SearchResultsPage
```

---

## Routing (client-side, no URL changes yet)

State lives in `src/app/page.tsx`:
- `theme: 'signal' | 'terminal' | 'studio'` — default 'signal', no UI controls (removed)
- `page: 'home' | 'category' | 'search'`
- `activeCat: Category | null`
- `searchQuery: string`

Navigation:
- `handleCategory(cat)` → category page
- `handleHome()` → home
- `handleSearch(query)` → search results page

---

## Components Detail

### Nav
- 3-column CSS grid: logo | centre | actions
- Centre: search bar shown on non-home pages — clicking opens SearchModal (same animation as home)
- Search bar pre-fills with current query on search results page
- Right: "List a Tool" button → opens ListToolModal
- Theme switcher removed. No nav links.

### HomePage (animated)
- Hero: dot-grid overlay, animated gradient text, typewriter cycling search examples, glowing pulsing search bar, staggered pill entrance
- Marquee strip: all tool names in two rows scrolling opposite directions
- Category grid: cards stagger in with CSS `--card-i` delay, glow on hover
- "Free" pill on category cards only shown when `freeTierLabel === 'Free'` (not 'Free tier available')

### SearchModal
- Opens from home search bar, hero pills (pre-fills with pill text), or nav search bar
- Live scoring via `scoreTools()` from `src/lib/search.ts`
- Shows top 7 results with logo, tagline, category badge
- Hint: "press Enter to see all" → navigates to SearchResultsPage
- ESC key badge replaces second ✕ button
- Suggestions populate input (don't close)

### SearchResultsPage
- Shows ALL scored results (no limit)
- Has its own search bar for refinement (Enter re-searches)
- Cards: logo, name, tagline, category badge, rating, price tier
- Back button → home

### ListToolModal
- Form: tool name, website URL, category (dropdown), description, email
- On submit: shows success state ("We'll review within 48 hours")
- TODO: wire to API route POST /api/submit-tool

### AnimatedBg
- 5 nebulae (r 380–660, opacity 0.09 centre) — slow, wide colour wash
- 12 medium orbs (r 140–550, opacity 0.26 centre) — faster, more vivid
- Reads `--accent` and `--accent2` CSS vars each frame → theme-aware

### CategoryPage
- Sidebar filters: Free tier, Under $20/mo, Under $50/mo (wired), API access, No watermark, Min rating slider
- Sort: best-match / highest-rated / lowest-price / most-reviews / newest
- Compare table removed
- "lowest-price" sort uses `monthlyPrice()` helper to parse price strings

---

## Theming

Three CSS variable themes (no UI switcher — default is 'signal'):
- `theme-signal` — light editorial · indigo `#4f46e5` · DM Serif Display + DM Sans
- `theme-terminal` — dark neon · cyan `#22d3ee` · Space Grotesk
- `theme-studio` — warm cream · burnt orange `#c2622a` · Instrument Serif + Outfit

All themes define: `--bg --bg2 --bg3 --fg --fg2 --fg3 --muted --accent --accent2 --accent-bg --border --card-shadow --nav-bg --heading-font --body-font --tag-bg --tag-fg --green --green-bg --star`

---

## Data (`src/data/tools.ts`)

**TOOLS** defined first, then **CATEGORIES** derived — `count` is always `TOOLS[id].length`, never hardcoded.

**Current tool counts:**
- animation: 11 tools
- image: 9 tools
- writing: 8 tools
- coding: 10 tools
- audio: 7 tools
- chat: 7 tools (Claude added April 2026)
- 3d: 4 tools
- productivity: 7 tools
- **Total: 63 tools**

**Removed:** Phind (shut down Jan 2026), Luma Genie (sunset Jan 2026)

**Tool fields:** `id, name, emoji, logoDomain, url, tagline, desc, price, free, freeTier?, freeTierLabel, rating, reviews, tags, sponsored?, apiAccess, outputRes, watermark`

**Pricing convention (April 2026):** If the free tier can't do most of what the service is for → `price` shows subscription cost, `free: true`, `freeTierLabel: 'Free tier available'`. If genuinely free → `freeTierLabel: 'Free'`. "Free" pill on homepage only shown for `freeTierLabel === 'Free'`.

**Review counts** — all real G2/Capterra/Trustpilot data, verified April 2026. Sources noted inline. Do not fabricate numbers.

---

## Search (`src/lib/search.ts`)

`scoreTools(query, limit?)` — scores all tools by keyword match:
- Exact name: 120 · name starts with: 80 · name contains: 50
- Tags: 35 · tagline: 30 · category name: 25 · desc: 10
- Default limit 7 (modal preview), pass 0 for all results (SearchResultsPage)

---

## Adding a New Category (checklist)

**Step 1 — `src/data/tools.ts` (top section)**
Add a new key to `TOOLS` with an array of tool objects. Each tool needs:
```ts
{
  id: number,          // unique integer — use a new hundreds block (see ID convention below)
  name: string,
  emoji: string,
  logoDomain: string,  // used for favicon: google.com/s2/favicons?domain=X
  url: string,
  tagline: string,     // short — shown in search results
  desc: string,        // longer — shown on tool card
  price: string,       // e.g. 'From $20/mo' or 'Free'
  free: boolean,
  freeTier?: string,   // e.g. '5 credits/day'
  freeTierLabel: string | null,  // 'Free' | 'Free tier available' | 'Free trial' | null
  rating: number,      // real G2/Capterra/Trustpilot only — never fabricate
  reviews: number,
  tags: string[],      // 3 tags max
  sponsored?: boolean,
  apiAccess: boolean,
  outputRes: string | null,
  watermark: boolean,
}
```
`freeTierLabel` rule: `'Free'` = genuinely free · `'Free tier available'` = paid with limited free · `null` = no free tier at all.

**Step 2 — `src/data/tools.ts` (bottom, RAW_CATEGORIES)**
Add one entry matching the TOOLS key exactly:
```ts
{ id: 'mynewcat', icon: '🔥', name: 'Display Name' },
```
`count` is auto-derived — never hardcode it.

**Step 3 — `src/components/CategoryIcon.tsx`**
Add a matching SVG entry to the `icons` object:
```ts
mynewcat: ({ size = 28, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    ...
  </svg>
),
```
All icons: `viewBox="0 0 24 24"` · `strokeWidth="1.75"` · stroke-based · `fill="none"`.

**Nothing else to touch** — search, category grid, filters, sort, animations are all generic.

### ID Convention
- animation: 1–11 · image: 101–109 · writing: 201–208 · coding: 301–310
- audio: 401–407 · chat: 501–508 · 3d: 601–605 · productivity: 701–707
- Each new category gets the next hundreds block: 801–, 901–, 1001–, etc.

---

## SEO Sessions — Completed

### Session 1 — URL routing (done)
- Category pages live at `/category/[id]` (e.g. `/category/animation`)
- `sitemap.ts` + `robots.ts` in place
- `generateMetadata` on category pages

### Session 2 — Tool detail pages (done, deployed)
- Tool pages live at `/tool/[slug]` — slug derived from `nameToSlug(name)` in `tools.ts`
- `src/app/tool/[slug]/page.tsx` — static generation + SEO metadata
- `src/components/ToolRoute.tsx` — client wrapper (Nav + AnimatedBg)
- `src/components/ToolDetailPage.tsx` — hero, at-a-glance chips, comparison table, alternatives
- Comparison table: rating bars, price, free tier, API access, output res, watermark vs top 3 in category
- Tool cards on category pages click through to detail pages (via `onCardClick` prop)
- Sitemap updated with all tool URLs (~100+ entries)
- Anchor text on alternatives cards is descriptive ("View Synthesia →" not "View →")

## Outstanding Work (priority order)

1. **Persistent theme** — save to `localStorage`
2. **"List a Tool" API** — wire ListToolModal form to POST /api/submit-tool
3. **More tools** — expand beyond current set, especially 3D (only 4 tools)
4. **Session 3 SEO** — TBD (structured data / JSON-LD schema, review schema on tool pages?)

---

## Known Patterns

### Anthropic API key (if/when AI features are added)
Always initialise `new Anthropic()` INSIDE the route handler, not at module level.

```ts
// ✅ CORRECT
export async function POST(request: Request) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
}
```

### Port conflict
`the-guest` runs on `:3000`. `directr.ai` typically starts on `:3001`. Check with:
```bash
lsof -i :3000 && lsof -i :3001
```
