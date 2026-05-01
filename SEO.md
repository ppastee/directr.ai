# Directr SEO Master File
**Domain:** directr.com.au  
**Goal:** #1 on Google for "AI search tool", "AI tools directory", "best AI tools" and hundreds of long-tail variants  
**Visitor target:** 50,000 organic visits/month (pSEO compounding model)  
**Last updated:** May 2026

---

## Status Dashboard

| Layer | Status | Notes |
|---|---|---|
| URL routing | ✅ Done | `/category/[id]`, `/tool/[slug]` |
| Sitemap | ✅ Done | All categories + tools (~70 URLs) |
| robots.txt | ✅ Done | Allows all, points to sitemap |
| generateMetadata | ✅ Done | All page types |
| SoftwareApplication schema | ✅ Done | Tool pages |
| ItemList schema | ✅ Done | Category pages |
| BreadcrumbList schema | ✅ Done | Tool + category pages |
| Homepage JSON-LD | ✅ Done | WebSite + SearchAction + Organization |
| FAQ schema | ✅ Done | All 8 category pages + all tool pages |
| HowTo schema | ❌ Missing | Use-case pages |
| WebSite schema | ✅ Done | With SearchAction (sitelinks search) |
| Organization schema | ✅ Done | Homepage |
| Core Web Vitals audit | ❌ Not done | Run Lighthouse |
| Google Search Console | ❌ Not confirmed | Verify ownership + submit sitemap |
| Use-case landing pages | ❌ Not built | pSEO opportunity — hundreds of pages |
| Comparison pages | ❌ Not built | High intent, mid competition |
| Alternatives pages | ❌ Not built | Tool-level, very high CTR |
| Blog / content hub | ❌ Not built | E-E-A-T authority signal |
| Internal linking strategy | ❌ Not done | Needs audit |
| AI Overview optimization | ❌ Not done | Answer-first content rewrites |
| Off-page / community | ❌ Not done | Reddit, PH, newsletters |

---

## Keyword Map

### Tier 1 — Core Money Keywords (high competition, must own these)

| Keyword | Intent | Est. Monthly Searches | Target Page |
|---|---|---|---|
| AI tools directory | Discovery | 18,000 | Homepage |
| best AI tools | Discovery | 40,000 | Homepage |
| AI search tool | Discovery | 8,000 | Homepage |
| find AI tools | Discovery | 3,500 | Homepage |
| AI tools list | Discovery | 12,000 | Homepage |
| top AI tools 2026 | Discovery | 9,000 | Homepage |
| AI tool search engine | Discovery | 2,200 | Homepage |
| discover AI tools | Discovery | 1,800 | Homepage |

**Homepage must own these.** Currently the homepage has weak SEO because it's a client component with an animated hero. The `<title>` and meta description are set — but the H1 visible to crawlers, body text, and structured data are all missing or thin.

---

### Tier 2 — Category Keywords (medium competition, we can rank fast)

| Keyword | Target Page | Est. Monthly Searches |
|---|---|---|
| best AI animation tools | /category/animation | 5,400 |
| best AI image generators | /category/image | 22,000 |
| best AI writing tools | /category/writing | 14,000 |
| best AI coding tools | /category/coding | 9,000 |
| best AI audio tools | /category/audio | 4,200 |
| best AI chat tools | /category/chat | 7,500 |
| best AI 3D tools | /category/3d | 2,800 |
| best AI productivity tools | /category/productivity | 11,000 |
| AI animation software 2026 | /category/animation | 3,200 |
| AI image generator comparison | /category/image | 8,000 |
| AI writing assistant comparison | /category/writing | 5,500 |
| free AI tools | Cross-category page | 28,000 |
| AI tools free tier | Cross-category page | 3,800 |

---

### Tier 3 — Tool-Level Keywords (lower competition, high conversion)

Each tool page should rank for:
- `[tool name] review`
- `[tool name] pricing`
- `[tool name] alternatives`
- `[tool name] vs [competitor]`
- `is [tool name] worth it`
- `[tool name] free tier`

**High-value examples right now:**
| Keyword | Target Page | Est. Monthly Searches |
|---|---|---|
| Midjourney alternatives | /tool/midjourney + alternatives page | 12,000 |
| ChatGPT alternatives | /tool/chatgpt + alternatives page | 35,000 |
| Runway alternatives | /tool/runway-ml | 2,400 |
| Cursor alternatives | /tool/cursor | 4,100 |
| Notion AI review | /tool/notion-ai | 6,200 |
| ElevenLabs pricing | /tool/elevenlabs | 3,800 |
| Midjourney vs DALL-E | Comparison page | 14,000 |
| Claude vs ChatGPT | Comparison page | 22,000 |
| Copilot vs Cursor | Comparison page | 5,500 |

---

### Tier 4 — pSEO Keywords (programmatic at scale, hundreds of pages)

These are templated keywords that follow a repeatable pattern. Each variation = one page.

**Pattern A: `best AI tools for [profession]`**
- best AI tools for writers · marketers · designers · developers · teachers · students
- best AI tools for small business · freelancers · content creators · podcasters · photographers
- best AI tools for lawyers · accountants · HR managers · project managers · real estate agents
- **~80 profession variations = 80 pages**

**Pattern B: `best AI tools for [task]`**
- best AI tools for video editing · logo design · transcription · code review · email writing
- best AI tools for social media · SEO · customer service · data analysis · presentations
- best AI tools for generating images · writing blog posts · making music · building apps
- **~120 task variations = 120 pages**

**Pattern C: `AI tools for [industry]`**
- AI tools for marketing · healthcare · education · finance · legal · e-commerce · real estate
- AI tools for restaurants · construction · manufacturing · HR · logistics · journalism
- **~60 industry variations = 60 pages**

**Pattern D: `[tool name] alternatives`**
- Every major tool we list gets a standalone `/alternatives/[tool-slug]` page
- These are among the highest-CTR pages in any directory — people actively shopping
- **~63 tools × alternatives page = 63 pages** (then grow as we add tools)

**Pattern E: `[tool A] vs [tool B]`**
- Compare the top 2-3 tools in each category head-to-head
- Claude vs ChatGPT, Midjourney vs DALL-E, Runway vs Pika, Cursor vs Copilot, etc.
- **~40 high-value comparison pages**

**Total pSEO potential: ~360+ pages at launch → scaling to 1,000+**

At 5 clicks/page/month avg → 360 pages = 1,800 clicks/month  
At 5 clicks/page/month avg → 1,000 pages = 5,000 clicks/month  
At 10 clicks/page/month avg → 5,000 pages = 50,000 clicks/month

---

## Content Architecture (page types to build)

### Existing Page Types
```
/ (homepage)
/category/[id]        — 8 pages currently
/tool/[slug]          — ~63 pages currently
```

### Page Types to Build

```
/tools/free           — All free AI tools (targets "free AI tools" — 28K searches/mo)
/tools/[profession]   — best AI tools for [profession]  (Pattern A — 80 pages)
/tools/[task]         — best AI tools for [task]        (Pattern B — 120 pages)
/tools/[industry]     — AI tools for [industry]         (Pattern C — 60 pages)
/alternatives/[slug]  — [tool] alternatives             (Pattern D — 63 pages)
/compare/[a]-vs-[b]   — [tool A] vs [tool B]            (Pattern E — 40 pages)
/blog/[slug]          — SEO content hub (E-E-A-T, editorial authority)
```

---

## Technical SEO — Audit Tasks

### Immediate (Session 3)

- [x] **Homepage JSON-LD** — `WebSite` + `SearchAction` + `Organization` schema added to `src/app/page.tsx`
- [x] **FAQ schema on category pages** — 5 FAQs per category in `CATEGORY_FAQS`, FAQPage schema added to all 8 category pages
- [x] **FAQ schema on tool pages** — 3 dynamic FAQs per tool (free?, used for?, alternatives?) added to all tool pages
- [x] **Fix: homepage crawlability** — Server-rendered `.sr-only` section with H1 + descriptive text added to `src/app/page.tsx`
- [x] **Image alt text** — `alt={tool.name}` already present in `ToolCard.tsx`
- [ ] **Internal linking** — Category pages should cross-link to related categories. Tool pages should link to 2-3 related tools in other categories (not just same category alternatives).
- [ ] **Canonical tags** — Currently set via `alternates.canonical`. Verify no duplicate content between `/category/animation` and any other paths.

### Medium-term

- [ ] **Core Web Vitals** — Run Lighthouse on deployed URL. The animated canvas background (AnimatedBg) likely tanks LCP. Consider: lazy-load or defer canvas after LCP element paints.
- [ ] **`hreflang`** — Site is Australian (.com.au) but targets global English. Consider adding `hreflang="en"` and potentially `hreflang="en-AU"` and `hreflang="en-US"` to capture both markets.
- [ ] **Structured data for free tools page** — ItemList schema for the free tools aggregation page.
- [ ] **`<meta name="author">`** — Add to layout for E-E-A-T signal.
- [ ] **Review the sitemap priorities** — Tier 4 pSEO pages should be priority 0.6, not 0.8. Category pages should be 0.9.

### Schema Gaps (priority order)

| Schema Type | Where | Why |
|---|---|---|
| `WebSite` + `SearchAction` | Homepage | Sitelinks search box in Google results |
| `Organization` | Homepage | Brand entity recognition by Google |
| `FAQPage` | Every category page | People Also Ask real estate |
| `FAQPage` | Every tool page | People Also Ask real estate |
| `HowTo` | Use-case pages (pSEO) | Rich result eligibility |
| `CollectionPage` | pSEO profession/task pages | Signals content type |
| `ItemList` | Alternatives pages | Shows numbered list in SERPs |
| `BreadcrumbList` | pSEO pages | Already done on tool/category |

---

## AI Era Optimization (2026 priority)

Google AI Overviews reduce top-1 organic CTR by ~34%. Being in the AI Overview compensates. LLMs (ChatGPT, Perplexity, Gemini) also pull from our content for tool recommendations.

### Rules for AI Overview eligibility

1. **Answer in the first 100 words.** Every category and use-case page must open with a direct, concise answer to the implied query. Example for `/category/animation`:
   > "The best AI animation tools in 2026 are Runway, Pika, and Kling. Runway leads for professional video generation, Pika is best for quick social clips, and Kling offers the best free tier."

2. **Use FAQ sections.** Google pulls FAQ content directly into AI Overviews. 4-5 FAQs per page, with `FAQPage` schema.

3. **Definitive, extractable sentences.** Write sentences that could be copy-pasted into an AI answer verbatim. Avoid wishy-washy language ("it depends", "there are many options").

4. **Entity clarity.** Each tool page should explicitly name: what it is, what it does, who makes it, how much it costs, what it's best for. These are entity attributes Google extracts.

### LLM citation strategy

LLMs (ChatGPT, Perplexity, Claude) are trained on and regularly crawl:
- Reddit (especially r/artificial, r/ChatGPT, r/MachineLearning, r/AItools)
- GitHub repos and READMEs
- Hacker News
- LinkedIn articles
- ProductHunt listings
- Major tech blogs and newsletters

**Action items for citation presence:**
- Post directr.com.au in replies to "what AI tool for X" questions on Reddit (organic, helpful replies)
- Submit to every "awesome AI tools" GitHub list
- ProductHunt launch (if not done)
- Post weekly "best AI tools for X" content on LinkedIn
- Get listed in TLDR AI, The Rundown AI, Ben's Bites newsletters
- Target Hacker News "Show HN" with a compelling launch story

---

## Off-Page / Authority Building

### Link targets (priority order)

| Source | Type | How to get it |
|---|---|---|
| ProductHunt | Profile + upvotes | Launch, engage with comments |
| GitHub `best-of-ai/ai-directories` | Repo listing | Submit a PR |
| GitHub awesome-ai lists | Repo listing | Submit PRs to 10+ repos |
| IndieHackers | Profile + posts | Write about building directr |
| Hacker News | Organic mention | Show HN post with launch story |
| r/artificial | Organic mention | Post "I built an AI search tool" |
| r/ChatGPT | Organic mention | Answer "what's a good AI directory" |
| TLDR AI newsletter | Newsletter mention | Submit via their form |
| The Rundown AI | Newsletter mention | Submit via their form |
| Ben's Bites | Newsletter mention | Submit via their form |
| Futurepedia (rival) | Referral traffic | Submit tools that aren't listed there |
| AI tool comparison blogs | Editorial links | Outreach: "you reviewed X, we compare all of them" |
| Medium / Substack posts | Backlinks | Write about AI tool discovery, link to directr |

### Anchor text strategy
- Brand: "Directr", "directr.com.au", "Directr AI tools"
- Target: "AI tools directory", "AI search tool", "find AI tools"
- Avoid: generic "click here", "website", unanchored URLs

---

## Programmatic SEO — Build Plan

### Phase 1: Templates (build once, generate many)

**Template 1: `/tools/[profession]`**

Page structure:
```
H1: Best AI Tools for [Profession] in 2026
Opening paragraph (100 words): direct answer naming top 3 tools
Tool cards: filtered/scored tools relevant to this profession (5-10 tools)
Section: "How [profession] use AI tools"
Section: "What to look for in AI tools for [profession]"
FAQ (5 questions): schema-marked
CTA: "Search all AI tools for [profession]"
```

**Template 2: `/tools/[task]`**

Page structure:
```
H1: Best AI Tools for [Task] in 2026
Opening paragraph (100 words): direct answer
Tool cards: top 5 tools for this specific task
Section: "Step-by-step: how to [task] with AI"  ← HowTo schema
FAQ (5 questions)
CTA: search bar / explore category
```

**Template 3: `/alternatives/[tool-slug]`**

Page structure:
```
H1: Best [Tool Name] Alternatives in 2026
Opening paragraph: why people look for alternatives + top 3 picks
Comparison table: [Tool] vs alternative 1 vs alternative 2 vs alternative 3
(pricing, rating, free tier, key features)
Section: "When to switch from [Tool]"
Section: "Best [Tool] alternative for [specific use case]"
FAQ: Is [Tool] free? What is better than [Tool]? etc.
```

**Template 4: `/compare/[a]-vs-[b]`**

Page structure:
```
H1: [Tool A] vs [Tool B]: Which is Better in 2026?
Opening paragraph: one-sentence verdict + who each is best for
Side-by-side comparison table (pricing, features, ratings, free tier)
Section: [Tool A] strengths / weaknesses
Section: [Tool B] strengths / weaknesses
Section: Which should you choose?
FAQ
```

### Phase 2: Data requirements per template

Each pSEO page needs:
- Profession/task/industry label (from a master list)
- List of relevant tool IDs from `tools.ts` (manual curation or tag-based filtering)
- 5 FAQ pairs (templated with variable substitution)
- HowTo steps (for task pages)

### Phase 3: Route structure in Next.js

```
src/app/
  tools/
    [profession]/page.tsx   ← generateStaticParams from profession list
    [task]/page.tsx         ← generateStaticParams from task list
  alternatives/
    [slug]/page.tsx         ← generateStaticParams from all tool slugs
  compare/
    [pair]/page.tsx         ← generateStaticParams from comparison pairs list
```

### Phase 4: Data files needed

```
src/data/
  professions.ts    ← { slug, label, toolIds[], faqs[] }
  tasks.ts          ← { slug, label, toolIds[], steps[], faqs[] }
  industries.ts     ← { slug, label, toolIds[], faqs[] }
  comparisons.ts    ← { slug, toolA, toolB, verdict, winner? }
```

---

## Session Roadmap

### Session 3 — Technical SEO + Schema (next session)
**Impact: high | Effort: low | Time: 1-2 hours**

1. Add `WebSite` + `SearchAction` + `Organization` schema to homepage layout
2. Add `FAQPage` schema to all 8 category pages (generate from a FAQ data object in `tools.ts`)
3. Add `FAQPage` schema to all tool pages (3 standard FAQs: "Is [tool] free?", "What is [tool] used for?", "What are [tool] alternatives?")
4. Fix homepage crawlability — add a server-rendered `<section>` with H1 and descriptive text (can be visually hidden or below the fold but present in HTML)
5. Add alt text to tool logo images in ToolCard component

**Expected outcome:** Eligible for FAQ rich results in ~2-4 weeks. Sitelinks search box in ~4-8 weeks.

---

### Session 4 — Free Tools Page + Category Content
**Impact: high | Effort: medium | Time: 2-3 hours**

1. Build `/tools/free` — aggregates all `free: true` tools, H1 targets "free AI tools" (28K searches/mo), ItemList schema
2. Rewrite the opening section of each category page to lead with a direct answer (AI Overview eligible)
3. Add 5 FAQs to each category page (visible on page, not just schema)
4. Expand category page descriptions from generated metadata to actual on-page content

**Expected outcome:** Free tools page starts indexing. Category pages become AI Overview candidates.

---

### Session 5 — Alternatives Pages (pSEO Phase 1)
**Impact: very high | Effort: medium | Time: 3-4 hours**

1. Build `/alternatives/[slug]` route
2. Build the alternatives page template component
3. Add `comparisons.ts` data file with the top 20 highest-search alternatives
4. Generate static params, metadata, and schema
5. Submit to sitemap

Priority alternatives pages (by search volume):
- ChatGPT alternatives (35K/mo)
- Midjourney alternatives (12K/mo)
- Notion AI alternatives (8K/mo)
- GitHub Copilot alternatives (7K/mo)
- ElevenLabs alternatives (4K/mo)
- Runway alternatives (2.4K/mo)
- DALL-E alternatives (9K/mo)
- Canva AI alternatives (5K/mo)

**Expected outcome:** 20 pages indexed, traffic starts ~Month 2. High CTR due to transactional intent.

---

### Session 6 — Comparison Pages (pSEO Phase 2)
**Impact: high | Effort: medium | Time: 3-4 hours**

1. Build `/compare/[pair]` route
2. Build comparison page template component
3. Add top 20 comparison pairs to data
4. Generate static params, metadata, schema

Priority comparison pairs:
- Claude vs ChatGPT (22K/mo)
- Midjourney vs DALL-E (14K/mo)
- Midjourney vs Stable Diffusion (8K/mo)
- ChatGPT vs Gemini (18K/mo)
- Cursor vs Copilot (5.5K/mo)
- Runway vs Pika (3K/mo)
- ElevenLabs vs Murf (2.8K/mo)
- Jasper vs Copy.ai (4K/mo)

**Expected outcome:** 20 high-intent pages indexed. Comparison pages drive very high engagement and backlinks from "best tool" listicles.

---

### Session 7 — Use Case Pages (pSEO Phase 3)
**Impact: very high | Effort: high | Time: 4-6 hours**

1. Build profession + task data files
2. Build `/tools/[profession]` and `/tools/[task]` routes
3. Generate 40 profession pages and 40 task pages (80 total — start with highest volume)
4. Ensure each page has unique copy in the opening paragraph (not duplicate content)
5. Add HowTo schema to task pages

**Expected outcome:** 80 pages indexed, compounding traffic from Month 3-4.

---

### Session 8 — Blog / Content Hub
**Impact: very high (E-E-A-T) | Effort: high | Time: ongoing**

1. Build `/blog` route with article index
2. Build blog post template with Article schema
3. Write 5 cornerstone articles manually (these cannot be programmatic — must be genuinely good):
   - "The Best AI Tools of 2026: Our Full Ranking" (targets "best AI tools" — 40K/mo)
   - "How We Test and Rate AI Tools" (E-E-A-T signal, builds trust)
   - "Free AI Tools That Actually Work (No Credit Card)" (targets free tier searchers)
   - "The AI Tools Used By Professional [X]" (human angle, earns backlinks)
   - "AI Tools for Beginners: Where to Start" (informational, top of funnel)

**Expected outcome:** Editorial authority signals. Earns backlinks naturally. Google trusts sites with genuine content + reviews.

---

### Session 9 — Off-Page Launch
**Impact: high | Effort: medium | Time: 2-3 hours**

1. ProductHunt submission prep (description, tagline, screenshots, video)
2. Submit to GitHub awesome-ai lists (find top 10 repos and submit PRs)
3. Post on r/artificial + r/ChatGPT + r/SideProject
4. HN Show HN post
5. Newsletter submissions (TLDR AI, The Rundown AI, Ben's Bites, Superhuman)

**Expected outcome:** 10-30 backlinks in first month. Brand awareness. LLM citation pickup begins.

---

### Session 10+ — Scale pSEO
- Expand profession/task pages to full 200+ variations
- Add industry pages (Pattern C)
- Expand comparison pairs to 50+
- Expand alternatives to all 63 tools
- Add new tool categories (expands keyword coverage)
- Monthly refresh: update tool counts, ratings, pricing in metadata

---

## Tracking & Measurement

### Tools to set up

| Tool | Purpose | Priority |
|---|---|---|
| Google Search Console | Impressions, clicks, queries, indexing errors | Immediate |
| Google Analytics 4 | Sessions, sources, engagement, conversions | Immediate |
| Vercel Analytics | Already installed — supplement GA4 | Done |
| Ahrefs / Semrush | Keyword rankings, backlink monitoring | When budget allows |

### KPIs per session

| Metric | Month 1 | Month 3 | Month 6 | Month 12 |
|---|---|---|---|---|
| Indexed pages | 70 | 200 | 500 | 1,000+ |
| Organic sessions/month | <100 | 500 | 5,000 | 25,000+ |
| Keywords ranking (any position) | 50 | 300 | 1,500 | 5,000+ |
| Keywords in top 10 | 5 | 30 | 150 | 500+ |
| Backlinks (referring domains) | 5 | 25 | 75 | 200+ |
| AI Overview appearances | 0 | 5 | 30 | 100+ |

### Leading indicators to watch in GSC
- Impressions growing = indexing and crawling working
- CTR improving = title/meta descriptions working
- Average position moving up on core keywords = content quality improving
- "Discovered - currently not indexed" errors = crawl budget or quality issues

---

## Competitive Landscape

We are competing against:
- **Futurepedia** (4,000+ tools, ~1.5M monthly visits) — older, more tools, weaker search UX
- **Toolify.ai** (28,000+ tools, ~800K monthly visits) — massive breadth, poor curation
- **There's An AI For That** (~500K monthly visits) — strong brand, simple UI
- **aidirectory.com** — smaller but well-SEO'd

**Our edges:**
1. Intent-based search — matches what people actually type
2. Faster pSEO execution with Claude Code — they aren't doing this
3. AI Overview optimization — structured data + answer-first copy
4. Better UX — design quality drives return visits and backlinks

**Their gaps we exploit:**
- Most don't have comparison or alternatives pages at scale
- Most have thin category pages with no FAQs or body copy
- Most aren't optimizing for AI Overviews (no FAQ schema, no answer-first copy)
- Most don't have profession/task-specific landing pages

---

## Quick Reference: Files to Edit Per Session

| Task | File(s) to edit |
|---|---|
| Homepage schema | `src/app/layout.tsx` |
| Category FAQ schema | `src/app/category/[id]/page.tsx` |
| Tool FAQ schema | `src/app/tool/[slug]/page.tsx` |
| Add alt text to logos | `src/components/ToolCard.tsx` |
| New pSEO routes | `src/app/[route]/page.tsx` (new) |
| New data files | `src/data/[name].ts` (new) |
| Sitemap expansion | `src/app/sitemap.ts` |
| Homepage crawlability | `src/app/HomeClient.tsx` or `src/app/page.tsx` |

---

## Notes for Claude (working through this file)

- Always check the Status Dashboard at the top first — mark tasks ✅ when done
- When building pSEO pages: content must be genuinely useful, not thin. Each page needs at minimum: a direct answer paragraph, a tool list with reasons, and 5 FAQs.
- Never fabricate tool data (ratings, reviews, pricing). All numbers come from `tools.ts` or verified sources.
- Domain is `directr.com.au` — not `directr.ai`. All BASE URLs use `.com.au`.
- The site is Australian but targeting global English — write for global audience, don't localise too heavily.
- pSEO pages: traffic lags publication by 2-4 months. Don't measure success before Month 3.
- Every new page type needs: `generateStaticParams`, `generateMetadata`, canonical URL, and at minimum BreadcrumbList schema.
- When in doubt about keyword priority: check search volume estimates in this file, not gut feel.
