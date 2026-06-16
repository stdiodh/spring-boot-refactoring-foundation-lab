# 리팩토링과 기초 보강 이론

## 1. 기능은 동작하는데 왜 읽기 어려울까?

기능이 늘어나면 Controller, Service, Repository, Exception, Test가 서로 다른 이유로 자주 바뀝니다.
파일 위치와 책임 경계가 흐려지면 작은 수정도 넓은 파일을 훑어야 합니다.

리팩토링은 새 기능을 붙이는 작업이 아니라, 기존 동작을 유지하면서 코드를 더 설명 가능한 상태로 정리하는 작업입니다.

## 2. 배경: Before를 고정하지 않으면 After를 믿기 어렵습니다

패키지를 옮기거나 책임을 나누면 package 선언, import, component scan, 테스트 경로가 함께 바뀝니다.
이때 테스트 없이 구조를 바꾸면 실패가 기존 문제인지, 이동 과정의 실수인지 구분하기 어렵습니다.

그래서 이번 시퀀스는 리팩토링 전 `./gradlew test`를 먼저 실행하고, 이동 후 같은 테스트가 통과하는지 확인합니다.

## 3. 선택한 방식

1. Before 상태에서 테스트를 실행합니다.
2. `post`, `auth`, `account/recovery`, `common` 같은 책임 단위로 파일을 읽습니다.
3. package 이동과 책임 분리를 한 번에 섞지 않습니다.
4. 이동 후 import, package 선언, API path, status code, response body를 확인합니다.
5. After 상태에서 같은 테스트를 다시 실행합니다.

## 4. 핵심 코드로 연결하기

실제 파일 경로는 아래와 같습니다.

- `src/main/kotlin/com/andi/rest_crud/service/PostService.kt`: 게시글 생성, 수정, 삭제 책임이 모인 Before 기준 Service입니다.
- `src/main/kotlin/com/andi/rest_crud/service/AuthService.kt`: 회원가입, 로그인, 현재 사용자 조회 흐름을 확인하는 Service입니다.
- `src/main/kotlin/com/andi/rest_crud/exception/GlobalExceptionHandler.kt`: 예외 응답 책임을 한곳에서 확인합니다.
- `src/test/kotlin/com/andi/rest_crud/service/PostServiceTest.kt`: 게시글 Service 동작 보존 기준입니다.
- `src/test/kotlin/com/andi/rest_crud/service/AuthServiceTest.kt`: 인증 Service 동작 보존 기준입니다.
- `src/test/kotlin/com/andi/rest_crud/support/TestFixtureFactory.kt`: 테스트 입력을 반복 없이 만드는 기준입니다.

왜 이 코드를 보는지 먼저 정리합니다.
리팩토링은 파일 이름을 바꾸는 일이 아니라, 변경 이유가 섞인 코드를 테스트로 지키며 나누는 일입니다.

```kotlin
@Test
fun `create는 요청 값을 저장하고 응답으로 돌려준다`() {
    val request = TestFixtureFactory.postCreateRequest()
    val savedPost = TestFixtureFactory.postEntity(id = 1L)
}
```

이 코드는 리팩토링 뒤에도 게시글 생성 응답 동작이 유지되어야 한다는 문제를 해결합니다.
패키지를 옮겨도 이 테스트가 통과해야 외부 동작을 유지했다고 볼 수 있습니다.

## 5. 실행/테스트 결과로 확인할 것

```bash
./gradlew test
```

리팩토링 전후 같은 명령을 실행합니다.
실패하면 package 이동 문제인지, 책임 분리 중 동작을 바꾼 문제인지 나누어 봅니다.

## 6. 한계와 다음 개선 방향

이번 시퀀스는 대규모 아키텍처 개편이 아닙니다.
테스트로 동작을 보존하면서 구조를 읽기 좋게 정리하는 기초 단계입니다.
다음 시퀀스에서는 정리된 책임 위에서 이벤트 발행과 소비 흐름을 다룹니다.
