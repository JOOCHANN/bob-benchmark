/* 상세: 사용량·한도. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['cost-visibility'] = {
  why: "사용량 기반 과금에서는 지출을 청구서로 확인하는 시점에 이미 늦다. 2026년 들어 토큰 비용이 경영 안건으로 올라온 이유가 이것이다. 판정 기준은 조직·팀·개인 단위로 지출을 분해해 보고, 사전에 한도를 걸 수 있는지로 잡았다. 앞 항목의 단가 절감 주장을 검증할 유일한 수단이기도 하다.",
  tools: {
    bob: {
      bullets: [
        "Bobalytics를 워크스페이스·팀·사용자 세 층으로 제공. 워크스페이스 뷰는 관리자 전용이고, 팀 뷰에서 일반 사용자에게는 이메일이 User 1·User 2로 익명화됨",
        "KPI 세 개로 정리 — 도입률(일 활성 사용자÷라이선스 좌석), Bob factor(Bob이 작성한 커밋 라인 비율), Bobcoin 지출. 팀별로 성과 대비 비용을 함께 봄",
        "관찰에 그치지 않고 통제까지 간다 — 팀 생성 시 팀 예산(사용 가능한 최대 Bobcoin)을 걸고, 개인별 지출 한도를 관리자가 설정",
        "공유 Bobcoin 풀에서 팀·개인에 배분하며, 언어별·모드별 사용 패턴과 저장소별 기여도까지 분해",
        "단, Bobalytics는 Enterprise 플랜 전용이며 bob.ibm.com 웹 포털에서만 열린다"
      ],
      media: { src: "assets/img/cost-visibility/bob.png", caption: "Bobalytics 비용 대시보드" },
      source: SRC.bobalytics,
    },
    claude: {
      bullets: [
        "Claude Code Analytics API로 조직의 일별 생산성 지표를, Enterprise Analytics API로 제품 전반의 채택·비용 데이터를 반출",
        "apps gateway로 사용자별 비용 추적, 모델별 엔타이틀먼트, 지출 알림 제공",
        "단, Bedrock·Vertex·Foundry 경유 세션은 Analytics API 집계에서 빠짐 — 이 경로로 배포하면 가시성에 구멍이 생김"
      ],
      media: { src: "assets/img/cost-visibility/claude.png", caption: "Claude의 사용량 분석" },
      source: SRC.claudeAnalytics,
    },
    codex: {
      bullets: [
        "워크스페이스 분석과 사용 거버넌스를 관리자 기능으로 제공하고 조직 공용 크레딧 풀의 소진 현황을 확인",
        "작업 유형별 원가 분해와 사전 한도 설정의 실제 범위는 1차 문서로 확인하지 못함"
      ],
      media: { src: "assets/img/cost-visibility/codex.png", caption: "Codex의 크레딧 현황" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "관리자가 사용량을 사용자별로 필터링하고 표면별(클라이언트·클라우드 에이전트·Automations·Bugbot·Security Review)로 분해",
        "초과 과금 억제는 요금제 선택으로 간접 통제하며 사전 한도 설정은 확인하지 못함"
      ],
      media: { src: "assets/img/cost-visibility/cursor.png", caption: "Cursor의 팀 사용량" },
      source: SRC.cursor,
    }
  },
  verdict: "공식 문서로 확인하니 이 항목은 Bob의 강점이 맞다. 발표자료의 주장 중 문서로 그대로 확인된 드문 경우이기도 하다. Claude도 분석 API 두 종과 지출 알림을 갖췄으므로 \"대시보드가 있다\"로는 갈리지 않는다. Bob의 차이는 두 가지다. 과금 단위가 행위이므로 코인 차감 단위가 그대로 원가 분해 단위가 되고, 팀 예산과 개인 지출 한도를 사전에 걸 수 있어 관찰에서 통제로 넘어간다. Bob factor처럼 기여도를 비용과 나란히 보는 지표도 다른 도구에 대응물이 없다. 유보는 셋이다. Enterprise 플랜 전용이고, 라우팅의 40% 절감 주장을 이 대시보드로 검증하려 해도 모델별 내역이 문서화돼 있지 않으며, 대시보드가 있다는 것과 우리 부서별 배부 기준에 맞는다는 것은 다른 문제다. 파일럿에서 실제 정산에 쓸 수 있는 형태인지 확인해야 한다.",
};
