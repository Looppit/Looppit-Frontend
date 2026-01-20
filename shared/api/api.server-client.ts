import { initAxiosInstance } from '@/shared/api/utils/api.instance';

import { API_BASE_URL } from './api.constants';
import { ApiClient } from './api.core';

export const apiServerClient = new ApiClient(initAxiosInstance(API_BASE_URL));
