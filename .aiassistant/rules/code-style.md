# 코드 스타일 규칙

## 핵심 철학

복잡한 제어 흐름을 숨기고 의도에 집중

```typescript
// ❌ 명령형
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage />;

// ✅ 선언적
<QueryBoundary>
  <UserProfileView user={user} />
</QueryBoundary>;
```

### 적용 방법

1. 로딩/에러: QueryBoundary가 담당
2. 비즈니스 로직: hooks에 캡슐화
3. 데이터 구조: switch문 대신 객체 매핑

## 기본 원칙

- 가독성 우선
- 일관성 유지
- 의도 표현 (WHAT 우선, HOW 숨김)

## 복잡도 기준

- 파일당 최대 250줄
- Cyclomatic Complexity 10 이하
- 함수당 최대 50줄

## 컴포넌트 구조

```typescript
// 1. Import
// 2. 타입
// 3. 상수
// 4. 컴포넌트
export const UserCard = ({ user }: UserProps) => {
  // State → Hooks → Handlers → Effects → JSX
};
```

## Import 순서

```typescript
// 1. React
// 2. 외부 라이브러리
// 3. shared
// 4. domains
// 5. 상대 경로
```

## 함수 규칙

```typescript
// ✅ Early Return
const getDiscount = (user: User) => {
  if (!user) return 0;
  if (!user.isPremium) return 0;
  return 0.1;
};

// ✅ 작은 함수로 분리
const processOrder = (order: Order) => {
  return saveOrder(calculateTotal(validateOrder(order)));
};
```

## 선언적 패턴

```typescript
// ❌ 명령형
export const UserProfile = ({ userId }) => {
  const { data, isLoading, error } = useUser(userId);
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;
  return <div>{data.name}</div>;
};

// ✅ 선언적
export const UserProfile = ({ userId }) => {
  const user = useUser(userId);
  const updateUser = useUserUpdate(userId);
  return (
    <QueryBoundary>
      <UserProfileView user={user} onUpdate={updateUser} />
    </QueryBoundary>
  );
};
```

## 체크리스트

- [ ] 컴포넌트에 `if (isLoading)`, `if (error)` 없음
- [ ] 비즈니스 로직이 hooks에 있음
- [ ] QueryBoundary로 로딩/에러 처리
- [ ] 250줄 이하, 복잡도 10 이하
- [ ] Early return 적용
