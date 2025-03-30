import { NextResponse } from 'next/server';
 
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('authToken')?.value;

  const protectedPaths = ['/dashboard', '/history'];
  
  const authPaths = ['/login', '/signup', '/verify-otp'];

  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  const isAuthPath = authPaths.some(path => pathname.startsWith(path));

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/history/:path*',
    '/login',
    '/signup',
    '/verify-otp'
  ]
};