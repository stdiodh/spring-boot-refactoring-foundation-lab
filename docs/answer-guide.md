# 리팩토링과 기초 보강 정답 비교 가이드

이 브랜치는 starter이므로 정답 코드를 그대로 싣지 않습니다.  
완성된 비교 기준은 `11-answer` 브랜치에서 확인합니다.

## 정답 브랜치에서 꼭 비교할 파일

- `PostService.kt`
- `AuthService.kt`
- `GlobalExceptionHandler.kt`
- `PostServiceTest.kt`
- `AuthServiceTest.kt`
- `README.md`

## 비교할 때 볼 포인트

- `AuthService`가 helper 메서드로 책임을 분리했는가
- `PostService`가 서비스 레벨 검증을 추가했는가
- `GlobalExceptionHandler`가 새 예외와 공통 응답 생성을 가졌는가
- 테스트가 리팩토링 포인트를 직접 확인하는가
- README가 이번 시퀀스의 목적을 분명히 설명하는가

특히 아래 질문으로 비교하면 흐름이 더 잘 보입니다.

- `login()`을 읽었을 때 입력 정리, 조회, 검증, 토큰 발급 순서가 바로 보이는가
- 게시글 저장/수정 흐름에서 검증과 엔티티 조작이 분리되어 있는가
- 예외 응답 구조가 서비스 보강과 함께 움직이는가
- 테스트가 리팩토링의 결과만이 아니라 경계 자체를 확인하는가
