/**
 * 비교 데이터 단일 소스.
 * 장표(index.html)와 상세 페이지(detail.html)가 모두 이 파일만 참조한다.
 * 기능을 추가하려면 FEATURES 배열에 객체를 하나 더 넣으면 된다.
 *
 * level: 'full' | 'partial' | 'none' | 'unknown'
 *   full    - 제품에 내장된 정식 기능
 *   partial - 유사 기능이 있으나 범위/방식이 제한적
 *   none    - 해당 기능 없음
 *   unknown - 근거를 확인하지 못함 (추측으로 채우지 않는다)
 */

const META = {
  checkedAt: '2026-07-28',
  status: 'draft', // 가안. 셀 판정은 검증 전 상태.
};

const TOOLS = [
  { id: 'bob', name: 'IBM Bob', vendor: 'IBM', mark: 'B', highlight: true },
  { id: 'claude', name: 'Claude Code', vendor: 'Anthropic', mark: 'C' },
  { id: 'codex', name: 'OpenAI Codex', vendor: 'OpenAI', mark: 'O' },
  { id: 'cursor', name: 'Cursor', vendor: 'Anysphere', mark: 'CU' },
];

const LEVELS = {
  full: { label: '지원', symbol: '●', className: 'lv-full' },
  partial: { label: '부분', symbol: '◐', className: 'lv-partial' },
  none: { label: '미지원', symbol: '−', className: 'lv-none' },
  unknown: { label: '확인 필요', symbol: '?', className: 'lv-unknown' },
};

const SRC = {
  bob: { text: 'IBM Bob 공식 문서', url: 'https://bob.ibm.com/docs/ide' },
  bobNews: {
    text: 'IBM 뉴스룸 발표 (2026-04-28)',
    url: 'https://newsroom.ibm.com/2026-04-28-introducing-ibm-bob-ai-development-partner-that-takes-enterprises-from-ai-assisted-coding-to-production-ready-software',
  },
  claude: { text: 'Claude Code 문서', url: 'https://docs.claude.com/en/docs/claude-code/overview' },
  codex: { text: 'OpenAI Codex 문서', url: 'https://developers.openai.com/codex/' },
  cursor: { text: 'Cursor 문서', url: 'https://cursor.com/docs' },
  mcp: { text: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/' },
};

const FEATURES = [
  {
    slug: 'plan-mode',
    category: '개발 경험',
    name: '계획 모드',
    summary: '코드를 수정하기 전에 작업 계획을 먼저 세우고 사람의 승인을 받는 단계',
    why:
      '에이전트가 곧바로 파일을 고치기 시작하면 의도와 다른 방향으로 나아간 뒤에야 발견하게 된다. ' +
      '계획 단계를 분리하면 되돌리는 비용이 큰 작업일수록 이득이 커진다. ' +
      '엔터프라이즈 환경에서는 "무엇을 할 것인가"를 승인 기록으로 남길 수 있는지도 함께 본다.',
    tools: {
      bob: {
        level: 'full',
        label: 'Plan 모드 내장',
        bullets: [
          'Agent / Ask / Plan 세 가지 모드를 명시적으로 분리해 제공',
          'Plan 모드에서 설계·계획을 먼저 수립한 뒤 구현 단계로 전환',
          '작업 유형에 따라 수동 승인과 자동 승인을 나누는 거버넌스 체크포인트',
        ],
        media: { src: 'assets/img/plan-mode/bob.png', caption: 'Bob의 Plan 모드 화면' },
        source: SRC.bob,
      },
      claude: {
        level: 'full',
        label: 'Plan 모드 내장',
        bullets: [
          '읽기 전용으로 조사한 뒤 계획을 제시하고 승인을 받는 Plan 모드 제공',
          '승인 전까지 파일 수정이 차단됨',
        ],
        media: { src: 'assets/img/plan-mode/claude.png', caption: 'Claude Code의 Plan 모드' },
        source: SRC.claude,
      },
      codex: {
        level: 'partial',
        label: '승인 모드로 대체',
        bullets: [
          '별도의 계획 전용 모드보다는 실행 단위 승인 정책(제안/자동 편집/전자동)으로 통제',
          '계획 산출물을 승인 대상으로 다루는 방식은 아님',
        ],
        media: { src: 'assets/img/plan-mode/codex.png', caption: 'Codex의 승인 모드 설정' },
        source: SRC.codex,
      },
      cursor: {
        level: 'full',
        label: 'Plan 기능 제공',
        bullets: [
          'Agent가 작업 전 계획을 세우고 사용자가 검토·수정할 수 있는 흐름 제공',
          '계획을 그대로 실행 단계로 넘기는 연결이 매끄러움',
        ],
        media: { src: 'assets/img/plan-mode/cursor.png', caption: 'Cursor의 Plan 화면' },
        source: SRC.cursor,
      },
    },
    verdict:
      '계획 모드 자체는 네 도구 모두가 어떤 형태로든 갖추고 있어 차별점이라 보기 어렵다. ' +
      'Bob의 차이는 계획 단계를 승인 기록으로 남겨 감사 추적과 연결한다는 점에 있으므로, ' +
      '이 기능은 단독으로가 아니라 감사 추적 항목과 함께 볼 때 의미가 있다.',
  },

  {
    slug: 'subagents',
    category: '에이전트 실행',
    name: '서브에이전트 병렬 실행',
    summary: '큰 작업을 여러 갈래로 나눠 독립된 에이전트가 동시에 처리하는 능력',
    why:
      '단일 에이전트는 컨텍스트가 길어질수록 정확도가 떨어진다. ' +
      '작업을 분할해 각각 독립된 컨텍스트에서 처리하면 대규모 리팩터링이나 전사 단위 변경에서 처리량과 정확도가 함께 올라간다.',
    tools: {
      bob: {
        level: 'full',
        label: '서브에이전트 분기',
        bullets: [
          '복잡한 작업을 병렬 워크스트림으로 분해해 전용 서브에이전트를 생성',
          'SDLC 역할(설계·코딩·테스트·배포)별 에이전트를 조율하는 구조',
        ],
        media: { src: 'assets/img/subagents/bob.png', caption: 'Bob의 서브에이전트 분기' },
        source: SRC.bob,
      },
      claude: {
        level: 'full',
        label: '서브에이전트 지원',
        bullets: [
          '역할별 서브에이전트를 정의해 독립 컨텍스트에서 병렬 실행',
          '탐색·조사처럼 결과만 필요한 작업에 컨텍스트를 절약하는 용도로 활용',
        ],
        media: { src: 'assets/img/subagents/claude.png', caption: 'Claude Code의 서브에이전트' },
        source: SRC.claude,
      },
      codex: {
        level: 'partial',
        label: '클라우드 작업 병렬화',
        bullets: [
          '격리된 클라우드 환경에서 여러 작업을 동시에 돌리는 방식의 병렬성',
          '하나의 작업 안에서 에이전트를 분기시키는 구조와는 결이 다름',
        ],
        media: { src: 'assets/img/subagents/codex.png', caption: 'Codex의 병렬 작업 실행' },
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
      'Bob은 서브에이전트를 SDLC 역할과 묶어 배치한다는 점이 특징이다. ' +
      '다만 병렬 실행 자체는 Claude Code도 동등하게 제공하므로, ' +
      '실제 차이는 "몇 개를 동시에 돌리는가"보다 "역할 분담이 조직의 개발 프로세스에 맞게 정의되는가"에서 갈린다.',
  },

  {
    slug: 'mcp',
    category: '확장성',
    name: 'MCP 도구 연동',
    summary: 'Model Context Protocol로 사내 시스템·외부 도구를 에이전트에 연결하는 표준 확장',
    why:
      '사내 이슈 트래커, 사내 위키, 사내 배포 파이프라인에 접근하지 못하는 코딩 에이전트는 반쪽짜리다. ' +
      'MCP는 이 연결을 도구마다 따로 만들지 않고 한 번 만들어 재사용하게 해준다. ' +
      '도입 검토 시 "우리가 만든 MCP 서버를 그대로 쓸 수 있는가"가 실질적인 판단 기준이 된다.',
    tools: {
      bob: {
        level: 'full',
        label: 'MCP 지원',
        bullets: [
          '설정 패널에서 MCP 서버 추가·구성·제거를 직접 수행',
          '로컬 실행과 원격 실행 두 가지 배포 방식 모두 선택 가능',
        ],
        media: { src: 'assets/img/mcp/bob.png', caption: 'Bob의 MCP 서버 설정 패널' },
        source: SRC.bob,
      },
      claude: {
        level: 'full',
        label: 'MCP 지원',
        bullets: [
          'MCP 표준을 처음 제안한 주체로 로컬·원격 서버를 모두 지원',
          '프로젝트 단위 / 사용자 단위로 서버 범위를 분리해 등록',
        ],
        media: { src: 'assets/img/mcp/claude.png', caption: 'Claude Code의 MCP 연결' },
        source: SRC.mcp,
      },
      codex: {
        level: 'full',
        label: 'MCP 지원',
        bullets: ['설정 파일을 통해 MCP 서버를 등록하고 도구로 노출'],
        media: { src: 'assets/img/mcp/codex.png', caption: 'Codex의 MCP 설정' },
        source: SRC.codex,
      },
      cursor: {
        level: 'full',
        label: 'MCP 지원',
        bullets: ['설정 UI에서 MCP 서버를 등록하고 에이전트 도구로 사용'],
        media: { src: 'assets/img/mcp/cursor.png', caption: 'Cursor의 MCP 설정' },
        source: SRC.cursor,
      },
    },
    verdict:
      'MCP는 네 도구 모두가 지원하는 사실상의 업계 표준이 되었다. 이 항목은 Bob의 차별점이 아니다. ' +
      '다만 사내 시스템 연동 자산을 도구 교체와 무관하게 재사용할 수 있다는 뜻이므로, ' +
      '도입 판단에서는 오히려 위험을 낮추는 근거로 읽는 편이 맞다.',
  },

  {
    slug: 'model-routing',
    category: '모델 운용',
    name: '멀티모델 라우팅',
    summary: '작업 성격에 따라 서로 다른 벤더의 모델을 자동으로 골라 쓰는 능력',
    why:
      '모든 작업에 최상위 모델을 쓰면 비용이 감당되지 않고, 모든 작업에 저가 모델을 쓰면 품질이 무너진다. ' +
      '수천 명 규모로 배포하는 조직에서는 이 선택을 개발자 개인의 판단에 맡길지, 정책으로 강제할지가 비용 구조를 바꾼다.',
    tools: {
      bob: {
        level: 'full',
        label: '자동 라우팅',
        bullets: [
          'IBM Granite · Anthropic Claude · Mistral을 작업에 따라 자동 선택',
          '정확도·지연시간·비용을 기준으로 규칙 엔진이 라우팅을 결정',
          '코드 생성, 리팩터링 제안, 문서 작성에 각각 다른 모델을 배정',
        ],
        media: { src: 'assets/img/model-routing/bob.png', caption: 'Bob의 모델 라우팅 구조' },
        source: SRC.bobNews,
      },
      claude: {
        level: 'partial',
        label: '자사 모델 내 선택',
        bullets: [
          'Opus·Sonnet·Haiku 중 선택 및 작업별 자동 전환 지원',
          '타사 모델을 섞어 라우팅하는 구조는 아님',
        ],
        media: { src: 'assets/img/model-routing/claude.png', caption: 'Claude Code의 모델 선택' },
        source: SRC.claude,
      },
      codex: {
        level: 'partial',
        label: '자사 모델 내 선택',
        bullets: ['OpenAI 모델 계열 안에서 추론 강도(reasoning effort)를 조절'],
        media: { src: 'assets/img/model-routing/codex.png', caption: 'Codex의 모델 설정' },
        source: SRC.codex,
      },
      cursor: {
        level: 'full',
        label: '멀티벤더 자동 선택',
        bullets: [
          '여러 벤더의 모델을 등록하고 Auto 모드로 자동 선택',
          '개발자가 모델을 직접 지정하는 것도 가능',
        ],
        media: { src: 'assets/img/model-routing/cursor.png', caption: 'Cursor의 모델 선택' },
        source: SRC.cursor,
      },
    },
    verdict:
      'Cursor도 멀티벤더 자동 선택을 제공하므로 "여러 모델을 쓴다"는 것만으로는 구분되지 않는다. ' +
      'Bob의 실질적 차이는 라우팅 기준을 조직이 정책으로 통제한다는 점과, ' +
      '선택지에 사내 배포가 가능한 Granite가 포함된다는 점이다.',
  },

  {
    slug: 'governance',
    category: '엔터프라이즈',
    name: '보안 · 거버넌스',
    summary: '에이전트의 행위를 조직 정책으로 통제하고 민감 정보 유출을 사전에 차단하는 장치',
    why:
      '개인 개발자에게는 부가 기능이지만 규제 산업의 대규모 조직에서는 도입 가능 여부를 가르는 요건이다. ' +
      '사후 점검이 아니라 개발 과정 안에서 실시간으로 차단되는지가 핵심이다.',
    tools: {
      bob: {
        level: 'full',
        label: '개발 과정 내장',
        bullets: [
          '프롬프트 정규화 및 민감 데이터 스캔을 실행 시점에 적용',
          '실시간 정책 집행과 AI 레드티밍을 개발 프로세스에 통합',
          '사후 검사가 아니라 파이프라인 내부에서 동작하는 구조',
        ],
        media: { src: 'assets/img/governance/bob.png', caption: 'Bob의 정책 집행 흐름' },
        source: SRC.bobNews,
      },
      claude: {
        level: 'partial',
        label: '권한 제어 중심',
        bullets: [
          '도구 실행 권한 정책과 훅으로 조직 규칙을 강제',
          '민감 정보 스캔·레드티밍은 별도 솔루션과 조합해야 함',
        ],
        media: { src: 'assets/img/governance/claude.png', caption: 'Claude Code의 권한 설정' },
        source: SRC.claude,
      },
      codex: {
        level: 'partial',
        label: '샌드박스 중심',
        bullets: [
          '네트워크 차단과 샌드박스 실행으로 위험 범위를 제한',
          '조직 정책 엔진 형태의 통제는 제한적',
        ],
        media: { src: 'assets/img/governance/codex.png', caption: 'Codex의 샌드박스 설정' },
        source: SRC.codex,
      },
      cursor: {
        level: 'partial',
        label: '팀 관리 기능',
        bullets: [
          '프라이버시 모드와 팀 단위 관리자 설정 제공',
          '코드 저장 여부 통제가 중심이며 정책 집행 엔진과는 층위가 다름',
        ],
        media: { src: 'assets/img/governance/cursor.png', caption: 'Cursor의 팀 설정' },
        source: SRC.cursor,
      },
    },
    verdict:
      '네 도구 중 Bob의 차별점이 가장 뚜렷하게 드러나는 항목이다. ' +
      '다른 도구들이 권한·샌드박스·저장 정책으로 위험 범위를 좁히는 접근이라면, ' +
      'Bob은 정책 집행 자체를 개발 파이프라인 안에 넣는다. ' +
      '다만 이 차이는 규제 요건이 있는 조직에서만 체감되며, 소규모 팀에는 과한 장치일 수 있다.',
  },
];
