/* 상세: 모드. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['modes'] = {
  why:
    '모드는 그 세션에서 허용되는 동작 집합이다. Agent는 편집·실행이 열리고, Plan은 구현 전에 설계를 고정하며, Ask는 읽기만 남긴다. ' +
    '세션 중에 이 경계를 바꿀 수 있어야 조사와 구현을 같은 권한으로 돌리지 않는다. ' +
    'Effort는 모드와 별개다. 권한을 바꾸지 않고 추론에 쓰는 양만 조절한다. ' +
    'Bob은 Effort가 없고, 역할·도구 집합을 커스텀 모드로 고정한다.',
  tools: {
    bob: {
      bullets: [
        '기본 모드는 Agent, Plan, Ask. 모드마다 도구 집합이 다르다. Agent는 편집·실행, Ask는 읽기 위주다',
        '커스텀 모드로 역할 정의, 도구 권한, 지침을 YAML에 묶어 팀 표준으로 배포할 수 있다. 목록 검색으로 고른다',
        'Effort(추론 예산)는 화면과 문서에서 확인되지 않는다',
      ],
      source: SRC.bobModes,
    },
    claude: {
      bullets: [
        '모드는 작업 종류가 아니라 승인 범위다. Manual은 수정마다 묻고, Edit automatically는 파일을 바로 고치며, Plan은 조사 후 계획을 내고, Auto는 안전검사를 통과한 작업만 진행한다',
        'Shift+Tab으로 전환한다',
        '같은 메뉴에 Effort 슬라이더가 있다. 화면 기준 High. 값을 낮추면 응답이 짧아지고, 높이면 추론에 더 쓴다',
      ],
      source: SRC.claudePerm,
    },
    codex: {
      source: null,
    },
    cursor: {
      bullets: [
        'Agent, Plan, Debug, Multitask, Ask. Agent·Plan·Ask는 Bob과 같은 축이고 Debug·Multitask가 더 있다',
        'Shift+Tab 또는 모드 메뉴로 전환한다',
        'Effort는 모드 메뉴가 아니라 모델 선택에 있다. Low·Medium·High 등으로 추론 시간을 조절한다',
      ],
      source: SRC.cursorModes,
    },
  },
  verdict: [
    'Bob·Cursor는 할 일로 모드를 나눈다. Agent / Plan / Ask가 공통이고, Cursor는 Debug·Multitask를 같은 목록에 둔다',
    'Claude는 할 일이 아니라 승인 범위다. Manual → Auto로, 수정 전에 얼마나 물을지를 고른다',
    'Effort는 Claude(모드 메뉴 슬라이더)와 Cursor(모델 선택)에 있다. Bob에는 없다',
    'Bob은 커스텀 모드로 역할과 도구 권한을 파일로 고정할 수 있다',
    'Codex는 아직 확인하지 않았다',
  ],
};
