# 이론 정리

## 1. 왜 이 개념이 필요한가

기능이 늘어나면 기존 코드를 다시 읽고 바꾸는 시간이 늘어납니다.
리팩토링은 동작을 바꾸지 않고 다음 변경을 더 안전하게 만드는 정리 작업입니다.

이번 시퀀스는 책임 분리, 서비스 레벨 검증, 예외 응답, 테스트, 문서화를 함께 다룹니다.

## 2. 기존 방식의 한계

하나의 메서드가 입력 정리, 조회, 검증, 저장, 응답 변환을 모두 들고 있으면 수정 지점이 흐려집니다.
테스트가 부족하면 구조를 바꾼 뒤 기능이 그대로 유지되는지도 확신하기 어렵습니다.

## 3. 이번 시퀀스에서 선택한 접근

- `AuthService`는 이메일 정리, 사용자 조회, 비밀번호 검증, 토큰 응답 생성을 나눕니다.
- `PostService`는 게시글 필드 검증, 엔티티 조작, 응답 변환을 나눕니다.
- `GlobalExceptionHandler`는 실패 응답 구조를 일관되게 만듭니다.
- 테스트는 리팩토링 후에도 같은 동작이 유지되는지 확인합니다.

## 4. 핵심 개념

### 리팩토링

기능은 그대로 두고 코드를 더 이해하기 쉬운 구조로 정리하는 작업입니다.
기준은 보기 좋은 코드가 아니라 다음 변경 때 수정 지점이 빨리 보이는 코드입니다.

### 책임 분리

입력 정리, 조회, 검증, 저장, 응답 변환을 한 메서드에 모두 넣지 않고 역할별로 나눕니다.

### 서비스 레벨 검증

컨트롤러 DTO 검증을 했더라도 서비스는 핵심 비즈니스 흐름을 한 번 더 방어할 수 있습니다.
내부 호출이나 테스트는 컨트롤러 검증을 우회할 수 있기 때문입니다.

### 리팩토링 안정성

테스트는 리팩토링 후에도 같은 동작이 유지되는지 확인하는 안전장치입니다.

## 5. 짧은 예제와 해설

```kotlin
fun login(request: LoginRequest): TokenResponse {
    val email = normalizeEmail(request.email)
    val user = findUserByEmailOrThrowInvalidCredentials(email)
    verifyPassword(request.password, user.password)
    return createTokenResponse(user.email)
}
```

이 흐름은 입력 정리, 조회, 검증, 응답 생성을 분리해 읽기 수월하게 만듭니다.

```kotlin
fun create(request: PostCreateRequest): PostResponse {
    val command = validateCreateRequest(request)
    val savedPost = postRepository.save(buildPost(command))
    return toResponse(savedPost)
}
```

게시글 생성 흐름도 검증, 엔티티 생성, 저장, 응답 변환을 나눕니다.

## 6. 다음 구현으로 연결되는 지점

리팩토링은 코드 정리에서 끝나지 않습니다.
예외 응답과 테스트, README까지 함께 정리해야 다음 변경에서 같은 기준을 유지할 수 있습니다.

<details>
<summary>멘토용 설명 포인트</summary>

- helper 메서드가 많아지는 것 자체가 목표는 아니며, 책임 경계가 선명해지는지가 기준입니다.
- 서비스 검증은 DTO 검증을 대체하는 것이 아니라 핵심 비즈니스 흐름을 한 번 더 방어하는 장치입니다.
- answer 브랜치 비교 시 코드 길이보다 수정 지점이 빨리 보이는지 질문합니다.

</details>
