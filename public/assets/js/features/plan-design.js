/* 상세: 계획. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['plan-design'] = {
  why: "에이전트가 곧바로 파일을 고치기 시작하면 방향이 어긋난 뒤에야 발견하게 된다. 계획 단계를 분리하면 되돌리는 비용이 큰 작업일수록 이득이 커진다. 판정 기준은 계획을 별도 모드로 분리해 승인 대상으로 다루는지로 잡았다.",
  tools: {
    bob: {
      bullets: [
        "Plan 모드는 create-plan 스킬로 맥락을 모아 계획을 만들고, 사용자가 검토·승인한 뒤 다른 모드로 넘어가게 설계됨",
        "계획이 준비되면 Bob이 Plan → Agent로 모드를 스스로 전환해 이어서 진행",
        "Ask 모드는 파일 수정 없이 코드베이스 질의에만 쓰여 계획 단계의 안전장치로 동작"
      ],
      media: { src: "assets/img/plan-design/bob.png", caption: "Bob의 Plan 모드" },
      source: SRC.bobModes,
    },
    claude: {
      bullets: [
        "읽기 전용으로 조사한 뒤 계획을 제시하고 승인을 받음. 승인 전까지 파일 수정 차단",
        "VS Code 확장에서 계획 검토(plan review) UI 제공",
        "계획이 세션 산출물로 남으며, 문서 체계로 정의된 산출물은 아님"
      ],
      media: { src: "assets/img/plan-design/claude.png", caption: "Claude Code의 Plan 모드" },
      source: SRC.claude,
    },
    codex: {
      bullets: [
        "계획 전용 모드보다 실행 단위 승인 정책(approval modes)으로 통제",
        "계획 산출물 자체를 승인 대상으로 다루지는 않음"
      ],
      media: { src: "assets/img/plan-design/codex.png", caption: "Codex의 승인 모드" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "작업 전 계획을 세우고 사용자가 검토·수정",
        "계획에서 실행으로 넘어가는 연결이 매끄러움"
      ],
      media: { src: "assets/img/plan-design/cursor.png", caption: "Cursor의 Plan" },
      source: SRC.cursor,
    }
  },
  verdict: "계획 모드 자체는 세 도구가 갖췄고, 공식 문서로 보면 동작 범위도 사실상 같다 — 조사 후 계획을 제시하고 승인받은 뒤 구현으로 넘어간다. 초안은 Bob만 SRS·SDD 같은 정해진 문서를 만든다고 적었으나 공식 문서에 그런 내용이 없어 삭제했다. Bob 쪽에서 실제로 확인되는 차이는 두 가지로 작다. 계획 수립이 create-plan 스킬로 구현돼 있어 조직이 그 스킬을 수정할 수 있고, 계획이 준비되면 모드를 스스로 Agent로 바꿔 이어간다. 도입 판단을 가를 만한 차이는 아니다.",
};
