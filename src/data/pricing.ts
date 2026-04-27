export interface PricingPlan {
  name: string
  price: string
  bestValue?: boolean
  features: string[]
}

export const PRICING: Record<number, PricingPlan[]> = {
  // ── Animation & Video ────────────────────────────────────────────────────
  6: [ // HeyGen
    { name: 'Free', price: '$0/mo', features: ['1 video/mo', '5 min max duration', 'Watermark on exports'] },
    { name: 'Creator', price: '$29/mo', bestValue: true, features: ['15 videos/mo', '1080p, no watermark', 'Avatar customisation'] },
    { name: 'Business', price: '$89/mo', features: ['30 videos/mo', 'Custom avatars', 'API access'] },
  ],
  7: [ // Synthesia
    { name: 'Free', price: '$0/mo', features: ['3 videos/mo', '5 min max', 'Watermark'] },
    { name: 'Starter', price: '$29/mo', bestValue: true, features: ['10 videos/mo', '230+ avatars, 1080p', '140 languages'] },
    { name: 'Creator', price: '$89/mo', features: ['30 videos/mo', 'Custom avatars', 'API access'] },
    { name: 'Enterprise', price: 'Custom', features: ['Unlimited videos', 'SSO + compliance', 'Dedicated support'] },
  ],
  10: [ // Veed.io
    { name: 'Free', price: '$0/mo', features: ['25 min exports/mo', '720p, watermark'] },
    { name: 'Basic', price: '$18/mo', bestValue: true, features: ['Unlimited exports', '1080p, no watermark', 'Auto-subtitles'] },
    { name: 'Pro', price: '$30/mo', features: ['4K export', 'Custom branding', 'Team collaboration'] },
  ],
  1: [ // Runway
    { name: 'Basic', price: 'Free trial', features: ['Limited credits', '720p, watermark'] },
    { name: 'Standard', price: '$15/mo', bestValue: true, features: ['625 credits/mo', '1080p, no watermark', 'Gen-3 Alpha'] },
    { name: 'Pro', price: '$35/mo', features: ['2,250 credits/mo', '4K', 'Priority generation'] },
    { name: 'Unlimited', price: '$95/mo', features: ['Unlimited generations', '4K, max speed'] },
  ],
  3: [ // Kling AI
    { name: 'Free', price: '$0/mo', features: ['Daily credits', '720p, watermark'] },
    { name: 'Standard', price: '$10/mo', bestValue: true, features: ['660 credits/mo', '1080p, no watermark'] },
    { name: 'Pro', price: '$35/mo', features: ['3,000 credits/mo', 'Priority queue'] },
  ],
  2: [ // Pika
    { name: 'Free', price: '$0/mo', features: ['150 credits/mo', '720p'] },
    { name: 'Basic', price: '$8/mo', bestValue: true, features: ['700 credits/mo', '1080p', 'Unlimited uploads'] },
    { name: 'Standard', price: '$28/mo', features: ['2,000 credits/mo', 'Priority queue'] },
  ],
  9: [ // InVideo AI
    { name: 'Free', price: '$0/mo', features: ['4 exports/wk', '720p, watermark'] },
    { name: 'Starter', price: '$20/mo', bestValue: true, features: ['Unlimited exports', '1080p, no watermark', 'iStock media'] },
    { name: 'Business', price: '$48/mo', features: ['4K export', 'Team seats', 'Priority support'] },
  ],
  4: [ // Sora
    { name: 'ChatGPT Plus', price: '$20/mo', features: ['Sora (limited)', '480p–1080p video', 'GPT-4o access'] },
    { name: 'ChatGPT Pro', price: '$200/mo', bestValue: true, features: ['Unlimited Sora videos', '1080p', 'Priority access'] },
  ],
  5: [ // Luma Dream Machine
    { name: 'Free', price: '$0/mo', features: ['30 generations/mo', '720p, watermark'] },
    { name: 'Standard', price: '$10/mo', bestValue: true, features: ['120 videos/mo', '1080p, no watermark'] },
    { name: 'Pro', price: '$30/mo', features: ['400 videos/mo', 'API access'] },
  ],
  8: [ // D-ID
    { name: 'Lite', price: 'Free', features: ['20 credit trial', '720p, watermark'] },
    { name: 'Basic', price: '$5.9/mo', bestValue: true, features: ['10 min video/mo', '1080p, no watermark'] },
    { name: 'Advanced', price: '$49.9/mo', features: ['60 min/mo', 'API + custom voices'] },
    { name: 'Enterprise', price: 'Custom', features: ['Unlimited', 'SLA + priority'] },
  ],
  11: [ // Genmo
    { name: 'Free', price: '$0/mo', features: ['100 credits/mo', '720p, watermark'] },
    { name: 'Standard', price: '$9/mo', bestValue: true, features: ['3,000 credits/mo', '1080p, no watermark'] },
    { name: 'Unlimited', price: '$49/mo', features: ['Unlimited credits', 'API access'] },
  ],

  // ── Image Generation ─────────────────────────────────────────────────────
  107: [ // Canva AI
    { name: 'Free', price: '$0/mo', features: ['50 AI images/mo', 'Basic templates'] },
    { name: 'Pro', price: '$15/mo', bestValue: true, features: ['Unlimited AI images', 'Brand kit', '100M+ assets'] },
    { name: 'Teams', price: '$30/mo', features: ['Team collaboration', 'Approval workflows'] },
  ],
  108: [ // Flux
    { name: 'Open weights', price: 'Free', bestValue: true, features: ['Self-host, unlimited', 'Full model access'] },
    { name: 'API — Schnell', price: '$0.003/image', features: ['Fast, commercial licence', 'No subscription'] },
    { name: 'API — Pro', price: '$0.055/image', features: ['Highest quality', 'Up to 4K'] },
  ],
  109: [ // Recraft
    { name: 'Free', price: '$0/mo', features: ['50 images/mo', 'PNG export'] },
    { name: 'Pro', price: '$12/mo', bestValue: true, features: ['1,000 images/mo', 'SVG export', 'Brand style lock'] },
    { name: 'Team', price: '$25/mo', features: ['3,000 images/mo', 'API access'] },
  ],
  105: [ // Ideogram
    { name: 'Free', price: '$0/mo', features: ['25 slow credits/day', 'Personal use'] },
    { name: 'Basic', price: '$7/mo', bestValue: true, features: ['400 priority credits/mo', '2K, commercial licence'] },
    { name: 'Plus', price: '$16/mo', features: ['1,000 credits/mo', 'Faster generation'] },
    { name: 'Pro', price: '$48/mo', features: ['4,000 credits/mo', 'API access'] },
  ],
  101: [ // Midjourney
    { name: 'Basic', price: '$10/mo', features: ['200 images/mo', '~3.3 hr fast time'] },
    { name: 'Standard', price: '$30/mo', bestValue: true, features: ['Unlimited relaxed', '15 hr fast time', 'Concurrent jobs'] },
    { name: 'Pro', price: '$60/mo', features: ['Stealth mode', '30 hr fast time', 'Private images'] },
    { name: 'Mega', price: '$120/mo', features: ['60 hr fast time', 'Max concurrent jobs'] },
  ],
  106: [ // Leonardo AI
    { name: 'Free', price: '$0/mo', features: ['150 tokens/day', 'Community models'] },
    { name: 'Apprentice', price: '$10/mo', bestValue: true, features: ['8,500 tokens/mo', 'All models, up to 4K'] },
    { name: 'Artisan', price: '$24/mo', features: ['25,000 tokens/mo', 'Fine-tuning'] },
    { name: 'Maestro', price: '$60/mo', features: ['60,000 tokens/mo', 'API access'] },
  ],
  103: [ // Stable Diffusion
    { name: 'Self-hosted', price: 'Free', bestValue: true, features: ['Unlimited generations', 'Full control + fine-tuning'] },
    { name: 'DreamStudio API', price: 'From $10', features: ['No GPU needed', 'Latest SDXL models', 'Pay as you go'] },
  ],
  104: [ // Adobe Firefly
    { name: 'Free', price: '$0/mo', features: ['25 credits/mo', 'Commercial safe'] },
    { name: 'Premium', price: '$4.99/mo', bestValue: true, features: ['100 credits/mo', 'All Firefly models', 'Commercial safe'] },
    { name: 'Creative Cloud', price: '$54.99/mo', features: ['All Adobe apps', '1,000 credits/mo'] },
  ],
  102: [ // DALL-E 3
    { name: 'ChatGPT Plus', price: '$20/mo', bestValue: true, features: ['Unlimited DALL-E 3', 'GPT-4o + in-chat editing'] },
    { name: 'API', price: '$0.04/image', features: ['1024×1024', 'No subscription, pay per use'] },
    { name: 'ChatGPT Team', price: '$30/user/mo', features: ['Team workspace', 'Higher limits'] },
  ],

  // ── Writing & Copy ───────────────────────────────────────────────────────
  205: [ // Writesonic
    { name: 'Free', price: '$0/mo', features: ['10k words/mo', 'GPT-3.5 base'] },
    { name: 'Individual', price: '$16/mo', bestValue: true, features: ['Unlimited words', 'GPT-4, web browsing'] },
    { name: 'Teams', price: '$35/mo', features: ['Multi-user', 'Brand voice', 'API'] },
  ],
  202: [ // Jasper
    { name: 'Creator', price: '$49/mo', bestValue: true, features: ['Unlimited words', 'Brand voice', 'AI templates'] },
    { name: 'Pro', price: '$69/mo', features: ['5 seats', 'Advanced brand training', 'Campaigns'] },
    { name: 'Business', price: 'Custom', features: ['Unlimited seats', 'Custom fine-tuning', 'API access'] },
  ],
  208: [ // Rytr
    { name: 'Free', price: '$0/mo', features: ['10k characters/mo', '40+ use cases'] },
    { name: 'Saver', price: '$9/mo', bestValue: true, features: ['100k characters/mo', 'Premium tones', 'Custom use case'] },
    { name: 'Unlimited', price: '$29/mo', features: ['Unlimited characters', 'Plagiarism checker'] },
  ],
  204: [ // Grammarly
    { name: 'Free', price: '$0/mo', features: ['Basic grammar', 'Browser extension'] },
    { name: 'Premium', price: '$12/mo', bestValue: true, features: ['Full rewrites', 'Plagiarism detection', 'Tone adjustments'] },
    { name: 'Business', price: '$15/user/mo', features: ['Team dashboard', 'Style guides', 'Analytics'] },
  ],
  201: [ // Claude (writing)
    { name: 'Free', price: '$0/mo', features: ['Claude 3.5 Sonnet', 'Limited messages/day'] },
    { name: 'Pro', price: '$20/mo', bestValue: true, features: ['Priority access', '5× more usage', 'Projects + memory'] },
    { name: 'Team', price: '$30/user/mo', features: ['Team workspace', 'Higher limits', 'Central billing'] },
  ],
  203: [ // Copy.ai
    { name: 'Free', price: '$0/mo', features: ['2,000 words/mo', 'Basic templates'] },
    { name: 'Starter', price: '$36/mo', bestValue: true, features: ['Unlimited words', 'Workflows', 'Multiple AI models'] },
    { name: 'Advanced', price: '$186/mo', features: ['Unlimited workflows', '5 seats', 'API access'] },
  ],
  207: [ // QuillBot
    { name: 'Free', price: '$0/mo', features: ['125 words/paraphrase', '3 writing modes'] },
    { name: 'Premium', price: '$8.33/mo', bestValue: true, features: ['Unlimited paraphrase', 'All modes', 'Advanced summariser'] },
  ],
  206: [ // Sudowrite
    { name: 'Hobby', price: '$10/mo', features: ['30k words/mo', 'Story Engine'] },
    { name: 'Professional', price: '$25/mo', bestValue: true, features: ['90k words/mo', 'Full features'] },
    { name: 'Max', price: '$100/mo', features: ['Unlimited words', 'Fastest models', 'Beta access'] },
  ],

  // ── Coding Assistants ────────────────────────────────────────────────────
  309: [ // v0
    { name: 'Free', price: '$0/mo', features: ['$5 credits/mo', 'React + shadcn UI'] },
    { name: 'Premium', price: '$20/mo', bestValue: true, features: ['$100 credits/mo', 'All models', 'Private projects'] },
    { name: 'Team', price: '$30/mo', features: ['$120 credits/mo', 'Shared projects'] },
  ],
  302: [ // Cursor
    { name: 'Hobby', price: 'Free', features: ['2,000 completions/mo', '50 slow premium requests'] },
    { name: 'Pro', price: '$20/mo', bestValue: true, features: ['Unlimited completions', '500 fast premium requests', 'Full codebase chat'] },
    { name: 'Business', price: '$40/user/mo', features: ['Team management', 'Privacy mode', 'SSO'] },
  ],
  310: [ // Lovable
    { name: 'Free', price: '$0/mo', features: ['5 credits/day', 'Full-stack + deploy'] },
    { name: 'Starter', price: '$25/mo', bestValue: true, features: ['100 credits/mo', 'Custom domains', 'GitHub sync'] },
    { name: 'Launch', price: '$50/mo', features: ['250 credits/mo', 'Multiple projects'] },
  ],
  304: [ // Windsurf
    { name: 'Free', price: '$0/mo', bestValue: true, features: ['Unlimited completions', 'Cascade agentic chat', 'GPT-4o access'] },
    { name: 'Pro', price: '$15/mo', features: ['Priority inference', 'More premium requests', 'Advanced models'] },
    { name: 'Teams', price: '$35/user/mo', features: ['Centralised billing', 'Usage analytics', 'Team admin'] },
  ],
  305: [ // Replit AI
    { name: 'Free', price: '$0/mo', features: ['Basic AI', 'Browser IDE', 'Community hosting'] },
    { name: 'Core', price: '$25/mo', bestValue: true, features: ['Full AI power', 'More compute', 'Private repls'] },
    { name: 'Teams', price: '$40/user/mo', features: ['Shared workspaces', 'Admin controls'] },
  ],
  301: [ // GitHub Copilot
    { name: 'Free', price: '$0/mo', features: ['2,000 completions/mo', '50 chat requests/mo'] },
    { name: 'Individual', price: '$10/mo', bestValue: true, features: ['Unlimited completions + chat', 'All IDEs'] },
    { name: 'Business', price: '$19/user/mo', features: ['Policy management', 'Audit logs', 'IP indemnity'] },
    { name: 'Enterprise', price: '$39/user/mo', features: ['Custom fine-tuning', 'Advanced security'] },
  ],
  308: [ // Bolt.new
    { name: 'Free', price: '$0/mo', features: ['150k tokens/day', 'Full-stack + deploy'] },
    { name: 'Personal', price: '$20/mo', bestValue: true, features: ['10M tokens/mo', 'Custom domains', 'Priority support'] },
    { name: 'Teams', price: '$50/mo', features: ['50M tokens/mo', 'Team collaboration'] },
  ],
  307: [ // Claude Code
    { name: 'Sonnet 4.6', price: '~$3/1M tokens', features: ['Fast agentic tasks', 'CLI + SDK', 'Multi-file edits'] },
    { name: 'Opus 4.7', price: '~$15/1M tokens', bestValue: true, features: ['Most capable model', 'Complex reasoning', 'Best for hard tasks'] },
  ],
  306: [ // Amazon Q
    { name: 'Free', price: '$0/mo', bestValue: true, features: ['Basic completions', 'AWS-aware suggestions', 'VS Code + JetBrains'] },
    { name: 'Pro', price: '$19/user/mo', features: ['Unlimited chat', 'Security scanning', 'Architecture diagrams'] },
  ],
  303: [ // Tabnine
    { name: 'Free', price: '$0/mo', features: ['Basic completions', 'Local model, privacy-first'] },
    { name: 'Pro', price: '$12/mo', bestValue: true, features: ['Full AI models', 'Chat', 'All IDEs'] },
    { name: 'Enterprise', price: 'Custom', features: ['On-premises', 'Custom model', 'Compliance controls'] },
  ],
  311: [ // Gemini Code Assist
    { name: 'Free', price: '$0/mo', bestValue: true, features: ['180k completions/mo', 'VS Code + JetBrains', 'Gemini 2.0'] },
    { name: 'Enterprise', price: '$19/user/mo', features: ['Private codebase tuning', 'Google Cloud integration', 'SSO + audit logs'] },
  ],
  312: [ // Cline
    { name: 'Free', price: 'Free', bestValue: true, features: ['Open source VS Code extension', 'Plan + Act modes', 'Any LLM provider'] },
    { name: 'API costs', price: 'Varies by provider', features: ['Claude Sonnet ~$3/1M tokens', 'GPT-4o, Gemini, local models'] },
  ],

  // ── Audio & Music ────────────────────────────────────────────────────────
  404: [ // Murf
    { name: 'Free', price: '$0/mo', features: ['10 min audio/mo', 'Watermark on exports'] },
    { name: 'Creator', price: '$19/mo', bestValue: true, features: ['24 hr audio/mo', '120+ voices, no watermark'] },
    { name: 'Business', price: '$39/mo', features: ['Unlimited audio', 'Team access', 'API + priority'] },
  ],
  405: [ // Descript
    { name: 'Free', price: '$0/mo', features: ['1 watermarked export/mo', 'Basic transcription'] },
    { name: 'Creator', price: '$12/mo', bestValue: true, features: ['10 hrs transcription/mo', 'Overdub voice', 'No watermark'] },
    { name: 'Business', price: '$24/mo', features: ['40 hrs/mo', 'Team collaboration', 'Advanced AI'] },
  ],
  402: [ // ElevenLabs
    { name: 'Free', price: '$0/mo', features: ['10k chars/mo', '10 voices'] },
    { name: 'Starter', price: '$5/mo', bestValue: true, features: ['30k chars/mo', 'Custom voices', 'Commercial licence'] },
    { name: 'Creator', price: '$22/mo', features: ['100k chars/mo', '30 custom voices', 'API access'] },
    { name: 'Pro', price: '$99/mo', features: ['500k chars/mo', '660 custom voices', 'Priority access'] },
  ],
  401: [ // Suno
    { name: 'Free', price: '$0/mo', features: ['50 songs/day', 'Personal use only'] },
    { name: 'Pro', price: '$8/mo', bestValue: true, features: ['2,500 songs/mo', 'Commercial licence', 'Priority generation'] },
    { name: 'Premier', price: '$24/mo', features: ['10,000 songs/mo', 'Highest priority'] },
  ],
  407: [ // Adobe Podcast
    { name: 'Free', price: '$0/mo', bestValue: true, features: ['Studio-quality audio', 'Noise removal', 'Speech enhancement'] },
  ],
  403: [ // Udio
    { name: 'Free', price: '$0/mo', bestValue: true, features: ['1,200 tracks/mo', 'All genres', 'Basic commercial use'] },
    { name: 'Standard', price: '$10/mo', features: ['4,800 tracks/mo', 'Extended audio'] },
    { name: 'Pro', price: '$30/mo', features: ['14,400 tracks/mo', 'Full commercial rights', 'API access'] },
  ],
  406: [ // AIVA
    { name: 'Free', price: '$0/mo', features: ['3 downloads/mo', 'Non-commercial use'] },
    { name: 'Standard', price: '$11/mo', bestValue: true, features: ['15 downloads/mo', 'Royalty-free', 'All instruments'] },
    { name: 'Pro', price: '$33/mo', features: ['Unlimited downloads', 'Full copyright ownership'] },
  ],

  // ── Chat & Research ──────────────────────────────────────────────────────
  501: [ // ChatGPT
    { name: 'Free', price: '$0/mo', features: ['GPT-4o (limited)', 'Web browsing, image gen'] },
    { name: 'Plus', price: '$20/mo', bestValue: true, features: ['GPT-4o unlimited', 'Advanced data analysis', 'Priority access'] },
    { name: 'Team', price: '$30/user/mo', features: ['Team workspace', 'Admin controls', 'Higher limits'] },
    { name: 'Enterprise', price: 'Custom', features: ['Custom fine-tuning', 'SSO', 'Advanced security'] },
  ],
  502: [ // Perplexity
    { name: 'Free', price: '$0/mo', features: ['Unlimited basic search', '5 Pro queries/day'] },
    { name: 'Pro', price: '$20/mo', bestValue: true, features: ['Unlimited Pro search', 'File uploads', 'API credits included'] },
  ],
  508: [ // Claude (chat)
    { name: 'Free', price: '$0/mo', features: ['Claude 3.5 Sonnet', 'Limited daily messages'] },
    { name: 'Pro', price: '$20/mo', bestValue: true, features: ['Priority access', '5× more messages', 'Projects + memory'] },
    { name: 'Team', price: '$30/user/mo', features: ['Team workspace', 'Higher limits', 'Central billing'] },
  ],
  503: [ // Gemini
    { name: 'Free', price: '$0/mo', features: ['Gemini 2.0 Flash', 'Google Workspace access'] },
    { name: 'Advanced', price: '$19.99/mo', bestValue: true, features: ['Gemini 2.0 Ultra', '1M token context', 'Deep Research'] },
    { name: 'Business', price: '$24/user/mo', features: ['Full Google Workspace AI', 'Admin + enterprise security'] },
  ],
  505: [ // Mistral
    { name: 'Free Chat', price: '$0/mo', bestValue: true, features: ['Mistral Large model', 'Fast, EU-hosted'] },
    { name: 'API', price: 'From $0.1/1M tokens', features: ['Any Mistral model', 'OpenAI-compatible'] },
    { name: 'Enterprise', price: 'Custom', features: ['Private deployment', 'Custom fine-tuning', 'On-premises'] },
  ],
  507: [ // You.com
    { name: 'Free', price: '$0/mo', features: ['Basic search + chat', 'Code + writing modes'] },
    { name: 'Pro', price: '$15/mo', bestValue: true, features: ['GPT-4 + Claude models', 'Advanced research mode', 'No ads'] },
  ],
  504: [ // Grok
    { name: 'X Premium', price: '$8/mo', features: ['Grok 2 (basic)', 'X/Twitter feed integration'] },
    { name: 'X Premium+', price: '$40/mo', bestValue: true, features: ['Grok 3 full access', 'Think mode', 'Priority access'] },
  ],
  509: [ // DeepSeek
    { name: 'Free Chat', price: '$0/mo', bestValue: true, features: ['DeepSeek V3 + R1', 'Web access, no subscription'] },
    { name: 'API', price: '$0.028/1M tokens', features: ['OpenAI-compatible', 'R1 reasoning model', 'Cache discounts'] },
  ],
  510: [ // Microsoft Copilot
    { name: 'Free', price: '$0/mo', bestValue: true, features: ['GPT-4 Turbo + Bing', 'Image generation'] },
    { name: 'Pro', price: '$20/user/mo', features: ['Priority access', 'Microsoft 365 AI integration'] },
    { name: 'M365 Copilot', price: '$30/user/mo', features: ['Word, Excel, Teams AI', 'Email summaries, meeting recap'] },
  ],
  511: [ // Meta AI
    { name: 'Free', price: '$0/mo', bestValue: true, features: ['Powered by Llama', 'WhatsApp, Instagram + web', 'Image generation'] },
  ],

  // ── 3D & Design ──────────────────────────────────────────────────────────
  603: [ // Meshy
    { name: 'Free', price: '$0/mo', features: ['200 credits/mo', 'FBX + OBJ export'] },
    { name: 'Pro', price: '$16/mo', bestValue: true, features: ['1,000 credits/mo', 'GLTF + STL, priority queue'] },
    { name: 'Max', price: '$40/mo', features: ['4,000 credits/mo', 'API access', 'Commercial licence'] },
  ],
  604: [ // Tripo3D
    { name: 'Free', price: '$0/mo', features: ['100 credits/mo', 'Standard quality'] },
    { name: 'Basic', price: '$8/mo', bestValue: true, features: ['500 credits/mo', 'PBR materials', 'Commercial use'] },
    { name: 'Pro', price: '$24/mo', features: ['2,000 credits/mo', 'API access', 'Highest quality'] },
  ],
  601: [ // Spline AI
    { name: 'Free', price: '$0/mo', features: ['Unlimited scenes', 'Spline watermark', 'AI generation'] },
    { name: 'Pro', price: '$9/mo', bestValue: true, features: ['No watermark', 'Custom domains', 'Team access'] },
    { name: 'Team', price: '$17/user/mo', features: ['Shared libraries', 'Admin controls', 'Priority support'] },
  ],
  605: [ // Blockade Labs
    { name: 'Free', price: '$0/mo', features: ['Limited exports', 'Watermark'] },
    { name: 'Starter', price: '$12/mo', bestValue: true, features: ['50 exports/mo', 'No watermark', '360° skybox'] },
    { name: 'Pro', price: '$25/mo', features: ['200 exports/mo', 'API access', '4K resolution'] },
  ],

  // ── Productivity ─────────────────────────────────────────────────────────
  704: [ // Reclaim.ai
    { name: 'Free', price: '$0/mo', features: ['1 calendar', 'Basic habits'] },
    { name: 'Starter', price: '$8/user/mo', bestValue: true, features: ['Unlimited habits', 'Task sync', 'Smart buffer times'] },
    { name: 'Business', price: '$12/user/mo', features: ['Team features', 'Scheduling links', 'Analytics'] },
    { name: 'Enterprise', price: '$18/user/mo', features: ['SSO', 'Admin controls', 'Priority support'] },
  ],
  707: [ // Taskade
    { name: 'Free', price: '$0/mo', features: ['Unlimited tasks', '5 AI agents/mo'] },
    { name: 'Plus', price: '$8/mo', bestValue: true, features: ['Unlimited AI agents', 'Advanced automation', 'Team collaboration'] },
    { name: 'Pro', price: '$16/mo', features: ['Priority AI', 'Custom agents', 'Analytics + API'] },
  ],
  701: [ // Notion AI
    { name: 'Free + AI', price: '$8/mo add-on', features: ['AI on free Notion plan', '1,000 block limit'] },
    { name: 'Plus + AI', price: '$16/mo total', bestValue: true, features: ['Unlimited blocks', 'AI summarise + draft', 'Unlimited guests'] },
    { name: 'Business + AI', price: '$23/mo total', features: ['Advanced permissions', 'SSO support', 'Custom exports'] },
  ],
  706: [ // Zapier AI
    { name: 'Free', price: '$0/mo', features: ['100 tasks/mo', 'Basic Zaps'] },
    { name: 'Starter', price: '$19.99/mo', bestValue: true, features: ['750 tasks/mo', 'Multi-step Zaps', 'AI workflow builder'] },
    { name: 'Professional', price: '$49/mo', features: ['Unlimited Zaps', 'Premium apps'] },
  ],
  702: [ // Otter.ai
    { name: 'Free', price: '$0/mo', features: ['300 min/mo transcription', 'AI summaries'] },
    { name: 'Pro', price: '$10/mo', bestValue: true, features: ['1,200 min/mo', 'Custom vocabulary', 'Zoom + Teams sync'] },
    { name: 'Business', price: '$20/user/mo', features: ['6,000 min/mo', 'Team analytics', 'Priority support'] },
  ],
  703: [ // Motion
    { name: 'Individual', price: '$19/mo', bestValue: true, features: ['AI task scheduling', 'Calendar + tasks', 'Smart prioritisation'] },
    { name: 'Team', price: '$12/user/mo', features: ['Shared schedules', 'Team task tracking', 'Manager view'] },
  ],
  705: [ // Mem.ai
    { name: 'Free', price: '$0/mo', features: ['Basic notes', 'Manual organisation'] },
    { name: 'Pro', price: '$8/mo', bestValue: true, features: ['AI search', 'Auto-organisation', 'Smart connections'] },
  ],
  708: [ // Gamma
    { name: 'Free', price: '$0/mo', features: ['400 AI credits (~10 decks)', 'Gamma watermark'] },
    { name: 'Plus', price: '$8/mo', bestValue: true, features: ['Unlimited AI credits', 'No watermark', 'Custom fonts'] },
    { name: 'Pro', price: '$20/mo', features: ['Analytics', 'Custom domains', 'API access'] },
  ],
  709: [ // Fireflies.ai
    { name: 'Free', price: '$0/mo', features: ['Unlimited transcription', 'Limited AI summaries', '800 min storage'] },
    { name: 'Pro', price: '$10/user/mo', bestValue: true, features: ['Unlimited AI summaries', 'CRM sync', 'Unlimited storage'] },
    { name: 'Business', price: '$19/user/mo', features: ['Team analytics', 'Custom vocabulary', 'API access'] },
  ],

  // ── Marketing ─────────────────────────────────────────────────────────────
  803: [ // Sprout Social
    { name: 'Standard', price: '$249/user/mo', features: ['5 social profiles', 'AI Assist content'] },
    { name: 'Professional', price: '$399/user/mo', bestValue: true, features: ['Unlimited profiles', 'Social listening', 'Competitive reports'] },
    { name: 'Advanced', price: '$499/user/mo', features: ['Chatbots', 'CSAT reports', 'Message spike alerts'] },
  ],
  801: [ // AdCreative.ai
    { name: 'Starter', price: '$29/mo', features: ['10 credits/mo', 'Static ads', 'Meta + Google'] },
    { name: 'Professional', price: '$99/mo', bestValue: true, features: ['100 credits/mo', 'Video ads', 'Performance scoring'] },
    { name: 'Scale', price: '$189/mo', features: ['500 credits/mo', 'API access', 'White-label reports'] },
  ],
  802: [ // Madgicx
    { name: 'Starter', price: '$44/mo', features: ['Meta ad management', 'AI targeting'] },
    { name: 'Pro', price: '$149/mo', bestValue: true, features: ['Meta + Google', 'Creative analysis', 'Bid optimisation'] },
    { name: 'Enterprise', price: 'Custom', features: ['Dedicated manager', 'Custom integrations', 'SLA'] },
  ],
  804: [ // Brand24
    { name: 'Individual', price: '$79/mo', features: ['3 keywords', 'Social monitoring'] },
    { name: 'Team', price: '$149/mo', bestValue: true, features: ['7 keywords', 'Advanced sentiment', 'Competitive analysis'] },
    { name: 'Pro', price: '$199/mo', features: ['12 keywords', 'Podcast monitoring', 'API access'] },
  ],
  805: [ // Hootsuite
    { name: 'Professional', price: '$99/mo', features: ['1 user', '10 accounts', 'OwlyWriter AI'] },
    { name: 'Team', price: '$249/mo', bestValue: true, features: ['3 users', '20 accounts', 'Team collaboration'] },
    { name: 'Enterprise', price: 'Custom', features: ['Unlimited users', 'Custom workflows', 'Dedicated support'] },
  ],
  806: [ // Pencil
    { name: 'Starter', price: '$14/mo', features: ['6 free ads on signup', 'Static + video ads'] },
    { name: 'Growth', price: '$119/mo', bestValue: true, features: ['50 ads/mo', 'Performance prediction', 'Meta + TikTok'] },
    { name: 'Scale', price: '$299/mo', features: ['200 ads/mo', 'API access', 'Priority support'] },
  ],
  807: [ // Lately
    { name: 'Starter', price: '$119/mo', features: ['Content repurposing', 'Social scheduling', '3 channels'] },
    { name: 'Professional', price: '$249/mo', bestValue: true, features: ['Unlimited channels', 'Brand voice AI', 'Analytics'] },
    { name: 'Enterprise', price: 'Custom', features: ['White-label', 'API access', 'Dedicated support'] },
  ],
  808: [ // Albert.ai
    { name: 'Enterprise', price: 'From $2,000/mo', bestValue: true, features: ['Autonomous media buying', 'Cross-channel AI', 'Dedicated team'] },
    { name: 'Custom', price: 'Custom', features: ['Custom integrations', 'White-glove onboarding', 'SLA'] },
  ],

  // ── Finance ───────────────────────────────────────────────────────────────
  907: [ // PortfolioPilot
    { name: 'Free', price: '$0/mo', bestValue: true, features: ['Portfolio analysis', 'AI scoring + recommendations', 'Unlimited accounts'] },
    { name: 'Premium', price: '$20/mo', features: ['AI advisor chat', 'Tax optimisation', 'Retirement planning'] },
  ],
  906: [ // Seeking Alpha
    { name: 'Free', price: '$0/mo', features: ['Limited articles', 'Basic market data'] },
    { name: 'Premium', price: '$269/yr', bestValue: true, features: ['Unlimited research', 'AI Quant Ratings', 'Earnings analysis'] },
    { name: 'Alpha Picks', price: '$499/yr', features: ['Stock picks service', 'Buy/sell signals', 'Portfolio tracking'] },
  ],
  904: [ // Simply Wall St
    { name: 'Free', price: '$0/mo', features: ['Limited stocks', 'Snowflake analysis'] },
    { name: 'Premium', price: '$10/mo', bestValue: true, features: ['100k+ stocks globally', 'Snowflake scoring', 'Portfolio analysis'] },
    { name: 'Unlimited', price: '$25/mo', features: ['Custom screeners', 'API access', 'Advanced filters'] },
  ],
  905: [ // Magnifi
    { name: 'Free', price: '$0/mo', features: ['Limited queries', '15k+ securities search'] },
    { name: 'Premium', price: '$8.25/mo', bestValue: true, features: ['Unlimited AI search', 'Risk analysis', 'Commission-free trades'] },
  ],
  902: [ // TrendSpider
    { name: 'Basic', price: '$59/mo', features: ['5 charts', 'Auto trendlines'] },
    { name: 'Plus', price: '$119/mo', bestValue: true, features: ['10 charts', 'Multi-timeframe analysis', 'Sidekick AI analyst'] },
    { name: 'Premium', price: '$199/mo', features: ['Unlimited charts', 'Strategy tester', 'Alert center'] },
  ],
  903: [ // Composer
    { name: 'Annual', price: '$384/yr', bestValue: true, features: ['No-code strategies', 'AI backtesting', 'Live auto-trading'] },
    { name: 'Monthly', price: '$52/mo', features: ['Same features', 'Month-to-month, no lock-in'] },
  ],
  901: [ // AlphaSense
    { name: 'Professional', price: 'From $10K/seat/yr', bestValue: true, features: ['SEC filings + earnings AI', 'Broker research', 'Smart Summaries'] },
    { name: 'Enterprise', price: 'Custom', features: ['LLM-ready API', 'SSO + compliance', 'Dedicated support'] },
  ],
  908: [ // Kensho
    { name: 'Enterprise', price: 'Custom', bestValue: true, features: ['Financial data APIs', 'Earnings call analytics', 'LLM-ready pipeline'] },
  ],

  // ── Accounting ────────────────────────────────────────────────────────────
  1001: [ // Intuit Assist (QuickBooks)
    { name: 'Simple Start', price: '$30/mo', features: ['Basic bookkeeping AI', 'Invoice automation', '1 user'] },
    { name: 'Plus', price: '$85/mo', bestValue: true, features: ['AI accounts + inventory', 'Project tracking', '5 users'] },
    { name: 'Advanced', price: '$200/mo', features: ['Batch invoicing AI', 'Custom reporting', '25 users'] },
  ],
  1002: [ // Dext
    { name: 'Starter', price: '$34/mo', features: ['200 items/mo', 'Receipt capture', 'QuickBooks + Xero'] },
    { name: 'Business', price: '$69/mo', bestValue: true, features: ['500 items/mo', 'Bank integration', 'Multi-currency'] },
    { name: 'Premium', price: '$149/mo', features: ['Unlimited items', 'API access', 'Multi-client'] },
  ],
  1004: [ // Pilot
    { name: 'Starter', price: '$499/mo', features: ['Up to $200K/yr revenue', 'Monthly bookkeeping'] },
    { name: 'Core', price: '$749/mo', bestValue: true, features: ['Up to $2M/yr revenue', 'Accrual accounting', 'Dedicated team'] },
    { name: 'Select', price: 'Custom', features: ['Enterprise scale', 'CFO advisory'] },
  ],
  1003: [ // Vic.ai
    { name: 'Enterprise', price: 'Custom', bestValue: true, features: ['Autonomous AP processing', '99% accuracy', 'SAP + Oracle + Dynamics'] },
  ],
  1005: [ // MindBridge
    { name: 'Enterprise', price: 'Custom', bestValue: true, features: ['100% ledger analysis', 'Fraud detection AI', 'Audit-ready reports'] },
  ],
  1006: [ // AutoEntry
    { name: 'Starter', price: '$24/mo', features: ['50 documents/mo', 'Receipt + invoice capture'] },
    { name: 'Business', price: '$55/mo', bestValue: true, features: ['200 documents/mo', 'Bank statements', 'QuickBooks + Xero + Sage'] },
    { name: 'Professional', price: '$99/mo', features: ['500 documents/mo', 'Multi-client', 'API access'] },
  ],

  // ── Legal ──────────────────────────────────────────────────────────────────
  1103: [ // CoCounsel
    { name: 'Professional', price: '$225/user/mo', features: ['Case law research', 'Document review', 'Westlaw integration'] },
    { name: 'Enterprise', price: 'Custom', bestValue: true, features: ['Firm-wide deployment', 'Custom workflows', 'SSO + compliance'] },
  ],
  1104: [ // Ironclad
    { name: 'Business', price: 'From ~$15K/yr', features: ['AI contract drafting', 'Workflow automation', 'E-signature'] },
    { name: 'Enterprise', price: 'Custom', bestValue: true, features: ['Custom AI training', 'Advanced analytics', 'SSO + compliance'] },
  ],
  1105: [ // Clio
    { name: 'Starter', price: '$39/user/mo', features: ['Case management', 'Time + billing', 'Client portal'] },
    { name: 'Boutique', price: '$79/user/mo', bestValue: true, features: ['AI document templates', 'Advanced billing', 'Integrations'] },
    { name: 'Elite', price: '$129/user/mo', features: ['Full AI assistant', 'Advanced analytics', 'Custom reporting'] },
  ],
  1101: [ // Harvey AI
    { name: 'Professional', price: 'From ~$1,200/user/mo', bestValue: true, features: ['Contract analysis', 'Due diligence', 'Litigation support'] },
    { name: 'Enterprise', price: 'Custom', features: ['Custom fine-tuning', 'Firm data integration', 'Dedicated support'] },
  ],
}
