# 리팩토링과 기초 보강 이론

## 1. 기능은 동작하는데 왜 읽기 어려울까?

기능이 늘어나면 Controller, Service, Repository, Exception, Test가 서로 다른 이유로 자주 바뀝니다.
파일 위치와 책임 경계가 흐려지면 작은 수정도 넓은 파일을 훑어야 합니다.

리팩토링은 새 기능을 붙이는 작업이 아니라, 기존 동작을 유지하면서 코드를 더 설명 가능한 상태로 정리하는 작업입니다.

## 2. 배경: Before를 고정하지 않으면 After를 믿기 어렵습니다

한 Service 메서드에서 입력 정리, 조회, 검증, 저장, 응답 변환을 함께 처리하면 작은 수정도 전체 흐름에 영향을 줍니다.
이때 테스트 없이 책임을 나누면 실패가 기존 문제인지, helper 추출 중 바뀐 동작인지 구분하기 어렵습니다.

그래서 이번 시퀀스는 리팩토링 전 `./gradlew test`를 먼저 실행하고, 책임 분리와 검증/예외 보강 후 같은 테스트가 통과하는지 확인합니다.

## 3. 선택한 방식

1. Before 상태에서 테스트를 실행합니다.
2. `AuthService`의 입력 정리, 조회, 비밀번호 검증, token 응답 책임을 구분합니다.
3. `PostService`의 필드 검증, Entity 조작, 응답 변환 책임을 구분합니다.
4. 서비스 검증 실패가 `GlobalExceptionHandler`의 일관된 응답으로 이어지는지 확인합니다.
5. After 상태에서 같은 테스트를 다시 실행합니다.

feature-based package 이동은 이 테스트 안전망을 만든 뒤 검토할 후속 선택지이며 현재 답안의 직접 범위가 아닙니다.

## 4. 핵심 코드로 연결하기

실제 파일 경로는 아래와 같습니다.

- `src/main/kotlin/com/andi/rest_crud/service/PostService.kt`: 필드 검증, Entity 조작, 응답 변환 helper 경계를 확인합니다.
- `src/main/kotlin/com/andi/rest_crud/service/AuthService.kt`: 입력 정리, 사용자 조회, 비밀번호 검증, token 응답 경계를 확인합니다.
- `src/main/kotlin/com/andi/rest_crud/exception/GlobalExceptionHandler.kt`: 서비스 검증 예외를 일관된 실패 응답으로 변환합니다.
- `src/test/kotlin/com/andi/rest_crud/service/PostServiceTest.kt`: 게시글 Service 동작 보존 기준입니다.
- `src/test/kotlin/com/andi/rest_crud/service/AuthServiceTest.kt`: 인증 Service 동작 보존 기준입니다.
- `src/test/kotlin/com/andi/rest_crud/support/TestFixtureFactory.kt`: 테스트 입력을 반복 없이 만드는 기준입니다.

왜 이 코드를 보는지 먼저 정리합니다.
리팩토링은 helper 수를 늘리는 일이 아니라, 변경 이유가 섞인 코드를 테스트로 지키며 책임 단위로 나누는 일입니다.

```kotlin
@Test
fun `create는 현재 로그인 사용자를 작성자로 저장한다`() {
    val request = TestFixtureFactory.postCreateRequest()
    val savedPost = TestFixtureFactory.postEntity(id = 1L, author = "owner@example.com")
}
```

이 코드는 리팩토링 뒤에도 게시글 생성 응답 동작이 유지되어야 한다는 문제를 해결합니다.
helper를 추출하고 서비스 검증을 보강한 뒤에도 이 테스트가 통과해야 외부 동작을 유지했다고 볼 수 있습니다.

## 5. 실행/테스트 결과로 확인할 것

```bash
./gradlew test
```

리팩토링 전후 같은 명령을 실행합니다.
실패하면 helper 추출 문제인지, 검증/예외 계약을 바꾼 문제인지 나누어 봅니다.

## 6. 한계와 다음 개선 방향

이번 시퀀스는 대규모 아키텍처 개편이 아닙니다.
테스트로 동작을 보존하면서 구조를 읽기 좋게 정리하는 기초 단계입니다.
다음 시퀀스에서는 정리된 책임 위에서 이벤트 발행과 소비 흐름을 다룹니다.
