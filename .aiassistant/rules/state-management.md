# 상태관리 전략

## 도구 선택

| 상태 유형    | 사용 사례            | 도구        |
| ------------ | -------------------- | ----------- |
| Server State | API 데이터 캐싱      | React Query |
| Shared State | 로그인 여부, 필터 값 | Jotai       |
| Derivable    | 계산된 값            | Jotai       |
| Environment  | Router, Theme, I18n  | Context     |

## Jotai

```typescript
// shared/store/auth.store.ts
export const userAtom = atom<User | null>(null);
export const userNameAtom = atom((get) => get(userAtom)?.name ?? "Guest");
export const logoutAtom = atom(null, (get, set) => {
  set(userAtom, null);
});

// 사용
const [user, setUser] = useAtom(userAtom);
const isAuth = useAtomValue(isAuthenticatedAtom);
```

## React Query

```typescript
// user.hooks.ts
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000,
  });
};
```

## Context

⚠️ 자주 변경되는 값에 사용 시 불필요한 리렌더링 발생

```typescript
// theme-provider.tsx
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## 선택 가이드

```
API 데이터? → React Query
여러 컴포넌트 공유? → 자주 변경? → Jotai
                    → Context
한 컴포넌트만? → useState
```

## 안티패턴

```typescript
// ❌ Context에 자주 변경되는 값
const [count, setCount] = useState(0); // 모든 하위 리렌더링!

// ❌ React Query를 일반 상태로
useQuery({ queryKey: ["filter"], queryFn: () => Promise.resolve({}) });

// ❌ Props drilling 3단계 이상
```

## 체크리스트

- [ ] API 데이터? → React Query
- [ ] 여러 컴포넌트 공유? → Jotai or Context
- [ ] 자주 변경? → Jotai
- [ ] 한 컴포넌트만? → useState
