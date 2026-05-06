export interface PricingResult {
  toolName: string
  domain: string
  pricingUrl: string
  snippet: string
}

const PRICING_PAGES: { name: string; domain: string; path: string }[] = [
  { name: 'Synthesia', domain: 'synthesia.io', path: '/pricing' },
  { name: 'Runway', domain: 'runwayml.com', path: '/pricing' },
  { name: 'ElevenLabs', domain: 'elevenlabs.io', path: '/pricing' },
  { name: 'Midjourney', domain: 'midjourney.com', path: '/pricing' },
  { name: 'Jasper', domain: 'jasper.ai', path: '/pricing' },
  { name: 'Copy.ai', domain: 'copy.ai', path: '/pricing' },
  { name: 'Descript', domain: 'descript.com', path: '/pricing' },
  { name: 'Kling AI', domain: 'klingai.com', path: '/pricing' },
  { name: 'HeyGen', domain: 'heygen.com', path: '/pricing' },
  { name: 'Lumen5', domain: 'lumen5.com', path: '/pricing' },
  { name: 'Murf', domain: 'murf.ai', path: '/pricing' },
  { name: 'Suno', domain: 'suno.com', path: '/pricing' },
  { name: 'Cursor', domain: 'cursor.com', path: '/pricing' },
  { name: 'GitHub Copilot', domain: 'github.com', path: '/features/copilot#pricing' },
  { name: 'Perplexity', domain: 'perplexity.ai', path: '/pro' },
]

export async function scrapePricingPages(): Promise<PricingResult[]> {
  const results: PricingResult[] = []

  for (const tool of PRICING_PAGES) {
    try {
      const url = `https://${tool.domain}${tool.path}`
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; directr-scanner/1.0)' },
        signal: AbortSignal.timeout(8000),
      })
      if (!res.ok) continue
      const html = await res.text()

      // Extract text around price signals
      const stripped = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
      const match = stripped.match(/.{0,200}\$\d+.{0,200}/i)
      if (!match) continue

      results.push({
        toolName: tool.name,
        domain: tool.domain,
        pricingUrl: url,
        snippet: match[0].trim().slice(0, 400),
      })
    } catch {
      // skip failed pages
    }
  }

  return results
}
