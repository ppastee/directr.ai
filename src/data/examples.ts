export interface Example {
  title: string
  image: string
}

const ph = (id: number, i: number) =>
  `https://picsum.photos/seed/${id}-${i}/600/400`

export const EXAMPLES: Record<number, Example[]> = {
  // ── Animation & Video ────────────────────────────────────────────────────
  6: [ // HeyGen — real screenshots from heygen.com
    { title: 'AI video editor with avatar script', image: 'https://cdn.sanity.io/images/pdhqcmb1/production/5cadc7b9a8870c9b8abb60df4fcc26e9ce105d14-1632x1440.png' },
    { title: 'Hyper-realistic AI avatar demo', image: 'https://cdn.sanity.io/images/pdhqcmb1/production/2acd28eea38f066815efde76c3af8f1ae44f563c-1041x450.png' },
    { title: 'AI model integrations showcase', image: 'https://cdn.sanity.io/images/pdhqcmb1/production/f52c8a2734b2782b5d68438d7249cf71c073d7cc-1721x1026.png' },
  ],
  7: [ // Synthesia — real AI avatar images from synthesia.io
    { title: 'Alex — photorealistic AI presenter', image: 'https://cdn.prod.website-files.com/65e89895c5a4b8d764c0d710/671793a714d641e25b27d3d5_d3260e81dfe7fd51518a97e131fb8678_Alex%20poster.webp' },
    { title: 'Julia — multilingual AI avatar', image: 'https://cdn.prod.website-files.com/65e89895c5a4b8d764c0d710/671793a7f7871c66642f395d_854d8149638992adee1e8b2b3556975a_Julia%20poster.webp' },
    { title: 'Joshua — corporate training avatar', image: 'https://cdn.prod.website-files.com/65e89895c5a4b8d764c0d710/671793a7e38cf894d3594890_5d05d062e5c986455bf34fea4b21d107_Joshua%20poster.webp' },
  ],
  10: [ // Veed.io
    { title: 'YouTube video with auto-subtitles', image: ph(10, 0) },
    { title: 'Background-removed talking head', image: ph(10, 1) },
    { title: 'Podcast clip with captions', image: ph(10, 2) },
  ],
  1: [ // Runway — real images from runwayml.com
    { title: 'AI-generated video in production', image: 'https://d3phaj0sisr2ct.cloudfront.net/site/images/news/rw_nvidia_blog.png' },
    { title: 'Cinematic AI filmmaking', image: 'https://d3phaj0sisr2ct.cloudfront.net/site/content/images/rw-uclathumbnail-03.jpg' },
    { title: 'Architectural visualisation with Gen-3', image: 'https://d3phaj0sisr2ct.cloudfront.net/site/content/images/kpf-card-v2.png' },
  ],
  3: [ // Kling AI
    { title: 'Hyper-realistic product animation', image: ph(3, 0) },
    { title: 'Photo-to-video scene transition', image: ph(3, 1) },
    { title: 'AI-generated cinematic shot', image: ph(3, 2) },
  ],
  2: [ // Pika
    { title: 'Social media reel from text', image: ph(2, 0) },
    { title: 'Image-to-video animation', image: ph(2, 1) },
    { title: 'Cinematic style clip', image: ph(2, 2) },
  ],
  9: [ // InVideo AI
    { title: 'Blog post turned into video', image: ph(9, 0) },
    { title: 'YouTube video with stock footage', image: ph(9, 1) },
    { title: 'Social media ad with voiceover', image: ph(9, 2) },
  ],
  4: [ // Sora
    { title: '60-second cinematic video', image: ph(4, 0) },
    { title: 'Brand story from a script', image: ph(4, 1) },
    { title: 'Abstract concept visualised', image: ph(4, 2) },
  ],
  5: [ // Luma Dream Machine
    { title: 'Artistic loop animation', image: ph(5, 0) },
    { title: 'Surreal dreamscape video', image: ph(5, 1) },
    { title: 'Mood reel for a creative brief', image: ph(5, 2) },
  ],
  8: [ // D-ID
    { title: 'Photo-to-talking video for outreach', image: ph(8, 0) },
    { title: 'E-learning module with AI presenter', image: ph(8, 1) },
    { title: 'Personalised video message', image: ph(8, 2) },
  ],
  11: [ // Genmo
    { title: 'Still photo animated to video', image: ph(11, 0) },
    { title: 'Nature scene brought to life', image: ph(11, 1) },
    { title: 'Artistic illustration animated', image: ph(11, 2) },
  ],

  // ── Image Generation ─────────────────────────────────────────────────────
  107: [ // Canva AI
    { title: 'On-brand social media graphic', image: ph(107, 0) },
    { title: 'Presentation slide visuals', image: ph(107, 1) },
    { title: 'Marketing flyer background', image: ph(107, 2) },
  ],
  108: [ // Flux — real AI-generated images from bfl.ai showcase
    { title: 'Photorealistic sports car render', image: 'https://cdn.sanity.io/images/2gpum2i6/production/5d563b7e80a4544e78cb389bd863d9f26da636a5-1072x1920.png' },
    { title: 'Technical cutaway illustration', image: 'https://cdn.sanity.io/images/2gpum2i6/production/b352b23898d0662cac2946c6506e8c6c19996fdb-1024x1280.png' },
    { title: 'Cinematic portrait generation', image: 'https://cdn.sanity.io/images/2gpum2i6/production/12e7343cee42c8905a9cad908ddd7ef90261fee6-1204x1590.png' },
  ],
  109: [ // Recraft
    { title: 'Editable SVG brand icon', image: ph(109, 0) },
    { title: 'Consistent illustration set', image: ph(109, 1) },
    { title: 'Vector UI element pack', image: ph(109, 2) },
  ],
  105: [ // Ideogram
    { title: 'Poster with bold typography', image: ph(105, 0) },
    { title: 'Logo concept with text overlay', image: ph(105, 1) },
    { title: 'Event flyer with legible text', image: ph(105, 2) },
  ],
  101: [ // Midjourney
    { title: 'Fantasy concept art scene', image: ph(101, 0) },
    { title: 'Product packaging illustration', image: ph(101, 1) },
    { title: 'Character design sheet', image: ph(101, 2) },
  ],
  106: [ // Leonardo AI
    { title: 'Game environment concept art', image: ph(106, 0) },
    { title: 'Character sprite sheet', image: ph(106, 1) },
    { title: 'Fantasy weapon asset', image: ph(106, 2) },
  ],
  103: [ // Stable Diffusion
    { title: 'Fine-tuned portrait in custom style', image: ph(103, 0) },
    { title: 'Product photo inpainted', image: ph(103, 1) },
    { title: 'Unlimited local generation', image: ph(103, 2) },
  ],
  104: [ // Adobe Firefly
    { title: 'Commercially safe stock image', image: ph(104, 0) },
    { title: 'Background removal and fill', image: ph(104, 1) },
    { title: 'Photoshop generative expand', image: ph(104, 2) },
  ],
  102: [ // DALL·E 3
    { title: 'Complex scene from detailed prompt', image: ph(102, 0) },
    { title: "Children's book illustration", image: ph(102, 1) },
    { title: 'Technical diagram visualised', image: ph(102, 2) },
  ],

  // ── Writing & Copy ───────────────────────────────────────────────────────
  205: [ // Writesonic — real product screenshots
    { title: 'AI visibility tracking dashboard', image: 'https://cdn.prod.website-files.com/671f9e6bc06267864b5770e6/68a73503f19e2689c3adc7d5_m1.webp' },
    { title: 'SEO content engine', image: 'https://cdn.prod.website-files.com/671f9e6bc06267864b5770e6/68a735036b25a4383d0ebaf4_m3.webp' },
    { title: 'Analytics and content dashboard', image: 'https://cdn.prod.website-files.com/671f9e6bc06267864b5770e6/68a72b83e241141f0efe60f2_Content.webp' },
  ],
  202: [ // Jasper — real product screenshots
    { title: 'Jasper Canvas writing workspace', image: 'https://cdn.prod.website-files.com/6807ee8d73c233fb82842313/6848e8dc10f11b5746674727_Home%20-%20Canvas%20(Plain%29.avif' },
    { title: 'AI marketing agents', image: 'https://cdn.prod.website-files.com/6807ee8d73c233fb82842313/6848e8ddd6e29f3f2025f351_baf1294ceb7fbd02808730f2f5797132_Home%20-%20Agents%20%28Plain%29.avif' },
    { title: 'Brand voice configuration', image: 'https://cdn.prod.website-files.com/6807ee8d73c233fb82842313/6848e8ddd9afd0d6179b153b_Home%20-%20BV%20(Plain%29.avif' },
  ],
  208: [ // Rytr
    { title: 'Cold email sequence', image: ph(208, 0) },
    { title: 'Instagram caption variants', image: ph(208, 1) },
    { title: 'Product description batch', image: ph(208, 2) },
  ],
  204: [ // Grammarly
    { title: 'Grammar corrected in real-time', image: ph(204, 0) },
    { title: 'Tone adjusted for professional email', image: ph(204, 1) },
    { title: 'Technical doc rewritten for clarity', image: ph(204, 2) },
  ],
  201: [ // Claude (writing)
    { title: 'Long-form essay with analysis', image: ph(201, 0) },
    { title: 'Nuanced professional report', image: ph(201, 1) },
    { title: 'Multi-document synthesis', image: ph(201, 2) },
  ],
  203: [ // Copy.ai — real product screenshots
    { title: 'Go-to-market workflow builder', image: 'https://cdn.prod.website-files.com/628288c5cd3e8411b90a36a4/6708ecf866816c312bbfa3c0_hero-graph--left.avif' },
    { title: 'Pipeline performance graph', image: 'https://cdn.prod.website-files.com/628288c5cd3e8411b90a36a4/6704bab22dc1c39de3ade22a_graph--mobile.avif' },
    { title: 'Marketing form builder', image: 'https://cdn.prod.website-files.com/628288c5cd3e8411b90a36a4/6708f05179c85c8b007159e7_form-position.avif' },
  ],
  207: [ // QuillBot — real product screenshots
    { title: 'AI chat assistant interface', image: 'https://assets.quillbot.com/images/theme/light/homePage/bentoBox/chat.png' },
    { title: 'Writing studio paraphrase tool', image: 'https://assets.quillbot.com/images/theme/light/homePage/bentoBox/writingStudio.png' },
    { title: 'Design studio workspace', image: 'https://assets.quillbot.com/images/theme/light/homePage/bentoBox/designStudio.png' },
  ],
  206: [ // Sudowrite
    { title: 'Novel chapter continuation', image: ph(206, 0) },
    { title: 'Screenplay scene written', image: ph(206, 1) },
    { title: 'Character backstory developed', image: ph(206, 2) },
  ],

  // ── Coding Assistants ────────────────────────────────────────────────────
  309: [ // v0 — real UI examples from v0.app
    { title: 'SaaS landing page generated', image: 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/nano-banana-og01-tlaGWzWwTjSZQdLiNJFeYS01XY3shO.jpg' },
    { title: 'Dashboard UI from prompt', image: 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/1-yP0cCw1D2jiVbM5P2HG6Og8KXfhbY6.png' },
    { title: 'Component layout generated', image: 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Screenshot%202025-02-02%20at%2011.59.47%E2%80%AFAM-JeiQvFDVyzDHJ25ofDg2yidnXYcur9.png' },
  ],
  302: [ // Cursor — real IDE screenshots from cursor.com
    { title: 'AI code editor interface', image: 'https://ptht05hbb1ssoooe.public.blob.vercel-storage.com/assets/misc/asset-cc24ca462279ca23250c.jpg' },
    { title: 'CLI and Slack integration', image: 'https://ptht05hbb1ssoooe.public.blob.vercel-storage.com/assets/misc/asset-85923e7fafe00c9c0d1f.jpg' },
    { title: 'Codebase-aware chat', image: 'https://ptht05hbb1ssoooe.public.blob.vercel-storage.com/assets/misc/asset-fd9b3b4cd7d670f9f7d8.png' },
  ],
  310: [ // Lovable — real app screenshots from lovable.dev
    { title: 'Hobby photographer portfolio app', image: 'https://lovable.dev/cdn-cgi/image/width=1200,f=auto,fit=scale-down/templates/hobby-photographer-screenshot.webp' },
    { title: 'AI-built presentation tool', image: 'https://lovable.dev/cdn-cgi/image/width=1200,f=auto,fit=scale-down/templates/lovable-slides-final.webp' },
    { title: 'E-commerce store generated', image: 'https://lovable.dev/cdn-cgi/image/width=1200,f=auto,fit=scale-down/templates/ecommerce-store-1-screenshot.webp' },
  ],
  304: [ // Windsurf
    { title: 'End-to-end feature implemented', image: ph(304, 0) },
    { title: 'Multi-step coding task automated', image: ph(304, 1) },
    { title: 'Entire module rewritten agentically', image: ph(304, 2) },
  ],
  305: [ // Replit AI
    { title: 'Python script built in browser', image: ph(305, 0) },
    { title: 'Web app deployed instantly', image: ph(305, 1) },
    { title: 'Beginner learns to code with AI', image: ph(305, 2) },
  ],
  301: [ // GitHub Copilot — real screenshots from github.com
    { title: 'Copilot agent mode in VS Code', image: 'https://images.ctfassets.net/8aevphvgewt8/36rqLbFzJsdRRFHNM4TXIU/afdb59a69ee38661aed3e66f73970ce2/github-copilot-agent-mode.png' },
    { title: 'Third-party AI agents integrated', image: 'https://images.ctfassets.net/8aevphvgewt8/rWJGAKp7aOM97B6d9xqvM/c906d0f3d02ec086ec9e91fb216e3210/github-cca-3p-agents.webp' },
    { title: 'Copilot CLI for terminal tasks', image: 'https://images.ctfassets.net/8aevphvgewt8/2Zamxo7a7F9K9jsTAl2EGA/bce1f04a40536e89ef543cb311f2968b/github-copilot-cli.png' },
  ],
  308: [ // Bolt.new — real product images
    { title: 'Full-stack app built without breaking changes', image: 'https://bolt.new/static/marketing/homepage/value/build-without-breaking.png' },
    { title: 'Performance and analytics graph', image: 'https://bolt.new/static/marketing/homepage/features/graph.png' },
    { title: 'Agency and team projects', image: 'https://bolt.new/static/marketing/homepage/personas/agency.png' },
  ],
  307: [ // Claude Code
    { title: 'Entire codebase refactored', image: ph(307, 0) },
    { title: 'Complex bug traced and fixed', image: ph(307, 1) },
    { title: 'Multi-file feature implemented', image: ph(307, 2) },
  ],
  306: [ // Amazon Q
    { title: 'AWS Lambda function generated', image: ph(306, 0) },
    { title: 'Security vulnerability scanned', image: ph(306, 1) },
    { title: 'CloudFormation template written', image: ph(306, 2) },
  ],
  303: [ // Tabnine
    { title: 'On-prem code completion deployed', image: ph(303, 0) },
    { title: 'Private codebase context used', image: ph(303, 1) },
    { title: 'Enterprise privacy policy enforced', image: ph(303, 2) },
  ],
  311: [ // Gemini Code Assist
    { title: '180K completions per month free', image: ph(311, 0) },
    { title: 'Google Cloud functions generated', image: ph(311, 1) },
    { title: 'JetBrains IDE integrated', image: ph(311, 2) },
  ],
  312: [ // Cline
    { title: 'Autonomous multi-file edit', image: ph(312, 0) },
    { title: 'Terminal command executed by AI', image: ph(312, 1) },
    { title: 'MCP tool called in context', image: ph(312, 2) },
  ],

  // ── Audio & Music ────────────────────────────────────────────────────────
  404: [ // Murf — real product screenshots from murf.ai
    { title: 'Murf Studio voiceover interface', image: 'https://cdn.prod.website-files.com/66b3765153a8a0c399c70981/6970c834d453e3a91064bdaa_Masked%20Image.png' },
    { title: 'Falcon API voice generation', image: 'https://cdn.prod.website-files.com/66b3765153a8a0c399c70981/69720b1d4150f39d6a02b646_API-Feature-Illustration-H3.webp' },
    { title: 'Voice quality benchmark comparison', image: 'https://cdn.prod.website-files.com/66b3765153a8a0c399c70981/698b34e4221deb07dac5429a_Ref.webp' },
  ],
  405: [ // Descript — real product screenshots from descript.com
    { title: 'Green screen removal in editor', image: 'https://cdn.builder.io/api/v1/image/assets%2Ffcea5005d671451e9b07839c893228d0%2F9571358abee0405d8f943025f95a9d51' },
    { title: 'Eye contact correction feature', image: 'https://cdn.builder.io/api/v1/image/assets%2Ffcea5005d671451e9b07839c893228d0%2Fbd609cfe09ed43bab19d569f484d30be' },
    { title: 'Generate video from transcript', image: 'https://cdn.builder.io/api/v1/image/assets%2Ffcea5005d671451e9b07839c893228d0%2F07f431a1c2ae41949d7030419190c354' },
  ],
  402: [ // ElevenLabs — real product screenshots from elevenlabs.io
    { title: 'Creative voice studio interface', image: 'https://eleven-public-cdn.elevenlabs.io/marketing_website/_next/static/media/eleven-creative.f5fbfcf5.png' },
    { title: 'AI agents with voice', image: 'https://eleven-public-cdn.elevenlabs.io/marketing_website/_next/static/media/eleven-agents.d9236159.png' },
    { title: 'API voice generation dashboard', image: 'https://eleven-public-cdn.elevenlabs.io/marketing_website/_next/static/media/eleven-api.6fcc2b4f.png' },
  ],
  401: [ // Suno — real hero image from suno.com
    { title: 'Full song generated from prompt', image: 'https://cdn-o.suno.com/Aura-1-Hero-Web.jpg' },
    { title: 'Custom jingle with vocals', image: ph(401, 1) },
    { title: 'Acoustic track with AI lyrics', image: ph(401, 2) },
  ],
  407: [ // Adobe Podcast
    { title: 'Laptop mic upgraded to studio quality', image: ph(407, 0) },
    { title: 'Background noise removed', image: ph(407, 1) },
    { title: 'Interview audio enhanced', image: ph(407, 2) },
  ],
  403: [ // Udio
    { title: 'High-fidelity electronic track', image: ph(403, 0) },
    { title: 'Orchestral score generated', image: ph(403, 1) },
    { title: 'Genre-specific style controlled', image: ph(403, 2) },
  ],
  406: [ // AIVA
    { title: 'Film score for a trailer', image: ph(406, 0) },
    { title: 'Game level background music', image: ph(406, 1) },
    { title: 'Royalty-free ambient track', image: ph(406, 2) },
  ],

  // ── Chat & Research ──────────────────────────────────────────────────────
  501: [ // ChatGPT
    { title: 'Complex question answered', image: ph(501, 0) },
    { title: 'Python code written and explained', image: ph(501, 1) },
    { title: 'Essay drafted and refined', image: ph(501, 2) },
  ],
  502: [ // Perplexity
    { title: 'Research question with live citations', image: ph(502, 0) },
    { title: 'Latest news summarised', image: ph(502, 1) },
    { title: 'Competitor analysis with sources', image: ph(502, 2) },
  ],
  508: [ // Claude (chat)
    { title: '100-page document analysed', image: ph(508, 0) },
    { title: 'Research synthesised from PDFs', image: ph(508, 1) },
    { title: 'Nuanced argument constructed', image: ph(508, 2) },
  ],
  503: [ // Gemini
    { title: 'Image explained and described', image: ph(503, 0) },
    { title: 'Google doc summarised in Workspace', image: ph(503, 1) },
    { title: 'Research with live web results', image: ph(503, 2) },
  ],
  505: [ // Mistral
    { title: 'Self-hosted LLM on own server', image: ph(505, 0) },
    { title: 'Fast API calls at low cost', image: ph(505, 1) },
    { title: 'European data-compliant model', image: ph(505, 2) },
  ],
  507: [ // You.com
    { title: 'Code mode debugging session', image: ph(507, 0) },
    { title: 'Web search with AI answer', image: ph(507, 1) },
    { title: 'Research with custom AI apps', image: ph(507, 2) },
  ],
  504: [ // Grok
    { title: 'Trending X topic explained', image: ph(504, 0) },
    { title: 'Real-time news summarised', image: ph(504, 1) },
    { title: 'Unfiltered opinion on a debate', image: ph(504, 2) },
  ],
  509: [ // DeepSeek
    { title: 'Complex reasoning problem solved', image: ph(509, 0) },
    { title: 'Code written at GPT-4o quality', image: ph(509, 1) },
    { title: 'API at 10× cheaper than OpenAI', image: ph(509, 2) },
  ],
  510: [ // Microsoft Copilot
    { title: 'Email summarised in Outlook', image: ph(510, 0) },
    { title: 'Excel data analysed with AI', image: ph(510, 1) },
    { title: 'Teams meeting summarised', image: ph(510, 2) },
  ],
  511: [ // Meta AI
    { title: 'WhatsApp question answered', image: ph(511, 0) },
    { title: 'Instagram caption suggested', image: ph(511, 1) },
    { title: 'Facebook group post drafted', image: ph(511, 2) },
  ],

  // ── 3D & Design ──────────────────────────────────────────────────────────
  603: [ // Meshy — real 3D model images from meshy.ai
    { title: '3D model generated from image', image: 'https://cdn.meshy.ai/ti_w:3840,q:75/landing-assets/home/feature-hero-image-to-3d-1.webp' },
    { title: 'Text-to-3D model output', image: 'https://cdn.meshy.ai/ti_w:3840,q:75/landing-assets/home/feature-hero-text-to-3d.webp' },
    { title: 'AI texturing applied to model', image: 'https://cdn.meshy.ai/ti_w:3840,q:75/landing-assets/home/feature-hero-ai-texturing.webp' },
  ],
  604: [ // Tripo3D
    { title: 'High-fidelity model from image', image: ph(604, 0) },
    { title: 'PBR-textured scene object', image: ph(604, 1) },
    { title: '3D asset exported for Blender', image: ph(604, 2) },
  ],
  601: [ // Spline AI — real template images from spline.design
    { title: 'Retro-futuristic interactive scene', image: 'https://spline.design/images/templates/retrofuturism.webp' },
    { title: '3D product design mockup', image: 'https://spline.design/images/templates/op1.webp' },
    { title: '3D iPhone mockup for web', image: 'https://spline.design/images/templates/mockup-iphone.webp' },
  ],
  605: [ // Blockade Labs
    { title: '360° VR game environment', image: ph(605, 0) },
    { title: 'Virtual film set background', image: ph(605, 1) },
    { title: 'Immersive AR skybox', image: ph(605, 2) },
  ],

  // ── Productivity ─────────────────────────────────────────────────────────
  704: [ // Reclaim.ai — real screenshot from reclaim.ai
    { title: 'Weekly productivity dashboard', image: 'https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/69ab4d7465e9f4b715d03563_analyze_productivity_img.png' },
    { title: 'Habit scheduled around meetings', image: ph(704, 1) },
    { title: 'Focus time blocked automatically', image: ph(704, 2) },
  ],
  707: [ // Taskade
    { title: 'AI agent researches a topic', image: ph(707, 0) },
    { title: 'Project plan built from prompt', image: ph(707, 1) },
    { title: 'Team tasks managed autonomously', image: ph(707, 2) },
  ],
  701: [ // Notion AI — real product screenshots from notion.com
    { title: 'Notion AI agents workspace', image: 'https://images.ctfassets.net/spoqsaf9291f/1lM3knSXmvknnVQTvixGdt/6e41434ff3036aff202504ed0280d3c5/Agents.png' },
    { title: 'Enterprise knowledge search', image: 'https://images.ctfassets.net/spoqsaf9291f/3PpqjtooVKzgEFFA0vwfjc/2ba4404d524b1b61e1a9362abf2a02f/image.png' },
    { title: 'Admin controls and AI settings', image: 'https://images.ctfassets.net/spoqsaf9291f/7JvOa8dw8MHkYr81Q3Enqs/83d7d8350818a312bdd49a420d8cfb86/image.png' },
  ],
  706: [ // Zapier AI
    { title: 'CRM to email automation built', image: ph(706, 0) },
    { title: 'Lead routing workflow automated', image: ph(706, 1) },
    { title: '6,000 apps connected in plain English', image: ph(706, 2) },
  ],
  702: [ // Otter.ai — real product screenshots from otter.ai
    { title: 'Meeting gist dashboard', image: 'https://cdn.prod.website-files.com/618e9316785b3582a5178502/67e3386c3addb9324aac9e13_df6bff6ed6c9d9897a6178b6b2aab558_gist-dashboard%402x.avif' },
    { title: 'Live transcription interface', image: 'https://cdn.prod.website-files.com/618e9316785b3582a5178502/67e337f829fa47061c2a7795_6531726b67dd4167b39b56158e25e02a_live-transcription%402x.png' },
    { title: 'Action cards from meeting', image: 'https://cdn.prod.website-files.com/618e9316785b3582a5178502/67db730353397f9e13533f5c_f82a11b7fa429b598bc3cc35329ca46e_card-action-cards%402x.avif' },
  ],
  703: [ // Motion
    { title: 'Tasks scheduled around calendar', image: ph(703, 0) },
    { title: 'Deadlines rescheduled automatically', image: ph(703, 1) },
    { title: 'Daily plan optimised by AI', image: ph(703, 2) },
  ],
  705: [ // Mem.ai
    { title: 'Relevant note surfaced automatically', image: ph(705, 0) },
    { title: 'Knowledge base queried in plain language', image: ph(705, 1) },
    { title: 'Research thread connected', image: ph(705, 2) },
  ],
  708: [ // Gamma
    { title: 'Presentation built in 60 seconds', image: ph(708, 0) },
    { title: 'Blog post turned into slides', image: ph(708, 1) },
    { title: 'Client proposal deck generated', image: ph(708, 2) },
  ],
  709: [ // Fireflies.ai
    { title: 'Sales call transcribed in 100+ languages', image: ph(709, 0) },
    { title: 'CRM updated from call notes', image: ph(709, 1) },
    { title: 'Meeting intelligence searched', image: ph(709, 2) },
  ],

  // ── Marketing ─────────────────────────────────────────────────────────────
  803: [ // Sprout Social
    { title: 'Social posts scheduled with AI', image: ph(803, 0) },
    { title: 'Brand sentiment monitored', image: ph(803, 1) },
    { title: 'Competitor social tracked', image: ph(803, 2) },
  ],
  801: [ // AdCreative.ai — real ad examples from adcreative.ai
    { title: 'Story ad creative generated', image: 'https://cdn.prod.website-files.com/661ce890f68a1d352ebbed35/679e018cc411fb8715a699e3_story-1.avif' },
    { title: "L'Oréal product ad generated", image: 'https://cdn.prod.website-files.com/661ce890f68a1d352ebbed35/664f71bb71ff82c47123b047_Care%20Bottle_L%E2%80%99Ore%CC%81al_Post_3.webp' },
    { title: 'Performance-optimised banner', image: 'https://cdn.prod.website-files.com/661ce890f68a1d352ebbed35/664f71bb041feb07cf7e6317_Care%20Bottle_L%E2%80%99Ore%CC%81al_Post_2.webp' },
  ],
  802: [ // Madgicx
    { title: 'Meta ad audience auto-targeted', image: ph(802, 0) },
    { title: 'Ad bid optimised by AI', image: ph(802, 1) },
    { title: 'E-commerce creative analysed', image: ph(802, 2) },
  ],
  804: [ // Brand24
    { title: 'Brand mention detected in real-time', image: ph(804, 0) },
    { title: 'Competitor coverage monitored', image: ph(804, 1) },
    { title: 'PR crisis flagged early', image: ph(804, 2) },
  ],
  805: [ // Hootsuite
    { title: 'Caption generated from URL', image: ph(805, 0) },
    { title: 'Top post repurposed with AI', image: ph(805, 1) },
    { title: 'Content calendar scheduled', image: ph(805, 2) },
  ],
  806: [ // Pencil
    { title: 'Video ad performance predicted', image: ph(806, 0) },
    { title: 'Creative variant tested with data', image: ph(806, 1) },
    { title: 'TikTok ad generated in minutes', image: ph(806, 2) },
  ],
  807: [ // Lately
    { title: 'Podcast clipped into 30 posts', image: ph(807, 0) },
    { title: 'Blog post atomised for social', image: ph(807, 1) },
    { title: 'Brand hook library built', image: ph(807, 2) },
  ],
  808: [ // Albert.ai
    { title: 'Ad budget allocated autonomously', image: ph(808, 0) },
    { title: 'Cross-channel campaign optimised', image: ph(808, 1) },
    { title: 'Search and social synced by AI', image: ph(808, 2) },
  ],

  // ── Finance ───────────────────────────────────────────────────────────────
  907: [ // PortfolioPilot
    { title: 'Portfolio scored and analysed', image: ph(907, 0) },
    { title: 'Retirement plan projected', image: ph(907, 1) },
    { title: 'Tax-loss opportunities found', image: ph(907, 2) },
  ],
  906: [ // Seeking Alpha
    { title: 'Stock quant rating reviewed', image: ph(906, 0) },
    { title: 'Earnings call analysed', image: ph(906, 1) },
    { title: 'Investment thesis validated', image: ph(906, 2) },
  ],
  904: [ // Simply Wall St
    { title: 'Stock Snowflake score read', image: ph(904, 0) },
    { title: 'Valuation checked visually', image: ph(904, 1) },
    { title: 'Dividend safety assessed', image: ph(904, 2) },
  ],
  905: [ // Magnifi
    { title: 'ETF searched by criteria', image: ph(905, 0) },
    { title: 'Portfolio risk scored', image: ph(905, 1) },
    { title: 'Commission-free trade placed', image: ph(905, 2) },
  ],
  902: [ // TrendSpider
    { title: 'Trendlines auto-detected on chart', image: ph(902, 0) },
    { title: 'Multi-timeframe chart analysed', image: ph(902, 1) },
    { title: 'Trading strategy backtested', image: ph(902, 2) },
  ],
  903: [ // Composer
    { title: 'Algorithm built in plain English', image: ph(903, 0) },
    { title: 'Backtest run in 60 seconds', image: ph(903, 1) },
    { title: 'Automated strategy deployed', image: ph(903, 2) },
  ],
  901: [ // AlphaSense
    { title: 'Earnings call semantically searched', image: ph(901, 0) },
    { title: 'SEC filing key terms extracted', image: ph(901, 1) },
    { title: 'Market trend found across 1000s of docs', image: ph(901, 2) },
  ],
  908: [ // Kensho
    { title: 'Financial document transcribed', image: ph(908, 0) },
    { title: 'Earnings entities extracted', image: ph(908, 1) },
    { title: 'LLM-ready data piped into workflow', image: ph(908, 2) },
  ],

  // ── Accounting ────────────────────────────────────────────────────────────
  1001: [ // Intuit Assist
    { title: 'Invoice auto-generated in QuickBooks', image: ph(1001, 0) },
    { title: 'Bookkeeping reconciled monthly', image: ph(1001, 1) },
    { title: 'Payroll processed with AI', image: ph(1001, 2) },
  ],
  1002: [ // Dext
    { title: 'Receipt scanned and data extracted', image: ph(1002, 0) },
    { title: 'Invoice data captured at 99.9%', image: ph(1002, 1) },
    { title: 'Bank statement auto-categorised', image: ph(1002, 2) },
  ],
  1004: [ // Pilot
    { title: 'Transactions categorised by AI', image: ph(1004, 0) },
    { title: 'Monthly books closed automatically', image: ph(1004, 1) },
    { title: 'Startup financial report generated', image: ph(1004, 2) },
  ],
  1003: [ // Vic.ai
    { title: 'AP invoice processed autonomously', image: ph(1003, 0) },
    { title: 'SAP ERP integrated with AI', image: ph(1003, 1) },
    { title: '97–99% invoice processing accuracy', image: ph(1003, 2) },
  ],
  1005: [ // MindBridge
    { title: '100% of GL transactions analysed', image: ph(1005, 0) },
    { title: 'Fraud anomaly flagged by AI', image: ph(1005, 1) },
    { title: 'Audit risk scored automatically', image: ph(1005, 2) },
  ],
  1006: [ // AutoEntry
    { title: 'Receipt OCR-captured and posted', image: ph(1006, 0) },
    { title: 'Xero auto-posted from invoices', image: ph(1006, 1) },
    { title: 'Bank statements digitised', image: ph(1006, 2) },
  ],

  // ── Legal ──────────────────────────────────────────────────────────────────
  1103: [ // CoCounsel
    { title: 'Case law researched with Westlaw', image: ph(1103, 0) },
    { title: 'Contract clause reviewed by AI', image: ph(1103, 1) },
    { title: 'Due diligence document analysed', image: ph(1103, 2) },
  ],
  1104: [ // Ironclad
    { title: 'Contract drafted by AI', image: ph(1104, 0) },
    { title: 'Approval workflow automated', image: ph(1104, 1) },
    { title: 'Contract repository organised', image: ph(1104, 2) },
  ],
  1105: [ // Clio
    { title: 'Client billing automated', image: ph(1105, 0) },
    { title: 'Time entry captured from notes', image: ph(1105, 1) },
    { title: 'Case file managed with AI', image: ph(1105, 2) },
  ],
  1101: [ // Harvey AI
    { title: 'M&A due diligence accelerated', image: ph(1101, 0) },
    { title: 'Contract risk clause flagged', image: ph(1101, 1) },
    { title: 'Regulatory brief drafted', image: ph(1101, 2) },
  ],
  1102: [ // Spellbook
    { title: 'Clause suggested inside Word', image: ph(1102, 0) },
    { title: 'Contract redlined by AI', image: ph(1102, 1) },
    { title: 'Missing provision flagged', image: ph(1102, 2) },
  ],
  1106: [ // Luminance
    { title: 'Due diligence document reviewed', image: ph(1106, 0) },
    { title: 'Contract anomaly detected', image: ph(1106, 1) },
    { title: 'Bulk contract portfolio analysed', image: ph(1106, 2) },
  ],
  1107: [ // DoNotPay
    { title: 'Parking ticket appeal drafted', image: ph(1107, 0) },
    { title: 'Subscription cancelled by AI', image: ph(1107, 1) },
    { title: 'Small claims letter written', image: ph(1107, 2) },
  ],

  // ── HR & Recruiting ───────────────────────────────────────────────────────
  1206: [ // Fetcher
    { title: 'Candidates sourced automatically', image: ph(1206, 0) },
    { title: 'Outreach email personalised by AI', image: ph(1206, 1) },
    { title: 'ATS populated with candidates', image: ph(1206, 2) },
  ],
  1205: [ // Phenom
    { title: 'Candidate experience personalised', image: ph(1205, 0) },
    { title: 'Internal mobility matched by AI', image: ph(1205, 1) },
    { title: 'Workforce plan modelled', image: ph(1205, 2) },
  ],
  1204: [ // Paradox
    { title: 'Candidate screened via chat', image: ph(1204, 0) },
    { title: 'Interview scheduled by Olivia AI', image: ph(1204, 1) },
    { title: 'FAQ answered 24/7 via SMS', image: ph(1204, 2) },
  ],
  1201: [ // Eightfold.ai
    { title: 'Hidden skill identified in resume', image: ph(1201, 0) },
    { title: 'Internal talent redeployed', image: ph(1201, 1) },
    { title: 'Candidate potential predicted', image: ph(1201, 2) },
  ],
  1202: [ // HireVue
    { title: 'One-way video interview completed', image: ph(1202, 0) },
    { title: 'Cognitive assessment game-based', image: ph(1202, 1) },
    { title: 'High-volume campus hiring screened', image: ph(1202, 2) },
  ],
  1203: [ // Textio
    { title: 'Job description diversity-scored', image: ph(1203, 0) },
    { title: 'Underperforming JD rewritten', image: ph(1203, 1) },
    { title: 'Manager feedback improved by AI', image: ph(1203, 2) },
  ],
  1207: [ // Workday AI
    { title: 'Skills gap identified across org', image: ph(1207, 0) },
    { title: 'Workforce plan AI-modelled', image: ph(1207, 1) },
    { title: 'Financial anomaly detected in payroll', image: ph(1207, 2) },
  ],
  1208: [ // Beamery
    { title: 'Talent pipeline proactively built', image: ph(1208, 0) },
    { title: 'Candidate skills matched by AI', image: ph(1208, 1) },
    { title: 'Internal mobility pathway mapped', image: ph(1208, 2) },
  ],

  // ── Construction ──────────────────────────────────────────────────────────
  1301: [ // Togal.AI
    { title: 'Architectural plan measured in seconds', image: ph(1301, 0) },
    { title: 'Quantity takeoff generated by AI', image: ph(1301, 1) },
    { title: 'Floor area labelled automatically', image: ph(1301, 2) },
  ],
  1303: [ // Procore
    { title: 'RFI drafted by Procore Assist', image: ph(1303, 0) },
    { title: 'Spec reviewed with AI', image: ph(1303, 1) },
    { title: 'Submittal workflow automated', image: ph(1303, 2) },
  ],
  1302: [ // OpenSpace
    { title: '360° site photos auto-located', image: ph(1302, 0) },
    { title: 'BIM progress tracked visually', image: ph(1302, 1) },
    { title: 'Procore integrated with site photos', image: ph(1302, 2) },
  ],
  1304: [ // Buildots
    { title: 'Schedule delay predicted 3 weeks early', image: ph(1304, 0) },
    { title: 'BIM compared to site in real-time', image: ph(1304, 1) },
    { title: 'Site bottleneck identified by AI', image: ph(1304, 2) },
  ],
  1305: [ // Alice Technologies
    { title: '1,000+ schedules compared by AI', image: ph(1305, 0) },
    { title: 'Construction sequence optimised', image: ph(1305, 1) },
    { title: 'Labour cost reduced by 14%', image: ph(1305, 2) },
  ],
  1306: [ // Reconstruct
    { title: '3D model generated from drone footage', image: ph(1306, 0) },
    { title: 'Progress tracked against BIM', image: ph(1306, 1) },
    { title: 'Change detected in visual comparison', image: ph(1306, 2) },
  ],
  1307: [ // Versatile
    { title: 'Crane cycle times tracked', image: ph(1307, 0) },
    { title: 'Site productivity mapped by AI', image: ph(1307, 1) },
    { title: 'Safety insight from lift data', image: ph(1307, 2) },
  ],

  // ── Data & Analytics ─────────────────────────────────────────────────────
  1401: [ // Julius
    { title: 'CSV analysed with plain-language query', image: ph(1401, 0) },
    { title: 'Chart generated from spreadsheet', image: ph(1401, 1) },
    { title: 'Statistical analysis without code', image: ph(1401, 2) },
  ],
  1402: [ // Tableau
    { title: 'Executive dashboard built', image: ph(1402, 0) },
    { title: 'Sales trend visualised instantly', image: ph(1402, 1) },
    { title: 'Natural-language data query', image: ph(1402, 2) },
  ],
  1403: [ // Power BI
    { title: 'Report built with Copilot in plain English', image: ph(1403, 0) },
    { title: 'DAX formula generated by AI', image: ph(1403, 1) },
    { title: 'Excel data connected to dashboard', image: ph(1403, 2) },
  ],
  1404: [ // Hex
    { title: 'SQL query AI-generated', image: ph(1404, 0) },
    { title: 'Python notebook with AI assist', image: ph(1404, 1) },
    { title: 'Data team dashboard published', image: ph(1404, 2) },
  ],
  1405: [ // Polymer
    { title: 'Spreadsheet turned into dashboard', image: ph(1405, 0) },
    { title: 'CSV insights surfaced instantly', image: ph(1405, 1) },
    { title: 'No-code filter and chart built', image: ph(1405, 2) },
  ],
  1406: [ // Obviously AI
    { title: 'Churn model trained without code', image: ph(1406, 0) },
    { title: 'Sales forecast generated', image: ph(1406, 1) },
    { title: 'Lead scoring model deployed', image: ph(1406, 2) },
  ],
  1407: [ // Rows
    { title: 'Stripe data pulled into spreadsheet', image: ph(1407, 0) },
    { title: 'HubSpot CRM data summarised', image: ph(1407, 1) },
    { title: 'SQL database queried in a sheet', image: ph(1407, 2) },
  ],

  // ── Education & Training ─────────────────────────────────────────────────
  1501: [ // Khanmigo
    { title: 'Maths problem explained Socratically', image: ph(1501, 0) },
    { title: 'Science concept unpacked by AI', image: ph(1501, 1) },
    { title: 'Reading comprehension practised', image: ph(1501, 2) },
  ],
  1502: [ // Duolingo
    { title: 'Spanish conversation practised by AI', image: ph(1502, 0) },
    { title: 'Personalised lesson path generated', image: ph(1502, 1) },
    { title: 'Speaking drill with AI tutor', image: ph(1502, 2) },
  ],
  1503: [ // Quizlet
    { title: 'Flashcard set from lecture notes', image: ph(1503, 0) },
    { title: 'Wrong answer explained by AI', image: ph(1503, 1) },
    { title: 'Conversational quiz via Q-Chat', image: ph(1503, 2) },
  ],
  1504: [ // Synthesis
    { title: 'Maths gap identified adaptively', image: ph(1504, 0) },
    { title: 'Curriculum accelerated by AI', image: ph(1504, 1) },
    { title: 'Game-based problem solving', image: ph(1504, 2) },
  ],
  1505: [ // Coursera
    { title: 'University course audited free', image: ph(1505, 0) },
    { title: 'Mid-lesson question answered by Coach', image: ph(1505, 1) },
    { title: 'Certificate course completed', image: ph(1505, 2) },
  ],
  1506: [ // Elicit
    { title: '50 papers summarised at once', image: ph(1506, 0) },
    { title: 'Key findings extracted to table', image: ph(1506, 1) },
    { title: 'Academic claim traced to source', image: ph(1506, 2) },
  ],
  1507: [ // Mindsmith
    { title: 'Training module built in minutes', image: ph(1507, 0) },
    { title: 'Quiz auto-generated from content', image: ph(1507, 1) },
    { title: 'SCORM package exported to LMS', image: ph(1507, 2) },
  ],
}
