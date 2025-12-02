# API Client

Axios 기반의 HTTP 클라이언트로, 인터셉터를 통한 자동 인증 토큰 처리와 통합 에러 핸들링을 제공합니다.

```typescript
import { apiClient } from '@/shared/api/api.client';

// GET 요청
const users = await apiClient.get<User[]>('/users');

// POST 요청
const newUser = await apiClient.post<User>('/users', {
  name: '홍길동',
  email: 'hong@example.com',
});

// DELETE 요청
await apiClient.delete('/users/1');

// 커스텀 헤더와 함께 요청
const data = await apiClient.get<Data>('/endpoint', {
  'X-Custom-Header': 'value',
});
```
