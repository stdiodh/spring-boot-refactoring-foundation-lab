# Spring Boot Refactoring Foundation Lab

이 레포는 A&I 백엔드 커리큘럼의 `11. 리팩토링과 기초 보강` 시퀀스를 담는 토픽 레포입니다.
`main`은 가이드 브랜치이고, 학생 실습은 `11-implementation`에서 시작합니다.

## 이 레포에서 배우는 것

- 기존 Service를 다시 읽고 역할이 섞인 부분 찾기
- Validation, Exception Handling, 테스트를 하나의 흐름으로 다시 묶기
- 기존 코드를 더 읽기 쉽고 점검하기 쉬운 형태로 다듬기
- README와 문서를 다시 보기 쉬운 형태로 정리하기
- 변경에 강한 코드 기준을 실제 서비스 코드로 이해하기

## 시작 방법

```bash
git clone https://github.com/stdiodh/spring-boot-refactoring-foundation-lab.git
cd spring-boot-refactoring-foundation-lab
git checkout 11-implementation
```

## 실습 브랜치

| 용도 | 브랜치 |
| --- | --- |
| 가이드 | `main` |
| 학생 시작 | `11-implementation` |
| 참고 정답 | `11-answer` |

## 실행 방법

```bash
docker compose up -d
./gradlew bootRun
```

## 테스트 방법

```bash
./gradlew test
```

리팩토링 전후에 같은 명령을 각각 실행합니다.

테스트가 확인하는 것:

- 리팩토링 전 현재 API 동작을 고정합니다.
- feature-based 패키지 구조로 이동한 뒤에도 같은 테스트가 통과하는지 확인합니다.
- 패키지 변경이 API path, status code, response body를 바꾸지 않았는지 확인합니다.

실패하면 먼저 볼 것:

- import, package 선언, component scan 범위를 먼저 확인합니다.
- 실패한 테스트가 구조 이동 문제인지 책임 분리 중 동작을 바꾼 문제인지 구분합니다.

완료 기준:

- 리팩토링 전후 `./gradlew test`가 모두 통과합니다.
- API 동작 보존과 패키지 구조 변경을 테스트 결과로 설명할 수 있습니다.

## 정답과 비교하는 방법

실습 중 막혔거나 완료 후 확인이 필요할 때만 참고 정답 브랜치와 비교합니다.

```bash
git fetch origin
git diff 11-implementation..11-answer
```

## Visual Lab

`main` 가이드 브랜치에는 리팩토링 흐름을 훑어보는 Visual Lab 진입점이 있습니다.
이 페이지는 정답 비교 페이지가 아니라 리팩토링 전후 확인 순서를 이해하기 위한 정적 학습 화면입니다.

```text
docs/visual-lab/index.html
```

## 문서 안내

- [레포 가이드](./docs/repo-guide.md)
- [브랜치 가이드](./docs/branch-guide.md)
- [시퀀스 맵](./docs/sequence-map.md)
- [Visual Lab](./docs/visual-lab/index.html)
