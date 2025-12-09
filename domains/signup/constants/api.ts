export const EMAIL_VERIFY_ERROR_MESSAGES: Record<number, string> = {
  409: '이메일 재요청은 1분 후에 가능합니다.',
  999: '알 수 없는 오류가 발생했습니다.',
} as const;
