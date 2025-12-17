import { NextRequest, NextResponse } from 'next/server';

/**
 * This middleware will run before admin routes to verify authentication.
 * Configure this in middleware.ts if using Next.js 12+
 */

export function adminMiddleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Skip middleware for login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check for admin token in cookies
  const token = req.cookies.get('admin-token')?.value;

  if (!token && !pathname.startsWith('/admin/api')) {
    // Redirect to admin login
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}
