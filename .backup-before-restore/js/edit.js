// 编辑模式：单条文本编辑、列表项 增/改/删
window.Edit = (function () {
  const toggle = document.getElementById('editToggle');
  const editModal = document.getElementById('listEditModal');
  const editForm = document.getElementById('listEditForm');
  const editTitle = document.getElementById('listEditTitle');
  const editClose = document.getElementById('listEditClose');

  let editing = false;

  // 各列表项的字段定义
  const FIELD_DEFS = {
    about_points: [{ name: 'text', label: '内容', type: 'textarea', required: true }],
    tools: [{ name: 'text', label: '工具名称', type: 'text', required: true }],
    skills: [
      { name: 'icon', label: '图标(单字)', type: 'text', placeholder: '如：塑/AI/剪' },
      { name: 'title', label: '技能名称', type: 'text', required: true },
      { name: 'desc', label: '说明', type: 'textarea' },
      { name: 'level', label: '熟练度(0-100)', type: 'number' }
    ],
    experience: [
      { name: 'company', label: '公司/机构', type: 'text', required: true },
      { name: 'role', label: '职位', type: 'text' },
      { name: 'period', label: '时间', type: 'text', placeholder: '2025.01 - 2025.06' },
      { name: 'points', label: '工作内容(每行一条)', type: 'textarea-list' },
      { name: 'result', label: '业绩(可选)', type: 'textarea' }
    ],
    projects: [
      { name: 'title', label: '项目名称', type: 'text', required: true },
      { name: 'cat', label: '类别', type: 'text', placeholder: '3DCG动画 / 互动叙事' },
      { name: 'period', label: '时间', type: 'text' },
      { name: 'desc', label: '描述', type: 'textarea' },
      { name: 'meta', label: '标签(每行一条)', type: 'textarea-list' },
      { name: 'link', label: '链接', type: 'url' }
    ],
    education: [
      { name: 'period', label: '时间', type: 'text', placeholder: '2023 - 2027' },
      { name: 'school', label: '学校', type: 'text', required: true },
      { name: 'major', label: '专业 / 学历', type: 'text' },
      { name: 'courses', label: '主修课程', type: 'textarea' }
    ]
  };

  function setEditing(on) {
    editing = on;
    document.body.classList.toggle('editing', on);
    toggle.classList.toggle('active', on);
    toggle.querySelector('span').textContent = on ? '完成编辑' : '编辑';
  }

  function buildForm(def, value) {
    return def.map(f => {
      let v = value ? (value[f.name] || '') : '';
      if (f.type === 'textarea-list' && Array.isArray(v)) v = v.join('\n');
      const required = f.required ? 'required' : '';
      const ph = f.placeholder ? `placeholder="${f.placeholder}"` : '';
      let input = '';
      if (f.type === 'textarea' || f.type === 'textarea-list') {
        input = `<textarea name="${f.name}" rows="${f.type === 'textarea-list' ? 5 : 3}" ${required} ${ph}>${escapeHtml(v)}</textarea>`;
      } else {
        input = `<input type="${f.type}" name="${f.name}" value="${escapeHtml(v)}" ${required} ${ph} />`;
      }
      return `<div class="field"><label>${f.label}</label>${input}</div>`;
    }).join('') + `
      <div class="form-actions">
        <button type="button" class="btn btn-ghost" data-act="cancel">取消</button>
        <button type="submit" class="btn btn-primary">保存</button>
      </div>`;
  }

  function showEdit(key, index) {
    const def = FIELD_DEFS[key];
    if (!def) return;
    const isAdd = (index === undefined || index === null || index === -1);
    const value = isAdd ? null : Store.data[key][index];
    editTitle.textContent = isAdd ? '添加' : '编辑';

    // 简单单字段（about_points / tools 是字符串数组）
    if (key === 'about_points' || key === 'tools') {
      editForm.innerHTML = `
        <div class="field"><label>内容</label>
          <textarea name="text" rows="3" required>${escapeHtml(isAdd ? '' : value)}</textarea>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-ghost" data-act="cancel">取消</button>
          <button type="submit" class="btn btn-primary">保存</button>
        </div>`;
    } else {
      editForm.innerHTML = buildForm(def, value);
    }

    editModal.hidden = false;
    document.body.style.overflow = 'hidden';

    editForm.onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(editForm);
      let item;
      if (key === 'about_points' || key === 'tools') {
        item = (fd.get('text') || '').trim();
        if (!item) return;
      } else {
        item = {};
        def.forEach(f => {
          let v = fd.get(f.name);
          if (f.type === 'textarea-list') {
            v = (v || '').split('\n').map(s => s.trim()).filter(Boolean);
          } else if (f.type === 'number') {
            v = v ? Number(v) : 0;
          } else {
            v = (v || '').trim();
          }
          item[f.name] = v;
        });
      }
      if (isAdd) Store.listAdd(key, item);
      else Store.listUpdate(key, index, item);
      hideEdit();
      Render.all();
      initReveal();
    };

    editForm.querySelector('[data-act="cancel"]').onclick = hideEdit;
  }

  function hideEdit() {
    editModal.hidden = true;
    document.body.style.overflow = '';
  }

  function editText(el) {
    const key = el.dataset.key;
    const cur = Store.data[key] || el.textContent.trim();
    const next = prompt('修改内容', cur);
    if (next !== null && next !== cur) {
      Store.set(key, next);
      Render.simpleTexts();
    }
  }

  function editImage(el) {
    const key = el.dataset.key;
    // 选择：上传 or 输入URL
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const f = input.files[0];
      if (!f) return;
      const url = await fileToDataURL(f);
      Store.set(key, url);
      el.style.backgroundImage = `url('${url}')`;
    };
    // 弹一个简单选择
    const choice = confirm('上传本地图片？\n（取消 = 输入图片URL）');
    if (choice) input.click();
    else {
      const url = prompt('图片URL', Store.data[key] || '');
      if (url) {
        Store.set(key, url);
        el.style.backgroundImage = `url('${url}')`;
      }
    }
  }

  function init() {
    toggle.addEventListener('click', () => setEditing(!editing));
    editClose.addEventListener('click', hideEdit);
    editModal.querySelector('.modal-mask').addEventListener('click', hideEdit);

    // 委托：编辑文本/图片
    document.addEventListener('click', (e) => {
      if (!editing) return;
      const ed = e.target.closest('[data-editable]');
      const img = e.target.closest('[data-editable-img]');
      if (img) { e.preventDefault(); editImage(img); return; }
      if (ed) { e.preventDefault(); editText(ed); return; }
    });

    // 列表项点击 - 编辑/删除（除了 portfolio 由 portfolio.js 处理）
    document.addEventListener('click', (e) => {
      if (!editing) return;
      // 添加按钮
      const addBtn = e.target.closest('.add-list-item-btn');
      if (addBtn) {
        e.preventDefault(); e.stopPropagation();
        showEdit(addBtn.dataset.addKey, -1);
        return;
      }
      const item = e.target.closest('[data-list-item]');
      if (!item) return;
      e.preventDefault(); e.stopPropagation();
      const key = item.dataset.listKey;
      const idx = +item.dataset.index;
      // shift 点击 = 删除
      if (e.shiftKey || e.target.dataset.act === 'del') {
        if (confirm('删除该项？')) {
          Store.listRemove(key, idx);
          Render.all();
        }
        return;
      }
      showEdit(key, idx);
    });

    // 双击右下角编辑按钮 = 重置
    let lastClick = 0;
    toggle.addEventListener('dblclick', () => Store.reset());
  }

  return { init, setEditing };
})();
