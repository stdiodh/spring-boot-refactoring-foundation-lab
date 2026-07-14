# 리팩토링 구현 가이드

## 1. 해결할 문제

기존 코드는 동작하지만 Service 안에서 입력 정리, 검증, 저장, 응답 변환이 섞이면 수정 비용이 커집니다.
이번 실습은 동작을 유지하면서 작은 helper 경계를 만들고 서비스 검증과 예외 응답을 보강합니다.

## 2. 구현 흐름

1. Before 상태에서 `./gradlew test`를 실행합니다.
2. `PostService.kt`, `AuthService.kt`, `GlobalExceptionHandler.kt`의 책임을 읽습니다.
3. Service 안의 입력 정리, 조회, 검증, Entity 조작, 응답 변환을 작은 helper로 나눕니다.
4. 서비스 검증 실패를 `GlobalExceptionHandler`의 일관된 응답으로 연결합니다.
5. After 상태에서 `./gradlew test`를 다시 실행합니다.

feature 단위 package 이동은 후속 선택지로 남깁니다.

## 3. 핵심 코드

왜 이 코드를 보는지 먼저 정리합니다.
리팩토링은 외부 동작을 바꾸지 않아야 하므로 테스트가 기준이 됩니다.

```bash
./gradlew test
```

이 명령은 helper 추출과 검증/예외 보강 뒤에도 API 동작과 Service 규칙이 유지되는지 확인하는 문제를 해결합니다.
실패하면 마지막으로 나눈 책임과 변경된 예외 응답을 먼저 확인합니다.

## 4. 확인할 파일

- `src/main/kotlin/com/andi/rest_crud/service/PostService.kt`
- `src/main/kotlin/com/andi/rest_crud/service/AuthService.kt`
- `src/main/kotlin/com/andi/rest_crud/exception/GlobalExceptionHandler.kt`
- `src/test/kotlin/com/andi/rest_crud/service/PostServiceTest.kt`
- `src/test/kotlin/com/andi/rest_crud/service/AuthServiceTest.kt`

## 5. 한계와 다음 개선 방향

큰 구조 변경보다 작은 책임 분리와 반복 테스트를 우선합니다.
새 기능 추가가 필요하면 리팩토링 변경과 분리해 별도 작업으로 기록합니다.
