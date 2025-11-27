# Git 워크플로우 규칙

## 브랜치 전략

```
main          // PROD 배포
develop       // Staging
feature/*     // 기능 개발
hotfix/*      // 긴급 패치
```

| 브랜치      | 네이밍           | 생성 기준     | Merge 대상        |
| ----------- | ---------------- | ------------- | ----------------- |
| `main`      | `main`           | -             | -                 |
| `develop`   | `develop`        | `main`에서    | `main`            |
| `feature/*` | `feature/{name}` | `develop`에서 | `develop`         |
| `hotfix/*`  | `hotfix/{name}`  | `main`에서    | `main`, `develop` |

## 커밋 메시지

형식: `<type>(<scope>): <message>`

| Type       | 의미         | 예시                              |
| ---------- | ------------ | --------------------------------- |
| `feat`     | 새 기능      | `feat(auth): 로그인 API 연동`     |
| `fix`      | 버그 수정    | `fix(login): 토큰 만료 오류 수정` |
| `refactor` | 코드 개선    | `refactor(user): API 로직 분리`   |
| `docs`     | 문서         | `docs(readme): 설치 방법 추가`    |
| `chore`    | 빌드, 패키지 | `chore(deps): react 업데이트`     |

- Scope: kebab-case (선택)
- Message: 명령형, 소문자 시작, 마침표 없음

## PR 규칙

- 제목: `{type}: {change summary}`
- 최소 Reviewer: 2명
- Merge 조건: Approve 2회 + CI 통과
- Self merge: 금지

## Merge 전략

| 상황              | 전략         |
| ----------------- | ------------ |
| Feature → Develop | Merge        |
| Develop → Main    | Merge Commit |
| Hotfix → Main     | Merge Commit |

## 워크플로우

```bash
# 기능 개발
git checkout develop
git pull origin develop
git checkout -b feature/user-profile
git commit -m "feat(user-profile): 프로필 페이지 구현"
git push origin feature/user-profile
```

## 체크리스트

- [ ] 커밋 메시지 규칙 준수
- [ ] 브랜치명 올바름
- [ ] 테스트/Lint 통과
- [ ] 민감 정보 미포함
