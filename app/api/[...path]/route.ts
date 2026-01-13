import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { apiServerClient } from '@/shared/api/api.server-client';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const { nextUrl, headers: requestHeaders } = request;
  const headers = {
    ...Object.fromEntries(requestHeaders.entries()),
    Cookie: cookieString,
  };
  const { pathname } = nextUrl;
  const [, ...pathParts] = pathname.split('/api/');
  const endpoint = pathParts.join('/');

  try {
    const response = await apiServerClient.get(endpoint, headers);

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const { nextUrl, headers: requestHeaders } = request;
  const headers = {
    ...Object.fromEntries(requestHeaders.entries()),
    Cookie: cookieString,
  };
  const { pathname } = nextUrl;

  try {
    const response = await apiServerClient.post(
      pathname,
      request.body,
      headers,
    );

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const { nextUrl, headers: requestHeaders } = request;
  const headers = {
    ...Object.fromEntries(requestHeaders.entries()),
    Cookie: cookieString,
  };
  const { pathname } = nextUrl;
  const [, ...pathParts] = pathname.split('/api/');
  const endpoint = pathParts.join('/');

  try {
    const response = await apiServerClient.put(endpoint, request.body, headers);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { nextUrl, headers: requestHeaders } = request;
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();
  const headers = {
    ...Object.fromEntries(requestHeaders.entries()),
    Cookie: cookieString,
  };
  const { pathname } = nextUrl;
  const [, ...pathParts] = pathname.split('/api/');
  const endpoint = pathParts.join('/');

  try {
    const response = await apiServerClient.delete(endpoint, headers);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
