/**
 * Daily decay check — runs against every tool in the directory and surfaces:
 *   1. Broken URLs (404 / 5xx / unreachable)
 *   2. Cross-domain redirects (possible acquisition / shutdown)
 *   3. Pricing-page snapshots vs the current DB `price` field
 *   4. Stale rows (updated_at older than STALE_DAYS)
 *
 * Returns raw signals — confidence/synthesis happens in the LLM step.
 */

const UA = 'Mozilla/5.0 (compatible; directr-scanner/1.0)'
const HEAD_TIMEOUT_MS = 4000
const GET_TIMEOUT_MS = 8000
const URL_CONCURRENCY = 20
const PRICING_CONCURRENCY = 8
const STALE_DAYS = 180

export interface ToolForCheck {
  name: string
  category: string
  url: string
  logoDomain: string
  price: string
  updatedAt?: string | null
}

export interface DecayIssue {
  tool: string
  category: string
  issue: 'broken_url' | 'redirect' | 'stale_record'
  detail: string
  url: string
}

export interface PricingSnippet {
  tool: string
  currentDbPrice: string
  snippet: string
  pricingUrl: string
}

export interface DecayResult {
  issues: DecayIssue[]
  pricingSnippets: PricingSnippet[]
  checked: { urls: number; pricing: number }
}

// Tools we know have a discoverable pricing page. Auto-derived `${domain}/pricing`
// 404s on too many sites to be reliable, so we keep an explicit list and the
// scraper just skips anything missing from it.
const PRICING_PATHS: Record<string, string> = {
  'synthesia.io': '/pricing',
  'runwayml.com': '/pricing',
  'elevenlabs.io': '/pricing',
  'midjourney.com': '/pricing',
  'jasper.ai': '/pricing',
  'copy.ai': '/pricing',
  'descript.com': '/pricing',
  'klingai.com': '/pricing',
  'heygen.com': '/pricing',
  'murf.ai': '/pricing',
  'suno.com': '/pricing',
  'cursor.com': '/pricing',
  'github.com': '/features/copilot#pricing',
  'perplexity.ai': '/pro',
}

async function pLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let next = 0
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (true) {
        const i = next++
        if (i >= items.length) return
        results[i] = await fn(items[i])
      }
    }),
  )
  return results
}

interface UrlCheck {
  ok: boolean
  status?: number
  finalUrl?: string
}

async function checkUrl(url: string): Promise<UrlCheck> {
  // Try HEAD first (cheap)
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(HEAD_TIMEOUT_MS),
      redirect: 'follow',
    })
    if (res.ok || (res.status >= 300 && res.status < 400)) {
      return { ok: res.ok, status: res.status, finalUrl: res.url }
    }
    // 405 / 403 etc. — some sites block HEAD; fall through to GET
  } catch {
    // network error — fall through to GET retry
  }
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(GET_TIMEOUT_MS),
      redirect: 'follow',
    })
    return { ok: res.ok, status: res.status, finalUrl: res.url }
  } catch {
    return { ok: false }
  }
}

function hostOf(u: string): string {
  try {
    return new URL(u).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

async function scrapePricing(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(GET_TIMEOUT_MS),
      redirect: 'follow',
    })
    if (!res.ok) return null
    const html = await res.text()
    const stripped = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
    const match = stripped.match(/.{0,200}\$\d+.{0,200}/i)
    return match ? match[0].trim().slice(0, 300) : null
  } catch {
    return null
  }
}

export async function runDecayCheck(tools: ToolForCheck[]): Promise<DecayResult> {
  const issues: DecayIssue[] = []

  // 1. URL health (every tool)
  const urlChecks = await pLimit(tools, URL_CONCURRENCY, async (t) => {
    const res = await checkUrl(t.url)
    return { tool: t, res }
  })
  for (const { tool, res } of urlChecks) {
    if (!res.ok) {
      issues.push({
        tool: tool.name,
        category: tool.category,
        issue: 'broken_url',
        detail: res.status ? `HTTP ${res.status}` : 'unreachable / timeout',
        url: tool.url,
      })
      continue
    }
    if (res.finalUrl) {
      const origHost = hostOf(tool.url)
      const finalHost = hostOf(res.finalUrl)
      if (origHost && finalHost && origHost !== finalHost) {
        issues.push({
          tool: tool.name,
          category: tool.category,
          issue: 'redirect',
          detail: `redirects to ${finalHost}`,
          url: tool.url,
        })
      }
    }
  }

  // 2. Pricing snapshots — only tools with a known pricing page
  const pricingTargets = tools
    .map((t) => {
      const path = PRICING_PATHS[t.logoDomain]
      return path ? { tool: t, pricingUrl: `https://${t.logoDomain}${path}` } : null
    })
    .filter((x): x is { tool: ToolForCheck; pricingUrl: string } => x !== null)

  const pricingResults = await pLimit(pricingTargets, PRICING_CONCURRENCY, async ({ tool, pricingUrl }) => {
    const snippet = await scrapePricing(pricingUrl)
    return snippet
      ? { tool: tool.name, currentDbPrice: tool.price, snippet, pricingUrl }
      : null
  })
  const pricingSnippets = pricingResults.filter((x): x is PricingSnippet => x !== null)

  // 3. Stale records
  const cutoff = Date.now() - STALE_DAYS * 86_400_000
  for (const t of tools) {
    if (!t.updatedAt) continue
    const ts = new Date(t.updatedAt).getTime()
    if (!Number.isNaN(ts) && ts < cutoff) {
      issues.push({
        tool: t.name,
        category: t.category,
        issue: 'stale_record',
        detail: `not updated since ${new Date(ts).toISOString().slice(0, 10)}`,
        url: t.url,
      })
    }
  }

  return {
    issues,
    pricingSnippets,
    checked: { urls: tools.length, pricing: pricingTargets.length },
  }
}
