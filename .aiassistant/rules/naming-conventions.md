# 네이밍 규칙

## 케이스 규칙

| 대상            | 규칙             | 예시                             |
| --------------- | ---------------- | -------------------------------- |
| 폴더·파일       | kebab-case       | `user-profile`, `login-form.tsx` |
| 함수·변수       | camelCase        | `fetchUser`, `isLoggedIn`        |
| 타입/인터페이스 | PascalCase       | `UserProfile`, `ApiResponse`     |
| 상수            | UPPER_SNAKE_CASE | `API_BASE_URL`                   |

## 파일명 규칙

- 기본 패턴: `{feature}.{type}.ts`
  - Screen: `{feature}.screen.tsx`
  - Component: `{feature}.tsx`
  - Schema: `{feature}.schema.ts`
  - Type: `{feature}.types.ts`
  - API: `{feature}.api.ts`
  - Service: `{feature}.service.ts`
- Hook: `use-{feature}.ts`
- Utils: `{feature}.utils.ts`

## 코드 내부 네이밍

- 함수: 동사로 시작, 이벤트 핸들러는 `handle*`
- boolean: is/has/should/can 접두
- 타입: API·도메인 데이터는 interface, 컴포넌트 props는 type
- 상수: **UPPER_SNAKE_CASE**

## 체크리스트

- [ ] 모든 상수가 `UPPER_SNAKE_CASE`인가?
- [ ] 유틸 함수가 `{feature}.utils.ts`로 분리되어 있는가?
