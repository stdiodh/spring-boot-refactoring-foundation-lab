window.visualLabData = {
  sequence: "11",
  title: "Refactoring Foundation",
  goal: "동작을 유지하면서 책임 분리, 예외 처리, 테스트 보강 순서로 구조를 개선한다.",
  problem: "기능을 여러 시퀀스 동안 쌓아 올리면 동작은 되지만 책임 경계가 흐려지고 변경 위치를 찾기 어려워집니다. 이번 시퀀스는 동작을 보존하면서 구조를 읽기 쉬운 상태로 정리하는 흐름을 다룹니다.",
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
      label: "기준 동작 확인",
      problem: "변경 전 기준이 없으면 리팩토링 후 실패 원인을 판단하기 어렵습니다.",
      concept: "Behavior preservation은 외부 동작을 유지하면서 내부 구조만 바꾸는 기준입니다.",
      action: "수정 전 테스트와 주요 API 흐름을 먼저 확인합니다.",
      check: "리팩토링 전 기준 테스트 결과를 기록합니다.",
    },
    {
      id: "responsibility",
      label: "책임 경계 확인",
      problem: "한 클래스가 여러 이유로 바뀌면 작은 변경도 넓게 번집니다.",
      concept: "Responsibility boundary는 변경 이유를 분리해 읽는 기준입니다.",
      action: "검증, 트랜잭션, 응답 변환, 저장 책임이 어디에 있는지 확인합니다.",
      check: "한 클래스가 너무 많은 이유로 바뀌지 않는지 확인합니다.",
    },
    {
      id: "refactor",
      label: "작게 리팩토링",
      problem: "패키지 이동과 책임 분리를 한 번에 섞으면 실패 원인이 흐려집니다.",
      concept: "작은 변경 단위는 테스트로 확인 가능한 리팩토링 단위입니다.",
      action: "기능별 package 이동을 먼저 하고, 동작 확인 후 작은 책임 분리를 수행합니다.",
      check: "각 변경 뒤 테스트를 실행할 수 있는 크기로 유지합니다.",
    },
    {
      id: "exception",
      label: "예외 응답 정리",
      problem: "실패 응답 규칙이 흩어지면 API 사용자가 실패 원인을 일관되게 읽기 어렵습니다.",
      concept: "Exception flow는 실패 상황을 일관된 응답으로 바꾸는 흐름입니다.",
      action: "검증 실패와 도메인 실패가 어떤 응답 규칙으로 나가는지 확인합니다.",
      check: "status code와 response body가 임의로 바뀌지 않았는지 확인합니다.",
    },
    {
      id: "verify",
      label: "테스트 재확인",
      problem: "구조가 좋아 보여도 기존 동작이 깨지면 리팩토링 목표를 달성하지 못한 것입니다.",
      concept: "Test safety net은 구조 개선이 동작 보존을 해치지 않았는지 확인합니다.",
      action: "리팩토링 후 테스트를 실행해 기존 동작이 유지되는지 확인합니다.",
      check: "새 구조가 테스트하기 쉬운 방향으로 바뀌었는지 봅니다.",
    },
  ],
  practice: [
    "리팩토링 전후 API 동작이 유지되는지 확인한다.",
    "validation, transaction, auth 책임 위치를 점검한다.",
    "패키지 구조가 학습 순서와 맞는지 확인한다.",
    "common 패키지가 공통 책임만 담는지 확인한다.",
  ],
  mentorHints: [
    "멘티가 구조 이름을 외우는 데 집중하면 변경 전후 테스트 기준으로 다시 돌립니다.",
    "정답을 직접 말하기보다 package 이동, import 정리, 테스트 재실행 순서를 되짚게 합니다.",
    "이번 시퀀스는 새 기능 추가가 아니라 동작 보존과 구조 개선이 목표임을 유지합니다.",
  ],
};
