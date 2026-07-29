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
 *   none    - 해당 기능 없음 (벤더 문서가 부재를 명시한 경우에만 쓴다)
 *   unknown - 근거를 확인하지 못함 (추측으로 채우지 않는다)
 *
 * 근거 등급을 출처 이름에 드러낸다. `공식 문서` > `사내 발표자료`·`벤더 발표` > `보도`.
 * 한 도구는 발표자료로 판정하고 다른 도구는 문서 첫 페이지로 판정하면 표 전체가 무의미해진다.
 */

const META = {
  checkedAt: '2026-07-29',
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
  '작업 방식 · 도달 범위': '언제, 어디서 일을 맡길 수 있는가',
  '엔터프라이즈 통제': '도입해도 안전한가',
  '비용 구조': '얼마가, 어떻게 드는가',
  '도입 조건': '우리 환경에서 쓸 수 있는가',
};

/* 표를 읽지 않는 사람이 가져갈 결론. */
const TAKEAWAYS = [
  {
    kind: 'neutral',
    title: '코딩 기본기로는 고를 수 없다',
    body: '코드베이스 이해, 테스트, MCP 연동은 네 도구가 같은 수준에 올라와 있다. "어느 도구가 코드를 더 잘 쓰는가"로 도입을 결정하려는 시도는 근거를 만들기 어렵다.',
  },
  {
    kind: 'pro',
    title: 'Bob의 값은 SDLC 산출물과 조직 통제에 있다',
    body: 'Bob은 요구사항 명세서·설계서·의사결정 기록을 단계별 산출물로 정의해 남기고, 권한·사용 한도를 조직 단위로 통제하며, COBOL·PL/I·RPG 전용 현대화 패키지를 가진 유일한 도구다. 개별 기능이 아니라 개발 프로세스 자체를 제품이 규정한다는 점이 차별점이다.',
  },
  {
    kind: 'con',
    title: '단, Bob은 개발자 책상 위에서만 돈다',
    body: '실행 표면이 IDE와 터미널 둘뿐이다. 나머지 세 도구는 웹·모바일·Slack에서 작업을 맡기고, 예약 실행과 클라우드 에이전트로 사람이 없는 시간에도 일한다. Bob에서 이에 대응하는 기능은 공식 문서·발표자료 어디에서도 확인되지 않았다.',
  },
  {
    kind: 'neutral',
    title: 'Bob의 프런티어 모델은 Claude다',
    body: 'IBM은 Anthropic과 파트너십을 맺고 Claude를 Bob의 모델 선택지에 넣었다. 따라서 이 비교는 상당 부분 "Claude에 IBM의 거버넌스와 현대화 자산을 얹은 것"과 "Claude 원본"의 비교다. 모델 품질은 변수가 아니며, 얹은 것의 값이 표면·자동화 제약의 값을 넘는지만 판단하면 된다.',
  },
];

const SRC = {
  /* ── Bob: 1차 제품 문서 ─────────────────────────────────────────── */
  bob: { text: 'IBM Bob 공식 문서 (IDE)', url: 'https://bob.ibm.com/docs/ide' },
  bobShell: { text: 'IBM Bob 공식 문서 (Bob Shell)', url: 'https://bob.ibm.com/docs/shell' },
  bobLog: {
    text: 'IBM Bob 공식 체인지로그 (v1.0.1~v2.0.1)',
    url: 'https://bob.ibm.com/docs/ide/changelog',
  },
  bobSec: {
    text: 'IBM Bob 공식 보안 가이드',
    url: 'https://bob.ibm.com/docs/ide/security/bob-security-guidance',
  },
  bobCoins: {
    text: 'IBM Bob 공식 문서 (Bobcoins)',
    url: 'https://bob.ibm.com/docs/ide/account/bobcoins',
  },
  bobSlash: {
    text: 'IBM Bob 공식 문서 (슬래시 커맨드)',
    url: 'https://bob.ibm.com/docs/ide/features/slash-commands',
  },
  bobRules: {
    text: 'IBM Bob 공식 문서 (커스텀 규칙)',
    url: 'https://bob.ibm.com/docs/ide/configuration/rules',
  },

  /* ── Bob: 사내 발표자료 (링크 없음. 1차 문서보다 낮은 등급으로 다룬다) ── */
  bobDeck: { text: 'IBM Bob 발표자료 (사내, 2026)', url: null },

  /* ── Bob: 벤더 발표와 보도 ──────────────────────────────────────── */
  bobNews: {
    text: 'IBM 출시 발표 (2026-04-28, 벤더 발표)',
    url: 'https://newsroom.ibm.com/2026-04-28-introducing-ibm-bob-ai-development-partner-that-takes-enterprises-from-ai-assisted-coding-to-production-ready-software',
  },
  bobJul: {
    text: 'IBM 멀티에이전트·비용 분석 발표 (2026-07-09, 벤더 발표)',
    url: 'https://newsroom.ibm.com/2026-07-09-ibm-advances-enterprise-ai-software-development-with-multi-agent-capabilities-and-specialized-modernization-workflows',
  },
  bobJava: {
    text: 'IBM Bob Premium Package for Java 발표 (벤더 발표)',
    url: 'https://www.ibm.com/new/announcements/announcing-ibm-bob-premium-package-for-java-modernization',
  },
  bobRouting: {
    text: 'Bob 멀티모델 라우팅 (VentureBeat, 보도)',
    url: 'https://venturebeat.com/orchestration/ibm-launches-bob-with-multi-model-routing-and-human-checkpoints-to-turn-ai-coding-into-a-secure-production-system',
  },
  bobGA: {
    text: 'Bob GA 보도 (The Register, 2026-04-28)',
    url: 'https://www.theregister.com/software/2026/04/28/ibms-ai-coding-partner-bob-hits-general-availability/5226774',
  },
  bobPrice: {
    text: 'Bob 요금제 상세 (IT Jungle, 2026-06-01)',
    url: 'https://www.itjungle.com/2026/06/01/big-blue-unveils-bob-premium-pack-for-ibm-i/',
  },
  bobSelfDoc: {
    text: 'BobShell 자기 문서화 (DevOps.com, IBM 주장 인용)',
    url: 'https://devops.com/ibm-bob-takes-ai-coding-assistants-to-the-next-level/',
  },

  /* ── Claude Code: 1차 제품 문서 ─────────────────────────────────── */
  claude: { text: 'Claude Code 문서 (개요·실행 표면)', url: 'https://code.claude.com/docs/en/overview' },
  claudeRoutines: { text: 'Claude Code 문서 (Routines)', url: 'https://code.claude.com/docs/en/routines' },
  claudeSdk: {
    text: 'Claude Code 문서 (Agent SDK)',
    url: 'https://code.claude.com/docs/en/agent-sdk/overview',
  },
  claudeHooks: { text: 'Claude Code 문서 (Hooks)', url: 'https://code.claude.com/docs/en/hooks' },
  claudeSkills: { text: 'Claude Code 문서 (Skills)', url: 'https://code.claude.com/docs/en/skills' },
  claudeSandbox: { text: 'Claude Code 문서 (Sandboxing)', url: 'https://code.claude.com/docs/en/sandboxing' },
  claudeIam: { text: 'Claude Code 문서 (IAM·권한 관리)', url: 'https://code.claude.com/docs/en/iam' },
  claudeGha: {
    text: 'Claude Code 문서 (GitHub Actions)',
    url: 'https://code.claude.com/docs/en/github-actions',
  },
  claudeWeb: {
    text: 'Claude Code 문서 (웹·클라우드 세션)',
    url: 'https://code.claude.com/docs/en/claude-code-on-the-web',
  },
  claudeSlack: { text: 'Claude Code 문서 (Slack)', url: 'https://code.claude.com/docs/en/slack' },
  claudeDeploy: {
    text: 'Claude Code 문서 (엔터프라이즈 배포·서드파티 경유)',
    url: 'https://code.claude.com/docs/en/third-party-integrations',
  },
  claudeAnalytics: {
    text: 'Claude Analytics API 문서',
    url: 'https://platform.claude.com/docs/en/manage-claude/analytics-api',
  },
  claudePrice: { text: 'Claude 요금제', url: 'https://claude.com/pricing' },
  claudeCowork: {
    text: 'Claude Cowork 웹·모바일 확장 (TechCrunch, 2026-07-07)',
    url: 'https://techcrunch.com/2026/07/07/the-coding-agent-wars-are-spilling-into-the-rest-of-the-office-claude-cowork/',
  },

  /* ── Codex ─────────────────────────────────────────────────────── */
  codex: { text: 'OpenAI Codex 문서', url: 'https://learn.chatgpt.com/docs' },
  codexUpgrades: {
    text: 'Codex 업데이트 발표 (OpenAI)',
    url: 'https://openai.com/index/introducing-upgrades-to-codex/',
  },
  codexPrice: {
    text: 'OpenAI Codex 요금 정리 (CloudZero, 3자 정리)',
    url: 'https://www.cloudzero.com/blog/openai-codex-pricing/',
  },

  /* ── Cursor ────────────────────────────────────────────────────── */
  cursor: { text: 'Cursor 문서', url: 'https://cursor.com/docs' },
  cursorCli: { text: 'Cursor CLI', url: 'https://cursor.com/cli' },
  cursorAuto: {
    text: 'Cursor 문서 (Automations · 클라우드 에이전트)',
    url: 'https://cursor.com/docs/cloud-agent/automations',
  },
  cursorSlack: {
    text: 'Cursor 체인지로그 (Slack 백그라운드 에이전트)',
    url: 'https://cursor.com/changelog/1-1',
  },
  cursorPrice: { text: 'Cursor 요금제', url: 'https://www.cursor.com/pricing' },

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
      '판정 기준은 계획을 별도 모드로 분리해 승인 대상으로 다루는지로 잡았다.',
    tools: {
      bob: {
        level: 'full',
        label: 'Plan 모드',
        bullets: [
          'Agent / Ask / Plan 세 모드를 명시적으로 분리해 제공',
          'Plan 모드의 산출물이 대화가 아니라 문서다 — 요구사항 명세서(SRS)와 상세 설계(SDD), 컴포넌트 단위 우선순위와 검증 기준까지 작성',
          '영향도 분석으로 변경 요청의 수정 대상·리스크·작업량을 먼저 산정',
        ],
        media: { src: 'assets/img/plan-design/bob.png', caption: 'Bob의 Plan 모드' },
        source: SRC.bobDeck,
      },
      claude: {
        level: 'full',
        label: 'Plan 모드',
        bullets: [
          '읽기 전용으로 조사한 뒤 계획을 제시하고 승인을 받음. 승인 전까지 파일 수정 차단',
          'VS Code 확장에서 계획 검토(plan review) UI 제공',
          '계획이 세션 산출물로 남으며, 문서 체계로 정의된 산출물은 아님',
        ],
        media: { src: 'assets/img/plan-design/claude.png', caption: 'Claude Code의 Plan 모드' },
        source: SRC.claude,
      },
      codex: {
        level: 'partial',
        label: '승인 정책으로 대체',
        bullets: [
          '계획 전용 모드보다 실행 단위 승인 정책(approval modes)으로 통제',
          '계획 산출물 자체를 승인 대상으로 다루지는 않음',
        ],
        media: { src: 'assets/img/plan-design/codex.png', caption: 'Codex의 승인 모드' },
        source: SRC.codex,
      },
      cursor: {
        level: 'full',
        label: 'Plan 모드',
        bullets: ['작업 전 계획을 세우고 사용자가 검토·수정', '계획에서 실행으로 넘어가는 연결이 매끄러움'],
        media: { src: 'assets/img/plan-design/cursor.png', caption: 'Cursor의 Plan' },
        source: SRC.cursor,
      },
    },
    verdict:
      '계획 모드 자체는 세 도구가 갖췄으므로 있고 없음으로는 갈리지 않는다. 실제 차이는 계획의 산출물 형태다. ' +
      '나머지 셋은 계획을 대화 맥락으로 다루고, Bob은 SRS·SDD라는 정해진 문서로 떨어뜨린다. ' +
      '문서 기반 승인 절차가 이미 있는 조직에서는 이 차이가 크고, 그런 절차가 없는 팀에는 오히려 마찰로 느껴질 수 있다.',
  },

  {
    slug: 'artifacts',
    category: 'SDLC 커버리지',
    name: '산출물 · 문서 체계',
    summary: '개발 단계마다 정해진 문서를 만들고 다음 단계가 그것을 근거로 삼게 하는 구조',
    why:
      '이 축은 "문서를 생성할 수 있는가"를 묻지 않는다. 그건 네 도구가 모두 한다. ' +
      '판정 기준은 SDLC 단계별 산출물이 제품에 정의돼 있고, 뒤 단계가 앞 단계의 산출물을 참조하도록 강제되는지다. ' +
      '산출물이 정해져 있으면 개발자 개인 편차가 줄고 온보딩과 지식 이전이 문서로 이뤄진다. 정해져 있지 않으면 문서는 만들 때마다 다른 모양이 된다.',
    tools: {
      bob: {
        level: 'full',
        label: '단계별 산출물 정의',
        bullets: [
          '요구사항 분석(프로젝트 정의서·요구사항 명세서), 설계(설계 명세서), 개발(개발 표준), 테스트(품질 검증서)를 단계별 산출물로 정의',
          '추적·거버넌스 단계에 진행 기록서와 의사결정 기록서를 두고 Phase gate를 수행',
          '각 단계 산출물을 AI가 다음 단계의 근거로 참고하게 해 일관된 품질을 노림',
          '커스텀 모드로 팀 코딩 표준과 반복 워크플로를 저장해 조직에 확산',
        ],
        media: { src: 'assets/img/artifacts/bob.png', caption: 'Bob의 단계별 산출물' },
        source: SRC.bobDeck,
      },
      claude: {
        level: 'partial',
        label: '문서 생성은 가능',
        bullets: [
          '요구사항·설계·테스트 문서를 생성할 수 있고 CLAUDE.md와 Skills로 팀 표준과 템플릿을 커밋해 재사용 가능',
          '다만 SDLC 단계별 산출물 목록이나 Phase gate가 제품에 정의돼 있지 않아 체계는 조직이 직접 설계해야 함',
        ],
        media: { src: 'assets/img/artifacts/claude.png', caption: 'Claude Code의 문서 생성' },
        source: SRC.claudeSkills,
      },
      codex: {
        level: 'partial',
        label: '문서 생성은 가능',
        bullets: [
          'AGENTS.md로 저장소 규칙을 정의하고 문서를 생성할 수 있음',
          '단계별 산출물 체계는 제품이 규정하지 않음',
        ],
        media: { src: 'assets/img/artifacts/codex.png', caption: 'Codex의 문서 생성' },
        source: SRC.codex,
      },
      cursor: {
        level: 'partial',
        label: '문서 생성은 가능',
        bullets: [
          'Rules와 Team Rules로 조직 표준을 정의하고 문서를 생성할 수 있음',
          '단계별 산출물 체계는 제품이 규정하지 않음',
        ],
        media: { src: 'assets/img/artifacts/cursor.png', caption: 'Cursor의 Rules' },
        source: SRC.cursor,
      },
    },
    verdict:
      '이 표에서 Bob이 가장 뚜렷하게 앞서는 항목이며, 앞의 감사 추적 항목보다 근거가 구체적이다. ' +
      '다만 값은 조직 조건에 강하게 의존한다. 산출물 기반 개발 프로세스를 이미 운영하는 조직에는 도구가 프로세스를 대신 지키는 효과가 나오지만, ' +
      '문서를 형식으로만 남기는 조직에서는 산출물이 하나 더 늘어나는 것으로 끝난다. ' +
      '또한 이 항목의 근거는 IBM 발표자료이므로, 산출물 템플릿을 실제로 우리 표준으로 바꿀 수 있는지는 파일럿에서 확인해야 한다.',
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
        label: '유저 스토리 기반 생성',
        bullets: [
          'Agent 모드에서 유저 스토리를 근거로 테스트 케이스를 생성하고 커버리지를 보장한다고 명시',
          '테스트 문서와 테스트 코드를 함께 산출물로 다룸',
          '사례: Java 현대화 과정에서 자동화 테스트 커버리지를 0에서 92%까지 확보 (Blue Pearl)',
        ],
        media: { src: 'assets/img/testing/bob.png', caption: 'Bob의 테스트 생성' },
        source: SRC.bobDeck,
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
        bullets: [
          '에이전트가 터미널로 테스트를 실행하고 결과를 반영',
          'Automations에 테스트 생성 템플릿을 제공해 예약 실행 가능',
        ],
        media: { src: 'assets/img/testing/cursor.png', caption: 'Cursor의 테스트 실행' },
        source: SRC.cursorAuto,
      },
    },
    verdict:
      '테스트를 쓰고 돌리는 능력 자체는 네 도구가 모두 갖췄다. 차이는 테스트를 코딩 작업의 일부로 보는가, ' +
      '아니면 산출물과 게이트로 관리하는가에 있고 Bob은 후자에 가깝다. ' +
      '다만 커버리지 0→92% 같은 수치는 테스트가 아예 없던 레거시 코드베이스에서 나온 값이므로, ' +
      '이미 테스트가 있는 프로젝트의 기대치로 옮기면 과대평가가 된다.',
  },

  {
    slug: 'code-review',
    category: 'SDLC 커버리지',
    name: '코드 리뷰 · 취약점 진단',
    summary: '작성된 코드에서 결함과 보안 취약점을 찾아내고 수정까지 잇는 단계',
    why:
      '에이전트가 코드를 빠르게 쏟아낼수록 병목은 작성이 아니라 리뷰로 옮겨간다. ' +
      '"리뷰 기능이 있는가"로 물으면 네 도구가 모두 있다고 답하므로 변별이 되지 않는다. ' +
      '판정 기준은 지적 사항이 대화나 코멘트로 흩어지는가, 아니면 목록으로 남아 처리 상태를 추적할 수 있는가로 잡았다. ' +
      '다만 이 기준은 리뷰가 일어나는 시점을 묻지 않는다는 한계가 있어, 각 칸에 그 시점을 함께 적었다.',
    tools: {
      bob: {
        level: 'full',
        label: 'Findings 목록',
        bullets: [
          '/review로 코드베이스를 훑어 취약점·코드 품질 이슈를 심각도별로 Findings 패널에 누적. 항목마다 위치·원인·영향을 함께 제시',
          'SQL Injection, XSS 등을 탐지하고 수정 코드까지 제안한다고 명시',
          '내장 코드 리뷰 워크플로가 v2.0.0(2026-06)에 추가되고 v2.0.1에서 Findings 아이콘 심각도 색상 구분이 붙음',
          '단, 리뷰는 IDE 안에서 사람이 실행하는 방식이다 — PR마다 자동으로 도는 구조는 확인되지 않음',
        ],
        media: { src: 'assets/img/code-review/bob.png', caption: 'Bob의 Findings 패널' },
        source: SRC.bobLog,
      },
      claude: {
        level: 'partial',
        label: 'PR 자동 리뷰',
        bullets: [
          'GitHub Code Review로 모든 PR에 자동 리뷰를 붙이고, 보안 리뷰 명령으로 변경분을 점검',
          '결과가 세션 출력이나 PR 코멘트로 남아, 미처리 항목을 목록으로 관리하는 구조는 아님',
          '리뷰 시점 면에서는 Bob보다 앞선다 — 사람이 실행하지 않아도 PR마다 돈다',
        ],
        media: { src: 'assets/img/code-review/claude.png', caption: 'Claude Code의 PR 리뷰' },
        source: SRC.claudeGha,
      },
      codex: {
        level: 'partial',
        label: 'PR 자동 리뷰',
        bullets: [
          '설정에서 Automatic reviews를 켜면 멘션 없이 새 PR을 자동 리뷰',
          '리뷰가 클라우드 작업으로 돌고 권한이 있으면 수정을 브랜치에 직접 푸시',
          '지적 사항의 처리 상태는 PR 도구 쪽에서 관리',
        ],
        media: { src: 'assets/img/code-review/codex.png', caption: 'Codex의 PR 리뷰' },
        source: SRC.codexUpgrades,
      },
      cursor: {
        level: 'partial',
        label: 'Bugbot',
        bullets: [
          'Bugbot이 PR에 결함을 코멘트로 남기고 "Fix in Cursor"로 해당 코드로 점프',
          'Bugbot Autofix와 Security Review를 별도 기능으로 제공하며 관리자 화면에서 사용량을 분리해 집계',
          'Bugbot은 Pro 기준 사용자당 월 $40의 별도 과금',
        ],
        media: { src: 'assets/img/code-review/cursor.png', caption: 'Cursor의 Bugbot' },
        source: SRC.cursorPrice,
      },
    },
    verdict:
      '판정 기준을 "목록으로 남는가"로 잡으면 Bob이 앞서지만, 이 결론은 기준에 의존한다는 점을 분명히 해야 한다. ' +
      '기준을 "사람이 잊어도 리뷰가 도는가"로 바꾸면 순위가 뒤집힌다 — 나머지 셋은 PR마다 자동으로 리뷰하고 Bob은 개발자가 /review를 쳐야 한다. ' +
      '조직 관점에서 리뷰 누락을 막는 것은 목록보다 자동 실행이므로, 이 항목은 Bob의 우위로 읽기보다 두 방식이 서로를 대체하지 못한다고 읽는 편이 정확하다. ' +
      '진단 품질은 형태와 별개이며, 우리 코드베이스의 오탐률은 파일럿으로 직접 재야 한다.',
  },

  {
    slug: 'delivery',
    category: 'SDLC 커버리지',
    name: '배포 · 파이프라인 연계',
    summary: '코드 작성 이후 CI/CD와 릴리스 과정까지 이어지는 자동화',
    why:
      '개발 도구의 생산성 이득은 대개 "코드가 작성된 시점"에서 측정되지만 실제 리드타임은 그 이후 구간에서 더 많이 소모된다. ' +
      '판정 기준은 벤더가 관리하는 CI/CD 통합 경로가 제품 문서에 있는지로 잡았다. ' +
      '"CLI를 스크립트에서 부를 수 있다"는 어느 CLI나 되는 얘기이므로 그것만으로는 기준을 넘지 못한다.',
    tools: {
      bob: {
        level: 'partial',
        label: 'Shell 비대화형 실행',
        bullets: [
          'Bob Shell이 비대화형 세션을 지원해 스크립트와 CI 환경에서 호출 가능',
          '발표자료는 "Bob을 CI/CD 및 GitHub 워크플로에 내재화"를 도입 3단계 목표로 제시',
          '다만 GitHub Actions·GitLab CI용 전용 통합이나 마켓플레이스 액션은 공식 문서에서 확인되지 않음',
        ],
        media: { src: 'assets/img/delivery/bob.png', caption: 'Bob Shell의 CI 실행' },
        source: SRC.bobShell,
      },
      claude: {
        level: 'full',
        label: '전용 CI 통합',
        bullets: [
          'GitHub Actions와 GitLab CI/CD용 전용 통합을 공식 문서로 제공',
          '비대화형 모드(claude -p)로 파이프에 끼워 넣거나 CI 단계로 실행',
          'Routines의 API 트리거로 배포 파이프라인이 배포 후 검증을 호출하는 구성 가능',
        ],
        media: { src: 'assets/img/delivery/claude.png', caption: 'Claude Code의 CI 통합' },
        source: SRC.claudeGha,
      },
      codex: {
        level: 'full',
        label: 'GitHub 연동 + 클라우드',
        bullets: [
          'GitHub 통합으로 이슈·PR 이벤트에서 클라우드 작업을 실행하고 변경분을 PR로 제출',
          '릴리스 승인 자체를 조율하는 구조는 아님',
        ],
        media: { src: 'assets/img/delivery/codex.png', caption: 'Codex의 GitHub 연동' },
        source: SRC.codex,
      },
      cursor: {
        level: 'full',
        label: 'CLI + GitHub Actions',
        bullets: [
          'Cursor CLI를 GitHub Actions에서 실행해 문서 갱신·보안 리뷰를 자동화',
          'Automations로 파이프라인성 작업을 예약 실행',
        ],
        media: { src: 'assets/img/delivery/cursor.png', caption: 'Cursor CLI의 CI 실행' },
        source: SRC.cursorCli,
      },
    },
    verdict:
      '초안에서 이 항목은 Bob이 앞서는 것으로 판정돼 있었으나, 근거를 다시 보면 유지되지 않는다. ' +
      'Bob 쪽 근거는 "계획부터 배포까지 조율한다"는 발표 문구이고, 나머지 셋은 벤더가 관리하는 CI 통합 경로를 문서로 갖고 있다. ' +
      '"AI 코딩 보조에서 AI 딜리버리로"라는 표현은 SDLC 산출물과 모드 체계에 대한 주장으로는 성립하지만, ' +
      '파이프라인 연계라는 기계적 항목에서는 Bob이 오히려 뒤처져 있다. 이 칸은 우리 CI 환경에서 Bob Shell을 실제로 돌려 보고 확정해야 한다.',
  },

  {
    slug: 'modernization',
    category: 'SDLC 커버리지',
    name: '레거시 현대화',
    summary: '오래된 언어·프레임워크·런타임을 최신 버전으로 옮기는 대규모 일괄 작업',
    why:
      '기술 부채는 대개 사람을 붙여 몇 달씩 태우는 방식으로 처리된다. 반복적이고 범위가 명확해 자동화 효과가 가장 크게 나오는 영역이며, ' +
      '투자 대비 효과를 숫자로 제시하기도 쉽다. 우리 자산 구성에 COBOL·PL/I·RPG가 있다면 이 항목의 가중치가 가장 높다.',
    tools: {
      bob: {
        level: 'full',
        label: '플랫폼별 전용 패키지',
        bullets: [
          'Premium Package for Java: Java 8 이하 → 25 업그레이드, Liberty 전환, 의존성 분석, 보안 개선을 묶은 워크플로. IBM Application Modernization Accelerator와 통합',
          'Z용(COBOL·PL/I·JCL)과 IBM i용(RPG·CL·DDS) 패키지를 따로 제공 — 타 도구에 대응물이 없는 영역',
          '고객 사례: Blue Pearl이 Java 11→25 전환과 지원 종료 API 127개 해소를 30일 이상 → 약 3일로 단축. APIS IT가 .NET Core 3.1→8 전환을 4~5시간에 완료, 20년 된 EGL/CICS 문서화 10배 가속',
          '단, Premium Package는 기본 구독에 포함되지 않는 별도 계약 대상',
        ],
        media: { src: 'assets/img/modernization/bob.png', caption: 'Bob의 현대화 워크플로' },
        source: SRC.bobJava,
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
        bullets: ['병렬 클라우드 작업으로 대량 변경을 처리할 수 있음', '레거시 전용 자산은 제공하지 않음'],
        media: { src: 'assets/img/modernization/codex.png', caption: 'Codex의 대량 변경' },
        source: SRC.codex,
      },
      cursor: {
        level: 'partial',
        label: '범용 역량으로 수행',
        bullets: ['다중 파일 편집과 클라우드 에이전트로 마이그레이션 수행 가능', '레거시 전용 자산은 제공하지 않음'],
        media: { src: 'assets/img/modernization/cursor.png', caption: 'Cursor의 다중 파일 편집' },
        source: SRC.cursor,
      },
    },
    verdict:
      '네 도구 모두 마이그레이션을 "할 수는" 있다. 차이는 전용 워크플로와 검증 자산이 준비돼 있는지이며, ' +
      'COBOL·PL/I·RPG처럼 범용 도구가 학습 데이터로만 아는 영역에서는 이 격차가 특히 크다. 이 표에서 Bob의 우위가 가장 확실한 항목이다. ' +
      '다만 세 가지를 함께 봐야 한다. 인용된 수치는 IBM이 고른 성공 사례이고 대상 코드베이스의 상태에 크게 좌우된다. ' +
      'Premium Package는 유료 애드온이므로 이 강점은 기본 구독 가격이 아니라 추가 비용을 전제로 계산해야 한다. ' +
      '그리고 현대화는 일회성 프로젝트이므로, 이 항목 하나로 상시 개발 도구를 결정하면 프로젝트가 끝난 뒤의 판단 근거가 남지 않는다.',
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
        bullets: [
          '코드 생성, 리팩터링, 디버깅, 코드베이스 질의응답을 기본 제공',
          'v2.0.0에서 컨텍스트 창을 200K → 270K로 확장하고 긴 작업의 자동 압축을 추가',
          '.docx·.pdf·.xlsx 읽기와 구조화된 grep 결과 지원',
        ],
        media: { src: 'assets/img/codebase/bob.png', caption: 'Bob의 코드베이스 분석' },
        source: SRC.bobLog,
      },
      claude: {
        level: 'full',
        label: '대규모 저장소 탐색',
        bullets: [
          '탐색·편집·명령 실행을 한 흐름에서 수행',
          '긴 작업의 컨텍스트 관리 장치와 세션 간 자동 메모리 제공',
        ],
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
      'Bob이 프런티어 작업에 Claude를 호출한다는 점을 감안하면 이 결과는 당연하다 — 같은 모델이 같은 일을 한다. ' +
      '따라서 "어느 도구가 코드를 더 잘 쓰는가"로 도입을 결정하려는 시도는 근거를 만들기 어렵고, 아래 통제·비용·작업 방식 항목으로 판단 축을 옮기는 것이 맞다.',
  },

  {
    slug: 'orchestration',
    category: '엔지니어링 기반',
    name: '병렬 에이전트 오케스트레이션',
    summary: '큰 작업을 여러 갈래로 나눠 독립된 에이전트가 동시에 처리하는 구조',
    why:
      '단일 에이전트는 컨텍스트가 길어질수록 정확도가 떨어진다. 작업을 쪼개 각각 독립 컨텍스트에서 처리하면 대규모 변경에서 처리량과 정확도가 함께 올라간다. ' +
      '비용 관점도 있다 — 탐색 단계를 서브에이전트에 격리하면 메인 컨텍스트가 부풀지 않는다.',
    tools: {
      bob: {
        level: 'full',
        label: '역할 기반 서브에이전트',
        bullets: [
          'v2.0.0(2026-06)에 서브에이전트가 추가되어 복잡한 작업을 병렬 워크스트림으로 분해. 실행 전 사용자 승인 필요',
          '파일 읽기·검색 같은 탐색 단계를 서브에이전트에 격리해 컨텍스트와 비용을 관리',
          '모델이 한 턴에 여러 도구를 요청해 함께 실행하는 병렬 도구 호출 지원',
          '경쟁 도구 대비 늦게 도입된 기능이다 — Claude Code는 그 이전부터 제공',
        ],
        media: { src: 'assets/img/orchestration/bob.png', caption: 'Bob의 서브에이전트 분기' },
        source: SRC.bobLog,
      },
      claude: {
        level: 'full',
        label: '서브에이전트 + 병렬 세션',
        bullets: [
          '역할별 서브에이전트를 정의해 독립 컨텍스트에서 병렬 실행. 리드 에이전트가 분배와 병합을 조율',
          '여러 전체 세션을 한 화면에서 동시에 돌리는 백그라운드 에이전트 뷰 제공',
        ],
        media: { src: 'assets/img/orchestration/claude.png', caption: 'Claude Code의 서브에이전트' },
        source: SRC.claude,
      },
      codex: {
        level: 'partial',
        label: '작업 단위 병렬화',
        bullets: ['격리 환경에서 여러 클라우드 작업을 동시에 실행', '한 작업 안에서 에이전트를 분기시키는 구조와는 결이 다름'],
        media: { src: 'assets/img/orchestration/codex.png', caption: 'Codex의 병렬 작업' },
        source: SRC.codex,
      },
      cursor: {
        level: 'partial',
        label: '병렬 클라우드 에이전트',
        bullets: [
          '클라우드 에이전트를 여러 개 동시에 띄워 격리된 VM에서 병렬 처리',
          '한 작업 안에서 서브에이전트로 분기하는 기능의 범위는 공식 문서로 확정하지 못함',
        ],
        media: { src: 'assets/img/orchestration/cursor.png', caption: 'Cursor의 클라우드 에이전트' },
        source: SRC.cursorAuto,
      },
    },
    verdict:
      '병렬 실행 자체는 Claude Code가 동등하게, 그리고 더 먼저 제공했으므로 "몇 개를 동시에 돌리는가"는 변별점이 아니다. ' +
      'Bob의 차이는 분기 단위를 SDLC 역할과 모드로 잡는다는 점이며, 앞의 산출물 체계와 묶일 때만 의미가 생긴다. ' +
      '기술적 병렬성만 필요하다면 이 항목은 Bob을 고를 이유가 되지 않는다.',
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
        label: 'MCP + IBM 제품군',
        bullets: [
          '설정 패널에서 MCP 서버 추가·구성·제거. 로컬 실행과 원격 실행 모두 선택 가능',
          'v2.0.1에서 MCP 리소스·프롬프트를 @ 멘션과 / 액션으로 호출하고 서버 입력값을 검증',
          'Instana(관측), Turbonomic(리소스 최적화), Concert(취약성), Terraform, Vault 등 IBM·파트너 제품 연동을 활용 사례로 제시',
        ],
        media: { src: 'assets/img/integration/bob.png', caption: 'Bob의 MCP 설정' },
        source: SRC.bobLog,
      },
      claude: {
        level: 'full',
        label: 'MCP 지원',
        bullets: [
          'MCP 표준을 제안한 주체로 로컬·원격 서버 모두 지원',
          '프로젝트/사용자 단위로 서버 범위 분리, 커밋 가능한 .mcp.json으로 팀 공유',
        ],
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
        bullets: ['설정 UI에서 MCP 서버를 등록해 에이전트 도구로 사용', 'MCP Apps와 팀 마켓플레이스로 조직 내 배포'],
        media: { src: 'assets/img/integration/cursor.png', caption: 'Cursor의 MCP' },
        source: SRC.cursor,
      },
    },
    verdict:
      'MCP는 네 도구 모두가 지원하는 사실상의 표준이 되었다. Bob의 차별점이 아니다. ' +
      '다만 이는 사내 연동 자산이 특정 도구에 묶이지 않는다는 뜻이므로, 도입 판단에서는 전환 위험을 낮추는 근거로 읽는 편이 맞다. ' +
      'Bob 쪽에서 실제 차이가 나는 부분은 MCP 자체가 아니라 IBM 제품군과의 기성 연동이며, 그 제품들을 이미 쓰는 조직에서만 값이 된다.',
  },

  {
    slug: 'extensibility',
    category: '엔지니어링 기반',
    name: '확장 · 커스터마이즈',
    summary: '조직의 규칙과 반복 작업을 파일로 정의해 저장소에 커밋하고 팀이 공유하는 구조',
    why:
      'MCP가 외부 시스템 연결이라면 이 항목은 에이전트 자신의 행동 규정이다. 층위가 달라 서로를 대체하지 못한다. ' +
      '판정 기준은 두 가지다. 규칙과 워크플로를 코드로 관리해 팀이 공유할 수 있는가, 그리고 그 규칙을 사람의 준수에 맡기지 않고 훅으로 강제할 수 있는가.',
    tools: {
      bob: {
        level: 'partial',
        label: '규칙 · 커맨드 · Skills',
        bullets: [
          '커스텀 규칙으로 코딩 스타일·문서화 방식·판단 기준을 지정',
          '마크다운 파일로 커스텀 슬래시 커맨드를 만들어 반복 작업을 자동화',
          '커스텀 모드로 도구 접근·파일 권한·행동 지침을 묶어 새 어시스턴트를 정의하고, v2.0.0에서 워크스페이스 범위 모드 관리와 Skills 설정 탭 추가',
          '발표자료는 Rules·Skills·AGENTS.md를 팀 표준의 코드 관리 수단으로 제시',
          '다만 에디터 이벤트에 스크립트를 걸어 규칙을 강제하는 훅은 공식 문서에서 확인되지 않음',
        ],
        media: { src: 'assets/img/extensibility/bob.png', caption: 'Bob의 커스텀 규칙과 모드' },
        source: SRC.bobRules,
      },
      claude: {
        level: 'full',
        label: '규칙 · Skills · 훅',
        bullets: [
          'CLAUDE.md로 프로젝트 표준을 지정하고 세션 간 자동 메모리를 축적',
          'Skills로 반복 워크플로를 패키징해 팀이 공유. 저장소에 커밋하면 클라우드 세션에서도 동작',
          'Hooks로 파일 편집 후 자동 포맷, 커밋 전 린트 같은 규칙을 셸 명령으로 강제',
          '서브에이전트 정의와 플러그인으로 확장 단위를 조직 자산화',
        ],
        media: { src: 'assets/img/extensibility/claude.png', caption: 'Claude Code의 Skills와 Hooks' },
        source: SRC.claudeHooks,
      },
      codex: {
        level: 'full',
        label: 'AGENTS.md · Skills · 훅',
        bullets: [
          'AGENTS.md로 저장소 규칙을 정의 (Bob·Cursor도 같은 관례를 수용)',
          '커스텀 프롬프트, Skills·플러그인, 훅을 문서화된 확장 수단으로 제공',
        ],
        media: { src: 'assets/img/extensibility/codex.png', caption: 'Codex의 AGENTS.md' },
        source: SRC.codex,
      },
      cursor: {
        level: 'full',
        label: 'Rules · Skills · 훅',
        bullets: [
          'Rules와 Team Rules로 조직 전역 정책을 정의하고 Bugbot 규칙까지 적용',
          'Hooks로 onPreEdit·onPostEdit·onPreCommit·onApprove 이벤트에 bash·Node·Python 스크립트를 연결',
          '팀 마켓플레이스로 확장 자산을 조직 내 배포',
        ],
        media: { src: 'assets/img/extensibility/cursor.png', caption: 'Cursor의 Rules와 Hooks' },
        source: SRC.cursor,
      },
    },
    verdict:
      '초안에서 이 축은 "사내 시스템 연동과 겹친다"는 이유로 빠져 있었지만 판단 근거가 다르므로 겹치지 않는다. ' +
      '넣어 보면 Bob은 규칙·커맨드·Skills·모드를 갖춰 크게 뒤지지 않는다 — 즉 이 축을 뺀 것은 Bob에게 유리한 선택이 아니었다. ' +
      '차이가 나는 지점은 훅 하나다. 나머지 셋은 규칙 위반을 스크립트로 차단할 수 있고 Bob은 규칙을 프롬프트로 전달한다. ' +
      '"조직 표준을 강제한다"가 도입 명분이라면 이 차이는 그 명분의 핵심에 걸리므로, Bob의 훅 지원 여부를 IBM에 확인해야 한다.',
  },

  {
    slug: 'embedding',
    category: '엔지니어링 기반',
    name: '프로그래밍 임베딩',
    summary: '사내 도구나 파이프라인 안에 에이전트를 부품으로 넣을 수 있는지',
    why:
      '도구를 UI로만 쓸 수 있으면 자동화의 상한이 제품이 제공하는 기능까지로 고정된다. ' +
      '판정 기준은 벤더가 SDK를 제공해 에이전트를 우리 코드 안에서 호출하고 오케스트레이션·권한까지 제어할 수 있는지로 잡았다. ' +
      '비대화형 CLI 호출만 되는 경우는 부분으로 둔다.',
    tools: {
      bob: {
        level: 'partial',
        label: 'Shell 비대화형',
        bullets: [
          'Bob Shell의 비대화형 세션으로 스크립트·자동화에서 호출 가능',
          '에이전트를 우리 코드에 임베딩하는 별도 SDK는 공식 문서에서 확인되지 않음',
          'watsonx Orchestrate SDK 연동은 Bob으로 다른 에이전트를 만드는 용도이며 Bob 자체를 임베딩하는 수단이 아님',
        ],
        media: { src: 'assets/img/embedding/bob.png', caption: 'Bob Shell 비대화형 실행' },
        source: SRC.bobShell,
      },
      claude: {
        level: 'full',
        label: 'Agent SDK',
        bullets: [
          'Agent SDK로 Claude Code의 도구·권한을 쓰는 자체 에이전트를 구축. Python·Node가 도는 곳이면 어디서든 호스팅',
          '오케스트레이션·도구 접근·권한을 코드로 제어',
          'claude -p로 유닉스 파이프에 끼워 넣는 방식도 지원',
        ],
        media: { src: 'assets/img/embedding/claude.png', caption: 'Claude Agent SDK' },
        source: SRC.claudeSdk,
      },
      codex: {
        level: 'full',
        label: 'Codex SDK',
        bullets: ['SDK를 공식 문서에 두고 에이전트를 외부 시스템에 임베딩'],
        media: { src: 'assets/img/embedding/codex.png', caption: 'Codex SDK' },
        source: SRC.codex,
      },
      cursor: {
        level: 'partial',
        label: 'CLI 호출',
        bullets: [
          'Cursor CLI로 GitHub Actions·스크립트에서 에이전트를 실행하고 커스텀 에이전트를 구성',
          '언어 SDK 형태의 임베딩 수단은 공식 문서로 확인하지 못함',
        ],
        media: { src: 'assets/img/embedding/cursor.png', caption: 'Cursor CLI' },
        source: SRC.cursorCli,
      },
    },
    verdict:
      '사내 플랫폼 팀이 에이전트를 자체 도구에 넣어 재판매하려는 계획이 있다면 이 항목이 결정적이다. ' +
      'Bob은 CLI 호출까지이므로 자동화의 형태가 셸 스크립트로 제한된다. ' +
      '반대로 완성된 제품을 그대로 쓰는 것이 목표라면 이 축의 가중치는 낮다. 우리 조직의 계획이 어느 쪽인지에 따라 이 행은 무시해도 되는 항목이 된다.',
  },

  /* ===== C. 작업 방식 · 도달 범위 =================================== */
  {
    slug: 'surfaces',
    category: '작업 방식 · 도달 범위',
    name: '실행 표면',
    summary: '같은 도구를 어디서 띄울 수 있는지 — IDE, 터미널, 데스크톱, 웹, 모바일, 채팅',
    why:
      '표면 수는 제품 사양처럼 보이지만 실제로는 "언제 일을 맡길 수 있는가"를 정한다. IDE 안에서만 도는 도구는 개발자가 자리에 앉아 있는 시간에만 쓰인다. ' +
      '판정 기준은 개발자 책상을 벗어난 표면(웹·모바일·채팅)이 있는지, 그리고 표면 사이로 작업을 이어받을 수 있는지로 잡았다.',
    tools: {
      bob: {
        level: 'partial',
        label: 'IDE + 터미널',
        bullets: [
          'Bob-IDE(VS Code 포크)와 Bob Shell(터미널) 두 표면. 발표자료도 "깃, 터미널 등 개발 환경"으로 범위를 설명',
          'v2.0.1에서 bob.ibm.com 통합 로그인과 워크스페이스 간 작업 조회가 추가됐으나, 웹에서 작업을 실행하는 기능은 아님',
          'JetBrains 플러그인, 웹 앱, 모바일 앱, Slack 연동은 공식 문서·발표자료 어디에서도 확인되지 않음',
        ],
        media: { src: 'assets/img/surfaces/bob.png', caption: 'Bob-IDE와 Bob Shell' },
        source: SRC.bobLog,
      },
      claude: {
        level: 'full',
        label: '터미널·IDE·데스크톱·웹·모바일',
        bullets: [
          '터미널, VS Code, JetBrains, 데스크톱 앱, 웹(claude.ai/code), 모바일(iOS·Android)에서 동일 엔진 사용',
          'Slack 멘션으로 버그 리포트를 PR로 받고, GitHub Actions·GitLab CI에서 실행',
          '표면 간 이동 지원 — /desktop, claude --cloud, --teleport, Remote Control로 세션을 옮김',
          'CLAUDE.md·설정·MCP 서버가 모든 표면에서 그대로 동작',
        ],
        media: { src: 'assets/img/surfaces/claude.png', caption: 'Claude Code의 실행 표면' },
        source: SRC.claude,
      },
      codex: {
        level: 'full',
        label: 'CLI·IDE·데스크톱·웹·모바일',
        bullets: [
          'CLI, IDE 확장, macOS·Windows 데스크톱 앱, 웹, GitHub, Slack, 모바일',
          'Slack에서 @Codex 멘션으로 클라우드 작업을 생성하고 결과를 리뷰 가능한 diff로 받음',
        ],
        media: { src: 'assets/img/surfaces/codex.png', caption: 'Codex의 실행 표면' },
        source: SRC.codex,
      },
      cursor: {
        level: 'full',
        label: 'IDE·웹·모바일·Slack·CLI',
        bullets: [
          'IDE, 웹 앱, 모바일 앱, Slack, CLI에서 접근',
          'Slack에서 @Cursor 멘션으로 백그라운드 에이전트를 띄우고 대화를 벗어나지 않고 PR 생성',
          'JetBrains는 ACP를 통해 지원',
        ],
        media: { src: 'assets/img/surfaces/cursor.png', caption: 'Cursor의 실행 표면' },
        source: SRC.cursorSlack,
      },
    },
    verdict:
      'Bob이 가장 크게 뒤처지는 항목이다. 초안에서는 이 축이 "제품 사양이지 역량이 아니다"라는 이유로 빠져 있었으나, ' +
      '표면은 작업을 맡길 수 있는 시점을 정하므로 역량으로 다뤄야 한다. ' +
      '더 중요한 것은 이 결과가 앞의 주장과 충돌한다는 점이다. IBM은 Bob을 요구사항부터 유지보수까지 아우르는 조직 단위 SDLC 파트너로 제시하는데, ' +
      '기획자·PM·QA가 접근할 수 있는 표면은 개발자용 IDE와 터미널뿐이다. SDLC 전체를 대상으로 한다는 주장과 개발자 도구라는 실물 사이의 간격이 이 행에서 드러난다.',
  },

  {
    slug: 'async',
    category: '작업 방식 · 도달 범위',
    name: '비동기 위임 · 클라우드 실행',
    summary: '내 컴퓨터를 벗어난 곳에서 에이전트가 돌고, 끝나면 결과를 받아오는 방식',
    why:
      '오래 걸리는 작업을 로컬에서 돌리면 그 시간 동안 기계와 사람이 함께 묶인다. 클라우드에서 돌면 여러 작업을 동시에 던져 두고 결과만 확인하면 된다. ' +
      '판정 기준은 벤더가 관리하는 실행 환경에서 작업이 돌고, 로컬 세션을 닫아도 계속되는지로 잡았다.',
    tools: {
      bob: {
        level: 'unknown',
        label: null,
        bullets: [
          '공식 문서, v1.0.1~v2.0.1 체인지로그, 사내 발표자료 전체에서 로컬 밖에서 도는 에이전트 기능을 찾지 못함',
          '사내에서 쓰는 Bob에 해당 기능이 있는지 IBM 확인 필요 — 없다고 확정할 근거도 아직 없으므로 비워 둔다',
        ],
        media: null,
        source: null,
      },
      claude: {
        level: 'full',
        label: '클라우드 세션',
        bullets: [
          '웹·모바일에서 장시간 작업을 시작하고 로컬 설정 없이 실행. 노트북을 닫아도 계속됨',
          'claude --cloud로 로컬에서 시작한 작업을 클라우드로 넘기고, --teleport로 터미널로 회수',
          '클라우드 환경마다 네트워크 접근 수준·환경 변수·셋업 스크립트를 지정',
        ],
        media: { src: 'assets/img/async/claude.png', caption: 'Claude Code 클라우드 세션' },
        source: SRC.claudeWeb,
      },
      codex: {
        level: 'full',
        label: 'Codex Cloud',
        bullets: [
          'CLI·Slack·GitHub 이슈에서 작업을 던지면 격리된 클라우드 샌드박스에서 실행',
          '결과를 리뷰 가능한 diff로 받아 명령 한 번으로 로컬에 병합',
        ],
        media: { src: 'assets/img/async/codex.png', caption: 'Codex Cloud' },
        source: SRC.codex,
      },
      cursor: {
        level: 'full',
        label: 'Cloud Agents',
        bullets: [
          '2026-02 출시. Cursor의 격리된 VM에서 실행되며 웹·데스크톱·모바일·Slack·GitHub에서 접근',
          'GitHub 이슈를 읽어 브랜치를 만들고 PR 초안까지 작성',
          '로컬 자원을 쓰는 원격 에이전트와 클라우드 VM 에이전트를 구분해 제공',
        ],
        media: { src: 'assets/img/async/cursor.png', caption: 'Cursor Cloud Agents' },
        source: SRC.cursorAuto,
      },
    },
    verdict:
      'Bob을 제외한 셋이 2026년 상반기에 모두 이 방향으로 움직였다. 경쟁 도구들의 제품 개발 방향이 수렴한 지점이라는 뜻이므로, ' +
      'Bob에 이 기능이 없다면 로드맵상 격차로 다뤄야 한다. ' +
      '실무 영향은 대규모 현대화에서 가장 크다 — 수십 개 모듈을 동시에 돌리려면 로컬 IDE 한 대가 병목이 된다. ' +
      'Bob의 강점인 현대화 시나리오에서 이 제약이 걸린다는 점을 함께 봐야 한다.',
  },

  {
    slug: 'scheduling',
    category: '작업 방식 · 도달 범위',
    name: '예약 실행 · 무인 자동화',
    summary: '사람이 지시하지 않아도 정해진 시점이나 사건에 에이전트가 스스로 도는 구조',
    why:
      '반복 작업(야간 CI 실패 분석, 주간 의존성 점검, 문서 최신화)은 사람이 기억해서 실행하는 순간 누락된다. ' +
      '판정 기준은 스케줄이나 외부 사건을 트리거로 에이전트가 무인 실행되는지로 잡았다. ' +
      '이 기능이 없으면 자동화는 사람이 앉아 있는 시간 안으로 제한된다.',
    tools: {
      bob: {
        level: 'unknown',
        label: null,
        bullets: [
          '공식 문서, 체인지로그, 사내 발표자료에서 예약 실행·cron·이벤트 트리거 기능을 찾지 못함',
          '발표자료는 CI/CD 내재화를 도입 3단계 목표로 제시하지만 제품 기능으로서의 스케줄러는 언급되지 않음',
          'IBM 확인 필요 — 임의로 미지원으로 판정하지 않는다',
        ],
        media: null,
        source: null,
      },
      claude: {
        level: 'full',
        label: 'Routines',
        bullets: [
          'Anthropic 관리 클라우드에서 실행돼 노트북이 꺼져 있어도 계속 동작',
          '트리거 3종 — 스케줄(시간·일·주 프리셋, 커스텀 cron, 최소 주기 1시간), HTTP API, GitHub 이벤트(PR·릴리스, 필터 지정 가능)',
          '웹·데스크톱·CLI(/schedule)에서 생성하고, Team·Enterprise 관리자가 조직 전체에 대해 끌 수 있음',
          '단, 리서치 프리뷰 단계이며 동작·한도·API가 바뀔 수 있다고 문서에 명시',
        ],
        media: { src: 'assets/img/scheduling/claude.png', caption: 'Claude Code Routines' },
        source: SRC.claudeRoutines,
      },
      codex: {
        level: 'full',
        label: '예약 · 자동 리뷰',
        bullets: ['예약·반복 작업을 문서화된 기능으로 제공', '설정에서 새 PR 자동 리뷰를 상시 실행'],
        media: { src: 'assets/img/scheduling/codex.png', caption: 'Codex의 예약 작업' },
        source: SRC.codex,
      },
      cursor: {
        level: 'full',
        label: 'Automations',
        bullets: [
          'cron 기반 예약으로 주간 보안 스캔, 야간 테스트 커버리지 리포트, 일간 의존성 점검을 무인 실행',
          'PR 리뷰·보안 감사·테스트 생성·버그 트리아지 템플릿 제공',
          '웹훅으로 외부 사건에서 트리거',
        ],
        media: { src: 'assets/img/scheduling/cursor.png', caption: 'Cursor Automations' },
        source: SRC.cursorAuto,
      },
    },
    verdict:
      '경영 관점에서 이 항목이 뜻하는 바는 단순하다. 나머지 셋은 사람이 없는 시간에도 일하고 Bob은 그렇지 않다. ' +
      '특히 Bob이 강점으로 내세우는 보안 스캔과 코드 품질 점검은 상시 반복이 본질인 작업이므로, ' +
      '경쟁 도구가 이를 야간 예약으로 돌리는 동안 Bob은 개발자가 /review를 실행할 때만 돈다. ' +
      '기능 목록 비교에서는 잘 드러나지 않지만 실제 운영에서는 격차가 누적되는 항목이다.',
  },

  {
    slug: 'teamwork',
    category: '작업 방식 · 도달 범위',
    name: '팀 협업 · 비개발자 위임',
    summary: '코드를 쓰지 않는 구성원이 같은 에이전트에 일을 맡길 수 있는지',
    why:
      '도입 규모가 개발조직을 넘어가는지를 가르는 항목이다. 개발자 도구로 남으면 좌석 수가 개발자 수로 묶이고, ' +
      '기획·QA·운영까지 넓어지면 같은 계약으로 얻는 범위가 달라진다. ' +
      '판정 기준은 비개발 구성원이 쓸 수 있는 별도 표면이 있는지로 잡았다. 관리자 화면은 관리 기능이므로 여기에 해당하지 않는다.',
    tools: {
      bob: {
        level: 'unknown',
        label: null,
        bullets: [
          '엔터프라이즈 플랜에 팀 관리·역할 지정·Bobcoin 배분이 있으나 이는 관리 기능이며 비개발자가 작업을 맡기는 표면은 아님',
          '발표자료가 Product Owner·PM·Business Analyst·QA 등 13개 역할을 대상으로 그리지만, 그 역할들이 접근하는 표면은 제시되지 않음',
          '비개발자용 표면 존재 여부 IBM 확인 필요',
        ],
        media: null,
        source: SRC.bobDeck,
      },
      claude: {
        level: 'full',
        label: 'Cowork',
        bullets: [
          '코딩이 아닌 일반 업무를 에이전트에 맡기는 Cowork를 별도 제품으로 제공. 2026-01 데스크톱 출시 후 2026-07-07 웹·모바일로 확장(베타, Max 플랜 우선)',
          'Anthropic 서버의 원격 세션으로 돌아 모든 기기가 꺼져 있어도 예약 작업이 진행되고, 판단이 필요하면 휴대폰으로 확인을 요청',
          'Slack에서 팀 구성원이 버그 리포트를 올리면 PR로 돌아오는 경로 제공',
        ],
        media: { src: 'assets/img/teamwork/claude.png', caption: 'Claude Cowork' },
        source: SRC.claudeCowork,
      },
      codex: {
        level: 'partial',
        label: 'Slack 디스패치',
        bullets: [
          'Slack 채널·스레드에서 @Codex 멘션으로 작업을 생성해 개발자가 아닌 구성원도 지시 가능',
          '코딩 외 업무를 위한 별도 제품은 아님',
        ],
        media: { src: 'assets/img/teamwork/codex.png', caption: 'Codex Slack 연동' },
        source: SRC.codex,
      },
      cursor: {
        level: 'partial',
        label: 'Slack + 웹',
        bullets: [
          'Slack 봇과 웹 앱으로 IDE 밖에서 작업 지시 가능',
          'JIRA·GitHub Issues 연동으로 티켓에서 작업 시작',
        ],
        media: { src: 'assets/img/teamwork/cursor.png', caption: 'Cursor Slack 연동' },
        source: SRC.cursorSlack,
      },
    },
    verdict:
      '이 항목은 Bob의 포지셔닝과 가장 크게 어긋나는 지점이다. 발표자료는 Bob을 13개 직무가 참여하는 조직 단위 SDLC 파트너로 제시하지만, ' +
      '확인된 접근 경로는 개발자용 IDE와 터미널뿐이다. 반면 Anthropic은 Cowork를 별도 제품으로 내어 비개발 업무를 정면으로 겨냥한다. ' +
      '도입 규모를 개발조직 밖으로 넓히는 것이 목표라면 이 행이 결론을 바꾼다. 개발자 도구로만 쓸 계획이라면 가중치가 낮다.',
  },

  /* ===== D. 엔터프라이즈 통제 ======================================= */
  {
    slug: 'policy-control',
    category: '엔터프라이즈 통제',
    name: '정책 집행 · 권한 통제',
    summary: '에이전트가 무엇을 할 수 있는지를 조직이 중앙에서 정하는 장치',
    why:
      '개인 개발자에게는 부가 기능이지만 규제 산업의 대규모 조직에서는 도입 가부를 가르는 요건이다. ' +
      '판정 기준은 개인이 재정의할 수 없는 형태로 조직이 정책을 배포할 수 있는지다. ' +
      '개발자가 설정을 바꿀 수 있으면 그것은 기본값이지 정책이 아니다.',
    tools: {
      bob: {
        level: 'full',
        label: '역할 · Task 권한 정책',
        bullets: [
          '사용자별 접근 권한과 Task 권한 정책을 조직 차원에서 통제하고, 개인·팀 단위 사용 한도를 설정',
          '작업 유형별로 수동 승인과 자동 통과를 나누는 거버넌스 체크포인트',
          '자동 승인 대상을 파일 편집·명령 실행·MCP 사용·파일 읽기별로 구분하되, 공식 문서는 이 설정이 검토 기회를 줄인다고 경고',
          'v1.0.2에 API 키 관리 어드민 UI, SAML 로그인 지원',
        ],
        media: { src: 'assets/img/policy-control/bob.png', caption: 'Bob의 권한 정책' },
        source: SRC.bobDeck,
      },
      claude: {
        level: 'full',
        label: 'MDM 관리 설정',
        bullets: [
          'MDM으로 배포하는 managed settings를 사용자가 재정의할 수 없음. 허용 모델과 기본값을 중앙에서 조정',
          '서버에 정책을 한 번 정의하면 클라이언트가 로그인 시 받아감',
          'Bedrock·Google Cloud용 apps gateway로 자체 호스팅 control plane, 기업 SSO, 중앙 정책 집행 제공',
          '도구 실행 권한 정책과 훅으로 조직 규칙을 코드로 강제',
        ],
        media: { src: 'assets/img/policy-control/claude.png', caption: 'Claude Code의 관리 설정' },
        source: SRC.claudeIam,
      },
      codex: {
        level: 'full',
        label: 'RBAC · 관리 구성',
        bullets: [
          '역할 기반 접근 제어와 managed configuration을 문서화된 관리자 기능으로 제공',
          '모델 가용성 관리와 사용 거버넌스를 조직 단위로 설정',
        ],
        media: { src: 'assets/img/policy-control/codex.png', caption: 'Codex의 관리자 설정' },
        source: SRC.codex,
      },
      cursor: {
        level: 'partial',
        label: 'Team Rules',
        bullets: [
          'Team Rules로 조직 전역 정책을 정의하고 Bugbot 규칙까지 적용',
          '훅으로 승인·편집 이벤트에 스크립트 연결',
          '규칙 중심이며 개인이 재정의할 수 없는 형태의 정책 배포는 공식 문서로 확인하지 못함',
        ],
        media: { src: 'assets/img/policy-control/cursor.png', caption: 'Cursor의 Team Rules' },
        source: SRC.cursor,
      },
    },
    verdict:
      '초안은 이 항목을 "Bob의 차별점이 가장 뚜렷한 항목"으로 봤으나, 근거를 같은 기준으로 맞추면 Bob·Claude·Codex가 동급이다. ' +
      'Bob의 권한 정책과 사용 한도는 실재하고 조직 단위로 동작한다. 다만 Claude의 MDM 관리 설정과 Codex의 RBAC도 같은 요건을 충족한다. ' +
      '초안의 판정 차이는 기능 차이가 아니라 근거 등급 차이에서 나왔다 — Bob은 발표 자료로, 경쟁 도구는 문서 첫 페이지로 판정했기 때문이다. ' +
      '실제 변별은 이 축이 아니라 아래 샌드박스 항목에서 나온다.',
  },

  {
    slug: 'data-protection',
    category: '엔터프라이즈 통제',
    name: '데이터 보호 · 비밀정보 차단',
    summary: '민감 정보가 프롬프트나 로그로 새어 나가는 것을 제품이 막아 주는지',
    why:
      '앞의 권한 통제가 "무엇을 할 수 있는가"라면 이 항목은 "무엇이 새어 나가는가"다. 판정 기준은 제품이 자동으로 탐지·차단하는지, ' +
      '아니면 사용자가 조심하는 데 의존하는지로 잡았다. 수천 명 규모에서 사용자 주의에 의존하는 통제는 통제가 아니다. ' +
      '이 항목은 네 도구 모두 1차 문서로 확인된 범위가 좁아, 확인한 것과 못 한 것을 칸 안에 그대로 적었다.',
    tools: {
      bob: {
        level: 'partial',
        label: '주장과 문서가 불일치',
        bullets: [
          'IBM 발표는 프롬프트 정규화, 민감 데이터 스캔, 실시간 정책 집행을 실행 시점에 적용한다고 명시',
          '그러나 공식 보안 가이드는 민감정보 스캔을 자동 기능으로 문서화하지 않고, 비밀값을 Bob에 주지 말고 .gitignore와 .bobignore에 넣으라고 사용자 책임으로 안내',
          '.bobignore는 워크스페이스 파일에만 적용되며 시스템 수준 격리를 만들지 않는다고 문서가 직접 밝힘',
          '프리뷰 단계에 프롬프트 인젝션으로 CLI를 통해 악성코드를 실행시킨 사례가 보고됨. IBM은 조치를 밝혔으나 공개 검증 자료는 확인하지 못함',
        ],
        media: { src: 'assets/img/data-protection/bob.png', caption: 'Bob의 데이터 보호 설정' },
        source: SRC.bobSec,
      },
      claude: {
        level: 'partial',
        label: '권한·격리 중심',
        bullets: [
          '샌드박스와 권한 정책으로 접근 범위를 좁히고, 클라우드 세션은 허용 도메인 밖 요청을 403으로 차단',
          '훅으로 커밋 전 비밀값 스캔 같은 검사를 직접 붙일 수 있음',
          '제품 내장 민감정보 스캐너는 확인하지 못함 — 별도 솔루션과 조합이 전제',
        ],
        media: { src: 'assets/img/data-protection/claude.png', caption: 'Claude Code의 권한 설정' },
        source: SRC.claudeSandbox,
      },
      codex: {
        level: 'partial',
        label: '샌드박스 · 네트워크 차단',
        bullets: [
          '네트워크 차단과 샌드박스 실행으로 유출 경로를 물리적으로 제한',
          'HIPAA 대응 옵션과 컴플라이언스 API를 문서화',
          '제품 내장 민감정보 스캐너 여부는 확인하지 못함',
        ],
        media: { src: 'assets/img/data-protection/codex.png', caption: 'Codex의 샌드박스' },
        source: SRC.codex,
      },
      cursor: {
        level: 'partial',
        label: '프라이버시 모드',
        bullets: [
          '프라이버시 모드로 코드 저장을 차단하고 팀 단위 관리자 설정 제공',
          '코드 보관 여부 통제가 중심이며 실행 중 민감정보 차단과는 층위가 다름',
        ],
        media: { src: 'assets/img/data-protection/cursor.png', caption: 'Cursor의 프라이버시 모드' },
        source: SRC.cursor,
      },
    },
    verdict:
      '네 도구 모두 부분이며, 이유가 서로 다르다. 경쟁 도구 셋은 격리와 네트워크 차단으로 유출 경로를 좁히지만 내용 기반 탐지는 조직에 맡긴다. ' +
      'Bob은 내용 기반 탐지를 제품 기능으로 주장하는 유일한 도구인데, 그 주장을 자사 보안 문서가 뒷받침하지 않는다. ' +
      '이 불일치가 이 자료에서 가장 크게 벌어진 격차이며, 데이터 보호를 근거로 Bob을 선택한다면 파일럿에서 반드시 직접 뚫어 봐야 하는 칸이다. ' +
      '구체적으로는 우리 저장소에 테스트 비밀값을 심어 두고 스캔이 실제로 걸리는지, 승인 장치가 프롬프트 인젝션으로 우회되는지를 확인해야 한다.',
  },

  {
    slug: 'sandboxing',
    category: '엔터프라이즈 통제',
    name: '샌드박스 · 실행 격리',
    summary: '에이전트가 명령을 실행할 때 OS·컨테이너 수준으로 격리되는지',
    why:
      '에이전트가 명령을 실행하는 순간의 위험은 승인 UI가 아니라 실행 환경이 막는다. 승인은 사람이 누르면 통과하고, 자동 승인 목록을 켜면 아예 사라진다. ' +
      '판정 기준은 OS·컨테이너 수준의 격리를 제품이 제공하는지로 잡았다. 명령 문자열 검사나 무시 파일은 격리가 아니므로 해당하지 않는다.',
    tools: {
      bob: {
        level: 'none',
        label: '격리 없음 (문서 명시)',
        bullets: [
          '공식 보안 가이드가 ".bobignore는 시스템 수준 샌드박스를 만들지 않는다"고 직접 밝힘',
          '통제 수단은 승인 다이얼로그, 자동 승인 목록, v2.0.0의 명령 보안 검사이며 모두 격리가 아님',
          '문서는 광범위한 명령 패턴을 피하고 사용을 제한할 것을 사용자에게 권고',
          '네 도구 중 벤더 문서가 격리 부재를 명시한 유일한 경우이므로 확인 필요가 아니라 미지원으로 판정했다',
        ],
        media: { src: 'assets/img/sandboxing/bob.png', caption: 'Bob의 승인 다이얼로그' },
        source: SRC.bobSec,
      },
      claude: {
        level: 'full',
        label: '샌드박스 실행',
        bullets: [
          '샌드박스 실행을 공식 문서로 제공해 파일시스템·네트워크 접근을 OS 수준에서 제한',
          '클라우드 세션은 환경별 네트워크 접근 수준을 지정하고 허용 목록 밖 요청을 403으로 차단',
        ],
        media: { src: 'assets/img/sandboxing/claude.png', caption: 'Claude Code의 샌드박스' },
        source: SRC.claudeSandbox,
      },
      codex: {
        level: 'full',
        label: '샌드박스 기본',
        bullets: [
          '로컬은 샌드박스와 승인 모드, 클라우드는 격리된 샌드박스에서 실행',
          '격리를 기본 동작으로 두어 실행 환경 자체가 위험 범위를 정함',
        ],
        media: { src: 'assets/img/sandboxing/codex.png', caption: 'Codex의 샌드박스' },
        source: SRC.codex,
      },
      cursor: {
        level: 'partial',
        label: '클라우드만 격리',
        bullets: [
          '클라우드 에이전트는 Cursor의 격리된 VM에서 실행',
          '로컬 IDE 에이전트의 OS 수준 격리는 공식 문서로 확인하지 못함',
        ],
        media: { src: 'assets/img/sandboxing/cursor.png', caption: 'Cursor의 클라우드 격리' },
        source: SRC.cursorAuto,
      },
    },
    verdict:
      '엔터프라이즈 통제 카테고리에서 실제 변별이 생기는 유일한 항목이며, 방향은 Bob에게 불리하다. ' +
      'Bob의 통제 모델은 사람의 승인에 의존하는데, 자동 승인 목록을 켜는 순간 그 층이 사라진다. 문서 자신이 이 위험을 경고하고 있다. ' +
      '프리뷰 단계에서 프롬프트 인젝션으로 CLI를 통해 악성코드가 실행된 사례가 보고된 것도 격리 부재와 같은 구조에서 나온다. ' +
      '규제 대응을 명분으로 Bob을 도입하려면 이 항목이 정면으로 걸리므로, 온프렘 로드맵과 함께 IBM에 먼저 물어야 한다.',
  },

  {
    slug: 'auditability',
    category: '엔터프라이즈 통제',
    name: '감사 추적 · 재현성',
    summary: '에이전트가 무엇을 왜 했는지 기록으로 남기고 같은 작업을 다시 돌릴 수 있는 능력',
    why:
      '규제 대응과 사고 조사에서 요구되는 것은 결과물이 아니라 경위다. 판정 기준은 제3자가 사후에 경위를 재구성할 수 있는 기록이 제품 기능으로 있는지다. ' +
      '개발자가 실수를 되돌리는 장치(체크포인트, 변경 이력)는 목적이 달라 여기에 해당하지 않는다.',
    tools: {
      bob: {
        level: 'partial',
        label: '기록 산출물 + 미확인 주장',
        bullets: [
          '진행 기록서와 의사결정 기록서를 추적·거버넌스 단계의 산출물로 정의하고 Phase gate를 수행 — 문서 형태의 경위 기록',
          'IBM은 BobShell이 모든 에이전트 행위를 실시간으로 자기 문서화해 모든 결정을 추적 가능하게 한다고 주장',
          '그러나 이에 대응하는 감사 로그 기능이 공식 문서에 없고, 보안 가이드는 감사 로깅을 MCP 서버에 한해서만 언급',
          '규제 대응 형식(보존 기간, 반출 형식, 변조 방지)은 확인하지 못함',
        ],
        media: { src: 'assets/img/auditability/bob.png', caption: 'Bob의 의사결정 기록서' },
        source: SRC.bobSelfDoc,
      },
      claude: {
        level: 'partial',
        label: '로그 · 훅 · 분석 API',
        bullets: [
          '세션 기록과 훅으로 감사 로그를 구성할 수 있고, 클라이언트 텔레메트리는 배포 형태와 무관하게 동작',
          'Analytics API로 조직 단위 사용 이력을 반출 (단, Bedrock·Vertex·Foundry 경유 세션은 집계에서 빠짐)',
          '규제 대응 형식의 기록은 조직이 설계해야 함',
        ],
        media: { src: 'assets/img/auditability/claude.png', caption: 'Claude Code의 로그' },
        source: SRC.claudeAnalytics,
      },
      codex: {
        level: 'full',
        label: '컴플라이언스 API',
        bullets: [
          '컴플라이언스 API와 감사 이벤트(audit events)를 문서화된 관리자 기능으로 제공',
          '워크스페이스 분석과 사용 거버넌스를 조직 단위로 조회',
          '네 도구 중 감사 기록을 1차 문서에 명시한 유일한 경우',
        ],
        media: { src: 'assets/img/auditability/codex.png', caption: 'Codex의 감사 이벤트' },
        source: SRC.codex,
      },
      cursor: {
        level: 'partial',
        label: '변경 이력 중심',
        bullets: ['에디터 변경 이력과 체크포인트로 되돌리기 지원', '관리자 화면의 사용량 집계가 중심이며 경위 기록과는 층위가 다름'],
        media: { src: 'assets/img/auditability/cursor.png', caption: 'Cursor의 체크포인트' },
        source: SRC.cursor,
      },
    },
    verdict:
      '되돌리기와 감사 추적을 같은 것으로 보면 판단을 그르친다는 초안의 지적은 맞다. 다만 그 기준을 네 도구에 똑같이 적용하면 Bob이 1위가 아니다. ' +
      'Bob이 실제로 가진 것은 의사결정 기록서라는 문서 산출물이고, 이건 사람이 읽는 기록이다. ' +
      'Codex는 감사 이벤트를 API로 반출하는 기계 판독 기록을 문서화했다 — 컴플라이언스 팀이 SIEM에 넣어야 하는 쪽은 후자다. ' +
      '두 형태는 서로를 대체하지 않으므로, 우리 감사 요건이 문서 제출인지 로그 연동인지 먼저 정해야 이 행을 읽을 수 있다.',
  },

  /* ===== E. 비용 구조 =============================================== */
  {
    slug: 'pricing',
    category: '비용 구조',
    name: '과금 구조',
    summary: '무엇을 단위로 돈이 나가는지 — 좌석인지, 사용량인지, 선불 크레딧인지',
    why:
      '이 항목은 어느 도구가 싼지를 가리지 않는다. 정가는 계약 조건에 따라 달라지고 네 도구 모두 대량 계약은 협상 대상이라 정가 비교는 오해만 만든다. ' +
      '판정 기준은 "조직이 월 비용을 사전에 예측하고 상한을 걸 수 있는가"로 잡았다. ' +
      '수천 명 규모에서 예측 불가능한 변동비는 금액 자체보다 예산 편성에서 더 큰 문제가 된다. 아래 금액은 모두 공개 정가다.',
    tools: {
      bob: {
        level: 'partial',
        label: '선불 크레딧(Bobcoin)',
        bullets: [
          'Bobcoin 선불 크레딧으로 과금(1코인 = $0.50 고정). 코드 생성·파일 분석·명령 실행 등 행위가 요구하는 연산량에 따라 차감',
          '좌석 요금에 지원 비용이 별도로 붙는다 — Pro $20+$3(40코인), Pro Plus $60+$9(160코인), Ultra $200+$30(500코인)',
          '월 할당량은 매월 리셋되며 이월되지 않는다. 남은 코인은 소멸하므로 과다 구매가 손실이 됨',
          'Overage는 선택 활성화이고 한도를 조절할 수 있으나, 한 번 켜면 그 달에는 끌 수 없음',
          '엔터프라이즈는 좌석 구독에 풀 코인을 더하는 구조(1,000코인 팩 $500, 구매 후 1년 만료)',
          'Premium Package(Java·Z·i)는 이 구독과 별개 계약이므로 총소유비용에 따로 더해야 함',
        ],
        media: { src: 'assets/img/pricing/bob.png', caption: 'Bob의 요금제와 Bobcoin' },
        source: SRC.bobCoins,
      },
      claude: {
        level: 'full',
        label: '좌석에 사용량 포함',
        bullets: [
          '좌석 요금에 사용량이 포함되는 구조 — Team 표준 좌석 월 $20~25, 프리미엄 좌석 월 $100~125',
          'Claude Code가 모든 요금제에 포함돼 별도 라인 아이템이 없음',
          '초과분은 조직 관리자가 usage credits를 켜야 발생하므로 기본 상태에서 상한이 좌석 요금',
          '네 도구 중 좌석당 월 비용을 사전에 고정하기 가장 쉬움',
        ],
        media: { src: 'assets/img/pricing/claude.png', caption: 'Claude 요금제' },
        source: SRC.claudePrice,
      },
      codex: {
        level: 'partial',
        label: '토큰 크레딧',
        bullets: [
          '2026-04부터 메시지 단위가 아닌 토큰 크레딧 방식으로 전환',
          'Enterprise는 좌석별 한도 대신 조직 공용 크레딧 풀 — 사용량이 고른 팀에 유리하나 좌석 고정비 개념이 약함',
        ],
        media: { src: 'assets/img/pricing/codex.png', caption: 'Codex의 크레딧 과금' },
        source: SRC.codexPrice,
      },
      cursor: {
        level: 'partial',
        label: '좌석 + 초과분 후불',
        bullets: [
          '좌석에 포함 사용량을 주고 초과분은 후불로 청구(Teams 좌석 월 $40 기준)',
          'Bugbot은 사용자당 월 $40의 별도 과금',
          '초과분이 월별로 변동해 상한을 걸려면 별도 관리가 필요',
        ],
        media: { src: 'assets/img/pricing/cursor.png', caption: 'Cursor 요금제' },
        source: SRC.cursorPrice,
      },
    },
    verdict:
      'Bob이 앞서지 않는 항목이다. 선불 크레딧은 상한 관리에는 유리하지만 예산 편성에는 불리하다 — 같은 작업의 코인 소모량이 변동하므로 좌석당 월 비용을 고정할 수 없다. ' +
      '이월이 없다는 점도 함께 봐야 한다. 사용량을 낮게 잡으면 작업이 끊기고 높게 잡으면 남은 코인이 소멸한다. ' +
      '여기에 지원 비용이 좌석마다 15% 수준으로 더 붙고, Premium Package가 별도 계약이므로 레거시 현대화를 노리고 도입할수록 총소유비용이 정가에서 멀어진다. ' +
      '실제 판단은 우리 계약 조건과 예상 작업량으로 다시 계산해야 하며, Bob의 비용 경쟁력은 이 표의 단가가 아니라 아래 두 항목에서 나온다.',
  },

  {
    slug: 'model-choice',
    category: '비용 구조',
    name: '모델 라우팅 · 단가 최적화',
    summary: '작업마다 어느 모델을 쓸지 정해 품질을 지키면서 토큰 단가를 낮추는 구조',
    why:
      '모든 작업에 최상위 모델을 쓰면 비용이 감당되지 않고, 저가 모델만 쓰면 품질이 무너진다. ' +
      '판정 기준은 이 선택을 개인 판단에 맡기지 않고 조직 정책이나 자동 규칙으로 강제할 수 있는지, 그리고 선택지가 한 벤더에 묶이는지로 잡았다. ' +
      '모델 시장의 변화 속도를 보면 종속성도 비용 위험의 일종이다.',
    tools: {
      bob: {
        level: 'full',
        label: '멀티벤더 자동 라우팅',
        bullets: [
          'Anthropic Claude, Mistral·Devstral, IBM Granite를 작업 성격에 따라 자동 선택 — 단순 완성은 소형 모델, 복잡한 추론은 프런티어 모델',
          '정확도·지연시간·비용 기준의 규칙 엔진이 라우팅을 결정하며, 선택 기준을 개발자가 아니라 조직이 정책으로 잡음',
          'IBM은 이 라우팅으로 비용을 최대 40% 절감한다고 제시 (벤더 측 주장, 작업 구성에 따라 달라짐)',
          '반면 개발자가 어느 모델이 쓰였는지 통제하기 어려워 블랙박스라는 지적이 있음 — 품질 회귀를 추적할 때 변수가 하나 늘어난다',
        ],
        media: { src: 'assets/img/model-choice/bob.png', caption: 'Bob의 모델 라우팅' },
        source: SRC.bobDeck,
      },
      claude: {
        level: 'partial',
        label: '자사 모델 내 선택',
        bullets: [
          '등급별 모델 선택과 작업별 자동 전환을 지원해 단가를 조절하고, 관리자가 허용 모델을 중앙에서 제한',
          '타사 모델을 섞는 구조가 아니므로 절감 폭이 자사 등급 범위로 제한됨',
        ],
        media: { src: 'assets/img/model-choice/claude.png', caption: 'Claude Code의 모델 선택' },
        source: SRC.claudeIam,
      },
      codex: {
        level: 'partial',
        label: '자사 모델 내 선택',
        bullets: [
          '자사 모델 계열 안에서 추론 강도를 조절해 비용을 낮추고, 관리자가 모델 가용성을 관리',
          '벤더 종속성이 가장 높은 편',
        ],
        media: { src: 'assets/img/model-choice/codex.png', caption: 'Codex의 모델 설정' },
        source: SRC.codex,
      },
      cursor: {
        level: 'full',
        label: '멀티벤더 선택',
        bullets: [
          '여러 벤더 모델을 등록하고 자동 선택 모드를 제공. 자체 모델(Composer)도 선택지에 포함',
          '선택 기준이 대체로 개발자와 제품 기본값에 맡겨져, 조직이 정책으로 강제하는 층위는 아님',
        ],
        media: { src: 'assets/img/model-choice/cursor.png', caption: 'Cursor의 모델 선택' },
        source: SRC.cursor,
      },
    },
    verdict:
      'Cursor도 멀티벤더 선택과 자체 모델을 제공하므로 "여러 모델을 쓴다"만으로는 구분되지 않는다. ' +
      'Bob의 실질적 차이는 선택 기준을 개발자가 아니라 조직이 정책으로 통제한다는 점이다. ' +
      '다만 같은 구조가 반대 방향으로도 작동한다 — 개발자가 모델을 고정할 수 없으면 품질 문제의 원인을 분리하기 어렵다. ' +
      '그리고 이 항목의 값을 계산할 때 잊지 말아야 할 사실이 있다. Bob의 프런티어 모델이 Claude이므로, ' +
      '라우팅이 절감하는 것은 "Claude를 덜 쓰는 것"이고 아낀 만큼 결과물이 소형 모델의 산출물로 바뀐다. 40%라는 수치는 이 교환의 결과이며 품질 영향은 별도로 재야 한다.',
  },

  {
    slug: 'cost-visibility',
    category: '비용 구조',
    name: '비용 가시성 · 통제',
    summary: '누가 무엇에 얼마를 썼는지 조직이 보고, 새어 나가기 전에 막을 수 있는지',
    why:
      '사용량 기반 과금에서는 지출을 청구서로 확인하는 시점에 이미 늦다. 2026년 들어 토큰 비용이 경영 안건으로 올라온 이유가 이것이다. ' +
      '판정 기준은 조직·팀·개인 단위로 지출을 분해해 보고, 사전에 한도를 걸 수 있는지로 잡았다. ' +
      '앞 항목의 단가 절감 주장을 검증할 유일한 수단이기도 하다.',
    tools: {
      bob: {
        level: 'full',
        label: 'Bobalytics',
        bullets: [
          '조직·팀·개인 단위로 토큰 예산과 Bobcoin 사용량을 한 화면에서 추적',
          '개인·팀 단위 사용 한도를 설정·조정해 비용 예측 가능성을 확보하고, 권한 관리와 같은 화면에서 통제',
          'v1.0.2에 Bobalytics for Enterprise(팀 분석, Bob Factor 지표, 언어별 사용량) 추가, 2026-07 업데이트에서 AI 비용·사용 분석을 제품에 내장',
          '과금 단위가 코인이라 행위 단위 원가가 그대로 보인다 — 네 도구 중 가장 세밀한 편',
        ],
        media: { src: 'assets/img/cost-visibility/bob.png', caption: 'Bobalytics 비용 대시보드' },
        source: SRC.bobDeck,
      },
      claude: {
        level: 'full',
        label: '분석 API + 지출 알림',
        bullets: [
          'Claude Code Analytics API로 조직의 일별 생산성 지표를, Enterprise Analytics API로 제품 전반의 채택·비용 데이터를 반출',
          'apps gateway로 사용자별 비용 추적, 모델별 엔타이틀먼트, 지출 알림 제공',
          '단, Bedrock·Vertex·Foundry 경유 세션은 Analytics API 집계에서 빠짐 — 이 경로로 배포하면 가시성에 구멍이 생김',
        ],
        media: { src: 'assets/img/cost-visibility/claude.png', caption: 'Claude의 사용량 분석' },
        source: SRC.claudeAnalytics,
      },
      codex: {
        level: 'partial',
        label: '워크스페이스 분석',
        bullets: [
          '워크스페이스 분석과 사용 거버넌스를 관리자 기능으로 제공하고 조직 공용 크레딧 풀의 소진 현황을 확인',
          '작업 유형별 원가 분해와 사전 한도 설정의 실제 범위는 1차 문서로 확인하지 못함',
        ],
        media: { src: 'assets/img/cost-visibility/codex.png', caption: 'Codex의 크레딧 현황' },
        source: SRC.codex,
      },
      cursor: {
        level: 'partial',
        label: '표면별 사용량 분해',
        bullets: [
          '관리자가 사용량을 사용자별로 필터링하고 표면별(클라이언트·클라우드 에이전트·Automations·Bugbot·Security Review)로 분해',
          '초과 과금 억제는 요금제 선택으로 간접 통제하며 사전 한도 설정은 확인하지 못함',
        ],
        media: { src: 'assets/img/cost-visibility/cursor.png', caption: 'Cursor의 팀 사용량' },
        source: SRC.cursor,
      },
    },
    verdict:
      'Bob이 실제로 앞서는 항목이지만 초안이 그린 것만큼 크게 앞서지는 않는다. Claude도 분석 API 두 종과 지출 알림을 갖췄다. ' +
      'Bob의 우위는 대시보드의 존재가 아니라 과금 단위가 행위라는 점에서 나온다 — 코인이 차감되는 단위가 그대로 원가 분해 단위가 되고, 사용 한도를 개인·팀에 사전에 걸 수 있다. ' +
      '앞의 두 항목과 묶어서 볼 때만 의미가 산다. 라우팅으로 단가를 낮추고 가시성으로 그 절감을 증명하는 구조이며, ' +
      '이 항목이 없으면 40% 절감 주장은 확인할 방법이 없다. ' +
      '다만 대시보드가 있다는 것과 우리 부서별 배부 기준에 맞는다는 것은 다른 문제이므로, 파일럿에서 실제 정산에 쓸 수 있는 형태인지 확인해야 한다.',
  },

  /* ===== F. 도입 조건 =============================================== */
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
          '2026-04-28 GA 시점에 SaaS로만 제공되며, 온프렘 배포는 데이터 레지던시·규제 요건 대응을 위해 향후 릴리스로 예정',
          '온프렘 제공 시점은 공표되지 않음',
          '데이터 위치·망 분리 요건이 있는 조직에는 현시점 제약',
        ],
        media: { src: 'assets/img/deployment/bob.png', caption: 'Bob의 제공 형태' },
        source: SRC.bobNews,
      },
      claude: {
        level: 'full',
        label: '자체 클라우드 경유 가능',
        bullets: [
          'Amazon Bedrock, Google Cloud Vertex, Microsoft Foundry를 통한 모델 접근 경로 지원 — 기업 클라우드 계정 안에서 처리',
          'apps gateway로 자체 호스팅 control plane과 기업 SSO 구성',
          '코드가 나가는 경계를 조직이 선택할 여지가 네 도구 중 가장 넓음',
          '단, 이 경로를 쓰면 Analytics API 집계가 빠지고 Routines를 쓸 수 없다 — 통제와 기능이 상충한다',
        ],
        media: { src: 'assets/img/deployment/claude.png', caption: 'Claude Code의 배포 옵션' },
        source: SRC.claudeDeploy,
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
      'Bob이 SaaS만 제공한다는 점은 IBM 자신이 향후 릴리스로 예고한 사항이므로 논쟁의 여지가 없다. ' +
      '주의할 것은 이 제약이 앞의 통제 항목들과 곱해진다는 점이다. 정책 집행과 감사 추적을 근거로 Bob을 고른다는 것은 ' +
      '"SaaS 경계를 받아들이되 그 안에서 통제를 강화한다"는 선택이며, 데이터가 밖으로 나가는 것 자체가 요건 위반인 조직에서는 성립하지 않는다. ' +
      '망 분리 환경이 대상이라면 온프렘 시점을 IBM에 먼저 확인하고, 그 답이 나온 뒤에 나머지 항목을 검토하는 것이 순서다.',
  },
];
