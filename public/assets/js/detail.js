/* 상세 비교 페이지 렌더 — detail.html?f=<slug> */

(function () {
  'use strict';

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  const slug = new URLSearchParams(window.location.search).get('f');
  const index = FEATURES.findIndex(function (f) {
    return f.slug === slug;
  });
  const feature = FEATURES[index];
  const content = document.getElementById('content');

  document.getElementById('foot-date').textContent = META.checkedAt;

  if (!feature) {
    const box = el('div', 'wrap');
    const empty = el('div', 'empty-state');
    empty.appendChild(el('h1', 'detail-title', '기능을 찾을 수 없습니다'));
    empty.appendChild(
      el('p', null, '주소의 기능 값이 올바르지 않습니다. 장표에서 다시 선택해 주세요.')
    );
    const back = el('p');
    const link = el('a', null, '장표로 돌아가기 →');
    link.href = 'index.html';
    back.appendChild(link);
    empty.appendChild(back);
    box.appendChild(empty);
    content.appendChild(box);
    document.title = '기능을 찾을 수 없습니다 — IBM Bob 비교 장표';
    return;
  }

  document.title = feature.name + ' — IBM Bob 비교 장표';

  /* --- 이전 / 다음 --------------------------------------------------- */

  function renderPager() {
    const pager = document.getElementById('pager');
    const prev = FEATURES[index - 1];
    const next = FEATURES[index + 1];

    function link(feat, label) {
      const a = el('a', null, label);
      if (feat) {
        a.href = 'detail.html?f=' + encodeURIComponent(feat.slug);
        a.title = feat.name;
      } else {
        a.setAttribute('aria-disabled', 'true');
        a.href = '#';
      }
      return a;
    }

    pager.appendChild(link(prev, '◀ 이전'));
    pager.appendChild(el('span', null, index + 1 + ' / ' + FEATURES.length));
    pager.appendChild(link(next, '다음 ▶'));
  }

  /* --- 머리말 ---------------------------------------------------------- */

  function renderHeader() {
    const header = el('header', 'detail-header');
    const wrap = el('div', 'wrap');

    wrap.appendChild(el('p', 'eyebrow', feature.category));
    wrap.appendChild(el('h1', 'detail-title', feature.name));
    wrap.appendChild(el('p', 'detail-summary', feature.summary));

    if (feature.why) {
      const why = el('section', 'detail-why');
      why.appendChild(el('h2', null, '왜 보는가'));
      why.appendChild(el('p', null, feature.why));
      why.querySelector('p').style.margin = '0';
      wrap.appendChild(why);
    }

    header.appendChild(wrap);
    content.appendChild(header);
  }

  /* --- 미디어 슬롯 ------------------------------------------------------ */

  function placeholder(path) {
    const box = el('div', 'media-placeholder');
    box.appendChild(el('p', 'ph-title', '화면 / 영상 준비 중'));
    if (path) {
      box.appendChild(el('p', 'ph-path', path));
      box.appendChild(el('p', null, '이 경로에 파일을 넣으면 자동으로 표시됩니다.'));
      box.lastChild.style.fontSize = '12px';
      box.lastChild.style.margin = '0';
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
    const names = el('div');
    names.appendChild(el('span', 'tool-name', tool.name));
    names.appendChild(el('span', 'tool-vendor', tool.vendor));
    head.appendChild(names);
    head.appendChild(el('span', 'spacer'));

    const badge = el('span', 'badge ' + lv.className);
    badge.appendChild(el('span', null, lv.symbol));
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
    const section = el('section');
    const wrap = el('div', 'wrap');
    wrap.appendChild(el('h2', 'section-title', '도구별 비교'));

    const grid = el('div', 'cards');
    TOOLS.forEach(function (tool) {
      grid.appendChild(renderCard(tool));
    });
    wrap.appendChild(grid);

    section.appendChild(wrap);
    content.appendChild(section);
  }

  /* --- 정리 ------------------------------------------------------------- */

  function renderVerdict() {
    if (!feature.verdict) return;
    const section = el('section');
    const wrap = el('div', 'wrap');
    wrap.appendChild(el('h2', 'section-title', '정리'));
    wrap.appendChild(el('p', 'verdict', feature.verdict));
    section.appendChild(wrap);
    content.appendChild(section);
  }

  renderPager();
  renderHeader();
  renderCards();
  renderVerdict();
})();
