import React from 'react'

interface IconProps {
  size?: number
  className?: string
}

const icons: Record<string, (props: IconProps) => React.ReactElement> = {

  animation: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2.5" fill="#312e81"/>
      <rect x="4.5" y="4" width="2.5" height="4" rx="0.75" fill="#1e1b4b"/>
      <rect x="10.75" y="4" width="2.5" height="4" rx="0.75" fill="#1e1b4b"/>
      <rect x="17" y="4" width="2.5" height="4" rx="0.75" fill="#1e1b4b"/>
      <rect x="4.5" y="16" width="2.5" height="4" rx="0.75" fill="#1e1b4b"/>
      <rect x="10.75" y="16" width="2.5" height="4" rx="0.75" fill="#1e1b4b"/>
      <rect x="17" y="16" width="2.5" height="4" rx="0.75" fill="#1e1b4b"/>
      <path d="M9.5 9.5L16.5 12L9.5 14.5Z" fill="#a5b4fc"/>
    </svg>
  ),

  image: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="3" width="20" height="18" rx="3" fill="#38bdf8"/>
      <circle cx="7.5" cy="9" r="2.5" fill="#fbbf24"/>
      <path d="M2 21V15L8 9L14 15L14 21Z" fill="#0c4a6e"/>
      <path d="M12 21V16L17 10.5L22 16V21Z" fill="#075985"/>
    </svg>
  ),

  writing: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="9" y="1.5" width="6" height="3.5" rx="1" fill="#f472b6"/>
      <rect x="9" y="5" width="6" height="13" rx="0.5" fill="#f59e0b"/>
      <rect x="9" y="14" width="6" height="2" fill="#94a3b8"/>
      <path d="M9 16L15 16L12 21Z" fill="#fef3c7"/>
      <path d="M10.5 18L13.5 18L12 21Z" fill="#334155"/>
    </svg>
  ),

  coding: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="1" y="2" width="22" height="16" rx="2.5" fill="#0f172a"/>
      <rect x="3" y="4" width="18" height="12" rx="1.5" fill="#1e293b"/>
      <path d="M5.5 8L8.5 10L5.5 12" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="10" y="8.75" width="7" height="1.5" rx="0.75" fill="#4ade80"/>
      <rect x="10" y="11.5" width="5" height="1.5" rx="0.75" fill="#334155"/>
      <path d="M1 18H23L21 21H3Z" fill="#1e293b"/>
      <rect x="9.5" y="18" width="5" height="0.75" rx="0.375" fill="#334155"/>
    </svg>
  ),

  audio: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 13C4 7.477 7.582 3 12 3C16.418 3 20 7.477 20 13" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round"/>
      <rect x="2" y="13" width="5" height="7" rx="2.5" fill="#7c3aed"/>
      <rect x="17" y="13" width="5" height="7" rx="2.5" fill="#7c3aed"/>
      <rect x="3.5" y="14.5" width="2" height="4" rx="1" fill="#a78bfa"/>
      <rect x="18.5" y="14.5" width="2" height="4" rx="1" fill="#a78bfa"/>
    </svg>
  ),

  chat: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="3" width="20" height="14" rx="3" fill="#0d9488"/>
      <path d="M5 17L4 21L9.5 17Z" fill="#0d9488"/>
      <circle cx="8" cy="10" r="1.5" fill="#f0fdfa"/>
      <circle cx="12" cy="10" r="1.5" fill="#f0fdfa"/>
      <circle cx="16" cy="10" r="1.5" fill="#f0fdfa"/>
    </svg>
  ),

  '3d': ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L22 7L12 12L2 7Z" fill="#818cf8"/>
      <path d="M2 7L12 12L12 22L2 17Z" fill="#4f46e5"/>
      <path d="M22 7L12 12L12 22L22 17Z" fill="#6366f1"/>
    </svg>
  ),

  productivity: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="5" width="20" height="17" rx="2.5" fill="#3b82f6"/>
      <rect x="2" y="5" width="20" height="6.5" rx="2.5" fill="#1d4ed8"/>
      <rect x="2" y="8.5" width="20" height="3" fill="#1d4ed8"/>
      <rect x="7.5" y="2" width="2" height="6" rx="1" fill="#93c5fd"/>
      <rect x="14.5" y="2" width="2" height="6" rx="1" fill="#93c5fd"/>
      <path d="M7 15L10.5 18.5L17 11.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  marketing: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 9.5V14.5L7 14.5L19 21V3L7 9.5Z" fill="#f97316"/>
      <rect x="2" y="9.5" width="5" height="5" rx="1" fill="#ea580c"/>
      <path d="M21 7.5C22.8 9.5 22.8 14.5 21 16.5" stroke="#fed7aa" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  ),

  // ── Unused / future categories ───────────────────────────────────────────
  finance: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>
    </svg>
  ),
  accounting: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="16" height="20" x="4" y="2" rx="2"/>
      <line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/>
      <path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/>
      <path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>
    </svg>
  ),
  legal: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3v18"/><path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"/>
      <path d="m19 8 3 8a5 5 0 0 1-6 0z"/><path d="m5 8 3 8a5 5 0 0 1-6 0z"/>
      <path d="M7 21h10"/>
    </svg>
  ),
  hr: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <circle cx="9" cy="7" r="4"/>
    </svg>
  ),
  construction: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/>
      <path d="M14 6a6 6 0 0 1 6 6v3"/><path d="M4 15v-3a6 6 0 0 1 6-6"/>
      <rect x="2" y="15" width="20" height="4" rx="1"/>
    </svg>
  ),
  data: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16"/>
      <path d="M7 11h8"/><path d="M7 16h12"/><path d="M7 6h3"/>
    </svg>
  ),
  education: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 7v14"/>
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
    </svg>
  ),
}

interface CategoryIconProps {
  id: string
  size?: number
  className?: string
}

export default function CategoryIcon({ id, size = 28, className }: CategoryIconProps) {
  const Icon = icons[id]
  if (!Icon) return null
  return <Icon size={size} className={className} />
}
