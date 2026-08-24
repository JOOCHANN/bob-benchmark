/* 상세: SDK. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['embedding'] = {
  why: "도구를 UI로만 쓸 수 있으면 자동화의 상한이 제품이 제공하는 기능까지로 고정된다. 판정 기준은 벤더가 SDK를 제공해 에이전트를 우리 코드 안에서 호출하고 오케스트레이션·권한까지 제어할 수 있는지로 잡았다. 비대화형 CLI 호출만 되는 경우는 부분으로 둔다.",
  tools: {
    bob: {
      bullets: [
        "Bob Shell의 비대화형 세션(bob -p)으로 스크립트·자동화에서 호출하고 파이프로 입력을 넘길 수 있음",
        "에이전트를 우리 코드에 임베딩하는 SDK는 공식 문서 전체에서 확인되지 않음 — 자동화의 형태가 셸 호출로 제한된다",
        "watsonx Orchestrate SDK 연동은 Bob으로 다른 에이전트를 만드는 용도이며 Bob 자체를 임베딩하는 수단이 아님"
      ],
      media: { src: "assets/img/embedding/bob.png", caption: "Bob Shell 비대화형 실행" },
      source: SRC.bobHeadless,
    },
    claude: {
      bullets: [
        "Agent SDK로 Claude Code의 도구·권한을 쓰는 자체 에이전트를 구축. Python·Node가 도는 곳이면 어디서든 호스팅",
        "오케스트레이션·도구 접근·권한을 코드로 제어",
        "claude -p로 유닉스 파이프에 끼워 넣는 방식도 지원"
      ],
      media: { src: "assets/img/embedding/claude.png", caption: "Claude Agent SDK" },
      source: SRC.claudeSdk,
    },
    codex: {
      bullets: [
        "SDK를 공식 문서에 두고 에이전트를 외부 시스템에 임베딩"
      ],
      media: { src: "assets/img/embedding/codex.png", caption: "Codex SDK" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "Cursor CLI로 GitHub Actions·스크립트에서 에이전트를 실행하고 커스텀 에이전트를 구성",
        "언어 SDK 형태의 임베딩 수단은 공식 문서로 확인하지 못함"
      ],
      media: { src: "assets/img/embedding/cursor.png", caption: "Cursor CLI" },
      source: SRC.cursorCli,
    }
  },
  verdict: "사내 플랫폼 팀이 에이전트를 자체 도구에 넣어 재판매하려는 계획이 있다면 이 항목이 결정적이다. Bob은 CLI 호출까지이므로 자동화의 형태가 셸 스크립트로 제한된다. 반대로 완성된 제품을 그대로 쓰는 것이 목표라면 이 축의 가중치는 낮다. 우리 조직의 계획이 어느 쪽인지에 따라 이 행은 무시해도 되는 항목이 된다.",
};
