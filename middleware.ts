import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the user is trying to access the '/error' page
  const url = request.nextUrl.clone();
  
  if (url.pathname === '/error') {
    // Redirect the user to the login page if they try to visit /error
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If they are not trying to visit /error, allow the request to continue
  return NextResponse.next();
}
