/* index.html과 detail.html이 함께 쓰는 렌더 헬퍼. */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

/** 네 도구의 판정이 모두 같으면 도구 선택의 근거가 되지 않는 항목이다. */
function isParity(feature) {
  const levels = TOOLS.map(function (t) {
    return (feature.tools[t.id] || {}).level;
  });
  return levels.every(function (lv) {
    return lv === levels[0];
  });
}

/**
 * 도구 식별 마크.
 * 공식 로고 파일(assets/img/logo/<id>.svg)이 있으면 그것을 쓰고,
 * 없으면 브랜드 색 글자 마크를 그대로 둔다.
 */
function toolMark(tool) {
  const box = el('span', 'tool-mark');
  const brand = tool.brand || {};
  box.style.setProperty('--mk-bg', brand.bg || '#161616');
  box.style.setProperty('--mk-ink', brand.ink || '#ffffff');
  box.style.setProperty('--mk-bg-d', brand.bgDark || brand.bg || '#f4f4f4');
  box.style.setProperty('--mk-ink-d', brand.inkDark || brand.ink || '#161616');
  box.appendChild(el('span', 'tool-mark-letter', tool.mark));

  if (tool.logo) {
    const img = new Image();
    img.alt = '';
    img.className = 'tool-mark-img';
    img.addEventListener('load', function () {
      box.classList.add('has-logo');
      box.appendChild(img);
    });
    img.src = tool.logo; // 실패하면 글자 마크가 그대로 남는다.
  }
  return box;
}

/** 도구 이름 + 제공사. 표 헤더와 상세 카드가 같은 모양을 쓴다. */
function toolIdentity(tool) {
  const wrap = el('div', 'tool-id');
  wrap.appendChild(toolMark(tool));
  const names = el('div', 'tool-names');
  names.appendChild(el('span', 'tool-name', tool.name));
  names.appendChild(el('span', 'tool-vendor', tool.vendor));
  wrap.appendChild(names);
  return wrap;
}

/** 판정 표시. 글리프 대신 CSS로 그려 크기와 정렬을 맞춘다. */
function levelIndicator(levelKey) {
  const lv = LEVELS[levelKey] || LEVELS.unknown;
  const box = el('span', 'ind ' + lv.className);
  box.setAttribute('role', 'img');
  box.setAttribute('aria-label', lv.label);
  return box;
}

/**
 * 카테고리별로 묶은 항목 목록.
 * 두 페이지가 같은 목록을 쓰므로 어디에 있든 이동 경로가 같다.
 */
function renderSideNav(container, activeSlug) {
  let currentCategory = null;
  let list = null;

  FEATURES.forEach(function (item) {
    if (item.category !== currentCategory) {
      currentCategory = item.category;

      const group = el('div', 'nav-group');
      group.appendChild(el('p', 'nav-group-title', currentCategory));
      const question = CATEGORIES[currentCategory];
      if (question) group.appendChild(el('p', 'nav-group-question', question));

      list = el('ul', 'nav-list');
      group.appendChild(list);
      container.appendChild(group);
    }

    const active = item.slug === activeSlug;
    const link = el('a', 'nav-item' + (active ? ' is-active' : ''));
    link.href = 'detail.html?f=' + encodeURIComponent(item.slug);
    link.appendChild(el('span', 'nav-item-name', item.name));
    if (isParity(item)) link.appendChild(el('span', 'nav-item-tag', '동일'));
    if (active) link.setAttribute('aria-current', 'page');

    const li = el('li');
    li.appendChild(link);
    list.appendChild(li);
  });
}

/** 좁은 화면에서 목록을 접었다 펴는 버튼. */
function setupNavToggle(currentLabel) {
  const aside = document.querySelector('.sidenav');
  const button = aside.querySelector('.sidenav-toggle');
  const current = aside.querySelector('.sidenav-toggle-current');
  if (current) current.textContent = currentLabel;

  button.addEventListener('click', function () {
    const open = aside.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
  });
}
