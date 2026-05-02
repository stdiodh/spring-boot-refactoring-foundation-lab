# 리팩토링과 기초 보강 정답 가이드

## 정답 흐름 요약

정답 기준에서는 아래 여섯 파일이 핵심입니다.

- `PostService.kt`
- `AuthService.kt`
- `GlobalExceptionHandler.kt`
- `PostServiceTest.kt`
- `AuthServiceTest.kt`
- `README.md`

## 1. `AuthService` 전/후 비교

### 전

- `signUp`, `login`, `getCurrentUser`가 각각 요청값 꺼내기, 조회, 검증, 토큰 발급을 한 메서드 안에서 직접 처리했습니다.
- 기능은 맞지만 어디서 무엇을 하는지 한눈에 덜 들어옵니다.

### 후

```kotlin
fun login(request: LoginRequest): TokenResponse {
    val email = normalizeEmail(request.email)
    val user = findUserByEmailOrThrowInvalidCredentials(email)
    verifyPassword(request.password, user.password)
    return createTokenResponse(user.email)
}
```

- 이메일 정리
- 사용자 조회
- 비밀번호 검증
- 토큰 응답 생성

이 흐름이 위에서 아래로 읽히게 만들었습니다.  
핵심은 메서드 수가 늘어난 것이 아니라, 다음 변경이 들어왔을 때 손대야 할 경계가 더 분명해진 점입니다.

## 2. `PostService` 전/후 비교

### 전

- create/update 안에서 요청값 사용, 엔티티 조작, 응답 변환이 한 번에 일어났습니다.
- DTO 검증만 믿고 서비스 레벨 검증은 없었습니다.

### 후

```kotlin
fun create(request: PostCreateRequest): PostResponse {
    val command = validateCreateRequest(request)
    val savedPost = postRepository.save(buildPost(command))
    return toResponse(savedPost)
}
```

- 검증
- 엔티티 생성
- 저장
- 응답 변환

을 나눴습니다.  
특히 `validatePostFields(...)`를 통해 공백 문자열을 서비스에서 한 번 더 막습니다.

## 3. 예외 처리 보강

이번 정답에서는 아래 예외를 추가했습니다.

- `InvalidPostRequestException`
- `UserNotFoundException`

그리고 `GlobalExceptionHandler`에는 아래 보강을 넣었습니다.

- `error(...)` 공통 응답 생성 함수
- `INVALID_POST_REQUEST` 응답
- `USER_NOT_FOUND` 응답

즉, 리팩토링은 서비스 코드만 정리하는 것이 아니라 실패 응답 구조도 같이 정리하는 작업이라는 점을 보여줍니다.

## 4. 테스트 추가 정답

### `PostServiceTest`

- 제목이 공백뿐이면 `InvalidPostRequestException`
- update 시 trim 이후 값이 저장되는지 확인

### `AuthServiceTest`

- signUp 시 이메일이 정규화되어 저장되는지 확인
- signUp 시 중복 이메일이면 `UserAlreadyExistsException`
- 현재 사용자 조회 시 없으면 `UserNotFoundException`

## 5. README 보강 포인트

README는 단순 소개문이 아니라 아래가 빨리 보여야 합니다.

- 이번 시퀀스의 목적
- 어떤 파일을 손대는지
- 어떤 흐름으로 리팩토링하는지
- 왜 이 작업이 필요한지

즉, 무엇을 만들었는가보다 무엇을 다시 정리했는가가 중심이어야 합니다.

## 6. 강사가 빠르게 비교할 포인트

- `AuthService`가 helper 메서드로 역할을 분리했는가
- `PostService`가 서비스 레벨 검증을 추가했는가
- `GlobalExceptionHandler`가 새 예외와 공통 응답 생성을 가졌는가
- 테스트가 리팩토링 포인트를 직접 확인하는가
- README가 이번 시퀀스의 목적을 분명히 설명하는가

특히 아래 질문으로 비교하면 좋습니다.

- 이 코드는 다음 변경이 들어왔을 때 어디를 손대야 하는지 빨리 보이는가
- DTO 검증만으로 부족한 이유가 서비스 코드에서 드러나는가
- 테스트가 성공 여부만이 아니라 경계 자체를 설명하는가
