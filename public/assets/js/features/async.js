/* 상세: 백그라운드 실행. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['async'] = {
  why: "오래 걸리는 작업을 로컬에서 돌리면 그 시간 동안 기계와 사람이 함께 묶인다. 클라우드에서 돌면 여러 작업을 동시에 던져 두고 결과만 확인하면 된다. 판정 기준은 벤더가 관리하는 실행 환경에서 작업이 돌고, 로컬 세션을 닫아도 계속되는지로 잡았다.",
  tools: {
    bob: {
      bullets: [
        "공식 문서, v1.0.1~v2.0.1 체인지로그, 사내 발표자료 전체에서 로컬 밖에서 도는 에이전트 기능을 찾지 못함",
        "사내에서 쓰는 Bob에 해당 기능이 있는지 IBM 확인 필요 — 없다고 확정할 근거도 아직 없으므로 비워 둔다"
      ],
      media: null,
      source: null,
    },
    claude: {
      bullets: [
        "웹·모바일에서 장시간 작업을 시작하고 로컬 설정 없이 실행. 노트북을 닫아도 계속됨",
        "claude --cloud로 로컬에서 시작한 작업을 클라우드로 넘기고, --teleport로 터미널로 회수",
        "클라우드 환경마다 네트워크 접근 수준·환경 변수·셋업 스크립트를 지정"
      ],
      media: { src: "assets/img/async/claude.png", caption: "Claude Code 클라우드 세션" },
      source: SRC.claudeWeb,
    },
    codex: {
      bullets: [
        "CLI·Slack·GitHub 이슈에서 작업을 던지면 격리된 클라우드 샌드박스에서 실행",
        "결과를 리뷰 가능한 diff로 받아 명령 한 번으로 로컬에 병합"
      ],
      media: { src: "assets/img/async/codex.png", caption: "Codex Cloud" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "2026-02 출시. Cursor의 격리된 VM에서 실행되며 웹·데스크톱·모바일·Slack·GitHub에서 접근",
        "GitHub 이슈를 읽어 브랜치를 만들고 PR 초안까지 작성",
        "로컬 자원을 쓰는 원격 에이전트와 클라우드 VM 에이전트를 구분해 제공"
      ],
      media: { src: "assets/img/async/cursor.png", caption: "Cursor Cloud Agents" },
      source: SRC.cursorAuto,
    }
  },
  verdict: "Bob을 제외한 셋이 2026년 상반기에 모두 이 방향으로 움직였다. 경쟁 도구들의 제품 개발 방향이 수렴한 지점이라는 뜻이므로, Bob에 이 기능이 없다면 로드맵상 격차로 다뤄야 한다. 실무 영향은 대규모 현대화에서 가장 크다 — 수십 개 모듈을 동시에 돌리려면 로컬 IDE 한 대가 병목이 된다. Bob의 강점인 현대화 시나리오에서 이 제약이 걸린다는 점을 함께 봐야 한다.",
};
