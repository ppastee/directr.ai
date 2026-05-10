---
description: Fetch today's Directr daily scraper email from Gmail, cross-reference with the DB, and propose additions / decay actions for review
---

# Morning Brief — Directr daily scraper review

Run the full morning intake for the Directr daily scraper email.

## Steps

1. **Fetch the most recent scraper email**
   - Use the Gmail MCP `search_threads` tool with query: `from:onboarding@resend.dev subject:Directr newer_than:2d`
   - Read the most recent thread with `get_thread` (FULL_CONTENT)
   - Use the Saturday/AM-most-recent one — if there's also a "Daily Brief" variant, prefer the structured "Directr — N tools · K decay · DD MMM" subject format

2. **Parse the brief into three buckets**
   - **New tools to add** — name, source (HN/PH), votes, suggested category fit
   - **Decay flags** — broken URLs, redirects, price drifts, stale records (with confidence)
   - **Trend signal** — the one-sentence theme

3. **Cross-check against the existing directory**
   - For each new tool: grep `src/data/tools.ts` for the name to detect duplicates
   - For each decay flag: check the DB row exists and what the current values are
   - Flag any tool that doesn't have a clean category fit (and recommend either an existing category, a new one, or skip)

4. **Present a proposal table** — do NOT make any DB changes yet. Show:
   - Tools to add (with proposed category + ID)
   - Decay actions (URL fix / row update / archive / delete)
   - Anything ambiguous that needs Casey's call

5. **Wait for explicit approval** before writing to Supabase, editing tools.ts, adding categories, or running any insert script. Casey reviews each morning — never apply autonomously.

## Important

- Only read the **daily Directr scraper emails** (`onboarding@resend.dev`, subject starts with `Directr —`). Never read other Gmail threads.
- The service role key in `.env.local` lets you insert directly once approved. Do not echo, log, or commit it.
- Keep the proposal terse — Casey scans these fast each morning.
- For new categories, follow the checklist in `CLAUDE.md` (RAW_CATEGORIES + CategoryIcon SVG + ID block).
