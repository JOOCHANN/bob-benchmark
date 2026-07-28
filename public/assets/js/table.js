/* 장표(index.html) 렌더 — data.js의 TOOLS / FEATURES / LEVELS만 참조한다. */

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

  /* --- 상단 메타 정보 --------------------------------------------------- */

  function renderMeta() {
    document.getElementById('meta-date').textContent = '조사 시점 ' + META.checkedAt;
    document.getElementById('meta-count').textContent = FEATURES.length;

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
    first.appendChild(el('span', 'head-label', '기능'));
    tr.appendChild(first);

    TOOLS.forEach(function (tool) {
      const th = el('th', 'col-tool' + (tool.highlight ? ' is-bob' : ''));
      th.scope = 'col';

      const head = el('div', 'tool-head' + (tool.highlight ? ' is-bob' : ''));
      head.appendChild(el('span', 'tool-mark', tool.mark));

      const names = el('div');
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
    const tr = el('tr', 'feat-row');

    // 기능 이름 칸
    const td = el('td', 'feat-cell');
    const top = el('div', 'feat-top');

    const link = el('a', 'feat-name', feature.name);
    link.href = href;
    top.appendChild(link);
    top.appendChild(el('span', 'feat-go', '상세 비교 →'));

    td.appendChild(top);
    td.appendChild(el('p', 'feat-summary', feature.summary));
    tr.appendChild(td);

    // 도구별 판정 칸
    TOOLS.forEach(function (tool) {
      const cell = feature.tools[tool.id] || { level: 'unknown', label: '확인 필요' };
      const lv = levelOf(cell.level);

      const mark = el('td', 'mark-cell' + (tool.highlight ? ' is-bob' : ''));
      const box = el('div', 'mark');
      box.appendChild(el('span', 'dot ' + lv.className, lv.symbol));

      const text = el('div', 'mark-text');
      text.appendChild(el('span', 'mark-label', lv.label));
      if (cell.label) text.appendChild(el('span', 'mark-sub', cell.label));
      box.appendChild(text);

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
        const catCell = el('td', null, currentCategory);
        catCell.colSpan = colspan;
        catRow.appendChild(catCell);
        tbody.appendChild(catRow);

        table.appendChild(tbody);
      }
      tbody.appendChild(renderFeatureRow(feature));
    });
  }

  renderMeta();
  const table = document.getElementById('matrix');
  renderHead(table);
  renderBody(table);
})();
