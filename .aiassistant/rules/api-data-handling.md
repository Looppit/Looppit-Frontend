# API & 데이터 처리 규칙

## 기술 스택

- HTTP Client: Axios
- 타입 검증: Zod
- 에러 처리: Interceptor + 객체 매핑

## 파일 구조

```
domains/user/
  user.api.ts       // API 함수
  user.schema.ts    // Zod 스키마
  user.hooks.ts     // React Query hooks
  user.types.ts     // 타입
```

## Axios 설정

```typescript
// shared/api/client.ts
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  timeout: 10000,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

## API 함수

```typescript
// user.api.ts
export const fetchUser = async (userId: string): Promise<User> => {
  const { data } = await apiClient.get(`/users/${userId}`);
  return userSchema.parse(data);
};
```

## Zod 검증

```typescript
// user.schema.ts
export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
});

export type User = z.infer<typeof userSchema>;
```

## React Query Hooks

```typescript
// user.hooks.ts
export const userKeys = {
  all: ["users"] as const,
  detail: (id: string) => [...userKeys.all, id] as const,
};

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000,
  });
};
```

## 에러 처리

```typescript
// shared/api/error-handler.ts
const ERROR_MESSAGES = {
  400: "잘못된 요청입니다",
  401: "로그인이 필요합니다",
  500: "서버 오류가 발생했습니다",
} as const;

export const getErrorMessage = (error: unknown): string => {
  if (!(error instanceof AxiosError)) return "알 수 없는 오류";
  const status = error.response?.status;
  return ERROR_MESSAGES[status as keyof typeof ERROR_MESSAGES] ?? error.message;
};
```

## 체크리스트

- [ ] API 함수는 `{domain}.api.ts`에 정의
- [ ] Zod 스키마로 런타임 검증
- [ ] React Query hooks 작성
- [ ] Query Key 일관성 관리
- [ ] Mutation 후 invalidate
- [ ] 에러 처리에 객체 매핑 사용
