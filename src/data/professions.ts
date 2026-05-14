export interface Profession {
  slug: string
  label: string
  h1: string
  intro: string
  toolIds: number[]
  faqs: { q: string; a: string }[]
}

export const PROFESSIONS: Profession[] = [
  {
    slug: 'writers',
    label: 'Writers',
    h1: 'Best AI Tools for Writers in 2026',
    intro: 'The best AI tools for writers in 2026 are Claude, Grammarly, Jasper, and Writesonic. Claude leads for long-form drafting, research synthesis, and nuanced tone control. Grammarly is the standard for editing and clarity checking across every platform. Jasper excels at marketing copy and SEO content at scale. QuillBot handles paraphrasing and academic rewriting. Together, these tools cover every stage of the writing workflow — from first draft to publication — without replacing the writer\'s voice.',
    toolIds: [201, 204, 202, 205, 207, 203, 208, 206],
    faqs: [
      { q: 'What is the best AI writing tool in 2026?', a: 'Claude is the best AI writing tool for long-form, nuanced, and research-heavy writing in 2026. For grammar and editing, Grammarly remains the standard. For marketing copy and SEO content at scale, Jasper and Writesonic are the top choices. The right tool depends on your use case.' },
      { q: 'Are there free AI tools for writers?', a: 'Yes. Claude offers a generous free tier with no credit card required. Grammarly\'s free plan covers grammar, spelling, and basic clarity. ChatGPT\'s free tier works well for drafting. QuillBot offers free paraphrasing with a word limit. Most AI writing tools offer a free plan or trial.' },
      { q: 'How do writers use AI tools?', a: 'Writers use AI tools at every stage: brainstorming ideas and outlines, generating first drafts from prompts, editing for grammar and clarity, rewriting for tone or audience, paraphrasing existing content, checking plagiarism, and formatting for different platforms. Most writers use AI to accelerate their workflow, not replace it.' },
      { q: 'Can AI tools write in my style?', a: 'Yes. Claude, Jasper, and Writesonic all support brand voice and style training. You can provide sample text, set tone parameters, and fine-tune outputs to match your writing style. The results improve significantly the more context you give the model.' },
      { q: 'Will AI replace writers?', a: 'No. AI writing tools speed up production but cannot replace the strategic thinking, original research, cultural nuance, and editorial judgment that professional writers bring. The writers who use AI well will outcompete those who don\'t — but AI-only content is easily identifiable and underperforms on engagement and trust metrics.' },
    ],
  },
  {
    slug: 'marketers',
    label: 'Marketers',
    h1: 'Best AI Tools for Marketers in 2026',
    intro: 'The best AI tools for marketers in 2026 are AdCreative.ai, Jasper, Sprout Social, and Hootsuite. AdCreative.ai generates high-converting ad creatives and copy automatically. Jasper is the leading AI for marketing copy, SEO content, and brand voice consistency at scale. Sprout Social handles social scheduling, analytics, and AI-assisted content. Madgicx optimises paid ad performance across Meta and Google. For marketers running content, ads, and social simultaneously, these tools cut production time by 60–80%.',
    toolIds: [801, 202, 803, 805, 205, 203, 804, 802],
    faqs: [
      { q: 'What are the best AI tools for marketing in 2026?', a: 'The top AI tools for marketing in 2026 are AdCreative.ai (ad creative generation), Jasper (copy and content), Sprout Social (social media management), Hootsuite (social scheduling), and Madgicx (paid ad optimisation). For SEO content specifically, Writesonic and Jasper lead the field.' },
      { q: 'How are marketers using AI in 2026?', a: 'Marketers use AI to generate ad copy and creatives, schedule and analyse social content, personalise email campaigns, write SEO articles at scale, monitor brand mentions, optimise paid ad spend, and produce landing page variations for A/B testing. The biggest gains come from automating repetitive content production.' },
      { q: 'Can AI tools replace a marketing team?', a: 'No. AI tools replace individual tasks within a marketing team, not the team itself. Strategy, positioning, audience insight, creative direction, and campaign measurement still require human expertise. AI accelerates execution but cannot define the strategy it executes.' },
      { q: 'What is the best AI tool for social media marketing?', a: 'Sprout Social and Hootsuite are the leading AI tools for social media management, combining scheduling, analytics, and AI-assisted content. For social ad creative specifically, AdCreative.ai generates platform-native assets faster than any design workflow. Lately repurposes long-form content into social posts automatically.' },
      { q: 'Are there AI tools that can run paid ads automatically?', a: 'Yes. Madgicx and Albert.ai both automate paid ad management across Meta and Google — adjusting bids, creative, and targeting based on performance data. Pencil generates and tests ad creatives automatically. These tools are most effective when paired with a human strategist setting goals and reviewing outputs.' },
    ],
  },
  {
    slug: 'designers',
    label: 'Designers',
    h1: 'Best AI Tools for Designers in 2026',
    intro: 'The best AI tools for designers in 2026 are Midjourney, Recraft, Adobe Firefly, and Ideogram. Midjourney produces the highest-quality artistic and concept imagery. Recraft is the only major tool that generates native vector SVGs — making it essential for brand and icon work. Adobe Firefly integrates directly into Creative Cloud and generates commercially safe assets. Ideogram solves AI\'s text-in-image problem, producing legible typography for posters and graphics. For 3D design, Spline AI and Meshy extend the toolkit into dimensional assets.',
    toolIds: [101, 109, 104, 105, 107, 108, 601, 603],
    faqs: [
      { q: 'What is the best AI tool for graphic designers?', a: 'For graphic designers, Midjourney leads for concept imagery and illustration. Recraft is best for vector, icon, and brand work. Adobe Firefly is the top choice for designers already in the Creative Cloud ecosystem. Ideogram is the best AI tool for generating images with readable text.' },
      { q: 'Can AI tools generate vector graphics?', a: 'Yes. Recraft is the only major AI image tool that generates native SVG vectors — editable, scalable graphics suitable for print, branding, and icon production. Other tools like Midjourney and Adobe Firefly output raster images, which require tracing to convert to vector.' },
      { q: 'Is Adobe Firefly safe to use commercially?', a: 'Yes. Adobe Firefly is trained exclusively on licensed content and is covered by Adobe\'s IP indemnification for commercial use — making it the safest AI image tool for client work, advertising, and commercial design. Midjourney and Stable Diffusion carry more copyright ambiguity for commercial applications.' },
      { q: 'What AI tools do product designers use?', a: 'Product designers use Midjourney and Leonardo AI for concept visualisation, Canva AI for mockup and presentation design, Spline AI for 3D interface elements, and v0 or Lovable for generating UI component code. ChatGPT and Claude are widely used for writing product specs and UX copy.' },
      { q: 'Can AI replace designers?', a: 'No. AI significantly accelerates ideation, asset generation, and iteration — but design requires systems thinking, user empathy, business context, and aesthetic judgment that AI cannot replicate. The designers who integrate AI into their workflow produce more and faster; those who don\'t are increasingly at a disadvantage on throughput.' },
    ],
  },
  {
    slug: 'developers',
    label: 'Developers',
    h1: 'Best AI Tools for Developers in 2026',
    intro: 'The best AI tools for developers in 2026 are Cursor, GitHub Copilot, Claude Code, and Windsurf. Cursor is the leading AI code editor — built around multi-file context, chat, and inline completion. Claude Code handles full codebase tasks from the terminal with agentic file editing. GitHub Copilot remains the most widely adopted IDE plugin across VS Code and JetBrains. Windsurf (by Codeium) matches Cursor on agentic multi-step tasks. For building full-stack apps without deep coding knowledge, Lovable and Bolt.new are the fastest path from idea to deployed product.',
    toolIds: [302, 301, 307, 304, 312, 311, 303, 305],
    faqs: [
      { q: 'What is the best AI coding tool in 2026?', a: 'Cursor is the best AI code editor for professional developers in 2026, combining multi-file context, codebase-aware chat, and precise inline editing. Claude Code is the best terminal-based AI for full-codebase agentic tasks. GitHub Copilot is the most widely adopted IDE plugin for inline autocomplete.' },
      { q: 'Is GitHub Copilot still worth using in 2026?', a: 'Yes. GitHub Copilot remains excellent for inline autocomplete and is deeply integrated into VS Code, JetBrains, and Visual Studio. For developers who want a lightweight plugin rather than a new editor, Copilot is the most reliable choice. Cursor and Windsurf offer more powerful multi-file AI features if you\'re open to switching editors.' },
      { q: 'What AI tools can build a full app from scratch?', a: 'Lovable, Bolt.new, and Replit AI can generate full-stack applications from a text description. Lovable integrates with Supabase and deploys to Vercel. Bolt.new runs entirely in-browser. v0 (by Vercel) specialises in React UI generation. These tools are best for prototyping and early-stage products.' },
      { q: 'Are there free AI coding tools?', a: 'Yes. GitHub Copilot is free for students and open-source contributors. Claude Code has a free tier. Replit AI has a free plan. Gemini Code Assist offers a free tier for individual developers. Cline is fully open source. Tabnine has a free tier with basic autocomplete.' },
      { q: 'What is the difference between Cursor and GitHub Copilot?', a: 'Cursor is a standalone code editor with deep multi-file AI, codebase chat, and agent mode. GitHub Copilot is a plugin for existing editors (VS Code, JetBrains) focused on inline autocomplete and chat. Cursor is more powerful for AI-heavy workflows; Copilot is more convenient if you don\'t want to change editors.' },
    ],
  },
  {
    slug: 'teachers',
    label: 'Teachers',
    h1: 'Best AI Tools for Teachers in 2026',
    intro: 'The best AI tools for teachers in 2026 are Khanmigo, Mindsmith, Claude, and Gamma. Khanmigo provides AI-powered tutoring and lesson planning built specifically for educators, with student-safe guardrails. Mindsmith generates SCORM-compatible e-learning modules from plain text. Gamma creates polished presentation decks from a brief or outline in minutes. Claude and ChatGPT are widely used for writing lesson plans, rubrics, quiz questions, and differentiated learning materials. Synthesia and D-ID help teachers produce professional explainer videos without a camera.',
    toolIds: [1501, 1507, 201, 708, 501, 7, 405, 1503],
    faqs: [
      { q: 'What is the best AI tool for teachers?', a: 'Khanmigo is the best AI tool purpose-built for teachers — it supports Socratic tutoring, lesson planning, and is designed to be safe for classroom use. For creating e-learning content, Mindsmith is the top choice. For general lesson planning and material creation, Claude and ChatGPT are the most capable and flexible.' },
      { q: 'How are teachers using AI in 2026?', a: 'Teachers use AI to write lesson plans, create quiz questions and rubrics, generate differentiated materials for different learning levels, build e-learning modules, produce explainer videos, give personalised feedback at scale, and automate administrative tasks like report writing and grading guidance.' },
      { q: 'Are there AI tools that are safe for classroom use?', a: 'Yes. Khanmigo is designed for K-12 classroom use with educator controls and student-safe guardrails. Microsoft Copilot for Education is available through school Microsoft 365 licences with privacy protections. Always check your school\'s AI policy before using consumer tools like ChatGPT with students.' },
      { q: 'Can AI tools create lesson plans automatically?', a: 'Yes. Claude, ChatGPT, and Khanmigo can generate detailed lesson plans, including learning objectives, activities, discussion prompts, and assessment ideas, in under a minute. Mindsmith goes further by converting lesson content into fully structured e-learning modules with SCORM export.' },
      { q: 'What AI tools help teachers save the most time?', a: 'The highest time savings for teachers come from: AI quiz and rubric generation (Claude, ChatGPT), automated feedback drafting, e-learning module creation (Mindsmith), presentation building (Gamma), and video production without a camera (Synthesia). Teachers report saving 3-5 hours per week on average when using AI for administrative and content tasks.' },
    ],
  },
  {
    slug: 'students',
    label: 'Students',
    h1: 'Best AI Tools for Students in 2026',
    intro: 'The best AI tools for students in 2026 are ChatGPT, Claude, Perplexity, Grammarly, and Quizlet. ChatGPT and Claude handle essay drafting, concept explanation, and problem-solving across all subjects. Perplexity provides cited research answers — essential for academic work where sources matter. Grammarly polishes writing and catches grammar errors before submission. Quizlet uses AI to generate flashcards and study sets from any content. Elicit synthesises academic papers and surfaced relevant research automatically.',
    toolIds: [501, 508, 207, 502, 1503, 1506, 204, 1502],
    faqs: [
      { q: 'What is the best AI tool for students?', a: 'ChatGPT and Claude are the most capable AI tools for students across all subjects — for explaining concepts, helping with essays, solving problems, and studying. Perplexity is best for research with cited sources. Grammarly is the standard for writing correction. Quizlet\'s AI is best for active recall study.' },
      { q: 'Is it cheating to use AI tools as a student?', a: 'It depends on the institution\'s policy. Most universities in 2026 allow AI for brainstorming, editing, and research assistance — but not for submitting AI-generated work as your own. Always check your institution\'s academic integrity policy before using AI in assignments. Using AI to understand concepts is universally acceptable.' },
      { q: 'Are there free AI tools for students?', a: 'Yes. ChatGPT, Claude, Gemini, and Perplexity all have free tiers with no credit card required. Grammarly\'s free plan covers grammar and spelling. Quizlet\'s free tier includes flashcard creation. GitHub Copilot is free for verified students. Duolingo is free for language learning.' },
      { q: 'What is the best AI tool for research papers?', a: 'Perplexity is the best AI tool for research because it provides cited answers with links to sources — critical for academic work. Elicit goes further by searching academic databases and summarising papers. Claude and ChatGPT are excellent for synthesising and explaining research once you\'ve gathered sources.' },
      { q: 'Can AI tools help with exam preparation?', a: 'Yes. Quizlet generates flashcard sets and practice tests from any study material. ChatGPT and Claude can quiz you, explain mistakes, and generate practice questions on any topic. Khanmigo provides Socratic tutoring that helps you understand concepts rather than just memorise answers.' },
    ],
  },
  {
    slug: 'content-creators',
    label: 'Content Creators',
    h1: 'Best AI Tools for Content Creators in 2026',
    intro: 'The best AI tools for content creators in 2026 are CapCut, InVideo AI, ElevenLabs, Canva AI, and Klap. CapCut is the default video editor for short-form creators — free, fast, and natively integrated with TikTok. InVideo AI converts scripts or ideas into fully edited videos with voiceover and stock footage. ElevenLabs produces studio-quality AI voiceovers in seconds. Klap automatically cuts long-form content into viral short clips. Canva AI covers design, thumbnails, and social graphics without a design background.',
    toolIds: [14, 9, 402, 107, 13, 203, 401, 501],
    faqs: [
      { q: 'What are the best AI tools for content creators?', a: 'The top AI tools for content creators in 2026 are CapCut (video editing, free), InVideo AI (text-to-video), ElevenLabs (AI voiceovers), Canva AI (graphics and thumbnails), Klap (auto-clip extraction), and ChatGPT or Claude (scripts and captions). These tools cover the full content production pipeline.' },
      { q: 'What is the best free AI tool for content creation?', a: 'CapCut is the best free AI tool for video content creators — it covers editing, auto-captions, background removal, and TikTok export at no cost. Canva AI has a generous free tier for graphics. ChatGPT and Claude both have free tiers for script writing. Suno offers free music generation.' },
      { q: 'How do content creators use AI to grow faster?', a: 'Content creators use AI to batch-produce content (one recording → 10 clips with Klap), produce videos without being on camera (InVideo, Synthesia), generate scripts and captions automatically, create thumbnails and graphics without a designer, add voiceovers without recording, and write consistent posting copy with AI.' },
      { q: 'What is the best AI tool for YouTube?', a: 'For YouTube, InVideo AI and Pictory are best for converting scripts into full videos. CapCut handles editing and shorts. ElevenLabs provides voiceover if you don\'t want to record. ChatGPT or Claude help with titles, descriptions, and scripts. Klap clips long YouTube videos into Shorts automatically.' },
      { q: 'Can AI tools create content entirely automatically?', a: 'Partially. InVideo AI and Pictory can generate complete videos from a text input, including script, footage, captions, and voiceover. The output quality is good for volume content but lacks the authenticity and production value that drives top creator growth. AI handles production; the creator still needs to provide the strategy and on-camera presence that audiences actually follow.' },
    ],
  },
  {
    slug: 'podcasters',
    label: 'Podcasters',
    h1: 'Best AI Tools for Podcasters in 2026',
    intro: 'The best AI tools for podcasters in 2026 are Descript, ElevenLabs, Otter.ai, and Adobe Podcast. Descript is the complete podcast production suite — transcription, overdubbing, noise removal, and a text-based editor that cuts audio like a word processor. Adobe Podcast\'s Enhance Speech tool removes background noise and room reverb from any recording instantly. Otter.ai and Fireflies.ai produce accurate transcripts with speaker labels in real time. ElevenLabs clones voices and generates studio-quality voiceovers for intros, ads, and multilingual versions.',
    toolIds: [405, 402, 407, 702, 709, 201, 404, 401],
    faqs: [
      { q: 'What is the best AI tool for podcasters?', a: 'Descript is the best all-in-one AI tool for podcasters — it handles recording, editing, transcription, and overdubbing in one platform with a text-based editing interface. Adobe Podcast Enhance is the best free tool for cleaning up audio quality. ElevenLabs leads for AI-generated voiceovers and intro audio.' },
      { q: 'Can AI tools remove background noise from podcast recordings?', a: 'Yes. Adobe Podcast\'s Enhance Speech feature removes background noise, room echo, and audio artifacts from any recording — it\'s free and works on uploaded audio files. Descript also has built-in noise removal. ElevenLabs can regenerate specific audio segments using a cloned voice.' },
      { q: 'What AI tool produces the best podcast transcripts?', a: 'Descript and Otter.ai produce the most accurate podcast transcripts with speaker labelling. Fireflies.ai is best for recording and transcribing meetings and interviews in real time. All three allow you to edit the audio by editing the transcript text — deleting words from the transcript cuts the corresponding audio.' },
      { q: 'Can AI generate podcast episodes automatically?', a: 'Not full episodes, but AI can handle major production tasks: generating scripts from notes or outlines (Claude, ChatGPT), producing voiceover from scripts (ElevenLabs, Murf), creating show notes and chapter markers (Descript, Otter.ai), and repurposing episodes into short clips (Descript, Klap). The conversation itself still requires a human host.' },
      { q: 'Are there AI tools that can translate podcasts into other languages?', a: 'Yes. ElevenLabs offers multilingual voice cloning — it can translate and re-voice a podcast episode in another language using the original host\'s cloned voice. Descript supports translation workflows. HeyGen can create video versions of podcast content with synchronised lip-sync in multiple languages.' },
    ],
  },
  {
    slug: 'freelancers',
    label: 'Freelancers',
    h1: 'Best AI Tools for Freelancers in 2026',
    intro: 'The best AI tools for freelancers in 2026 are Claude, Grammarly, Notion AI, and ChatGPT. Claude handles writing, research, client communication, and complex problem-solving across every service category. Grammarly ensures professional quality on every client deliverable. Notion AI organises projects, generates summaries, and drafts documents inside your existing workspace. Canva AI produces client-ready graphics without a designer\'s budget. For freelancers scaling output, AI cuts production time by 40–70% on writing, design, and research tasks.',
    toolIds: [204, 201, 701, 203, 107, 501, 208, 705],
    faqs: [
      { q: 'What are the best AI tools for freelancers?', a: 'The top AI tools for freelancers are Claude and ChatGPT (writing, research, client work), Grammarly (editing and proofreading), Notion AI (project management and drafting), Canva AI (design without a designer), and Copy.ai (marketing copy). The best tools depend on your freelance niche.' },
      { q: 'How can freelancers use AI to earn more?', a: 'Freelancers use AI to take on more clients by producing work faster, offer new services (AI-assisted content, video, design) without new skills, reduce revision time with better first drafts, automate proposals and invoices, and deliver higher-quality work. The productivity gains are largest in writing, research, and content production.' },
      { q: 'Are there AI tools that help freelancers manage clients?', a: 'Yes. Notion AI integrates AI into project management, meeting notes, and client documentation. Otter.ai transcribes client calls automatically. ChatGPT and Claude help draft contracts, proposals, and follow-up emails. Zapier AI automates repetitive admin tasks across platforms.' },
      { q: 'What is the best AI writing tool for freelance writers?', a: 'Claude is the best AI writing tool for freelance writers in 2026 — it handles long-form, nuanced content with strong tone control. Grammarly is essential for editing. Jasper is best for marketing copy and SEO content. QuillBot helps with paraphrasing and academic rewriting. Most writers use 2-3 tools together.' },
      { q: 'How much can AI tools reduce a freelancer\'s workload?', a: 'AI tools typically reduce writing and content production time by 40–70% for freelancers. Research tasks that previously took hours now take minutes with Perplexity and Claude. Design work that required a separate contractor can be handled with Canva AI or Midjourney. The biggest gains are in repeatable tasks — the strategic and client-facing work still requires full human attention.' },
    ],
  },
  {
    slug: 'lawyers',
    label: 'Lawyers',
    h1: 'Best AI Tools for Lawyers in 2026',
    intro: 'The best AI tools for lawyers in 2026 are Harvey AI, CoCounsel, Spellbook, and Ironclad. Harvey AI is purpose-built for legal work — trained on legal corpora, it handles case research, contract review, and legal memo drafting with professional-grade accuracy. CoCounsel (by Casetext, acquired by Thomson Reuters) integrates with legal research databases. Spellbook drafts and redlines contracts directly inside Microsoft Word. Ironclad manages contract lifecycle with AI-powered clause extraction and risk flagging. All are designed to comply with legal professional responsibility requirements.',
    toolIds: [1101, 1103, 1102, 1104, 1105, 1106, 1107, 201],
    faqs: [
      { q: 'What is the best AI tool for lawyers?', a: 'Harvey AI is the best AI tool purpose-built for lawyers in 2026 — it handles legal research, contract review, and memo drafting with legal-grade accuracy. CoCounsel is the top choice for lawyers who need deep integration with legal research databases. For contract drafting specifically, Spellbook (Microsoft Word add-in) leads the field.' },
      { q: 'Is it safe for lawyers to use AI tools with client data?', a: 'Only with tools that offer appropriate data protection. Harvey AI, Clio, and Ironclad are designed for law firms and offer enterprise-grade security, data residency controls, and confidentiality protections. Consumer AI tools like ChatGPT should not be used with sensitive client information unless operating under an enterprise agreement with data processing terms.' },
      { q: 'How are law firms using AI in 2026?', a: 'Law firms use AI for contract review and drafting, legal research and case summarisation, due diligence document review, billing and time-entry automation, client intake, and litigation support. AI handles the high-volume, repeatable reading and drafting tasks — attorneys focus on judgment, strategy, and client relationships.' },
      { q: 'Can AI tools review contracts?', a: 'Yes. Ironclad, Luminance, Harvey AI, and CoCounsel can all review contracts for clause extraction, risk flagging, and deviation from standard terms. Luminance is particularly strong for high-volume due diligence. Spellbook drafts and redlines contracts in real time inside Microsoft Word.' },
      { q: 'Do AI legal tools replace lawyers?', a: 'No. AI legal tools automate research, drafting, and document review — tasks that consume significant attorney time but are not where legal value is created. The judgment, advocacy, client counsel, and strategic advice that define legal practice remain entirely human. AI reduces the cost of legal work, which may expand access — but it does not replace lawyers.' },
    ],
  },
  {
    slug: 'accountants',
    label: 'Accountants',
    h1: 'Best AI Tools for Accountants in 2026',
    intro: 'The best AI tools for accountants in 2026 are Intuit Assist, Dext, Vic.ai, and Pilot. Intuit Assist brings AI directly into QuickBooks — automating categorisation, anomaly detection, and cash flow forecasting. Dext captures and processes receipts and invoices automatically, eliminating manual data entry. Vic.ai automates accounts payable with invoice coding accuracy above 95%. Pilot is the best AI-powered bookkeeping service for startups and growing businesses. MindBridge uses AI to detect anomalies in financial data that traditional audit sampling misses.',
    toolIds: [1001, 1002, 1003, 1004, 1005, 1006, 1401, 1403],
    faqs: [
      { q: 'What is the best AI tool for accountants?', a: 'Intuit Assist is the best AI tool for accountants using QuickBooks, providing AI-powered categorisation, anomaly detection, and reporting. Dext is the leading AI tool for receipt and invoice capture. Vic.ai is best for automating accounts payable in mid-market and enterprise firms. MindBridge is the top choice for AI-assisted audit and financial analytics.' },
      { q: 'Can AI tools automate bookkeeping?', a: 'Yes, significantly. Dext automates document capture and data extraction. Vic.ai codes invoices automatically with high accuracy. Intuit Assist categorises transactions in QuickBooks. Pilot provides fully managed AI-powered bookkeeping as a service. Full automation is closest to reality for accounts payable and receipt processing; complex judgement tasks still require human accountants.' },
      { q: 'How are accountants using AI in 2026?', a: 'Accountants use AI to automate data entry, receipt capture, and invoice processing; detect anomalies and errors in financial data; generate client reports and forecasts; assist with tax preparation; streamline month-end close processes; and provide real-time cash flow insights. The biggest time savings are in data collection and entry tasks.' },
      { q: 'Is AI-assisted accounting accurate enough to trust?', a: 'Modern AI accounting tools achieve high accuracy on structured tasks like invoice coding and transaction categorisation — Vic.ai reports over 95% accuracy on AP automation. However, all outputs should be reviewed by a qualified accountant, particularly for tax compliance, audit, and complex transactions. AI handles volume; professional judgment handles exceptions.' },
      { q: 'What AI tools help with financial analysis?', a: 'Julius, Tableau, and Power BI all offer AI-powered financial analysis — natural language querying, anomaly detection, and automated reporting. Julius is particularly strong for spreadsheet and CSV data analysis using plain English questions. Hex and Polymer are excellent for data exploration without SQL expertise.' },
    ],
  },
  {
    slug: 'hr-managers',
    label: 'HR Managers',
    h1: 'Best AI Tools for HR Managers in 2026',
    intro: 'The best AI tools for HR managers in 2026 are Eightfold.ai, HireVue, Textio, and Paradox. Eightfold.ai uses deep learning to match candidates to roles based on skills — surfacing qualified candidates that keyword searches miss. HireVue combines AI video interviewing with structured assessments for high-volume hiring. Textio rewrites job descriptions in real time to improve quality of applicants and reduce bias. Paradox\'s Olivia chatbot handles interview scheduling and candidate Q&A automatically. Workday AI brings intelligence to the full employee lifecycle from hire to retirement.',
    toolIds: [1201, 1202, 1203, 1204, 1205, 1206, 1207, 1208],
    faqs: [
      { q: 'What are the best AI tools for HR in 2026?', a: 'The top AI tools for HR in 2026 are Eightfold.ai (talent intelligence and skills matching), HireVue (AI video interviews and assessments), Textio (inclusive job descriptions), Paradox (candidate scheduling automation), Phenom (talent experience platform), and Workday AI (enterprise HCM with AI). The right tool depends on whether you\'re focused on recruiting, retention, or workforce planning.' },
      { q: 'How are HR teams using AI in 2026?', a: 'HR teams use AI to automate candidate sourcing and screening, write better job descriptions, schedule interviews without back-and-forth, conduct structured video assessments, analyse employee engagement data, identify flight risk, assist with performance reviews, and generate workforce planning reports. The biggest ROI comes from reducing time-to-hire in high-volume recruitment.' },
      { q: 'Can AI tools reduce bias in hiring?', a: 'AI tools can reduce some forms of bias (like language bias in job descriptions, which Textio addresses) but can also amplify bias if trained on historically biased data. Eightfold.ai and HireVue both have bias mitigation features and publish fairness audits. All AI hiring decisions should be reviewed by humans and audited regularly for disparate impact.' },
      { q: 'What is the best AI tool for writing job descriptions?', a: 'Textio is the best AI tool for writing inclusive, effective job descriptions — it rewrites language in real time, predicts application rates, and flags phrases shown to reduce applicant diversity. Workday AI also includes job description writing assistance. Claude and ChatGPT work well for drafting job descriptions from a brief.' },
      { q: 'Are AI hiring tools compliant with employment law?', a: 'Leading AI hiring tools are designed with compliance in mind — HireVue, Eightfold.ai, and Phenom all address EEOC and GDPR requirements. However, regulations on AI in hiring are evolving rapidly (e.g., NYC Local Law 144 requires bias audits for AI hiring tools). Always review current regulations in your jurisdiction and ensure any AI hiring tool you use has been independently audited.' },
    ],
  },
  {
    slug: 'small-business-owners',
    label: 'Small Business Owners',
    h1: 'Best AI Tools for Small Business Owners in 2026',
    intro: 'The best AI tools for small business owners in 2026 are ChatGPT, Claude, Canva AI, Grammarly, and Intuit Assist. ChatGPT and Claude handle customer communication, content writing, business planning, and research across every area of a small business. Canva AI produces marketing materials, social graphics, and brand assets without a designer. Grammarly ensures professional quality in every external communication. Intuit Assist brings AI to accounting and cash flow inside QuickBooks. For marketing, AdCreative.ai and Copy.ai generate ad copy and social content automatically.',
    toolIds: [501, 201, 107, 204, 701, 203, 806, 1001],
    faqs: [
      { q: 'What are the best AI tools for small businesses?', a: 'The best AI tools for small businesses in 2026 are ChatGPT or Claude (writing, customer service, planning), Canva AI (marketing design), Grammarly (professional communication), Intuit Assist (accounting and bookkeeping), and Copy.ai or Jasper (marketing copy). These five tools cover the most common small business AI use cases.' },
      { q: 'How can AI tools help a small business compete with larger companies?', a: 'AI gives small businesses capabilities that previously required dedicated teams — professional design (Canva AI), 24/7 customer service (ChatGPT), high-volume content production (Jasper, Copy.ai), automated bookkeeping (Intuit Assist), and professional marketing materials (AdCreative.ai). AI levels the playing field on execution speed and output quality.' },
      { q: 'Are there affordable AI tools for small businesses?', a: 'Yes. ChatGPT, Claude, and Gemini all have free tiers sufficient for most small business needs. Canva AI free plan covers basic design. Grammarly free covers grammar and spelling. Most small businesses spend under $100/month total across AI tools that meaningfully impact their operations.' },
      { q: 'Can AI tools help small businesses with marketing?', a: 'Yes. Copy.ai and Jasper generate ad copy, email campaigns, and social posts. AdCreative.ai produces ad creatives optimised for conversion. Canva AI designs graphics and social assets. ChatGPT writes website copy, product descriptions, and blog content. Hootsuite and Sprout Social schedule and analyse social content with AI assistance.' },
      { q: 'What AI tool is best for small business customer service?', a: 'ChatGPT and Claude can be deployed as AI customer service assistants via integrations. Microsoft Copilot is available in Teams for internal support workflows. For small businesses without technical resources, using ChatGPT to draft email response templates and FAQ content is the fastest way to reduce response time without a dedicated support tool.' },
    ],
  },
  {
    slug: 'data-scientists',
    label: 'Data Scientists',
    h1: 'Best AI Tools for Data Scientists in 2026',
    intro: 'The best AI tools for data scientists in 2026 are Julius, Hex, Claude, and Cursor. Julius allows natural language analysis of CSV and spreadsheet data — generating charts, running statistical tests, and explaining findings in plain English. Hex is the leading AI-native notebook environment, combining SQL, Python, and AI assistance in a collaborative interface. Claude and ChatGPT write, debug, and explain data science code faster than any other approach. Cursor is the best AI code editor for Python-heavy data science workflows. Obviously AI and Polymer make ML accessible without code.',
    toolIds: [1401, 1404, 809, 1407, 502, 302, 501, 1402],
    faqs: [
      { q: 'What are the best AI tools for data scientists?', a: 'The top AI tools for data scientists in 2026 are Julius (natural language data analysis), Hex (AI-native notebooks), Cursor (AI code editor), Claude and ChatGPT (code assistance and explanation), Tableau and Power BI (AI-enhanced visualisation), and Obviously AI (no-code ML). The choice depends on whether you need analysis, model building, or visualisation.' },
      { q: 'Can AI tools replace data scientists?', a: 'No. AI tools automate data cleaning, exploratory analysis, and routine model building — but data science value comes from framing the right questions, understanding domain context, interpreting results, and making decisions under uncertainty. These remain human skills. AI makes data scientists significantly more productive, not redundant.' },
      { q: 'What is the best AI tool for data analysis?', a: 'Julius is the best AI tool for natural language data analysis — you upload a CSV or connect a spreadsheet, ask questions in plain English, and get charts and statistical summaries. Hex is the best for collaborative, code-based analysis. Tableau and Power BI offer AI-powered analysis within a BI environment.' },
      { q: 'How are data scientists using large language models?', a: 'Data scientists use LLMs like Claude and ChatGPT to write and debug Python, SQL, and R code; explain statistical concepts; generate synthetic data; write data documentation; summarise model outputs for non-technical stakeholders; and explore unfamiliar datasets by asking questions in natural language.' },
      { q: 'What AI tools help with machine learning without coding?', a: 'Obviously AI, Polymer, and DataRobot allow users to build predictive ML models without writing code — upload data, select a target variable, and the platform trains and evaluates models automatically. These are best for business analysts and non-technical users. Data scientists generally prefer working in code for the control and reproducibility it provides.' },
    ],
  },
  {
    slug: 'video-editors',
    label: 'Video Editors',
    h1: 'Best AI Tools for Video Editors in 2026',
    intro: 'The best AI tools for video editors in 2026 are Runway, CapCut, Veed.io, and Pika. Runway leads for generative video — inpainting, background removal, motion brush, and Gen-3 video generation are production-grade capabilities used by professional studios. CapCut handles auto-captions, background removal, and social-optimised exports faster than any traditional editor. Veed.io adds AI features (subtitles, noise removal, translation) to an online editor accessible without software installation. Pika and Kling AI generate cinematic clips from text or image inputs.',
    toolIds: [1, 14, 10, 2, 3, 9, 12, 13],
    faqs: [
      { q: 'What is the best AI video editing tool in 2026?', a: 'Runway is the best AI video tool for professional and generative video work in 2026. CapCut is the best free AI video editor for social content. Veed.io is the best browser-based AI video editor for subtitles and quick edits. Descript is the best for podcast and interview video editing using a text-based interface.' },
      { q: 'Can AI tools remove backgrounds from video?', a: 'Yes. Runway, CapCut, and Veed.io all offer AI background removal for video — no green screen required. Runway\'s background removal is the most precise for professional use. CapCut\'s is fast and free. Veed.io works entirely in the browser with no software download.' },
      { q: 'What AI tools generate video from text?', a: 'Runway (Gen-3 Alpha), Pika, Kling AI, Sora (via ChatGPT), and Luma Dream Machine all generate video from text descriptions. Runway and Kling produce the most realistic output. Pika is fastest for social-ready clips. Sora produces the highest-quality cinematic results but has limited access.' },
      { q: 'How do AI tools add captions to video?', a: 'CapCut, Veed.io, Descript, and Klap all add captions to video automatically using AI speech recognition. CapCut and Veed.io are the fastest and most accurate for most content. Descript transcribes the full audio and lets you edit captions by editing text. All support exporting captions as SRT files.' },
      { q: 'What AI tools repurpose long videos into short clips?', a: 'Klap is the best AI tool for automatically cutting long videos into viral short clips — it identifies the best moments, reframes for vertical, adds captions, and exports ready-to-post. Pictory and InVideo AI also repurpose long-form content. Descript lets you manually select clips from a transcript.' },
    ],
  },
  {
    slug: 'photographers',
    label: 'Photographers',
    h1: 'Best AI Tools for Photographers in 2026',
    intro: 'The best AI tools for photographers in 2026 are Midjourney, Flux, Adobe Firefly, and Stable Diffusion. Midjourney produces the highest-quality artistic and cinematic imagery — increasingly used for mood boards, concept art, and campaign pre-visualisation. Flux leads for photorealistic image generation and is available via API for custom workflows. Adobe Firefly integrates into Lightroom and Photoshop for AI-assisted editing and generative fill. Stable Diffusion offers the deepest customisation via fine-tuning and LoRA models. Playground AI and Leonardo AI bridge generation and editing in one platform.',
    toolIds: [101, 108, 103, 104, 110, 107, 106, 105],
    faqs: [
      { q: 'What are the best AI tools for photographers?', a: 'The best AI tools for photographers in 2026 are Midjourney (concept and artistic image generation), Flux (photorealistic AI images), Adobe Firefly (integrated into Lightroom and Photoshop), Stable Diffusion (open-source with full fine-tuning control), and Canva AI (for quick client-ready graphics). The best tool depends on whether you need generation, editing, or workflow automation.' },
      { q: 'Can AI tools edit photos automatically?', a: 'Yes. Adobe Lightroom\'s AI features (Denoise, Masking, Generative Fill) automate editing tasks that previously took hours. Adobe Firefly in Photoshop can remove objects, extend backgrounds, and add elements with a text description. Luminar Neo (not on Directr) specialises in AI-powered landscape and portrait enhancement.' },
      { q: 'How do photographers use AI image generation tools?', a: 'Photographers use AI image generation for mood boards and creative direction, client concept presentations, stock image creation, background generation and replacement, composite elements, and marketing materials. Midjourney and Flux have become standard tools in commercial photography workflows for pre-production and concept development.' },
      { q: 'Are AI-generated images replacing photographers?', a: 'In some contexts — stock photography for generic use cases, simple background imagery, and concept illustration — AI is replacing commissioned photography. For event photography, portraiture, documentary work, editorial, and high-end commercial photography requiring real locations, people, and lighting, photographers are not being replaced. The market is bifurcating between commodity and craft.' },
      { q: 'What is the best AI tool for photo background removal?', a: 'Adobe Firefly and Photoshop\'s Remove Background feature are the most accurate for professional photography. Canva AI includes background removal in its free plan. Runway handles video background removal. For batch processing, dedicated tools like Remove.bg (not on Directr) handle high-volume workflows automatically.' },
    ],
  },
  {
    slug: 'project-managers',
    label: 'Project Managers',
    h1: 'Best AI Tools for Project Managers in 2026',
    intro: 'The best AI tools for project managers in 2026 are Notion AI, Motion, Reclaim.ai, and Fireflies.ai. Notion AI builds project documentation, meeting notes, and status reports from minimal input. Motion uses AI to reschedule tasks automatically around meetings and priorities — eliminating manual calendar management. Reclaim.ai protects focus time and syncs tasks intelligently across Google Calendar. Fireflies.ai captures meeting transcripts, action items, and summaries automatically. Taskade generates project plans and task breakdowns from a brief description.',
    toolIds: [701, 703, 704, 707, 706, 702, 709, 501],
    faqs: [
      { q: 'What are the best AI tools for project managers?', a: 'The top AI tools for project managers in 2026 are Notion AI (documentation and planning), Motion (AI task scheduling), Reclaim.ai (calendar and focus time management), Fireflies.ai (meeting transcription and action items), Taskade (AI project plans), and Otter.ai (meeting notes). These tools cover planning, scheduling, and communication — the three core domains of project management.' },
      { q: 'Can AI tools automatically schedule project tasks?', a: 'Yes. Motion is the leading AI scheduler for project managers — it assigns tasks to available time slots automatically, adjusts when priorities change, and reschedules when meetings land. Reclaim.ai protects focus blocks and syncs across calendars. Both tools reduce the manual calendar management that consumes significant PM time.' },
      { q: 'What AI tools help with meeting management?', a: 'Fireflies.ai and Otter.ai both record, transcribe, and summarise meetings automatically — generating action items, key decisions, and follow-up tasks without manual note-taking. Fireflies integrates with Zoom, Teams, and Google Meet. Notion AI can structure meeting notes into project documentation. Motion captures action items and schedules them automatically.' },
      { q: 'How are project managers using AI in 2026?', a: 'Project managers use AI to generate project plans and timelines from briefs, automate meeting documentation, reschedule tasks when priorities shift, write status reports and client updates, identify project risks from data, and communicate changes across stakeholders. The biggest time savings are in documentation and scheduling — typically 5-10 hours per week.' },
      { q: 'Can AI tools replace project managers?', a: 'No. AI automates the administrative and coordination tasks of project management — scheduling, note-taking, status reporting. The core of project management — stakeholder alignment, risk judgment, team leadership, scope negotiation, and decision-making under uncertainty — remains human work. AI makes project managers faster and more responsive; it doesn\'t make them redundant.' },
    ],
  },
  {
    slug: 'entrepreneurs',
    label: 'Entrepreneurs',
    h1: 'Best AI Tools for Entrepreneurs in 2026',
    intro: 'The best AI tools for entrepreneurs in 2026 are Claude, ChatGPT, Jasper, Notion AI, and AdCreative.ai. Claude and ChatGPT handle business planning, market research, investor communication, and strategic analysis — functioning as always-available advisors. Jasper produces marketing copy, pitch decks, and content at scale. Notion AI organises your company\'s knowledge and automates documentation. Canva AI creates pitch materials and brand assets without a designer. Zapier AI connects your tools and automates workflows without engineering resources.',
    toolIds: [501, 201, 202, 701, 107, 203, 801, 706],
    faqs: [
      { q: 'What are the best AI tools for entrepreneurs?', a: 'The best AI tools for entrepreneurs in 2026 are Claude and ChatGPT (strategy, research, writing), Jasper (marketing copy and content), Notion AI (documentation and planning), Canva AI (brand and design), and AdCreative.ai (ad creative generation). These tools replace capabilities that would otherwise require a full team.' },
      { q: 'Can AI tools help write a business plan?', a: 'Yes. Claude and ChatGPT can draft full business plans — market analysis, competitive landscape, financial projections structure, and operational plans — from a brief description. The AI provides a strong starting framework; the entrepreneur provides the domain knowledge, real financial data, and strategic insight that make the plan credible.' },
      { q: 'What AI tools help with fundraising and investor relations?', a: 'Claude and ChatGPT are the most useful AI tools for fundraising — they help draft pitch deck content, investor updates, term sheet summaries, and outreach emails. Gamma can build the slide deck from your content. Jasper writes investor-facing copy. No AI tool replaces the relationship and narrative judgment that successful fundraising requires.' },
      { q: 'How can entrepreneurs use AI to move faster?', a: 'Entrepreneurs use AI to validate ideas through rapid research and analysis, prototype products with tools like Lovable and Bolt.new, produce marketing content without a team, automate customer communication, write legal and operational documentation, and analyse data for decisions. AI extends what a small founding team can accomplish without hiring.' },
      { q: 'What AI tools help with startup marketing?', a: 'AdCreative.ai generates ad creatives and copy optimised for conversion. Jasper and Copy.ai write email campaigns, landing pages, and social content. Canva AI produces visual assets. Hootsuite and Sprout Social manage social scheduling. ChatGPT and Claude are used for SEO content, PR outreach drafts, and campaign strategy.' },
    ],
  },
  {
    slug: 'researchers',
    label: 'Researchers',
    h1: 'Best AI Tools for Researchers in 2026',
    intro: 'The best AI tools for researchers in 2026 are Perplexity, Claude, Elicit, and Gemini. Perplexity provides cited real-time web search answers — the essential tool for any researcher who needs up-to-date, sourced information. Elicit searches academic databases, surfaces relevant papers, and extracts key findings automatically. Claude handles long document analysis, synthesis across multiple papers, and structured literature reviews. Gemini integrates with Google Search and Google Scholar for academic research workflows. Julius analyses research data using natural language queries.',
    toolIds: [502, 508, 1506, 501, 503, 507, 1401, 705],
    faqs: [
      { q: 'What is the best AI tool for research?', a: 'Perplexity is the best AI tool for web-based research — it provides cited, real-time answers with sources you can verify. Elicit is the best for academic literature research — it searches PubMed and other databases and extracts findings from papers. Claude is the best for synthesising and analysing large document sets and writing literature reviews.' },
      { q: 'Can AI tools read and summarise academic papers?', a: 'Yes. Elicit extracts key findings, methods, and limitations from academic papers automatically. Claude can read full PDFs and generate structured summaries, identify contradictions across multiple papers, and answer specific questions about the content. Perplexity can surface relevant papers and summarise their key points with citations.' },
      { q: 'How accurate are AI research tools?', a: 'Accuracy varies significantly by tool and query type. Perplexity\'s web-based search is highly accurate for recent, well-documented facts. Elicit is accurate for extracting information that appears explicitly in papers. Claude and ChatGPT can hallucinate citations and facts — always verify AI-generated research claims against primary sources before using them.' },
      { q: 'Can AI tools help write research papers?', a: 'AI tools can assist with structure, literature review synthesis, methodology description, and editing — but generating original research findings is not something AI can do. Claude and ChatGPT are most useful for: outlining structure, explaining complex concepts clearly, improving writing quality, and formatting references. The research itself must be original human work.' },
      { q: 'What AI tools are best for systematic literature reviews?', a: 'Elicit is the best AI tool for systematic literature reviews — it searches multiple academic databases, screens papers against inclusion criteria, extracts data, and synthesises findings. Claude is excellent for the synthesis and writing stage. Together, these tools can reduce a literature review\'s time requirement by 60-70% while maintaining academic rigour.' },
    ],
  },
  {
    slug: 'social-media-managers',
    label: 'Social Media Managers',
    h1: 'Best AI Tools for Social Media Managers in 2026',
    intro: 'The best AI tools for social media managers in 2026 are Sprout Social, Hootsuite, AdCreative.ai, Canva AI, CapCut, and Lately. Sprout Social combines AI-powered scheduling, analytics, and content recommendations in one platform. Hootsuite\'s AI assistant generates captions, suggests best posting times, and monitors performance across channels. AdCreative.ai generates ad creatives and copy automatically for paid social. Canva AI produces on-brand graphics and social assets at scale. Klap and CapCut convert long-form content into platform-native short clips. Lately repurposes blog posts and podcasts into social posts automatically.',
    toolIds: [803, 805, 801, 107, 14, 203, 807, 804],
    faqs: [
      { q: 'What are the best AI tools for social media management?', a: 'The top AI tools for social media managers in 2026 are Sprout Social (scheduling, analytics, AI content), Hootsuite (multi-platform management), AdCreative.ai (paid social creative), Canva AI (graphics at scale), Lately (content repurposing), and CapCut (short-form video). Most social media teams use 3-4 of these tools together.' },
      { q: 'Can AI tools write social media captions?', a: 'Yes. Sprout Social, Hootsuite, Copy.ai, and Lately all generate social media captions from a brief or existing content. Claude and ChatGPT write captions in any tone or style on demand. Lately automatically repurposes longer content (blogs, podcasts, videos) into multiple social posts.' },
      { q: 'What AI tools help with social media analytics?', a: 'Sprout Social and Hootsuite both include AI-powered analytics — performance reporting, audience insights, best time to post recommendations, and competitor monitoring. Brand24 monitors brand mentions across social platforms in real time. Madgicx provides AI analytics for paid social ad performance.' },
      { q: 'How do social media managers use AI to save time?', a: 'Social media managers use AI to batch-generate caption variations, automatically resize and reformat content for different platforms, repurpose long-form content into social posts (Lately, Klap), schedule across platforms in one place, monitor brand mentions, and generate monthly performance reports. Average time savings are 8-15 hours per week.' },
      { q: 'What is the best AI tool for creating social media graphics?', a: 'Canva AI is the best AI tool for social media graphics — brand templates, AI-generated images, magic resize for different platforms, and a drag-and-drop interface that non-designers can use. AdCreative.ai is best specifically for paid ad creatives optimised for conversion. Midjourney and Adobe Firefly produce the highest-quality imagery when you need custom visuals.' },
    ],
  },
]

export function getProfessionBySlug(slug: string): Profession | undefined {
  return PROFESSIONS.find((p) => p.slug === slug)
}

export function getAllProfessionSlugs(): string[] {
  return PROFESSIONS.map((p) => p.slug)
}
