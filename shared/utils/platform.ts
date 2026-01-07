import { IS_APP } from '@/shared/constants';

/**
 * 플랫폼별 액션 핸들러 인터페이스
 */
interface PlatformHandler<T = unknown> {
  app(action: () => Promise<T> | T): PlatformHandler<T>;
  web(action: () => Promise<T> | T): PlatformHandler<T>;
  execute(): Promise<T | void>;
}

export function platformHandler<T = unknown>(): PlatformHandler<T> {
  let appAction: (() => Promise<T> | T) | undefined;
  let webAction: (() => Promise<T> | T) | undefined;

  const handler: PlatformHandler<T> = {
    app(action: () => Promise<T> | T) {
      appAction = action;
      return handler;
    },

    web(action: () => Promise<T> | T) {
      webAction = action;
      return handler;
    },

    async execute(): Promise<T | void> {
      if (IS_APP && appAction) {
        return await appAction();
      }
      if (!IS_APP && webAction) {
        return await webAction();
      }
    },
  };

  return handler;
}
