export const IS_CLIENT = typeof window !== 'undefined';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_APP = IS_CLIENT && !!window.ReactNativeWebView;
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
