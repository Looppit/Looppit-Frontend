# CLAUDE.md

Claude Code 가이드

## 규칙 폴더 구조

### `.aiassistant/rules/` - 프로젝트 특화 규칙

프로젝트의 구체적인 코딩 가이드라인과 실행 가능한 규칙들

### `.cursor/rules/` - 일반적인 코드 품질 원칙

범용적인 소프트웨어 설계 원칙 (응집도, 가독성, 결합도, 예측가능성)

- Cursor가 자동으로 적용 (`alwaysApply: true`)
- 프로젝트 독립적인 설계 철학

## 필수 규칙 (항상 확인)

- `.aiassistant/rules/naming-conventions.md` - 네이밍 규칙
- `.aiassistant/rules/code-style.md` - 코드 스타일
- `.aiassistant/rules/project-structure.md` - 프로젝트 구조
- `.cursor/rules/` - 일반적인 코드 품질 원칙 (자동 적용)

## 선택 규칙 (관련 작업 시)

- `.aiassistant/rules/api-data-handling.md` - API 작업 시
- `.aiassistant/rules/state-management.md` - 상태 관리 작업 시
- `.aiassistant/rules/git-workflow.md` - Git 작업 시
- `.aiassistant/rules/import-rules.md` - import 관련 이슈 시

## 작업 흐름

1. 요구 분석 → 변경 대상 식별
2. 코드 구조 분석 (`read_file`, `codebase_search`)
3. **필수 규칙 검토** (항상)
4. **선택 규칙 검토** (관련 작업 시)
5. 구현 (규칙 준수, 기존 패턴 일관성)
6. 검증 (`read_lints`, 규칙 점검)

## 필수 확인

- [ ] 내부 구조 분석 완료
- [ ] 상수 `UPPER_SNAKE_CASE` 확인
- [ ] 함수/파일 길이 제한 준수 (함수 ≤50줄, 파일 ≤250줄)

## 프로젝트 구조

- `app/`(라우팅), `domains/`(비즈니스), `shared/`(공용)
- 규칙: `.aiassistant/rules/` (프로젝트 특화), `.cursor/rules/` (일반 원칙)

## 핵심 Rules

- 구조: FSD Lite, 네이밍: 폴더·컴포넌트=kebab, 함수·변수=camel, 상수=UPPER_SNAKE_CASE
- 코드: 선언적 패턴, 비즈니스 로직은 hook 분리, 유틸 함수는 `{feature}.utils.ts`로 분리
- 상태·API: React Query(API), Jotai(공유), Context(환경), Axios+Zod+React Query
- Git: 커밋 `type(scope): message`, 브랜치 `feature/*`/`hotfix/*`, PR 1인 승인

## 프로젝트 개요

Next.js 16 · TypeScript · React 19 · Tailwind CSS 4 · App Router

**명령어**: `npm run dev` / `npm run build` / `npm run lint`
