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
  marketing: [
    { q: 'What are the best AI marketing tools in 2026?', a: 'The top AI marketing tools in 2026 are Jasper, Copy.ai, Surfer SEO, AdCreative.ai, and HubSpot AI. Jasper leads for long-form content; AdCreative.ai for ad creative generation; Surfer SEO for search-optimised content strategy.' },
    { q: 'Are AI marketing tools free?', a: 'Copy.ai and HubSpot AI both offer free tiers with usage limits. Most AI marketing tools — including Jasper and AdCreative.ai — require a paid subscription, though free trials are common.' },
    { q: 'Can AI tools replace a marketing team?', a: 'AI marketing tools accelerate content production and campaign analysis but cannot replace strategic thinking, brand judgement, or creative direction. They are most effective when used by marketers to scale output, not as a substitute for the team.' },
    { q: 'Which AI tool is best for ad creative?', a: 'AdCreative.ai is purpose-built for generating ad creatives at scale, producing image and copy variants optimised for conversion. Canva AI and Adobe Firefly are strong alternatives for brand-aligned visual ads.' },
    { q: 'How do AI marketing tools help with SEO?', a: 'AI SEO tools like Surfer SEO and Clearscope analyse top-ranking content, suggest keyword density, and score your drafts in real time. Combined with AI writers like Jasper, they can produce search-optimised content significantly faster than manual workflows.' },
  ],
  finance: [
    { q: 'What are the best AI finance tools in 2026?', a: 'The top AI finance tools in 2026 include Planful, Mosaic, Domo AI, and Bloomberg GPT-powered terminals. These tools cover financial planning and analysis, forecasting, reporting automation, and real-time market intelligence.' },
    { q: 'Are AI finance tools safe to use with sensitive data?', a: 'Enterprise AI finance tools like Planful and Mosaic are built with SOC 2 compliance and data encryption. Always verify a tool\'s data handling policies before connecting financial data — avoid entering sensitive figures into general-purpose AI chatbots.' },
    { q: 'Can AI tools automate financial forecasting?', a: 'Yes — AI finance tools can generate rolling forecasts, scenario models, and variance analysis automatically from your existing data. Mosaic and Planful are designed specifically for this, pulling live data from ERP and accounting systems.' },
    { q: 'Which AI tool is best for financial reporting?', a: 'Planful and Mosaic are the leading AI tools for financial reporting, offering automated consolidation, board-ready dashboards, and narrative generation. They integrate with major ERP systems including NetSuite, Sage, and QuickBooks.' },
    { q: 'How are AI tools used in investment and trading?', a: 'AI is used in finance for algorithmic trading, portfolio risk analysis, sentiment analysis from earnings calls, and fraud detection. Institutional platforms like Bloomberg Terminal and Refinitiv now embed AI features; retail investors typically access AI insights through tools like Kavout or Danelfin.' },
  ],
  accounting: [
    { q: 'What are the best AI accounting tools in 2026?', a: 'The top AI accounting tools in 2026 are QuickBooks AI, Xero, Botkeeper, and Vic.ai. QuickBooks and Xero offer embedded AI for bookkeeping automation; Botkeeper provides AI-powered bookkeeping as a managed service; Vic.ai automates accounts payable.' },
    { q: 'Can AI replace accountants?', a: 'AI automates high-volume, rules-based tasks like transaction categorisation, invoice matching, and bank reconciliation — but cannot replace the judgement required for tax strategy, audit, or advisory work. Most accounting firms use AI to free up time for higher-value services.' },
    { q: 'Are AI accounting tools secure?', a: 'Leading AI accounting tools like QuickBooks, Xero, and Vic.ai are built with bank-grade encryption and compliance frameworks. Look for SOC 2 Type II certification and regional data residency options before choosing a tool for your practice.' },
    { q: 'Which AI tool is best for accounts payable automation?', a: 'Vic.ai and Stampli are the leading AI tools for accounts payable, automating invoice capture, GL coding, and approval routing. Both integrate with major ERP systems and reduce manual data entry by 80%+ in most deployments.' },
    { q: 'How do AI tools help with bookkeeping?', a: 'AI bookkeeping tools automatically categorise transactions, reconcile bank feeds, match invoices to purchase orders, and flag anomalies for review. Botkeeper and QuickBooks AI handle the bulk of routine bookkeeping, allowing accountants to focus on review and advisory tasks.' },
  ],
  legal: [
    { q: 'What are the best AI legal tools in 2026?', a: 'The top AI legal tools in 2026 are Harvey AI, Clio Duo, Lexis+ AI, and Contract Companion. Harvey AI leads for legal research and drafting at law firms; Clio Duo for practice management; Lexis+ AI for case law research with citations.' },
    { q: 'Are AI legal tools reliable for contract review?', a: 'AI contract review tools like Harvey AI and Contract Companion are highly effective at identifying missing clauses, flagging non-standard terms, and summarising obligations. They should be used to assist lawyers, not replace legal review — final sign-off should always involve a qualified solicitor.' },
    { q: 'Can AI tools do legal research?', a: 'Yes — Lexis+ AI and Westlaw Precision use AI to surface relevant case law, statutes, and secondary sources with citations. They dramatically reduce research time but require lawyer verification before relying on results in practice.' },
    { q: 'Which AI tool is best for small law firms?', a: 'Clio Duo is the most practical AI tool for small firms, combining AI-powered practice management with document drafting and client communication features. It integrates with the full Clio suite used by over 150,000 legal professionals.' },
    { q: 'Is AI-generated legal content admissible?', a: 'AI-generated legal documents and research are tools, not final products. Courts have sanctioned lawyers for submitting AI-hallucinated citations — always verify all AI-generated legal research and have qualified lawyers review and sign off on any documents before use.' },
  ],
  hr: [
    { q: 'What are the best AI HR tools in 2026?', a: 'The top AI HR tools in 2026 are Workday AI, Paradox (Olivia), Eightfold AI, and Leena AI. Workday AI leads for enterprise HR; Paradox for automated candidate screening; Eightfold for AI-powered talent matching; Leena for employee self-service.' },
    { q: 'Are AI HR tools free?', a: 'Most enterprise AI HR tools require paid subscriptions and are priced per employee or per module. Some smaller tools offer free tiers — Leena AI and certain ATS integrations have trial plans. Full AI-powered HRIS platforms like Workday and BambooHR are subscription-based.' },
    { q: 'Can AI tools improve hiring?', a: 'AI hiring tools can reduce time-to-hire by automating screening, scheduling, and initial outreach. Paradox (Olivia) and Eightfold AI match candidates to roles based on skills and potential, not just keywords. Human review should remain in the process to avoid bias and ensure fit.' },
    { q: 'Which AI tool is best for employee engagement?', a: 'Leena AI and Glint (Microsoft Viva) are the leading AI tools for employee engagement, offering always-on sentiment analysis, pulse surveys, and AI-generated insights for HR teams. They identify flight risks and engagement trends before they become retention problems.' },
    { q: 'How do AI tools help with compliance in HR?', a: 'AI HR tools can flag non-compliant job descriptions, monitor for pay equity gaps, and automate compliance reporting across jurisdictions. Workday AI and SAP SuccessFactors include built-in compliance frameworks for regions including the EU, US, and Australia.' },
  ],
  construction: [
    { q: 'What are the best AI construction tools in 2026?', a: 'The top AI construction tools in 2026 are Procore AI, Autodesk Construction Cloud AI, OpenSpace, and Buildots. Procore AI leads for project management; OpenSpace and Buildots for AI-powered site progress tracking using 360° photos and computer vision.' },
    { q: 'How is AI used in construction?', a: 'AI is used in construction for project scheduling, cost estimation, safety monitoring, defect detection, BIM analysis, and site progress tracking. Computer vision tools like OpenSpace capture site conditions automatically and compare against plans to identify delays and deviations.' },
    { q: 'Can AI tools improve construction safety?', a: 'Yes — AI safety tools analyse site photos and video feeds in real time to detect PPE violations, unsafe conditions, and near-miss events. Procore Safety and SmartVid use computer vision to flag hazards before incidents occur, reducing recordable injury rates on site.' },
    { q: 'Which AI tool is best for construction cost estimation?', a: 'Procore AI and Buildxact are the leading options for AI-assisted cost estimation, learning from historical project data to improve accuracy over time. They integrate with supplier pricing databases to keep estimates current with real material costs.' },
    { q: 'Are AI construction tools suitable for small builders?', a: 'Buildxact and CoConstruct are designed for small-to-medium builders, offering AI-assisted estimating, scheduling, and client communication at a lower price point than enterprise platforms. Most offer free trials to evaluate fit before committing.' },
  ],
  data: [
    { q: 'What are the best AI data analytics tools in 2026?', a: 'The top AI data analytics tools in 2026 are Tableau AI, Power BI Copilot, ThoughtSpot, and Databricks AI. Tableau AI and Power BI Copilot lead for business intelligence; ThoughtSpot for natural language querying; Databricks for large-scale data engineering and ML.' },
    { q: 'Are AI data tools free?', a: 'Power BI has a free desktop version with limited sharing. ThoughtSpot offers a free trial. Most enterprise AI data tools — Tableau, Databricks, Looker — require paid subscriptions. Google Looker Studio is free for basic reporting with Google data sources.' },
    { q: 'Can I query data using plain English with AI tools?', a: 'Yes — ThoughtSpot, Power BI Copilot, and Tableau Pulse let you ask questions in plain English ("Show me revenue by region last quarter") and generate charts automatically. This makes data exploration accessible without SQL or BI expertise.' },
    { q: 'Which AI tool is best for data visualisation?', a: 'Tableau AI remains the gold standard for interactive data visualisation, with AI-generated chart recommendations and automated insight summaries. Power BI Copilot is a strong alternative — especially for Microsoft 365 environments — with natural language report generation built in.' },
    { q: 'How do AI tools help data engineers?', a: 'AI tools assist data engineers with pipeline generation, SQL query writing, data quality monitoring, and documentation. Databricks AI and dbt AI features can generate transformation code from descriptions, flag data anomalies, and auto-document lineage — accelerating pipeline development significantly.' },
  ],
  education: [
    { q: 'What are the best AI education tools in 2026?', a: 'The top AI education tools in 2026 are Khan Academy Khanmigo, Synthesis, Duolingo AI, Coursera AI, and Quizlet AI. Khanmigo leads for personalised tutoring; Duolingo for AI-powered language learning; Synthesis for maths and problem-solving.' },
    { q: 'Are AI education tools free?', a: 'Duolingo and Khan Academy are free at the core. Khanmigo (AI tutor) requires a Khan Academy subscription. Quizlet AI has free and paid tiers. Coursera and edX offer free course auditing but charge for certificates and AI tutor features.' },
    { q: 'Can AI tools personalise learning for students?', a: 'Yes — AI education tools like Khanmigo and Synthesis adapt to each student\'s pace, identify knowledge gaps, and adjust difficulty in real time. This personalisation was previously only possible with one-on-one human tutoring.' },
    { q: 'Which AI tool is best for language learning?', a: 'Duolingo remains the most widely used AI language learning platform, with personalised lesson pacing and conversational AI practice. Babbel and Rosetta Stone also offer AI-powered adaptive curricula for more structured learners.' },
    { q: 'Is AI use in education ethical?', a: 'AI in education raises questions around academic integrity, data privacy, and equity of access. Most institutions now have AI use policies — students should check their school\'s guidelines. Tools designed for education (Khanmigo, Synthesis) are built with appropriate safeguards; general AI chatbots require more careful use in academic contexts.' },
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
      <CategoryRoute cat={cat} faqs={faqs} />
    </>
  )
}
