/* 상세 비교 페이지 렌더 — detail.html?f=<slug> */

(function () {
  'use strict';

  const slug = new URLSearchParams(window.location.search).get('f');
  const index = FEATURES.findIndex(function (f) {
    return f.slug === slug;
  });
  const feature = FEATURES[index];
  const content = document.getElementById('content');

  const nav = document.getElementById('navlist');

  function setFootDate(date) {
    document.getElementById('foot-date').textContent = date;
  }

  /* --- 없는 항목 -------------------------------------------------------- */

  if (!feature) {
    setFootDate(META.checkedAt);
    renderSideNav(nav, null);
    setupNavToggle('항목 목록');
    document.title = '항목을 찾을 수 없습니다 — AI 코딩 도구 역량 비교';

    const empty = el('div', 'empty-state');
    empty.appendChild(el('h1', 'detail-title', '항목을 찾을 수 없습니다'));
    empty.appendChild(el('p', null, '주소의 항목 값이 올바르지 않습니다. 왼쪽 목록에서 선택해 주세요.'));
    content.appendChild(empty);
    return;
  }

  function itemDate() {
    return feature.updatedAt || META.checkedAt;
  }

  function attachDetail(extra) {
    if (!extra) return;
    if (extra.updatedAt) feature.updatedAt = extra.updatedAt;
    if (extra.why) feature.why = extra.why;
    if (extra.verdict) feature.verdict = extra.verdict;
    if (!extra.tools) return;
    TOOLS.forEach(function (t) {
      const more = extra.tools[t.id];
      if (!more) return;
      const cell = feature.tools[t.id] || (feature.tools[t.id] = { level: 'unknown' });
      if (more.bullets) cell.bullets = more.bullets;
      if (more.media !== undefined) cell.media = more.media;
      if (more.source !== undefined) cell.source = more.source;
    });
  }

  /* --- 머리말 ---------------------------------------------------------- */

  function renderHeader() {
    const header = el('header', 'detail-header');

    const meta = el('div', 'detail-meta');
    meta.appendChild(el('span', 'detail-category', feature.category));
    meta.appendChild(el('span', 'detail-updated', itemDate() + ' 수정'));
    if (isParity(feature)) meta.appendChild(el('span', 'chip chip-parity', '네 도구 동일'));
    header.appendChild(meta);

    header.appendChild(el('h1', 'detail-title', feature.name));
    header.appendChild(el('p', 'detail-summary', feature.summary));

    if (feature.why) {
      const why = el('section', 'detail-why');
      why.appendChild(el('h2', null, '왜 보는가'));
      why.appendChild(el('p', null, feature.why));
      header.appendChild(why);
    }

    content.appendChild(header);
  }

  /* --- 미디어 슬롯 ------------------------------------------------------ */

  function placeholder(path) {
    const box = el('div', 'media-placeholder');
    box.appendChild(el('p', 'ph-title', '화면 / 영상 준비 중'));
    if (path) box.appendChild(el('p', 'ph-path', path));
    return box;
  }

  function renderMedia(card, tool, cell) {
    if (!cell.media || !cell.media.src) return;

    const src = cell.media.src;
    const isVideo = /\.(mp4|webm)$/i.test(src);
    const figure = el('figure', 'media');

    const node = document.createElement(isVideo ? 'video' : 'img');
    node.src = src;
    if (isVideo) {
      node.controls = true;
      node.muted = true;
      node.playsInline = true;
    } else {
      node.alt = cell.media.alt || tool.name + '의 ' + feature.name + ' 화면';
      node.loading = 'lazy';
    }

    // 파일이 아직 없으면 자리 표시로 대체한다.
    node.addEventListener('error', function () {
      figure.replaceWith(placeholder(src));
    });

    figure.appendChild(node);
    if (cell.media.caption) figure.appendChild(el('figcaption', null, cell.media.caption));
    card.appendChild(figure);
  }

  /* --- 도구별 카드 ------------------------------------------------------ */

  function renderCard(tool) {
    const cell = feature.tools[tool.id] || { level: 'unknown' };
    const lv = LEVELS[cell.level] || LEVELS.unknown;

    const card = el('article', 'card' + (tool.highlight ? ' is-bob' : ''));

    const head = el('div', 'card-head');
    head.appendChild(toolIdentity(tool));
    head.appendChild(el('span', 'spacer'));

    const badge = el('span', 'badge ' + lv.className);
    badge.appendChild(levelIndicator(cell.level));
    badge.appendChild(el('span', null, lv.label));
    head.appendChild(badge);
    card.appendChild(head);

    renderMedia(card, tool, cell);

    const body = el('div', 'card-body');
    const list = el('ul');
    (cell.bullets || ['내용 준비 중']).forEach(function (line) {
      list.appendChild(el('li', null, line));
    });
    body.appendChild(list);
    card.appendChild(body);

    const foot = el('div', 'card-foot');
    renderSources(foot, cell);
    card.appendChild(foot);

    return card;
  }

  function sourceList(cell) {
    if (!cell.source) return [];
    return Array.isArray(cell.source) ? cell.source : [cell.source];
  }

  function renderSources(foot, cell) {
    const list = sourceList(cell).filter(Boolean);
    if (!list.length) {
      foot.textContent = '출처 미확인 — 검증 필요';
      return;
    }

    foot.appendChild(el('span', 'src-label', '출처'));
    list.forEach(function (src) {
      if (src.url) {
        const a = el('a', 'src-link', src.text + ' ↗');
        a.href = src.url;
        a.target = '_blank';
        a.rel = 'noopener';
        foot.appendChild(a);
      } else {
        foot.appendChild(el('span', 'src-link', src.text));
      }
    });
  }

  function renderCards() {
    const section = el('section', 'detail-section');
    section.appendChild(el('h2', 'section-title', '도구별 비교'));

    const grid = el('div', 'cards');
    TOOLS.forEach(function (tool) {
      grid.appendChild(renderCard(tool));
    });
    section.appendChild(grid);
    content.appendChild(section);
  }

  /* --- 정리 ------------------------------------------------------------- */

  function isVerdictRow(item) {
    return item && typeof item === 'object' && item.label && item.text;
  }

  function renderVerdict() {
    if (!feature.verdict || (Array.isArray(feature.verdict) && !feature.verdict.length)) return;
    const section = el('section', 'detail-section detail-verdict');
    section.appendChild(el('h2', 'section-title', '정리'));
    if (Array.isArray(feature.verdict) && feature.verdict.every(isVerdictRow)) {
      const board = el('dl', 'verdict-board');
      feature.verdict.forEach(function (row) {
        const item = el('div', 'verdict-item');
        item.appendChild(el('dt', 'verdict-label', row.label));
        item.appendChild(el('dd', 'verdict-text', row.text));
        board.appendChild(item);
      });
      section.appendChild(board);
    } else if (Array.isArray(feature.verdict)) {
      const list = el('ul', 'verdict-list');
      feature.verdict.forEach(function (line) {
        list.appendChild(el('li', null, line));
      });
      section.appendChild(list);
    } else {
      section.appendChild(el('p', 'verdict', feature.verdict));
    }
    content.appendChild(section);
  }

  function start() {
    attachDetail(FEATURES_DETAIL[feature.slug]);
    setFootDate(itemDate());
    document.title = feature.name + ' — AI 코딩 도구 역량 비교';
    renderSideNav(nav, slug);
    setupNavToggle(feature.name);
    renderHeader();
    renderCards();
    renderVerdict();
  }

  const script = document.createElement('script');
  script.src = 'assets/js/features/' + encodeURIComponent(feature.slug) + '.js';
  script.onload = start;
  script.onerror = start;
  document.head.appendChild(script);
})();
