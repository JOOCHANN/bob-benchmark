/* 상세: 모드. IDE(확장/에디터) 기준. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['modes'] = {
  updatedAt: '2026-08-25',
  why:
    '모드는 이 세션에서 에이전트가 할 수 있는 일의 범위다. 파일을 고칠지, 계획만 할지, 질의만 할지를 나눈다. ' +
    '범위를 나누는 축은 둘이다. 무슨 일을 하느냐와 어디까지 묻지 않고 하느냐. 도구마다 이 중 무엇을 모드라고 부르는지가 다르다. ' +
    'Effort는 그 범위 안에서 추론에 얼마나 쓸지다. 권한을 바꾸지 않고 깊이와 비용만 조절한다.',
  tools: {
    bob: {
      bullets: [
        '모드: 작업에 맞춰 역할과 도구 접근을 나눈 페르소나. 모드마다 쓸 수 있는 도구가 다르다.',
        '종류: Agent(구현), Plan(설계, create-plan 후 승인), Ask(질의·설명, 파일 수정 없음). YAML로 커스텀 모드를 만들거나 기본 모드를 수정할 수 있다.',
        'Effort: 지원하지 않는다.',
      ],
      source: [SRC.bobModes, SRC.bobCustomModes],
    },
    claude: {
      bullets: [
        '모드: 동작 전에 승인을 받을지를 정하는 권한 모드다. 할 일의 종류가 아니다.',
        '종류: Manual(수정마다 물음), Edit automatically(파일 수정 자동 승인), Plan(소스는 건드리지 않고 계획), Auto(분류기가 검토). 설정을 켜면 Bypass permissions가 추가된다.',
        'Effort: Low·Medium·High·xhigh·max로 추론 시간을 조절한다.',
      ],
      source: [SRC.claudeModes, SRC.claudeEffort],
    },
    codex: {
      bullets: [],
      source: null,
    },
    cursor: {
      bullets: [
        '모드: 이 세션의 작업 유형이다. Agent는 구현, Ask는 읽기 전용, Plan은 승인 후 구현, Debug는 런타임 근거로 버그를 본다.',
        '종류: Agent, Ask, Plan, Debug 네 개의 모드를 가지고 있다.',
        'Effort: Low·Medium·High·Extra High로 추론 시간을 조절한다.',
      ],
      source: [SRC.cursorModes, SRC.cursorEffort],
    },
  },
  verdict: [
    { label: '공통', text: '셋 다 Plan이 있다. 계획을 세운 뒤 구현으로 넘어가는 흐름은 같다.' },
    { label: '작업 유형', text: 'Bob·Cursor만 할 일로 모드를 나눈다. Bob은 Agent·Plan·Ask, Cursor는 여기에 Debug가 더 있다. Claude의 모드는 이 축이 아니다.' },
    { label: '전환', text: 'Bob은 에이전트가 스스로 바꾼다. Claude·Cursor는 사람이 바꿔줘야 한다.' },
    { label: '커스텀', text: 'Bob만 모드 자체를 정의한다. YAML로 역할과 도구 접근을 정하고 기본 모드를 수정할 수 있다. Claude·Cursor는 내장 모드가 고정이다.' },
    { label: 'Effort', text: 'Claude·Cursor에 있고 Bob에는 없다. 레벨 이름은 캘리브레이션이 달라 제품 간 직접 비교가 안 된다. Codex는 확인이 필요하다.' },
  ],
};