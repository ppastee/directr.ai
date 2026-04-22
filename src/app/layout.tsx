import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Director.ai — Find the Best AI Tools',
  description: 'Search and discover the right AI tools for any task. Unbiased rankings, updated weekly.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
