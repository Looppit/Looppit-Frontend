# 상태관리 전략

## 도구 선택

| 상태 유형    | 사례                | 도구        |
| ------------ | ------------------- | ----------- |
| Server State | API 데이터 캐싱     | React Query |
| Shared State | 로그인, 필터, 모달  | Jotai       |
| Derivable    | 계산된 파생 값      | Jotai       |
| Environment  | Router, Theme, I18n | Context     |
| Local UI     | 단일 컴포넌트 상태  | useState    |

## Jotai

- `shared/store` 또는 `domains/{feature}/store`에 atom 정의
- 파생 값은 read-only atom, 액션은 write atom으로 구성
- 도메인별 atom 묶음을 export해 의존성 명확히 유지

## React Query

- 모든 서버 상태는 queryKey 헬퍼와 함께 `useQuery/useMutation`으로 관리
- Mutation 이후 invalidate 또는 optimistic update 처리

## Context

- Router/Theme/I18n처럼 변경 빈도가 낮은 환경 값만 저장
- 자주 변하는 값은 Jotai로 이동

## 안티패턴

- 변경이 잦은 값을 Context로 전달
- React Query를 일반 상태 저장소처럼 남용
- Props drilling이 3단계 이상 이어짐

## 체크리스트

- [ ] 상태 유형에 맞는 도구 선택 (Server State → React Query, Shared → Jotai, Environment → Context)
- [ ] 안티패턴 회피 (Context 남용, React Query 남용, Props drilling)
