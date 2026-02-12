import type { SocialProvider } from '@/domains/auth';

import { isPostHogReady, posthogClient } from './posthog';

/**
 * PostHog 이벤트 타입 정의
 */
/** 로그인/가입 수단 (이메일 vs SNS) */
export type AuthMethod = 'email' | SocialProvider;

export type PostHogEvent =
  | 'login_started'
  | 'login_completed'
  | 'login_failed'
  | 'signup_completed'
  | 'signup_failed'
  | 'oauth_error_occurred'
  | 'todo_created'
  | 'todo_toggled'
  | 'todo_updated'
  | 'todo_deleted'
  | 'category_created'
  | 'category_updated'
  | 'category_deleted'
  | 'onboarding_completed'
  | 'custom_form_submitted'
  //TODO: 탈퇴 로직 완료시 연동할 이벤트명
  | 'withdrawal_completed'
  | 'withdrawal_failed';

/**
 * 각 이벤트의 속성 타입 정의
 */
export interface PostHogEventProperties {
  login_started: {
    method: AuthMethod;
    source?: string;
  };
  login_completed: {
    method: AuthMethod;
  };
  login_failed: {
    method: AuthMethod;
    error_code?: string;
  };
  signup_completed: {
    method: AuthMethod;
  };
  signup_failed: {
    method: AuthMethod;
    error_code?: string;
  };
  oauth_error_occurred: {
    provider: SocialProvider;
    error_code: string;
    error_message: string;
    pathname: string;
  };
  todo_created: Record<string, never>;
  todo_toggled: {
    completed: boolean;
  };
  todo_updated: Record<string, never>;
  todo_deleted: Record<string, never>;
  category_created: Record<string, never>;
  category_updated: Record<string, never>;
  category_deleted: Record<string, never>;
  onboarding_completed: Record<string, never>;
  custom_form_submitted: {
    form_id: string;
    answer_1?: string;
    answer_2?: string;
    answer_3?: string;
    user_feedback?: string;
    user_email?: string;
  };
  withdrawal_completed: Record<string, never>;
  withdrawal_failed: {
    error_code?: string;
  };
}

/**
 * 타입 안전한 PostHog 이벤트 추적 함수
 * 속성 없는 이벤트는 eventName만, 속성 있는 이벤트는 properties까지 전달
 */
export function trackEvent<T extends PostHogEvent>(
  eventName: T,
  properties?: PostHogEventProperties[T],
): void {
  if (!isPostHogReady()) {
    return;
  }

  posthogClient.capture(eventName, properties ?? {});
}
