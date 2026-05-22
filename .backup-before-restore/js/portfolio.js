// 作品集逻辑：上传 / 编辑 / 详情 / 筛选
window.Portfolio = (function () {
  const modal = document.getElementById('workModal');
  const closeBtn = document.getElementById('workModalClose');
  const cancelBtn = document.getElementById('workCancelBtn');
  const form = document.getElementById('workForm');
  const idInput = document.getElementById('workId');
  const titleInput = document.getElementById('workTitle');
  const catInput = document.getElementById('workCategory');
  const yearInput = document.getElementById('workYear');
  const descInput = document.getElementById('workDesc');
  const linkInput = document.getElementById('workLink');
  const mediaInput = document.getElementById('workMedia');
  const mediaPreview = document.getElementById('mediaPreview');
  const modalTitle = document.getElementById('workModalTitle');

  const viewModal = document.getElementById('viewModal');
  const viewClose = document.getElementById('viewModalClose');
  const viewContent = document.getElementById('viewContent');

  let currentMedia = []; // {type, src}
  let currentFilter = 'all';

  function openCreate() {
    idInput.value = '';
    titleInput.value = '';
    catInput.value = 'video';
    yearInput.value = String(new Date().getFullYear());
    descInput.value = '';
    linkInput.value = '';
    currentMedia = [];
    renderMediaPreview();
    modalTitle.textContent = '添加作品';
    showModal(modal);
  }

  function openEdit(id) {
    const w = Store.portfolioGet(id);
    if (!w) return;
    idInput.value = w.id;
    titleInput.value = w.title || '';
    catInput.value = w.category || 'video';
    yearInput.value = w.year || '';
    descInput.value = w.desc || '';
    linkInput.value = w.link || '';
    currentMedia = (w.media || []).slice();
    renderMediaPreview();
    modalTitle.textContent = '编辑作品';
    showModal(modal);
  }

  function renderMediaPreview() {
    mediaPreview.innerHTML = currentMedia.map((m, i) => {
      const inner = m.type === 'video'
        ? `<video src="${m.src}" muted></video>`
        : `<img src="${m.src}" />`;
      return `<div class="mp-item">${inner}<button type="button" class="mp-remove" data-rm="${i}">×</button></div>`;
    }).join('');
    mediaPreview.querySelectorAll('.mp-remove').forEach(btn => {
      btn.onclick = () => {
        currentMedia.splice(+btn.dataset.rm, 1);
        renderMediaPreview();
      };
    });
  }

  async function handleFiles(files) {
    for (const f of files) {
      if (f.size > 8 * 1024 * 1024) {
        if (!confirm(`文件 ${f.name} 较大（${(f.size/1024/1024).toFixed(1)}MB），可能导致存储失败。继续？`)) continue;
      }
      const dataUrl = await fileToDataURL(f);
      const type = f.type.startsWith('video') ? 'video' : 'image';
      currentMedia.push({ type, src: dataUrl, name: f.name });
    }
    renderMediaPreview();
    mediaInput.value = '';
  }

  function showModal(m) { m.hidden = false; document.body.style.overflow = 'hidden'; }
  function hideModal(m) { m.hidden = true; document.body.style.overflow = ''; }

  function submit(e) {
    e.preventDefault();
    const id = idInput.value;
    const item = {
      title: titleInput.value.trim(),
      category: catInput.value,
      year: yearInput.value.trim(),
      desc: descInput.value.trim(),
      link: linkInput.value.trim(),
      media: currentMedia
    };
    if (!item.title) { alert('请填写标题'); return; }
    if (id) Store.portfolioUpdate(id, item);
    else Store.portfolioAdd(item);
    hideModal(modal);
    Render.portfolio(currentFilter);
    initReveal();
  }

  function openView(id) {
    const w = Store.portfolioGet(id);
    if (!w) return;
    const catLabel = { video: '影视/视频', '3d': '三维/动画', game: '游戏', web: '网站/交互', image: '图像' };
    const media = w.media || [];
    const mainMedia = media[0];
    const mainHtml = !mainMedia ? `<div style="padding:80px;color:#888">暂无媒体</div>`
      : mainMedia.type === 'video'
        ? `<video src="${mainMedia.src}" controls autoplay></video>`
        : `<img src="${mainMedia.src}" />`;

    viewContent.innerHTML = `
      <div class="view-content">
        <div class="view-media-wrap" id="viewMain">${mainHtml}</div>
        ${media.length > 1 ? `<div class="view-media-nav">
          ${media.map((m, i) => `<div class="view-thumb ${i === 0 ? 'active' : ''}" data-idx="${i}">
            ${m.type === 'video' ? `<video src="${m.src}" muted></video>` : `<img src="${m.src}" />`}
          </div>`).join('')}
        </div>` : ''}
        <div class="view-meta">
          <div class="view-cat">${escapeHtml(catLabel[w.category] || w.category)}</div>
          <h2 class="view-title">${escapeHtml(w.title)}</h2>
          <div class="view-year">${escapeHtml(w.year || '')}</div>
          <div class="view-desc">${escapeHtml(w.desc || '')}</div>
          ${w.link ? `<a class="view-link" href="${escapeHtml(w.link)}" target="_blank" rel="noopener">查看原作品 →</a>` : ''}
        </div>
      </div>`;
    showModal(viewModal);

    viewContent.querySelectorAll('.view-thumb').forEach(th => {
      th.onclick = () => {
        const i = +th.dataset.idx;
        const m = media[i];
        const main = document.getElementById('viewMain');
        main.innerHTML = m.type === 'video'
          ? `<video src="${m.src}" controls autoplay></video>`
          : `<img src="${m.src}" />`;
        viewContent.querySelectorAll('.view-thumb').forEach(t => t.classList.remove('active'));
        th.classList.add('active');
      };
    });
  }

  function bindFilters() {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(t => {
      t.addEventListener('click', () => {
        tabs.forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        currentFilter = t.dataset.filter;
        Render.portfolio(currentFilter);
        initReveal();
      });
    });
  }

  function bindGrid() {
    const grid = document.getElementById('portfolioGrid');
    grid.addEventListener('click', e => {
      const card = e.target.closest('.work-card');
      if (!card) return;
      const id = card.dataset.id;
      const action = e.target.dataset.action;
      if (action === 'edit') { e.stopPropagation(); openEdit(id); return; }
      if (action === 'del') {
        e.stopPropagation();
        if (confirm('确定删除此作品？')) {
          Store.portfolioRemove(id);
          Render.portfolio(currentFilter);
        }
        return;
      }
      openView(id);
    });
  }

  function init() {
    document.getElementById('addWorkBtn').addEventListener('click', openCreate);
    closeBtn.addEventListener('click', () => hideModal(modal));
    cancelBtn.addEventListener('click', () => hideModal(modal));
    modal.querySelector('.modal-mask').addEventListener('click', () => hideModal(modal));
    viewClose.addEventListener('click', () => hideModal(viewModal));
    viewModal.querySelector('.modal-mask').addEventListener('click', () => hideModal(viewModal));

    form.addEventListener('submit', submit);
    mediaInput.addEventListener('change', e => handleFiles(e.target.files));

    // 拖放
    form.addEventListener('dragover', e => { e.preventDefault(); });
    form.addEventListener('drop', e => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
    });

    bindFilters();
    bindGrid();
  }

  return { init, openCreate, openEdit, openView };
})();
