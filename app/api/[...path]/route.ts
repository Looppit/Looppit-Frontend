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

const makeHeadersWithCookie = async (request: NextRequest) => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();
  return {
    ...Object.fromEntries(request.headers.entries()),
    Cookie: cookieString,
  };
};

export async function GET(request: NextRequest) {
  const headers = await makeHeadersWithCookie(request);
  const endpoint = getEndpoint(request.nextUrl);

  try {
    const response = await apiServerClient.get(endpoint, headers);
    return NextResponse.json(response);
  } catch (error) {
    const apiError = createApiError(error);
    return makeNextResponseError(apiError);
  }
}

export async function POST(request: NextRequest) {
  const headers = await makeHeadersWithCookie(request);
  const endpoint = getEndpoint(request.nextUrl);

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
  const headers = await makeHeadersWithCookie(request);
  const endpoint = getEndpoint(request.nextUrl);

  try {
    const response = await apiServerClient.put(endpoint, request.body, headers);

    return NextResponse.json(response);
  } catch (error) {
    const apiError = createApiError(error);
    return makeNextResponseError(apiError);
  }
}

export async function DELETE(request: NextRequest) {
  const headers = await makeHeadersWithCookie(request);
  const endpoint = getEndpoint(request.nextUrl);

  try {
    const response = await apiServerClient.delete(endpoint, headers);

    return NextResponse.json(response);
  } catch (error) {
    const apiError = createApiError(error);
    return makeNextResponseError(apiError);
  }
}
