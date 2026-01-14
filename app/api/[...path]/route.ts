import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { apiServerClient } from '@/shared/api/api.server-client';
import { createApiError } from '@/shared/api/utils/api.response-format';
import { makeNextResponseError } from '@/shared/utils';

const getEndpoint = (nextUrl: NextRequest['nextUrl']): string => {
  const { pathname } = nextUrl;
  const [, ...pathParts] = pathname.split('/api/');
  return pathParts.join('/');
};

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const { nextUrl, headers: requestHeaders } = request;
  const headers = {
    ...Object.fromEntries(requestHeaders.entries()),
    Cookie: cookieString,
  };
  const endpoint = getEndpoint(nextUrl);

  try {
    const response = await apiServerClient.get(endpoint, headers);
    return NextResponse.json(response);
  } catch (error) {
    const apiError = createApiError(error);
    return makeNextResponseError(apiError);
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
  const endpoint = getEndpoint(nextUrl);

  try {
    const response = await apiServerClient.post(
      endpoint,
      request.body,
      headers,
    );

    return NextResponse.json(response);
  } catch (error) {
    const apiError = createApiError(error);
    return makeNextResponseError(apiError);
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
  const endpoint = getEndpoint(nextUrl);

  try {
    const response = await apiServerClient.put(endpoint, request.body, headers);

    return NextResponse.json(response);
  } catch (error) {
    const apiError = createApiError(error);
    return makeNextResponseError(apiError);
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
  const endpoint = getEndpoint(nextUrl);

  try {
    const response = await apiServerClient.delete(endpoint, headers);

    return NextResponse.json(response);
  } catch (error) {
    const apiError = createApiError(error);
    return makeNextResponseError(apiError);
  }
}
