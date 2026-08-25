/* 상세: 모드. IDE(확장/에디터) 기준. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['modes'] = {
  updatedAt: '2026-08-25',
  why:
    '모드는 이 세션에서 에이전트가 무슨 일을 할지를 정하며, 구현할지 계획만 할지 질의만 할지를 나눈다. ' +
    '다만 무엇을 기준으로 나누는지는 제품마다 달라서, 할 일로 나누기도 하고 승인 방식으로 나누기도 한다.',
  tools: {
    bob: {
      bullets: [
        '모드: 작업에 맞춰 역할과 도구 접근을 나눈 페르소나. 모드마다 쓸 수 있는 도구가 다르다.',
        '종류: Agent(구현), Plan(설계, create-plan 후 승인), Ask(질의·설명, 파일 수정 없음). YAML로 커스텀 모드를 만들거나 기본 모드를 수정할 수 있다.',
      ],
      source: [SRC.bobModes, SRC.bobCustomModes],
    },
    claude: {
      bullets: [
        '모드: 동작 전에 승인을 받을지를 정하는 권한 모드다. 할 일의 종류가 아니다.',
        '종류: Manual(수정마다 물음), Edit automatically(파일 수정 자동 승인), Plan(소스는 건드리지 않고 계획), Auto(분류기가 검토). 설정을 켜면 Bypass permissions가 추가된다.',
      ],
      source: SRC.claudeModes,
    },
    codex: {
      bullets: [],
      source: null,
    },
    cursor: {
      bullets: [
        '모드: 이 세션의 작업 유형이다. Agent는 구현, Ask는 읽기 전용, Plan은 승인 후 구현, Debug는 런타임 근거로 버그를 본다.',
        '종류: Agent, Ask, Plan, Debug 네 개의 모드를 가지고 있다.',
      ],
      source: SRC.cursorModes,
    },
  },
  verdict: [
    { label: '공통', text: '셋 다 Plan이 있다. 계획을 세운 뒤 구현으로 넘어가는 흐름은 같다.' },
    { label: '작업 유형', text: 'Bob·Cursor만 할 일로 모드를 나눈다. Bob은 Agent·Plan·Ask, Cursor는 여기에 Debug가 더 있다. Claude의 모드는 이 축이 아니다.' },
    { label: '커스텀', text: 'Bob만 모드 자체를 정의한다. YAML로 역할과 도구 접근을 정하고 기본 모드를 수정할 수 있다. Claude·Cursor는 내장 모드가 고정이다.' },
  ],
};
