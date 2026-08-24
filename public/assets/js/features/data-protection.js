/* 상세: 데이터 보호. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['data-protection'] = {
  why: "앞의 권한 통제가 \"무엇을 할 수 있는가\"라면 이 항목은 \"무엇이 새어 나가는가\"다. 판정 기준은 제품이 자동으로 탐지·차단하는지, 아니면 사용자가 조심하는 데 의존하는지로 잡았다. 수천 명 규모에서 사용자 주의에 의존하는 통제는 통제가 아니다. 이 항목은 네 도구 모두 1차 문서로 확인된 범위가 좁아, 확인한 것과 못 한 것을 칸 안에 그대로 적었다.",
  tools: {
    bob: {
      bullets: [
        "IBM 발표는 프롬프트 정규화, 민감 데이터 스캔, 실시간 정책 집행을 실행 시점에 적용한다고 명시",
        "그러나 공식 보안 가이드는 민감정보 스캔을 자동 기능으로 문서화하지 않고, 비밀값을 Bob에 주지 말고 .gitignore와 .bobignore에 넣으라고 사용자 책임으로 안내",
        ".bobignore는 read_file 등에서 엄격히 차단되지만, 문서가 \"파일 편집 도구의 쓰기 우회 가능성\"을 직접 밝힌다 — insert_content와 search_and_replace의 최종 쓰기에 명시적 검사가 없음",
        "신뢰 폴더로 미승인 프로젝트의 설정·환경변수·MCP 연결을 차단하는 장치는 있음 (Bob Shell)",
        "프리뷰 단계에 프롬프트 인젝션으로 CLI를 통해 악성코드를 실행시킨 사례가 보고됨. IBM은 조치를 밝혔으나 공개 검증 자료는 확인하지 못함"
      ],
      media: { src: "assets/img/data-protection/bob.png", caption: "Bob의 .bobignore 설정" },
      source: SRC.bobIgnore,
    },
    claude: {
      bullets: [
        "샌드박스와 권한 정책으로 접근 범위를 좁히고, 클라우드 세션은 허용 도메인 밖 요청을 403으로 차단",
        "훅으로 커밋 전 비밀값 스캔 같은 검사를 직접 붙일 수 있음",
        "제품 내장 민감정보 스캐너는 확인하지 못함 — 별도 솔루션과 조합이 전제"
      ],
      media: { src: "assets/img/data-protection/claude.png", caption: "Claude Code의 권한 설정" },
      source: SRC.claudeSandbox,
    },
    codex: {
      bullets: [
        "네트워크 차단과 샌드박스 실행으로 유출 경로를 물리적으로 제한",
        "HIPAA 대응 옵션과 컴플라이언스 API를 문서화",
        "제품 내장 민감정보 스캐너 여부는 확인하지 못함"
      ],
      media: { src: "assets/img/data-protection/codex.png", caption: "Codex의 샌드박스" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "프라이버시 모드로 코드 저장을 차단하고 팀 단위 관리자 설정 제공",
        "코드 보관 여부 통제가 중심이며 실행 중 민감정보 차단과는 층위가 다름"
      ],
      media: { src: "assets/img/data-protection/cursor.png", caption: "Cursor의 프라이버시 모드" },
      source: SRC.cursor,
    }
  },
  verdict: "네 도구 모두 부분이며, 이유가 서로 다르다. 경쟁 도구 셋은 격리와 네트워크 차단으로 유출 경로를 좁히지만 내용 기반 탐지는 조직에 맡긴다. Bob은 내용 기반 탐지를 제품 기능으로 주장하는 유일한 도구인데, 그 주장을 자사 보안 문서가 뒷받침하지 않는다. 오히려 문서가 스스로 약점을 밝힌다 — .bobignore가 읽기는 막지만 일부 편집 도구의 최종 쓰기에는 검사가 없다고 적혀 있다. 벤더가 이 정도를 공개하는 것은 문서 품질로는 좋은 신호이지만, 판정 근거로는 발표 자료의 \"민감 데이터 스캔\"과 정면으로 어긋난다. 데이터 보호를 근거로 Bob을 선택한다면 파일럿에서 반드시 직접 뚫어 봐야 한다 — 테스트 비밀값을 심어 두고 스캔이 걸리는지, .bobignore로 막은 파일이 편집 도구로 덮이는지, 승인 장치가 프롬프트 인젝션으로 우회되는지를 확인해야 한다.",
};
