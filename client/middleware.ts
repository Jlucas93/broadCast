import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('-----------------------------------------');
  const tokenCookie = request.cookies.get('@token')?.value;
  console.log('tokenCookie', tokenCookie);

  if (!tokenCookie) {
    if (
      request.nextUrl.pathname !== '/login' &&
      request.nextUrl.pathname !== '/signup'
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else if (
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/signup'
  ) {
    return NextResponse.redirect(new URL('/connections', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/contact', '/connections', '/broadcast', '/signup'],
};
