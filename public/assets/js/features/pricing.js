/* 상세: 요금제. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['pricing'] = {
  why: "이 항목은 어느 도구가 싼지를 가리지 않는다. 정가는 계약 조건에 따라 달라지고 네 도구 모두 대량 계약은 협상 대상이라 정가 비교는 오해만 만든다. 판정 기준은 \"조직이 월 비용을 사전에 예측하고 상한을 걸 수 있는가\"로 잡았다. 수천 명 규모에서 예측 불가능한 변동비는 금액 자체보다 예산 편성에서 더 큰 문제가 된다. 아래 금액은 모두 공개 정가다.",
  tools: {
    bob: {
      bullets: [
        "Bobcoin 선불 크레딧으로 과금(1코인 = $0.50 고정). 코드 생성·파일 분석·명령 실행 등 행위가 요구하는 연산량에 따라 차감",
        "좌석 요금에 지원 비용이 별도로 붙는다 — Pro $20+$3(40코인), Pro Plus $60+$9(160코인), Ultra $200+$30(500코인)",
        "월 할당량은 매월 리셋되며 이월되지 않는다. 남은 코인은 소멸하므로 과다 구매가 손실이 됨",
        "Overage는 선택 활성화이고 한도를 조절할 수 있으나, 한 번 켜면 그 달에는 끌 수 없음",
        "엔터프라이즈는 좌석 구독에 풀 코인을 더하는 구조(1,000코인 팩 $500, 구매 후 1년 만료)",
        "Premium Package(Java·Z·i)는 이 구독과 별개 계약이므로 총소유비용에 따로 더해야 함"
      ],
      media: { src: "assets/img/pricing/bob.png", caption: "Bob의 요금제와 Bobcoin" },
      source: SRC.bobCoins,
    },
    claude: {
      bullets: [
        "좌석 요금에 사용량이 포함되는 구조 — Team 표준 좌석 월 $20~25, 프리미엄 좌석 월 $100~125",
        "Claude Code가 모든 요금제에 포함돼 별도 라인 아이템이 없음",
        "초과분은 조직 관리자가 usage credits를 켜야 발생하므로 기본 상태에서 상한이 좌석 요금",
        "네 도구 중 좌석당 월 비용을 사전에 고정하기 가장 쉬움"
      ],
      media: { src: "assets/img/pricing/claude.png", caption: "Claude 요금제" },
      source: SRC.claudePrice,
    },
    codex: {
      bullets: [
        "2026-04부터 메시지 단위가 아닌 토큰 크레딧 방식으로 전환",
        "Enterprise는 좌석별 한도 대신 조직 공용 크레딧 풀 — 사용량이 고른 팀에 유리하나 좌석 고정비 개념이 약함"
      ],
      media: { src: "assets/img/pricing/codex.png", caption: "Codex의 크레딧 과금" },
      source: SRC.codexPrice,
    },
    cursor: {
      bullets: [
        "좌석에 포함 사용량을 주고 초과분은 후불로 청구(Teams 좌석 월 $40 기준)",
        "Bugbot은 사용자당 월 $40의 별도 과금",
        "초과분이 월별로 변동해 상한을 걸려면 별도 관리가 필요"
      ],
      media: { src: "assets/img/pricing/cursor.png", caption: "Cursor 요금제" },
      source: SRC.cursorPrice,
    }
  },
  verdict: "Bob이 앞서지 않는 항목이다. 선불 크레딧은 상한 관리에는 유리하지만 예산 편성에는 불리하다 — 같은 작업의 코인 소모량이 변동하므로 좌석당 월 비용을 고정할 수 없다. 이월이 없다는 점도 함께 봐야 한다. 사용량을 낮게 잡으면 작업이 끊기고 높게 잡으면 남은 코인이 소멸한다. 여기에 지원 비용이 좌석마다 15% 수준으로 더 붙고, Premium Package가 별도 계약이므로 레거시 현대화를 노리고 도입할수록 총소유비용이 정가에서 멀어진다. 실제 판단은 우리 계약 조건과 예상 작업량으로 다시 계산해야 하며, Bob의 비용 경쟁력은 이 표의 단가가 아니라 아래 두 항목에서 나온다.",
};
