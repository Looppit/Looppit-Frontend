# TanStack Query

TanStack Query v5를 사용한 데이터 페칭 및 상태 관리. Query Key 팩토리 패턴과 Zod 스키마 검증을 통한 타입 안전한 데이터 처리를 제공합니다.

```typescript
import { useQuery } from '@tanstack/react-query';
import { usersApi } from '@/domains/users/users.api';
import { usersKeys } from '@/domains/users/users.keys';
import { useUsers, useUser } from '@/domains/users/users.hooks';

// 커스텀 훅 사용
const { data, isPending, error } = useUsers({ page: 1, limit: 10 });
const { data: user } = useUser('123');

// 직접 useQuery 사용
const { data, isPending, error } = useQuery({
  queryKey: usersKeys.list({ page: 1, limit: 10 }),
  queryFn: () => usersApi.getUsers({ page: 1, limit: 10 }),
});
```

## Zod 스키마 정의

```typescript
import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  createdAt: z.iso.datetime(),
});

export const usersSchema = z.array(userSchema);

export const userListResponseSchema = z.object({
  data: usersSchema,
});

export type User = z.infer<typeof userSchema>;
export type UserListResponse = z.infer<typeof userListResponseSchema>;
```

## 커스텀 훅 정의

```typescript
import { useQuery } from '@tanstack/react-query';
import { usersApi } from './users.api';
import { usersKeys } from './users.keys';
import type { User, UserListResponse } from './users.types';

export const useUsers = (params?: { page?: number; limit?: number }) => {
  return useQuery<UserListResponse>({
    queryKey: usersKeys.list(params || {}),
    queryFn: () => usersApi.getUsers(params),
    enabled: true,
  });
};

export const useUser = (id: string | number) => {
  return useQuery<User>({
    queryKey: usersKeys.detail(id),
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id,
  });
};
```

## Query Key 팩토리 패턴

```typescript
import { createQueryKey } from '@/shared/api/utils';

const users = createQueryKey(['users']);

export const usersKeys = {
  base: users.append(),
  list: (filters?: Record<string, unknown>) => {
    return users.append('list', ...(filters ? [filters] : []));
  },
  detail: (id: string | number) => users.append('detail', id),
};
```
