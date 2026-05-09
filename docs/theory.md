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

```kotlin
fun login(request: LoginRequest): TokenResponse {
    val email = normalizeEmail(request.email)
    val user = findUserByEmailOrThrowInvalidCredentials(email)
    verifyPassword(request.password, user.password)
    return createTokenResponse(user.email)
}
```

입력 정리, 조회, 검증, 응답 생성이 경계별로 나뉘어 있어서 흐름이 빨리 읽힙니다.

### `PostService`

```kotlin
fun create(request: PostCreateRequest): PostResponse {
    val command = validateCreateRequest(request)
    val savedPost = postRepository.save(buildPost(command))
    return toResponse(savedPost)
}
```

검증, 엔티티 생성, 저장, 응답 변환이 나뉘어 있습니다.
`validatePostFields(...)`는 DTO 검증을 지나온 값이라도 서비스에서 한 번 더 확인합니다.

### `GlobalExceptionHandler`

예외마다 응답을 조금씩 흩어 만들지 않고, `error(...)`를 통해 공통 모양을 유지합니다.

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

동작은 하지만 수정 지점이 한 메서드에 몰립니다.

### 왜 바꾸기 어려워지는가

- 이메일 정리 규칙이 바뀌면 같은 로직이 여러 곳에 퍼질 수 있습니다.
- 조회 실패와 비밀번호 실패가 한 메서드에 섞여 있어 디버깅 포인트가 흐려집니다.
- 테스트도 성공 시나리오만 확인하고 경계 자체는 놓치기 쉽습니다.

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

이렇게 나누면 읽는 속도도 빨라지고, 다음 정책 변경이 들어왔을 때 손대야 할 경계도 분명해집니다.

## 이번 실습에서 꼭 보면 좋은 포인트

- `AuthService`가 어떤 helper 경계로 나뉘었는지
- `PostService`가 왜 서비스 검증을 추가했는지
- `GlobalExceptionHandler`가 왜 공통 응답 함수를 두는지
- 테스트가 어떤 경계를 보호하는지
