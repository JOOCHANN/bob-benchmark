/* 상세: 코드 리뷰. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['code-review'] = {
  why: "에이전트가 코드를 빠르게 쏟아낼수록 병목은 작성이 아니라 리뷰로 옮겨간다. \"리뷰 기능이 있는가\"로 물으면 네 도구가 모두 있다고 답하므로 변별이 되지 않는다. 판정 기준은 지적 사항이 대화나 코멘트로 흩어지는가, 아니면 목록으로 남아 처리 상태를 추적할 수 있는가로 잡았다. 다만 이 기준은 리뷰가 일어나는 시점을 묻지 않는다는 한계가 있어, 각 칸에 그 시점을 함께 적었다.",
  tools: {
    bob: {
      bullets: [
        "/review로 선택한 브랜치 간 diff를 분석해 Findings 패널에 이슈를 심각도별로 누적. GitHub과 GitLab 브랜치 비교를 지원",
        "GitHub 이슈 URL을 함께 주면 변경이 그 요구사항을 충족하는지 검증 (이슈 검증은 GitHub 전용)",
        "리뷰는 자동 승인으로 진행돼 분석 단계마다 확인을 요구하지 않음. v2.0.1에서 Findings 아이콘에 심각도 색상 구분이 붙음",
        "단, 문서가 \"리뷰 워크플로는 전적으로 IDE 안에서 돈다\"고 명시한다 — 커밋 전 로컬 점검이며 PR마다 자동으로 도는 구조가 아니다"
      ],
      media: { src: "assets/img/code-review/bob.png", caption: "Bob의 Findings 패널" },
      source: SRC.bobReviews,
    },
    claude: {
      bullets: [
        "GitHub Code Review로 모든 PR에 자동 리뷰를 붙이고, 보안 리뷰 명령으로 변경분을 점검",
        "결과가 세션 출력이나 PR 코멘트로 남아, 미처리 항목을 목록으로 관리하는 구조는 아님",
        "리뷰 시점 면에서는 Bob보다 앞선다 — 사람이 실행하지 않아도 PR마다 돈다"
      ],
      media: { src: "assets/img/code-review/claude.png", caption: "Claude Code의 PR 리뷰" },
      source: SRC.claudeGha,
    },
    codex: {
      bullets: [
        "설정에서 Automatic reviews를 켜면 멘션 없이 새 PR을 자동 리뷰",
        "리뷰가 클라우드 작업으로 돌고 권한이 있으면 수정을 브랜치에 직접 푸시",
        "지적 사항의 처리 상태는 PR 도구 쪽에서 관리"
      ],
      media: { src: "assets/img/code-review/codex.png", caption: "Codex의 PR 리뷰" },
      source: SRC.codexUpgrades,
    },
    cursor: {
      bullets: [
        "Bugbot이 PR에 결함을 코멘트로 남기고 \"Fix in Cursor\"로 해당 코드로 점프",
        "Bugbot Autofix와 Security Review를 별도 기능으로 제공하며 관리자 화면에서 사용량을 분리해 집계",
        "Bugbot은 Pro 기준 사용자당 월 $40의 별도 과금"
      ],
      media: { src: "assets/img/code-review/cursor.png", caption: "Cursor의 Bugbot" },
      source: SRC.cursorPrice,
    }
  },
  verdict: "판정 기준을 \"목록으로 남는가\"로 잡으면 Bob이 앞서지만, 이 결론은 기준에 의존한다는 점을 분명히 해야 한다. 기준을 \"사람이 잊어도 리뷰가 도는가\"로 바꾸면 순위가 뒤집힌다. Bob 공식 문서가 리뷰 워크플로는 전적으로 IDE 안에서 돈다고 명시하므로 이건 추정이 아니라 확인된 사실이다 — 나머지 셋은 PR마다 자동으로 리뷰하고 Bob은 개발자가 /review를 쳐야 한다. 조직 관점에서 리뷰 누락을 막는 것은 목록보다 자동 실행이므로, 두 방식이 서로를 대체하지 못한다고 읽는 편이 정확하다. Bob의 위치는 \"커밋 전 로컬 게이트\"이고 경쟁 도구는 \"머지 전 PR 게이트\"다. 둘 다 필요한 조직이라면 Bob만으로는 후자가 비게 된다. 진단 품질은 형태와 별개이며, 우리 코드베이스의 오탐률은 파일럿으로 직접 재야 한다.",
};
