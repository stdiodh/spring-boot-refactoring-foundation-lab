window.visualLabData = {
  "kind": "sequence",
  "sequence": "11",
  "title": "Refactoring Foundation",
  "subtitle": "Refactoring and foundation reinforcement",
  "goal": "테스트로 동작을 고정하고, Service 책임 분리와 검증/예외 응답 보강을 작은 단위로 진행합니다.",
  "problem": "기능이 늘어난 Service는 입력 정리, 검증, 저장소 호출, 응답 변환, 예외 처리가 한 메서드에 섞이기 쉽습니다.",
  "workbench": {
    "kind": "refactor",
    "title": "Behavior Invariant Map",
    "instruction": "변경 범위를 선택해 Before와 After 사이에서 Service 동작을 지키는 단위 테스트 증거를 확인하세요.",
    "nodes": {
      "developer": {
        "label": "Developer",
        "icon": "person",
        "kind": "actor",
        "role": "작은 변경과 재검증을 반복",
        "boundary": "Refactoring loop"
      },
      "service-input": {
        "label": "Service test input",
        "icon": "fixture",
        "kind": "test fixture",
        "role": "동일하게 유지할 입력과 mock 조건",
        "boundary": "Unit test"
      },
      "baseline-tests": {
        "label": "PostServiceTest · AuthServiceTest",
        "icon": "test",
        "kind": "unit tests",
        "role": "현재 Service 동작의 비교 기준",
        "boundary": "Before evidence",
        "codePointIds": [
          "regression-test"
        ]
      },
      "before-service": {
        "label": "Before Service",
        "icon": "service",
        "kind": "code under test",
        "role": "책임이 섞여 있는 현재 Service 구현",
        "boundary": "Before",
        "codePointIds": [
          "service-responsibility"
        ]
      },
      "baseline-evidence": {
        "label": "Baseline evidence",
        "icon": "evidence",
        "kind": "unit behavior evidence",
        "role": "반환값과 예외 타입의 현재 기준",
        "boundary": "Before evidence"
      },
      "responsibility-review": {
        "label": "Responsibility review",
        "icon": "refactor",
        "kind": "code review",
        "role": "입력 정리, 조회, 검증, 변환 혼합 지점 식별",
        "boundary": "Structural change"
      },
      "helper-extraction": {
        "label": "Small helper extraction",
        "icon": "refactor",
        "kind": "refactoring operation",
        "role": "한 번에 하나의 책임을 이름 있는 단위로 분리",
        "boundary": "Structural change",
        "codePointIds": [
          "service-responsibility"
        ]
      },
      "after-tests": {
        "label": "Same Service unit tests",
        "icon": "test",
        "kind": "unit tests",
        "role": "동일한 입력과 조건으로 After 재검증",
        "boundary": "After evidence",
        "codePointIds": [
          "regression-test"
        ]
      },
      "after-service": {
        "label": "After Service + helpers",
        "icon": "service",
        "kind": "refactored code",
        "role": "공개 Service 동작을 유지한 책임 분리 결과",
        "boundary": "After",
        "codePointIds": [
          "service-responsibility"
        ]
      },
      "repository-collaborator": {
        "label": "Mocked repository condition",
        "icon": "repository",
        "kind": "test collaborator",
        "role": "테스트가 준비한 조회 또는 저장 결과",
        "boundary": "Unit test"
      },
      "invariant-evidence": {
        "label": "Service behavior preserved",
        "icon": "evidence",
        "kind": "invariant result",
        "role": "반환값과 예외 타입이 유지된 단위 테스트 결과",
        "boundary": "Invariant"
      },
      "changed-behavior": {
        "label": "Behavior change detected",
        "icon": "evidence",
        "kind": "failure evidence",
        "role": "반환값 또는 예외 타입 차이를 알리는 테스트 실패",
        "boundary": "Invariant"
      },
      "package-move": {
        "label": "Feature-based package move",
        "icon": "refactor",
        "kind": "later scope",
        "role": "안전망 이후 검토할 더 큰 구조 변경",
        "boundary": "Later scope"
      }
    },
    "scenarios": [
      {
        "id": "refactor-baseline",
        "label": "Before 동작 고정",
        "flowId": "before-after-test",
        "tone": "signal",
        "prompt": "구조를 바꾸기 전에 현재 Service 동작을 단위 테스트로 고정합니다.",
        "route": [
          "현재 Service 동작",
          "./gradlew test",
          "Baseline result"
        ],
        "diagram": {
          "caption": "이 baseline은 HTTP 계약이 아니라 PostServiceTest와 AuthServiceTest가 관찰하는 Service 단위 반환값과 예외 타입을 고정합니다.",
          "lanes": [
            {
              "id": "before-baseline",
              "label": "Before · Service unit behavior",
              "description": "구조 변경 전에 같은 입력과 collaborator 조건으로 현재 동작을 기록합니다.",
              "steps": [
                {
                  "from": "developer",
                  "to": "baseline-tests",
                  "verb": "baseline 실행",
                  "payload": "./gradlew test",
                  "kind": "request",
                  "codePointIds": [
                    "regression-test"
                  ]
                },
                {
                  "from": "baseline-tests",
                  "to": "before-service",
                  "verb": "공개 메서드 호출",
                  "payload": "Service input + prepared collaborator result",
                  "kind": "call"
                },
                {
                  "from": "before-service",
                  "to": "baseline-evidence",
                  "verb": "현재 동작 기록",
                  "payload": "return values + exception types",
                  "kind": "response",
                  "check": "현재 테스트는 HTTP path, status, body를 검증하지 않습니다."
                }
              ]
            }
          ]
        },
        "snapshot": [
          {
            "label": "Before",
            "value": "현재 테스트 통과",
            "tone": "signal"
          },
          {
            "label": "비교 기준",
            "value": "입력 · Repository 호출 · 반환값",
            "tone": "signal"
          }
        ],
        "evidence": "PostServiceTest와 AuthServiceTest가 리팩토링 전 Service 단위 동작의 기준을 제공합니다.",
        "outcome": "통과한 baseline이 있어야 After 실패가 구조 변경에서 생겼는지 비교할 수 있습니다."
      },
      {
        "id": "refactor-small-split",
        "label": "작은 책임 분리",
        "flowId": "service-split",
        "tone": "recovered",
        "prompt": "입력 정리, 조회, 검증, 변환 책임을 작은 helper로 나누고 같은 테스트를 다시 실행합니다.",
        "route": [
          "Baseline tests",
          "PostService · AuthService",
          "작은 helper 추출",
          "같은 테스트 재실행",
          "입력 · 저장 호출 · 반환값 유지"
        ],
        "diagram": {
          "caption": "Before와 After에 같은 Service 입력과 테스트 조건을 적용하고 반환값과 예외 타입을 비교해 구조 변경만 일어났는지 확인합니다.",
          "lanes": [
            {
              "id": "before-lane",
              "label": "Before",
              "description": "현재 Service 단위 동작을 변경 전 기준으로 남깁니다.",
              "steps": [
                {
                  "from": "baseline-tests",
                  "to": "service-input",
                  "verb": "fixture 준비",
                  "payload": "same requests and mock conditions",
                  "kind": "config"
                },
                {
                  "from": "service-input",
                  "to": "before-service",
                  "verb": "현재 구현 실행",
                  "payload": "public Service methods",
                  "kind": "call"
                },
                {
                  "from": "before-service",
                  "to": "baseline-evidence",
                  "verb": "기준 저장",
                  "payload": "return values + exception types",
                  "kind": "response"
                }
              ]
            },
            {
              "id": "structural-change-lane",
              "label": "Structural change",
              "description": "런타임 요청 이동이 아니라 코드 책임의 위치가 바뀌는 과정입니다.",
              "steps": [
                {
                  "from": "before-service",
                  "to": "responsibility-review",
                  "verb": "혼합 책임 식별",
                  "payload": "normalize · find · validate · transform",
                  "kind": "compare",
                  "codePointIds": [
                    "service-responsibility"
                  ]
                },
                {
                  "from": "responsibility-review",
                  "to": "helper-extraction",
                  "verb": "작은 변경 선택",
                  "payload": "one named responsibility",
                  "kind": "transform"
                },
                {
                  "from": "helper-extraction",
                  "to": "after-service",
                  "verb": "책임 재배치",
                  "payload": "Service orchestration + private helpers",
                  "kind": "transform"
                }
              ]
            },
            {
              "id": "after-invariant-lane",
              "label": "After · Invariant",
              "description": "같은 단위 테스트 조건으로 공개 Service 동작의 보존 여부를 확인합니다.",
              "steps": [
                {
                  "from": "repository-collaborator",
                  "to": "after-service",
                  "verb": "같은 조건 제공",
                  "payload": "prepared repository result",
                  "kind": "config"
                },
                {
                  "from": "after-tests",
                  "to": "after-service",
                  "verb": "같은 테스트 재실행",
                  "payload": "same inputs and assertions",
                  "kind": "compare",
                  "codePointIds": [
                    "regression-test"
                  ]
                },
                {
                  "from": "after-service",
                  "to": "invariant-evidence",
                  "verb": "동작 비교 통과",
                  "payload": "same return values + exception types",
                  "kind": "response",
                  "check": "private helper 모양이 아니라 공개 Service 결과를 비교합니다."
                }
              ]
            }
          ]
        },
        "snapshot": [
          {
            "label": "After",
            "value": "책임 분리 후 동작 보존",
            "tone": "recovered"
          },
          {
            "label": "회귀 테스트",
            "value": "같은 명령 통과",
            "tone": "recovered"
          }
        ],
        "evidence": "helper 추출 뒤에도 리팩토링 전과 같은 Service 단위 테스트 명령이 통과합니다.",
        "outcome": "검증된 Service 동작을 바꾸지 않고 변경 이유를 작은 책임으로 구분합니다."
      },
      {
        "id": "refactor-contract-changed",
        "label": "Service 동작 변경 감지",
        "flowId": "before-after-test",
        "tone": "blocked",
        "prompt": "helper 추출 중 반환값이나 예외 타입이 달라졌을 때 단위 테스트가 어디서 멈추는지 확인합니다.",
        "route": [
          "Baseline tests",
          "Service 검증 분리",
          "After unit tests",
          "Service input · interaction · result invariant"
        ],
        "diagram": {
          "caption": "After 단위 테스트 실패는 HTTP 계약이 아니라 현재 테스트가 관찰하는 Service 반환값 또는 예외 타입이 달라졌다는 신호입니다.",
          "lanes": [
            {
              "id": "expected-before",
              "label": "Before expectation",
              "description": "변경 전 통과 결과를 비교 기준으로 유지합니다.",
              "steps": [
                {
                  "from": "baseline-tests",
                  "to": "before-service",
                  "verb": "기준 동작 실행",
                  "payload": "same Service inputs",
                  "kind": "call"
                },
                {
                  "from": "before-service",
                  "to": "baseline-evidence",
                  "verb": "기대 결과 기록",
                  "payload": "return values + exception types",
                  "kind": "response"
                }
              ]
            },
            {
              "id": "changed-after",
              "label": "After mismatch",
              "description": "마지막 구조 변경에서 의도하지 않은 동작 변화가 생겼는지 좁힙니다.",
              "steps": [
                {
                  "from": "after-tests",
                  "to": "after-service",
                  "verb": "같은 단위 테스트 실행",
                  "payload": "same inputs and prepared collaborators",
                  "kind": "compare"
                },
                {
                  "from": "after-service",
                  "to": "changed-behavior",
                  "verb": "차이 감지",
                  "payload": "return value 또는 exception type mismatch",
                  "kind": "failure",
                  "check": "HTTP status나 response body 검증으로 확대하지 않습니다."
                }
              ]
            }
          ],
          "notReached": [
            {
              "label": "Service behavior preserved",
              "reason": "After 단위 테스트가 실패해 invariant를 확정할 수 없습니다."
            }
          ]
        },
        "snapshot": [
          {
            "label": "Invariant",
            "value": "Service 단위 동작 변경 감지",
            "tone": "blocked"
          },
          {
            "label": "After tests",
            "value": "실패",
            "tone": "blocked"
          }
        ],
        "evidence": "리팩토링 후 테스트 실패는 입력, Repository 상호작용, 반환값과 예외 타입이 유지되는지 확인하게 합니다.",
        "outcome": "구조 개선과 기능 변경을 섞지 않고 마지막 책임 변경을 되짚습니다.",
        "stopAfter": 2
      },
      {
        "id": "refactor-package-expansion",
        "label": "범위가 커진 변경",
        "flowId": "service-split",
        "tone": "warning",
        "prompt": "작은 helper 분리와 feature-based package 이동을 한 번에 섞으려는 경우 범위를 비교합니다.",
        "route": [
          "혼합된 Service 책임",
          "작은 helper 분리",
          "Feature-based package 이동",
          "회귀 테스트"
        ],
        "diagram": {
          "caption": "이번 반복은 작은 helper 분리와 같은 Service 단위 테스트까지이며 feature-based package 이동은 안전망 이후의 별도 선택지입니다.",
          "lanes": [
            {
              "id": "current-refactor-scope",
              "label": "Current verified scope",
              "description": "검증 가능한 한 번의 구조 변경만 적용하고 같은 테스트로 닫습니다.",
              "steps": [
                {
                  "from": "before-service",
                  "to": "responsibility-review",
                  "verb": "현재 후보 식별",
                  "payload": "mixed Service responsibility",
                  "kind": "compare"
                },
                {
                  "from": "responsibility-review",
                  "to": "helper-extraction",
                  "verb": "작은 범위 선택",
                  "payload": "helper extraction only",
                  "kind": "transform"
                },
                {
                  "from": "helper-extraction",
                  "to": "after-service",
                  "verb": "책임 분리",
                  "payload": "Service + named helpers",
                  "kind": "transform"
                },
                {
                  "from": "after-tests",
                  "to": "after-service",
                  "verb": "회귀 확인",
                  "payload": "same Service unit tests",
                  "kind": "compare"
                },
                {
                  "from": "after-service",
                  "to": "invariant-evidence",
                  "verb": "현재 범위 종료",
                  "payload": "unit behavior preserved",
                  "kind": "response"
                }
              ]
            }
          ],
          "notReached": [
            {
              "label": "Feature-based package move",
              "reason": "더 큰 구조 변경은 테스트 안전망을 확인한 뒤 별도 반복으로 검토합니다."
            }
          ]
        },
        "snapshot": [
          {
            "label": "현재 범위",
            "value": "작은 책임 분리까지",
            "tone": "warning"
          },
          {
            "label": "Package 이동",
            "value": "후속 선택지",
            "tone": "warning"
          }
        ],
        "evidence": "feature-based package 이동은 테스트 안전망을 만든 뒤 검토할 후속 선택지이며 이번 직접 범위가 아닙니다.",
        "outcome": "패키지 개편을 섞지 않고 현재 테스트로 확인 가능한 책임 분리에 집중합니다.",
        "stopAfter": 1
      }
    ]
  },
  "repo": {
    "name": "spring-boot-refactoring-foundation-lab",
    "path": "spring-boot-refactoring-foundation-lab"
  },
  "defaultSequence": "11",
  "actors": [
    {
      "id": "developer",
      "label": "개발자",
      "kind": "person"
    },
    {
      "id": "tests",
      "label": "Regression Tests",
      "kind": "ci"
    },
    {
      "id": "service",
      "label": "PostService",
      "kind": "logic"
    },
    {
      "id": "validation",
      "label": "Validation Helper",
      "kind": "logic"
    },
    {
      "id": "repository",
      "label": "PostRepository",
      "kind": "logic"
    }
  ],
  "flows": [
    {
      "id": "before-after-test",
      "title": "리팩토링 전후 검증 흐름",
      "summary": "리팩토링은 먼저 동작 기준을 세우고, 작은 변경 후 같은 테스트로 보존 여부를 확인합니다.",
      "mermaid": "sequenceDiagram\n  actor Developer\n  participant Test as Existing tests\n  participant Service as Service code\n  participant Refactor as Refactoring step\n  Developer->>Test: run baseline tests\n  Test-->>Developer: current behavior evidence\n  Developer->>Service: find mixed responsibility\n  Developer->>Refactor: split small responsibility\n  Refactor->>Test: run tests again\n  Test-->>Developer: behavior preserved or failure",
      "steps": [
        {
          "order": 1,
          "actor": "Developer",
          "input": "현재 코드",
          "owner": "Baseline test",
          "action": "리팩토링 전 테스트를 실행해 현재 동작 기준을 확인합니다.",
          "output": "Baseline result",
          "note": "기준 없이 구조를 바꾸면 동작 변경을 놓치기 쉽습니다.",
          "id": "before-after-test-step-1",
          "from": "Developer",
          "to": "Baseline test",
          "message": "리팩토링 전 테스트를 실행해 현재 동작 기준을 확인합니다.",
          "messageKind": "request",
          "problem": "현재 코드",
          "concept": "Baseline test",
          "check": "Baseline result",
          "codePointIds": [
            "service-responsibility",
            "regression-test"
          ]
        },
        {
          "order": 2,
          "actor": "Developer",
          "input": "Service method",
          "owner": "Code smell review",
          "action": "검증, 조회, 변환, 예외 처리 책임이 섞인 지점을 찾습니다.",
          "output": "Refactoring target",
          "note": "리팩토링은 읽기 좋은 이름 바꾸기가 아니라 변경 비용을 줄이는 작업입니다.",
          "id": "before-after-test-step-2",
          "from": "Developer",
          "to": "Code smell review",
          "message": "검증, 조회, 변환, 예외 처리 책임이 섞인 지점을 찾습니다.",
          "messageKind": "error",
          "problem": "Service method",
          "concept": "Code smell review",
          "check": "Refactoring target",
          "codePointIds": [
            "regression-test",
            "service-responsibility"
          ]
        },
        {
          "order": 3,
          "actor": "Developer",
          "input": "Refactoring target",
          "owner": "Responsibility split",
          "action": "작은 helper나 별도 책임으로 흐름을 나눕니다.",
          "output": "Refactored flow",
          "note": "한 번에 큰 구조 변경을 하지 않고 검증 가능한 단위로 진행합니다.",
          "id": "before-after-test-step-3",
          "from": "Developer",
          "to": "Responsibility split",
          "message": "작은 helper나 별도 책임으로 흐름을 나눕니다.",
          "messageKind": "request",
          "problem": "Refactoring target",
          "concept": "Responsibility split",
          "check": "Refactored flow",
          "codePointIds": [
            "service-responsibility",
            "regression-test"
          ]
        },
        {
          "order": 4,
          "actor": "Developer",
          "input": "Refactored flow",
          "owner": "Tests",
          "action": "같은 테스트를 다시 실행합니다.",
          "output": "Pass or failure reason",
          "note": "테스트 실패는 구조 이동 문제인지 동작 변경인지 먼저 구분합니다.",
          "id": "before-after-test-step-4",
          "from": "Developer",
          "to": "Tests",
          "message": "같은 테스트를 다시 실행합니다.",
          "messageKind": "response",
          "problem": "Refactored flow",
          "concept": "Tests",
          "check": "Pass or failure reason",
          "codePointIds": [
            "regression-test",
            "service-responsibility"
          ]
        }
      ],
      "bandKind": "scenario"
    },
    {
      "id": "service-split",
      "title": "Service 책임 분리 흐름",
      "summary": "입력 검증, 비즈니스 판단, 저장소 호출, 응답 변환을 한 흐름 안에서 역할별로 읽습니다.",
      "steps": [
        {
          "order": 1,
          "actor": "Request",
          "input": "DTO",
          "owner": "Validation candidate",
          "action": "Service 안에 섞인 기본 입력 검증 후보를 찾습니다.",
          "output": "Validation boundary",
          "note": "검증이 어디에 있어야 읽기 쉬운지 판단합니다.",
          "id": "service-split-step-1",
          "from": "Request",
          "to": "Validation candidate",
          "message": "Service 안에 섞인 기본 입력 검증 후보를 찾습니다.",
          "messageKind": "request",
          "problem": "DTO",
          "concept": "Validation candidate",
          "check": "Validation boundary",
          "codePointIds": [
            "service-responsibility",
            "regression-test"
          ]
        },
        {
          "order": 2,
          "actor": "Service",
          "input": "Validated input",
          "owner": "Business rule",
          "action": "작성자 확인이나 상태 판단 같은 비즈니스 조건을 분리합니다.",
          "output": "Rule result",
          "note": "정책 판단은 이름이 드러나는 작은 단위가 좋습니다.",
          "id": "service-split-step-2",
          "from": "Service",
          "to": "Business rule",
          "message": "작성자 확인이나 상태 판단 같은 비즈니스 조건을 분리합니다.",
          "messageKind": "request",
          "problem": "Validated input",
          "concept": "Business rule",
          "check": "Rule result",
          "codePointIds": [
            "regression-test",
            "service-responsibility"
          ]
        },
        {
          "order": 3,
          "actor": "Service",
          "input": "Rule result",
          "owner": "Repository",
          "action": "저장소 호출은 필요한 순간에만 모아둡니다.",
          "output": "Domain data",
          "note": "저장소 호출과 응답 변환이 섞이면 흐름을 추적하기 어렵습니다.",
          "id": "service-split-step-3",
          "from": "Service",
          "to": "Repository",
          "message": "저장소 호출은 필요한 순간에만 모아둡니다.",
          "messageKind": "request",
          "problem": "Rule result",
          "concept": "Repository",
          "check": "Domain data",
          "codePointIds": [
            "service-responsibility",
            "regression-test"
          ]
        },
        {
          "order": 4,
          "actor": "Service",
          "input": "Domain data or exception",
          "owner": "ErrorResponse / Response DTO",
          "action": "성공과 실패 출력을 일관된 모양으로 정리합니다.",
          "output": "API result",
          "note": "리팩토링 후에도 외부 동작은 유지되어야 합니다.",
          "id": "service-split-step-4",
          "from": "Service",
          "to": "ErrorResponse / Response DTO",
          "message": "성공과 실패 출력을 일관된 모양으로 정리합니다.",
          "messageKind": "error",
          "problem": "Domain data or exception",
          "concept": "ErrorResponse / Response DTO",
          "check": "API result",
          "codePointIds": [
            "regression-test",
            "service-responsibility"
          ]
        }
      ],
      "bandKind": "scenario"
    }
  ],
  "flow": [
    {
      "id": "before-after-test-step-1",
      "label": "Baseline test",
      "problem": "현재 코드",
      "concept": "Baseline test",
      "action": "리팩토링 전 테스트를 실행해 현재 동작 기준을 확인합니다.",
      "check": "Baseline result",
      "codePointIds": [
        "service-responsibility",
        "regression-test"
      ]
    },
    {
      "id": "before-after-test-step-2",
      "label": "Code smell review",
      "problem": "Service method",
      "concept": "Code smell review",
      "action": "검증, 조회, 변환, 예외 처리 책임이 섞인 지점을 찾습니다.",
      "check": "Refactoring target",
      "codePointIds": [
        "regression-test",
        "service-responsibility"
      ]
    },
    {
      "id": "before-after-test-step-3",
      "label": "Responsibility split",
      "problem": "Refactoring target",
      "concept": "Responsibility split",
      "action": "작은 helper나 별도 책임으로 흐름을 나눕니다.",
      "check": "Refactored flow",
      "codePointIds": [
        "service-responsibility",
        "regression-test"
      ]
    },
    {
      "id": "before-after-test-step-4",
      "label": "Tests",
      "problem": "Refactored flow",
      "concept": "Tests",
      "action": "같은 테스트를 다시 실행합니다.",
      "check": "Pass or failure reason",
      "codePointIds": [
        "regression-test",
        "service-responsibility"
      ]
    }
  ],
  "codePoints": [
    {
      "id": "service-responsibility",
      "title": "Service는 저장 흐름을 한 곳에서 조립합니다",
      "file": "src/main/kotlin/com/andi/rest_crud/service/PostService.kt",
      "language": "kotlin",
      "snippet": "fun create(request: PostCreateRequest, authorEmail: String): PostResponse {\n    val savedPost = postRepository.save(\n        PostEntity(\n            title = request.title,\n            content = request.content,\n            author = authorEmail\n        )\n    )\n\n    return PostResponse.from(savedPost)\n}",
      "explanation": "현재 starter code에서 생성, 저장, 응답 변환이 한 Service 흐름에 모여 있음을 먼저 확인합니다.",
      "check": "함수 분리 후 API 응답 모양이 바뀌지 않았는지 테스트로 확인합니다."
    },
    {
      "id": "regression-test",
      "title": "리팩토링 전후 테스트로 동작을 고정합니다",
      "file": "src/test/kotlin/com/andi/rest_crud/service/PostServiceTest.kt",
      "language": "kotlin",
      "snippet": "@Test\nfun `create는 요청 값을 저장하고 응답으로 돌려준다`() {\n    val request = TestFixtureFactory.postCreateRequest()\n    val savedPost = TestFixtureFactory.postEntity(\n        id = 1L,\n        title = request.title,\n        content = request.content,\n        author = \"owner@example.com\"\n    )\n    `when`(postRepository.save(any(PostEntity::class.java))).thenReturn(savedPost)\n\n    val result = postService.create(request, \"owner@example.com\")\n\n    assertEquals(1L, result.id)\n    assertEquals(\"owner@example.com\", result.author)\n}",
      "explanation": "구조를 바꾸기 전에 현재 성공 기대값을 테스트로 붙잡습니다.",
      "check": "리팩토링 전후 같은 테스트 명령이 통과하는지 비교합니다."
    }
  ],
  "concepts": [
    {
      "title": "동작 보존이 먼저입니다",
      "body": "구조 변경 전후 같은 기능이 유지되는지 테스트로 확인합니다."
    },
    {
      "title": "책임 분리는 읽기 비용을 줄입니다",
      "body": "입력 검증, 비즈니스 판단, 저장소 호출, 응답 변환을 구분합니다."
    },
    {
      "title": "Feature-based 관점",
      "body": "기능 단위로 코드를 찾기 쉽게 만들 수 있지만 패키지 이동 자체가 목표는 아닙니다."
    },
    {
      "title": "리팩토링 의도를 문서로 남깁니다",
      "body": "다음 변경자가 왜 이 구조인지 이해할 수 있어야 합니다."
    }
  ],
  "practice": [
    "리팩토링 전후 같은 테스트가 통과하는지 확인했나요?",
    "이 메서드는 입력 정리와 비즈니스 검증을 동시에 하고 있나요?",
    "패키지 이동이 아니라 책임 분리 기준을 설명할 수 있나요?",
    "실패 응답 모양이 리팩토링 후에도 유지되는지 확인했나요?"
  ],
  "mentorHints": [],
  "relatedDocs": [],
  "relatedCode": [],
  "topic": "Refactoring and foundation reinforcement",
  "question": "코드 구조를 바꿔도 기능이 그대로라는 것을 무엇으로 확인할까?",
  "source": {
    "theory": "../../../theory.md",
    "implementation": "../../../implementation.md",
    "checklist": "../../../checklist.md"
  },
  "why": {
    "problem": "기능이 늘어난 Service는 입력 정리, 검증, 저장소 호출, 응답 변환, 예외 처리가 한 메서드에 섞이기 쉽습니다.",
    "limits": [
      "리팩토링 전 테스트가 없으면 구조 변경 중 동작을 바꿨는지 알기 어렵습니다.",
      "패키지 이동만 하고 책임 경계가 그대로면 다음 변경 비용이 줄지 않습니다.",
      "실패 응답과 검증 흐름을 함께 보강하지 않으면 구조만 바뀐 코드가 됩니다."
    ],
    "choice": "먼저 테스트로 현재 동작을 고정하고, Service 책임을 작게 분리한 뒤 검증과 예외 응답을 보강합니다."
  },
  "overview": [
    "Code Smell",
    "Baseline Test",
    "Responsibility Split",
    "Validation",
    "ErrorResponse",
    "Refactored Flow",
    "Tests Verify"
  ],
  "responsibilities": [
    {
      "name": "Baseline tests",
      "role": "리팩토링 전 현재 동작을 고정합니다.",
      "caution": "테스트 없이 구조부터 바꾸면 동작 변경을 놓치기 쉽습니다."
    },
    {
      "name": "Service",
      "role": "비즈니스 흐름을 조립하되 책임이 과도하게 섞이지 않게 나눕니다.",
      "caution": "모든 검증과 변환, 저장소 호출이 한 메서드에 몰리면 읽기 어렵습니다."
    },
    {
      "name": "GlobalExceptionHandler",
      "role": "실패를 일관된 응답으로 바꿉니다.",
      "caution": "리팩토링 중 실패 응답 모양이 바뀌지 않게 확인합니다."
    },
    {
      "name": "Documentation",
      "role": "무엇을 바꿨는가보다 왜 이 경계로 나눴는가를 남깁니다.",
      "caution": "구조 변경 이유가 없으면 다음 사람이 다시 되돌릴 수 있습니다."
    }
  ],
  "glossary": [
    {
      "term": "Refactoring",
      "meaning": "외부 동작은 유지하면서 내부 구조를 더 이해하기 쉽게 바꾸는 작업입니다.",
      "caution": "기능 추가나 동작 변경과 구분합니다."
    },
    {
      "term": "Code smell",
      "meaning": "변경 비용이 커질 가능성을 보여주는 구조적 신호입니다.",
      "caution": "모든 smell을 한 번에 고치려 하면 범위가 커집니다."
    },
    {
      "term": "Feature-based structure",
      "meaning": "기능 기준으로 관련 코드를 가까이 두는 구조입니다.",
      "caution": "계층 기준 구조와 장단점을 비교해야 합니다."
    },
    {
      "term": "Service validation",
      "meaning": "Service 안의 비즈니스 검증과 입력 정리 후보입니다.",
      "caution": "요청 형식 검증과 비즈니스 규칙을 섞지 않습니다."
    },
    {
      "term": "Behavior preservation",
      "meaning": "구조 변경 후에도 외부 동작이 유지되는 상태입니다.",
      "caution": "테스트 없이 말로만 보장하기 어렵습니다."
    }
  ],
  "practical": [
    {
      "title": "리팩토링은 코드 미화가 아닙니다",
      "body": "다음 변경 때 수정 지점을 더 빨리 찾고 위험을 줄이는 작업입니다."
    },
    {
      "title": "큰 이동보다 작은 검증 단위가 안전합니다",
      "body": "작게 나누고 테스트를 반복해야 실패 지점을 찾기 쉽습니다."
    },
    {
      "title": "이벤트 기반 구조는 다음 범위입니다",
      "body": "이번에는 요청/응답 코드의 책임 분리와 테스트 보강에 집중합니다."
    }
  ],
  "checks": [
    "리팩토링 전후 같은 테스트가 통과하는지 확인했나요?",
    "이 메서드는 입력 정리와 비즈니스 검증을 동시에 하고 있나요?",
    "패키지 이동이 아니라 책임 분리 기준을 설명할 수 있나요?",
    "실패 응답 모양이 리팩토링 후에도 유지되는지 확인했나요?"
  ],
  "next": {
    "id": "12",
    "title": "Event Driven",
    "reason": "요청/응답 구조의 책임을 정리했다면, 다음에는 주문 생성과 후속 알림을 이벤트 흐름으로 분리하는 사고를 다룹니다."
  },
  "sourceDocs": []
};
