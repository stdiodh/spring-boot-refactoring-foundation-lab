window.visualLabData = {
  sequence: "11",
  title: "Refactoring Foundation Visual Lab",
  goal: "리팩토링 전후 동작을 테스트로 고정하고 Service 책임, 검증, 예외 응답, 문서 의도를 함께 정리합니다.",
  flow: [
    {
      id: "refactoring-flow",
      label: "Refactoring safety",
      problem: "리팩토링을 코드 미화로만 보면 동작 보존과 책임 분리 기준이 사라집니다.",
      concept: "Behavior preservation, responsibility split, tests",
      action: "테스트로 기준을 고정한 뒤 책임이 섞인 Service 흐름을 작게 나눕니다.",
      check: "리팩토링 전후 같은 테스트가 통과하는지 확인합니다.",
    },
  ],
  defaultSequence: "11",
  repo: {
    name: "spring-boot-refactoring-foundation-lab",
    path: "spring-boot-refactoring-foundation-lab",
  },
  sequences: [
    {
      id: "11",
      title: "Refactoring Foundation",
      topic: "Refactoring and foundation reinforcement",
      question: "코드 구조를 바꿔도 기능이 그대로라는 것을 무엇으로 확인할까?",
      goal: "테스트로 동작을 고정하고, Service 책임 분리와 검증/예외 응답 보강을 작은 단위로 진행합니다.",
      source: {
        theory: "../theory.md",
        implementation: "../implementation.md",
        checklist: "../checklist.md",
      },
      why: {
        problem: "기능이 늘어난 Service는 입력 정리, 검증, 저장소 호출, 응답 변환, 예외 처리가 한 메서드에 섞이기 쉽습니다.",
        limits: [
          "리팩토링 전 테스트가 없으면 구조 변경 중 동작을 바꿨는지 알기 어렵습니다.",
          "패키지 이동만 하고 책임 경계가 그대로면 다음 변경 비용이 줄지 않습니다.",
          "실패 응답과 검증 흐름을 함께 보강하지 않으면 구조만 바뀐 코드가 됩니다.",
        ],
        choice: "먼저 테스트로 현재 동작을 고정하고, Service 책임을 작게 분리한 뒤 검증과 예외 응답을 보강합니다.",
      },
      overview: [
        "Code Smell",
        "Baseline Test",
        "Responsibility Split",
        "Validation",
        "ErrorResponse",
        "Refactored Flow",
        "Tests Verify",
      ],
      flows: [
        {
          id: "before-after-test",
          title: "리팩토링 전후 검증 흐름",
          summary: "리팩토링은 먼저 동작 기준을 세우고, 작은 변경 후 같은 테스트로 보존 여부를 확인합니다.",
          mermaid: "sequenceDiagram\n  actor Developer\n  participant Test as Existing tests\n  participant Service as Service code\n  participant Refactor as Refactoring step\n  Developer->>Test: run baseline tests\n  Test-->>Developer: current behavior evidence\n  Developer->>Service: find mixed responsibility\n  Developer->>Refactor: split small responsibility\n  Refactor->>Test: run tests again\n  Test-->>Developer: behavior preserved or failure",
          steps: [
            { order: 1, actor: "Developer", input: "현재 코드", owner: "Baseline test", action: "리팩토링 전 테스트를 실행해 현재 동작 기준을 확인합니다.", output: "Baseline result", note: "기준 없이 구조를 바꾸면 동작 변경을 놓치기 쉽습니다." },
            { order: 2, actor: "Developer", input: "Service method", owner: "Code smell review", action: "검증, 조회, 변환, 예외 처리 책임이 섞인 지점을 찾습니다.", output: "Refactoring target", note: "리팩토링은 읽기 좋은 이름 바꾸기가 아니라 변경 비용을 줄이는 작업입니다." },
            { order: 3, actor: "Developer", input: "Refactoring target", owner: "Responsibility split", action: "작은 helper나 별도 책임으로 흐름을 나눕니다.", output: "Refactored flow", note: "한 번에 큰 구조 변경을 하지 않고 검증 가능한 단위로 진행합니다." },
            { order: 4, actor: "Developer", input: "Refactored flow", owner: "Tests", action: "같은 테스트를 다시 실행합니다.", output: "Pass or failure reason", note: "테스트 실패는 구조 이동 문제인지 동작 변경인지 먼저 구분합니다." },
          ],
        },
        {
          id: "service-split",
          title: "Service 책임 분리 흐름",
          summary: "입력 검증, 비즈니스 판단, 저장소 호출, 응답 변환을 한 흐름 안에서 역할별로 읽습니다.",
          steps: [
            { order: 1, actor: "Request", input: "DTO", owner: "Validation candidate", action: "Service 안에 섞인 기본 입력 검증 후보를 찾습니다.", output: "Validation boundary", note: "검증이 어디에 있어야 읽기 쉬운지 판단합니다." },
            { order: 2, actor: "Service", input: "Validated input", owner: "Business rule", action: "작성자 확인이나 상태 판단 같은 비즈니스 조건을 분리합니다.", output: "Rule result", note: "정책 판단은 이름이 드러나는 작은 단위가 좋습니다." },
            { order: 3, actor: "Service", input: "Rule result", owner: "Repository", action: "저장소 호출은 필요한 순간에만 모아둡니다.", output: "Domain data", note: "저장소 호출과 응답 변환이 섞이면 흐름을 추적하기 어렵습니다." },
            { order: 4, actor: "Service", input: "Domain data or exception", owner: "ErrorResponse / Response DTO", action: "성공과 실패 출력을 일관된 모양으로 정리합니다.", output: "API result", note: "리팩토링 후에도 외부 동작은 유지되어야 합니다." },
          ],
        },
      ],
      responsibilities: [
        { name: "Baseline tests", role: "리팩토링 전 현재 동작을 고정합니다.", caution: "테스트 없이 구조부터 바꾸면 동작 변경을 놓치기 쉽습니다." },
        { name: "Service", role: "비즈니스 흐름을 조립하되 책임이 과도하게 섞이지 않게 나눕니다.", caution: "모든 검증과 변환, 저장소 호출이 한 메서드에 몰리면 읽기 어렵습니다." },
        { name: "GlobalExceptionHandler", role: "실패를 일관된 응답으로 바꿉니다.", caution: "리팩토링 중 실패 응답 모양이 바뀌지 않게 확인합니다." },
        { name: "Documentation", role: "무엇을 바꿨는가보다 왜 이 경계로 나눴는가를 남깁니다.", caution: "구조 변경 이유가 없으면 다음 사람이 다시 되돌릴 수 있습니다." },
      ],
      concepts: [
        { title: "동작 보존이 먼저입니다", body: "구조 변경 전후 같은 기능이 유지되는지 테스트로 확인합니다." },
        { title: "책임 분리는 읽기 비용을 줄입니다", body: "입력 검증, 비즈니스 판단, 저장소 호출, 응답 변환을 구분합니다." },
        { title: "Feature-based 관점", body: "기능 단위로 코드를 찾기 쉽게 만들 수 있지만 무조건적인 패키지 이동이 목표는 아닙니다." },
        { title: "리팩토링 의도를 문서로 남깁니다", body: "다음 변경자가 왜 이 구조인지 이해할 수 있어야 합니다." },
      ],
      glossary: [
        { term: "Refactoring", meaning: "외부 동작은 유지하면서 내부 구조를 더 이해하기 쉽게 바꾸는 작업입니다.", caution: "기능 추가나 동작 변경과 구분합니다." },
        { term: "Code smell", meaning: "변경 비용이 커질 가능성을 보여주는 구조적 신호입니다.", caution: "모든 smell을 한 번에 고치려 하면 범위가 커집니다." },
        { term: "Feature-based structure", meaning: "기능 기준으로 관련 코드를 가까이 두는 구조입니다.", caution: "계층 기준 구조와 장단점을 비교해야 합니다." },
        { term: "Service validation", meaning: "Service 안의 비즈니스 검증과 입력 정리 후보입니다.", caution: "요청 형식 검증과 비즈니스 규칙을 섞지 않습니다." },
        { term: "Behavior preservation", meaning: "구조 변경 후에도 외부 동작이 유지되는 상태입니다.", caution: "테스트 없이 말로만 보장하기 어렵습니다." },
      ],
      practical: [
        { title: "리팩토링은 코드 미화가 아닙니다", body: "다음 변경 때 수정 지점을 더 빨리 찾고 위험을 줄이는 작업입니다." },
        { title: "큰 이동보다 작은 검증 단위가 안전합니다", body: "작게 나누고 테스트를 반복해야 실패 지점을 찾기 쉽습니다." },
        { title: "이벤트 기반 구조는 다음 범위입니다", body: "이번에는 요청/응답 코드의 책임 분리와 테스트 보강에 집중합니다." },
      ],
      checks: [
        "리팩토링 전후 같은 테스트가 통과하는지 확인했나요?",
        "이 메서드는 입력 정리와 비즈니스 검증을 동시에 하고 있나요?",
        "패키지 이동이 아니라 책임 분리 기준을 설명할 수 있나요?",
        "실패 응답 모양이 리팩토링 후에도 유지되는지 확인했나요?",
      ],
      next: {
        id: "12",
        title: "Event Driven",
        reason: "요청/응답 구조의 책임을 정리했다면, 다음에는 주문 생성과 후속 알림을 이벤트 흐름으로 분리하는 사고를 다룹니다.",
      },
    },
  ],
};
