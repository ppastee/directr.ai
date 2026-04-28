import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Directr — Find the Best Tools',
  description: 'Search and discover the right tools for any task. Unbiased rankings, updated weekly.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="theme-signal">{children}<Analytics /></body>
    </html>
  )
}
