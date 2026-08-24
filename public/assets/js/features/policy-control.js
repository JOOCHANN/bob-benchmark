/* 상세: 권한. 장표의 판정(level · label)은 data.js를 본다. */
FEATURES_DETAIL['policy-control'] = {
  why: "개인 개발자에게는 부가 기능이지만 규제 산업의 대규모 조직에서는 도입 가부를 가르는 요건이다. 판정 기준은 개인이 재정의할 수 없는 형태로 조직이 정책을 배포할 수 있는지다. 개발자가 설정을 바꿀 수 있으면 그것은 기본값이지 정책이 아니다.",
  tools: {
    bob: {
      bullets: [
        "SAML IdP를 이메일 도메인 단위로 연결하고, DNS TXT 레코드로 도메인 소유를 검증한 뒤 SSO를 강제",
        "역할은 User와 Admin 두 종류. Admin은 사용자·팀 관리와 관리 대시보드 접근 권한을 가짐",
        "팀별 Bobcoin 예산과 개인별 지출 한도를 관리자가 설정하고, 프리미엄 패키지 접근 권한을 사용자 단위로 통제",
        "다만 통제 대상이 좌석·예산·접근이며 에이전트 행위가 아니다 — 관리자가 배포하고 개인이 재정의할 수 없는 설정에 해당하는 기능이 문서에 없음",
        "규칙·모드는 \"공유 저장소를 만들어 팀원이 각자 ~/.bob/rules/로 clone\" 하는 관례로 배포되며, 자동 승인은 채팅 위 툴바에서 개인이 켜는 설정이다"
      ],
      media: { src: "assets/img/policy-control/bob.png", caption: "Bob의 관리자 대시보드" },
      source: SRC.bobEnterprise,
    },
    claude: {
      bullets: [
        "MDM으로 배포하는 managed settings를 사용자가 재정의할 수 없음. 허용 모델과 기본값을 중앙에서 조정",
        "서버에 정책을 한 번 정의하면 클라이언트가 로그인 시 받아감",
        "Bedrock·Google Cloud용 apps gateway로 자체 호스팅 control plane, 기업 SSO, 중앙 정책 집행 제공",
        "도구 실행 권한 정책과 훅으로 조직 규칙을 코드로 강제"
      ],
      media: { src: "assets/img/policy-control/claude.png", caption: "Claude Code의 관리 설정" },
      source: SRC.claudeIam,
    },
    codex: {
      bullets: [
        "역할 기반 접근 제어와 managed configuration을 문서화된 관리자 기능으로 제공",
        "모델 가용성 관리와 사용 거버넌스를 조직 단위로 설정"
      ],
      media: { src: "assets/img/policy-control/codex.png", caption: "Codex의 관리자 설정" },
      source: SRC.codex,
    },
    cursor: {
      bullets: [
        "Team Rules로 조직 전역 정책을 정의하고 Bugbot 규칙까지 적용",
        "훅으로 승인·편집 이벤트에 스크립트 연결",
        "규칙 중심이며 개인이 재정의할 수 없는 형태의 정책 배포는 공식 문서로 확인하지 못함"
      ],
      media: { src: "assets/img/policy-control/cursor.png", caption: "Cursor의 Team Rules" },
      source: SRC.cursor,
    }
  },
  verdict: "공식 문서로 다시 세우자 Bob이 이 축에서 앞서지 않는다. Bob의 관리자 기능은 실재하고 잘 문서화돼 있으나 통제 대상이 다르다 — 누가 쓸 수 있고 얼마를 쓸 수 있는지는 촘촘하게 통제되지만, 에이전트가 무엇을 해도 되는지는 개발자 손에 남는다. Claude는 MDM으로 배포한 설정을 사용자가 재정의할 수 없고, Codex는 managed configuration을 제공한다. 이 축의 기준은 후자다. 실무적으로 이것이 뜻하는 바는 분명하다. 자동 승인을 조직이 금지할 수단이 문서에 없으므로, \"Bob은 승인 체크포인트로 통제된다\"는 주장은 개발자가 그 체크포인트를 켜 둔다는 가정 위에서만 성립한다. 차선책은 프로젝트 `settings.json`을 표준화해 저장소에 커밋하는 것이며, 이는 강제가 아니라 합의에 의존한다.",
};
