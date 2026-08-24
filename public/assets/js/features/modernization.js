/* 상세: 레거시 현대화. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['modernization'] = {
  why: "기술 부채는 대개 사람을 붙여 몇 달씩 태우는 방식으로 처리된다. 반복적이고 범위가 명확해 자동화 효과가 가장 크게 나오는 영역이며, 투자 대비 효과를 숫자로 제시하기도 쉽다. 우리 자산 구성에 COBOL·PL/I·RPG가 있다면 이 항목의 가중치가 가장 높다.",
  tools: {
    bob: {
      bullets: [
        "Premium Package for Java에 네 개 워크플로가 문서화돼 있다 — Java 버전 업그레이드(AI 검증과 에이전트 수정 사이클), WebSphere→Liberty 리플랫포밍(IBM AMA 마이그레이션 플랜 기반), UI 현대화, 단위 테스트 생성",
        "Z용(COBOL·PL/I·JCL)과 IBM i용(RPG·CL·DDS) 패키지를 따로 제공 — 타 도구에 대응물이 없는 영역",
        "고객 사례: Blue Pearl이 Java 11→25 전환과 지원 종료 API 127개 해소를 30일 이상 → 약 3일로 단축. APIS IT가 .NET Core 3.1→8 전환을 4~5시간에 완료, 20년 된 EGL/CICS 문서화 10배 가속",
        "단, Premium Package는 기본 구독에 포함되지 않는 별도 계약 대상"
      ],
      media: { src: "assets/img/modernization/bob.png", caption: "Bob의 현대화 워크플로" },
      source: SRC.bobJavaWorkflows,
    },
    claude: {
      bullets: [
        "대규모 마이그레이션을 수행할 수 있으나 전용 워크플로는 아님",
        "작업 분해와 검증 설계를 사용자가 맡음"
      ],
      media: { src: "assets/img/modernization/claude.png", caption: "Claude Code의 마이그레이션" },
      source: SRC.claude,
    },
    codex: {
      bullets: [
        "병렬 클라우드 작업으로 대량 변경을 처리할 수 있음",
        "레거시 전용 자산은 제공하지 않음"
      ],
      media: { src: "assets/img/modernization/codex.png", caption: "Codex의 대량 변경" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "다중 파일 편집과 클라우드 에이전트로 마이그레이션 수행 가능",
        "레거시 전용 자산은 제공하지 않음"
      ],
      media: { src: "assets/img/modernization/cursor.png", caption: "Cursor의 다중 파일 편집" },
      source: SRC.cursor,
    }
  },
  verdict: "네 도구 모두 마이그레이션을 \"할 수는\" 있다. 차이는 전용 워크플로와 검증 자산이 준비돼 있는지이며, COBOL·PL/I·RPG처럼 범용 도구가 학습 데이터로만 아는 영역에서는 이 격차가 특히 크다. 이 표에서 Bob의 우위가 가장 확실한 항목이다. 다만 세 가지를 함께 봐야 한다. 인용된 수치는 IBM이 고른 성공 사례이고 대상 코드베이스의 상태에 크게 좌우된다. Premium Package는 유료 애드온이므로 이 강점은 기본 구독 가격이 아니라 추가 비용을 전제로 계산해야 한다. 그리고 현대화는 일회성 프로젝트이므로, 이 항목 하나로 상시 개발 도구를 결정하면 프로젝트가 끝난 뒤의 판단 근거가 남지 않는다.",
};
