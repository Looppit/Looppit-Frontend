# 프로젝트 구조 규칙

## 개념

- 도메인(기능) 기준 정리
- 공통 코드 → `shared/`
- `app/` → 라우팅만

## 폴더 구조

```
app/                      // Next router
domains/                  // 비즈니스 도메인
  login/
    login-screen.tsx
    login.api.ts
    login.hooks.ts
    login.types.ts
shared/                   // 공통
  ui/button/
  hooks/use-debounce.ts
  utils/cn.ts
```

## 파일 역할

| 접미사        | 역할              |
| ------------- | ----------------- |
| `.api.ts`     | API 요청          |
| `.hooks.ts`   | React hooks       |
| `.types.ts`   | TypeScript 타입   |
| `.utils.ts`   | 계산/가공 함수    |
| `-screen.tsx` | 페이지 UI         |
| `.schema.ts`  | Validation 스키마 |

## Import

절대 경로만 사용

```typescript
import { Button } from "@/shared/ui/button";
import { useAuth } from "@/domains/login/login.hooks";
```

## 주의사항

- `app/` → 라우팅 전용
- 비즈니스 로직 → `domains/`
- `shared/` → 진짜 공통만
