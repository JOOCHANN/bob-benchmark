# bob-benchmark 구현 계획

IBM Bob vs Claude Code vs OpenAI Codex vs Cursor 비교 장표 웹페이지.

- 저장소: https://github.com/JOOCHANN/bob-benchmark
- 배포: Cloudflare Pages
- 대상 독자: IBM 직원 (한국어)
- 목적: Bob이 타 AI 코딩 도구와 무엇이 다른지 **한 장으로** 파악 → 궁금한 기능은 **클릭해서 상세 비교**

---

## 1. 확정된 전제

| 항목 | 결정 |
|---|---|
| 기술 스택 | 정적 HTML/CSS/JS (빌드 도구 없음) |
| 표시 언어 | 한국어 |
| 미디어 | 자리(placeholder)만 확보, 실제 이미지/영상은 이후 교체 |
| Bob 정보원 | 공개 웹 문서 우선 → 부족분은 사용자가 자료 제공 |

빌드 도구를 쓰지 않는 이유: 페이지 종류가 실질적으로 2개(메인 + 상세 템플릿)뿐이라 번들러·SSG의 이득이 없고, Cloudflare Pages에 폴더를 그대로 올리면 끝나기 때문.

---

## 2. 화면 구조

### 2.1 메인 페이지 (`index.html`) — "하나의 장표"

```
┌──────────────────────────────────────────────────────────────┐
│  IBM Bob 기능 비교 장표          [범례: ✅완전 ◐부분 ✕미지원]  │
├──────────────┬────────┬────────┬────────┬────────────────────┤
│              │  Bob   │ Claude │ Codex  │  Cursor            │  ← 상단 도구 헤더(로고+이름)
│              │        │  Code  │        │                    │     스크롤 시 sticky
├──────────────┼────────┼────────┼────────┼────────────────────┤
│ ▸ 개발 경험                                                   │  ← 카테고리 구분 행
│   인터페이스  │   ✅   │   ✅   │   ◐    │   ✅        [상세 →]│  ← 행 전체가 클릭 영역
│   계획 모드   │   ✅   │   ✅   │   ◐    │   ◐         [상세 →]│
│ ▸ 확장성                                                      │
│   MCP 지원    │   ✅   │   ✅   │   ◐    │   ✅        [상세 →]│
│   ...                                                        │
└──────────────────────────────────────────────────────────────┘
```

- 기능명(왼쪽 열)을 누르면 `detail.html?f=<slug>` 로 **페이지 이동**
- 셀은 아이콘 + 짧은 텍스트(예: `✅ 전용 IDE`)를 함께 표기 → 색/기호만으로 판별하지 않아도 됨(접근성)
- 셀 호버 시 한 줄 요약 tooltip
- 스크롤 없이 한 화면에 들어오는 것을 목표로 기능 12개 내외 유지

### 2.2 상세 페이지 (`detail.html?f=<slug>`)

기능당 페이지 하나. **파일은 1개**이고 쿼리스트링의 slug로 데이터를 골라 렌더한다.
(기능마다 HTML 파일을 복사하면 12개 파일에 같은 레이아웃이 중복되어 유지보수가 무너짐)

레이아웃:

```
← 장표로 돌아가기                                [◀ 이전 기능 | 다음 기능 ▶]

# 계획 모드 (Plan Mode)
한 문단 요약: 이 기능이 왜 중요한지, 무엇을 비교하는지

┌── Bob ────────────┐ ┌── Claude Code ────┐   ← 도구별 카드 4개 (2×2 / 모바일 1열)
│ ✅ 완전 지원        │ │ ✅ 완전 지원       │
│ [ 이미지/영상 슬롯 ] │ │ [ 이미지/영상 슬롯 ]│
│ • 근거 불릿          │ │ • 근거 불릿        │
│ • 근거 불릿          │ │ • 근거 불릿        │
│ 출처 ↗              │ │ 출처 ↗            │
└───────────────────┘ └──────────────────┘

## 정리
Bob 관점의 차별점 / 한계 (2~4문장, 과장 없이)
```

---

## 3. 데이터 모델 — 단일 소스

`assets/js/data.js` 하나가 **장표와 상세 페이지 양쪽의 유일한 출처**. HTML에 내용을 직접 쓰지 않는다.

```js
const TOOLS = [
  { id: 'bob',    name: 'IBM Bob',    logo: 'assets/img/logo/bob.svg',    highlight: true },
  { id: 'claude', name: 'Claude Code', logo: '...' },
  { id: 'codex',  name: 'OpenAI Codex', logo: '...' },
  { id: 'cursor', name: 'Cursor',      logo: '...' },
];

const FEATURES = [
  {
    slug: 'plan-mode',
    category: '개발 경험',
    name: '계획 모드',
    summary: '구현 전에 작업 계획을 세우고 사용자 승인을 받는 단계',
    tools: {
      bob: {
        level: 'full',              // full | partial | none | unknown
        label: 'Plan 모드 내장',
        bullets: ['...', '...'],
        media: { type: 'image', src: 'assets/img/plan-mode/bob.png',
                 caption: '...', alt: '...' },   // 파일 없으면 placeholder 렌더
        source: { text: 'IBM Bob 공식 문서', url: 'https://bob.ibm.com/docs/ide' },
      },
      claude: { ... }, codex: { ... }, cursor: { ... },
    },
    verdict: 'Bob은 ... / 다만 ...',
  },
];
```

**작성 규칙**
- `level`이 `full`/`partial`인 셀은 **반드시 `source` 필요**. 근거를 못 찾으면 `unknown`으로 두고 사용자에게 확인 요청.
- Bob에 유리하게 임의로 판정하지 않는다. 타 도구가 더 나은 항목은 그대로 표기한다 — IBM 직원용 내부 분석 자료의 신뢰도가 곧 자료의 가치.
- 각 기능 데이터에 `checkedAt: '2026-07-28'` 기록. AI 코딩 도구는 변화가 빨라 자료의 시점 표기가 필수.

---

## 4. 비교할 기능 축 (초안, 확정 전)

공개 자료 조사 기반 초안. Bob 강점 축만 모으면 자료의 설득력이 떨어지므로 공통 축과 섞어 배치.

| # | 카테고리 | 기능 | 비교 포인트 |
|---|---|---|---|
| 1 | 개발 경험 | 인터페이스 형태 | 전용 IDE / 확장 / CLI / 웹 |
| 2 | 개발 경험 | 계획 모드 | 실행 전 계획 수립·승인 |
| 3 | 개발 경험 | 터미널·셸 통합 | BobShell 등 CLI 워크플로 |
| 4 | 에이전트 | 서브에이전트 병렬 실행 | 작업 분할 및 동시 수행 |
| 5 | 에이전트 | 코드베이스 컨텍스트 이해 | 대규모 저장소 탐색·인덱싱 |
| 6 | 에이전트 | 자동 테스트 생성 | 테스트 작성·실행 루프 |
| 7 | 확장성 | MCP 지원 | 외부 도구 연동 |
| 8 | 확장성 | Skills / 커스텀 워크플로 | 재사용 가능한 지시 세트 |
| 9 | 모델 | 멀티모델 라우팅 | 자동 선택 vs 수동 선택 |
| 10 | 엔터프라이즈 | 보안·거버넌스 | 정책 집행, 민감정보 스캔, 레드팀 |
| 11 | 엔터프라이즈 | 감사 추적 | 에이전트 행위 기록·재현성 |
| 12 | 엔터프라이즈 | 사용량 분석 | Bobalytics 등 팀 대시보드 |
| 13 | 엔터프라이즈 | 레거시 현대화 | COBOL/Java 버전 업그레이드 |
| 14 | 도입 | 배포 형태 | SaaS / 온프렘 / 에어갭 |
| 15 | 도입 | 가격 | 사용자당 비용, 사용량 단위 |

→ **12개 내외로 줄이는 작업이 1단계에 포함됨.** 15개 전부 넣으면 "한눈에" 라는 목적이 깨진다.

---

## 5. 파일 구조

배포되는 파일은 `public/` 안에만 둔다. 문서 파일이 배포에 섞여 들어가지 않게 하기 위함이며,
Cloudflare 설정에서도 이 폴더 하나만 가리키면 된다.

```
bob-benchmark/
├── public/                   # ← 배포 대상은 이 폴더뿐
│   ├── index.html            # 장표
│   ├── detail.html           # 상세 템플릿 (?f=slug)
│   └── assets/
│       ├── css/style.css     # 전체 스타일 (파일 1개)
│       ├── js/
│       │   ├── data.js       # 단일 데이터 소스
│       │   ├── table.js      # 장표 렌더
│       │   └── detail.js     # 상세 렌더
│       └── img/
│           ├── logo/         # bob.svg, claude.svg, codex.svg, cursor.svg
│           └── <slug>/       # plan-mode/bob.png, plan-mode/cursor.mp4 ...
├── wrangler.jsonc            # Cloudflare 배포 설정 (public/만 업로드)
├── PLAN.md
├── README.md                 # 자료 갱신 방법 (data.js 편집법, 이미지 추가법)
└── .gitignore
```

**미디어 파일명 규칙:** `assets/img/<feature-slug>/<tool-id>.<png|mp4>`
파일이 없으면 상세 페이지에 "이미지 준비 중" 점선 박스가 자동 표시되고, 나중에 규칙대로 파일만 넣으면 반영된다.

---

## 6. 디자인 방향

- IBM Carbon 느낌의 절제된 톤 (IBM Plex Sans 웹폰트 또는 시스템 폰트 폴백)
- Bob 열은 미묘한 배경 강조 — 눈에 띄되 "광고"처럼 보이지 않을 정도로
- 라이트/다크 모드 대응 (`prefers-color-scheme`)
- 반응형: 데스크톱 = 표 그대로 / 태블릿 이하 = 표 가로 스크롤(`overflow-x:auto`), 본문은 가로 스크롤 금지
- 외부 CDN 의존 없음 → 사내망·오프라인에서도 동작

---

## 7. 구현 단계 및 검증

**현재 진행 상황 (2026-07-28):** 3·4·5단계를 **가안 수준으로 먼저 구현 완료**.
대표 기능 5개(계획 모드 / 서브에이전트 / MCP / 멀티모델 라우팅 / 보안·거버넌스)만 넣어
장표와 상세 페이지가 실제로 어떻게 보이는지 확인할 수 있는 상태입니다.
남은 일은 1·2단계(기능 축 확정, 판정 검증)와 6단계(배포)입니다.

```
1. 기능 축 확정 (15 → 12개로 축소, 카테고리 확정)
   → 검증: 사용자 승인. 각 축이 "도구 간 차이가 실제로 존재하는가" 통과

2. 4개 도구 × 12개 기능 = 48셀 조사, data.js 작성
   → 검증: full/partial 셀 전부에 source URL 존재. 없으면 unknown 표기

3. index.html + table.js + style.css — 장표 렌더
   → 검증: 로컬 서버에서 1920px 화면에 표가 세로 스크롤 없이 들어감,
           기능명 클릭 시 detail.html?f=slug 로 이동

4. detail.html + detail.js — 상세 페이지 렌더
   → 검증: 12개 slug 모두 정상 렌더, 잘못된 slug는 안내 문구 + 장표 링크,
           미디어 파일이 없어도 레이아웃이 깨지지 않음

5. 반응형·다크모드·접근성 점검
   → 검증: 375/768/1440px에서 본문 가로 스크롤 없음, 표 헤더 sticky 동작,
           키보드 Tab으로 모든 기능 행 접근 및 Enter로 이동 가능

6. GitHub push + Cloudflare Pages 연결
   → 검증: 배포 URL에서 장표 → 상세 → 뒤로가기 왕복 정상 동작
```

---

## 8. 배포 (Cloudflare)

빌드 없는 정적 사이트이므로 설정이 단순하다. 두 경로 모두 열어둔다.

**Git 연동 (권장)**

1. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git
2. `JOOCHANN/bob-benchmark` 선택
3. 설정: **Framework preset = None / Build command = 비움 / Build output directory = `public`**
4. `main` 브랜치 push마다 자동 재배포

**wrangler**

`npx wrangler deploy` — `wrangler.jsonc`의 `assets.directory`가 `./public`을 가리킨다.
Worker 스크립트는 필요 없다. 정적 자산만으로 배포된다.

주의할 점 두 가지:

- 상세 페이지가 쿼리스트링(`?f=slug`) 방식이므로 SPA 라우팅 설정이나 `_redirects`가 필요 없다.
- 대시보드 업로더의 "This uploader currently only supports static assets" 문구는 오류가 아니라
  상시 표시되는 안내다. 이 프로젝트는 HTML/CSS/JS만 쓰므로 해당 업로더의 지원 범위 안에 있다.
  동적 애플리케이션으로 전환할 이유가 되지 않는다.

---

## 9. 확인이 필요한 사항

계획을 실행하기 전에 사용자 확답이 필요한 것:

1. **비교 대상 확정** — "Codex"는 OpenAI Codex CLI/클라우드 에이전트를 말하는 게 맞는지? (같은 이름의 구 모델과 구분 필요)
2. **Bob 버전 기준** — 사내에서 쓰는 Bob이 공개 GA 버전과 동일한지, 사내 전용 기능이 따로 있는지
3. **공개 여부** — 이 페이지가 사내 전용인지 공개용인지. 공개용이면 IBM 로고·상표 사용과 경쟁사 비교 표현에 대한 검토가 필요함
4. **기능 축 12개** — 4장의 초안 중 무엇을 빼고 무엇을 넣을지

1~3은 답이 없어도 작업을 시작할 수 있으나, 4는 확정 후 진행하는 편이 재작업이 적다.

---

## 조사 출처 (Bob 관련, 2026-07-28 기준)

- [IBM Bob 공식 문서](https://bob.ibm.com/docs/ide) — Agent/Ask/Plan 모드, 서브에이전트, MCP, Bob Shell, Bobalytics
- [IBM 뉴스룸 발표](https://newsroom.ibm.com/2026-04-28-introducing-ibm-bob-ai-development-partner-that-takes-enterprises-from-ai-assisted-coding-to-production-ready-software) — 2026-04-29 GA, 멀티모델 라우팅, 보안·거버넌스, 레거시 현대화
- [IBM AI coding agent 제품 페이지](https://www.ibm.com/products/ai-coding-agent)
- [DevOps.com](https://devops.com/ibm-bob-takes-ai-coding-assistants-to-the-next-level/) — BobShell 자기문서화
- [IT Jungle](https://www.itjungle.com/2025/12/08/guru-a-first-look-at-bob-the-ibm-i-assistant-thats-closer-than-you-think/) — Bob-IDE가 VS Code 포크라는 점, 요금제
