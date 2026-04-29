# 리팩토링과 기초 보강

> 지금까지 만든 기능을 다시 읽고, 구조를 더 읽기 쉽고 점검하기 쉬운 형태로 다듬어보는 실습입니다.

> 이번 시퀀스 한 줄 요약  
> 이번 실습은 새 기능을 늘리는 대신 `PostService`, `AuthService`, 예외 처리, 테스트, README를 함께 정리해서 “작동하는 코드”를 “설명 가능한 코드”로 바꾸는 과정입니다.

## 이 레포에서 다루는 것

- `PostService`의 책임 분리와 서비스 레벨 검증
- `AuthService`의 입력 정리, 조회, 검증, 토큰 발급 책임 분리
- `GlobalExceptionHandler`의 응답 일관성 보강
- 테스트 보강으로 리팩토링 안정성 확인
- README와 문서를 다시 보기 쉬운 형태로 정리

## 문서

- [이론 문서](./docs/theory.md)
- [구현 문서](./docs/implementation.md)
- [정답 가이드](./docs/answer-guide.md)
- [체크리스트](./docs/checklist.md)
- [제공 자산 정리](./docs/assets.md)

## 학생이 직접 구현하는 핵심 파일

- [`src/main/kotlin/com/andi/rest_crud/service/PostService.kt`](./src/main/kotlin/com/andi/rest_crud/service/PostService.kt)
- [`src/main/kotlin/com/andi/rest_crud/service/AuthService.kt`](./src/main/kotlin/com/andi/rest_crud/service/AuthService.kt)
- [`src/main/kotlin/com/andi/rest_crud/exception/GlobalExceptionHandler.kt`](./src/main/kotlin/com/andi/rest_crud/exception/GlobalExceptionHandler.kt)
- [`src/test/kotlin/com/andi/rest_crud/service/PostServiceTest.kt`](./src/test/kotlin/com/andi/rest_crud/service/PostServiceTest.kt)
- [`src/test/kotlin/com/andi/rest_crud/service/AuthServiceTest.kt`](./src/test/kotlin/com/andi/rest_crud/service/AuthServiceTest.kt)
- [`README.md`](./README.md)

## 구현 흐름 요약

1. 개선 대상 Service를 고릅니다.
2. 역할이 섞인 부분을 찾습니다.
3. Validation 또는 Exception Handling을 보강합니다.
4. 테스트를 추가합니다.
5. README와 문서를 보강합니다.

## 실행 방법

```bash
./gradlew test
./gradlew bootRun
```

## 이번 시퀀스에서 특히 봐야 할 것

- `AuthService`가 왜 더 읽기 쉬워졌는지
- `PostService`가 왜 DTO 검증 외에 서비스 레벨 검증을 한 번 더 갖는지
- 예외 응답 구조와 테스트가 왜 함께 움직여야 하는지
