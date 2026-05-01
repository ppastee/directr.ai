export interface UseCase {
  label: string
  toolSlug: string
  toolName: string
  reason: string
}

export interface ComparisonEntry {
  intro: string
  whenToSwitch: string
  useCases: UseCase[]
}

export const COMPARISONS: Record<string, ComparisonEntry> = {
  chatgpt: {
    intro:
      'ChatGPT is the AI assistant tens of millions use daily, but its free-tier limits and $20/mo Plus subscription drive many users to explore alternatives. Claude leads on long-context reasoning and nuanced writing, Gemini integrates natively with Google Workspace, and Perplexity adds real-time web search with cited sources.',
    whenToSwitch:
      'Switch when you need to analyse documents longer than a few thousand words (Claude handles 200K+ token context), prefer answers grounded in real-time sources with citations (Perplexity), already live inside Google or Microsoft ecosystems where Gemini or Copilot integrate seamlessly, or want capable AI without any usage cap (DeepSeek, Meta AI).',
    useCases: [
      {
        label: 'Research with cited sources',
        toolSlug: 'perplexity',
        toolName: 'Perplexity',
        reason: 'Every answer includes numbered references you can verify — essential when accuracy matters more than confident-sounding prose.',
      },
      {
        label: 'Long document analysis',
        toolSlug: 'claude',
        toolName: 'Claude',
        reason: 'Handles 200K+ token context windows, making it the go-to for analysing contracts, research papers, and multi-document projects in a single session.',
      },
      {
        label: 'Google Workspace users',
        toolSlug: 'gemini',
        toolName: 'Gemini',
        reason: 'Native integration across Gmail, Docs, Drive, Calendar, and Meet — AI that works inside the apps you already have open.',
      },
      {
        label: 'Free with no usage caps',
        toolSlug: 'deepseek',
        toolName: 'DeepSeek',
        reason: 'GPT-4o-level quality on most benchmarks, fully free at deepseek.com, with an API priced at roughly one-tenth of OpenAI\'s rates.',
      },
    ],
  },

  midjourney: {
    intro:
      'Midjourney produces some of the most aesthetically refined AI images available, but its $10/mo minimum with no free tier pushes many users to explore alternatives. DALL·E 3 is built into ChatGPT Plus, Adobe Firefly is the commercial-safe choice for professional work, and Ideogram excels at text-within-image generation.',
    whenToSwitch:
      'Consider switching when you need commercially safe outputs with clear IP rights (Adobe Firefly), want full control over model weights for fine-tuning and local runs (Stable Diffusion, Flux), need text accurately rendered inside images (Ideogram), or simply want a capable free tier before committing to a subscription (Playground AI, NightCafe).',
    useCases: [
      {
        label: 'Commercial brand work',
        toolSlug: 'adobe-firefly',
        toolName: 'Adobe Firefly',
        reason: 'Trained exclusively on licensed and public domain content — the safest choice for work that will be published, sold, or used in client deliverables.',
      },
      {
        label: 'Text within images',
        toolSlug: 'ideogram',
        toolName: 'Ideogram',
        reason: 'The best-in-class option for generating images where readable text is part of the composition — posters, logos, social graphics.',
      },
      {
        label: 'Open-source control',
        toolSlug: 'stable-diffusion',
        toolName: 'Stable Diffusion',
        reason: 'Run locally with no usage fees, fine-tune on your own datasets, and access thousands of community models through CivitAI.',
      },
      {
        label: 'Free tier',
        toolSlug: 'playground-ai',
        toolName: 'Playground AI',
        reason: 'Generous free allowance with a clean interface, no Discord required, and access to multiple model checkpoints.',
      },
    ],
  },

  'dall-e-3': {
    intro:
      'DALL·E 3 is built into ChatGPT Plus and handles everyday text-to-image generation well, but its 50-image daily limit and limited stylistic range push users toward dedicated alternatives. Midjourney produces more artistically refined results, Flux gives you open-weight flexibility, and Adobe Firefly is purpose-built for commercial use.',
    whenToSwitch:
      'Switch when you need higher volume or batch output (Leonardo AI, Midjourney), want a consistent aesthetic style across a long project (Midjourney), require commercially safe content for client work (Adobe Firefly), or want to run models locally with no per-image cost (Stable Diffusion, Flux).',
    useCases: [
      {
        label: 'Artistic quality',
        toolSlug: 'midjourney',
        toolName: 'Midjourney',
        reason: 'Consistently produces the most aesthetically polished AI images — the choice of concept artists, designers, and creative directors.',
      },
      {
        label: 'Commercial use',
        toolSlug: 'adobe-firefly',
        toolName: 'Adobe Firefly',
        reason: 'Indemnified outputs trained on licensed content — use in client work, advertising, and published products without IP risk.',
      },
      {
        label: 'High-volume generation',
        toolSlug: 'leonardo-ai',
        toolName: 'Leonardo AI',
        reason: 'Up to 150 free credits daily, batch generation, and a consistent style system for producing large sets of on-brand images.',
      },
      {
        label: 'Self-hosted / local',
        toolSlug: 'stable-diffusion',
        toolName: 'Stable Diffusion',
        reason: 'Run on your own hardware with zero per-image cost, full weight access for fine-tuning, and a large ecosystem of community models.',
      },
    ],
  },

  'github-copilot': {
    intro:
      'GitHub Copilot is the most widely deployed AI coding assistant, but its $10/mo cost and inline-completion model have been challenged by a new generation of agent-mode alternatives. Cursor has emerged as the strongest rival with a full AI-native IDE, Claude Code handles autonomous multi-file tasks from the terminal, and Windsurf offers competitive agentic pricing.',
    whenToSwitch:
      'Consider switching when you need an agent that can plan and execute multi-file refactors autonomously (Cursor, Claude Code, Windsurf), want a full AI-native IDE rather than just inline completions inside VS Code (Cursor, Windsurf), or are starting a greenfield project where a web-based scaffolding tool can build the whole initial codebase (Bolt.new, Lovable, v0).',
    useCases: [
      {
        label: 'Full AI-native IDE',
        toolSlug: 'cursor',
        toolName: 'Cursor',
        reason: 'VS Code fork rebuilt around AI — agent mode, multi-file edits, and a composer that plans and executes changes across the codebase.',
      },
      {
        label: 'Terminal-based autonomous coding',
        toolSlug: 'claude-code',
        toolName: 'Claude Code',
        reason: 'Runs in your terminal with access to your full repo, git history, and shell — plans, writes, tests, and iterates without staying inside an IDE.',
      },
      {
        label: 'Greenfield project scaffolding',
        toolSlug: 'bolt-new',
        toolName: 'Bolt.new',
        reason: 'Scaffolds a working full-stack app from a prompt — useful when you want to skip boilerplate setup and start with a running codebase.',
      },
      {
        label: 'Open-source VS Code extension',
        toolSlug: 'cline',
        toolName: 'Cline',
        reason: 'Free open-source VS Code extension with agent-mode capabilities — bring your own API key and pay only for tokens used.',
      },
    ],
  },

  'canva-ai': {
    intro:
      'Canva AI layers generative features onto a drag-and-drop design canvas, but users seeking dedicated AI image quality often find standalone generators more capable. Midjourney produces significantly stronger artistic outputs, Adobe Firefly is the commercial-safe choice, and Ideogram handles text-within-image generation that Canva struggles with.',
    whenToSwitch:
      'Switch when you need pure image generation quality beyond templated design (Midjourney, Ideogram), require legally safe content for commercial brand work (Adobe Firefly), want fine-grained control over style, composition, and upscaling (Leonardo AI), or need open-weight models you can run locally and fine-tune (Stable Diffusion, Flux).',
    useCases: [
      {
        label: 'Highest artistic quality',
        toolSlug: 'midjourney',
        toolName: 'Midjourney',
        reason: 'The default choice for creative directors and designers who need images that stand up as standalone art, not just serviceable design elements.',
      },
      {
        label: 'Text inside images',
        toolSlug: 'ideogram',
        toolName: 'Ideogram',
        reason: 'Reliably renders readable text within generated images — critical for posters, thumbnails, and social graphics where Canva AI often fails.',
      },
      {
        label: 'Commercial brand work',
        toolSlug: 'adobe-firefly',
        toolName: 'Adobe Firefly',
        reason: 'Integrated into Creative Cloud with fully indemnified outputs — designed for agency and enterprise teams where IP risk is unacceptable.',
      },
      {
        label: 'Fine-grained style control',
        toolSlug: 'leonardo-ai',
        toolName: 'Leonardo AI',
        reason: 'Model selection, ControlNet, inpainting, and consistent style presets give far more control over the output than Canva\'s one-click generation.',
      },
    ],
  },

  cursor: {
    intro:
      'Cursor has become the leading AI-native IDE for developers, but its $20/mo Pro plan and recent usage throttling have many exploring alternatives. Claude Code offers powerful autonomous agent capabilities from the terminal, Windsurf has competitive agentic pricing, and GitHub Copilot remains the most broadly deployed option for teams on existing tooling.',
    whenToSwitch:
      'Consider switching when you prefer autonomous agent execution from the terminal rather than inside an IDE (Claude Code), want to stay in VS Code with a familiar extension rather than switching editors (GitHub Copilot, Cline), need web-based scaffolding for a greenfield project (Bolt.new, Lovable, v0), or are looking for a capable free alternative (Cline with your own API key).',
    useCases: [
      {
        label: 'Terminal-based autonomous agents',
        toolSlug: 'claude-code',
        toolName: 'Claude Code',
        reason: 'Runs in your terminal with full repo and shell access — plans, writes, tests, and commits across multiple files without an IDE in the loop.',
      },
      {
        label: 'Stay in VS Code',
        toolSlug: 'github-copilot',
        toolName: 'GitHub Copilot',
        reason: 'The most battle-tested inline completion tool, deeply integrated with GitHub and available as an extension in the editor you already use.',
      },
      {
        label: 'Full-stack web app scaffolding',
        toolSlug: 'lovable',
        toolName: 'Lovable',
        reason: 'Builds production-ready full-stack apps from a prompt with iterative AI editing — useful when you want a running codebase before writing a line yourself.',
      },
      {
        label: 'Free open-source option',
        toolSlug: 'cline',
        toolName: 'Cline',
        reason: 'Free VS Code extension with agent-mode — bring your own API key (Anthropic, OpenAI, Gemini) and pay only for what you use.',
      },
    ],
  },

  elevenlabs: {
    intro:
      'ElevenLabs leads voice cloning and text-to-speech with the most natural-sounding AI voices available, but pricing escalates quickly at volume. Murf is the established enterprise voiceover alternative, Descript handles full podcast production workflows, and Suno and Udio push further into music and song generation.',
    whenToSwitch:
      'Switch when you need music generation rather than voice (Suno, Udio, AIVA, Soundraw), want a full podcast editing and production workflow including transcription, filler word removal, and multitrack editing (Descript, Adobe Podcast), or need enterprise-grade voice studio tooling with team collaboration built in (Murf).',
    useCases: [
      {
        label: 'Music and song generation',
        toolSlug: 'suno',
        toolName: 'Suno',
        reason: 'Generates complete songs with vocals, instruments, and production — a different category from voice cloning, but the go-to when you need original music.',
      },
      {
        label: 'Podcast production',
        toolSlug: 'descript',
        toolName: 'Descript',
        reason: 'Edit audio by editing a transcript, remove filler words automatically, clone voices, and publish — a complete workflow in a single tool.',
      },
      {
        label: 'Enterprise voiceover at scale',
        toolSlug: 'murf',
        toolName: 'Murf',
        reason: 'Purpose-built voiceover studio with team collaboration, revision history, and enterprise pricing that scales more predictably than ElevenLabs at high volumes.',
      },
      {
        label: 'Royalty-free background music',
        toolSlug: 'soundraw',
        toolName: 'Soundraw',
        reason: 'Generates fully customisable royalty-free tracks for video content, ads, and podcasts — solve the background music problem without licensing concerns.',
      },
    ],
  },

  runway: {
    intro:
      'Runway is the professional standard for AI video editing and generation, but its credit-based pricing and $15/mo entry point push many toward alternatives. Kling AI has emerged as a strong rival for raw video quality, Pika offers a simpler mobile-friendly interface, and Sora (where available) sets a new bar for cinematic motion.',
    whenToSwitch:
      'Switch when you need AI avatar presenter videos rather than raw footage generation (Synthesia, HeyGen), want AI features layered into a full social video editing workflow (CapCut, Veed.io, InVideo AI), or need higher-volume clip generation without per-credit limits (Pika, Kling AI free tier).',
    useCases: [
      {
        label: 'AI presenter videos',
        toolSlug: 'synthesia',
        toolName: 'Synthesia',
        reason: 'Photorealistic AI avatars delivering your script — the right tool for corporate training, product demos, and multilingual video at scale.',
      },
      {
        label: 'Raw video generation quality',
        toolSlug: 'kling-ai',
        toolName: 'Kling AI',
        reason: 'Kling 1.6 and 2.0 produce high-motion, coherent video clips competitive with Runway Gen-3 at a lower per-credit cost.',
      },
      {
        label: 'Simple clip animation',
        toolSlug: 'pika',
        toolName: 'Pika',
        reason: 'Fast interface for animating images into short clips, adding motion effects, and generating brief video scenes without Runway\'s complexity.',
      },
      {
        label: 'Social video editing workflow',
        toolSlug: 'veed-io',
        toolName: 'Veed.io',
        reason: 'AI features embedded in a full browser-based editor — transcription, captions, background removal, and B-roll generation in one timeline.',
      },
    ],
  },

  jasper: {
    intro:
      'Jasper was the leading AI writing platform for marketing teams, but the rise of general-purpose LLMs has made it harder to justify its $39/mo+ pricing. Claude and ChatGPT match or exceed Jasper\'s output quality at lower cost, Copy.ai targets the same marketing use case, and Writesonic offers a cheaper entry point.',
    whenToSwitch:
      'Switch when the underlying model quality is your primary concern rather than marketing workflow templates (Claude, ChatGPT), you need a lower-cost option with similar template coverage (Writesonic, Rytr), or you want to build a multi-channel marketing content pipeline rather than one-off copy generation (Copy.ai).',
    useCases: [
      {
        label: 'Best raw output quality',
        toolSlug: 'claude',
        toolName: 'Claude',
        reason: 'Consistently cited for producing copy that doesn\'t read as AI-written — especially for long-form content requiring genuine reasoning and tone control.',
      },
      {
        label: 'Marketing content workflows',
        toolSlug: 'copy-ai',
        toolName: 'Copy.ai',
        reason: 'Multi-step workflows for full marketing campaigns — email sequences, ad copy, social posts, and blog posts from a single brief.',
      },
      {
        label: 'Lower-cost entry',
        toolSlug: 'writesonic',
        toolName: 'Writesonic',
        reason: 'Similar template coverage to Jasper at a fraction of the price — solid for teams that use AI writing tools occasionally rather than daily.',
      },
      {
        label: 'Fast short-form copy',
        toolSlug: 'rytr',
        toolName: 'Rytr',
        reason: 'The most affordable AI writing tool on the market — useful for high-volume, short-form copy where speed matters more than nuance.',
      },
    ],
  },

  grammarly: {
    intro:
      'Grammarly is the dominant writing assistant for grammar, clarity, and style checking, but its premium tier is expensive and general-purpose AI assistants now handle much of what it does. Claude and ChatGPT can rewrite and refine text in context, Wordtune focuses specifically on sentence-level rewrites, and Quillbot handles paraphrasing with multiple style modes.',
    whenToSwitch:
      'Switch when you need to rewrite entire paragraphs rather than fix grammar (Claude, ChatGPT), want a dedicated paraphrasing tool with style controls (QuillBot), or primarily need writing assistance for academic work where a full AI assistant is more useful than a grammar checker.',
    useCases: [
      {
        label: 'Full-text rewrites and refinement',
        toolSlug: 'claude',
        toolName: 'Claude',
        reason: 'Goes beyond grammar — rewrites for clarity, tone, and structure across whole documents while preserving your voice.',
      },
      {
        label: 'Paraphrasing and rewriting',
        toolSlug: 'quillbot',
        toolName: 'QuillBot',
        reason: 'Seven paraphrase modes (Standard, Fluency, Formal, Academic, Simple, Creative, Expand/Shorten) with direct Word and Google Docs integration.',
      },
      {
        label: 'Long-form writing assistance',
        toolSlug: 'writesonic',
        toolName: 'Writesonic',
        reason: 'Handles full article drafts, SEO-optimised content, and multi-section documents rather than just sentence-level edits.',
      },
      {
        label: 'Marketing copy',
        toolSlug: 'jasper',
        toolName: 'Jasper',
        reason: 'Purpose-built for marketing teams — templates for email, ads, landing pages, and social that go well beyond grammar correction.',
      },
    ],
  },

  synthesia: {
    intro:
      'Synthesia is the enterprise standard for AI avatar presenter videos, but its $29/mo entry price and 3 video/month free tier push many toward alternatives. HeyGen offers comparable avatar quality with a more generous free tier, D-ID handles interactive avatars, and Runway or Kling AI are better choices if you want raw video generation without a presenter.',
    whenToSwitch:
      'Switch when you need interactive real-time avatar conversations rather than scripted presentations (D-ID), want raw AI-generated footage without a presenter (Runway, Kling AI), need a more generous free tier before committing to a plan (HeyGen), or are producing short social clips where a full avatar setup is overkill (CapCut, InVideo AI).',
    useCases: [
      {
        label: 'Comparable quality, better free tier',
        toolSlug: 'heygen',
        toolName: 'HeyGen',
        reason: 'Similar photorealistic avatar quality to Synthesia with a more accessible pricing entry point and strong multilingual lip-sync.',
      },
      {
        label: 'Interactive avatar conversations',
        toolSlug: 'd-id',
        toolName: 'D-ID',
        reason: 'Real-time interactive avatars for customer service, onboarding, and live demos — beyond scripted video into conversational AI.',
      },
      {
        label: 'Raw video generation',
        toolSlug: 'runway',
        toolName: 'Runway',
        reason: 'When you need AI-generated footage, cinematic motion, or video effects rather than a person reading a script.',
      },
      {
        label: 'Social video at scale',
        toolSlug: 'invideo-ai',
        toolName: 'InVideo AI',
        reason: 'Produces high volumes of marketing videos from text briefs — faster and cheaper than avatar production for short social formats.',
      },
    ],
  },

  suno: {
    intro:
      'Suno generates complete songs with vocals, instruments, and production from a text prompt — and it does it remarkably well. The main alternatives depend on what you need: Udio for different aesthetics and longer tracks, AIVA for orchestral and classical compositions, and Soundraw for royalty-free background music without vocals.',
    whenToSwitch:
      'Switch when you need orchestral or classical compositions for film scoring (AIVA), want royalty-free instrumentals and background tracks for videos or podcasts without vocal elements (Soundraw), need professional-grade AI voice cloning and text-to-speech rather than music (ElevenLabs, Murf), or want a different aesthetic or longer track generation (Udio).',
    useCases: [
      {
        label: 'Orchestral and film scoring',
        toolSlug: 'aiva',
        toolName: 'AIVA',
        reason: 'Purpose-built for cinematic, orchestral, and emotional compositions — used by filmmakers and game developers who need genuine musical structure.',
      },
      {
        label: 'Royalty-free background music',
        toolSlug: 'soundraw',
        toolName: 'Soundraw',
        reason: 'Generates customisable instrumentals licensed for commercial use — perfect for YouTube, podcasts, and ad production without Suno\'s vocal focus.',
      },
      {
        label: 'Different musical aesthetics',
        toolSlug: 'udio',
        toolName: 'Udio',
        reason: 'Strong alternative for longer tracks, different genres, and cases where Suno\'s style doesn\'t fit your production needs.',
      },
      {
        label: 'Voice cloning and TTS',
        toolSlug: 'elevenlabs',
        toolName: 'ElevenLabs',
        reason: 'When you need realistic speech synthesis or voice cloning rather than music generation — a different tool for a different audio problem.',
      },
    ],
  },

  'copy-ai': {
    intro:
      'Copy.ai targets marketing teams with multi-step content workflows, but its $36/mo+ pricing and GPT-4-level outputs face stiff competition. Jasper covers similar territory for larger teams, Claude and ChatGPT match or beat the output quality at lower cost, and Writesonic undercuts on price for similar features.',
    whenToSwitch:
      'Switch when raw output quality is more important than workflow automation (Claude, ChatGPT), you need a lower cost for similar functionality (Writesonic, Rytr), or your team has grown to the point where Jasper\'s enterprise features and brand voice tools are worth the premium.',
    useCases: [
      {
        label: 'Best output quality',
        toolSlug: 'claude',
        toolName: 'Claude',
        reason: 'Handles full marketing briefs, long-form content, and nuanced tone control — better output than any template-based tool for the things that matter.',
      },
      {
        label: 'Enterprise marketing teams',
        toolSlug: 'jasper',
        toolName: 'Jasper',
        reason: 'Brand voice training, team collaboration, campaign management, and a dedicated content platform built specifically for marketing organisations.',
      },
      {
        label: 'Lower cost alternative',
        toolSlug: 'writesonic',
        toolName: 'Writesonic',
        reason: 'Similar template coverage and workflow features at a significantly lower price point — the practical choice for smaller teams or occasional use.',
      },
      {
        label: 'High-volume short-form',
        toolSlug: 'rytr',
        toolName: 'Rytr',
        reason: 'The cheapest AI writing tool for teams producing high volumes of short-form content where speed-to-output is the primary metric.',
      },
    ],
  },

  quillbot: {
    intro:
      'QuillBot is the dominant paraphrasing tool for students and writers, but its $19.95/mo premium tier is expensive for what amounts to sentence rewrites. Claude and ChatGPT handle paraphrasing with better contextual awareness, Grammarly extends into grammar and style, and Writesonic covers the writing workflow more broadly.',
    whenToSwitch:
      'Switch when you need full document rewrites and tone control rather than sentence-by-sentence paraphrasing (Claude, ChatGPT), want grammar and clarity corrections alongside rewrites (Grammarly), or need to generate original content rather than just rephrase existing text (Writesonic, Jasper).',
    useCases: [
      {
        label: 'Full document rewrites',
        toolSlug: 'claude',
        toolName: 'Claude',
        reason: 'Rewrites entire documents with preserved intent but genuinely improved prose — more contextually aware than rule-based paraphrase modes.',
      },
      {
        label: 'Grammar and clarity',
        toolSlug: 'grammarly',
        toolName: 'Grammarly',
        reason: 'Works across every app you write in and catches grammar, clarity, and tone issues that paraphrasing tools miss.',
      },
      {
        label: 'Original content generation',
        toolSlug: 'writesonic',
        toolName: 'Writesonic',
        reason: 'Generates original articles, marketing copy, and long-form content — useful when you need to create rather than rephrase.',
      },
      {
        label: 'Academic writing',
        toolSlug: 'sudowrite',
        toolName: 'Sudowrite',
        reason: 'Built specifically for creative and long-form writing — more nuanced rewrite capabilities for fiction and narrative content.',
      },
    ],
  },

  perplexity: {
    intro:
      'Perplexity is the leading AI search tool with real-time web access and cited sources, but it faces growing competition. ChatGPT now includes web browsing, You.com offers a customisable search experience, and Claude handles deep reasoning on documents you provide rather than live web sources.',
    whenToSwitch:
      'Switch when you need conversational reasoning over documents you upload rather than live web search (Claude), want a fully customisable search and chat interface with multiple modes (You.com), or need the broadest general-purpose AI capability with web access included at no extra cost (ChatGPT Plus).',
    useCases: [
      {
        label: 'Document and long-context analysis',
        toolSlug: 'claude',
        toolName: 'Claude',
        reason: 'Upload your own PDFs, reports, and documents for deep analysis — not live web, but unmatched for reasoning over material you provide.',
      },
      {
        label: 'Customisable search modes',
        toolSlug: 'you-com',
        toolName: 'You.com',
        reason: 'Switch between coding, research, writing, and general modes — useful when you need different AI behaviours for different search tasks.',
      },
      {
        label: 'Broadest general capability',
        toolSlug: 'chatgpt',
        toolName: 'ChatGPT',
        reason: 'Web browsing, code execution, DALL·E image generation, and GPT store plugins — the most feature-complete platform at $20/mo Plus.',
      },
      {
        label: 'Microsoft ecosystem',
        toolSlug: 'microsoft-copilot',
        toolName: 'Microsoft Copilot',
        reason: 'Free Bing-powered web search with AI chat, embedded in Edge and Windows — the obvious choice for users already in the Microsoft ecosystem.',
      },
    ],
  },

  'adobe-firefly': {
    intro:
      'Adobe Firefly is purpose-built for commercial-safe AI image generation, but users seeking higher artistic quality or open-source flexibility often look elsewhere. Midjourney produces more aesthetically refined results, Stable Diffusion gives full open-weight control, and DALL·E 3 is the most accessible option inside ChatGPT.',
    whenToSwitch:
      'Switch when artistic quality matters more than commercial safety (Midjourney, Flux), you need to run models locally with no per-image cost (Stable Diffusion), want text rendered accurately inside images (Ideogram), or need a free tier before committing to Creative Cloud pricing (Playground AI, Ideogram).',
    useCases: [
      {
        label: 'Highest artistic quality',
        toolSlug: 'midjourney',
        toolName: 'Midjourney',
        reason: 'Still produces the most aesthetically polished AI images — the professional creative standard for output quality over commercial safety.',
      },
      {
        label: 'Open-source and self-hosted',
        toolSlug: 'stable-diffusion',
        toolName: 'Stable Diffusion',
        reason: 'Full weight access, local runs with no API costs, thousands of community fine-tunes, and complete control over generation parameters.',
      },
      {
        label: 'Text in images',
        toolSlug: 'ideogram',
        toolName: 'Ideogram',
        reason: 'Accurately renders readable text within generated images — Firefly\'s weakest area and Ideogram\'s strongest.',
      },
      {
        label: 'Built into ChatGPT',
        toolSlug: 'dall-e-3',
        toolName: 'DALL·E 3',
        reason: 'Included in ChatGPT Plus with no extra subscription — the most frictionless option for users already paying for ChatGPT.',
      },
    ],
  },

  'stable-diffusion': {
    intro:
      'Stable Diffusion is the leading open-source image model, but running it well requires GPU hardware and technical setup that many users would rather avoid. Midjourney delivers comparable or better quality with zero setup, AUTOMATIC1111 and ComfyUI are the standard local interfaces, and cloud platforms like Leonardo AI offer the ecosystem without local hardware.',
    whenToSwitch:
      'Switch when you want high quality without technical setup (Midjourney, Ideogram), need a hosted interface with Stable Diffusion models and community checkpoints available in a browser (Leonardo AI, NightCafe), or want commercial-safe outputs trained on licensed content only (Adobe Firefly).',
    useCases: [
      {
        label: 'High quality without setup',
        toolSlug: 'midjourney',
        toolName: 'Midjourney',
        reason: 'Delivers consistently better aesthetic results through a simple interface — the right choice when you want outputs, not a local infrastructure project.',
      },
      {
        label: 'Hosted SD with community models',
        toolSlug: 'leonardo-ai',
        toolName: 'Leonardo AI',
        reason: 'Access Stable Diffusion checkpoints, ControlNet, and fine-tunes through a browser with 150 free credits daily — no GPU required.',
      },
      {
        label: 'Commercial-safe alternative',
        toolSlug: 'adobe-firefly',
        toolName: 'Adobe Firefly',
        reason: 'If open-source training data provenance is a concern for commercial work, Firefly\'s fully licensed training set eliminates IP risk.',
      },
      {
        label: 'Free with no setup',
        toolSlug: 'playground-ai',
        toolName: 'Playground AI',
        reason: 'Generous free tier with multiple model options including SDXL — the fastest way to run Stable Diffusion-quality outputs without installing anything.',
      },
    ],
  },

  'claude-code': {
    intro:
      'Claude Code is Anthropic\'s terminal-based agentic coding tool — it plans, writes, tests, and commits across your entire codebase from the CLI. The main alternatives depend on where you want to work: Cursor for a full AI-native IDE experience, GitHub Copilot for VS Code inline completions, and Windsurf for a comparable agentic IDE.',
    whenToSwitch:
      'Switch when you want AI coding inside a full IDE with GUI rather than the terminal (Cursor, Windsurf), need simple inline completions in your existing VS Code setup (GitHub Copilot, Tabnine), or are building a greenfield project where browser-based scaffolding handles the initial setup faster (Bolt.new, Lovable, v0).',
    useCases: [
      {
        label: 'Full AI-native IDE',
        toolSlug: 'cursor',
        toolName: 'Cursor',
        reason: 'VS Code rebuilt around AI — GUI-based agent mode, inline diffs, and composer for multi-file changes without leaving the editor.',
      },
      {
        label: 'VS Code inline completions',
        toolSlug: 'github-copilot',
        toolName: 'GitHub Copilot',
        reason: 'The most battle-tested inline completion tool — stays in your existing VS Code setup without switching editors or tools.',
      },
      {
        label: 'Agentic IDE alternative',
        toolSlug: 'windsurf',
        toolName: 'Windsurf',
        reason: 'AI-native IDE with agent flows comparable to Cursor at competitive pricing — worth evaluating if you want IDE-level agentic coding.',
      },
      {
        label: 'Greenfield scaffolding',
        toolSlug: 'bolt-new',
        toolName: 'Bolt.new',
        reason: 'Scaffolds a working full-stack app from a prompt in the browser — useful for starting new projects before bringing terminal-based agents in.',
      },
    ],
  },

  gemini: {
    intro:
      'Gemini is Google\'s AI assistant with native integration across Workspace — Gmail, Docs, Drive, Calendar, and Meet. Its main competitors are ChatGPT for broader feature coverage, Claude for deeper reasoning and longer context, and Microsoft Copilot for organisations running on Microsoft 365.',
    whenToSwitch:
      'Switch when you need deeper reasoning and longer context windows for complex analysis (Claude), want the broadest feature set including image generation, code execution, and a large app ecosystem (ChatGPT Plus), or live inside Microsoft 365 where Copilot is the native AI layer (Microsoft Copilot).',
    useCases: [
      {
        label: 'Deep reasoning and long context',
        toolSlug: 'claude',
        toolName: 'Claude',
        reason: 'Handles 200K+ token context, nuanced long-document analysis, and complex multi-step reasoning — the strongest alternative for serious analytical work.',
      },
      {
        label: 'Broadest feature set',
        toolSlug: 'chatgpt',
        toolName: 'ChatGPT',
        reason: 'Image generation, code execution, voice mode, and a vast GPT/plugin ecosystem — the most feature-complete platform at $20/mo Plus.',
      },
      {
        label: 'Microsoft 365 users',
        toolSlug: 'microsoft-copilot',
        toolName: 'Microsoft Copilot',
        reason: 'Native AI layer across Outlook, Word, Excel, Teams, and PowerPoint — the obvious choice for organisations on Microsoft licensing.',
      },
      {
        label: 'Research with citations',
        toolSlug: 'perplexity',
        toolName: 'Perplexity',
        reason: 'Real-time web search with cited sources — better for fact-checking and research tasks where you need to verify where information came from.',
      },
    ],
  },

  descript: {
    intro:
      'Descript is the leading podcast and video editing tool built around an AI-editable transcript — you edit the transcript to edit the media. For pure voice cloning and TTS, ElevenLabs and Murf are stronger. For music generation, Suno and AIVA are purpose-built. Adobe Podcast handles the audio enhancement side independently.',
    whenToSwitch:
      'Switch when you need high-quality voice cloning and TTS for content at scale (ElevenLabs), want enterprise voiceover production with team collaboration (Murf), need music generation rather than podcast editing (Suno, AIVA), or only require audio enhancement and not full podcast editing (Adobe Podcast).',
    useCases: [
      {
        label: 'Voice cloning and TTS at scale',
        toolSlug: 'elevenlabs',
        toolName: 'ElevenLabs',
        reason: 'The highest quality AI voices for audiobooks, voiceover, and content production — more powerful TTS than Descript\'s voice clone feature.',
      },
      {
        label: 'Enterprise voiceover production',
        toolSlug: 'murf',
        toolName: 'Murf',
        reason: 'Purpose-built voiceover studio with team collaboration, revision history, and predictable enterprise pricing for high-volume production.',
      },
      {
        label: 'Audio enhancement only',
        toolSlug: 'adobe-podcast',
        toolName: 'Adobe Podcast',
        reason: 'Free AI tool that removes background noise and enhances audio quality — useful when you don\'t need full editing, just better-sounding recordings.',
      },
      {
        label: 'Music and song generation',
        toolSlug: 'suno',
        toolName: 'Suno',
        reason: 'Generates complete songs with vocals and production from a text prompt — a completely different tool for the music creation problem.',
      },
    ],
  },
}
