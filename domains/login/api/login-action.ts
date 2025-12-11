'use server';

import { ERROR_MESSAGE_MAP } from '@/shared/api/api.constants';
import { ApiError, ErrorStatusKey } from '@/shared/api/api.types';
import { getProjectConfig, setTokensToCookies } from '@/shared/utils';

import { LoginResponse } from '../types';

export const loginAction = async (
  formData: FormData,
): Promise<LoginResponse | ApiError | undefined> => {
  try {
    const { apiEndPoint } = getProjectConfig();

    const response = await fetch(apiEndPoint + '/user/login', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(
        JSON.stringify({
          code: response.status,
          message: ERROR_MESSAGE_MAP[response.status as ErrorStatusKey],
          field: undefined,
        }),
      );
    }

    const data: LoginResponse = await response.json();
    await setTokensToCookies(data);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      const errorData = JSON.parse(error.message) as ApiError;

      return {
        code: errorData.code,
        message: errorData.message,
        field: errorData.field,
      };
    }

    return {
      code: 'HTTP_500',
      message: '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.',
      field: undefined,
    };
  }
};
