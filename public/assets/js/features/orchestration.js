/* 상세: 병렬 작업. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['orchestration'] = {
  why: "단일 에이전트는 컨텍스트가 길어질수록 정확도가 떨어진다. 작업을 쪼개 각각 독립 컨텍스트에서 처리하면 대규모 변경에서 처리량과 정확도가 함께 올라간다. 비용 관점도 있다 — 탐색 단계를 서브에이전트에 격리하면 메인 컨텍스트가 부풀지 않는다.",
  tools: {
    bob: {
      bullets: [
        "서브에이전트가 독립 컨텍스트 창에서 지정된 작업을 수행하고 결과 요약만 본 대화로 돌려줌. 생성 전 사용자 승인 필요",
        "문서가 강조하는 용도는 병렬 처리보다 컨텍스트 오염 방지 — 코드베이스 탐색처럼 맥락을 많이 먹는 작업을 격리",
        "모델이 한 턴에 여러 도구를 요청해 함께 실행하는 병렬 도구 호출을 별도로 지원",
        "v2.0.0(2026-06)에 추가된 기능으로 Claude Code보다 늦게 도입됐다"
      ],
      media: { src: "assets/img/orchestration/bob.png", caption: "Bob의 서브에이전트" },
      source: SRC.bobSubagents,
    },
    claude: {
      bullets: [
        "역할별 서브에이전트를 정의해 독립 컨텍스트에서 병렬 실행. 리드 에이전트가 분배와 병합을 조율",
        "여러 전체 세션을 한 화면에서 동시에 돌리는 백그라운드 에이전트 뷰 제공"
      ],
      media: { src: "assets/img/orchestration/claude.png", caption: "Claude Code의 서브에이전트" },
      source: SRC.claude,
    },
    codex: {
      bullets: [
        "격리 환경에서 여러 클라우드 작업을 동시에 실행",
        "한 작업 안에서 에이전트를 분기시키는 구조와는 결이 다름"
      ],
      media: { src: "assets/img/orchestration/codex.png", caption: "Codex의 병렬 작업" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "클라우드 에이전트를 여러 개 동시에 띄워 격리된 VM에서 병렬 처리",
        "한 작업 안에서 서브에이전트로 분기하는 기능의 범위는 공식 문서로 확정하지 못함"
      ],
      media: { src: "assets/img/orchestration/cursor.png", caption: "Cursor의 클라우드 에이전트" },
      source: SRC.cursorAuto,
    }
  },
  verdict: "병렬 실행 자체는 Claude Code가 동등하게, 그리고 더 먼저 제공했으므로 \"몇 개를 동시에 돌리는가\"는 변별점이 아니다. Bob의 차이는 분기 단위를 SDLC 역할과 모드로 잡는다는 점이며, 앞의 산출물 체계와 묶일 때만 의미가 생긴다. 기술적 병렬성만 필요하다면 이 항목은 Bob을 고를 이유가 되지 않는다.",
};
