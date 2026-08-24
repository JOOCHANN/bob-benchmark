/* 상세: 테스트. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['testing'] = {
  why: "에이전트가 만든 코드를 사람이 전부 읽어 검증하면 생산성 이득이 사라진다. 테스트를 스스로 쓰고 돌려 실패를 잡아내는지가 실사용 품질을 가른다.",
  tools: {
    bob: {
      bullets: [
        "Premium Package for Java에 단위 테스트 생성 워크플로를 두어, 실행 전에 테스트 전략을 구조화해 일관되고 측정 가능한 커버리지를 확보",
        "Agent 모드가 Execute 도구로 테스트를 직접 실행하고 Todo 도구로 진행을 추적",
        "사례: Java 현대화 과정에서 자동화 테스트 커버리지를 0에서 92%까지 확보 (Blue Pearl, IBM 제시 사례)"
      ],
      media: { src: "assets/img/testing/bob.png", caption: "Bob의 테스트 워크플로" },
      source: SRC.bobJavaWorkflows,
    },
    claude: {
      bullets: [
        "테스트를 먼저 쓰고 통과할 때까지 반복하는 작업 방식 지원",
        "실패 로그를 읽어 수정까지 이어감"
      ],
      media: { src: "assets/img/testing/claude.png", caption: "Claude Code의 테스트 루프" },
      source: SRC.claude,
    },
    codex: {
      bullets: [
        "격리 환경에서 테스트를 실행하고 결과를 반영",
        "실행 환경이 통제돼 재현성이 높음"
      ],
      media: { src: "assets/img/testing/codex.png", caption: "Codex의 테스트 실행" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "에이전트가 터미널로 테스트를 실행하고 결과를 반영",
        "Automations에 테스트 생성 템플릿을 제공해 예약 실행 가능"
      ],
      media: { src: "assets/img/testing/cursor.png", caption: "Cursor의 테스트 실행" },
      source: SRC.cursorAuto,
    }
  },
  verdict: "테스트를 쓰고 돌리는 능력 자체는 네 도구가 모두 갖췄다. 차이는 테스트를 코딩 작업의 일부로 보는가, 아니면 산출물과 게이트로 관리하는가에 있고 Bob은 후자에 가깝다. 다만 커버리지 0→92% 같은 수치는 테스트가 아예 없던 레거시 코드베이스에서 나온 값이므로, 이미 테스트가 있는 프로젝트의 기대치로 옮기면 과대평가가 된다.",
};
