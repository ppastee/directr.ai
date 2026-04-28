import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Dashboard — Directr.ai' }

export default function DashboardPage() {
  return (
    <html lang="en">
      <body className="theme-signal" style={{ margin: 0, minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--body-font, system-ui, sans-serif)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <Link href="/" style={{ fontSize: '0.82rem', color: 'var(--fg3)', textDecoration: 'none' }}>← Back to Directr.ai</Link>
            <h1 style={{ margin: '1rem 0 0.25rem', fontSize: '1.75rem', fontFamily: 'var(--heading-font)', fontWeight: 700 }}>Dashboard</h1>
            <p style={{ color: 'var(--fg3)', fontSize: '0.9rem', margin: 0 }}>Internal analytics for Directr.ai</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            <DashCard
              title="Traffic Analytics"
              description="Pageviews, visitors, top pages, referrers, and device breakdown."
              href="https://vercel.com/casey-browns-projects/directr-ai/analytics"
              cta="Open Vercel Analytics →"
              accent
            />
            <DashCard
              title="Web Vitals"
              description="Core Web Vitals: LCP, FID, CLS scores across your pages."
              href="https://vercel.com/casey-browns-projects/directr-ai/speed-insights"
              cta="Open Speed Insights →"
            />
            <DashCard
              title="Deployments"
              description="Production and preview deployment history with build logs."
              href="https://vercel.com/casey-browns-projects/directr-ai/deployments"
              cta="Open Deployments →"
            />
          </div>

          <div style={{ marginTop: '3rem', padding: '1.25rem 1.5rem', background: 'var(--bg2)', borderRadius: 12, border: '1px solid var(--border)' }}>
            <p style={{ margin: '0 0 0.5rem', fontWeight: 700, fontSize: '0.88rem' }}>Payment Analytics</p>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--fg3)' }}>Coming once affiliate links are live. Will track referral clicks, conversions, and estimated revenue per tool.</p>
          </div>
        </div>
      </body>
    </html>
  )
}

function DashCard({ title, description, href, cta, accent }: {
  title: string
  description: string
  href: string
  cta: string
  accent?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '1.25rem 1.5rem',
        background: accent ? 'var(--accent-bg)' : 'var(--bg2)',
        border: `1px solid ${accent ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 12,
        textDecoration: 'none',
        transition: 'box-shadow 0.15s',
      }}
    >
      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--fg)' }}>{title}</span>
      <span style={{ fontSize: '0.82rem', color: 'var(--fg3)', lineHeight: 1.5, flex: 1 }}>{description}</span>
      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent)', marginTop: '0.25rem' }}>{cta}</span>
    </a>
  )
}
