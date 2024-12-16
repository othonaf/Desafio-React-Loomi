import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    
  const protectedRoutes = ['/home-page'];
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get('token')?.value;

  if (protectedRoutes.includes(pathname)) {
    if (!token || token == undefined) {
      
      return NextResponse.redirect(
        new URL('/login?error=auth_required', request.url)
    );
    }
  }

  return NextResponse.next();
}
