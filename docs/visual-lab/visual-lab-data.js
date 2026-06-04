window.visualLabData = {
  "kind": "hub",
  "sequence": "11",
  "title": "Refactoring Foundation Visual Lab",
  "description": "리팩토링 전후 동작을 테스트로 고정하고 Service 책임, 검증, 예외 응답, 문서 의도를 함께 정리합니다.",
  "repo": {
    "name": "spring-boot-refactoring-foundation-lab",
    "path": "spring-boot-refactoring-foundation-lab"
  },
  "visualLabPath": "docs/visual-lab/index.html",
  "visualLabHubPath": "docs/visual-lab/index.html",
  "flow": [
    {
      "id": "refactoring-flow",
      "label": "Refactoring safety",
      "problem": "리팩토링을 코드 미화로만 보면 동작 보존과 책임 분리 기준이 사라집니다.",
      "concept": "Behavior preservation, responsibility split, tests",
      "action": "테스트로 기준을 고정한 뒤 책임이 섞인 Service 흐름을 작게 나눕니다.",
      "check": "리팩토링 전후 같은 테스트가 통과하는지 확인합니다."
    }
  ],
  "sequences": [
    {
      "sequence": "11",
      "id": "11",
      "title": "Refactoring Foundation",
      "topic": "Refactoring and foundation reinforcement",
      "href": "./sequences/11/index.html",
      "summary": "코드 구조를 바꿔도 기능이 그대로라는 것을 무엇으로 확인할까?"
    }
  ]
};
