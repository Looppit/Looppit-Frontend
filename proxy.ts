import { NextResponse, NextRequest } from 'next/server';

import { guardRules } from '@/shared/proxy/proxy.guard';

const proxy = (request: NextRequest) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return NextResponse.next();
  }

  const matchedRule = guardRules.find((rule) => rule.when(request));

  if (matchedRule) {
    return NextResponse.redirect(new URL(matchedRule.redirect, request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/|ingest).*)',
};

export default proxy;
