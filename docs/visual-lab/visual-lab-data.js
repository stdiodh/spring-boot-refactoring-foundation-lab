window.visualLabData = {
  sequence: "11",
  title: "Refactoring Foundation",
  goal: "동작을 유지하면서 책임 분리, 예외 처리, 테스트 보강 순서로 구조를 개선한다.",
  implementationBranch: "11-implementation",
  concepts: [
    {
      name: "Behavior Preservation",
      description: "리팩토링 전후 외부 동작이 같아야 한다는 기준이다.",
    },
    {
      name: "Responsibility",
      description: "Controller, Service, Repository가 맡을 일을 명확히 나눈다.",
    },
    {
      name: "Exception Flow",
      description: "실패 상황을 일관된 응답으로 바꾸는 흐름이다.",
    },
    {
      name: "Test Coverage",
      description: "기존 동작을 지키고 구조 개선을 검증하는 안전망이다.",
    },
  ],
  flow: [
    {
      id: "baseline",
      title: "현재 동작을 확인한다",
      actor: "Student",
      target: "Tests",
      description: "수정 전 테스트와 주요 API 흐름을 먼저 확인한다.",
      checkpoint: "리팩토링 전 기준 동작을 기록한다.",
    },
    {
      id: "responsibility",
      title: "책임이 섞인 지점을 찾는다",
      actor: "Student",
      target: "Package Structure",
      description: "검증, 트랜잭션, 응답 변환, 저장 책임이 어디에 있는지 본다.",
      checkpoint: "한 클래스가 너무 많은 이유로 바뀌지 않는지 확인한다.",
    },
    {
      id: "refactor",
      title: "작게 나누어 고친다",
      actor: "Developer",
      target: "Service Layer",
      description: "한 번에 큰 구조 변경을 하지 않고 작은 단위로 책임을 분리한다.",
      checkpoint: "각 변경 뒤 테스트를 실행할 수 있는 크기로 유지한다.",
    },
    {
      id: "exception",
      title: "예외 응답을 정리한다",
      actor: "Application",
      target: "Global Exception Handler",
      description: "실패 상황을 같은 응답 규칙으로 반환하도록 정리한다.",
      checkpoint: "검증 실패와 도메인 실패의 status가 구분되는지 확인한다.",
    },
    {
      id: "verify",
      title: "테스트로 보존을 확인한다",
      actor: "Gradle",
      target: "Test Suite",
      description: "리팩토링 후 테스트를 실행해 기존 동작이 유지되는지 확인한다.",
      checkpoint: "새 구조가 테스트하기 쉬운 방향으로 바뀌었는지 본다.",
    },
  ],
  checkpoints: [
    "리팩토링 전후 API 동작이 유지되는지 확인한다.",
    "validation, transaction, auth 책임 위치를 점검한다.",
    "패키지 구조가 학습 순서와 맞는지 확인한다.",
    "실습은 11-implementation 브랜치에서 시작한다.",
  ],
};
