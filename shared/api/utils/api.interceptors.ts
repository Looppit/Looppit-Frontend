import type { AxiosInstance } from 'axios';

type RequestInterceptor<T extends AxiosInstance> = Parameters<
  T['interceptors']['request']['use']
>;
type ResponseInterceptor<T extends AxiosInstance> = Parameters<
  T['interceptors']['response']['use']
>;

type RequestInterceptorConfig<T extends AxiosInstance> = {
  onFulfilled?: RequestInterceptor<T>[0];
  onRejected?: RequestInterceptor<T>[1];
  options?: RequestInterceptor<T>[2];
};

type ResponseInterceptorConfig<T extends AxiosInstance> = {
  onFulfilled?: ResponseInterceptor<T>[0];
  onRejected?: ResponseInterceptor<T>[1];
};

export const setupInterceptors = <T extends AxiosInstance>(
  instance: T,
  {
    request,
    response,
  }: {
    request: RequestInterceptorConfig<T>;
    response: ResponseInterceptorConfig<T>;
  },
) => {
  instance.interceptors.request.use(
    request.onFulfilled,
    request.onRejected,
    request.options,
  );
  instance.interceptors.response.use(response.onFulfilled, response.onRejected);
};
