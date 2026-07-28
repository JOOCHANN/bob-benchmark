/* 장표(index.html) 렌더 — data.js만 참조한다. */

(function () {
  'use strict';

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function levelOf(key) {
    return LEVELS[key] || LEVELS.unknown;
  }

  /** 네 도구의 판정이 모두 같으면 변별력이 없는 항목이다. */
  function isParity(feature) {
    const levels = TOOLS.map(function (t) {
      return (feature.tools[t.id] || {}).level;
    });
    return levels.every(function (lv) {
      return lv === levels[0];
    });
  }

  /* --- 상단 지표 -------------------------------------------------------- */

  function renderStats() {
    const differentiating = FEATURES.filter(function (f) {
      return !isParity(f);
    }).length;

    const rows = [
      ['비교 항목', FEATURES.length + '개'],
      ['변별력 있는 항목', differentiating + '개'],
      ['조사 시점', META.checkedAt],
    ];

    const block = document.getElementById('stat-block');
    rows.forEach(function (row) {
      const item = el('div', 'stat');
      item.appendChild(el('dt', null, row[0]));
      item.appendChild(el('dd', null, row[1]));
      block.appendChild(item);
    });
  }

  /* --- 결론 카드 -------------------------------------------------------- */

  function renderTakeaways() {
    const grid = document.getElementById('takeaways');
    TAKEAWAYS.forEach(function (item) {
      const card = el('article', 'takeaway tk-' + item.kind);
      card.appendChild(el('h3', null, item.title));
      card.appendChild(el('p', null, item.body));
      grid.appendChild(card);
    });
  }

  /* --- 범례 ------------------------------------------------------------- */

  function renderLegend() {
    const legend = document.getElementById('legend');
    ['full', 'partial', 'none', 'unknown'].forEach(function (key) {
      const lv = LEVELS[key];
      const item = el('span', 'legend-item');
      item.appendChild(el('span', 'dot ' + lv.className, lv.symbol));
      item.appendChild(el('span', null, lv.label));
      legend.appendChild(item);
    });
  }

  /* --- 표 헤더 ---------------------------------------------------------- */

  function renderHead(table) {
    const thead = el('thead');
    const tr = el('tr');

    const first = el('th', 'col-feature');
    first.scope = 'col';
    first.appendChild(el('span', 'head-label', '항목'));
    tr.appendChild(first);

    TOOLS.forEach(function (tool) {
      const th = el('th', 'col-tool' + (tool.highlight ? ' is-bob' : ''));
      th.scope = 'col';

      const head = el('div', 'tool-head' + (tool.highlight ? ' is-bob' : ''));
      head.appendChild(el('span', 'tool-mark', tool.mark));

      const names = el('div', 'tool-names');
      names.appendChild(el('span', 'tool-name', tool.name));
      names.appendChild(el('span', 'tool-vendor', tool.vendor));
      head.appendChild(names);

      th.appendChild(head);
      tr.appendChild(th);
    });

    thead.appendChild(tr);
    table.appendChild(thead);
  }

  /* --- 기능 행 ---------------------------------------------------------- */

  function renderFeatureRow(feature) {
    const href = 'detail.html?f=' + encodeURIComponent(feature.slug);
    const parity = isParity(feature);
    const tr = el('tr', 'feat-row' + (parity ? ' is-parity' : ''));

    const td = el('td', 'feat-cell');
    const top = el('div', 'feat-top');

    const link = el('a', 'feat-name', feature.name);
    link.href = href;
    top.appendChild(link);
    if (parity) top.appendChild(el('span', 'chip chip-parity', '동일'));
    top.appendChild(el('span', 'feat-go', '상세 →'));

    td.appendChild(top);
    td.appendChild(el('p', 'feat-summary', feature.summary));
    tr.appendChild(td);

    TOOLS.forEach(function (tool) {
      const cell = feature.tools[tool.id] || { level: 'unknown' };
      const lv = levelOf(cell.level);

      const mark = el('td', 'mark-cell' + (tool.highlight ? ' is-bob' : ''));
      const box = el('div', 'mark');

      const dot = el('span', 'dot ' + lv.className, lv.symbol);
      dot.setAttribute('aria-hidden', 'true');
      box.appendChild(dot);

      // 기호만으로 판별하지 않도록 판정값을 텍스트로도 남긴다.
      box.appendChild(el('span', 'sr-only', lv.label + '. '));
      box.appendChild(el('span', 'mark-note', cell.label || lv.label));

      mark.appendChild(box);
      tr.appendChild(mark);
    });

    // 행 전체를 클릭 영역으로. 링크를 직접 누른 경우는 기본 동작에 맡긴다.
    tr.addEventListener('click', function (event) {
      if (event.target.closest('a')) return;
      window.location.href = href;
    });

    return tr;
  }

  /* --- 본문 ------------------------------------------------------------- */

  function renderBody(table) {
    const colspan = TOOLS.length + 1;
    let currentCategory = null;
    let tbody = null;

    FEATURES.forEach(function (feature) {
      if (feature.category !== currentCategory) {
        currentCategory = feature.category;
        tbody = el('tbody');

        const catRow = el('tr', 'cat-row');
        const catCell = el('td');
        catCell.colSpan = colspan;
        catCell.appendChild(el('span', 'cat-name', currentCategory));
        const question = CATEGORIES[currentCategory];
        if (question) catCell.appendChild(el('span', 'cat-question', question));
        catRow.appendChild(catCell);
        tbody.appendChild(catRow);

        table.appendChild(tbody);
      }
      tbody.appendChild(renderFeatureRow(feature));
    });
  }

  renderStats();
  renderTakeaways();
  renderLegend();
  const table = document.getElementById('matrix');
  renderHead(table);
  renderBody(table);
})();
