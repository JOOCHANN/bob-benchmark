/**
 * 장표 데이터. 상세 본문은 assets/js/features/<slug>.js 다.
 * 장표는 이 파일만 읽고, 상세는 해당 항목 파일을 하나 더 읽는다.
 *
 * 분류: 작업, 연동, 사용 범위, 통제, 비용, 도입 여건.
 * 그룹 머리행에는 대분류 이름만 둔다.
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
  checkedAt: '2026-08-25',
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

/* 대분류. 질문은 두지 않고 이름만 표시한다. */
const CATEGORIES = {
  '작업': '',
  '연동': '',
  '사용 범위': '',
  '통제': '',
  '비용': '',
  '도입 여건': '',
};

/**
 * 출처 목록. 참조 라이브러리이므로 지금 어느 칸에도 걸려 있지 않은 항목도 있다
 * (불릿 본문에서만 근거로 쓰는 문서들). 판정에 쓰는 것은 `source`에 건 것뿐이다.
 *
 * 등급: `공식 문서` > `사내 발표자료`·`벤더 발표` > `보도`.
 * 지금 Bob 23칸 중 19칸이 1차 문서, 1칸이 보도(모델 라우팅), 1칸이 벤더 발표(배포 형태),
 * 2칸이 확인 필요다. `bobDeck`은 어느 판정에도 걸려 있지 않다 — 의도된 상태다.
 */
const SRC = {
  /* ── Bob: 1차 제품 문서 ───────────────────────────────────────────
     판정은 이 등급을 우선한다. 발표자료의 주장과 어긋나면 문서를 따른다. */
  bob: { text: 'IBM Bob 공식 문서 (IDE)', url: 'https://bob.ibm.com/docs/ide' },
  bobShell: { text: 'IBM Bob 공식 문서 (Bob Shell)', url: 'https://bob.ibm.com/docs/shell' },
  bobLog: {
    text: 'IBM Bob 공식 체인지로그 (v1.0.1~v2.0.1)',
    url: 'https://bob.ibm.com/docs/ide/changelog',
  },
  bobInstall: {
    text: 'IBM Bob 공식 문서 (설치·시스템 요건)',
    url: 'https://bob.ibm.com/docs/ide/getting-started/install',
  },
  bobModes: { text: 'IBM Bob 공식 문서 (모드)', url: 'https://bob.ibm.com/docs/ide/features/modes' },
  bobCustomModes: {
    text: 'IBM Bob 공식 문서 (커스텀 모드)',
    url: 'https://bob.ibm.com/docs/ide/configuration/custom-modes',
  },
  bobSubagents: {
    text: 'IBM Bob 공식 문서 (서브에이전트)',
    url: 'https://bob.ibm.com/docs/ide/features/subagents',
  },
  bobReviews: {
    text: 'IBM Bob 공식 문서 (코드 리뷰)',
    url: 'https://bob.ibm.com/docs/ide/features/code-reviews',
  },
  bobSkills: { text: 'IBM Bob 공식 문서 (Skills)', url: 'https://bob.ibm.com/docs/ide/features/skills' },
  bobSlash: {
    text: 'IBM Bob 공식 문서 (슬래시 커맨드)',
    url: 'https://bob.ibm.com/docs/ide/features/slash-commands',
  },
  bobRules: {
    text: 'IBM Bob 공식 문서 (커스텀 규칙)',
    url: 'https://bob.ibm.com/docs/ide/configuration/rules',
  },
  bobTools: {
    text: 'IBM Bob 공식 문서 (도구)',
    url: 'https://bob.ibm.com/docs/ide/core-concepts/tools',
  },
  bobalytics: {
    text: 'IBM Bob 공식 문서 (Bobalytics)',
    url: 'https://bob.ibm.com/docs/ide/features/bobalytics',
  },
  bobEnterprise: {
    text: 'IBM Bob 공식 문서 (엔터프라이즈 개요)',
    url: 'https://bob.ibm.com/docs/ide/enterprise/enterprise-index',
  },
  bobTeams: {
    text: 'IBM Bob 공식 문서 (팀·예산 설정)',
    url: 'https://bob.ibm.com/docs/ide/enterprise/getting-started/teams',
  },
  bobUsers: {
    text: 'IBM Bob 공식 문서 (사용자·역할·좌석)',
    url: 'https://bob.ibm.com/docs/ide/enterprise/getting-started/users',
  },
  bobIdp: {
    text: 'IBM Bob 공식 문서 (SAML IdP)',
    url: 'https://bob.ibm.com/docs/ide/enterprise/getting-started/identity-providers',
  },
  bobActivityLog: {
    text: 'IBM Bob 공식 문서 (활동 로그 · CADF)',
    url: 'https://bob.ibm.com/docs/ide/enterprise/getting-started/activity-log',
  },
  bobSec: {
    text: 'IBM Bob 공식 보안 가이드',
    url: 'https://bob.ibm.com/docs/ide/security/bob-security-guidance',
  },
  bobIgnore: {
    text: 'IBM Bob 공식 문서 (.bobignore)',
    url: 'https://bob.ibm.com/docs/ide/configuration/bobignore',
  },
  bobSandbox: {
    text: 'IBM Bob 공식 문서 (Bob Shell 샌드박스)',
    url: 'https://bob.ibm.com/docs/shell/security/sandboxing',
  },
  bobTrust: {
    text: 'IBM Bob 공식 문서 (신뢰 폴더)',
    url: 'https://bob.ibm.com/docs/shell/security/trusted-folders',
  },
  bobHeadless: {
    text: 'IBM Bob 공식 문서 (비대화형 세션)',
    url: 'https://bob.ibm.com/docs/shell/getting-started/start-bobshell-non-interactive',
  },
  bobCoins: {
    text: 'IBM Bob 공식 문서 (Bobcoins)',
    url: 'https://bob.ibm.com/docs/ide/account/bobcoins',
  },
  bobJavaWorkflows: {
    text: 'IBM Bob 공식 문서 (Java 현대화 워크플로)',
    url: 'https://bob.ibm.com/docs/ide/premium-packages/java-modernization/workflows',
  },

  /* ── Bob: 사내 발표자료 (링크 없음) ───────────────────────────────
     공식 문서에 대응 근거가 있으면 그것을 쓴다. 이 자료만이 근거인 주장은
     판정을 올리는 데 쓰지 않고, 문서와 어긋나는 지점을 드러내는 데만 쓴다. */
  bobDeck: { text: 'IBM Bob 발표자료 (사내, 2026) — 공식 문서 미확인', url: null },

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

  /* ── Claude Code: 1차 제품 문서 ─────────────────────────────────── */
  claude: { text: 'Claude Code 문서 (개요·실행 표면)', url: 'https://code.claude.com/docs/en/overview' },
  claudeRoutines: { text: 'Claude Code 문서 (Routines)', url: 'https://code.claude.com/docs/en/routines' },
  claudeSdk: {
    text: 'Claude Code 문서 (Agent SDK)',
    url: 'https://code.claude.com/docs/en/agent-sdk/overview',
  },
  claudeHooks: { text: 'Claude Code 문서 (Hooks)', url: 'https://code.claude.com/docs/en/hooks' },
  claudeSkills: { text: 'Claude Code 문서 (Skills)', url: 'https://code.claude.com/docs/en/skills' },
  claudePerm: {
    text: 'Claude Code 공식 문서 (권한 모드)',
    url: 'https://code.claude.com/docs/en/permission-modes',
  },
  claudeModes: {
    text: 'Claude Code 공식 문서 (권한 모드)',
    url: 'https://code.claude.com/docs/en/permission-modes',
  },
  claudeEffort: {
    text: 'Claude Code 공식 문서 (모델·Effort)',
    url: 'https://code.claude.com/docs/en/model-config',
  },
  claudeThinking: {
    text: 'Claude Code 공식 문서 (VS Code · 확장 Thinking)',
    url: 'https://code.claude.com/docs/en/vs-code',
  },
  claudeFast: {
    text: 'Claude Code 공식 문서 (Fast 모드)',
    url: 'https://code.claude.com/docs/en/fast-mode',
  },
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
  codexGov: {
    text: 'Codex 문서 (엔터프라이즈 거버넌스·감사 로그)',
    url: 'https://developers.openai.com/codex/enterprise/governance',
  },
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
  cursorModes: {
    text: 'Cursor 공식 문서 (Agent·모드)',
    url: 'https://cursor.com/help/ai-features/agent',
  },
  cursorEffort: {
    text: 'Cursor 공식 문서 (Grok 4.6 · Effort)',
    url: 'https://cursor.com/help/models-and-usage/grok-4-6',
  },
  cursorFast: {
    text: 'Cursor 공식 문서 (모델·요금 · Fast)',
    url: 'https://cursor.com/docs/models-and-pricing',
  },
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

const FEATURES_DETAIL = {};

const FEATURES = [
  /* ===== 작업 ================================================ */
  {
    slug: "modes",
    category: "작업",
    name: "모드",
    summary: "에이전트에게 허용하는 동작의 범위.",
    tools: {
      bob: { level: "full", label: "커스텀 모드" },
      claude: { level: "full", label: "권한 모드" },
      codex: { level: "unknown", label: null },
      cursor: { level: "full", label: "작업 모드" }
    },
  },
  {
    slug: "effort",
    category: "작업",
    name: "추론 조절",
    summary: "모드가 정한 범위 안에서 추론에 얼마나 쓸지 — 깊이·속도·비용.",
    tools: {
      bob: { level: "none", label: null },
      claude: { level: "full", label: "Effort + Thinking + Fast" },
      codex: { level: "unknown", label: null },
      cursor: { level: "full", label: "Effort + Fast" }
    },
  },
  {
    slug: "plan-design",
    category: "작업",
    name: "계획",
    summary: "코드를 건드리기 전에 작업 계획을 세우고 승인을 받는 단계",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "indexing",
    category: "작업",
    name: "코드베이스 인덱싱",
    summary: "저장소를 미리 색인해 관련 파일을 찾는지, 매 질의마다 검색에 의존하는지",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "codebase",
    category: "작업",
    name: "코드 이해·수정",
    summary: "대규모 저장소를 탐색해 맥락을 파악하고 여러 파일을 함께 수정하는 기본 역량",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "design",
    category: "작업",
    name: "디자인",
    summary: "화면 프로토타입·이미지를 만들고 디자인에서 코드로 이어가는 작업",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "testing",
    category: "작업",
    name: "테스트",
    summary: "테스트를 만들고 실행해 결과를 스스로 확인하는 루프",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "code-review",
    category: "작업",
    name: "코드 리뷰",
    summary: "작성된 코드에서 결함과 보안 취약점을 찾아내고 수정까지 잇는 단계",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "orchestration",
    category: "작업",
    name: "병렬 작업",
    summary: "큰 작업을 여러 갈래로 나눠 독립된 에이전트가 동시에 처리하는 구조",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "modernization",
    category: "작업",
    name: "레거시 현대화",
    summary: "오래된 언어·프레임워크·런타임을 최신 버전으로 옮기는 대규모 일괄 작업",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  /* ===== 연동 ================================================ */
  {
    slug: "integration",
    category: "연동",
    name: "도구 연결",
    summary: "MCP로 사내 이슈 트래커·위키·배포 시스템을 에이전트에 연결하는 표준 확장",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "extensibility",
    category: "연동",
    name: "규칙·스킬",
    summary: "조직의 규칙과 반복 작업을 파일로 정의해 저장소에 커밋하고 팀이 공유하는 구조",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "embedding",
    category: "연동",
    name: "SDK",
    summary: "사내 도구나 파이프라인 안에 에이전트를 부품으로 넣을 수 있는지",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "delivery",
    category: "연동",
    name: "CI/CD",
    summary: "코드 작성 이후 CI/CD와 릴리스 과정까지 이어지는 자동화",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  /* ===== 사용 범위 ================================================ */
  {
    slug: "async",
    category: "사용 범위",
    name: "백그라운드 실행",
    summary: "내 컴퓨터를 벗어난 곳에서 에이전트가 돌고, 끝나면 결과를 받아오는 방식",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "scheduling",
    category: "사용 범위",
    name: "예약 실행",
    summary: "사람이 지시하지 않아도 정해진 시점이나 사건에 에이전트가 스스로 도는 구조",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "teamwork",
    category: "사용 범위",
    name: "팀으로 쓰기",
    summary: "코드를 쓰지 않는 구성원이 같은 에이전트에 일을 맡길 수 있는지",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  /* ===== 통제 ================================================ */
  {
    slug: "policy-control",
    category: "통제",
    name: "권한",
    summary: "에이전트가 무엇을 할 수 있는지를 조직이 중앙에서 정하는 장치",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "data-protection",
    category: "통제",
    name: "데이터 보호",
    summary: "민감 정보가 프롬프트나 로그로 새어 나가는 것을 제품이 막아 주는지",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "sandboxing",
    category: "통제",
    name: "실행 격리",
    summary: "에이전트가 명령을 실행할 때 OS·컨테이너 수준으로 격리되는지",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "auditability",
    category: "통제",
    name: "감사 기록",
    summary: "에이전트가 무엇을 왜 했는지 기록으로 남기고 같은 작업을 다시 돌릴 수 있는 능력",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  /* ===== 비용 ================================================ */
  {
    slug: "pricing",
    category: "비용",
    name: "요금제",
    summary: "무엇을 단위로 돈이 나가는지 — 좌석인지, 사용량인지, 선불 크레딧인지",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "model-choice",
    category: "비용",
    name: "모델 선택",
    summary: "작업마다 어느 모델을 쓸지 정해 품질을 지키면서 토큰 단가를 낮추는 구조",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "cost-visibility",
    category: "비용",
    name: "사용량·한도",
    summary: "누가 무엇에 얼마를 썼는지 조직이 보고, 새어 나가기 전에 막을 수 있는지",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  /* ===== 도입 여건 ================================================ */
  {
    slug: "deployment",
    category: "도입 여건",
    name: "제공 형태",
    summary: "제품을 어디에서 돌릴 수 있는지, 코드가 어느 경계를 넘어가는지",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
  {
    slug: "surfaces",
    category: "도입 여건",
    name: "클라이언트",
    summary: "같은 도구를 IDE, 웹, 데스크톱, CLI에서 띄울 수 있는지",
    tools: {
      bob: { level: "unknown", label: null },
      claude: { level: "unknown", label: null },
      codex: { level: "unknown", label: null },
      cursor: { level: "unknown", label: null }
    },
  },
];
