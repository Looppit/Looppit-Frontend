/**
 * 콘솔 로깅을 통합 관리하는 유틸리티
 * 모든 로깅은 이 모듈을 통해 처리되며, 향후 로깅 레벨 제어, 리모트 로깅 등의 기능을 추가할 수 있습니다.
 */

import { IS_DEVELOPMENT } from '@/shared/constants';

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private logInternal(
    level: LogLevel,
    message: string,
    ...args: unknown[]
  ): void {
    if (!IS_DEVELOPMENT) return;

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    switch (level) {
      case 'log':
        console.log(prefix, message, ...args);
        break;
      case 'info':
        console.info(prefix, message, ...args);
        break;
      case 'warn':
        console.warn(prefix, message, ...args);
        break;
      case 'error':
        console.error(prefix, message, ...args);
        break;
      case 'debug':
        console.debug(prefix, message, ...args);
        break;
    }
  }

  log(message: string, ...args: unknown[]): void {
    this.logInternal('log', message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    this.logInternal('info', message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logInternal('warn', message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    this.logInternal('error', message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.logInternal('debug', message, ...args);
  }
}

export const logger = new Logger();
