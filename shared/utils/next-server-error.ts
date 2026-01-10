'use server';

import { NextResponse } from 'next/server';

import { AxiosError } from 'axios';

export const makeNextResponseError = (
  error: unknown,
  defaultMessage: string = '알 수 없는 에러가 발생했습니다.',
) => {
  const errorCode = error instanceof AxiosError ? error.response?.status : 500;
  const errorMessage =
    error instanceof AxiosError
      ? error.response?.data?.message
      : defaultMessage;

  return NextResponse.json({ message: errorMessage }, { status: errorCode });
};
