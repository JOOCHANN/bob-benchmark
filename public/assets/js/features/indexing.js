/* 상세: 코드베이스 인덱싱. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['indexing'] = {
  updatedAt: '2026-08-25',
  why:
    '대규모 저장소에서 관련 파일을 얼마나 빨리·정확하게 찾느냐가 이후 수정 품질을 가른다. ' +
    '판정 기준은 제품이 저장소를 미리 임베딩·색인하는지, 아니면 매 질의마다 grep·glob에 의존하는지다. ' +
    '찾은 뒤 여러 파일을 함께 고치는 역량은 코드 이해·수정 항목이다.',
  tools: {
    bob: {
      bullets: [],
      source: null,
    },
    claude: {
      bullets: [],
      source: null,
    },
    codex: {
      bullets: [],
      source: null,
    },
    cursor: {
      bullets: [],
      source: null,
    },
  },
};
