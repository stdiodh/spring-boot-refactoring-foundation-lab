# 구현 가이드

이 문서는 `11-answer` 브랜치의 참고 구현을 기준으로 설명합니다.
starter 브랜치에서 먼저 정리한 뒤, 책임 경계와 테스트 보강을 비교할 때 사용합니다.

## 1. 구현 전에 확인할 문제

리팩토링은 새 기능을 붙이는 작업이 아닙니다.
기존 흐름을 더 명확하게 만들고, 테스트로 동작이 유지되는지 확인하는 작업입니다.

## 2. 구현 순서

1. `AuthService`와 `PostService`에서 책임이 섞인 부분을 찾습니다.
2. 입력 정리, 조회, 검증, 응답 생성을 역할별로 나눕니다.
3. 서비스 레벨 검증과 예외 응답을 보강합니다.
4. 테스트를 추가해 리팩토링 안정성을 확인합니다.
5. README와 문서에 변경 의도를 남깁니다.

## 3. Step 1. AuthService 책임 분리

### 해야 할 일

```kotlin
fun login(request: LoginRequest): TokenResponse {
    val email = normalizeEmail(request.email)
    val user = findUserByEmailOrThrowInvalidCredentials(email)
    verifyPassword(request.password, user.password)
    return createTokenResponse(user.email)
}
```

### 왜 이 작업을 하는가

로그인 흐름을 입력 정리, 조회, 검증, 응답 생성으로 나누면 수정 지점이 더 잘 보입니다.

### 확인 방법

이메일 정규화, 사용자 조회 실패, 비밀번호 불일치, 토큰 응답 생성이 각각 어떤 경계에서 처리되는지 확인합니다.

## 4. Step 2. PostService 검증 보강

### 해야 할 일

```kotlin
fun create(request: PostCreateRequest, authorEmail: String): PostResponse {
    val command = validateCreateRequest(request, authorEmail)
    val savedPost = postRepository.save(buildPost(command))
    return toResponse(savedPost)
}
```

### 왜 이 작업을 하는가

DTO 검증을 통과한 값이라도 서비스 내부에서는 핵심 비즈니스 규칙을 다시 방어할 수 있어야 합니다.
서비스 검증을 분리하면 create/update 흐름에서 같은 기준을 재사용하기 쉽습니다.

### 확인 방법

공백 문자열과 잘못된 입력이 의도한 예외로 이어지는지 확인합니다.

## 5. Step 3. 예외 응답 정리

### 해야 할 일

`GlobalExceptionHandler`에서 새 예외와 공통 응답 생성 흐름을 정리합니다.

### 왜 이 작업을 하는가

실패 응답이 흩어지면 클라이언트와 테스트가 기대하는 응답 형식을 맞추기 어렵습니다.

### 확인 방법

새 예외가 일관된 error response로 변환되는지 확인합니다.

## 6. Step 4. 테스트와 문서 보강

### 해야 할 일

`PostServiceTest`와 `AuthServiceTest`에 리팩토링 경계를 확인하는 테스트를 추가합니다.
README에는 이번 시퀀스에서 무엇을 정리했는지 남깁니다.

### 왜 이 작업을 하는가

테스트는 리팩토링 후 동작 유지 여부를 확인하고, 문서는 나중에 코드를 다시 읽는 시간을 줄입니다.

### 확인 방법

```bash
./gradlew test
```

## 마지막 확인

- helper 메서드가 의미 있는 책임 경계를 만드는지 확인합니다.
- 서비스 검증과 예외 응답이 함께 움직이는지 확인합니다.
- 테스트가 리팩토링 포인트를 직접 보호하는지 확인합니다.

<details>
<summary>멘토용 진행 포인트</summary>

- answer 브랜치 코드를 보여주기 전에 멘티가 어떤 책임을 나눴는지 먼저 말하게 합니다.
- 테스트 이름이 어떤 동작과 경계를 보호하는지 질문합니다.
- 코드 정리와 README 보강이 같은 목적을 향하는지 확인합니다.

</details>
