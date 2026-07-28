# bob-benchmark

IBM Bob과 Claude Code, OpenAI Codex, Cursor를 기능별로 비교하는 사내 검토용 장표.

> **현재 상태: 가안.** 구조와 화면을 확인하기 위해 대표 기능 5개만 넣었고, 판정 결과는 검증 전입니다.

## 로컬에서 보기

```bash
python3 -m http.server 8000 --directory public
# http://localhost:8000
```

`file://`로 직접 열면 브라우저 보안 정책 때문에 일부 동작이 막힐 수 있으니 로컬 서버를 쓰세요.

## 구조

배포되는 파일은 전부 `public/` 안에 있습니다. 그 바깥의 문서 파일은 배포에 포함되지 않습니다.

```
public/
├── index.html          장표 (메인)
├── detail.html         기능별 상세 비교 (?f=<slug>)
└── assets/
    ├── css/style.css
    ├── js/data.js      ← 비교 데이터 단일 소스
    ├── js/table.js     장표 렌더
    ├── js/detail.js    상세 렌더
    └── img/            화면 캡처 / 영상
wrangler.jsonc          Cloudflare 배포 설정
```

빌드 도구가 없습니다. 파일을 고치고 새로고침하면 끝입니다.

## 기능 추가하기

[assets/js/data.js](assets/js/data.js)의 `FEATURES` 배열에 객체를 하나 추가하면 장표와 상세
페이지에 동시에 반영됩니다. HTML은 건드리지 않습니다.

```js
{
  slug: 'audit-trail',          // URL에 쓰이는 값. 영문 소문자와 하이픈.
  category: '엔터프라이즈',       // 같은 값끼리 표에서 묶입니다.
  name: '감사 추적',
  summary: '장표에 한 줄로 보일 설명',
  why: '이 기능을 왜 비교하는지 (상세 페이지 상단)',
  tools: {
    bob:    { level: 'full', label: '짧은 요약', bullets: ['근거'], media: {...}, source: {...} },
    claude: { ... }, codex: { ... }, cursor: { ... },
  },
  verdict: '상세 페이지 하단 정리',
}
```

`level` 값은 네 가지입니다.

| 값 | 의미 |
|---|---|
| `full` | 제품에 내장된 정식 기능 |
| `partial` | 유사 기능이 있으나 범위나 방식이 제한적 |
| `none` | 해당 기능 없음 |
| `unknown` | 근거를 확인하지 못함 |

**작성 규칙**

- `full`과 `partial`로 판정한 칸에는 `source`(출처 URL)를 반드시 넣습니다. 근거를 못 찾으면
  추측으로 채우지 말고 `unknown`으로 둡니다.
- Bob에 유리하게 임의로 판정하지 않습니다. 타 도구가 더 나은 항목은 그대로 표기합니다.
  판단 자료의 가치는 정확성에서 나옵니다.
- 도구들의 기능은 빠르게 바뀝니다. 갱신 시 `data.js`의 `META.checkedAt` 날짜를 함께 고칩니다.

## 화면 / 영상 추가하기

파일명 규칙: `public/assets/img/<기능 slug>/<도구 id>.<png|mp4>`

```
public/assets/img/plan-mode/bob.png
public/assets/img/plan-mode/cursor.mp4
```

`data.js`에 적는 경로는 `public/`을 뺀 `assets/img/plan-mode/bob.png` 형태입니다.

규칙대로 파일을 넣으면 상세 페이지의 "준비 중" 자리 표시가 자동으로 실제 화면으로 바뀝니다.
도구 id는 `bob`, `claude`, `codex`, `cursor`입니다.

## 배포 (Cloudflare)

빌드 단계가 없습니다. 두 가지 방법 중 하나를 쓰면 됩니다.

### 방법 1 — Git 연동 (권장)

1. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git
2. `JOOCHANN/bob-benchmark` 선택
3. Framework preset **None** / Build command **비움** / Build output directory **`public`**

`main` 브랜치에 push하면 자동으로 재배포됩니다.

### 방법 2 — wrangler

```bash
npx wrangler login   # 최초 1회
npx wrangler deploy
```

[wrangler.jsonc](wrangler.jsonc)가 `public/`만 업로드하도록 지정하고 있습니다. Worker 코드는
필요 없습니다. 정적 자산만으로 배포됩니다.

> 대시보드의 드래그 앤 드롭 업로더에 뜨는
> "This uploader currently only supports static assets (HTML, CSS, and JS files)" 문구는
> 오류가 아니라 업로더에 항상 표시되는 안내입니다. 이 프로젝트는 HTML/CSS/JS만 쓰므로
> 해당 업로더로도 문제없이 올라갑니다. 단, 올릴 대상은 저장소 루트가 아니라 `public/` 폴더입니다.

## 남은 작업

- [ ] 비교 기능 축 확정 (현재 5개 → 12개 내외)
- [ ] 각 칸 판정 검증 및 출처 확보
- [ ] 도구 로고 이미지 교체 (현재는 이니셜 마크)
- [ ] 화면 캡처 / 데모 영상 촬영
