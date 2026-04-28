import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/category/animation',    destination: '/category/best-animation-video-ai-tools',    permanent: true },
      { source: '/category/image',        destination: '/category/best-image-generation-ai-tools',   permanent: true },
      { source: '/category/writing',      destination: '/category/best-writing-copy-ai-tools',        permanent: true },
      { source: '/category/coding',       destination: '/category/best-coding-assistants-ai-tools',   permanent: true },
      { source: '/category/audio',        destination: '/category/best-audio-music-ai-tools',         permanent: true },
      { source: '/category/chat',         destination: '/category/best-chat-research-ai-tools',       permanent: true },
      { source: '/category/3d',           destination: '/category/best-3d-design-ai-tools',           permanent: true },
      { source: '/category/productivity', destination: '/category/best-productivity-ai-tools',        permanent: true },
      { source: '/category/marketing',    destination: '/category/best-marketing-ai-tools',           permanent: true },
      { source: '/category/finance',      destination: '/category/best-finance-ai-tools',             permanent: true },
      { source: '/category/accounting',   destination: '/category/best-accounting-ai-tools',          permanent: true },
      { source: '/category/legal',        destination: '/category/best-legal-ai-tools',               permanent: true },
      { source: '/category/hr',           destination: '/category/best-hr-recruiting-ai-tools',       permanent: true },
      { source: '/category/construction', destination: '/category/best-construction-ai-tools',        permanent: true },
      { source: '/category/data',         destination: '/category/best-data-analytics-ai-tools',      permanent: true },
      { source: '/category/education',    destination: '/category/best-education-training-ai-tools',  permanent: true },
    ]
  },
}

export default nextConfig;
