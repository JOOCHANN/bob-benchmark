/* 상세: 추론 조절. IDE(확장/에디터) 기준. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['effort'] = {
  updatedAt: '2026-08-25',
  why:
    'Effort는 생각의 양을 정하는 축으로, 낮추면 빠르고 싸지는 대신 복잡한 작업에서 품질이 떨어질 수 있다. ' +
    'Fast는 생각의 양을 그대로 두고 출력 속도만 올리는 축으로, 품질은 같고 비용이 오른다.',
  tools: {
    bob: {
      bullets: [
        'Effort: 지원하지 않는다.',
      ],
      source: null,
    },
    claude: {
      bullets: [
        'Effort: low·medium·high·xhigh·max로 추론량을 조절한다. 기본값은 high이고 지원 레벨은 모델마다 다르다.',
        'Thinking: 켜면 추론을 더 하고, 그 과정이 접힌 블록으로 대화에 남는다. 펼쳐서 내용을 볼 수 있다.',
        'Fast: IDE에는 없다. CLI에만 있고 Opus 계열 전용이며 research preview다.',
      ],
      source: [SRC.claudeEffort, SRC.claudeThinking, SRC.claudeFast],
    },
    codex: {
      bullets: [],
      source: null,
    },
    cursor: {
      bullets: [
        'Effort: Low·Medium·High·Extra High로 추론 시간을 조절한다.',
        'Fast: 추론을 더 빠르게 할 수 있다. 성능은 떨어지지 않지만 추가 비용이 발생한다.',
      ],
      source: [SRC.cursorEffort, SRC.cursorFast],
    },
  },
  verdict: [
    { label: 'Effort', text: 'Claude·Cursor 둘 다 세션에서 단계로 고를 수 있다.' },
    { label: 'Thinking', text: 'Claude만 추론 과정을 대화에 남겨 펼쳐 볼 수 있다. 추론량을 늘리는 방법이다.' },
    { label: 'Fast', text: 'IDE 기준으로는 Cursor만 해당한다. 추론량은 그대로 두고 속도만 올리는 방법이라 Effort와 다르다. Claude에도 있지만 CLI 전용이다.' },
    { label: 'Bob', text: '추론 조절 기능이 없다.' },
    { label: 'Codex', text: '아직 확인하지 않았다.' },
  ],
};
