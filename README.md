# 리팩토링과 기초 보강

이 실습은 지금까지 만든 기능을 다시 읽고, 더 설명하기 쉽고 더 바꾸기 쉬운 구조로 정리해보는 단계입니다.

이 브랜치는 `11-implementation` starter입니다.
핵심 파일에는 TODO가 들어 있고, 실습 중에는 README, 이론, 구현 가이드, 체크리스트를 기준으로 진행합니다.

## 이번 시퀀스에서 다루는 것

- `AuthService`와 `PostService`의 책임 분리
- 서비스 레벨 검증 보강
- 예외 응답 구조 정리
- 리팩토링 안정성을 확인하는 테스트 추가
- README와 문서 보강

## 문서

- [이론 문서](./docs/theory.md)
- [구현 문서](./docs/implementation.md)
- [체크리스트](./docs/checklist.md)
- [제공 자산 정리](./docs/assets.md)

## 실습에서 직접 구현하는 핵심 파일

- [`src/main/kotlin/com/andi/rest_crud/service/PostService.kt`](./src/main/kotlin/com/andi/rest_crud/service/PostService.kt)
- [`src/main/kotlin/com/andi/rest_crud/service/AuthService.kt`](./src/main/kotlin/com/andi/rest_crud/service/AuthService.kt)
- [`src/main/kotlin/com/andi/rest_crud/exception/GlobalExceptionHandler.kt`](./src/main/kotlin/com/andi/rest_crud/exception/GlobalExceptionHandler.kt)
- [`src/test/kotlin/com/andi/rest_crud/service/PostServiceTest.kt`](./src/test/kotlin/com/andi/rest_crud/service/PostServiceTest.kt)
- [`src/test/kotlin/com/andi/rest_crud/service/AuthServiceTest.kt`](./src/test/kotlin/com/andi/rest_crud/service/AuthServiceTest.kt)
- [`README.md`](./README.md)

## 구현 흐름 요약

1. 책임이 섞인 메서드를 찾습니다.
2. 입력 정리, 조회, 검증, 응답 생성 경계를 나눕니다.
3. 서비스 레벨 검증과 예외 응답을 보강합니다.
4. 테스트를 추가해 리팩토링 전후 기능이 유지되는지 확인합니다.
5. README를 다시 정리합니다.
