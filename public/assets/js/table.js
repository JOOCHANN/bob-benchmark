/* 장표(index.html) 렌더 — data.js와 ui.js만 참조한다. */

(function () {
  'use strict';

  const table = document.getElementById('matrix');
  let filterOn = false;

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

  function renderTakeaways() {
    const grid = document.getElementById('takeaways');
    TAKEAWAYS.forEach(function (item) {
      const card = el('article', 'takeaway tk-' + item.kind);
      card.appendChild(el('h3', null, item.title));
      card.appendChild(el('p', null, item.body));
      grid.appendChild(card);
    });
  }

  function renderLegend() {
    const legend = document.getElementById('legend');
    ['full', 'partial', 'none', 'unknown'].forEach(function (key) {
      const item = el('span', 'legend-item');
      item.appendChild(levelIndicator(key));
      item.appendChild(el('span', null, LEVELS[key].label));
      legend.appendChild(item);
    });
  }

  /* --- 표 헤더 ---------------------------------------------------------- */

  function renderHead() {
    const thead = el('thead');
    const tr = el('tr');

    const first = el('th', 'col-feature');
    first.scope = 'col';
    first.appendChild(el('span', 'head-label', '항목'));
    tr.appendChild(first);

    TOOLS.forEach(function (tool) {
      const th = el('th', 'col-tool' + (tool.highlight ? ' is-bob' : ''));
      th.scope = 'col';
      const id = toolIdentity(tool);
      id.classList.add('tool-head');
      th.appendChild(id);
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
    tr.dataset.parity = String(parity);

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
      const lv = LEVELS[cell.level] || LEVELS.unknown;

      const mark = el('td', 'mark-cell' + (tool.highlight ? ' is-bob' : ''));
      const box = el('div', 'mark');
      box.appendChild(levelIndicator(cell.level));
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

  function renderBody() {
    let currentCategory = null;
    let tbody = null;

    FEATURES.forEach(function (feature) {
      if (feature.category !== currentCategory) {
        currentCategory = feature.category;
        tbody = el('tbody');

        const catRow = el('tr', 'cat-row');
        const catCell = el('td');
        catCell.colSpan = TOOLS.length + 1;
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

  /* --- 합계 행 ----------------------------------------------------------
     표를 끝까지 읽지 않는 사람을 위한 집계. 필터 상태에 따라 다시 센다. */

  function renderFoot() {
    const tfoot = el('tfoot');
    const tr = el('tr');

    const label = el('td', 'sum-label');
    label.appendChild(el('span', 'head-label', '‘지원’ 판정 수'));
    label.appendChild(el('p', 'sum-caveat', '항목별 중요도를 반영하지 않은 단순 집계입니다.'));
    tr.appendChild(label);

    TOOLS.forEach(function (tool) {
      const td = el('td', 'sum-cell' + (tool.highlight ? ' is-bob' : ''));
      td.dataset.tool = tool.id;
      tr.appendChild(td);
    });

    tfoot.appendChild(tr);
    table.appendChild(tfoot);
    updateFoot();
  }

  function updateFoot() {
    const scope = FEATURES.filter(function (f) {
      return !filterOn || !isParity(f);
    });

    TOOLS.forEach(function (tool) {
      const counts = { full: 0, partial: 0, none: 0, unknown: 0 };
      scope.forEach(function (f) {
        const key = (f.tools[tool.id] || {}).level || 'unknown';
        counts[key] = (counts[key] || 0) + 1;
      });

      const td = table.querySelector('tfoot td[data-tool="' + tool.id + '"]');
      td.textContent = '';

      const main = el('div', 'sum-main');
      main.appendChild(el('span', 'sum-count', String(counts.full)));
      main.appendChild(el('span', 'sum-unit', '/ ' + scope.length + '개 항목'));
      td.appendChild(main);

      const rest = [];
      if (counts.partial) rest.push('부분 ' + counts.partial);
      if (counts.none) rest.push('미지원 ' + counts.none);
      if (counts.unknown) rest.push('확인 필요 ' + counts.unknown);
      td.appendChild(el('div', 'sum-sub', rest.join(' · ') || ' '));
    });
  }

  /* --- 강점·약점 요약 ---------------------------------------------------
     상세는 analysis.html에 있고, 여기서는 제목과 한 줄 요약만 싣는다. */

  function renderAnalysisSummary() {
    document.getElementById('analysis-lead').textContent = ANALYSIS.boardLead;

    const grid = document.getElementById('analysis-summary');

    [
      { kind: 'pro', label: '강점', items: ANALYSIS.strengths },
      { kind: 'con', label: '약점', items: ANALYSIS.weaknesses },
    ].forEach(function (group) {
      const col = el('div', 'sw-col sw-' + group.kind);
      const head = el('p', 'sw-col-head');
      head.appendChild(el('span', 'sw-col-label', group.label));
      head.appendChild(el('span', 'sw-col-count', group.items.length + '개'));
      col.appendChild(head);

      const list = el('ul', 'sw-col-list');
      group.items.forEach(function (item) {
        const li = el('li');
        li.appendChild(el('span', 'sw-col-title', item.title));
        li.appendChild(el('span', 'sw-col-sub', item.summary));
        list.appendChild(li);
      });
      col.appendChild(list);
      grid.appendChild(col);
    });

    const total = ANALYSIS.strengths.length + ANALYSIS.weaknesses.length;
    document.getElementById('analysis-cta-sub').textContent =
      total + '개 항목의 근거와 유보 조건, 그리고 우리 조건별 판단까지';
  }

  /* --- 필터 ------------------------------------------------------------- */

  function applyFilter() {
    table.querySelectorAll('tbody').forEach(function (tbody) {
      let visible = 0;
      tbody.querySelectorAll('tr.feat-row').forEach(function (row) {
        const hide = filterOn && row.dataset.parity === 'true';
        row.hidden = hide;
        if (!hide) visible += 1;
      });
      tbody.hidden = visible === 0;
    });
    updateFoot();
  }

  function setupFilter() {
    const button = document.getElementById('filter-btn');
    button.addEventListener('click', function () {
      filterOn = !filterOn;
      button.setAttribute('aria-pressed', String(filterOn));
      button.classList.toggle('is-on', filterOn);
      applyFilter();
    });
  }

  renderStats();
  renderTakeaways();
  renderLegend();
  renderHead();
  renderBody();
  renderFoot();
  setupFilter();
  renderAnalysisSummary();
})();
