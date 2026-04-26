export interface Example {
  title: string
  image: string
}

const img = (id: number, i: number) =>
  `https://picsum.photos/seed/${id}-${i}/600/400`

export const EXAMPLES: Record<number, Example[]> = {
  // ── Animation & Video ────────────────────────────────────────────────────
  6: [ // HeyGen
    { title: 'Marketing spokesperson video', image: img(6, 0) },
    { title: 'Multilingual product explainer', image: img(6, 1) },
    { title: 'AI avatar training content', image: img(6, 2) },
  ],
  7: [ // Synthesia
    { title: 'Corporate onboarding video', image: img(7, 0) },
    { title: '40-language product demo', image: img(7, 1) },
    { title: 'Internal communications clip', image: img(7, 2) },
  ],
  10: [ // Veed.io
    { title: 'YouTube video with auto-subtitles', image: img(10, 0) },
    { title: 'Background-removed talking head', image: img(10, 1) },
    { title: 'Podcast clip with captions', image: img(10, 2) },
  ],
  1: [ // Runway
    { title: 'Text-to-video scene generation', image: img(1, 0) },
    { title: 'AI inpainting to remove objects', image: img(1, 1) },
    { title: 'Motion brush animation', image: img(1, 2) },
  ],
  3: [ // Kling AI
    { title: 'Hyper-realistic product animation', image: img(3, 0) },
    { title: 'Photo-to-video scene transition', image: img(3, 1) },
    { title: 'AI-generated cinematic shot', image: img(3, 2) },
  ],
  2: [ // Pika
    { title: 'Social media reel from text', image: img(2, 0) },
    { title: 'Image-to-video animation', image: img(2, 1) },
    { title: 'Cinematic style clip', image: img(2, 2) },
  ],
  9: [ // InVideo AI
    { title: 'Blog post turned into video', image: img(9, 0) },
    { title: 'YouTube video with stock footage', image: img(9, 1) },
    { title: 'Social media ad with voiceover', image: img(9, 2) },
  ],
  4: [ // Sora
    { title: '60-second cinematic video', image: img(4, 0) },
    { title: 'Brand story from a script', image: img(4, 1) },
    { title: 'Abstract concept visualised', image: img(4, 2) },
  ],
  5: [ // Luma Dream Machine
    { title: 'Artistic loop animation', image: img(5, 0) },
    { title: 'Surreal dreamscape video', image: img(5, 1) },
    { title: 'Mood reel for a creative brief', image: img(5, 2) },
  ],
  8: [ // D-ID
    { title: 'Photo-to-talking video for outreach', image: img(8, 0) },
    { title: 'E-learning module with AI presenter', image: img(8, 1) },
    { title: 'Personalised video message', image: img(8, 2) },
  ],
  11: [ // Genmo
    { title: 'Still photo animated to video', image: img(11, 0) },
    { title: 'Nature scene brought to life', image: img(11, 1) },
    { title: 'Artistic illustration animated', image: img(11, 2) },
  ],

  // ── Image Generation ─────────────────────────────────────────────────────
  107: [ // Canva AI
    { title: 'On-brand social media graphic', image: img(107, 0) },
    { title: 'Presentation slide visuals', image: img(107, 1) },
    { title: 'Marketing flyer background', image: img(107, 2) },
  ],
  108: [ // Flux
    { title: 'Photorealistic product photo', image: img(108, 0) },
    { title: 'Fashion editorial concept', image: img(108, 1) },
    { title: 'Architecture visualisation', image: img(108, 2) },
  ],
  109: [ // Recraft
    { title: 'Editable SVG brand icon', image: img(109, 0) },
    { title: 'Consistent illustration set', image: img(109, 1) },
    { title: 'Vector UI element pack', image: img(109, 2) },
  ],
  105: [ // Ideogram
    { title: 'Poster with bold typography', image: img(105, 0) },
    { title: 'Logo concept with text overlay', image: img(105, 1) },
    { title: 'Event flyer with legible text', image: img(105, 2) },
  ],
  101: [ // Midjourney
    { title: 'Fantasy concept art scene', image: img(101, 0) },
    { title: 'Product packaging illustration', image: img(101, 1) },
    { title: 'Character design sheet', image: img(101, 2) },
  ],
  106: [ // Leonardo AI
    { title: 'Game environment concept art', image: img(106, 0) },
    { title: 'Character sprite sheet', image: img(106, 1) },
    { title: 'Fantasy weapon asset', image: img(106, 2) },
  ],
  103: [ // Stable Diffusion
    { title: 'Fine-tuned portrait in custom style', image: img(103, 0) },
    { title: 'Product photo inpainted', image: img(103, 1) },
    { title: 'Unlimited local generation', image: img(103, 2) },
  ],
  104: [ // Adobe Firefly
    { title: 'Commercially safe stock image', image: img(104, 0) },
    { title: 'Background removal and fill', image: img(104, 1) },
    { title: 'Photoshop generative expand', image: img(104, 2) },
  ],
  102: [ // DALL·E 3
    { title: 'Complex scene from detailed prompt', image: img(102, 0) },
    { title: "Children's book illustration", image: img(102, 1) },
    { title: 'Technical diagram visualised', image: img(102, 2) },
  ],

  // ── Writing & Copy ───────────────────────────────────────────────────────
  205: [ // Writesonic
    { title: 'SEO-optimised blog article', image: img(205, 0) },
    { title: 'Google Ad copy variants', image: img(205, 1) },
    { title: 'Landing page with strong CTA', image: img(205, 2) },
  ],
  202: [ // Jasper
    { title: 'Brand voice email campaign', image: img(202, 0) },
    { title: 'Long-form marketing white paper', image: img(202, 1) },
    { title: 'Product launch press release', image: img(202, 2) },
  ],
  208: [ // Rytr
    { title: 'Cold email sequence', image: img(208, 0) },
    { title: 'Instagram caption variants', image: img(208, 1) },
    { title: 'Product description batch', image: img(208, 2) },
  ],
  204: [ // Grammarly
    { title: 'Grammar corrected in real-time', image: img(204, 0) },
    { title: 'Tone adjusted for professional email', image: img(204, 1) },
    { title: 'Technical doc rewritten for clarity', image: img(204, 2) },
  ],
  201: [ // Claude (writing)
    { title: 'Long-form essay with analysis', image: img(201, 0) },
    { title: 'Nuanced professional report', image: img(201, 1) },
    { title: 'Multi-document synthesis', image: img(201, 2) },
  ],
  203: [ // Copy.ai
    { title: 'Facebook ad copy variants', image: img(203, 0) },
    { title: 'Email subject line A/B test', image: img(203, 1) },
    { title: 'Product description set', image: img(203, 2) },
  ],
  207: [ // QuillBot
    { title: 'Academic paper paraphrased', image: img(207, 0) },
    { title: 'Research article summarised', image: img(207, 1) },
    { title: 'Essay grammar-checked', image: img(207, 2) },
  ],
  206: [ // Sudowrite
    { title: 'Novel chapter continuation', image: img(206, 0) },
    { title: 'Screenplay scene written', image: img(206, 1) },
    { title: 'Character backstory developed', image: img(206, 2) },
  ],

  // ── Coding Assistants ────────────────────────────────────────────────────
  309: [ // v0
    { title: 'React dashboard from a prompt', image: img(309, 0) },
    { title: 'Landing page UI generated', image: img(309, 1) },
    { title: 'shadcn component set built', image: img(309, 2) },
  ],
  302: [ // Cursor
    { title: 'Multi-file refactor across codebase', image: img(302, 0) },
    { title: 'Bug diagnosed with full context', image: img(302, 1) },
    { title: 'New feature written from a comment', image: img(302, 2) },
  ],
  310: [ // Lovable
    { title: 'Full-stack app with Supabase', image: img(310, 0) },
    { title: 'SaaS landing page deployed', image: img(310, 1) },
    { title: 'User auth system built', image: img(310, 2) },
  ],
  304: [ // Windsurf
    { title: 'End-to-end feature implemented', image: img(304, 0) },
    { title: 'Multi-step coding task automated', image: img(304, 1) },
    { title: 'Entire module rewritten agentically', image: img(304, 2) },
  ],
  305: [ // Replit AI
    { title: 'Python script built in browser', image: img(305, 0) },
    { title: 'Web app deployed instantly', image: img(305, 1) },
    { title: 'Beginner learns to code with AI', image: img(305, 2) },
  ],
  301: [ // GitHub Copilot
    { title: 'Autocomplete in VS Code', image: img(301, 0) },
    { title: 'Unit test generated from code', image: img(301, 1) },
    { title: 'Boilerplate eliminated instantly', image: img(301, 2) },
  ],
  308: [ // Bolt.new
    { title: 'Full-stack app from one prompt', image: img(308, 0) },
    { title: 'npm packages installed and run', image: img(308, 1) },
    { title: 'React app deployed to production', image: img(308, 2) },
  ],
  307: [ // Claude Code
    { title: 'Entire codebase refactored', image: img(307, 0) },
    { title: 'Complex bug traced and fixed', image: img(307, 1) },
    { title: 'Multi-file feature implemented', image: img(307, 2) },
  ],
  306: [ // Amazon Q
    { title: 'AWS Lambda function generated', image: img(306, 0) },
    { title: 'Security vulnerability scanned', image: img(306, 1) },
    { title: 'CloudFormation template written', image: img(306, 2) },
  ],
  303: [ // Tabnine
    { title: 'On-prem code completion deployed', image: img(303, 0) },
    { title: 'Private codebase context used', image: img(303, 1) },
    { title: 'Enterprise privacy policy enforced', image: img(303, 2) },
  ],
  311: [ // Gemini Code Assist
    { title: '180K completions per month free', image: img(311, 0) },
    { title: 'Google Cloud functions generated', image: img(311, 1) },
    { title: 'JetBrains IDE integrated', image: img(311, 2) },
  ],
  312: [ // Cline
    { title: 'Autonomous multi-file edit', image: img(312, 0) },
    { title: 'Terminal command executed by AI', image: img(312, 1) },
    { title: 'MCP tool called in context', image: img(312, 2) },
  ],

  // ── Audio & Music ────────────────────────────────────────────────────────
  404: [ // Murf
    { title: 'E-learning narration voiceover', image: img(404, 0) },
    { title: 'Product demo with AI voice', image: img(404, 1) },
    { title: 'Explainer video audio track', image: img(404, 2) },
  ],
  405: [ // Descript
    { title: 'Podcast filler words removed', image: img(405, 0) },
    { title: 'Voice overdubbed via transcript', image: img(405, 1) },
    { title: 'Audio edited by deleting text', image: img(405, 2) },
  ],
  402: [ // ElevenLabs
    { title: 'Voice cloned from 1-minute sample', image: img(402, 0) },
    { title: 'Audiobook narrated by AI voice', image: img(402, 1) },
    { title: 'Multilingual dubbing', image: img(402, 2) },
  ],
  401: [ // Suno
    { title: 'Full song from genre + mood prompt', image: img(401, 0) },
    { title: 'Custom jingle for a brand', image: img(401, 1) },
    { title: 'Acoustic track with vocals', image: img(401, 2) },
  ],
  407: [ // Adobe Podcast
    { title: 'Laptop mic upgraded to studio quality', image: img(407, 0) },
    { title: 'Background noise removed', image: img(407, 1) },
    { title: 'Interview audio enhanced', image: img(407, 2) },
  ],
  403: [ // Udio
    { title: 'High-fidelity electronic track', image: img(403, 0) },
    { title: 'Orchestral score generated', image: img(403, 1) },
    { title: 'Genre-specific style controlled', image: img(403, 2) },
  ],
  406: [ // AIVA
    { title: 'Film score for a trailer', image: img(406, 0) },
    { title: 'Game level background music', image: img(406, 1) },
    { title: 'Royalty-free ambient track', image: img(406, 2) },
  ],

  // ── Chat & Research ──────────────────────────────────────────────────────
  501: [ // ChatGPT
    { title: 'Complex question answered', image: img(501, 0) },
    { title: 'Python code written and explained', image: img(501, 1) },
    { title: 'Essay drafted and refined', image: img(501, 2) },
  ],
  502: [ // Perplexity
    { title: 'Research question with live citations', image: img(502, 0) },
    { title: 'Latest news summarised', image: img(502, 1) },
    { title: 'Competitor analysis with sources', image: img(502, 2) },
  ],
  508: [ // Claude (chat)
    { title: '100-page document analysed', image: img(508, 0) },
    { title: 'Research synthesised from PDFs', image: img(508, 1) },
    { title: 'Nuanced argument constructed', image: img(508, 2) },
  ],
  503: [ // Gemini
    { title: 'Image explained and described', image: img(503, 0) },
    { title: 'Google doc summarised in Workspace', image: img(503, 1) },
    { title: 'Research with live web results', image: img(503, 2) },
  ],
  505: [ // Mistral
    { title: 'Self-hosted LLM on own server', image: img(505, 0) },
    { title: 'Fast API calls at low cost', image: img(505, 1) },
    { title: 'European data-compliant model', image: img(505, 2) },
  ],
  507: [ // You.com
    { title: 'Code mode debugging session', image: img(507, 0) },
    { title: 'Web search with AI answer', image: img(507, 1) },
    { title: 'Research with custom AI apps', image: img(507, 2) },
  ],
  504: [ // Grok
    { title: 'Trending X topic explained', image: img(504, 0) },
    { title: 'Real-time news summarised', image: img(504, 1) },
    { title: 'Unfiltered opinion on a debate', image: img(504, 2) },
  ],
  509: [ // DeepSeek
    { title: 'Complex reasoning problem solved', image: img(509, 0) },
    { title: 'Code written at GPT-4o quality', image: img(509, 1) },
    { title: 'API at 10× cheaper than OpenAI', image: img(509, 2) },
  ],
  510: [ // Microsoft Copilot
    { title: 'Email summarised in Outlook', image: img(510, 0) },
    { title: 'Excel data analysed with AI', image: img(510, 1) },
    { title: 'Teams meeting summarised', image: img(510, 2) },
  ],
  511: [ // Meta AI
    { title: 'WhatsApp question answered', image: img(511, 0) },
    { title: 'Instagram caption suggested', image: img(511, 1) },
    { title: 'Facebook group post drafted', image: img(511, 2) },
  ],

  // ── 3D & Design ──────────────────────────────────────────────────────────
  603: [ // Meshy
    { title: 'Game-ready 3D model from text', image: img(603, 0) },
    { title: 'Product 3D from a photo', image: img(603, 1) },
    { title: 'Textured character asset', image: img(603, 2) },
  ],
  604: [ // Tripo3D
    { title: 'High-fidelity model from image', image: img(604, 0) },
    { title: 'PBR-textured scene object', image: img(604, 1) },
    { title: '3D asset exported for Blender', image: img(604, 2) },
  ],
  601: [ // Spline AI
    { title: 'Interactive 3D web animation', image: img(601, 0) },
    { title: 'Product mockup in 3D', image: img(601, 1) },
    { title: 'Animated hero scene for website', image: img(601, 2) },
  ],
  605: [ // Blockade Labs
    { title: '360° VR game environment', image: img(605, 0) },
    { title: 'Virtual film set background', image: img(605, 1) },
    { title: 'Immersive AR skybox', image: img(605, 2) },
  ],

  // ── Productivity ─────────────────────────────────────────────────────────
  704: [ // Reclaim.ai
    { title: 'Focus time blocked automatically', image: img(704, 0) },
    { title: 'Habit scheduled around meetings', image: img(704, 1) },
    { title: 'Meeting rescheduled by AI', image: img(704, 2) },
  ],
  707: [ // Taskade
    { title: 'AI agent researches a topic', image: img(707, 0) },
    { title: 'Project plan built from prompt', image: img(707, 1) },
    { title: 'Team tasks managed autonomously', image: img(707, 2) },
  ],
  701: [ // Notion AI
    { title: 'Meeting notes summarised', image: img(701, 0) },
    { title: 'Document drafted from bullets', image: img(701, 1) },
    { title: 'Database auto-filled with AI', image: img(701, 2) },
  ],
  706: [ // Zapier AI
    { title: 'CRM to email automation built', image: img(706, 0) },
    { title: 'Lead routing workflow automated', image: img(706, 1) },
    { title: '6,000 apps connected in plain English', image: img(706, 2) },
  ],
  702: [ // Otter.ai
    { title: 'Zoom call transcribed in real-time', image: img(702, 0) },
    { title: 'Speaker-identified meeting summary', image: img(702, 1) },
    { title: 'Action items extracted', image: img(702, 2) },
  ],
  703: [ // Motion
    { title: 'Tasks scheduled around calendar', image: img(703, 0) },
    { title: 'Deadlines rescheduled automatically', image: img(703, 1) },
    { title: 'Daily plan optimised by AI', image: img(703, 2) },
  ],
  705: [ // Mem.ai
    { title: 'Relevant note surfaced automatically', image: img(705, 0) },
    { title: 'Knowledge base queried in plain language', image: img(705, 1) },
    { title: 'Research thread connected', image: img(705, 2) },
  ],
  708: [ // Gamma
    { title: 'Presentation built in 60 seconds', image: img(708, 0) },
    { title: 'Blog post turned into slides', image: img(708, 1) },
    { title: 'Client proposal deck generated', image: img(708, 2) },
  ],
  709: [ // Fireflies.ai
    { title: 'Sales call transcribed in 100+ languages', image: img(709, 0) },
    { title: 'CRM updated from call notes', image: img(709, 1) },
    { title: 'Meeting intelligence searched', image: img(709, 2) },
  ],

  // ── Marketing ─────────────────────────────────────────────────────────────
  803: [ // Sprout Social
    { title: 'Social posts scheduled with AI', image: img(803, 0) },
    { title: 'Brand sentiment monitored', image: img(803, 1) },
    { title: 'Competitor social tracked', image: img(803, 2) },
  ],
  801: [ // AdCreative.ai
    { title: 'Meta ad creative generated at scale', image: img(801, 0) },
    { title: 'Performance-optimised banner', image: img(801, 1) },
    { title: 'Video ad created in seconds', image: img(801, 2) },
  ],
  802: [ // Madgicx
    { title: 'Meta ad audience auto-targeted', image: img(802, 0) },
    { title: 'Ad bid optimised by AI', image: img(802, 1) },
    { title: 'E-commerce creative analysed', image: img(802, 2) },
  ],
  804: [ // Brand24
    { title: 'Brand mention detected in real-time', image: img(804, 0) },
    { title: 'Competitor coverage monitored', image: img(804, 1) },
    { title: 'PR crisis flagged early', image: img(804, 2) },
  ],
  805: [ // Hootsuite
    { title: 'Caption generated from URL', image: img(805, 0) },
    { title: 'Top post repurposed with AI', image: img(805, 1) },
    { title: 'Content calendar scheduled', image: img(805, 2) },
  ],
  806: [ // Pencil
    { title: 'Video ad performance predicted', image: img(806, 0) },
    { title: 'Creative variant tested with data', image: img(806, 1) },
    { title: 'TikTok ad generated in minutes', image: img(806, 2) },
  ],
  807: [ // Lately
    { title: 'Podcast clipped into 30 posts', image: img(807, 0) },
    { title: 'Blog post atomised for social', image: img(807, 1) },
    { title: 'Brand hook library built', image: img(807, 2) },
  ],
  808: [ // Albert.ai
    { title: 'Ad budget allocated autonomously', image: img(808, 0) },
    { title: 'Cross-channel campaign optimised', image: img(808, 1) },
    { title: 'Search and social synced by AI', image: img(808, 2) },
  ],

  // ── Finance ───────────────────────────────────────────────────────────────
  907: [ // PortfolioPilot
    { title: 'Portfolio scored and analysed', image: img(907, 0) },
    { title: 'Retirement plan projected', image: img(907, 1) },
    { title: 'Tax-loss opportunities found', image: img(907, 2) },
  ],
  906: [ // Seeking Alpha
    { title: 'Stock quant rating reviewed', image: img(906, 0) },
    { title: 'Earnings call analysed', image: img(906, 1) },
    { title: 'Investment thesis validated', image: img(906, 2) },
  ],
  904: [ // Simply Wall St
    { title: 'Stock Snowflake score read', image: img(904, 0) },
    { title: 'Valuation checked visually', image: img(904, 1) },
    { title: 'Dividend safety assessed', image: img(904, 2) },
  ],
  905: [ // Magnifi
    { title: 'ETF searched by criteria', image: img(905, 0) },
    { title: 'Portfolio risk scored', image: img(905, 1) },
    { title: 'Commission-free trade placed', image: img(905, 2) },
  ],
  902: [ // TrendSpider
    { title: 'Trendlines auto-detected on chart', image: img(902, 0) },
    { title: 'Multi-timeframe chart analysed', image: img(902, 1) },
    { title: 'Trading strategy backtested', image: img(902, 2) },
  ],
  903: [ // Composer
    { title: 'Algorithm built in plain English', image: img(903, 0) },
    { title: 'Backtest run in 60 seconds', image: img(903, 1) },
    { title: 'Automated strategy deployed', image: img(903, 2) },
  ],
  901: [ // AlphaSense
    { title: 'Earnings call semantically searched', image: img(901, 0) },
    { title: 'SEC filing key terms extracted', image: img(901, 1) },
    { title: 'Market trend found across 1000s of docs', image: img(901, 2) },
  ],
  908: [ // Kensho
    { title: 'Financial document transcribed', image: img(908, 0) },
    { title: 'Earnings entities extracted', image: img(908, 1) },
    { title: 'LLM-ready data piped into workflow', image: img(908, 2) },
  ],

  // ── Accounting ────────────────────────────────────────────────────────────
  1001: [ // Intuit Assist
    { title: 'Invoice auto-generated in QuickBooks', image: img(1001, 0) },
    { title: 'Bookkeeping reconciled monthly', image: img(1001, 1) },
    { title: 'Payroll processed with AI', image: img(1001, 2) },
  ],
  1002: [ // Dext
    { title: 'Receipt scanned and data extracted', image: img(1002, 0) },
    { title: 'Invoice data captured at 99.9%', image: img(1002, 1) },
    { title: 'Bank statement auto-categorised', image: img(1002, 2) },
  ],
  1004: [ // Pilot
    { title: 'Transactions categorised by AI', image: img(1004, 0) },
    { title: 'Monthly books closed automatically', image: img(1004, 1) },
    { title: 'Startup financial report generated', image: img(1004, 2) },
  ],
  1003: [ // Vic.ai
    { title: 'AP invoice processed autonomously', image: img(1003, 0) },
    { title: 'SAP ERP integrated with AI', image: img(1003, 1) },
    { title: '97–99% invoice processing accuracy', image: img(1003, 2) },
  ],
  1005: [ // MindBridge
    { title: '100% of GL transactions analysed', image: img(1005, 0) },
    { title: 'Fraud anomaly flagged by AI', image: img(1005, 1) },
    { title: 'Audit risk scored automatically', image: img(1005, 2) },
  ],
  1006: [ // AutoEntry
    { title: 'Receipt OCR-captured and posted', image: img(1006, 0) },
    { title: 'Xero auto-posted from invoices', image: img(1006, 1) },
    { title: 'Bank statements digitised', image: img(1006, 2) },
  ],

  // ── Legal ──────────────────────────────────────────────────────────────────
  1103: [ // CoCounsel
    { title: 'Case law researched with Westlaw', image: img(1103, 0) },
    { title: 'Contract clause reviewed by AI', image: img(1103, 1) },
    { title: 'Due diligence document analysed', image: img(1103, 2) },
  ],
  1104: [ // Ironclad
    { title: 'Contract drafted by AI', image: img(1104, 0) },
    { title: 'Approval workflow automated', image: img(1104, 1) },
    { title: 'Contract repository organised', image: img(1104, 2) },
  ],
  1105: [ // Clio
    { title: 'Client billing automated', image: img(1105, 0) },
    { title: 'Time entry captured from notes', image: img(1105, 1) },
    { title: 'Case file managed with AI', image: img(1105, 2) },
  ],
  1101: [ // Harvey AI
    { title: 'M&A due diligence accelerated', image: img(1101, 0) },
    { title: 'Contract risk clause flagged', image: img(1101, 1) },
    { title: 'Regulatory brief drafted', image: img(1101, 2) },
  ],
  1102: [ // Spellbook
    { title: 'Clause suggested inside Word', image: img(1102, 0) },
    { title: 'Contract redlined by AI', image: img(1102, 1) },
    { title: 'Missing provision flagged', image: img(1102, 2) },
  ],
  1106: [ // Luminance
    { title: 'Due diligence document reviewed', image: img(1106, 0) },
    { title: 'Contract anomaly detected', image: img(1106, 1) },
    { title: 'Bulk contract portfolio analysed', image: img(1106, 2) },
  ],
  1107: [ // DoNotPay
    { title: 'Parking ticket appeal drafted', image: img(1107, 0) },
    { title: 'Subscription cancelled by AI', image: img(1107, 1) },
    { title: 'Small claims letter written', image: img(1107, 2) },
  ],

  // ── HR & Recruiting ───────────────────────────────────────────────────────
  1206: [ // Fetcher
    { title: 'Candidates sourced automatically', image: img(1206, 0) },
    { title: 'Outreach email personalised by AI', image: img(1206, 1) },
    { title: 'ATS populated with candidates', image: img(1206, 2) },
  ],
  1205: [ // Phenom
    { title: 'Candidate experience personalised', image: img(1205, 0) },
    { title: 'Internal mobility matched by AI', image: img(1205, 1) },
    { title: 'Workforce plan modelled', image: img(1205, 2) },
  ],
  1204: [ // Paradox
    { title: 'Candidate screened via chat', image: img(1204, 0) },
    { title: 'Interview scheduled by Olivia AI', image: img(1204, 1) },
    { title: 'FAQ answered 24/7 via SMS', image: img(1204, 2) },
  ],
  1201: [ // Eightfold.ai
    { title: 'Hidden skill identified in resume', image: img(1201, 0) },
    { title: 'Internal talent redeployed', image: img(1201, 1) },
    { title: 'Candidate potential predicted', image: img(1201, 2) },
  ],
  1202: [ // HireVue
    { title: 'One-way video interview completed', image: img(1202, 0) },
    { title: 'Cognitive assessment game-based', image: img(1202, 1) },
    { title: 'High-volume campus hiring screened', image: img(1202, 2) },
  ],
  1203: [ // Textio
    { title: 'Job description diversity-scored', image: img(1203, 0) },
    { title: 'Underperforming JD rewritten', image: img(1203, 1) },
    { title: 'Manager feedback improved by AI', image: img(1203, 2) },
  ],
  1207: [ // Workday AI
    { title: 'Skills gap identified across org', image: img(1207, 0) },
    { title: 'Workforce plan AI-modelled', image: img(1207, 1) },
    { title: 'Financial anomaly detected in payroll', image: img(1207, 2) },
  ],
  1208: [ // Beamery
    { title: 'Talent pipeline proactively built', image: img(1208, 0) },
    { title: 'Candidate skills matched by AI', image: img(1208, 1) },
    { title: 'Internal mobility pathway mapped', image: img(1208, 2) },
  ],

  // ── Construction ──────────────────────────────────────────────────────────
  1301: [ // Togal.AI
    { title: 'Architectural plan measured in seconds', image: img(1301, 0) },
    { title: 'Quantity takeoff generated by AI', image: img(1301, 1) },
    { title: 'Floor area labelled automatically', image: img(1301, 2) },
  ],
  1303: [ // Procore
    { title: 'RFI drafted by Procore Assist', image: img(1303, 0) },
    { title: 'Spec reviewed with AI', image: img(1303, 1) },
    { title: 'Submittal workflow automated', image: img(1303, 2) },
  ],
  1302: [ // OpenSpace
    { title: '360° site photos auto-located', image: img(1302, 0) },
    { title: 'BIM progress tracked visually', image: img(1302, 1) },
    { title: 'Procore integrated with site photos', image: img(1302, 2) },
  ],
  1304: [ // Buildots
    { title: 'Schedule delay predicted 3 weeks early', image: img(1304, 0) },
    { title: 'BIM compared to site in real-time', image: img(1304, 1) },
    { title: 'Site bottleneck identified by AI', image: img(1304, 2) },
  ],
  1305: [ // Alice Technologies
    { title: '1,000+ schedules compared by AI', image: img(1305, 0) },
    { title: 'Construction sequence optimised', image: img(1305, 1) },
    { title: 'Labour cost reduced by 14%', image: img(1305, 2) },
  ],
  1306: [ // Reconstruct
    { title: '3D model generated from drone footage', image: img(1306, 0) },
    { title: 'Progress tracked against BIM', image: img(1306, 1) },
    { title: 'Change detected in visual comparison', image: img(1306, 2) },
  ],
  1307: [ // Versatile
    { title: 'Crane cycle times tracked', image: img(1307, 0) },
    { title: 'Site productivity mapped by AI', image: img(1307, 1) },
    { title: 'Safety insight from lift data', image: img(1307, 2) },
  ],

  // ── Data & Analytics ─────────────────────────────────────────────────────
  1401: [ // Julius
    { title: 'CSV analysed with plain-language query', image: img(1401, 0) },
    { title: 'Chart generated from spreadsheet', image: img(1401, 1) },
    { title: 'Statistical analysis without code', image: img(1401, 2) },
  ],
  1402: [ // Tableau
    { title: 'Executive dashboard built', image: img(1402, 0) },
    { title: 'Sales trend visualised instantly', image: img(1402, 1) },
    { title: 'Natural-language data query', image: img(1402, 2) },
  ],
  1403: [ // Power BI
    { title: 'Report built with Copilot in plain English', image: img(1403, 0) },
    { title: 'DAX formula generated by AI', image: img(1403, 1) },
    { title: 'Excel data connected to dashboard', image: img(1403, 2) },
  ],
  1404: [ // Hex
    { title: 'SQL query AI-generated', image: img(1404, 0) },
    { title: 'Python notebook with AI assist', image: img(1404, 1) },
    { title: 'Data team dashboard published', image: img(1404, 2) },
  ],
  1405: [ // Polymer
    { title: 'Spreadsheet turned into dashboard', image: img(1405, 0) },
    { title: 'CSV insights surfaced instantly', image: img(1405, 1) },
    { title: 'No-code filter and chart built', image: img(1405, 2) },
  ],
  1406: [ // Obviously AI
    { title: 'Churn model trained without code', image: img(1406, 0) },
    { title: 'Sales forecast generated', image: img(1406, 1) },
    { title: 'Lead scoring model deployed', image: img(1406, 2) },
  ],
  1407: [ // Rows
    { title: 'Stripe data pulled into spreadsheet', image: img(1407, 0) },
    { title: 'HubSpot CRM data summarised', image: img(1407, 1) },
    { title: 'SQL database queried in a sheet', image: img(1407, 2) },
  ],

  // ── Education & Training ─────────────────────────────────────────────────
  1501: [ // Khanmigo
    { title: 'Maths problem explained Socratically', image: img(1501, 0) },
    { title: 'Science concept unpacked by AI', image: img(1501, 1) },
    { title: 'Reading comprehension practised', image: img(1501, 2) },
  ],
  1502: [ // Duolingo
    { title: 'Spanish conversation practised by AI', image: img(1502, 0) },
    { title: 'Personalised lesson path generated', image: img(1502, 1) },
    { title: 'Speaking drill with AI tutor', image: img(1502, 2) },
  ],
  1503: [ // Quizlet
    { title: 'Flashcard set from lecture notes', image: img(1503, 0) },
    { title: 'Wrong answer explained by AI', image: img(1503, 1) },
    { title: 'Conversational quiz via Q-Chat', image: img(1503, 2) },
  ],
  1504: [ // Synthesis
    { title: 'Maths gap identified adaptively', image: img(1504, 0) },
    { title: 'Curriculum accelerated by AI', image: img(1504, 1) },
    { title: 'Game-based problem solving', image: img(1504, 2) },
  ],
  1505: [ // Coursera
    { title: 'University course audited free', image: img(1505, 0) },
    { title: 'Mid-lesson question answered by Coach', image: img(1505, 1) },
    { title: 'Certificate course completed', image: img(1505, 2) },
  ],
  1506: [ // Elicit
    { title: '50 papers summarised at once', image: img(1506, 0) },
    { title: 'Key findings extracted to table', image: img(1506, 1) },
    { title: 'Academic claim traced to source', image: img(1506, 2) },
  ],
  1507: [ // Mindsmith
    { title: 'Training module built in minutes', image: img(1507, 0) },
    { title: 'Quiz auto-generated from content', image: img(1507, 1) },
    { title: 'SCORM package exported to LMS', image: img(1507, 2) },
  ],
}
