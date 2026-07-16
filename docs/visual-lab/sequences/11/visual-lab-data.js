window.visualLabData = {
  "kind": "sequence",
  "sequence": "11",
  "title": "Refactoring Foundation",
  "subtitle": "Refactoring and foundation reinforcement",
  "goal": "테스트로 동작을 고정하고, Service 책임 분리와 검증/예외 응답 보강을 작은 단위로 진행합니다.",
  "problem": "기능이 늘어난 Service는 입력 정리, 검증, 저장소 호출, 응답 변환, 예외 처리가 한 메서드에 섞이기 쉽습니다.",
  "workbench": {
    "kind": "refactor",
    "title": "유지할 계약과 의도한 동작 보강",
    "instruction": "기존 assertion을 유지하는 구조 lane과 정규화·검증·예외 기대값을 추가하는 동작 보강 lane을 나눠 확인하세요.",
    "visual": {
      "src": "../../assets/diagrams/11-behavior-invariant.svg",
      "alt": "왼쪽은 기존 Service 반환값과 예외 assertion을 유지하며 helper를 분리하는 구조 리팩터링 lane이고, 오른쪽은 trim, validation, UserNotFound를 새 테스트로 확인하고 update 저장 호출은 코드에서 따로 확인하는 동작 보강 lane",
      "caption": "기존 테스트 subset은 유지하고, 새 값·예외 expectation과 명시적 저장 호출의 코드 증거를 분리합니다."
    },
    "terms": [
      { "term": "baseline", "meaning": "구조 변경 전에 테스트로 고정한 현재 동작 기준" },
      { "term": "invariant", "meaning": "기존 테스트가 단언했고 이번 변경에서도 유지하기로 한 Service 동작 subset" },
      { "term": "helper", "meaning": "Service의 한 가지 작은 책임을 이름으로 분리한 메서드" },
      { "term": "regression", "meaning": "구조 변경 때문에 이미 되던 동작이 깨지는 회귀" }
    ],
    "comparison": {
      "label": "구조 리팩터링과 동작 보강의 서로 다른 완료 조건",
      "left": {
        "title": "구조 리팩터링 lane",
        "body": "기존 create 기본 입력, 없는 post, login 성공·실패 assertion을 baseline으로 삼고 response 변환 같은 내부 책임을 재배치합니다."
      },
      "right": {
        "title": "의도한 동작 보강 lane",
        "body": "새 테스트는 email 정리, blank 검증, update의 trim된 반환값, UserNotFound 예외를 확인합니다. 명시적 update save는 코드에서 따로 확인합니다."
      }
    },
    "nodes": {
      "developer": {
        "label": "Developer",
        "icon": "person",
        "kind": "actor",
        "role": "작은 변경과 재검증을 반복",
        "systemLayer": "outside",
        "boundary": "Refactoring loop"
      },
      "service-input": {
        "label": "Service test input",
        "icon": "fixture",
        "kind": "test fixture",
        "role": "동일하게 유지할 입력과 mock 조건",
        "systemLayer": "outside",
        "boundary": "Unit test"
      },
      "baseline-tests": {
        "label": "PostServiceTest · AuthServiceTest",
        "icon": "test",
        "kind": "unit tests",
        "role": "현재 Service 동작의 비교 기준",
        "systemLayer": "outside",
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
        "systemLayer": "application",
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
        "systemLayer": "outside",
        "boundary": "Before evidence"
      },
      "responsibility-review": {
        "label": "Responsibility review",
        "icon": "refactor",
        "kind": "code review",
        "role": "입력 정리, 조회, 검증, 변환 혼합 지점 식별",
        "systemLayer": "outside",
        "boundary": "Structural change"
      },
      "helper-extraction": {
        "label": "Small helper extraction",
        "icon": "refactor",
        "kind": "refactoring operation",
        "role": "한 번에 하나의 책임을 이름 있는 단위로 분리",
        "systemLayer": "application",
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
        "systemLayer": "outside",
        "boundary": "After evidence",
        "codePointIds": [
          "regression-test"
        ]
      },
      "after-service": {
        "label": "After Service + helpers",
        "icon": "service",
        "kind": "refactored code",
        "role": "구조 재배치와 명시한 동작 보강을 함께 담은 목표 코드",
        "systemLayer": "application",
        "boundary": "After",
        "codePointIds": [
          "service-responsibility",
          "update-save-code"
        ]
      },
      "repository-collaborator": {
        "label": "Mocked repository condition",
        "icon": "repository",
        "kind": "test collaborator",
        "role": "테스트가 준비한 조회 또는 저장 결과",
        "systemLayer": "resource",
        "boundary": "Unit test"
      },
      "invariant-evidence": {
        "label": "Service behavior preserved",
        "icon": "evidence",
        "kind": "invariant result",
        "role": "유지하기로 한 기존 assertion subset의 단위 테스트 결과",
        "systemLayer": "outside",
        "boundary": "Invariant"
      },
      "behavior-reinforcement": {
        "label": "정규화·검증·예외 보강",
        "icon": "refactor",
        "kind": "intentional behavior change",
        "role": "trim·blank·UserNotFound 계약 변경과 명시적 update save 코드 확인",
        "systemLayer": "application",
        "boundary": "동작 보강"
      },
      "new-contract-tests": {
        "label": "새 계약 단위 테스트",
        "icon": "test",
        "kind": "new behavior evidence",
        "role": "trim된 반환값, blank 검증, UserNotFound 예외 기대값 검증",
        "systemLayer": "outside",
        "boundary": "동작 보강 증거"
      },
      "changed-behavior": {
        "label": "Behavior change detected",
        "icon": "evidence",
        "kind": "failure evidence",
        "role": "반환값 또는 예외 타입 차이를 알리는 테스트 실패",
        "systemLayer": "outside",
        "boundary": "Invariant"
      },
      "package-move": {
        "label": "Feature-based package move",
        "icon": "refactor",
        "kind": "later scope",
        "role": "안전망 이후 검토할 더 큰 구조 변경",
        "systemLayer": "application",
        "boundary": "Later scope"
      }
    },
    "scenarios": [
      {
        "id": "refactor-baseline",
        "label": "리팩터링 시작 전",
        "flowId": "before-after-test",
        "tone": "signal",
        "prompt": "Service 구조를 아직 바꾸지 않았습니다. 같은 입력으로 After와 비교할 기준을 무엇으로 남길지 예측합니다.",
        "observationTitle": "구조 변경 전에 기존 테스트가 단언한 Service 동작 subset을 고정하는 경로",
        "theoryRef": "../../../theory.md#seq-11",
        "reflection": {
          "prompt": "Before baseline이 실제로 보호하는 Service assertion subset을 적어보세요.",
          "hint": "create 기본 입력, 없는 post, login 성공·실패를 기준으로 삼고 모든 입력이나 HTTP 계약까지 과장하지 마세요."
        },
        "prediction": {
          "prompt": "helper를 추출하기 전에 먼저 기록할 기준은 무엇일까요?",
          "options": [
            { "id": "baseline", "label": "변경 전 단위 테스트 결과" },
            { "id": "files", "label": "변경 후 파일 수" },
            { "id": "package", "label": "새 패키지 위치" }
          ],
          "answer": "baseline",
          "explanation": "통과한 Before 기준이 있어야 After 실패가 구조 변경에서 생겼는지 비교할 수 있습니다."
        },
        "route": [
          "현재 Service 동작",
          "./gradlew test",
          "Baseline result"
        ],
        "diagram": {
          "caption": "이 baseline은 HTTP 계약이나 모든 입력이 아니라 기존 PostServiceTest와 AuthServiceTest가 실제로 단언한 Service 반환값·예외 subset을 고정합니다.",
          "lanes": [
            {
              "id": "before-baseline",
              "label": "Before · Service 동작 기준",
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
                  ],
                  "effect": {
                    "kind": "verify",
                    "subject": "Before test result",
                    "before": "구조 변경 전 `PostServiceTest`와 `AuthServiceTest` 결과가 없음",
                    "after": "`./gradlew test`가 기존 Service assertion subset의 통과 여부를 기록함"
                  },
                  "evidenceScope": "test"
                },
                {
                  "from": "baseline-tests",
                  "to": "before-service",
                  "verb": "공개 메서드 호출",
                  "payload": "Service input + prepared collaborator result",
                  "kind": "call",
                  "effect": {
                    "kind": "transfer",
                    "subject": "Service test case",
                    "before": "fixture와 mock repository 응답이 test method에 준비됨",
                    "after": "같은 입력으로 Before Service 공개 메서드가 실행됨"
                  },
                  "evidenceScope": "test"
                },
                {
                  "from": "before-service",
                  "to": "baseline-evidence",
                  "verb": "현재 동작 기록",
                  "payload": "return values + exception types",
                  "kind": "response",
                  "check": "현재 테스트는 HTTP path, status, body를 검증하지 않습니다.",
                  "effect": {
                    "kind": "preserve",
                    "subject": "Service 동작 baseline",
                    "before": "Before Service가 반환 값 또는 예외를 냄",
                    "after": "기존 테스트가 단언한 반환 값과 예외 타입만 구조 변경 baseline으로 고정됨"
                  },
                  "evidenceScope": "test"
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
            "value": "기존 assertion subset",
            "tone": "signal"
          }
        ],
        "evidence": "기존 PostServiceTest와 AuthServiceTest는 create 기본 입력, 없는 post, login 성공·잘못된 password의 Service 결과만 baseline으로 제공합니다.",
        "outcome": "통과한 baseline이 있어야 After 실패가 구조 변경에서 생겼는지 비교할 수 있습니다."
      },
      {
        "id": "refactor-small-split",
        "label": "구조 분리 + 동작 보강",
        "flowId": "service-split",
        "tone": "recovered",
        "prompt": "response 변환 helper 재배치와 정규화·검증·예외 보강을 함께 검토합니다. 어떤 결과를 유지하고 어떤 결과를 새로 정의할지 예측합니다.",
        "observationTitle": "기존 assertion 보존과 의도한 새 기대값을 두 lane으로 검증하는 경로",
        "theoryRef": "../../../theory.md#seq-11",
        "reflection": {
          "prompt": "구조 lane에서 유지할 subset과 동작 보강 lane에서 달라질 기대값을 각각 적어보세요.",
          "hint": "기존 create·getById·login assertion과 새 trim·validation·UserNotFound assertion을 분리하세요."
        },
        "prediction": {
          "prompt": "이번 목표를 정확히 설명한 선택은 무엇일까요?",
          "options": [
            { "id": "behavior", "label": "기존 subset은 유지하고 새 계약은 명시" },
            { "id": "helpers", "label": "private helper 개수" },
            { "id": "package", "label": "파일 위치" }
          ],
          "answer": "behavior",
          "explanation": "구조 재배치에는 기존 assertion을 적용합니다. trim·validation·UserNotFound는 새 expectation으로, 명시적 update save는 코드로 따로 확인합니다."
        },
        "route": [
          "Baseline tests",
          "PostService · AuthService",
          "작은 helper 추출",
          "기존 테스트 재실행",
          "새 계약 테스트 추가"
        ],
        "diagram": {
          "caption": "왼쪽은 기존 Service assertion subset을 유지하는 구조 lane입니다. 오른쪽은 새 테스트가 확인하는 값·예외와 코드에서 확인할 update save를 구분합니다.",
          "lanes": [
            {
              "id": "before-lane",
              "label": "Before · 동일 입력",
              "description": "현재 Service 단위 동작을 변경 전 기준으로 남깁니다.",
              "steps": [
                {
                  "from": "baseline-tests",
                  "to": "service-input",
                  "verb": "fixture 준비",
                  "payload": "same requests and mock conditions",
                  "kind": "config",
                  "effect": {
                    "kind": "transfer",
                    "subject": "test fixture",
                    "before": "After와 비교할 request와 repository 조건이 정해지지 않음",
                    "after": "`TestFixtureFactory`와 mock stubbing이 같은 입력 조건을 만듦"
                  },
                  "evidenceScope": "test"
                },
                {
                  "from": "service-input",
                  "to": "before-service",
                  "verb": "현재 구현 실행",
                  "payload": "public Service methods",
                  "kind": "call",
                  "effect": {
                    "kind": "transfer",
                    "subject": "Before Service behavior",
                    "before": "fixture와 mock 조건만 준비되고 Service 결과는 없음",
                    "after": "현재 create 기본 입력, getById 실패, login 성공·실패가 준비된 조건으로 실행됨"
                  },
                  "evidenceScope": "test"
                },
                {
                  "from": "before-service",
                  "to": "baseline-evidence",
                  "verb": "기준 저장",
                  "payload": "return values + exception types",
                  "kind": "response",
                  "effect": {
                    "kind": "preserve",
                    "subject": "Before assertion",
                    "before": "현재 Service 실행 결과가 assertion과 비교되지 않음",
                    "after": "반환 값과 예외 타입이 Before test assertion으로 기록됨"
                  },
                  "evidenceScope": "test"
                }
              ]
            },
            {
              "id": "structural-change-lane",
              "label": "내부 책임 분리",
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
                  ],
                  "effect": {
                    "kind": "verify",
                    "subject": "Service 책임 경계",
                    "before": "`create`가 entity 생성·save·response 변환을 한 흐름에서 수행함",
                    "after": "review가 response 변환 재배치와 별도 동작 보강 후보를 구분함"
                  },
                  "evidenceScope": "code"
                },
                {
                  "from": "responsibility-review",
                  "to": "helper-extraction",
                  "verb": "작은 변경 선택",
                  "payload": "one named responsibility",
                  "kind": "transform",
                  "effect": {
                    "kind": "transform",
                    "subject": "리팩토링 단위",
                    "before": "여러 책임이 한 번에 변경 후보로 남아 있음",
                    "after": "동작을 바꾸지 않는 response 변환 책임만 구조 helper 후보가 됨"
                  },
                  "evidenceScope": "code"
                },
                {
                  "from": "helper-extraction",
                  "to": "after-service",
                  "verb": "책임 재배치",
                  "payload": "Service orchestration + private helpers",
                  "kind": "transform",
                  "effect": {
                    "kind": "transform",
                    "subject": "Service 내부 구조",
                    "before": "response 변환 호출이 여러 Service 본문에 직접 놓여 있음",
                    "after": "같은 변환 결과를 내는 이름 있는 helper로 호출 위치만 재배치됨"
                  },
                  "evidenceScope": "code"
                }
              ]
            },
            {
              "id": "after-invariant-lane",
              "label": "구조 lane · 기존 subset 보존",
              "description": "동작을 바꾸지 않는 helper 재배치에 기존 Service assertion subset을 적용합니다.",
              "steps": [
                {
                  "from": "repository-collaborator",
                  "to": "after-service",
                  "verb": "같은 조건 제공",
                  "payload": "prepared repository result",
                  "kind": "config",
                  "effect": {
                    "kind": "transfer",
                    "subject": "repository stub",
                    "before": "After Service용 repository 결과가 설정되지 않음",
                    "after": "Before와 같은 find·save 결과가 mock repository에 설정됨"
                  },
                  "evidenceScope": "test"
                },
                {
                  "from": "after-tests",
                  "to": "after-service",
                  "verb": "같은 테스트 재실행",
                  "payload": "same inputs and assertions",
                  "kind": "compare",
                  "codePointIds": [
                    "regression-test"
                  ],
                  "effect": {
                    "kind": "verify",
                    "subject": "After test result",
                    "before": "helper 추출 뒤 기존 assertion subset 보존 여부가 정해지지 않음",
                    "after": "기존 create·getById·login input과 assertion이 After Service를 다시 검사함"
                  },
                  "evidenceScope": "test"
                },
                {
                  "from": "after-service",
                  "to": "invariant-evidence",
                  "verb": "동작 비교 통과",
                  "payload": "same asserted Service results",
                  "kind": "response",
                  "check": "private helper 모양이 아니라 기존 테스트가 단언한 Service 반환값·예외만 비교합니다.",
                  "effect": {
                    "kind": "preserve",
                    "subject": "기존 Service assertion subset",
                    "before": "After 내부 메서드 구조는 Before와 다름",
                    "after": "유지 대상으로 정한 기존 반환값·예외 assertion이 그대로 통과함"
                  },
                  "evidenceScope": "test"
                }
              ]
            },
            {
              "id": "behavior-reinforcement-lane",
              "label": "동작 보강 lane · test와 code 증거",
              "description": "Before와 달라지는 값·예외 expectation은 단위 테스트로, 명시적 update save는 목표 코드로 확인합니다.",
              "steps": [
                {
                  "from": "responsibility-review",
                  "to": "behavior-reinforcement",
                  "verb": "의도한 차이 선택",
                  "payload": "email trim·lowercase · blank validation · trimmed update result · UserNotFound · explicit save code",
                  "kind": "compare",
                  "effect": {
                    "kind": "transform",
                    "subject": "Service 변경 증거 목록",
                    "before": "구조 재배치와 값·예외 변경 후보가 한 목록에 섞여 있음",
                    "after": "테스트할 값·예외와 코드에서 확인할 save 호출이 별도 증거로 분리됨"
                  },
                  "evidenceScope": "code"
                },
                {
                  "from": "behavior-reinforcement",
                  "to": "after-service",
                  "verb": "새 계약 구현",
                  "payload": "normalized values + validation exception + repository.save",
                  "kind": "transform",
                  "codePointIds": [
                    "update-save-code"
                  ],
                  "effect": {
                    "kind": "transform",
                    "subject": "보강된 Service behavior",
                    "before": "시작 Service는 공백 정리·blank 검증·설명적 사용자 없음 예외를 제공하지 않음",
                    "after": "목표 Service가 정리된 값, 새 검증 예외, 명시적 update save, UserNotFound를 제공함"
                  },
                  "evidenceScope": "code"
                },
                {
                  "from": "new-contract-tests",
                  "to": "after-service",
                  "verb": "새 기대값 검증",
                  "payload": "normalization · validation · trimmed return · exception assertions",
                  "kind": "compare",
                  "check": "현재 update 테스트의 save stubbing은 호출 검증이 아닙니다.",
                  "effect": {
                    "kind": "verify",
                    "subject": "의도한 Service 동작 보강",
                    "before": "새 값과 예외가 목표 계약대로 동작하는지 미확인 상태",
                    "after": "추가 단위 테스트가 trim된 반환값·validation·UserNotFound 기대를 판정함"
                  },
                  "evidenceScope": "test"
                }
              ]
            }
          ]
        },
        "snapshot": [
          {
            "label": "After",
            "value": "기존 assertion subset 통과",
            "tone": "recovered"
          },
          {
            "label": "동작 보강",
            "value": "값·예외 expectation 통과",
            "tone": "recovered"
          },
          {
            "label": "update save",
            "value": "목표 코드에서 확인",
            "tone": "signal"
          }
        ],
        "evidence": "구조 lane은 기존 Service assertion subset을 재실행합니다. 새 단위 테스트는 trim된 반환값·validation·UserNotFound를 확인하며, 명시적 update save는 테스트가 아니라 목표 코드에서 확인합니다.",
        "outcome": "유지한 Service 결과와 의도적으로 달라진 Service 결과를 같은 ‘동작 보존’ 문장으로 합치지 않습니다."
      },
      {
        "id": "refactor-contract-changed",
        "label": "유지 subset의 예상 밖 불일치",
        "flowId": "before-after-test",
        "tone": "blocked",
        "prompt": "동작을 바꾸지 않기로 한 구조 lane에서 기존 Service 반환값 또는 예외 assertion이 달라졌습니다. 첫 조사 범위를 예측합니다.",
        "observationTitle": "유지 대상으로 정한 assertion 차이만 회귀로 좁히는 경로",
        "theoryRef": "../../../theory.md#seq-11",
        "reflection": {
          "prompt": "같은 테스트가 달라졌을 때 가장 먼저 되짚을 범위를 적어보세요.",
          "hint": "새 계약 테스트가 아니라 유지하기로 한 기존 assertion인지 먼저 확인하세요."
        },
        "prediction": {
          "prompt": "유지하기로 한 기존 테스트에서 반환값이나 예외가 달라졌다면 무엇을 의심해야 할까요?",
          "options": [
            { "id": "refactor", "label": "정상적인 구조 개선 결과" },
            { "id": "behavior", "label": "구조 변경에 섞인 기능 동작 변경" },
            { "id": "coverage", "label": "테스트가 너무 많이 통과한 상태" }
          ],
          "answer": "behavior",
          "explanation": "구조 lane은 기존 assertion subset을 보존해야 합니다. 의도한 새 계약과 구분한 뒤 마지막 책임 재배치에서 차이를 좁힙니다."
        },
        "route": [
          "Baseline tests",
          "Service 검증 분리",
          "After unit tests",
          "Same input · asserted result invariant"
        ],
        "diagram": {
          "caption": "이 경로는 HTTP 계약이나 의도한 새 기대값이 아니라 유지 대상으로 정한 기존 Service 반환값·예외 assertion의 실패만 다룹니다.",
          "lanes": [
            {
              "id": "expected-before",
              "label": "Before 기대 결과",
              "description": "변경 전 통과 결과를 비교 기준으로 유지합니다.",
              "steps": [
                {
                  "from": "baseline-tests",
                  "to": "before-service",
                  "verb": "기준 동작 실행",
                  "payload": "same Service inputs",
                  "kind": "call",
                  "effect": {
                    "kind": "transfer",
                    "subject": "Before expectation",
                    "before": "같은 Service 입력의 기대 값과 예외가 아직 없음",
                    "after": "Before Service 실행이 비교용 반환 값 또는 예외를 만듦"
                  },
                  "evidenceScope": "test"
                },
                {
                  "from": "before-service",
                  "to": "baseline-evidence",
                  "verb": "기대 결과 기록",
                  "payload": "return values + exception types",
                  "kind": "response",
                  "effect": {
                    "kind": "preserve",
                    "subject": "expected behavior",
                    "before": "Before 실행 값이 test expectation으로 고정되지 않음",
                    "after": "반환 값과 예외 타입이 After 비교 기준으로 기록됨"
                  },
                  "evidenceScope": "test"
                }
              ]
            },
            {
              "id": "changed-after",
              "label": "After 결과 불일치",
              "description": "마지막 구조 변경에서 의도하지 않은 동작 변화가 생겼는지 좁힙니다.",
              "steps": [
                {
                  "from": "after-tests",
                  "to": "after-service",
                  "verb": "같은 단위 테스트 실행",
                  "payload": "same inputs and prepared collaborators",
                  "kind": "compare",
                  "effect": {
                    "kind": "verify",
                    "subject": "After assertion",
                    "before": "After Service 결과와 baseline의 일치 여부가 정해지지 않음",
                    "after": "같은 mock 조건의 assertion이 return·exception 차이를 검사함"
                  },
                  "evidenceScope": "test"
                },
                {
                  "from": "after-service",
                  "to": "changed-behavior",
                  "verb": "차이 감지",
                  "payload": "return value 또는 exception type mismatch",
                  "kind": "failure",
                  "check": "HTTP status나 response body 검증으로 확대하지 않습니다.",
                  "effect": {
                    "kind": "gate",
                    "subject": "Service regression",
                    "before": "After 반환 값 또는 예외 타입이 baseline과 다름",
                    "after": "mismatch assertion에서 test가 실패해 리팩토링 완료가 차단됨"
                  },
                  "evidenceScope": "test"
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
        "evidence": "구조 재배치 후 실패한 기존 assertion만 회귀 후보입니다. 새 trim·validation·UserNotFound expectation은 Before와 달라도 의도한 보강입니다.",
        "outcome": "구조 개선과 기능 변경을 섞지 않고 마지막 책임 변경을 되짚습니다.",
        "stopAfter": 2
      },
      {
        "id": "refactor-package-expansion",
        "label": "helper·package 이동 동시 변경",
        "flowId": "service-split",
        "tone": "warning",
        "prompt": "작은 helper 분리와 feature-based package 이동을 한 변경에 함께 넣으려 합니다. 현재 테스트로 닫을 수 있는 범위를 예측합니다.",
        "observationTitle": "현재 테스트로 닫을 수 있는 가장 작은 책임 분리 경로",
        "theoryRef": "../../../theory.md#seq-11",
        "reflection": {
          "prompt": "helper 추출과 package 이동을 분리해야 하는 이유를 적어보세요.",
          "hint": "현재 테스트가 확인 가능한 작은 변경을 먼저 완료하세요."
        },
        "prediction": {
          "prompt": "현재 테스트 안전망에서 가장 작은 검증 가능한 변경은 무엇일까요?",
          "options": [
            { "id": "helper", "label": "Service 안의 작은 helper 책임 분리" },
            { "id": "package", "label": "feature package 전체 이동" },
            { "id": "contract", "label": "API 계약과 구조를 동시에 변경" }
          ],
          "answer": "helper",
          "explanation": "패키지 이동은 후속 선택지입니다. 현재 범위에서는 같은 Service 단위 테스트로 확인 가능한 작은 책임 분리가 안전합니다."
        },
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
              "label": "현재 테스트로 닫는 범위",
              "description": "검증 가능한 한 번의 구조 변경만 적용하고 같은 테스트로 닫습니다.",
              "steps": [
                {
                  "from": "before-service",
                  "to": "responsibility-review",
                  "verb": "현재 후보 식별",
                  "payload": "mixed Service responsibility",
                  "kind": "compare",
                  "effect": {
                    "kind": "verify",
                    "subject": "현재 변경 범위",
                    "before": "Service에 helper 추출과 package 이동 후보가 함께 있음",
                    "after": "현재 단위 테스트로 보존 여부를 확인할 response 변환 재배치를 먼저 고름"
                  },
                  "evidenceScope": "code"
                },
                {
                  "from": "responsibility-review",
                  "to": "helper-extraction",
                  "verb": "작은 범위 선택",
                  "payload": "helper extraction only",
                  "kind": "transform",
                  "effect": {
                    "kind": "gate",
                    "subject": "helper extraction scope",
                    "before": "package 이동까지 포함하면 변경 파일과 원인이 함께 늘어남",
                    "after": "이번 반복은 Service 내부 helper 한 개와 관련 test로 제한됨"
                  },
                  "evidenceScope": "code"
                },
                {
                  "from": "helper-extraction",
                  "to": "after-service",
                  "verb": "책임 분리",
                  "payload": "Service + named helpers",
                  "kind": "transform",
                  "effect": {
                    "kind": "transform",
                    "subject": "Service responsibility",
                    "before": "response 변환 호출이 orchestration에 직접 섞여 있음",
                    "after": "동일 결과를 내는 변환 책임만 private helper로 이동하고 public signature는 유지됨"
                  },
                  "evidenceScope": "code"
                },
                {
                  "from": "after-tests",
                  "to": "after-service",
                  "verb": "회귀 확인",
                  "payload": "same Service unit tests",
                  "kind": "compare",
                  "effect": {
                    "kind": "verify",
                    "subject": "Service unit behavior",
                    "before": "helper 이동 뒤 기존 create·getById·login assertion subset이 미확인 상태",
                    "after": "같은 Service unit tests가 유지 대상으로 정한 반환값과 예외를 검사함"
                  },
                  "evidenceScope": "test"
                },
                {
                  "from": "after-service",
                  "to": "invariant-evidence",
                  "verb": "현재 범위 종료",
                  "payload": "unit behavior preserved",
                  "kind": "response",
                  "effect": {
                    "kind": "preserve",
                    "subject": "검증된 refactor scope",
                    "before": "helper 추출 뒤 unit behavior 비교가 끝나지 않음",
                    "after": "기존 assertion이 통과해 package 이동 없이 현재 반복이 종료됨"
                  },
                  "evidenceScope": "test"
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
      "summary": "기존 assertion subset을 유지하는 구조 변경과 새 expectation을 추가하는 동작 보강을 분리해 검증합니다.",
      "mermaid": "sequenceDiagram\n  actor Developer\n  participant Existing as Existing assertion subset\n  participant Service as Service code\n  participant Refactor as Structural split\n  participant New as New contract tests\n  Developer->>Existing: run baseline subset\n  Developer->>Refactor: move response responsibility\n  Refactor->>Existing: rerun preserved assertions\n  Developer->>Service: add normalization and validation\n  Service->>New: verify intentional differences\n  New-->>Developer: preserved subset + new behavior result",
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
          "action": "기존 assertion과 새 expectation을 구분해 실행합니다.",
          "output": "보존 결과와 동작 보강 결과",
          "note": "기존 subset 실패는 구조 회귀 후보이고 새 expectation은 의도한 차이를 검증합니다.",
          "id": "before-after-test-step-4",
          "from": "Developer",
          "to": "Tests",
          "message": "기존 assertion과 새 expectation을 구분해 실행합니다.",
          "messageKind": "response",
          "problem": "Refactored flow",
          "concept": "Tests",
          "check": "보존 결과와 동작 보강 결과",
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
      "summary": "응답 변환 재배치는 구조 lane으로 읽습니다. 입력 정규화·검증·예외는 새 테스트로, 명시적 저장은 코드로 확인합니다.",
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
          "owner": "기존 validateAuthor helper",
          "action": "실습 시작 코드에 이미 분리된 작성자 확인 경계를 검토합니다.",
          "output": "Existing helper boundary",
          "note": "validateAuthor를 이번 변경에서 새로 추출한 helper로 설명하지 않습니다.",
          "id": "service-split-step-2",
          "from": "Service",
          "to": "기존 validateAuthor helper",
          "message": "이미 분리된 작성자 확인 책임을 검토합니다.",
          "messageKind": "request",
          "problem": "Validated input",
          "concept": "Existing helper",
          "check": "Starter helper boundary",
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
          "action": "목표 코드가 update 뒤 repository.save를 명시하는지 읽습니다.",
          "output": "Domain data",
          "note": "현재 단위 테스트의 stubbing은 save 호출을 verify한 증거가 아닙니다.",
          "id": "service-split-step-3",
          "from": "Service",
          "to": "Repository",
          "message": "목표 코드의 명시적 저장 호출을 확인합니다.",
          "messageKind": "request",
          "problem": "Rule result",
          "concept": "Repository",
          "check": "Domain data",
          "codePointIds": [
            "update-save-code"
          ]
        },
        {
          "order": 4,
          "actor": "Service",
          "input": "Domain data or exception",
          "owner": "Service result",
          "action": "구조 lane의 기존 결과와 의도한 새 예외를 구분합니다.",
          "output": "DTO return or Service exception",
          "note": "UserNotFound는 401에서 404로 바꾸려는 계약이며 현재 단위 테스트는 HTTP status와 body를 검증하지 않습니다.",
          "id": "service-split-step-4",
          "from": "Service",
          "to": "Service result",
          "message": "유지할 결과와 의도한 예외 변경을 나눕니다.",
          "messageKind": "error",
          "problem": "Domain data or exception",
          "concept": "Service contract",
          "check": "Web status is not unit-tested",
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
      "action": "기존 assertion과 새 expectation을 구분해 실행합니다.",
      "check": "Preserved subset and intentional changes",
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
      "snippet": "val savedPost = postRepository.save(\n    PostEntity(\n        title = request.title,\n        content = request.content,\n        author = authorEmail\n    )\n)\n\nreturn PostResponse.from(savedPost)",
      "explanation": "실습 시작 코드의 실제 create 본문에서 entity 생성, 저장, 응답 변환이 한 흐름에 모여 있음을 먼저 확인합니다.",
      "check": "구조 재배치 뒤 기존 단위 테스트가 단언한 Service 반환값을 비교합니다."
    },
    {
      "id": "regression-test",
      "title": "리팩토링 전후 테스트로 동작을 고정합니다",
      "file": "src/test/kotlin/com/andi/rest_crud/service/PostServiceTest.kt",
      "language": "kotlin",
      "snippet": "@Test\nfun `getById는 없는 게시글 id면 예외 흐름을 확인한다`() {\n    `when`(postRepository.findById(999L)).thenReturn(Optional.empty())\n\n    assertThrows(PostNotFoundException::class.java) {\n        postService.getById(999L)\n    }\n}",
      "explanation": "구조를 바꾸기 전에 없는 게시글의 Service 예외 타입을 기존 assertion으로 붙잡습니다.",
      "check": "이 기존 assertion은 보존하고 새 정규화·검증 expectation은 별도로 추가합니다."
    },
    {
      "id": "update-save-code",
      "title": "명시적 update save는 목표 코드에서 확인합니다",
      "file": "src/main/kotlin/com/andi/rest_crud/service/PostService.kt",
      "language": "kotlin",
      "snippet": "applyUpdate(post, command)\nval updatedPost = postRepository.save(post)\nreturn toResponse(updatedPost)",
      "explanation": "완성 목표 코드는 변경한 entity를 명시적으로 저장합니다. 현재 단위 테스트는 save 결과를 stubbing하지만 호출 자체를 verify하지 않습니다.",
      "check": "trim된 반환값의 테스트 증거와 repository.save 호출의 코드 증거를 구분합니다."
    }
  ],
  "concepts": [
    {
      "title": "보존 범위를 먼저 정합니다",
      "body": "기존 assertion subset은 유지하고 의도한 정규화·검증·예외 변경은 새 테스트로 구분합니다."
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
    "구조 lane의 기존 assertion과 동작 보강 lane의 새 expectation을 구분했나요?",
    "이 메서드는 입력 정리와 비즈니스 검증을 동시에 하고 있나요?",
    "패키지 이동이 아니라 책임 분리 기준을 설명할 수 있나요?",
    "Service 예외 타입 변경을 의도한 계약으로 테스트했나요? HTTP status는 별도 검증했나요?"
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
      "구조 변경과 새 예외 계약을 한 기준으로 묶으면 의도한 401→404와 회귀를 구분하기 어렵습니다."
    ],
    "choice": "기존 assertion을 지키는 구조 lane과 새 값·예외를 확인하는 동작 보강 lane을 분리하고, 테스트하지 않은 저장 호출은 코드 증거로 남깁니다."
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
      "caution": "기존 구조 lane의 응답만 유지합니다. UserNotFound의 401→404는 의도한 변경이며 현재 단위 테스트는 HTTP status와 body를 증명하지 않습니다."
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
      "meaning": "구조 변경 뒤에도 유지하기로 한 기존 assertion subset이 통과하는 상태입니다.",
      "caution": "의도한 정규화·예외 변경까지 Before와 같다고 말하지 않습니다."
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
    "구조 lane의 기존 assertion과 동작 보강 lane의 새 expectation을 구분했나요?",
    "현재 update 테스트가 trim된 반환값까지만 증명하고 save 호출은 verify하지 않는다고 설명할 수 있나요?",
    "패키지 이동이 아니라 책임 분리 기준을 설명할 수 있나요?",
    "UserNotFound의 401→404가 의도한 변경이며 web test는 아직 없다고 구분했나요?"
  ],
  "next": {
    "id": "12",
    "title": "Event Driven",
    "reason": "요청/응답 구조의 책임을 정리했다면, 다음에는 주문 생성과 후속 알림을 이벤트 흐름으로 분리하는 사고를 다룹니다."
  },
  "sourceDocs": []
};
