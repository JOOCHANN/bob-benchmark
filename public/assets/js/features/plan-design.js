/* 상세: 계획. IDE(확장/에디터) 기준. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['plan-design'] = {
  updatedAt: '2026-08-25',
  why:
    '에이전트가 바로 파일을 고치면 방향이 틀린 뒤에야 알게 된다. ' +
    '여기서는 모드 이름이 아니라 계획 산출물을 본다. 파일이 남는가, 할 일이 붙는가, 승인 전에 소스를 막는가, 세션 밖에도 남는가, 누가 구현으로 넘기는가.',
  tools: {
    bob: {
      bullets: [
        'create-plan 스킬로 워크스페이스에 마크다운 계획 파일을 만든다. 사용자가 검토한 뒤 구현으로 넘어간다.',
        '모드 문서는 계획이 준비되면 Plan에서 Agent로 스스로 전환한다고 한다. 튜토리얼은 새 대화에서 Agent로 구현한다. Plan 모드 도구 목록에는 Todo가 없다.',
      ],
      source: [SRC.bobModes, SRC.bobPlanTutorial],
    },
    claude: {
      bullets: [
        '읽기와 조사만 하고 소스는 고치지 않는다. 계획을 승인한 뒤에 권한 모드가 바뀌며 구현을 시작한다.',
        '에디터에서 계획을 열어 고칠 수 있다. 워크스페이스 문서로 저장하는 산출물은 아니다.',
      ],
      source: SRC.claudeModes,
    },
    codex: {
      bullets: [
        'IDE에서 /plan 또는 Shift+Tab으로 Plan 모드를 켠다. 맥락을 모으고 질문을 한 뒤, 구현 전에 계획을 만든다.',
        '계획 파일·승인 버튼·워크스페이스 저장은 공식 문서에 없다. 긴 작업용 PLANS.md는 사용자가 넣는 템플릿이다.',
      ],
      source: [SRC.codexPlan, SRC.codexIdePlan],
    },
    cursor: {
      bullets: [
        '코드를 쓰기 전에 마크다운 계획을 만든다. 채팅이나 파일에서 검토·수정한 뒤 Build로 구현한다.',
        '기본은 홈 디렉터리에 두고, Save to workspace로 워크스페이스에 옮긴다. 할 일을 더하거나 빼는 것은 출시 발표에 있다.',
      ],
      source: [SRC.cursorPlan, SRC.cursorPlanHelp, SRC.cursorPlanBlog],
    },
  },
  verdict: [
    { label: '계획 파일', text: 'Bob·Cursor는 마크다운 파일로 남긴다. Claude는 세션에서 보여 주고 에디터로 연다. Codex는 문서에 없다.' },
    { label: '할 일', text: '공식 Plan 문서에는 네 도구 모두 계획 산출물로 정의하지 않았다. Cursor만 출시 발표에 있다. Bob Plan 도구 목록에는 Todo가 없다.' },
    { label: '승인 전 차단', text: 'Claude는 권한으로 소스 수정을 막는다. Cursor는 Build 전까지 구현하지 않는다. Bob Plan은 계획 파일은 쓰고, 구현은 다른 모드다.' },
    { label: '저장', text: 'Bob은 워크스페이스에 둔다. Cursor는 홈이 기본이고 워크스페이스로 옮길 수 있다. Claude·Codex는 세션·모드에 가깝다.' },
    { label: '구현 전환', text: 'Cursor는 Build, Claude는 승인 시 권한 모드가 바뀐다. Bob은 자동 전환과 새 대화에서 Agent로 구현이 문서에 같이 있다.' },
  ],
};
