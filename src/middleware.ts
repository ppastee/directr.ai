import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const password = process.env.DASHBOARD_PASSWORD ?? 'admin'

  if (auth) {
    const [, b64] = auth.split(' ')
    const decoded = Buffer.from(b64, 'base64').toString()
    const [, pass] = decoded.split(':')
    if (pass === password) return NextResponse.next()
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Dashboard"' },
  })
}

export const config = {
  matcher: '/dashboard/:path*',
}
