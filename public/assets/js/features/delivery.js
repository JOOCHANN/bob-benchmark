/* 상세: CI/CD. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['delivery'] = {
  why: "개발 도구의 생산성 이득은 대개 \"코드가 작성된 시점\"에서 측정되지만 실제 리드타임은 그 이후 구간에서 더 많이 소모된다. 판정 기준은 벤더가 관리하는 CI/CD 통합 경로가 제품 문서에 있는지로 잡았다. \"CLI를 스크립트에서 부를 수 있다\"는 어느 CLI나 되는 얘기이므로 그것만으로는 기준을 넘지 못한다.",
  tools: {
    bob: {
      bullets: [
        "Bob Shell의 비대화형 세션(bob -p)으로 스크립트·배치 처리에서 호출하고, 파이프 입력과 출력 리다이렉트를 지원",
        "공식 문서가 Bob Shell의 용도로 \"CI/CD 통합\"을 명시",
        "비대화형 세션은 IBMid가 아니라 API 키 인증을 써야 하고 최초 실행 전 라이선스 동의가 필요 — CI 구성 시 확인할 조건",
        "다만 GitHub Actions·GitLab CI용 전용 통합이나 마켓플레이스 액션은 공식 문서에서 확인되지 않음"
      ],
      media: { src: "assets/img/delivery/bob.png", caption: "Bob Shell의 비대화형 실행" },
      source: SRC.bobHeadless,
    },
    claude: {
      bullets: [
        "GitHub Actions와 GitLab CI/CD용 전용 통합을 공식 문서로 제공",
        "비대화형 모드(claude -p)로 파이프에 끼워 넣거나 CI 단계로 실행",
        "Routines의 API 트리거로 배포 파이프라인이 배포 후 검증을 호출하는 구성 가능"
      ],
      media: { src: "assets/img/delivery/claude.png", caption: "Claude Code의 CI 통합" },
      source: SRC.claudeGha,
    },
    codex: {
      bullets: [
        "GitHub 통합으로 이슈·PR 이벤트에서 클라우드 작업을 실행하고 변경분을 PR로 제출",
        "릴리스 승인 자체를 조율하는 구조는 아님"
      ],
      media: { src: "assets/img/delivery/codex.png", caption: "Codex의 GitHub 연동" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "Cursor CLI를 GitHub Actions에서 실행해 문서 갱신·보안 리뷰를 자동화",
        "Automations로 파이프라인성 작업을 예약 실행"
      ],
      media: { src: "assets/img/delivery/cursor.png", caption: "Cursor CLI의 CI 실행" },
      source: SRC.cursorCli,
    }
  },
  verdict: "초안에서 이 항목은 Bob이 앞서는 것으로 판정돼 있었으나 유지되지 않는다. Bob도 공식 문서가 Bob Shell의 용도로 CI/CD 통합을 명시하므로 \"못 한다\"는 아니다. 차이는 성숙도다 — 나머지 셋은 벤더가 관리하는 액션·통합을 제공하고 Bob은 CLI를 직접 부르는 수준이다. 실무에서 걸릴 지점이 하나 더 있다. 비대화형 세션은 IBMid가 아니라 API 키 인증을 요구하므로, CI에서 쓰려면 키 발급·보관·회전 절차를 따로 세워야 한다. 우리 CI 환경에서 실제로 돌려 보고 확정할 항목이다.",
};
