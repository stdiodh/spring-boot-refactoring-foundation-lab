# Spring Boot Refactoring Foundation Lab

이 레포는 A&I 백엔드 커리큘럼의 `11. 리팩토링과 기초 보강` 시퀀스를 담는 토픽 레포입니다.
`main`은 가이드 브랜치이고, 학생 실습은 `11-implementation`에서 시작합니다.

## 이 레포에서 배우는 것

- 기능이 늘어난 Service에서 책임이 섞인 부분 찾기
- 입력 정리, 조회, 검증, 응답 생성을 helper로 나누기
- 서비스 검증 실패를 일관된 예외 응답으로 연결하기
- 테스트로 Before 동작을 고정하고 After 동작을 비교하기
- feature-based package 이동과 현재 리팩토링 범위를 구분하기

## 시작 방법

기존 CRUD, 인증, 계정 복구 코드와 테스트는 출발점으로 제공됩니다. 이번 시퀀스의 직접 범위는 Service helper 추출, 서비스 검증, 예외 응답, 테스트 보강이며 feature-based package 이동은 후속 선택지입니다.

```bash
git clone https://github.com/stdiodh/spring-boot-refactoring-foundation-lab.git
cd spring-boot-refactoring-foundation-lab
git checkout 11-implementation
```

## 실습 브랜치

| 용도 | 브랜치 |
| --- | --- |
| 가이드 | `main` |
| 학생 시작 | `11-implementation` |
| 참고 정답 | `11-answer` |

## 실행 방법

```bash
docker compose up -d
./gradlew bootRun
```

## 테스트 방법

```bash
./gradlew test
```

리팩토링 전후에 같은 명령을 각각 실행합니다.

테스트가 확인하는 것:

- 리팩토링 전 현재 API 동작을 고정합니다.
- Service helper 추출과 예외 보강 뒤에도 같은 테스트가 통과하는지 확인합니다.
- feature-based 패키지 이동은 현재 답안에 포함되지 않은 후속 선택지입니다.
- 책임 분리와 검증 보강이 API path, status code, response body를 의도치 않게 바꾸지 않았는지 확인합니다.

실패하면 먼저 볼 것:

- 실패한 테스트가 helper 추출 문제인지 검증/예외 계약을 바꾼 문제인지 구분합니다.
- `AuthService`, `PostService`, `GlobalExceptionHandler` 중 실패 흐름의 책임 파일을 먼저 확인합니다.

완료 기준:

- 리팩토링 전후 `./gradlew test`가 모두 통과합니다.
- Service 책임 분리와 API 동작 보존을 테스트 결과로 설명할 수 있습니다.

## 정답과 비교하는 방법

실습 중 막혔거나 완료 후 확인이 필요할 때만 참고 정답 브랜치와 비교합니다.

```bash
git fetch origin
git diff 11-implementation..11-answer
```

## Visual Lab

`main` 가이드 브랜치에는 리팩토링 흐름을 훑어보는 Visual Lab 진입점이 있습니다.
이 페이지는 정답 비교 페이지가 아니라 리팩토링 전후 확인 순서를 이해하기 위한 정적 학습 화면입니다.

```text
docs/visual-lab/index.html
```

## 문서 안내

- [이론 정리](./docs/theory.md)
- [구현 안내](./docs/implementation.md)
- [체크리스트](./docs/checklist.md)
- [Visual Lab](./docs/visual-lab/index.html)
