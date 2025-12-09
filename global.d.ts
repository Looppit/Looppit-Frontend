import type { Bridge } from './shared/types/bridge';

declare global {
  interface Window {
    bridge: Bridge;
  }
}

export {};
