window.Render = {
  all() {
    this.simpleTexts();
    this.aboutPoints();
    this.skills();
    this.tools();
    this.experience();
    this.projects();
    this.education();
    this.portfolio('all');
  },

  simpleTexts() {
    const d = Store.data;
    document.querySelectorAll('[data-editable]').forEach(el => {
      const k = el.dataset.key;
      if (k && d[k] !== undefined) el.textContent = d[k];
    });
    document.querySelectorAll('[data-editable-img]').forEach(el => {
      const k = el.dataset.key;
      if (k && d[k]) el.style.backgroundImage = `url('${d[k]}')`;
    });
  },

  aboutPoints() {
    const ul = document.getElementById('aboutPoints');
    if (!ul) return;
    const points = Store.data.about_points || [];
    ul.innerHTML = points.map((t, i) =>
      `<li data-list-item data-list-key="about_points" data-index="${i}">${escapeHtml(t)}</li>`
    ).join('');
    appendAddBtn(ul, 'about_points', '＋ 添加一条');
  },

  skills() {
    const wrap = document.getElementById('skillsHex');
    if (!wrap) return;
    const list = Store.data.skills || [];
    const enMap = {
      '三维建模渲染': '三维 / 建模渲染',
      '三维建模': '三维 / 建模渲染',
      'AIGC 创作': 'AIGC / 智能创作',
      '剪辑调色': '剪辑 / 调色合成',
      'Vibe Coding': '编程 / 创意编码',
      '虚拟制片': '虚拟 / 实时制片'
    };
    wrap.innerHTML = list.map((s, i) => `
      <div class="skill-card" data-list-item data-list-key="skills" data-index="${i}" style="--lvl:${s.level || 80}%">
        <div class="sc-icon">${String(i + 1).padStart(2, '0')}</div>
        <div class="sc-title">${escapeHtml(s.title || '')}</div>
        <div class="sc-en">${escapeHtml(enMap[s.title] || '专业能力')}</div>
        <div class="sc-desc">${escapeHtml(s.desc || '')}</div>
        <div class="sc-bar"></div>
        <div class="sc-level">
          <span>熟练度</span>
          <span class="lv-num">${s.level || 80}%</span>
        </div>
      </div>
    `).join('');
    appendAddBtn(wrap, 'skills', '＋ 添加技能');
  },

  tools() {
    const wrap = document.getElementById('toolsCloud');
    if (!wrap) return;
    const list = Store.data.tools || [];
    wrap.innerHTML = list.map((t, i) =>
      `<span class="tool-tag" data-list-item data-list-key="tools" data-index="${i}">${escapeHtml(t)}</span>`
    ).join('');
    appendAddBtn(wrap, 'tools', '＋ 工具');
  },

  experience() {
    const wrap = document.getElementById('timelineWork');
    if (!wrap) return;
    const list = Store.data.experience || [];
    wrap.innerHTML = list.map((it, i) => `
      <div class="exp-item reveal" data-list-item data-list-key="experience" data-index="${i}">
        <div class="exp-head">
          <div class="exp-company">${escapeHtml(it.company)}</div>
          <div class="exp-period">${escapeHtml(it.period || '')}</div>
        </div>
        <div class="exp-role">${escapeHtml(it.role || '')}</div>
        <ul class="exp-points">
          ${(it.points || []).map(p => `<li>${escapeHtml(p)}</li>`).join('')}
        </ul>
        ${it.result ? `<div class="exp-result"><span class="exp-result-label">业绩</span>${escapeHtml(it.result)}</div>` : ''}
      </div>
    `).join('');
    appendAddBtn(wrap, 'experience', '＋ 添加工作经历');
  },

  projects() {
    const wrap = document.getElementById('projectsGrid');
    if (!wrap) return;
    const list = Store.data.projects || [];
    wrap.innerHTML = list.map((p, i) => `
      <div class="proj-card reveal" data-list-item data-list-key="projects" data-index="${i}">
        <div class="proj-head">
          <span class="proj-cat">${escapeHtml(p.cat || '')}</span>
          <span class="proj-period">${escapeHtml(p.period || '')}</span>
        </div>
        ${p.workId ? `<button class="proj-work-btn" data-work-id="${escapeAttr(p.workId)}" type="button">
          <svg viewBox="0 0 24 24" width="13" height="13"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h12"/><circle cx="20" cy="18" r="2" fill="currentColor"/></svg>
          <span>去作品集查看</span>
          <svg viewBox="0 0 24 24" width="12" height="12"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 5l7 7-7 7"/></svg>
        </button>` : ''}
        <div class="proj-title">${escapeHtml(p.title || '')}</div>
        <div class="proj-desc">${escapeHtml(p.desc || '')}</div>
        <div class="proj-meta">${(p.meta || []).map(m => `<span>${escapeHtml(m)}</span>`).join('')}</div>
        ${p.link ? `<a class="proj-link" href="${escapeAttr(p.link)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${getLinkLabel(p.link)} →</a>` : ''}
      </div>
    `).join('');
    appendAddBtn(wrap, 'projects', '＋ 添加项目');

    // 绑定"去作品集查看"按钮：跳转到 #works 并自动打开对应作品
    let lastWorkBtnClick = 0;
    wrap.querySelectorAll('.proj-work-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        // 节流：500ms 内重复点击直接拒绝
        const now = Date.now();
        if (now - lastWorkBtnClick < 500) return;
        lastWorkBtnClick = now;

        const id = btn.dataset.workId;
        if (!id) return;
        if (typeof window.pageJumpTo === 'function') {
          window.pageJumpTo('#works', { replay: true });
        } else {
          location.hash = '#works';
        }
        // 等加载动画结束（3.4s）后高亮并打开详情弹窗
        setTimeout(() => {
          const card = document.querySelector(`.work-card[data-id="${id}"]`);
          if (card) {
            card.classList.add('flash');
            setTimeout(() => card.classList.remove('flash'), 1600);
          }
          if (window.Portfolio && typeof window.Portfolio.openView === 'function') {
            window.Portfolio.openView(id);
          }
        }, 3400);
      });
    });
  },

  education() {
    const wrap = document.getElementById('educationList');
    if (!wrap) return;
    const list = Store.data.education || [];
    wrap.innerHTML = list.map((e, i) => `
      <div class="edu-item reveal" data-list-item data-list-key="education" data-index="${i}">
        <div class="edu-period">${escapeHtml(e.period || '')}</div>
        <div>
          <div class="edu-school">${escapeHtml(e.school || '')}</div>
          <div class="edu-major">${escapeHtml(e.major || '')}</div>
          <div class="edu-courses"><strong>主修课程</strong>${escapeHtml(e.courses || '')}</div>
        </div>
      </div>
    `).join('');
    appendAddBtn(wrap, 'education', '＋ 添加教育经历');
  },

  portfolio(filter = 'all') {
    const wrap = document.getElementById('portfolioGrid');
    const empty = document.getElementById('portfolioEmpty');
    if (!wrap) return;
    let list = Store.data.portfolio || [];
    if (filter !== 'all') list = list.filter(w => w.category === filter);

    if (!list.length) {
      wrap.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;

    const catCN = { video:'影视', '3d':'三维', game:'游戏', web:'交互', image:'图像' };
    const catEN = { video:'影视', '3d':'三维', game:'游戏', web:'交互', image:'图像' };

    wrap.innerHTML = list.map(w => {
      const cover = (w.media && w.media[0]) || null;
      let coverHtml;
      if (!cover) {
        coverHtml = `<div class="work-cover-empty">作品</div>`;
      } else if (cover.type === 'video') {
        coverHtml = `<video src="${escapeAttr(cover.src)}" muted loop playsinline preload="metadata"></video>`;
      } else {
        coverHtml = `<img src="${escapeAttr(cover.src)}" alt="${escapeAttr(w.title)}" loading="lazy" />`;
      }
      return `
      <div class="work-card reveal" data-id="${escapeAttr(w.id)}">
        <div class="work-actions">
          <button class="work-action-btn edit" data-action="edit" title="编辑">✎</button>
          <button class="work-action-btn del" data-action="del" title="删除">×</button>
        </div>
        <div class="work-cover">
          <span class="work-cat-tag">${escapeHtml(catEN[w.category] || w.category)}</span>
          ${coverHtml}
        </div>
        <div class="work-info">
          <div class="work-title">${escapeHtml(w.title)}</div>
          <div class="work-meta-row">
            <span class="work-cat-en">${escapeHtml(catEN[w.category] || '')}</span>
            <span class="wm-divider"></span>
            <span>${escapeHtml(w.year || '')}</span>
          </div>
          <div class="work-desc">${escapeHtml(w.desc || '')}</div>
        </div>
      </div>`;
    }).join('');

    wrap.querySelectorAll('.work-card').forEach(card => {
      const v = card.querySelector('video');
      if (v) {
        card.addEventListener('mouseenter', () => v.play().catch(()=>{}));
        card.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });
      }
    });
  }
};

function appendAddBtn(parent, key, label) {
  const id = 'add_' + key + '_btn';
  let btn = document.getElementById(id);
  if (!btn) {
    btn = document.createElement('button');
    btn.id = id;
    btn.className = 'add-list-item-btn';
    btn.dataset.addKey = key;
    btn.textContent = label;
    parent.parentElement.appendChild(btn);
  } else {
    btn.textContent = label;
  }
}

function escapeHtml(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function escapeAttr(s) { return escapeHtml(s); }

// 根据链接 URL 自动推断按钮文案（识别常见平台）
function getLinkLabel(link) {
  if (!link) return '查看';
  const url = String(link).toLowerCase();
  if (url.includes('douyin.com') || url.includes('iesdouyin') || url.includes('v.douyin')) return '去抖音查看';
  if (url.includes('xiaohongshu') || url.includes('xhslink')) return '去小红书查看';
  if (url.includes('bilibili.com') || url.includes('b23.tv')) return '去 B 站查看';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return '去 YouTube 查看';
  if (url.includes('vimeo.com')) return '去 Vimeo 查看';
  if (url.includes('itch.io')) return '去 itch.io 试玩';
  if (url.includes('github.com') || url.includes('github.io')) return '查看网站';
  return '查看';
}

window.escapeHtml = escapeHtml;
window.getLinkLabel = getLinkLabel;
