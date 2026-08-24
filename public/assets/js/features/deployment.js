/* 상세: 제공 형태. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['deployment'] = {
  why: "기능이 아무리 좋아도 이 항목에서 막히면 검토가 끝난다. 데이터 주권, 망 분리, 규제 요건이 있는 조직에서는 첫 번째 관문이며, 뒤에서 뒤집히지 않도록 가장 먼저 확인해야 한다.",
  tools: {
    bob: {
      bullets: [
        "2026-04-28 GA 시점에 SaaS로만 제공되며, 온프렘 배포는 데이터 레지던시·규제 요건 대응을 위해 향후 릴리스로 예정",
        "온프렘 제공 시점은 공표되지 않음",
        "데이터 위치·망 분리 요건이 있는 조직에는 현시점 제약"
      ],
      media: { src: "assets/img/deployment/bob.png", caption: "Bob의 제공 형태" },
      source: SRC.bobNews,
    },
    claude: {
      bullets: [
        "Amazon Bedrock, Google Cloud Vertex, Microsoft Foundry를 통한 모델 접근 경로 지원 — 기업 클라우드 계정 안에서 처리",
        "apps gateway로 자체 호스팅 control plane과 기업 SSO 구성",
        "코드가 나가는 경계를 조직이 선택할 여지가 네 도구 중 가장 넓음",
        "단, 이 경로를 쓰면 Analytics API 집계가 빠지고 Routines를 쓸 수 없다 — 통제와 기능이 상충한다"
      ],
      media: { src: "assets/img/deployment/claude.png", caption: "Claude Code의 배포 옵션" },
      source: SRC.claudeDeploy,
    },
    codex: {
      bullets: [
        "벤더 서비스 경유가 전제",
        "로컬 CLI 실행은 가능하나 모델 호출은 외부로 나감"
      ],
      media: { src: "assets/img/deployment/codex.png", caption: "Codex의 제공 형태" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "코드 저장을 막는 프라이버시 모드 제공",
        "처리 자체는 벤더 인프라를 경유"
      ],
      media: { src: "assets/img/deployment/cursor.png", caption: "Cursor의 프라이버시 모드" },
      source: SRC.cursor,
    }
  },
  verdict: "Bob이 SaaS만 제공한다는 점은 IBM 자신이 향후 릴리스로 예고한 사항이므로 논쟁의 여지가 없다. 주의할 것은 이 제약이 앞의 통제 항목들과 곱해진다는 점이다. 정책 집행과 감사 추적을 근거로 Bob을 고른다는 것은 \"SaaS 경계를 받아들이되 그 안에서 통제를 강화한다\"는 선택이며, 데이터가 밖으로 나가는 것 자체가 요건 위반인 조직에서는 성립하지 않는다. 망 분리 환경이 대상이라면 온프렘 시점을 IBM에 먼저 확인하고, 그 답이 나온 뒤에 나머지 항목을 검토하는 것이 순서다.",
};
