import { User } from '@/domains/user/user.types';

import { isPostHogReady, posthogClient } from './posthog';

export interface UserIdentifyProperties extends Pick<
  User,
  'nickname' | 'provider'
> {
  user_id: User['id'];
}

const extractIdentifyProperties = (user: User): UserIdentifyProperties => {
  return {
    nickname: user.nickname,
    provider: user.provider,
    user_id: user.id,
  };
};

export const identifyUser = (user: User): void => {
  if (!isPostHogReady()) {
    return;
  }

  const properties = extractIdentifyProperties(user);
  posthogClient.identify(String(user.id), properties);
};
