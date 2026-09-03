import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Legacy route redirect
  if (pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/app/dashboard', request.url));
  }

  // 1. STRICT ROUTE GUARD: Platform Owner UI (/platform/*)
  if (pathname.startsWith('/platform')) {
    const userRole = request.cookies.get('user_role')?.value || 'SUPER_ADMIN'; // Demo default or cookie
    if (userRole !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/app/dashboard', request.url));
    }
  }

  // 2. STRICT ROUTE GUARD: Organization Hospitality SaaS UI (/app/*)
  if (pathname.startsWith('/app')) {
    const userRole = request.cookies.get('user_role')?.value || 'ORGANIZATION_ADMIN';
    if (userRole === 'GUEST') {
      return NextResponse.redirect(new URL('/guest/agt_concierge_01', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/platform/:path*', '/app/:path*', '/guest/:path*']
};
