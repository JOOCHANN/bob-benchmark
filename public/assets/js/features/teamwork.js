/* 상세: 팀으로 쓰기. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['teamwork'] = {
  why: "도입 규모가 개발조직을 넘어가는지를 가르는 항목이다. 개발자 도구로 남으면 좌석 수가 개발자 수로 묶이고, 기획·QA·운영까지 넓어지면 같은 계약으로 얻는 범위가 달라진다. 판정 기준은 비개발 구성원이 쓸 수 있는 별도 표면이 있는지로 잡았다. 관리자 화면은 관리 기능이므로 여기에 해당하지 않는다.",
  tools: {
    bob: {
      bullets: [
        "엔터프라이즈 역할이 User와 Admin 두 종류이며, 둘 다 좌석을 소비하고 Bob 자체는 IDE·터미널로만 쓴다",
        "팀·좌석·예산 관리는 잘 갖춰져 있으나 이는 관리 기능이며 비개발자가 작업을 맡기는 표면이 아님",
        "발표자료가 Product Owner·PM·Business Analyst·QA 등 13개 직무를 대상으로 그리지만, 그 직무들이 접근하는 표면은 문서에 제시되지 않음",
        "비개발자용 표면 존재 여부 IBM 확인 필요"
      ],
      media: null,
      source: SRC.bobUsers,
    },
    claude: {
      bullets: [
        "코딩이 아닌 일반 업무를 에이전트에 맡기는 Cowork를 별도 제품으로 제공. 2026-01 데스크톱 출시 후 2026-07-07 웹·모바일로 확장(베타, Max 플랜 우선)",
        "Anthropic 서버의 원격 세션으로 돌아 모든 기기가 꺼져 있어도 예약 작업이 진행되고, 판단이 필요하면 휴대폰으로 확인을 요청",
        "Slack에서 팀 구성원이 버그 리포트를 올리면 PR로 돌아오는 경로 제공"
      ],
      media: { src: "assets/img/teamwork/claude.png", caption: "Claude Cowork" },
      source: SRC.claudeCowork,
    },
    codex: {
      bullets: [
        "Slack 채널·스레드에서 @Codex 멘션으로 작업을 생성해 개발자가 아닌 구성원도 지시 가능",
        "코딩 외 업무를 위한 별도 제품은 아님"
      ],
      media: { src: "assets/img/teamwork/codex.png", caption: "Codex Slack 연동" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "Slack 봇과 웹 앱으로 IDE 밖에서 작업 지시 가능",
        "JIRA·GitHub Issues 연동으로 티켓에서 작업 시작"
      ],
      media: { src: "assets/img/teamwork/cursor.png", caption: "Cursor Slack 연동" },
      source: SRC.cursorSlack,
    }
  },
  verdict: "이 항목은 Bob의 포지셔닝과 가장 크게 어긋나는 지점이다. 발표자료는 Bob을 13개 직무가 참여하는 조직 단위 SDLC 파트너로 제시하지만, 확인된 접근 경로는 개발자용 IDE와 터미널뿐이다. 반면 Anthropic은 Cowork를 별도 제품으로 내어 비개발 업무를 정면으로 겨냥한다. 도입 규모를 개발조직 밖으로 넓히는 것이 목표라면 이 행이 결론을 바꾼다. 개발자 도구로만 쓸 계획이라면 가중치가 낮다.",
};
