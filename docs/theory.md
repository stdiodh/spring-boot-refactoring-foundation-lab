# 리팩토링과 기초 보강

> 좋은 구조가 왜 읽기 쉽고, Validation, Exception Handling, 테스트, 문서화가 왜 한 흐름으로 묶여야 하는지 이해하는 문서입니다.

> 이번 시퀀스 한 줄 요약  
> 이번 실습은 새 기술을 더하는 대신, 지금까지 만든 코드를 다시 읽고 구조를 다듬어서 “나중에 다시 봐도 설명 가능한 상태”로 만드는 과정입니다.

## 먼저 이것만 기억해도 됩니다

- 리팩토링은 기능을 바꾸는 일이 아니라 구조를 더 읽기 좋게 만드는 일입니다.
- Validation, Exception Handling, 테스트는 따로 노는 주제가 아니라 서로를 지지하는 장치입니다.
- 좋은 README와 문서는 코드를 더 빨리 다시 떠올리게 해주는 복습 도구입니다.

## 이 주제를 왜 배우는가

기능을 하나씩 붙일 때는 “동작한다”는 사실이 먼저 중요합니다.  
하지만 기능이 늘어나고 인증, 예외 처리, 테스트, 배포까지 들어오면 그다음부터는 “다시 읽을 수 있는가”가 훨씬 중요해집니다.

그래서 이번 실습에서는 지금까지 만든 기능을 멈춰 세우고, 다시 한 번 구조를 봅니다.  
이 흐름을 이해하면 다음에는 이벤트 기반 구조처럼 새로운 사고방식을 배울 때도, 기존 구조와 무엇이 다른지 더 분명하게 볼 수 있습니다.

## 이번 실습 흐름을 먼저 한눈에 보기

1. `AuthService`와 `PostService`를 다시 읽습니다.
2. 한 메서드에 여러 책임이 섞인 지점을 찾습니다.
3. 서비스 레벨 검증과 예외 응답을 보강합니다.
4. 테스트를 추가해서 리팩토링 전후가 같은 기능을 유지하는지 확인합니다.
5. README와 문서를 보강해서 다시 설명하기 쉬운 상태로 만듭니다.

짧게 말하면 이번 실습은  
**코드 다시 읽기 → 책임 분리 → 검증/예외 보강 → 테스트 보강 → 문서 보강** 흐름을 익히는 과정입니다.

> 한 줄로 다시 보기  
> 지금까지 만든 코드를 “잘 돌아가는 상태”에서 “잘 읽히는 상태”로 옮기는 실습입니다.

## 오늘 꼭 잡아야 할 질문

- 왜 메서드가 짧아지는 것보다 책임이 분리되는 것이 더 중요할까요?
- Controller에서 이미 검증했는데 Service에서도 왜 한 번 더 방어할 수 있을까요?
- 테스트는 리팩토링에서 왜 더 중요해질까요?
- README 보강이 왜 코드 품질과 연결될까요?

## 중요한 코드 먼저 보기

### 1. 역할을 분리한 `AuthService`

```kotlin
fun login(request: LoginRequest): TokenResponse {
    val email = normalizeEmail(request.email)
    val user = findUserByEmailOrThrowInvalidCredentials(email)
    verifyPassword(request.password, user.password)
    return createTokenResponse(user.email)
}
```

- 이 메서드는 입력 정리, 조회, 비밀번호 검증, 토큰 발급을 한눈에 따라가게 해줍니다.
- 학생이 기억해야 할 핵심은 **“모든 일을 한 메서드 안에 다 적지 않아도 흐름은 더 선명해질 수 있다”**는 점입니다.
- 파일: `src/main/kotlin/com/andi/rest_crud/service/AuthService.kt`

### 2. 서비스 레벨 검증을 가진 `PostService`

```kotlin
private fun validatePostFields(title: String, content: String, author: String): PostCommand {
    val normalizedTitle = title.trim()
    val errors = linkedMapOf<String, String>()

    if (normalizedTitle.isBlank()) {
        errors["title"] = "title은 비어 있을 수 없습니다."
    }

    if (errors.isNotEmpty()) {
        throw InvalidPostRequestException(errors)
    }
```

- DTO 검증이 있어도, Service는 핵심 비즈니스 흐름을 한 번 더 방어할 수 있습니다.
- 학생이 기억해야 할 핵심은 **“입력 검증은 컨트롤러에서 끝나는 것이 아니라, 중요한 흐름에서는 서비스에서도 다시 확인할 수 있다”**는 점입니다.
- 파일: `src/main/kotlin/com/andi/rest_crud/service/PostService.kt`

### 3. 더 일관된 예외 응답

```kotlin
private fun error(
    code: String,
    message: String,
    errors: Map<String, String> = emptyMap()
): ErrorResponse {
    return ErrorResponse(
        code = code,
        message = message,
        errors = errors
    )
}
```

- 예외 처리 코드는 보통 조금씩 중복되기 쉽습니다.
- 학생이 기억해야 할 핵심은 **“예외 응답 구조도 일관되게 읽히게 정리할 수 있다”**는 점입니다.
- 파일: `src/main/kotlin/com/andi/rest_crud/exception/GlobalExceptionHandler.kt`

## 핵심 용어를 쉬운 말로 정리하기

### 리팩토링

- **뜻**  
  기능은 바꾸지 않고 코드를 더 읽기 좋게 정리하는 작업입니다.
- **왜 중요한가**  
  기능이 늘어날수록 코드를 다시 읽고 고치는 시간이 더 많아지기 때문입니다.
- **이번 코드에서는 어디에 보이는가**  
  `AuthService`, `PostService`, `GlobalExceptionHandler`에서 볼 수 있습니다.
- **짧은 상황 예시**  
  로그인 로직이 길어질수록 디버깅이 어려워지는데, 입력 정리와 검증을 나누면 다시 보기 쉬워집니다.

### 서비스 레벨 검증

- **뜻**  
  컨트롤러 밖에서도 핵심 비즈니스 규칙을 한 번 더 확인하는 방식입니다.
- **왜 중요한가**  
  테스트나 다른 내부 호출이 DTO 검증을 우회할 수 있기 때문입니다.
- **이번 코드에서는 어디에 보이는가**  
  `PostService.validatePostFields(...)`에서 볼 수 있습니다.
- **짧은 상황 예시**  
  제목이 공백뿐인 요청이 테스트에서 직접 서비스로 들어오더라도, 서비스가 이를 막을 수 있습니다.

### 리팩토링 안정성

- **뜻**  
  구조를 바꿔도 기능이 깨지지 않았음을 테스트로 확인하는 감각입니다.
- **왜 중요한가**  
  리팩토링은 눈에 보이는 변화가 많아서, 테스트가 없으면 실수도 놓치기 쉽습니다.
- **이번 코드에서는 어디에 보이는가**  
  `PostServiceTest`, `AuthServiceTest`의 추가 케이스에서 볼 수 있습니다.
- **짧은 상황 예시**  
  이메일 정규화나 게시글 공백 검증을 넣어도 기존 로그인/저장 흐름이 계속 통과해야 합니다.

## 핵심 개념 설명

### 1. 읽기 쉬운 구조는 “무슨 일이 일어나는지”를 빨리 보여줍니다

좋은 구조는 항상 더 짧은 코드만을 뜻하지 않습니다.  
중요한 것은 코드를 처음 봤을 때 “입력 정리 → 조회 → 검증 → 저장/응답” 같은 흐름이 더 빨리 보이는가입니다.

### 2. 검증, 예외, 테스트는 따로 떨어진 주제가 아닙니다

입력을 막는 검증이 있고, 실패했을 때는 예외 응답이 필요하고, 그 흐름이 계속 유지되는지는 테스트가 확인합니다.  
그래서 이번 시퀀스에서는 세 가지를 하나의 묶음처럼 다시 봅니다.

### 3. 문서화도 코드 품질의 일부입니다

README와 문서는 단순 소개문이 아닙니다.  
학생이 나중에 돌아왔을 때 “이 시퀀스에서 뭘 정리했지?”를 빨리 떠올리게 만들어주는 복습 도구입니다.

## 이번 실습에서 꼭 보면 좋은 포인트

- `AuthService.login(...)`이 왜 더 읽기 쉬워졌는지
- `PostService.create(...)`가 왜 검증과 생성 책임을 나눴는지
- `GlobalExceptionHandler`가 왜 공통 응답 생성 함수를 가지는지
- 테스트가 어떤 리팩토링 포인트를 붙잡아주는지

## 자주 헷갈리는 포인트

- 리팩토링은 “전부 다시 쓰기”가 아닙니다.
- DTO 검증이 있다고 해서 서비스 검증이 무조건 불필요한 것은 아닙니다.
- 테스트 추가는 리팩토링의 뒷정리가 아니라, 리팩토링을 가능하게 하는 안전장치입니다.
- README 보강은 문서 작업이 아니라 학습 흐름 정리의 일부입니다.

## 직접 말해보기

- `AuthService`에서 어떤 책임이 분리되었나요?
- `PostService`가 왜 공백 문자열을 한 번 더 막나요?
- 예외 응답 구조를 통일하면 어떤 점이 좋아지나요?
- 테스트를 추가하지 않고 리팩토링하면 어떤 위험이 있나요?

## 복습 체크리스트

- [ ] 리팩토링이 왜 필요한지 설명할 수 있습니다.
- [ ] Validation, Exception Handling, 테스트가 연결된다는 점을 말할 수 있습니다.
- [ ] `AuthService`와 `PostService`의 개선 포인트를 각각 설명할 수 있습니다.
- [ ] README 보강이 왜 복습 도구가 되는지 말할 수 있습니다.

## 오늘 실습에서 꼭 기억할 것

- 구조 개선은 새 기술 추가와 다른 종류의 실력입니다.
- 읽기 쉬운 코드일수록 다시 고치기 쉽습니다.
- 검증, 예외, 테스트, 문서는 같이 움직일 때 더 큰 힘을 냅니다.

## 다음 실습과 연결하기

이번 시퀀스에서 구조를 다시 정리했기 때문에, 다음에는 이벤트 기반 흐름처럼 다른 사고방식을 배울 때도 기존 구조와 비교하며 이해하기 쉬워집니다.
