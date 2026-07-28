# bob-benchmark

IBM Bob과 Claude Code, OpenAI Codex, Cursor를 기능별로 비교하는 사내 검토용 페이지.

메인 화면은 기능 × 도구 비교 장표 한 장이고, 표에서 기능을 누르면 그 기능에 대해 네 도구가
각각 어떤 역량을 갖는지 화면과 설명으로 비교한 상세 페이지로 이동합니다.

> **현재 상태: 가안.** 대표 기능 5개만 넣었고, 판정 결과는 검증 전입니다.

## 폴더 구조

```
public/                    ← 배포되는 파일은 전부 여기
├── index.html             장표 (메인)
├── detail.html            기능별 상세 비교 (?f=<slug>)
└── assets/
    ├── css/style.css
    ├── js/data.js         ← 비교 데이터 단일 소스
    ├── js/table.js        장표 렌더
    ├── js/detail.js       상세 렌더
    └── img/<slug>/        화면 캡처 / 영상
wrangler.jsonc             Cloudflare 배포 설정
PLAN.md                    전체 계획과 배포 방법
```

빌드 도구가 없습니다. 파일을 고치고 새로고침하면 끝입니다.

## 기능 추가하기

[public/assets/js/data.js](public/assets/js/data.js)의 `FEATURES` 배열에 객체를 하나 추가하면
장표와 상세 페이지에 동시에 반영됩니다. HTML은 건드리지 않습니다.

```js
{
  slug: 'audit-trail',        // URL에 쓰이는 값. 영문 소문자와 하이픈.
  category: '엔터프라이즈',     // 같은 값끼리 표에서 묶입니다.
  name: '감사 추적',
  summary: '장표에 한 줄로 보일 설명',
  why: '이 기능을 왜 비교하는지 (상세 페이지 상단)',
  tools: {
    bob: {
      level: 'full',                                  // full | partial | none | unknown
      label: '표에 보일 짧은 요약',
      bullets: ['근거 한 줄', '근거 한 줄'],
      media: { src: 'assets/img/audit-trail/bob.png', caption: '설명' },
      source: { text: '출처 이름', url: 'https://...' },
    },
    claude: { /* 동일 */ }, codex: { /* 동일 */ }, cursor: { /* 동일 */ },
  },
  verdict: '상세 페이지 하단 정리',
}
```

**화면 / 영상**은 `public/assets/img/<slug>/<도구 id>.<png|mp4>`에 넣으면 상세 페이지의
"준비 중" 자리 표시가 자동으로 바뀝니다. 도구 id는 `bob`, `claude`, `codex`, `cursor`입니다.

**판정 규칙 두 가지**

- `full`·`partial`로 적은 칸에는 `source`를 반드시 넣습니다. 근거를 못 찾으면 `unknown`으로 둡니다.
- Bob에 유리하게 임의로 판정하지 않습니다. 타 도구가 더 나은 항목은 그대로 표기합니다.
