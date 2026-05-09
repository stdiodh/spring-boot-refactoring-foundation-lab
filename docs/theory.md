# 리팩토링과 기초 보강

이번 실습은 새 기술을 더하는 대신, 지금까지 만든 코드를 다시 읽고 구조를 다듬어서 나중에 다시 봐도 설명 가능한 상태로 만드는 과정입니다.

## 먼저 이것만 기억해도 됩니다

- 리팩토링은 기능을 바꾸는 일이 아니라 구조를 더 읽기 좋게 만드는 일입니다.
- 검증, 예외 처리, 테스트는 서로 연결된 장치입니다.
- 좋은 문서는 코드를 다시 읽는 시간을 줄여줍니다.

## 이 주제를 왜 배우는가

기능이 늘어나고 인증, 예외 처리, 테스트, 배포까지 들어오면 그다음부터는 새 기능 추가보다 기존 코드를 다시 읽고 바꾸는 시간이 더 많아집니다.
이번 실습은 바로 그 지점에서 필요한 감각을 다룹니다.

## 기초 개념

### 리팩토링

기능은 그대로 두고 코드를 더 이해하기 쉬운 구조로 정리하는 작업입니다.
정리의 기준은 예쁘게 보이는 코드가 아니라, 다음 변경이 들어왔을 때 어디를 손대야 하는지 빨리 보이는 코드입니다.

### 책임 분리

하나의 메서드가 입력 정리, 조회, 검증, 저장, 응답 변환을 모두 들고 있으면 읽는 속도가 느려집니다.
책임을 나누면 코드는 조금 더 길어질 수 있지만, 흐름은 오히려 선명해집니다.

### 서비스 레벨 검증

컨트롤러에서 DTO 검증을 했더라도, 서비스는 핵심 비즈니스 흐름을 한 번 더 방어할 수 있습니다.
특히 내부 호출이나 테스트는 컨트롤러 검증을 우회할 수 있기 때문에 서비스 검증이 의미를 가집니다.

### 리팩토링 안정성

리팩토링은 구조를 많이 건드리기 때문에, 테스트가 없으면 기능이 깨졌는지 놓치기 쉽습니다.
테스트는 리팩토링 후에도 같은 동작이 유지되는지 확인하는 안전장치입니다.

## 현재 코드 흐름

### `AuthService`

현재 참고 구현 구조는 `login()` 안에서 아래 순서를 드러냅니다.

```kotlin
fun login(request: LoginRequest): TokenResponse {
    val email = normalizeEmail(request.email)
    val user = findUserByEmailOrThrowInvalidCredentials(email)
    verifyPassword(request.password, user.password)
    return createTokenResponse(user.email)
}
```

이 흐름은 입력 정리, 조회, 검증, 응답 생성이 helper 메서드로 나뉘어 있어서 어디서 무엇을 하는지 빠르게 읽을 수 있습니다.

### `PostService`

게시글 저장과 수정도 검증, 엔티티 조작, 응답 변환이 나뉘어 있습니다.

```kotlin
fun create(request: PostCreateRequest): PostResponse {
    val command = validateCreateRequest(request)
    val savedPost = postRepository.save(buildPost(command))
    return toResponse(savedPost)
}
```

특히 `validatePostFields(...)`는 공백 문자열을 서비스에서 다시 막습니다.

### `GlobalExceptionHandler`

실패 응답도 예외마다 조금씩 직접 만들지 않고, `error(...)`를 통해 한 번 모아서 생성합니다.

## 실무 확장 개념

이번 시퀀스의 실무 확장 개념은 변경에 강한 코드 기준입니다.

### 문제 코드

```kotlin
fun login(request: LoginRequest): TokenResponse {
    val email = request.email.trim().lowercase()
    val user = userRepository.findByEmail(email)
        .orElseThrow { InvalidCredentialsException() }

    if (!passwordEncoder.matches(request.password, user.password)) {
        throw InvalidCredentialsException()
    }

    return TokenResponse(jwtTokenProvider.createToken(user.email))
}
```

이 코드는 동작은 하지만, 이메일 정리 규칙을 바꾸거나 예외 정책을 바꾸거나 토큰 응답을 확장하려고 할 때 수정 지점이 한 메서드에 몰립니다.

### 내부에서 어떤 문제가 커지는가

- 입력 정리 규칙이 바뀌면 `login()`과 `signUp()`을 같이 손봐야 할 수 있습니다.
- 조회 실패와 비밀번호 실패가 한 메서드에 섞여 있어 디버깅 포인트가 흐려집니다.
- 테스트도 “로그인 성공”만 보면 되고, 입력 정규화나 검증 경계를 놓치기 쉽습니다.

### 정리된 코드 예시

```kotlin
private fun normalizeEmail(email: String): String = email.trim().lowercase()

private fun findUserByEmailOrThrowInvalidCredentials(email: String): User {
    return userRepository.findByEmail(email)
        .orElseThrow { InvalidCredentialsException() }
}

private fun verifyPassword(rawPassword: String, encodedPassword: String) {
    if (!passwordEncoder.matches(rawPassword, encodedPassword)) {
        throw InvalidCredentialsException()
    }
}
```

이렇게 나누면 다음 사람이 코드를 읽을 때도 흐름을 더 빨리 따라갈 수 있고, 검증 규칙이나 예외 정책을 바꿀 때 수정 지점도 더 명확해집니다.

## 이번 실습에서 꼭 보면 좋은 포인트

- `AuthService`가 어떤 경계로 나뉘는지
- `PostService`가 DTO 검증 외에 왜 서비스 검증을 두는지
- 예외 응답 구조를 공통화하면 무엇이 단순해지는지
- 테스트가 어떤 리팩토링 포인트를 보호하는지

## 오늘 실습에서 꼭 기억할 것

- 리팩토링은 코드 미화가 아니라 변경 비용을 낮추는 작업입니다.
- 서비스 레벨 검증은 비즈니스 흐름을 지키는 마지막 방어선이 될 수 있습니다.
- 테스트가 있어야 리팩토링을 더 자신 있게 진행할 수 있습니다.
