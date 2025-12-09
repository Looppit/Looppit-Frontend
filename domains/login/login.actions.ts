import { bridgeRequest, logger, platformHandler } from '@/shared/utils';

/**
 * Auth 도메인 브릿지 액션 상수
 */
const ACTION_TYPE = 'USER_ACTION';

export const AUTH_ACTION = {
  KAKAO_LOGIN: 'kakao_login',
  KAKAO_UNLINK: 'kakao_unlink',
} as const;

/**
 * Auth 액션 타입
 */
export type AuthAction = (typeof AUTH_ACTION)[keyof typeof AUTH_ACTION];

export const handleKakaoLogin = async () => {
  try {
    await platformHandler()
      .app(async () => {
        await bridgeRequest(ACTION_TYPE, {
          action: AUTH_ACTION.KAKAO_LOGIN,
        });
      })
      .web(async () => {
        logger.log('@@ 웹 카카오 로그인');
      })
      .execute();
  } catch {
    logger.log('@@ 네트워크나 기타 알 수 없는 에러');
  }
};
