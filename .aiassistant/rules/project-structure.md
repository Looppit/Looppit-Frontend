# 프로젝트 구조 규칙

## 개요

- FSD Lite 구조를 따르며 라우팅은 `app/`, 비즈니스 로직은 `domains/`, 공용 코드는 `shared/`에 둔다.
- 기능 단위로 파일을 묶고 도메인 외부에서 내부 구현에 의존하지 않도록 계층을 분리한다.

## 기본 구조

```text
app/              # 라우팅 및 layout
domains/          # 비즈니스 로직
  {feature}/
shared/           # 공용 코드
  api/
  ui/
  hooks/
  utils/
```

## Import

- 모든 모듈은 `@/` 기반 절대 경로를 사용한다.
- 같은 도메인 내부는 상대경로 사용 (`import-rules.md` 참고)

## 주의

- `app/`에는 라우팅·layout만 두고 비즈니스 로직은 `domains/`에 배치한다.
- `shared/`에는 진짜 범용 코드만 저장한다.
- 도메인 간 직접 의존은 피하고 `shared/`를 통해 공유한다.

## 체크리스트

- [ ] 라우팅, 도메인, 공용 레이어가 FSD Lite 구조를 따른다.
- [ ] 도메인별로 API/Hook/Schema/Types 파일을 분리했다.
- [ ] import 경로는 `@/` 절대 경로로 통일했다.
- [ ] `app/`에는 화면 구성 요소만, 비즈니스 로직은 `domains/`에만 존재한다.
