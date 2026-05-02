# 리팩토링과 기초 보강

이 실습은 지금까지 만든 기능을 다시 읽고, 더 설명하기 쉽고 더 바꾸기 쉬운 구조로 정리해보는 단계입니다.

## 이 레포에서 다루는 것

- `AuthService`의 입력 정리, 조회, 검증, 토큰 발급 책임 분리
- `PostService`의 서비스 레벨 검증 보강
- `GlobalExceptionHandler`의 응답 일관성 보강
- 테스트 보강으로 리팩토링 안정성 확인
- README와 문서를 다시 보기 쉬운 형태로 정리

## 문서

- [이론 문서](./docs/theory.md)
- [구현 문서](./docs/implementation.md)
- [정답 가이드](./docs/answer-guide.md)
- [체크리스트](./docs/checklist.md)
- [제공 자산 정리](./docs/assets.md)

## 핵심 파일

- [`src/main/kotlin/com/andi/rest_crud/service/PostService.kt`](./src/main/kotlin/com/andi/rest_crud/service/PostService.kt)
- [`src/main/kotlin/com/andi/rest_crud/service/AuthService.kt`](./src/main/kotlin/com/andi/rest_crud/service/AuthService.kt)
- [`src/main/kotlin/com/andi/rest_crud/exception/GlobalExceptionHandler.kt`](./src/main/kotlin/com/andi/rest_crud/exception/GlobalExceptionHandler.kt)
- [`src/test/kotlin/com/andi/rest_crud/service/PostServiceTest.kt`](./src/test/kotlin/com/andi/rest_crud/service/PostServiceTest.kt)
- [`src/test/kotlin/com/andi/rest_crud/service/AuthServiceTest.kt`](./src/test/kotlin/com/andi/rest_crud/service/AuthServiceTest.kt)
- [`README.md`](./README.md)
