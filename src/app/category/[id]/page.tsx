import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CATEGORIES, TOOLS, nameToSlug } from '@/data/tools'
import CategoryRoute from '@/components/CategoryRoute'

const CATEGORY_FAQS: Record<string, { q: string; a: string }[]> = {
  animation: [
    { q: 'What are the best AI animation tools in 2026?', a: 'The top AI animation tools in 2026 are Runway, Pika, and Kling. Runway leads for professional video generation, Pika is best for quick social clips, and Kling offers the best free tier for beginners.' },
    { q: 'Are AI animation tools free?', a: 'Most AI animation tools offer a free tier with limited credits. Kling and Pika both offer free plans. Runway provides limited free generations before requiring a paid subscription.' },
    { q: 'What can AI animation tools create?', a: 'AI animation tools can generate video from text or images, animate still photos, create motion graphics, and produce short video clips without any video editing experience required.' },
    { q: 'Which AI animation tool is best for beginners?', a: 'Pika is the most beginner-friendly AI animation tool — type a description and get a short animated clip in seconds with no technical setup needed.' },
    { q: 'How do AI video generators compare to traditional animation software?', a: 'AI video generators are dramatically faster and require no animation skills. Traditional software like After Effects offers more control but a steep learning curve. AI tools are best for quick content creation; professionals often combine both.' },
  ],
  image: [
    { q: 'What are the best AI image generators in 2026?', a: 'The best AI image generators in 2026 are Midjourney, DALL-E 3, Stable Diffusion, and Adobe Firefly. Midjourney leads for artistic quality, DALL-E 3 for prompt accuracy, and Firefly for commercially safe images.' },
    { q: 'Are AI image generators free to use?', a: 'Several AI image generators offer free tiers. Adobe Firefly, Microsoft Designer, and Canva AI are free with limits. Midjourney requires a paid subscription starting from $10/month.' },
    { q: 'Can I use AI-generated images commercially?', a: 'It depends on the tool. Adobe Firefly images are commercially safe by design. Midjourney requires a Pro plan for commercial use. Always check the specific tool\'s terms of service before using AI images commercially.' },
    { q: 'What resolution do AI image generators produce?', a: 'Most tools generate images at 1024×1024 pixels or higher. Midjourney can upscale to 4K, and DALL-E 3 outputs up to 1792×1024 pixels. Maximum resolution varies by subscription tier.' },
    { q: 'Which AI image tool is best for logos and branding?', a: 'Adobe Firefly and Canva AI are best for branding due to commercially safe training data and clean outputs. Midjourney produces more artistic results but requires careful licensing review before commercial use.' },
  ],
  writing: [
    { q: 'What are the best AI writing tools in 2026?', a: 'The top AI writing tools in 2026 are Claude, ChatGPT, Jasper, and Copy.ai. Claude and ChatGPT excel at long-form content; Jasper and Copy.ai are purpose-built for marketing copy.' },
    { q: 'Are AI writing tools free?', a: 'Several AI writing tools have free tiers. ChatGPT, Claude, and Notion AI all offer free access with usage limits. Jasper and Copy.ai require paid subscriptions for full access.' },
    { q: 'Can AI writing tools replace human writers?', a: 'AI writing tools are best used as assistants, not replacements. They excel at drafts, outlines, and variations but still require human editing for accuracy, tone, and originality.' },
    { q: 'Which AI writing tool is best for SEO content?', a: 'Jasper is purpose-built for SEO content creation. ChatGPT and Claude can also generate SEO-optimised content when given specific instructions about keywords and structure.' },
    { q: 'How accurate are AI writing tools?', a: 'AI writing tools can produce confident-sounding but factually incorrect content. Always fact-check AI-generated writing before publishing. Claude and Perplexity tend to be more accurate and better at citing sources.' },
  ],
  coding: [
    { q: 'What are the best AI coding tools in 2026?', a: 'The best AI coding tools in 2026 are GitHub Copilot, Cursor, Claude, and Tabnine. Cursor leads for full IDE integration; Copilot for inline suggestions; Claude for complex problem-solving and code review.' },
    { q: 'Are AI coding tools free?', a: 'GitHub Copilot is free for students and open-source contributors. Cursor and Tabnine offer free tiers. Claude and ChatGPT provide free access with usage limits.' },
    { q: 'Can AI coding tools write full applications?', a: 'AI coding tools can write substantial portions of an application but require human oversight for architecture, security, and edge cases. They are best at boilerplate, refactoring, and explaining unfamiliar code.' },
    { q: 'Which AI coding tool is best for beginners?', a: 'GitHub Copilot and Cursor are the most beginner-friendly, providing in-editor suggestions and explanations as you type. ChatGPT and Claude are also excellent for explaining concepts and debugging.' },
    { q: 'Do AI coding tools support all programming languages?', a: 'Major AI coding tools support dozens of languages including Python, JavaScript, TypeScript, Go, Rust, and Java. GitHub Copilot and Cursor have the broadest language support across frameworks and languages.' },
  ],
  audio: [
    { q: 'What are the best AI audio tools in 2026?', a: 'The top AI audio tools in 2026 are ElevenLabs, Murf, Descript, and Adobe Podcast. ElevenLabs leads for voice cloning realism; Descript is best for podcast editing; Adobe Podcast for AI noise removal.' },
    { q: 'Are AI voice generators free?', a: 'ElevenLabs and Murf both offer free tiers with limited monthly characters. Descript has a free plan with usage limits. Adobe Podcast\'s AI noise removal is free to use without a subscription.' },
    { q: 'Can AI tools clone my voice?', a: 'Yes — ElevenLabs, Murf, and Resemble AI can clone a voice from a short audio sample. Most tools require consent from the voice owner and prohibit impersonation in their terms of service.' },
    { q: 'What is AI audio used for?', a: 'AI audio tools are used for text-to-speech narration, podcast editing, music generation, voice cloning, background noise removal, and transcription. They are popular with content creators, podcasters, and video producers.' },
    { q: 'Which AI tool is best for removing background noise?', a: 'Adobe Podcast\'s AI noise removal and Krisp are the top options for removing background noise from audio. Both produce professional-quality results without requiring technical audio knowledge.' },
  ],
  chat: [
    { q: 'What are the best AI chatbots in 2026?', a: 'The best AI chatbots in 2026 are Claude, ChatGPT, Gemini, and Perplexity. Claude leads for writing and analysis; ChatGPT for breadth and plugins; Gemini for Google Workspace integration; Perplexity for real-time web search.' },
    { q: 'Are AI chat tools free to use?', a: 'Claude, ChatGPT, and Gemini all offer free tiers with daily usage limits. Perplexity is free with a Pro option for more searches. Access to the most powerful AI models requires a paid subscription.' },
    { q: 'What is the difference between Claude, ChatGPT, and Gemini?', a: 'Claude excels at writing, coding, and nuanced reasoning. ChatGPT is the most versatile with the largest plugin ecosystem. Gemini integrates deeply with Google Workspace. Perplexity searches the web in real time and cites sources.' },
    { q: 'Which AI chatbot is most accurate?', a: 'Accuracy varies by task. Perplexity is best for factual queries with cited sources. Claude and ChatGPT are strongest for reasoning tasks. All AI chatbots can produce errors — always verify important information.' },
    { q: 'Can I use AI chat tools for business?', a: 'Yes — Claude, ChatGPT, and Gemini all offer business plans with higher limits, data privacy guarantees, and custom configurations. ChatGPT Enterprise and Claude for Work are the most popular business options.' },
  ],
  '3d': [
    { q: 'What are the best AI 3D tools in 2026?', a: 'The top AI 3D tools in 2026 are Luma AI, Meshy, CSM AI, and Spline AI. Luma AI leads for photorealistic 3D capture; Meshy for text-to-3D model generation; Spline for interactive 3D web design.' },
    { q: 'Are AI 3D tools free?', a: 'Luma AI and Spline AI both offer free tiers. Meshy has a free plan with limited monthly credits. Most AI 3D tools offer enough free access to evaluate the tool before committing to a subscription.' },
    { q: 'What can AI 3D tools create?', a: 'AI 3D tools can generate 3D models from text descriptions, convert 2D images to 3D, reconstruct real-world objects from video using NeRF technology, and create interactive 3D web experiences without modeling skills.' },
    { q: 'Do I need 3D modeling experience to use AI 3D tools?', a: 'No — tools like Meshy and Luma AI are designed for non-technical users. You can generate or capture 3D models using text prompts or your phone camera without any 3D modeling experience.' },
    { q: 'Can AI 3D models be used in game development?', a: 'Yes — AI-generated 3D models from Meshy and CSM AI can be exported in standard formats (GLTF, OBJ, FBX) for use in Unity, Unreal Engine, and Blender. Some clean-up may be required for production-quality assets.' },
  ],
  productivity: [
    { q: 'What are the best AI productivity tools in 2026?', a: 'The top AI productivity tools in 2026 are Notion AI, Otter.ai, Reclaim, Motion, and Zapier. Notion AI leads for knowledge management; Otter.ai for meeting transcription; Reclaim and Motion for intelligent calendar scheduling.' },
    { q: 'Are AI productivity tools free?', a: 'Notion AI, Otter.ai, and Reclaim all offer free tiers. Notion AI\'s free plan covers basic AI writing features. Otter.ai free includes 300 minutes of monthly transcription. Most tools offer generous free trials.' },
    { q: 'How can AI tools improve productivity?', a: 'AI productivity tools automate repetitive tasks like scheduling, note-taking, and email drafting. They summarise long documents, transcribe meetings, manage your calendar intelligently, and integrate with your existing workflow tools.' },
    { q: 'Which AI tool is best for meeting notes and transcription?', a: 'Otter.ai is the leading AI meeting transcription tool, offering real-time transcription, speaker identification, and automatic summaries. It integrates with Zoom, Google Meet, and Microsoft Teams.' },
    { q: 'Can AI productivity tools integrate with other apps?', a: 'Yes — most AI productivity tools integrate with popular apps. Zapier connects to 7,000+ apps. Notion AI works within Notion\'s ecosystem. Reclaim and Motion integrate with Google Calendar and Slack.' },
  ],
}

const BASE = 'https://directr.com.au'

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ id: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const cat = CATEGORIES.find((c) => c.slug === id)
  if (!cat) return {}
  const tools = TOOLS[cat.id] ?? []
  const topTools = tools.slice(0, 3).map((t) => t.name).join(', ')
  const url = `${BASE}/category/${cat.slug}`
  return {
    title: `Best ${cat.name} AI Tools 2026 — Compare ${cat.count} Tools`,
    description: `Compare the ${cat.count} best AI tools for ${cat.name.toLowerCase()} in 2026. Top picks: ${topTools}. Unbiased ratings, real pricing and reviews — updated weekly.`,
    alternates: { canonical: url },
    openGraph: {
      title: `Best ${cat.name} AI Tools 2026`,
      description: `Compare ${cat.count} tools · Top picks: ${topTools} · Updated weekly`,
      url,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cat = CATEGORIES.find((c) => c.slug === id)
  if (!cat) notFound()

  const tools = TOOLS[cat.id] ?? []
  const url = `${BASE}/category/${cat.slug}`

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best ${cat.name} AI Tools 2026`,
    description: `The top ${cat.count} AI tools for ${cat.name.toLowerCase()}`,
    url,
    numberOfItems: tools.length,
    itemListElement: tools.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      url: `${BASE}/tool/${nameToSlug(t.name)}`,
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: `Best ${cat.name} AI Tools`, item: url },
    ],
  }

  const faqs = CATEGORY_FAQS[cat.id] ?? []
  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <CategoryRoute cat={cat} />
    </>
  )
}
