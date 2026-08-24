/* 상세: 클라이언트. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['surfaces'] = {
  why: "클라이언트가 IDE에만 있으면 개발자가 자리에 앉아 있는 시간에만 쓰인다. 판정 기준은 IDE, 웹, 데스크톱, CLI 중 어디에서 같은 작업을 이어갈 수 있는지로 잡았다. Slack·모바일로 일을 맡기는 경로는 팀으로 쓰기에서 본다.",
  tools: {
    bob: {
      bullets: [
        "Bob IDE는 독립 애플리케이션으로 설치된다 — macOS .pkg, Windows .exe, Debian·RedHat 패키지를 받아 설치하고 응용 프로그램 메뉴에서 실행",
        "Bob Shell이 터미널 표면을 담당하며 두 환경에서 슬래시 커맨드가 동일하게 동작",
        "bob.ibm.com 웹 포털은 있으나 용도가 관리·Bobalytics·다운로드이며 여기서 코딩 작업을 실행하지는 않음",
        "JetBrains 플러그인, 웹 코딩 세션은 공식 문서와 사이트맵 전체에서 확인되지 않음"
      ],
      media: { src: "assets/img/surfaces/bob.png", caption: "Bob IDE와 Bob Shell" },
      source: SRC.bobInstall,
    },
    claude: {
      bullets: [
        "터미널, VS Code, JetBrains, 데스크톱 앱, 웹(claude.ai/code)에서 동일 엔진 사용",
        "표면 간 이동 지원 — /desktop, claude --cloud, --teleport, Remote Control로 세션을 옮김",
        "CLAUDE.md·설정·MCP 서버가 클라이언트 사이에서 그대로 동작"
      ],
      media: { src: "assets/img/surfaces/claude.png", caption: "Claude Code의 실행 표면" },
      source: SRC.claude,
    },
    codex: {
      bullets: [
        "CLI, IDE 확장, macOS·Windows 데스크톱 앱, 웹"
      ],
      media: { src: "assets/img/surfaces/codex.png", caption: "Codex의 실행 표면" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "IDE, 웹 앱, CLI에서 접근",
        "JetBrains는 ACP를 통해 지원"
      ],
      media: { src: "assets/img/surfaces/cursor.png", caption: "Cursor의 실행 표면" },
      source: SRC.cursorSlack,
    }
  },
  verdict: "Bob이 가장 크게 뒤처지는 항목이다. 초안에서는 이 축이 \"제품 사양이지 역량이 아니다\"라는 이유로 빠져 있었으나, 클라이언트는 작업을 이어갈 수 있는 자리를 정하므로 역량으로 다뤄야 한다. 더 중요한 것은 이 결과가 앞의 주장과 충돌한다는 점이다. IBM은 Bob을 요구사항부터 유지보수까지 아우르는 조직 단위 SDLC 파트너로 제시하는데, 확인된 클라이언트는 개발자용 IDE와 터미널뿐이다. SDLC 전체를 대상으로 한다는 주장과 개발자 도구라는 실물 사이의 간격이 이 행에서 드러난다.",
};
