# API & 데이터 처리 규칙

## 스택·구조

- Axios + Zod + React Query + 에러 매핑
- 도메인별로 `.api.ts`, `.schema.ts`, `.hooks.ts`, `.types.ts` 분리

## API 함수

- 모든 요청은 `apiClient` 사용
- 응답 즉시 Zod `parse`, 반환 타입은 `z.infer`

## React Query

- `*Keys` 객체로 queryKey 생성
- `useQuery/useMutation`은 hook 파일에 정의
- Mutation 이후 invalidate 또는 optimistic 업데이트

## 에러 처리

- 상태코드 → 사용자 메시지 매핑 객체 유지
- AxiosError 여부 확인 후 기본 메시지 제공

## 체크리스트

- [ ] API/Schema/Hook/Type 파일 분리
- [ ] 런타임 검증 완료
- [ ] Query key 일관성
- [ ] Mutation invalidate 적용
- [ ] 에러 매핑 상수가 `UPPER_SNAKE_CASE`인가?
