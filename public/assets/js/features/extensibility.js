/* 상세: 규칙·스킬. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['extensibility'] = {
  why: "MCP가 외부 시스템 연결이라면 이 항목은 에이전트 자신의 행동 규정이다. 층위가 달라 서로를 대체하지 못한다. 판정 기준은 두 가지다. 규칙과 워크플로를 코드로 관리해 팀이 공유할 수 있는가, 그리고 그 규칙을 사람의 준수에 맡기지 않고 훅으로 강제할 수 있는가.",
  tools: {
    bob: {
      bullets: [
        "커스텀 규칙을 전역(~/.bob/rules/)과 워크스페이스(.bob/)로 나눠 지정. 프로젝트 규칙은 코드와 함께 버전 관리되어 clone하면 팀원에게 전파되고 변경이 코드 리뷰를 거침",
        "마크다운 파일로 커스텀 슬래시 커맨드를 만들고, Bob IDE와 Bob Shell에서 동일하게 동작",
        "Skills로 체크리스트·템플릿 등 supporting file을 포함한 워크플로를 정의. 활성화 시 기본적으로 사용자 승인을 요구",
        "다만 에디터·커밋 이벤트에 스크립트를 걸는 훅이 공식 문서 전체에서 한 건도 확인되지 않는다 — 규칙은 프롬프트로 전달되며 코드로 차단되지 않는다"
      ],
      media: { src: "assets/img/extensibility/bob.png", caption: "Bob의 커스텀 규칙과 Skills" },
      source: SRC.bobSkills,
    },
    claude: {
      bullets: [
        "CLAUDE.md로 프로젝트 표준을 지정하고 세션 간 자동 메모리를 축적",
        "Skills로 반복 워크플로를 패키징해 팀이 공유. 저장소에 커밋하면 클라우드 세션에서도 동작",
        "Hooks로 파일 편집 후 자동 포맷, 커밋 전 린트 같은 규칙을 셸 명령으로 강제",
        "서브에이전트 정의와 플러그인으로 확장 단위를 조직 자산화"
      ],
      media: { src: "assets/img/extensibility/claude.png", caption: "Claude Code의 Skills와 Hooks" },
      source: SRC.claudeHooks,
    },
    codex: {
      bullets: [
        "AGENTS.md로 저장소 규칙을 정의 (Bob·Cursor도 같은 관례를 수용)",
        "커스텀 프롬프트, Skills·플러그인, 훅을 문서화된 확장 수단으로 제공"
      ],
      media: { src: "assets/img/extensibility/codex.png", caption: "Codex의 AGENTS.md" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "Rules와 Team Rules로 조직 전역 정책을 정의하고 Bugbot 규칙까지 적용",
        "Hooks로 onPreEdit·onPostEdit·onPreCommit·onApprove 이벤트에 bash·Node·Python 스크립트를 연결",
        "팀 마켓플레이스로 확장 자산을 조직 내 배포"
      ],
      media: { src: "assets/img/extensibility/cursor.png", caption: "Cursor의 Rules와 Hooks" },
      source: SRC.cursor,
    }
  },
  verdict: "초안에서 이 축은 \"사내 시스템 연동과 겹친다\"는 이유로 빠져 있었지만 판단 근거가 다르므로 겹치지 않는다. 넣어 보면 Bob은 규칙·커맨드·Skills를 갖춰 크게 뒤지지 않는다 — 즉 이 축을 뺀 것은 Bob에게 유리한 선택이 아니었다. 차이가 나는 지점은 훅 하나다. 나머지 셋은 규칙 위반을 스크립트로 차단할 수 있고 Bob은 규칙을 프롬프트로 전달한다. \"조직 표준을 강제한다\"가 도입 명분이라면 이 차이는 그 명분의 핵심에 걸리므로, Bob의 훅 지원 여부를 IBM에 확인해야 한다.",
};
