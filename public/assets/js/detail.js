/* 상세 비교 페이지 렌더 — detail.html?f=<slug> */

(function () {
  'use strict';

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function isParity(feature) {
    const levels = TOOLS.map(function (t) {
      return (feature.tools[t.id] || {}).level;
    });
    return levels.every(function (lv) {
      return lv === levels[0];
    });
  }

  const slug = new URLSearchParams(window.location.search).get('f');
  const index = FEATURES.findIndex(function (f) {
    return f.slug === slug;
  });
  const feature = FEATURES[index];
  const content = document.getElementById('content');

  document.getElementById('foot-date').textContent = META.checkedAt;

  /* --- 좌측 항목 목록 --------------------------------------------------
     카테고리별로 묶어 어느 항목이든 한 번에 이동할 수 있게 한다. */

  function renderSideNav() {
    const nav = document.getElementById('navlist');
    let currentCategory = null;
    let list = null;

    FEATURES.forEach(function (item) {
      if (item.category !== currentCategory) {
        currentCategory = item.category;

        const group = el('div', 'nav-group');
        const title = el('p', 'nav-group-title', currentCategory);
        group.appendChild(title);

        const question = CATEGORIES[currentCategory];
        if (question) group.appendChild(el('p', 'nav-group-question', question));

        list = el('ul', 'nav-list');
        group.appendChild(list);
        nav.appendChild(group);
      }

      const li = el('li');
      const active = item.slug === slug;
      const link = el('a', 'nav-item' + (active ? ' is-active' : ''));
      link.href = 'detail.html?f=' + encodeURIComponent(item.slug);
      link.appendChild(el('span', 'nav-item-name', item.name));
      if (isParity(item)) link.appendChild(el('span', 'nav-item-tag', '동일'));
      if (active) link.setAttribute('aria-current', 'page');
      li.appendChild(link);
      list.appendChild(li);
    });
  }

  /** 좁은 화면에서는 목록을 접어두고 버튼으로 연다. */
  function setupToggle() {
    const aside = document.querySelector('.sidenav');
    const button = document.querySelector('.sidenav-toggle');
    const current = document.getElementById('toggle-current');

    current.textContent = feature ? feature.name : '항목 목록';

    button.addEventListener('click', function () {
      const open = aside.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(open));
    });
  }

  /* --- 없는 항목 -------------------------------------------------------- */

  if (!feature) {
    renderSideNav();
    setupToggle();
    document.title = '항목을 찾을 수 없습니다 — AI 코딩 도구 역량 비교';

    const empty = el('div', 'empty-state');
    empty.appendChild(el('h1', 'detail-title', '항목을 찾을 수 없습니다'));
    empty.appendChild(el('p', null, '주소의 항목 값이 올바르지 않습니다. 왼쪽 목록에서 선택해 주세요.'));
    content.appendChild(empty);
    return;
  }

  document.title = feature.name + ' — AI 코딩 도구 역량 비교';

  /* --- 머리말 ---------------------------------------------------------- */

  function renderHeader() {
    const header = el('header', 'detail-header');

    const meta = el('div', 'detail-meta');
    meta.appendChild(el('span', 'detail-category', feature.category));
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
    if (path) {
      box.appendChild(el('p', 'ph-path', path));
      box.appendChild(el('p', 'ph-hint', '이 경로에 파일을 넣으면 자동으로 표시됩니다.'));
    }
    return box;
  }

  function renderMedia(card, tool, cell) {
    if (!cell.media || !cell.media.src) {
      card.appendChild(placeholder(null));
      return;
    }

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
    head.appendChild(el('span', 'tool-mark', tool.mark));
    const names = el('div', 'tool-names');
    names.appendChild(el('span', 'tool-name', tool.name));
    names.appendChild(el('span', 'tool-vendor', tool.vendor));
    head.appendChild(names);
    head.appendChild(el('span', 'spacer'));

    const badge = el('span', 'badge ' + lv.className);
    badge.appendChild(el('span', 'badge-dot', lv.symbol));
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
    if (cell.source) {
      foot.appendChild(el('span', null, '출처 '));
      const a = el('a', null, cell.source.text + ' ↗');
      a.href = cell.source.url;
      a.target = '_blank';
      a.rel = 'noopener';
      foot.appendChild(a);
    } else {
      foot.textContent = '출처 미확인 — 검증 필요';
    }
    card.appendChild(foot);

    return card;
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

  function renderVerdict() {
    if (!feature.verdict) return;
    const section = el('section', 'detail-section');
    section.appendChild(el('h2', 'section-title', '정리'));
    section.appendChild(el('p', 'verdict', feature.verdict));
    content.appendChild(section);
  }

  renderSideNav();
  setupToggle();
  renderHeader();
  renderCards();
  renderVerdict();
})();
