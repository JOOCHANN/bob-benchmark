/* 상세: 감사 기록. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['auditability'] = {
  why: "규제 대응과 사고 조사에서 요구되는 것은 결과물이 아니라 경위다. 판정 기준은 제3자가 사후에 경위를 재구성할 수 있는 기록이 제품 기능으로 있는지다. 개발자가 실수를 되돌리는 장치(체크포인트, 변경 이력)는 목적이 달라 여기에 해당하지 않는다.",
  tools: {
    bob: {
      bullets: [
        "Enterprise 활동 로그를 CADF(Cloud Auditing Data Federation) 표준 JSON으로 제공. action·outcome·eventTime·initiator.id 필드를 담고 시간 단위 파일로 내려받음",
        "업계 표준을 따르는 기계 판독 형식이라는 점은 분명한 강점이다",
        "그러나 기록 대상이 인증(로그인·로그아웃·토큰 갱신)과 관리 활동(사용자·팀·좌석 변경)뿐이다 — 에이전트가 무엇을 실행했는지는 남지 않는다",
        "IBM은 BobShell이 모든 에이전트 행위를 자기 문서화한다고 주장하지만 이에 대응하는 기능이 공식 문서에 없다",
        "판정 기준이 \"에이전트 행위의 경위\"이므로, 잘 만든 IAM 감사 로그가 있다는 사실로는 기준을 충족하지 못한다"
      ],
      media: { src: "assets/img/auditability/bob.png", caption: "Bob의 활동 로그" },
      source: SRC.bobActivityLog,
    },
    claude: {
      bullets: [
        "세션 기록과 훅으로 감사 로그를 구성할 수 있고, 클라이언트 텔레메트리는 배포 형태와 무관하게 동작",
        "Analytics API로 조직 단위 사용 이력을 반출 (단, Bedrock·Vertex·Foundry 경유 세션은 집계에서 빠짐)",
        "규제 대응 형식의 기록은 조직이 설계해야 함"
      ],
      media: { src: "assets/img/auditability/claude.png", caption: "Claude Code의 로그" },
      source: SRC.claudeAnalytics,
    },
    codex: {
      bullets: [
        "OpenTelemetry로 사용자 프롬프트, 도구 승인 결정, 도구 실행 결과, MCP 서버 사용, 네트워크 프록시 허용·차단 이벤트를 내보냄",
        "보안팀이 원래 요청과 도구 활동, 승인 결정, 차단 내역을 함께 조회해 사용자와 에이전트의 의도를 재구성할 수 있음",
        "Compliance Platform의 감사 로그와 Admin 감사·인증·Codex 사용 로그를 별도로 제공",
        "네 도구 중 에이전트 행위 수준의 기록을 1차 문서에 명시한 유일한 경우"
      ],
      media: { src: "assets/img/auditability/codex.png", caption: "Codex의 감사 로그" },
      source: SRC.codexGov,
    },
    cursor: {
      bullets: [
        "에디터 변경 이력과 체크포인트로 되돌리기 지원",
        "관리자 화면의 사용량 집계가 중심이며 경위 기록과는 층위가 다름"
      ],
      media: { src: "assets/img/auditability/cursor.png", caption: "Cursor의 체크포인트" },
      source: SRC.cursor,
    }
  },
  verdict: "되돌리기와 감사 추적을 같은 것으로 보면 판단을 그르친다는 초안의 지적은 맞다. 다만 그 기준을 네 도구에 똑같이 적용하면 Bob이 1위가 아니다. 공식 문서를 확인하니 Bob에는 CADF 표준을 따르는 제대로 된 감사 로그가 있었다 — 초안이 이를 놓치고 있었다. 문제는 범위다. Bob의 로그는 \"누가 로그인했고 관리자가 무엇을 바꿨는가\"를 남기고, Codex의 로그는 \"에이전트가 어떤 도구를 어떤 승인으로 실행했는가\"를 남긴다. 규제 대응에서 필요한 쪽은 대개 후자다. AI가 만든 코드에 문제가 생겼을 때 감사인이 묻는 것은 로그인 시각이 아니라 무엇이 실행됐는지이기 때문이다. IBM이 주장하는 BobShell 자기 문서화가 실제로 제품에 있고 반출 가능한 형식이라면 이 판정은 올라간다. IBM에 확인할 항목 목록에 이것을 넣어야 한다.",
};
