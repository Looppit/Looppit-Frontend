# Git 워크플로우 규칙

## 브랜치

- `main`: 프로덕션, `develop`: 스테이징
- `feature/*`: develop에서 파생, develop으로 병합 (일반 merge)
- `hotfix/*`: main에서 파생, main·develop 모두 병합 (merge commit)
- develop→main: merge commit

## 커밋

- 형식 `<type>(scope): 작업 내용`
- type: feat / fix / refactor / docs / chore / style
- scope: kebab-case 선택, message: 한글, 명령형·소문자·마침표 없음

## PR

- 제목 `{type}: {summary}`, 리뷰어 1명 이상, self merge 금지
- Merge 전 테스트·CI 통과 및 최소 1회 승인 필요
- **PR 생성 시 `.github/pull_request_template.md` 읽어 형식에 맞춰 본문 작성**
  - 템플릿 구조 그대로 복사, 주석(`<!-- -->`)을 실제 내용으로 채움
  - "변경 유형" 체크박스는 해당 항목만 `[x]` 표시

## 기본 플로우

1. `git checkout develop && git pull`
2. `git checkout -b feature/{name}`
3. 작업 후 규칙에 맞춰 commit
4. `git push origin feature/{name}` → PR 생성

## 체크리스트

- [ ] 브랜치/커밋 규칙 준수
- [ ] 테스트·lint 통과
- [ ] 민감 정보 포함 여부 확인
