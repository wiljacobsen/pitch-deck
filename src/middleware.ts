import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function middleware(req: NextRequest) {
  // NextAuth v5 uses 'authjs.session-token' cookie name
  // On HTTPS (production), it's prefixed with '__Secure-'
  const isSecure = req.nextUrl.protocol === 'https:'
  const cookieName = isSecure
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token'

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName,
    salt: cookieName,
  })

  const { pathname } = req.nextUrl
  const isLoggedIn = !!token
  const role = token?.role as string | undefined

  // Public routes
  if (pathname === '/login' || pathname.startsWith('/api/auth')) {
    if (isLoggedIn && pathname === '/login') {
      const dest = role === 'ADMIN' ? '/admin' : '/'
      return NextResponse.redirect(new URL(dest, req.url))
    }
    return NextResponse.next()
  }

  // All other routes require auth
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Admin routes require ADMIN role
  if (pathname.startsWith('/admin') && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.svg|Symphony_Logo_White.png).*)'],
}
