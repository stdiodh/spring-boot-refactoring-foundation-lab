# 리팩토링과 기초 보강

> 좋은 구조가 왜 읽기 쉽고, Validation, Exception Handling, 테스트, 문서화가 왜 한 흐름으로 묶여야 하는지 이해하는 문서입니다.

> 이번 시퀀스 한 줄 요약  
> 이번 실습은 새 기술을 더하는 대신, 지금까지 만든 코드를 다시 읽고 구조를 다듬어서 “나중에 다시 봐도 설명 가능한 상태”로 만드는 과정입니다.

## 먼저 이것만 기억해도 됩니다

- 리팩토링은 기능을 바꾸는 일이 아니라 구조를 더 읽기 좋게 만드는 일입니다.
- Validation, Exception Handling, 테스트는 따로 노는 주제가 아니라 서로를 지지하는 장치입니다.
- 좋은 README와 문서는 코드를 더 빨리 다시 떠올리게 해주는 복습 도구입니다.

## 이 주제를 왜 배우는가

기능이 늘어나고 인증, 예외 처리, 테스트, 배포까지 들어오면 그다음부터는 “다시 읽을 수 있는가”가 훨씬 중요해집니다.  
이번 실습에서는 지금까지 만든 기능을 멈춰 세우고, 다시 한 번 구조를 봅니다.

## 이번 실습 흐름을 먼저 한눈에 보기

1. `AuthService`와 `PostService`를 다시 읽습니다.
2. 한 메서드에 여러 책임이 섞인 지점을 찾습니다.
3. 서비스 레벨 검증과 예외 응답을 보강합니다.
4. 테스트를 추가해서 리팩토링 전후가 같은 기능을 유지하는지 확인합니다.
5. README와 문서를 보강해서 다시 설명하기 쉬운 상태로 만듭니다.

## 중요한 코드 먼저 보기

### 1. `AuthService`의 긴 책임 흐름

```kotlin
fun login(request: LoginRequest): TokenResponse {
    val email = requireNotNull(request.email)
    val rawPassword = requireNotNull(request.password)
    val user = userRepository.findByEmail(email)
        .orElseThrow { InvalidCredentialsException() }
```

- 이 메서드에는 입력 꺼내기, 조회, 검증, 응답 생성이 한 번에 모여 있습니다.
- 이번 실습에서는 여기서 어떤 책임을 먼저 분리할지 판단하는 것이 핵심입니다.

### 2. `PostService`의 저장/수정 흐름

```kotlin
fun update(id: Long, request: PostUpdateRequest): PostResponse {
    val post = findPostById(id)
    post.title = request.title
    post.content = request.content
    post.author = request.author
```

- 지금은 DTO 검증에만 기대고 있어서, 서비스 자체의 방어 로직은 거의 없습니다.
- 이번 실습에서는 서비스가 어떤 수준까지 스스로 검증해야 하는지도 같이 생각해보게 됩니다.

## 핵심 개념 설명

- 읽기 쉬운 구조는 “무슨 일이 일어나는지”를 빨리 보여줍니다.
- 검증, 예외, 테스트는 같이 움직일 때 훨씬 강해집니다.
- 문서 보강도 구조 개선의 일부입니다.
