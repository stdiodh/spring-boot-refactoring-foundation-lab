# 리팩토링과 기초 보강

> 지금까지 만든 기능을 다시 읽고, 구조를 더 읽기 쉽고 점검하기 쉬운 형태로 다듬어보는 실습입니다.

> 이번 시퀀스 한 줄 요약  
> 이번 실습은 `PostService`, `AuthService`, 예외 처리, 테스트, README를 함께 정리해서 “작동하는 코드”를 “설명 가능한 코드”로 바꾸는 과정입니다.

이 브랜치는 `11-implementation` starter입니다.  
핵심 파일에는 TODO가 들어 있고, 정답 비교는 `11-answer` 브랜치에서 합니다.

## 문서

- [이론 문서](./docs/theory.md)
- [구현 문서](./docs/implementation.md)
- [정답 비교 가이드](./docs/answer-guide.md)
- [체크리스트](./docs/checklist.md)
- [제공 자산 정리](./docs/assets.md)

## 학생이 직접 구현하는 핵심 파일

- [`src/main/kotlin/com/andi/rest_crud/service/PostService.kt`](./src/main/kotlin/com/andi/rest_crud/service/PostService.kt)
- [`src/main/kotlin/com/andi/rest_crud/service/AuthService.kt`](./src/main/kotlin/com/andi/rest_crud/service/AuthService.kt)
- [`src/main/kotlin/com/andi/rest_crud/exception/GlobalExceptionHandler.kt`](./src/main/kotlin/com/andi/rest_crud/exception/GlobalExceptionHandler.kt)
- [`src/test/kotlin/com/andi/rest_crud/service/PostServiceTest.kt`](./src/test/kotlin/com/andi/rest_crud/service/PostServiceTest.kt)
- [`src/test/kotlin/com/andi/rest_crud/service/AuthServiceTest.kt`](./src/test/kotlin/com/andi/rest_crud/service/AuthServiceTest.kt)
- [`README.md`](./README.md)
