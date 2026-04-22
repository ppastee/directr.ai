'use client'

const NEWS_ITEMS = [
  'GPT-5 Turbo launches with 1M context window',
  'Claude 4 Haiku is the fastest reasoning model yet',
  'Google Gemini 2.5 Ultra tops LMSys leaderboard',
  'Meta releases Llama 4 as fully open weights',
  'Midjourney V7 adds video generation',
  'Runway Gen-4 delivers 4K AI video output',
  'ElevenLabs launches AI dubbing in 35 languages',
  'OpenAI o3 reasoning model now free in ChatGPT',
  'GitHub Copilot adds autonomous workspace agents',
  'Stability AI releases Stable Diffusion 4',
  'Perplexity raises $500M at $9B valuation',
  'xAI Grok 3 adds real-time image generation',
]

const SEPARATOR = ' · '

export default function NewsTicker() {
  const track = NEWS_ITEMS.join(SEPARATOR) + SEPARATOR

  return (
    <div className="news-ticker">
      <div className="news-ticker-label">AI NEWS</div>
      <div className="news-ticker-mask">
        <div className="news-ticker-track">
          <span>{track}</span>
          <span aria-hidden="true">{track}</span>
        </div>
      </div>
    </div>
  )
}
