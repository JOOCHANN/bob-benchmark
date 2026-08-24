/* 상세: 모델 선택. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['model-choice'] = {
  why: "모든 작업에 최상위 모델을 쓰면 비용이 감당되지 않고, 저가 모델만 쓰면 품질이 무너진다. 판정 기준은 이 선택을 개인 판단에 맡기지 않고 조직 정책이나 자동 규칙으로 강제할 수 있는지, 그리고 선택지가 한 벤더에 묶이는지로 잡았다. 모델 시장의 변화 속도를 보면 종속성도 비용 위험의 일종이다.",
  tools: {
    bob: {
      bullets: [
        "Anthropic Claude, Mistral·Devstral, IBM Granite를 작업 성격에 따라 자동 선택 — 단순 완성은 소형 모델, 복잡한 추론은 프런티어 모델",
        "정확도·지연시간·비용 기준의 규칙 엔진이 라우팅을 결정한다고 발표됨. IBM은 이 라우팅으로 비용을 최대 40% 절감한다고 제시",
        "중요한 유보: 공식 제품 문서에는 모델 라우팅·모델 목록·모델 선택 UI가 전혀 등장하지 않는다. Bobcoins 문서만 \"Bob이 모델 사용량을 코인으로 환산한다\"고 적는다",
        "따라서 라우팅은 벤더가 설명하는 내부 동작이며, 개발자나 조직이 선택을 확인하거나 지정하는 문서화된 수단이 없다 — 블랙박스라는 외부 지적과 일치한다",
        "조직이 모델을 정책으로 제한하는 기능은 오히려 Claude·Codex 쪽에 문서화돼 있다"
      ],
      media: { src: "assets/img/model-choice/bob.png", caption: "Bob의 모델 라우팅" },
      source: SRC.bobRouting,
    },
    claude: {
      bullets: [
        "등급별 모델 선택과 작업별 자동 전환을 지원해 단가를 조절하고, 관리자가 허용 모델을 중앙에서 제한",
        "타사 모델을 섞는 구조가 아니므로 절감 폭이 자사 등급 범위로 제한됨"
      ],
      media: { src: "assets/img/model-choice/claude.png", caption: "Claude Code의 모델 선택" },
      source: SRC.claudeIam,
    },
    codex: {
      bullets: [
        "자사 모델 계열 안에서 추론 강도를 조절해 비용을 낮추고, 관리자가 모델 가용성을 관리",
        "벤더 종속성이 가장 높은 편"
      ],
      media: { src: "assets/img/model-choice/codex.png", caption: "Codex의 모델 설정" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "여러 벤더 모델을 등록하고 자동 선택 모드를 제공. 자체 모델(Composer)도 선택지에 포함",
        "선택 기준이 대체로 개발자와 제품 기본값에 맡겨져, 조직이 정책으로 강제하는 층위는 아님"
      ],
      media: { src: "assets/img/model-choice/cursor.png", caption: "Cursor의 모델 선택" },
      source: SRC.cursor,
    }
  },
  verdict: "Cursor도 멀티벤더 선택과 자체 모델을 제공하므로 \"여러 모델을 쓴다\"만으로는 구분되지 않는다. Bob의 라우팅은 실재할 가능성이 높지만, 이 항목은 이 자료에서 근거가 가장 약한 칸이다 — 벤더 발표와 보도에는 상세히 나오는데 공식 제품 문서에는 모델 이야기가 아예 없다. 초안은 여기에 \"조직이 정책으로 통제한다\"고 적었는데 그 근거는 어디에도 없었고, 오히려 모델을 정책으로 제한하는 기능은 Claude·Codex 쪽에 문서화돼 있다. 문서가 침묵한다는 사실 자체가 판단 재료다. 개발자도 조직도 어느 모델이 쓰였는지 확인할 문서화된 수단이 없다는 뜻이고, 품질 회귀를 추적할 때 변수가 하나 늘어난다. 그리고 Bob의 프런티어 모델이 Claude이므로 라우팅이 절감하는 것은 \"Claude를 덜 쓰는 것\"이다. 40%는 그 교환의 결과이며 품질 영향은 별도로 재야 한다.",
};
