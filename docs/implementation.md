# 리팩토링과 기초 보강 구현 가이드

## 이 도메인이 필요한 이유

이번에는 새 기능보다 “지금 있는 코드를 다시 읽고 정리하는 힘”이 더 중요합니다.

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

## 단계별 구현 안내

### 1. 리팩토링 대상을 고릅니다

- 이번 starter에서는 `AuthService`, `PostService` 두 축을 봅니다.
- 먼저 어떤 메서드가 “여러 일을 한꺼번에 한다”는 느낌을 주는지 찾습니다.

### 2. 역할이 섞인 부분을 나눕니다

- `AuthService`에서는 입력 정리, 조회, 비밀번호 검증, 토큰 발급을 눈여겨봅니다.
- `PostService`에서는 게시글 검증, 엔티티 생성/수정, 응답 변환을 눈여겨봅니다.

### 3. Validation 또는 Exception Handling을 보강합니다

- DTO 검증만 믿지 않고 서비스가 한 번 더 방어할 지점을 생각해봅니다.
- starter에는 아직 서비스 레벨 검증 예외가 없으므로, 필요하면 새 예외를 추가해도 됩니다.

### 4. 테스트를 추가합니다

- 현재 없는 정상/실패 케이스를 1~2개 더 추가합니다.
- 리팩토링 전후에 테스트가 계속 통과하는지 확인합니다.

### 5. README와 문서를 보강합니다

- 이번 시퀀스의 목적이 “새 기능”이 아니라 “구조 개선”이라는 점이 보이게 정리합니다.

## 실행 확인 방법

```bash
./gradlew test
./gradlew bootRun
```
