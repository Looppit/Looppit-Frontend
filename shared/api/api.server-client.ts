import { initAxiosInstance } from '@/shared/api/utils/api.instance';

import { ApiClient } from './api.core';

export const apiServerClient = new ApiClient(initAxiosInstance());
