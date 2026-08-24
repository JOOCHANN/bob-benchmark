/* 상세: 도구 연결. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['integration'] = {
  why: "사내 시스템에 접근하지 못하는 코딩 에이전트는 반쪽짜리다. MCP는 이 연결을 도구마다 새로 만들지 않고 한 번 만들어 재사용하게 해준다. 도입 검토에서는 \"우리가 만든 연동 자산이 도구를 바꿔도 살아남는가\"가 실질적 기준이 된다.",
  tools: {
    bob: {
      bullets: [
        "설정 패널에서 MCP 서버 추가·구성·제거. 로컬 실행과 원격 실행 모두 선택 가능",
        "v2.0.1에서 MCP 리소스·프롬프트를 @ 멘션과 / 액션으로 호출하고 서버 입력값을 검증",
        "Instana(관측), Turbonomic(리소스 최적화), Concert(취약성), Terraform, Vault 등 IBM·파트너 제품 연동을 활용 사례로 제시"
      ],
      media: { src: "assets/img/integration/bob.png", caption: "Bob의 MCP 설정" },
      source: SRC.bobLog,
    },
    claude: {
      bullets: [
        "MCP 표준을 제안한 주체로 로컬·원격 서버 모두 지원",
        "프로젝트/사용자 단위로 서버 범위 분리, 커밋 가능한 .mcp.json으로 팀 공유"
      ],
      media: { src: "assets/img/integration/claude.png", caption: "Claude Code의 MCP" },
      source: SRC.mcp,
    },
    codex: {
      bullets: [
        "설정 파일로 MCP 서버를 등록해 도구로 노출"
      ],
      media: { src: "assets/img/integration/codex.png", caption: "Codex의 MCP" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "설정 UI에서 MCP 서버를 등록해 에이전트 도구로 사용",
        "MCP Apps와 팀 마켓플레이스로 조직 내 배포"
      ],
      media: { src: "assets/img/integration/cursor.png", caption: "Cursor의 MCP" },
      source: SRC.cursor,
    }
  },
  verdict: "MCP는 네 도구 모두가 지원하는 사실상의 표준이 되었다. Bob의 차별점이 아니다. 다만 이는 사내 연동 자산이 특정 도구에 묶이지 않는다는 뜻이므로, 도입 판단에서는 전환 위험을 낮추는 근거로 읽는 편이 맞다. Bob 쪽에서 실제 차이가 나는 부분은 MCP 자체가 아니라 IBM 제품군과의 기성 연동이며, 그 제품들을 이미 쓰는 조직에서만 값이 된다.",
};
