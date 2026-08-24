/* 상세: 코드 이해·수정. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['codebase'] = {
  why: "모든 AI 코딩 도구의 출발점이자 실사용에서 가장 자주 부딪히는 지점이다. 이 항목이 부족하면 나머지 기능은 의미가 없다. 반대로 여기서 변별력이 사라졌다면, 도구 선택 기준을 다른 축으로 옮겨야 한다는 신호다.",
  tools: {
    bob: {
      bullets: [
        "코드 생성, 리팩터링, 디버깅, 코드베이스 질의응답을 기본 제공",
        "Agent 모드가 Read·Edit·Execute·MCP·Skill·Todo·Subtask 도구를 모두 쓰며, 모드별로 도구 접근 범위가 다르게 지정됨",
        "v2.0.0에서 컨텍스트 창을 200K → 270K로 확장하고 긴 작업의 자동 압축을 추가",
        ".docx·.pdf·.xlsx 읽기와 구조화된 grep 결과 지원"
      ],
      media: { src: "assets/img/codebase/bob.png", caption: "Bob의 코드베이스 분석" },
      source: SRC.bobTools,
    },
    claude: {
      bullets: [
        "탐색·편집·명령 실행을 한 흐름에서 수행",
        "긴 작업의 컨텍스트 관리 장치와 세션 간 자동 메모리 제공"
      ],
      media: { src: "assets/img/codebase/claude.png", caption: "Claude Code의 탐색" },
      source: SRC.claude,
    },
    codex: {
      bullets: [
        "저장소 전체를 대상으로 변경 수행",
        "격리 환경에서 실행해 부작용을 제한"
      ],
      media: { src: "assets/img/codebase/codex.png", caption: "Codex의 저장소 작업" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "코드베이스 인덱싱으로 관련 파일을 빠르게 찾음",
        "에디터와 밀착된 다중 파일 편집"
      ],
      media: { src: "assets/img/codebase/cursor.png", caption: "Cursor의 인덱싱" },
      source: SRC.cursor,
    }
  },
  verdict: "네 도구가 동일한 수준이다. 2026년 기준으로 기본 역량은 상향 평준화됐다고 보는 편이 정확하다. Bob이 프런티어 작업에 Claude를 호출한다는 점을 감안하면 이 결과는 당연하다 — 같은 모델이 같은 일을 한다. 따라서 \"어느 도구가 코드를 더 잘 쓰는가\"로 도입을 결정하려는 시도는 근거를 만들기 어렵고, 아래 통제·비용·작업 방식 항목으로 판단 축을 옮기는 것이 맞다.",
};
