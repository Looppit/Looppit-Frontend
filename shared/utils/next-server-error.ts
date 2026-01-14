'use server';

import { NextResponse } from 'next/server';

import { ApiError } from '../api/api.types';

export const makeNextResponseError = async (apiError: ApiError) => {
  return NextResponse.json(
    { message: apiError.message },
    { status: apiError.code },
  );
};
