/**
 * 비교 데이터 단일 소스.
 * 장표(index.html)와 상세 페이지(detail.html)가 모두 이 파일만 참조한다.
 *
 * 분류 원칙: 카테고리는 기능 묶음이 아니라 "의사결정 질문" 단위로 나눈다.
 * 기술 검토자와 경영 의사결정자가 같은 표를 보고 각자 필요한 답을 얻게 하기 위함이다.
 *
 * level: 'full' | 'partial' | 'none' | 'unknown'
 *   full    - 제품에 내장된 정식 기능
 *   partial - 유사 기능이 있으나 범위/방식이 제한적
 *   none    - 해당 기능 없음
 *   unknown - 근거를 확인하지 못함 (추측으로 채우지 않는다)
 */

const META = {
  checkedAt: '2026-07-28',
  status: 'draft',
};

/**
 * logo: 공식 로고 파일 경로. 파일이 있으면 글자 마크 대신 그것을 쓴다.
 *       (없어도 동작한다 — 각 벤더의 공식 SVG를 받아 이 경로에 넣으면 자동 반영)
 * brand: 로고가 없을 때 쓰는 글자 마크의 색. 라이트/다크 모드용을 따로 둔다.
 */
const TOOLS = [
  {
    id: 'bob',
    name: 'IBM Bob',
    vendor: 'IBM',
    mark: 'B',
    logo: 'assets/img/logo/bob.svg',
    brand: { bg: '#0f62fe', ink: '#ffffff', bgDark: '#4589ff', inkDark: '#ffffff' },
    highlight: true,
  },
  {
    id: 'claude',
    name: 'Claude Code',
    vendor: 'Anthropic',
    mark: 'C',
    logo: 'assets/img/logo/claude.svg',
    brand: { bg: '#d97757', ink: '#ffffff', bgDark: '#d97757', inkDark: '#ffffff' },
  },
  {
    id: 'codex',
    name: 'OpenAI Codex',
    vendor: 'OpenAI',
    mark: 'O',
    logo: 'assets/img/logo/codex.svg',
    brand: { bg: '#0d0d0d', ink: '#ffffff', bgDark: '#f4f4f4', inkDark: '#161616' },
  },
  {
    id: 'cursor',
    name: 'Cursor',
    vendor: 'Anysphere',
    mark: 'Cu',
    logo: 'assets/img/logo/cursor.svg',
    brand: { bg: '#4d4d4d', ink: '#ffffff', bgDark: '#c6c6c6', inkDark: '#161616' },
  },
];

const LEVELS = {
  full: { label: '지원', symbol: '●', className: 'lv-full' },
  partial: { label: '부분', symbol: '◐', className: 'lv-partial' },
  none: { label: '미지원', symbol: '○', className: 'lv-none' },
  unknown: { label: '확인 필요', symbol: '·', className: 'lv-unknown' },
};

/* 카테고리별 의사결정 질문. 표에서 그룹 머리행에 함께 표시된다. */
const CATEGORIES = {
  'SDLC 커버리지': '어디까지 자동화되는가',
  '엔지니어링 기반': '실제 개발에서 버티는가',
  '엔터프라이즈 통제': '도입해도 안전한가',
  '도입 조건': '우리 환경에서 쓸 수 있는가',
};

/* 표를 읽지 않는 사람이 가져갈 결론. */
const TAKEAWAYS = [
  {
    kind: 'neutral',
    title: '개발 기본기는 사실상 동등하다',
    body: '코드베이스 이해, 테스트, 도구 연동은 네 도구가 같은 수준에 올라와 있다. 이 영역만으로는 도구를 고를 근거가 나오지 않는다.',
  },
  {
    kind: 'pro',
    title: '차이는 딜리버리 조율과 통제에서 벌어진다',
    body: 'Bob은 배포 파이프라인 연계, 레거시 현대화, 정책 집행, 감사 추적에서 앞선다. 개별 기능이 아니라 개발 프로세스 전체를 묶는다는 점이 차별점이다.',
  },
  {
    kind: 'con',
    title: '단, 현재는 SaaS로만 제공된다',
    body: '온프렘 배포는 로드맵 단계다. 데이터 위치나 망 분리 요건이 있는 조직에서는 이 항목이 다른 모든 장점보다 먼저 걸린다.',
  },
];

const SRC = {
  bob: { text: 'IBM Bob 공식 문서', url: 'https://bob.ibm.com/docs/ide' },
  bobNews: {
    text: 'IBM Bob 출시 발표 (2026-04-28)',
    url: 'https://www.prnewswire.com/news-releases/introducing-ibm-bob-ai-development-partner-that-takes-enterprises-from-ai-assisted-coding-to-production-ready-software-302755018.html',
  },
  claude: { text: 'Claude Code 문서', url: 'https://docs.claude.com/en/docs/claude-code/overview' },
  codex: { text: 'OpenAI Codex 문서', url: 'https://developers.openai.com/codex/' },
  cursor: { text: 'Cursor 문서', url: 'https://cursor.com/docs' },
  mcp: { text: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/' },
};

const FEATURES = [
  /* ===== A. SDLC 커버리지 =========================================== */
  {
    slug: 'plan-design',
    category: 'SDLC 커버리지',
    name: '계획 · 설계',
    summary: '코드를 건드리기 전에 작업 계획을 세우고 승인을 받는 단계',
    why:
      '에이전트가 곧바로 파일을 고치기 시작하면 방향이 어긋난 뒤에야 발견하게 된다. 계획 단계를 분리하면 되돌리는 비용이 큰 작업일수록 이득이 커진다. ' +
      '조직 관점에서는 "무엇을 할 것인가"가 승인 기록으로 남는지도 함께 본다.',
    tools: {
      bob: {
        level: 'full',
        label: 'Plan 모드',
        bullets: [
          'Agent / Ask / Plan 세 모드를 명시적으로 분리해 제공',
          '작업 유형에 따라 수동·자동 승인을 나누는 거버넌스 체크포인트',
        ],
        media: { src: 'assets/img/plan-design/bob.png', caption: 'Bob의 Plan 모드' },
        source: SRC.bob,
      },
      claude: {
        level: 'full',
        label: 'Plan 모드',
        bullets: ['읽기 전용으로 조사한 뒤 계획을 제시하고 승인을 받음', '승인 전까지 파일 수정 차단'],
        media: { src: 'assets/img/plan-design/claude.png', caption: 'Claude Code의 Plan 모드' },
        source: SRC.claude,
      },
      codex: {
        level: 'partial',
        label: '승인 정책으로 대체',
        bullets: [
          '계획 전용 모드보다 실행 단위 승인 정책으로 통제',
          '계획 산출물 자체를 승인 대상으로 다루지는 않음',
        ],
        media: { src: 'assets/img/plan-design/codex.png', caption: 'Codex의 승인 모드' },
        source: SRC.codex,
      },
      cursor: {
        level: 'full',
        label: 'Plan 기능',
        bullets: ['작업 전 계획을 세우고 사용자가 검토·수정', '계획에서 실행으로 넘어가는 연결이 매끄러움'],
        media: { src: 'assets/img/plan-design/cursor.png', caption: 'Cursor의 Plan' },
        source: SRC.cursor,
      },
    },
    verdict:
      '계획 모드 자체는 대부분의 도구가 갖췄으므로 이것만으로는 선택 근거가 되지 않는다. ' +
      'Bob의 차이는 계획 승인을 감사 기록으로 남겨 뒤쪽 통제 항목과 이어붙인다는 점이며, 이 기능은 단독이 아니라 감사 추적과 함께 볼 때 의미가 있다.',
  },

  {
    slug: 'testing',
    category: 'SDLC 커버리지',
    name: '테스트 생성 · 실행',
    summary: '테스트를 만들고 실행해 결과를 스스로 확인하는 루프',
    why:
      '에이전트가 만든 코드를 사람이 전부 읽어 검증하면 생산성 이득이 사라진다. 테스트를 스스로 쓰고 돌려 실패를 잡아내는지가 실사용 품질을 가른다.',
    tools: {
      bob: {
        level: 'full',
        label: '테스트 에이전트 조율',
        bullets: [
          '코드·테스트·문서·파이프라인에 걸쳐 전담 에이전트를 조율',
          '테스트 생성을 코딩 루프의 부산물이 아니라 SDLC 역할로 배치',
        ],
        media: { src: 'assets/img/testing/bob.png', caption: 'Bob의 테스트 자동 생성' },
        source: SRC.bobNews,
      },
      claude: {
        level: 'full',
        label: '테스트 주도 루프',
        bullets: ['테스트를 먼저 쓰고 통과할 때까지 반복하는 작업 방식 지원', '실패 로그를 읽어 수정까지 이어감'],
        media: { src: 'assets/img/testing/claude.png', caption: 'Claude Code의 테스트 루프' },
        source: SRC.claude,
      },
      codex: {
        level: 'full',
        label: '샌드박스 실행',
        bullets: ['격리 환경에서 테스트를 실행하고 결과를 반영', '실행 환경이 통제돼 재현성이 높음'],
        media: { src: 'assets/img/testing/codex.png', caption: 'Codex의 테스트 실행' },
        source: SRC.codex,
      },
      cursor: {
        level: 'full',
        label: '터미널 실행 기반',
        bullets: ['에이전트가 터미널로 테스트를 실행하고 결과를 반영'],
        media: { src: 'assets/img/testing/cursor.png', caption: 'Cursor의 테스트 실행' },
        source: SRC.cursor,
      },
    },
    verdict:
      '테스트를 쓰고 돌리는 능력 자체는 네 도구가 모두 갖췄다. 차이는 테스트를 코딩 작업의 일부로 보는가, ' +
      '아니면 배포 전 게이트로 관리하는가에 있다. Bob은 후자에 가깝지만, 이 차이는 조직의 릴리스 프로세스가 실제로 그렇게 돌아갈 때만 체감된다.',
  },

  {
    slug: 'delivery',
    category: 'SDLC 커버리지',
    name: '배포 · 파이프라인 연계',
    summary: '코드 작성 이후 CI/CD와 릴리스 과정까지 이어지는 자동화',
    why:
      '개발 도구의 생산성 이득은 대개 "코드가 작성된 시점"에서 측정된다. 그러나 실제 리드타임은 코드 작성 이후 구간에서 더 많이 소모된다. ' +
      '이 구간을 다루는지가 코딩 보조와 딜리버리 자동화를 가르는 경계다.',
    tools: {
      bob: {
        level: 'full',
        label: '배포까지 조율',
        bullets: [
          '계획·코딩·테스트·배포를 하나의 흐름으로 조율한다고 명시',
          'BobShell로 CI/CD에 넣을 반복 가능한 워크플로를 구성',
        ],
        media: { src: 'assets/img/delivery/bob.png', caption: 'Bob의 파이프라인 연계' },
        source: SRC.bobNews,
      },
      claude: {
        level: 'partial',
        label: 'CI 실행 가능',
        bullets: ['비대화형 모드로 CI에서 실행할 수 있음', '배포 흐름 자체는 사용자가 직접 구성해야 함'],
        media: { src: 'assets/img/delivery/claude.png', caption: 'Claude Code의 CI 실행' },
        source: SRC.claude,
      },
      codex: {
        level: 'partial',
        label: '저장소 연동 중심',
        bullets: ['클라우드에서 작업을 수행하고 변경분을 PR로 제출', '릴리스 단계까지 조율하는 구조는 아님'],
        media: { src: 'assets/img/delivery/codex.png', caption: 'Codex의 PR 연동' },
        source: SRC.codex,
      },
      cursor: {
        level: 'partial',
        label: '저장소 연동 중심',
        bullets: ['백그라운드 에이전트와 저장소 연동을 제공', '배포 파이프라인 조율은 범위 밖'],
        media: { src: 'assets/img/delivery/cursor.png', caption: 'Cursor의 저장소 연동' },
        source: SRC.cursor,
      },
    },
    verdict:
      'IBM이 Bob을 "AI 코딩 보조에서 AI 딜리버리로"라고 표현하는 근거가 이 항목이다. ' +
      '다만 이 강점은 조직의 CI/CD가 이미 정돈돼 있을 때만 실현된다. 파이프라인이 팀마다 제각각인 조직에서는 도구를 바꾼다고 얻어지지 않는다.',
  },

  {
    slug: 'modernization',
    category: 'SDLC 커버리지',
    name: '레거시 현대화',
    summary: '오래된 언어·프레임워크·런타임을 최신 버전으로 옮기는 대규모 일괄 작업',
    why:
      '기술 부채는 대개 사람을 붙여 몇 달씩 태우는 방식으로 처리된다. 반복적이고 범위가 명확해 자동화 효과가 가장 크게 나오는 영역이며, ' +
      '투자 대비 효과를 숫자로 제시하기도 쉽다.',
    tools: {
      bob: {
        level: 'full',
        label: '전용 워크플로',
        bullets: [
          '코드·테스트·문서·배포 파이프라인에 걸쳐 에이전트를 조율해 일괄 업그레이드',
          '사례: 통상 30일 걸리던 Java 업그레이드를 3일에 완료, 160시간 이상 절감',
        ],
        media: { src: 'assets/img/modernization/bob.png', caption: 'Bob의 현대화 워크플로' },
        source: SRC.bobNews,
      },
      claude: {
        level: 'partial',
        label: '범용 역량으로 수행',
        bullets: ['대규모 마이그레이션을 수행할 수 있으나 전용 워크플로는 아님', '작업 분해와 검증 설계를 사용자가 맡음'],
        media: { src: 'assets/img/modernization/claude.png', caption: 'Claude Code의 마이그레이션' },
        source: SRC.claude,
      },
      codex: {
        level: 'partial',
        label: '범용 역량으로 수행',
        bullets: ['병렬 작업으로 대량 변경을 처리할 수 있음', '레거시 전용 자산은 제공하지 않음'],
        media: { src: 'assets/img/modernization/codex.png', caption: 'Codex의 대량 변경' },
        source: SRC.codex,
      },
      cursor: {
        level: 'partial',
        label: '범용 역량으로 수행',
        bullets: ['다중 파일 편집으로 마이그레이션 수행 가능', '레거시 전용 자산은 제공하지 않음'],
        media: { src: 'assets/img/modernization/cursor.png', caption: 'Cursor의 다중 파일 편집' },
        source: SRC.cursor,
      },
    },
    verdict:
      '네 도구 모두 마이그레이션을 "할 수는" 있다. 차이는 전용 워크플로와 검증 자산이 준비돼 있는지다. ' +
      '다만 인용된 절감 수치는 IBM이 제시한 단일 고객 사례이므로 우리 코드베이스에 그대로 적용될 값으로 읽어서는 안 된다. 파일럿으로 확인할 대상이다.',
  },

  /* ===== B. 엔지니어링 기반 ========================================= */
  {
    slug: 'codebase',
    category: '엔지니어링 기반',
    name: '코드베이스 이해 · 작성',
    summary: '대규모 저장소를 탐색해 맥락을 파악하고 여러 파일을 함께 수정하는 기본 역량',
    why:
      '모든 AI 코딩 도구의 출발점이자 실사용에서 가장 자주 부딪히는 지점이다. 이 항목이 부족하면 나머지 기능은 의미가 없다. ' +
      '반대로 여기서 변별력이 사라졌다면, 도구 선택 기준을 다른 축으로 옮겨야 한다는 신호다.',
    tools: {
      bob: {
        level: 'full',
        label: '생성·리팩터링·분석',
        bullets: ['코드 생성, 리팩터링, 디버깅, 코드베이스 질의응답을 기본 제공', '파일 읽기·쓰기와 명령 실행 도구 내장'],
        media: { src: 'assets/img/codebase/bob.png', caption: 'Bob의 코드베이스 분석' },
        source: SRC.bob,
      },
      claude: {
        level: 'full',
        label: '대규모 저장소 탐색',
        bullets: ['탐색·편집·명령 실행을 한 흐름에서 수행', '긴 작업에서 컨텍스트를 관리하는 장치 제공'],
        media: { src: 'assets/img/codebase/claude.png', caption: 'Claude Code의 탐색' },
        source: SRC.claude,
      },
      codex: {
        level: 'full',
        label: '저장소 단위 작업',
        bullets: ['저장소 전체를 대상으로 변경 수행', '격리 환경에서 실행해 부작용을 제한'],
        media: { src: 'assets/img/codebase/codex.png', caption: 'Codex의 저장소 작업' },
        source: SRC.codex,
      },
      cursor: {
        level: 'full',
        label: '인덱싱 기반 탐색',
        bullets: ['코드베이스 인덱싱으로 관련 파일을 빠르게 찾음', '에디터와 밀착된 다중 파일 편집'],
        media: { src: 'assets/img/codebase/cursor.png', caption: 'Cursor의 인덱싱' },
        source: SRC.cursor,
      },
    },
    verdict:
      '네 도구가 동일한 수준이다. 2026년 기준으로 기본 역량은 상향 평준화됐다고 보는 편이 정확하다. ' +
      '따라서 "어느 도구가 코드를 더 잘 쓰는가"로 도입을 결정하려는 시도는 근거를 만들기 어렵고, 아래 통제 항목으로 판단 축을 옮기는 것이 맞다.',
  },

  {
    slug: 'orchestration',
    category: '엔지니어링 기반',
    name: '병렬 에이전트 오케스트레이션',
    summary: '큰 작업을 여러 갈래로 나눠 독립된 에이전트가 동시에 처리하는 구조',
    why:
      '단일 에이전트는 컨텍스트가 길어질수록 정확도가 떨어진다. 작업을 쪼개 각각 독립 컨텍스트에서 처리하면 대규모 변경에서 처리량과 정확도가 함께 올라간다.',
    tools: {
      bob: {
        level: 'full',
        label: '역할 기반 서브에이전트',
        bullets: [
          '복잡한 작업을 병렬 워크스트림으로 분해해 서브에이전트를 생성',
          '설계·코딩·테스트·배포 등 SDLC 역할과 묶어 배치',
        ],
        media: { src: 'assets/img/orchestration/bob.png', caption: 'Bob의 서브에이전트 분기' },
        source: SRC.bob,
      },
      claude: {
        level: 'full',
        label: '서브에이전트',
        bullets: ['역할별 서브에이전트를 정의해 독립 컨텍스트에서 병렬 실행', '조사 작업에서 컨텍스트 절약 용도로도 활용'],
        media: { src: 'assets/img/orchestration/claude.png', caption: 'Claude Code의 서브에이전트' },
        source: SRC.claude,
      },
      codex: {
        level: 'partial',
        label: '작업 단위 병렬화',
        bullets: ['격리 환경에서 여러 작업을 동시에 실행', '한 작업 안에서 에이전트를 분기시키는 구조와는 결이 다름'],
        media: { src: 'assets/img/orchestration/codex.png', caption: 'Codex의 병렬 작업' },
        source: SRC.codex,
      },
      cursor: {
        level: 'unknown',
        label: null,
        bullets: ['공개 문서에서 서브에이전트 분기 기능의 범위를 확정하지 못함'],
        media: null,
        source: null,
      },
    },
    verdict:
      '병렬 실행 자체는 Claude Code도 동등하게 제공하므로 "몇 개를 동시에 돌리는가"는 변별점이 아니다. ' +
      'Bob의 차이는 분기 단위가 기술적 작업이 아니라 SDLC 역할이라는 점이다. 조직의 개발 프로세스와 맞아떨어질 때 이득이 생긴다.',
  },

  {
    slug: 'integration',
    category: '엔지니어링 기반',
    name: '사내 시스템 연동',
    summary: 'MCP로 사내 이슈 트래커·위키·배포 시스템을 에이전트에 연결하는 표준 확장',
    why:
      '사내 시스템에 접근하지 못하는 코딩 에이전트는 반쪽짜리다. MCP는 이 연결을 도구마다 새로 만들지 않고 한 번 만들어 재사용하게 해준다. ' +
      '도입 검토에서는 "우리가 만든 연동 자산이 도구를 바꿔도 살아남는가"가 실질적 기준이 된다.',
    tools: {
      bob: {
        level: 'full',
        label: 'MCP 지원',
        bullets: ['설정 패널에서 MCP 서버 추가·구성·제거', '로컬 실행과 원격 실행 모두 선택 가능'],
        media: { src: 'assets/img/integration/bob.png', caption: 'Bob의 MCP 설정' },
        source: SRC.bob,
      },
      claude: {
        level: 'full',
        label: 'MCP 지원',
        bullets: ['MCP 표준을 제안한 주체로 로컬·원격 서버 모두 지원', '프로젝트/사용자 단위로 서버 범위 분리'],
        media: { src: 'assets/img/integration/claude.png', caption: 'Claude Code의 MCP' },
        source: SRC.mcp,
      },
      codex: {
        level: 'full',
        label: 'MCP 지원',
        bullets: ['설정 파일로 MCP 서버를 등록해 도구로 노출'],
        media: { src: 'assets/img/integration/codex.png', caption: 'Codex의 MCP' },
        source: SRC.codex,
      },
      cursor: {
        level: 'full',
        label: 'MCP 지원',
        bullets: ['설정 UI에서 MCP 서버를 등록해 에이전트 도구로 사용'],
        media: { src: 'assets/img/integration/cursor.png', caption: 'Cursor의 MCP' },
        source: SRC.cursor,
      },
    },
    verdict:
      'MCP는 네 도구 모두가 지원하는 사실상의 표준이 되었다. Bob의 차별점이 아니다. ' +
      '다만 이는 사내 연동 자산이 특정 도구에 묶이지 않는다는 뜻이므로, 도입 판단에서는 전환 위험을 낮추는 근거로 읽는 편이 맞다.',
  },

  /* ===== C. 엔터프라이즈 통제 ======================================= */
  {
    slug: 'governance',
    category: '엔터프라이즈 통제',
    name: '정책 집행 · 데이터 보호',
    summary: '에이전트 행위를 조직 정책으로 통제하고 민감 정보 유출을 사전에 차단하는 장치',
    why:
      '개인 개발자에게는 부가 기능이지만 규제 산업의 대규모 조직에서는 도입 가부를 가르는 요건이다. ' +
      '핵심은 사후 점검이 아니라 개발 과정 안에서 실시간으로 차단되는지, 그리고 그 통제를 조직이 중앙에서 설정할 수 있는지다.',
    tools: {
      bob: {
        level: 'full',
        label: '개발 과정에 내장',
        bullets: [
          '프롬프트 정규화, 민감 데이터 스캔, 실시간 정책 집행을 실행 시점에 적용',
          'AI 레드티밍을 개발 워크플로 안에 통합',
        ],
        media: { src: 'assets/img/governance/bob.png', caption: 'Bob의 정책 집행' },
        source: SRC.bobNews,
      },
      claude: {
        level: 'partial',
        label: '권한 제어 중심',
        bullets: ['도구 실행 권한 정책과 훅으로 조직 규칙을 강제', '민감 정보 스캔·레드티밍은 별도 솔루션과 조합해야 함'],
        media: { src: 'assets/img/governance/claude.png', caption: 'Claude Code의 권한 설정' },
        source: SRC.claude,
      },
      codex: {
        level: 'partial',
        label: '샌드박스 중심',
        bullets: ['네트워크 차단과 샌드박스 실행으로 위험 범위를 제한', '조직 정책 엔진 형태의 통제는 제한적'],
        media: { src: 'assets/img/governance/codex.png', caption: 'Codex의 샌드박스' },
        source: SRC.codex,
      },
      cursor: {
        level: 'partial',
        label: '팀 관리 기능',
        bullets: ['프라이버시 모드와 팀 단위 관리자 설정 제공', '코드 저장 여부 통제가 중심이며 정책 집행과는 층위가 다름'],
        media: { src: 'assets/img/governance/cursor.png', caption: 'Cursor의 팀 설정' },
        source: SRC.cursor,
      },
    },
    verdict:
      'Bob의 차별점이 가장 뚜렷한 항목이다. 다른 도구가 권한·샌드박스로 위험 범위를 좁히는 접근이라면 Bob은 정책 집행을 파이프라인 안에 넣는다. ' +
      '다만 이 차이는 규제 요건이 있는 조직에서만 체감되며, 소규모 팀에는 과한 장치다.',
  },

  {
    slug: 'auditability',
    category: '엔터프라이즈 통제',
    name: '감사 추적 · 재현성',
    summary: '에이전트가 무엇을 왜 했는지 기록으로 남기고 같은 작업을 다시 돌릴 수 있는 능력',
    why:
      '규제 대응과 사고 조사에서 요구되는 것은 결과물이 아니라 경위다. "누가 승인했고 무엇이 실행됐는가"를 나중에 재구성할 수 없으면 ' +
      '에이전트가 만든 코드는 감사 관점에서 출처 불명 코드가 된다.',
    tools: {
      bob: {
        level: 'full',
        label: '자기 문서화 기록',
        bullets: [
          'BobShell이 모든 에이전트 행위를 실시간으로 자기 문서화',
          '반복 실행 가능한 워크플로로 만들어 CI/CD에 투입',
        ],
        media: { src: 'assets/img/auditability/bob.png', caption: 'BobShell의 실행 기록' },
        source: SRC.bobNews,
      },
      claude: {
        level: 'partial',
        label: '로그·훅으로 구성',
        bullets: ['세션 기록과 훅으로 감사 로그를 직접 구성할 수 있음', '규제 대응 형식의 기록은 조직이 설계해야 함'],
        media: { src: 'assets/img/auditability/claude.png', caption: 'Claude Code의 로그' },
        source: SRC.claude,
      },
      codex: {
        level: 'partial',
        label: '변경 이력 중심',
        bullets: ['작업 결과가 PR·커밋으로 남아 코드 변경 이력은 추적 가능', '실행 경위 자체의 기록은 제한적'],
        media: { src: 'assets/img/auditability/codex.png', caption: 'Codex의 변경 이력' },
        source: SRC.codex,
      },
      cursor: {
        level: 'partial',
        label: '변경 이력 중심',
        bullets: ['에디터 변경 이력과 체크포인트로 되돌리기 지원', '조직 단위 감사 기록과는 층위가 다름'],
        media: { src: 'assets/img/auditability/cursor.png', caption: 'Cursor의 체크포인트' },
        source: SRC.cursor,
      },
    },
    verdict:
      '되돌리기와 감사 추적을 같은 것으로 보면 판단을 그르친다. 나머지 셋은 개발자가 실수를 되돌리는 장치이고, ' +
      'Bob이 말하는 것은 제3자가 사후에 경위를 재구성하는 기록이다. 규제 대응이 목적이라면 이 구분이 핵심이다.',
  },

  /* ===== D. 도입 조건 =============================================== */
  {
    slug: 'deployment',
    category: '도입 조건',
    name: '배포 형태 · 데이터 위치',
    summary: '제품을 어디에서 돌릴 수 있는지, 코드가 어느 경계를 넘어가는지',
    why:
      '기능이 아무리 좋아도 이 항목에서 막히면 검토가 끝난다. 데이터 주권, 망 분리, 규제 요건이 있는 조직에서는 첫 번째 관문이며, ' +
      '뒤에서 뒤집히지 않도록 가장 먼저 확인해야 한다.',
    tools: {
      bob: {
        level: 'partial',
        label: 'SaaS만 제공',
        bullets: [
          '현재 SaaS 형태로만 제공되며 온프렘 배포는 로드맵 단계',
          '데이터 위치·망 분리 요건이 있는 조직에는 현시점 제약',
        ],
        media: { src: 'assets/img/deployment/bob.png', caption: 'Bob의 제공 형태' },
        source: SRC.bobNews,
      },
      claude: {
        level: 'full',
        label: '자체 클라우드 경유 가능',
        bullets: [
          '기업의 클라우드 계정을 통한 모델 접근 경로를 지원',
          '코드가 나가는 경계를 조직이 선택할 여지가 상대적으로 넓음',
        ],
        media: { src: 'assets/img/deployment/claude.png', caption: 'Claude Code의 배포 옵션' },
        source: SRC.claude,
      },
      codex: {
        level: 'partial',
        label: 'SaaS 중심',
        bullets: ['벤더 서비스 경유가 전제', '로컬 CLI 실행은 가능하나 모델 호출은 외부로 나감'],
        media: { src: 'assets/img/deployment/codex.png', caption: 'Codex의 제공 형태' },
        source: SRC.codex,
      },
      cursor: {
        level: 'partial',
        label: 'SaaS + 프라이버시 모드',
        bullets: ['코드 저장을 막는 프라이버시 모드 제공', '처리 자체는 벤더 인프라를 경유'],
        media: { src: 'assets/img/deployment/cursor.png', caption: 'Cursor의 프라이버시 모드' },
        source: SRC.cursor,
      },
    },
    verdict:
      '네 도구 중 Bob이 유일하게 뒤처지는 항목이다. 앞의 거버넌스 강점은 "SaaS 경계를 받아들일 수 있는 조직"이라는 전제 위에서만 성립한다. ' +
      '망 분리 환경이 대상이라면 온프렘 로드맵 시점을 IBM에 먼저 확인해야 하며, 그 답에 따라 검토 순서가 달라진다.',
  },

  {
    slug: 'model-choice',
    category: '도입 조건',
    name: '모델 선택권 · 종속성',
    summary: '어떤 모델을 쓸지 조직이 정할 수 있는지, 특정 벤더에 묶이는지',
    why:
      '모든 작업에 최상위 모델을 쓰면 비용이 감당되지 않고 저가 모델만 쓰면 품질이 무너진다. ' +
      '수천 명 규모에서는 이 선택을 개인 판단에 맡길지 정책으로 강제할지가 비용 구조를 바꾼다. 모델 시장의 변화 속도를 보면 종속성 자체도 위험 요인이다.',
    tools: {
      bob: {
        level: 'full',
        label: '멀티벤더 자동 라우팅',
        bullets: [
          'IBM Granite, Anthropic Claude, Mistral을 작업에 따라 자동 선택',
          '정확도·지연시간·비용 기준으로 규칙 엔진이 라우팅을 결정',
        ],
        media: { src: 'assets/img/model-choice/bob.png', caption: 'Bob의 모델 라우팅' },
        source: SRC.bobNews,
      },
      claude: {
        level: 'partial',
        label: '자사 모델 내 선택',
        bullets: ['등급별 모델 선택과 작업별 자동 전환 지원', '타사 모델을 섞는 구조는 아님'],
        media: { src: 'assets/img/model-choice/claude.png', caption: 'Claude Code의 모델 선택' },
        source: SRC.claude,
      },
      codex: {
        level: 'partial',
        label: '자사 모델 내 선택',
        bullets: ['자사 모델 계열 안에서 추론 강도를 조절', '벤더 종속성이 가장 높은 편'],
        media: { src: 'assets/img/model-choice/codex.png', caption: 'Codex의 모델 설정' },
        source: SRC.codex,
      },
      cursor: {
        level: 'full',
        label: '멀티벤더 선택',
        bullets: ['여러 벤더 모델을 등록하고 자동 선택 모드 제공', '개발자가 직접 지정하는 것도 가능'],
        media: { src: 'assets/img/model-choice/cursor.png', caption: 'Cursor의 모델 선택' },
        source: SRC.cursor,
      },
    },
    verdict:
      'Cursor도 멀티벤더 선택을 제공하므로 "여러 모델을 쓴다"는 것만으로는 구분되지 않는다. ' +
      'Bob의 실질적 차이는 선택 기준을 개발자가 아니라 조직이 정책으로 통제한다는 점, 그리고 선택지에 IBM 자체 모델이 포함된다는 점이다.',
  },
];
