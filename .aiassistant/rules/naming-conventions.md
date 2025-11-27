# 네이밍 규칙

| 타입            | 규칙                | 예시                              |
| --------------- | ------------------- | --------------------------------- |
| 폴더명          | kebab-case          | `user-profile`, `reset-password`  |
| 컴포넌트 파일   | kebab-case          | `user-card.tsx`, `login-form.tsx` |
| Hook            | `use-` + kebab-case | `use-auth.ts`, `use-debounce.ts`  |
| 함수/변수       | camelCase           | `fetchUser()`, `isLoggedIn`       |
| 타입/인터페이스 | PascalCase          | `UserProfile`, `ApiResponse`      |
| 상수            | UPPER_SNAKE_CASE    | `API_BASE_URL`, `MAX_RETRY_COUNT` |

## 변수/함수

```typescript
// Boolean - is/has/should/can prefix
const isLoggedIn = true;
const hasPermission = false;

// 함수 - 동사로 시작
const fetchUserData = () => {};
const handleSubmit = () => {};
```

## 컴포넌트 네이밍

기능 우선 (의도 우선) 방식

```typescript
// ✅ 기능 우선
export const LoginButton = () => {};
export const UserProfile = () => {};

// ❌ 타입 우선
export const ButtonLogin = () => {};
```

## 타입/인터페이스

```typescript
interface UserProfile {
  id: string;
  name: string;
}

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}
```

## 상수

```typescript
const API_BASE_URL = "https://api.example.com";
const MAX_RETRY_COUNT = 3;
```
