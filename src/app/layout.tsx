import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const BASE = 'https://directr.com.au'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Directr — AI Tools Directory & Search Engine',
    template: '%s | Directr',
  },
  description: 'Find, compare and discover the best AI tools for any task. Search 60+ tools across video, images, writing, coding, audio and more — unbiased rankings updated weekly.',
  openGraph: {
    siteName: 'Directr',
    type: 'website',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@directr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="theme-signal">{children}<Analytics /></body>
    </html>
  )
}
