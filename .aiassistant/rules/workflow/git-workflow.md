---
visibility: human+ai
origin: assistant
---

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
- PR 본문은 `pull_request_template.md` 형식에 맞춰 작성
  - PR 생성 전 반드시 `.github/pull_request_template.md` 파일을 읽어서 그 내용과 형식을 사용
  - 파일이 존재하지 않으면 템플릿 형식에 맞춰 자유롭게 작성

## 기본 플로우

1. `git checkout develop && git pull`
2. `git checkout -b feature/{name}`
3. 작업 후 규칙에 맞춰 commit
4. `git push origin feature/{name}` → PR 생성

## 체크리스트

- [ ] 브랜치명이 `feature/*`, `hotfix/*` 형식을 따르는가?
- [ ] 커밋 메시지가 `<type>(scope): 작업 내용` 형식인가?
- [ ] 커밋 type이 `feat`/`fix`/`refactor`/`docs`/`chore`/`style` 중 하나인가?
- [ ] 커밋 메시지가 한글이고 명령형·소문자·마침표 없이 작성되었는가?
- [ ] PR 제목이 `{type}: {summary}` 형식이고 본문이 템플릿 형식에 맞춰 작성되었는가?
- [ ] 테스트와 lint가 통과했는가?
- [ ] 민감 정보가 포함되지 않았는가?
