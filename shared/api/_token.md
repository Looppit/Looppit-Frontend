# Token 관리

## 기본 토큰 관리

- 백엔드에 로그인 요청을 통해 `accessToken`과 `refreshToken`, 총 2가지의 토큰을 받아오게 됩니다.

1. `accessToken`

- client memory에 저장되어 관리됩니다.
- 로그인 요청 및 401 에러를 통한 토큰 재요청 시 받아오며, server action에서 받은 응답 값을 클라이언트 모듈(jotai)로 넘겨주어 전역적으로 관리합니다.

2. `refreshToken`

- next.js server cookie에 저장되어 관리됩니다.
- 로그인 요청을 통해 받아오며, server action에서 받은 응답을 바로 cookie에 저장합니다.
- proxy를 통한 redirect는 `refreshToken`의 여부로 판별합니다.

## 인증 만료 시 재요청 로직

### 401 에러 발생 시

- axiosInterceptor에서 401에러에 해당하는 경우, 전반적인 에러 처리를 담당하는 `api.error.ts` 파일에서 재인증 로직을 관리하는 `api.refresh.ts`파일에서 `handleUnAuthorizedError` 메서드를 호출합니다.
- `handleUnAuthorizedError` 는 `RefreshTokenHandler` 클래스에 속한 메서드입니다.

### RefreshTokenHandler

401에러가 발생할 경우, 리프레시 토큰으로 `accessToken`을 재발급하기 위한 전반적인 과정을 관리합니다.

- 현재 토큰 재발급 상태일 경우 401에러에 해당하는 요청들을 queue에 넣어관리합니다.
- 토큰 재발급 성공시 중지된 요청들을 재실행합니다.
- 토큰 재발급 실패시, 현재 유효하지 않은 토큰을 가지고 있는 것이므로 토큰들을 모두 정리합니다.
