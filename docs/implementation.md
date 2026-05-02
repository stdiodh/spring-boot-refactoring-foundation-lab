# 리팩토링과 기초 보강 구현 가이드

## 이 도메인이 필요한 이유

지금까지는 기능을 하나씩 붙이는 과정이 중요했습니다.  
이번에는 그 기능들을 다시 읽고, 더 읽기 쉽고 점검하기 쉬운 상태로 정리하는 과정이 중요합니다.

## 학생이 완성할 최종 흐름

1. `AuthService`와 `PostService`에서 책임이 섞인 부분을 다시 읽습니다.
2. 서비스 레벨 검증과 예외 응답을 보강합니다.
3. 테스트를 추가해서 리팩토링 안정성을 확인합니다.
4. README와 문서를 보강해 다시 설명하기 쉬운 상태를 만듭니다.

## 학생이 직접 구현할 순서

1. 개선 대상 Service를 하나 고릅니다.
2. 역할이 섞인 부분을 찾습니다.
3. Validation 또는 Exception Handling을 보강합니다.
4. 테스트를 추가합니다.
5. README 또는 문서를 보강합니다.

## TODO를 넣을 파일

- `src/main/kotlin/com/andi/rest_crud/service/PostService.kt`
- `src/main/kotlin/com/andi/rest_crud/service/AuthService.kt`
- `src/main/kotlin/com/andi/rest_crud/exception/GlobalExceptionHandler.kt`
- `src/test/kotlin/com/andi/rest_crud/service/PostServiceTest.kt`
- `src/test/kotlin/com/andi/rest_crud/service/AuthServiceTest.kt`
- `README.md`

## 각 파일의 역할

- `PostService.kt`: 게시글 저장/수정 흐름과 서비스 레벨 검증을 다루는 핵심 파일
- `AuthService.kt`: 이메일 정리, 사용자 조회, 비밀번호 검증, 토큰 발급 흐름을 모으는 핵심 파일
- `GlobalExceptionHandler.kt`: 실패 응답을 일관되게 보여주는 파일
- `*Test.kt`: 리팩토링 전후 기능이 유지되는지 확인하는 안전장치
- `README.md`: 이번 시퀀스에서 무엇을 정리했는지 다시 떠올리게 해주는 문서

## 미리 제공할 것

- 10 시퀀스 answer 기반 프로젝트
- 현재 서비스 코드
- 기본 테스트 구조
- 문서 기본 틀

## 단계별 구현 안내

### 1. 리팩토링 대상을 고릅니다

- 이번 실습에서는 `AuthService`, `PostService` 두 축을 봅니다.
- 먼저 어떤 메서드가 “읽기 어렵다”는 느낌을 주는지 찾습니다.
- 입력 정리, 조회, 검증, 저장, 응답 변환이 한 메서드에 섞여 있는지 확인합니다.

### 2. 역할이 섞인 부분을 나눕니다

- `AuthService`에서는 이메일 정리, 조회, 비밀번호 검증, 토큰 발급을 나눕니다.
- `PostService`에서는 게시글 필드 검증, 엔티티 생성/수정, 응답 변환을 나눕니다.
- 핵심은 코드를 더 짧게 만드는 것이 아니라, 흐름이 더 빨리 읽히게 만드는 것입니다.

예를 들면 `login()`은 최종적으로 아래처럼 읽히는 흐름을 목표로 합니다.

```kotlin
fun login(request: LoginRequest): TokenResponse {
    val email = normalizeEmail(request.email)
    val user = findUserByEmailOrThrowInvalidCredentials(email)
    verifyPassword(request.password, user.password)
    return createTokenResponse(user.email)
}
```

### 3. Validation 또는 Exception Handling을 보강합니다

- DTO 검증만 믿지 않고, 중요한 비즈니스 흐름은 서비스에서 한 번 더 방어합니다.
- 이번 실습에서는 `InvalidPostRequestException` 같은 예외를 추가해 서비스 레벨 검증을 보여줍니다.
- `GlobalExceptionHandler`도 일관된 응답 구조로 다시 정리합니다.

게시글 쪽은 아래처럼 공백 문자열을 서비스에서 다시 막는 방향을 목표로 합니다.

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
}
```

### 4. 테스트를 추가합니다

- `PostService`에는 서비스 레벨 검증과 update 흐름 확인 테스트를 추가합니다.
- `AuthService`에는 이메일 정규화, 중복 가입, 현재 사용자 조회 실패 같은 케이스를 추가합니다.
- 리팩토링은 테스트가 있어야 안심하고 진행할 수 있다는 점을 같이 체감하는 것이 중요합니다.

### 5. README와 문서를 보강합니다

- 이번 시퀀스에서 무엇을 정리했는지 다시 읽기 쉽게 정리합니다.
- 전/후 비교 포인트가 보이게 적습니다.
- 학생이 나중에 돌아왔을 때 “아, 이때 구조를 정리했지”가 바로 떠오르게 만드는 것이 목표입니다.

## 실행 확인 방법

```bash
./gradlew test
./gradlew bootRun
```
