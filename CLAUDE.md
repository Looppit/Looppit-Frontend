# CLAUDE.md

## 필수 레퍼런스

`.aiassistant/rules/` 기준:

- `conventions/naming-conventions.md`
- `conventions/code-style.md`
- `architecture/project-structure.md`

## 선택 레퍼런스

`.aiassistant/rules/` 기준:

- `architecture/api-data-handling.md`
- `architecture/state-management.md`
- `workflow/git-workflow.md`
- `conventions/import-rules.md`

## 작업 순서

1. 요구·범위 파악
2. 구조 분석(`read_file`, `codebase_search`)
3. 필수 규칙 확인
4. 필요 시 선택 규칙 추가 확인
5. 구현: 기존 패턴·규칙 유지
6. `read_lints` 등으로 검증

## 체크리스트

- [ ] 프로젝트 내부 구조를 `read_file`, `codebase_search`로 파악했는가?
- [ ] 모든 상수가 `UPPER_SNAKE_CASE` 형식인가? (예: `API_BASE_URL`, `MAX_RETRY_COUNT`)
- [ ] 함수가 50줄 이하인가? (초과 시 분리 검토)
- [ ] 파일이 250줄 이하인가? (초과 시 모듈 분리 검토)

## 스택·명령

- Next.js 16, React 19, TypeScript, Tailwind 4, App Router
- `npm run dev`, `npm run build`, `npm run lint`
