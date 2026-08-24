/* 상세: 예약 실행. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['scheduling'] = {
  why: "반복 작업(야간 CI 실패 분석, 주간 의존성 점검, 문서 최신화)은 사람이 기억해서 실행하는 순간 누락된다. 판정 기준은 스케줄이나 외부 사건을 트리거로 에이전트가 무인 실행되는지로 잡았다. 이 기능이 없으면 자동화는 사람이 앉아 있는 시간 안으로 제한된다.",
  tools: {
    bob: {
      bullets: [
        "공식 문서, 체인지로그, 사내 발표자료에서 예약 실행·cron·이벤트 트리거 기능을 찾지 못함",
        "발표자료는 CI/CD 내재화를 도입 3단계 목표로 제시하지만 제품 기능으로서의 스케줄러는 언급되지 않음",
        "IBM 확인 필요 — 임의로 미지원으로 판정하지 않는다"
      ],
      media: null,
      source: null,
    },
    claude: {
      bullets: [
        "Anthropic 관리 클라우드에서 실행돼 노트북이 꺼져 있어도 계속 동작",
        "트리거 3종 — 스케줄(시간·일·주 프리셋, 커스텀 cron, 최소 주기 1시간), HTTP API, GitHub 이벤트(PR·릴리스, 필터 지정 가능)",
        "웹·데스크톱·CLI(/schedule)에서 생성하고, Team·Enterprise 관리자가 조직 전체에 대해 끌 수 있음",
        "단, 리서치 프리뷰 단계이며 동작·한도·API가 바뀔 수 있다고 문서에 명시"
      ],
      media: { src: "assets/img/scheduling/claude.png", caption: "Claude Code Routines" },
      source: SRC.claudeRoutines,
    },
    codex: {
      bullets: [
        "예약·반복 작업을 문서화된 기능으로 제공",
        "설정에서 새 PR 자동 리뷰를 상시 실행"
      ],
      media: { src: "assets/img/scheduling/codex.png", caption: "Codex의 예약 작업" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "cron 기반 예약으로 주간 보안 스캔, 야간 테스트 커버리지 리포트, 일간 의존성 점검을 무인 실행",
        "PR 리뷰·보안 감사·테스트 생성·버그 트리아지 템플릿 제공",
        "웹훅으로 외부 사건에서 트리거"
      ],
      media: { src: "assets/img/scheduling/cursor.png", caption: "Cursor Automations" },
      source: SRC.cursorAuto,
    }
  },
  verdict: "경영 관점에서 이 항목이 뜻하는 바는 단순하다. 나머지 셋은 사람이 없는 시간에도 일하고 Bob은 그렇지 않다. 특히 Bob이 강점으로 내세우는 보안 스캔과 코드 품질 점검은 상시 반복이 본질인 작업이므로, 경쟁 도구가 이를 야간 예약으로 돌리는 동안 Bob은 개발자가 /review를 실행할 때만 돈다. 기능 목록 비교에서는 잘 드러나지 않지만 실제 운영에서는 격차가 누적되는 항목이다.",
};
