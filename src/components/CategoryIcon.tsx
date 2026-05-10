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
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Axes */}
      <rect x="3" y="3" width="1.5" height="16" rx="0.75" fill="#15803d"/>
      <rect x="3" y="18" width="18" height="1.5" rx="0.75" fill="#15803d"/>
      {/* Area fill under line */}
      <path d="M4.5 16L8 11L12 13L16 7L21 9L21 18.5L4.5 18.5Z" fill="#bbf7d0"/>
      {/* Line */}
      <path d="M4.5 16L8 11L12 13L16 7L21 9" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Dots */}
      <circle cx="8" cy="11" r="1.5" fill="#15803d"/>
      <circle cx="12" cy="13" r="1.5" fill="#15803d"/>
      <circle cx="16" cy="7" r="1.5" fill="#15803d"/>
    </svg>
  ),

  accounting: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Body */}
      <rect x="4" y="2" width="16" height="20" rx="2.5" fill="#3b82f6"/>
      {/* Display */}
      <rect x="6" y="4" width="12" height="5" rx="1.5" fill="#eff6ff"/>
      <rect x="11" y="5.5" width="6" height="2" rx="0.5" fill="#93c5fd"/>
      {/* Button grid */}
      <rect x="6" y="11" width="3" height="2.5" rx="0.75" fill="#1d4ed8"/>
      <rect x="10.5" y="11" width="3" height="2.5" rx="0.75" fill="#1d4ed8"/>
      <rect x="15" y="11" width="3" height="2.5" rx="0.75" fill="#1d4ed8"/>
      <rect x="6" y="14.5" width="3" height="2.5" rx="0.75" fill="#1d4ed8"/>
      <rect x="10.5" y="14.5" width="3" height="2.5" rx="0.75" fill="#1d4ed8"/>
      <rect x="15" y="14.5" width="3" height="2.5" rx="0.75" fill="#bfdbfe"/>
      <rect x="6" y="18" width="7" height="2.5" rx="0.75" fill="#93c5fd"/>
      <rect x="15" y="18" width="3" height="2.5" rx="0.75" fill="#1d4ed8"/>
    </svg>
  ),

  legal: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Centre pole */}
      <rect x="11.25" y="4" width="1.5" height="14" rx="0.75" fill="#92400e"/>
      {/* Base */}
      <rect x="7" y="20" width="10" height="2" rx="1" fill="#92400e"/>
      {/* Balance beam */}
      <rect x="3.5" y="7" width="17" height="1.5" rx="0.75" fill="#f59e0b"/>
      {/* Left chain */}
      <rect x="6" y="8.5" width="1.5" height="4" rx="0.75" fill="#fbbf24"/>
      {/* Right chain */}
      <rect x="16.5" y="8.5" width="1.5" height="4" rx="0.75" fill="#fbbf24"/>
      {/* Left pan */}
      <ellipse cx="6.75" cy="13.5" rx="3.25" ry="1.25" fill="#fbbf24"/>
      {/* Right pan */}
      <ellipse cx="17.25" cy="13.5" rx="3.25" ry="1.25" fill="#fbbf24"/>
    </svg>
  ),

  hr: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Back person (lighter) */}
      <circle cx="16.5" cy="7.5" r="3" fill="#818cf8"/>
      <path d="M11 22C11 18.134 13.462 15 16.5 15C19.538 15 22 18.134 22 22Z" fill="#818cf8"/>
      {/* Front person (darker) */}
      <circle cx="9" cy="8" r="3.5" fill="#4f46e5"/>
      <path d="M2 22C2 17.582 5.134 14 9 14C12.866 14 16 17.582 16 22Z" fill="#4f46e5"/>
    </svg>
  ),

  construction: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Hat dome */}
      <path d="M4.5 14C4.5 8.753 7.91 5 12 5C16.09 5 19.5 8.753 19.5 14Z" fill="#fbbf24"/>
      {/* Brim */}
      <rect x="2" y="13" width="20" height="3.5" rx="1.75" fill="#f59e0b"/>
      {/* Centre ridge on dome */}
      <rect x="11.25" y="5" width="1.5" height="8" rx="0.75" fill="#fde68a"/>
    </svg>
  ),

  data: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Axes */}
      <rect x="3" y="3" width="1.5" height="16" rx="0.75" fill="#6d28d9"/>
      <rect x="3" y="18" width="18" height="1.5" rx="0.75" fill="#6d28d9"/>
      {/* Three bars */}
      <rect x="5.5" y="12" width="4" height="7" rx="1" fill="#ddd6fe"/>
      <rect x="11" y="8" width="4" height="11" rx="1" fill="#a78bfa"/>
      <rect x="16.5" y="4" width="4" height="15" rx="1" fill="#7c3aed"/>
    </svg>
  ),

  'ai-agents': ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Antenna */}
      <circle cx="12" cy="2.5" r="1.25" fill="#a78bfa"/>
      <rect x="11.5" y="3.5" width="1" height="3" fill="#7c3aed"/>
      {/* Head */}
      <rect x="4" y="6" width="16" height="13" rx="3" fill="#7c3aed"/>
      <rect x="6" y="8" width="12" height="9" rx="2" fill="#1e1b4b"/>
      {/* Eyes */}
      <circle cx="9.5" cy="12" r="1.25" fill="#a5f3fc"/>
      <circle cx="14.5" cy="12" r="1.25" fill="#a5f3fc"/>
      {/* Mouth */}
      <rect x="9" y="14.75" width="6" height="1.25" rx="0.5" fill="#a5f3fc"/>
      {/* Ears */}
      <rect x="2" y="10" width="2" height="5" rx="1" fill="#a78bfa"/>
      <rect x="20" y="10" width="2" height="5" rx="1" fill="#a78bfa"/>
      {/* Neck */}
      <rect x="10" y="19" width="4" height="2" fill="#7c3aed"/>
    </svg>
  ),

  education: ({ size = 28, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Left page */}
      <path d="M3 5C3 4 4 3 5 3L11 3L11 19L5 19C4 19 3 18 3 17Z" fill="#0ea5e9"/>
      {/* Right page */}
      <path d="M13 3L19 3C20 3 21 4 21 5L21 17C21 18 20 19 19 19L13 19Z" fill="#38bdf8"/>
      {/* Spine */}
      <rect x="11" y="3" width="2" height="16" fill="#0284c7"/>
      {/* Lines left */}
      <rect x="5" y="7" width="5" height="1.5" rx="0.75" fill="#7dd3fc"/>
      <rect x="5" y="10.5" width="5" height="1.5" rx="0.75" fill="#7dd3fc"/>
      <rect x="5" y="14" width="3" height="1.5" rx="0.75" fill="#7dd3fc"/>
      {/* Lines right */}
      <rect x="14" y="7" width="5" height="1.5" rx="0.75" fill="#bae6fd"/>
      <rect x="14" y="10.5" width="5" height="1.5" rx="0.75" fill="#bae6fd"/>
      <rect x="14" y="14" width="3" height="1.5" rx="0.75" fill="#bae6fd"/>
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
