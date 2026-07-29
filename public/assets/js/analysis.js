/* 강점·약점 분석 페이지 렌더 — analysis.html */

(function () {
  'use strict';

  const content = document.getElementById('content');
  document.getElementById('foot-date').textContent = META.checkedAt;

  renderSideNav(document.getElementById('navlist'), 'analysis');
  setupNavToggle('Bob의 강점과 약점');

  /* --- 근거 행 --------------------------------------------------------
     분석 항목마다 표의 어느 행에서 나온 판단인지 보여준다.
     Bob 판정을 함께 찍어 총평과 표가 어긋나면 바로 보이게 한다. */

  function evidenceList(slugs) {
    const box = el('div', 'ev-list');
    box.appendChild(el('span', 'ev-label', '근거가 된 항목'));

    slugs.forEach(function (slug) {
      const feature = FEATURES.find(function (f) {
        return f.slug === slug;
      });
      if (!feature) return;

      const cell = feature.tools.bob || { level: 'unknown' };
      const lv = LEVELS[cell.level] || LEVELS.unknown;

      const link = el('a', 'ev');
      link.href = 'detail.html?f=' + encodeURIComponent(slug);
      link.appendChild(el('span', 'ev-name', feature.name));

      const badge = el('span', 'ev-badge');
      badge.appendChild(levelIndicator(cell.level));
      badge.appendChild(el('span', null, 'Bob ' + lv.label));
      link.appendChild(badge);

      box.appendChild(link);
    });

    return box;
  }

  /* --- 분석 항목 카드 --------------------------------------------------- */

  function renderItem(item, kind, index) {
    const article = el('article', 'sw-item sw-' + kind);

    const head = el('div', 'sw-item-head');
    head.appendChild(el('span', 'sw-num', String(index + 1)));
    head.appendChild(el('h3', null, item.title));
    article.appendChild(head);

    article.appendChild(el('p', 'sw-summary', item.summary));
    article.appendChild(evidenceList(item.evidence));

    const body = el('div', 'sw-body');
    item.body.forEach(function (para) {
      body.appendChild(el('p', null, para));
    });
    article.appendChild(body);

    if (item.caveat) {
      const note = el('div', 'sw-caveat');
      note.appendChild(el('span', 'sw-caveat-label', kind === 'pro' ? '유보' : '단서'));
      note.appendChild(el('p', null, item.caveat));
      article.appendChild(note);
    }

    return article;
  }

  function renderGroup(titleText, desc, items, kind) {
    const section = el('section', 'detail-section');
    section.appendChild(el('h2', 'section-title', titleText));
    if (desc) section.appendChild(el('p', 'sw-group-desc', desc));

    const list = el('div', 'sw-list');
    items.forEach(function (item, i) {
      list.appendChild(renderItem(item, kind, i));
    });
    section.appendChild(list);
    content.appendChild(section);
  }

  /* --- 조건별 판단 ------------------------------------------------------ */

  function renderConditions() {
    const c = ANALYSIS.conditions;
    const section = el('section', 'detail-section');
    section.appendChild(el('h2', 'section-title', c.title));
    section.appendChild(el('p', 'sw-group-desc', c.lead));

    const list = el('div', 'cond-list');
    c.rows.forEach(function (row) {
      const item = el('div', 'cond cond-' + row.kind);
      item.appendChild(el('p', 'cond-when', row.when));
      item.appendChild(el('p', 'cond-then', row.then));
      list.appendChild(item);
    });
    section.appendChild(list);
    content.appendChild(section);
  }

  /* --- 머리말 ---------------------------------------------------------- */

  function renderHeader() {
    const header = el('header', 'detail-header');

    const counts = { full: 0, partial: 0, none: 0, unknown: 0 };
    FEATURES.forEach(function (f) {
      counts[(f.tools.bob || {}).level || 'unknown'] += 1;
    });

    const meta = el('div', 'detail-meta');
    meta.appendChild(el('span', 'detail-category', '비교표 ' + FEATURES.length + '개 항목 기반'));
    header.appendChild(meta);

    header.appendChild(el('h1', 'detail-title', 'Bob의 강점과 약점'));
    header.appendChild(
      el(
        'p',
        'detail-summary',
        '23개 항목에서 Bob은 지원 ' +
          counts.full +
          ' · 부분 ' +
          counts.partial +
          ' · 확인 필요 ' +
          counts.unknown +
          '입니다. 단독으로 앞서는 항목이 ' +
          soleLead() +
          '개, 뒤지는 항목이 ' +
          behind() +
          '개입니다.'
      )
    );

    const why = el('section', 'detail-why');
    why.appendChild(el('h2', null, '이 페이지를 읽는 법'));
    why.appendChild(el('p', null, ANALYSIS.intro));
    header.appendChild(why);

    content.appendChild(header);
  }

  /* 표의 판정으로 직접 센다. 총평과 표가 어긋나지 않게 하려는 장치다. */
  const RANK = { full: 3, partial: 2, unknown: 1, none: 0 };
  const OTHERS = ['claude', 'codex', 'cursor'];

  function rank(feature, toolId) {
    return RANK[(feature.tools[toolId] || {}).level] || 0;
  }

  function soleLead() {
    return FEATURES.filter(function (f) {
      return OTHERS.every(function (t) {
        return rank(f, t) < rank(f, 'bob');
      });
    }).length;
  }

  function behind() {
    return FEATURES.filter(function (f) {
      return OTHERS.some(function (t) {
        return rank(f, t) > rank(f, 'bob');
      });
    }).length;
  }

  renderHeader();
  renderGroup(
    '강점',
    '표에서 Bob이 앞서거나 대응물이 없는 항목에서 나온 것들이다.',
    ANALYSIS.strengths,
    'pro'
  );
  renderGroup(
    '약점',
    '표에서 Bob이 뒤지거나 근거를 확인하지 못한 항목에서 나온 것들이다.',
    ANALYSIS.weaknesses,
    'con'
  );
  renderConditions();
})();
