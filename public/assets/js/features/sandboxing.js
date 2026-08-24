/* 상세: 실행 격리. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['sandboxing'] = {
  why: "에이전트가 명령을 실행하는 순간의 위험은 승인 UI가 아니라 실행 환경이 막는다. 승인은 사람이 누르면 통과하고, 자동 승인 목록을 켜면 아예 사라진다. 판정 기준은 OS·컨테이너 수준의 격리를 제품이 제공하는지로 잡았다. 명령 문자열 검사나 무시 파일은 격리가 아니므로 해당하지 않는다.",
  tools: {
    bob: {
      bullets: [
        "Bob Shell은 macOS Seatbelt(sandbox-exec)와 Docker·Podman 컨테이너 격리를 제공. 컨테이너는 완전한 프로세스 격리",
        "Seatbelt 프로파일로 네트워크 허용 여부와 쓰기 범위를 단계별로 지정. 기본 프로파일은 프로젝트 디렉터리 밖 쓰기를 차단",
        "`-s` 플래그, `BOB_SHELL_SANDBOX` 환경변수, `settings.json`으로 설정하며 프로젝트 단위로 팀 전체에 적용 가능",
        "신뢰 폴더 기능으로 미승인 폴더를 제한 모드로 실행 — 프로젝트 설정·환경변수·MCP 서버·자동 승인·커스텀 커맨드를 모두 차단",
        "단, 기본값은 꺼진 상태이며 컨테이너 방식은 이미지를 직접 빌드해야 한다. IDE 쪽에는 시스템 수준 격리가 없다고 보안 가이드가 명시"
      ],
      media: { src: "assets/img/sandboxing/bob.png", caption: "Bob Shell의 샌드박스 설정" },
      source: SRC.bobSandbox,
    },
    claude: {
      bullets: [
        "샌드박스 실행을 공식 문서로 제공해 파일시스템·네트워크 접근을 OS 수준에서 제한",
        "클라우드 세션은 환경별 네트워크 접근 수준을 지정하고 허용 목록 밖 요청을 403으로 차단"
      ],
      media: { src: "assets/img/sandboxing/claude.png", caption: "Claude Code의 샌드박스" },
      source: SRC.claudeSandbox,
    },
    codex: {
      bullets: [
        "로컬은 샌드박스와 승인 모드, 클라우드는 격리된 샌드박스에서 실행",
        "격리를 기본 동작으로 두어 실행 환경 자체가 위험 범위를 정함"
      ],
      media: { src: "assets/img/sandboxing/codex.png", caption: "Codex의 샌드박스" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "클라우드 에이전트는 Cursor의 격리된 VM에서 실행",
        "로컬 IDE 에이전트의 OS 수준 격리는 공식 문서로 확인하지 못함"
      ],
      media: { src: "assets/img/sandboxing/cursor.png", caption: "Cursor의 클라우드 격리" },
      source: SRC.cursorAuto,
    }
  },
  verdict: "이 항목은 조사 과정에서 판정이 뒤집혔다. Bob IDE의 보안 가이드만 보고 격리가 없다고 판단했으나, Bob Shell에는 Seatbelt와 컨테이너 기반 샌드박스가 문서화돼 있다. 초안의 `미지원`은 오판이었다. 남는 차이는 두 가지다. 첫째, Bob의 격리는 Shell 전용이므로 개발자가 실제로 쓰는 IDE에는 적용되지 않는다. Codex처럼 격리가 기본 동작인 경우와 달리 Bob은 켜야 하고, 안 켜면 통제가 승인 다이얼로그 한 층으로 돌아간다. 둘째, 자동 승인 목록을 켜면 그 한 층마저 사라지며 문서 자신이 이 위험을 경고한다. 따라서 파일럿에서 확인할 것은 \"격리가 있는가\"가 아니라 \"우리 개발자들이 실제로 켠 상태로 쓰게 만들 수 있는가\"다. 프로젝트 `settings.json`으로 팀 전체에 강제할 수 있으므로 표준 설정에 넣는 것이 현실적인 방법이다.",
};
