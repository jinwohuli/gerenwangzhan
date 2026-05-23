// 数据存储 (localStorage)
const STORE_KEY = 'yantai_site_data_v1';
const VERSION_KEY = 'yantai_site_version';
// 数据结构版本号：仅在数据结构发生不兼容变更时升级（如字段类型变化）。
// 普通的默认值更新不需要升级——会通过 Object.assign 智能合并，保留用户编辑。
const CURRENT_VERSION = 'cinematic-cn-v10-versionfix';
const PORTFOLIO_MEDIA_KEY = 'yantai_portfolio_media_v1';

// 深度合并：用 user 覆盖 base，但保留 base 中 user 没有的字段（包括嵌套对象）
// 数组字段直接采用 user 的值（避免数组合并冲突）
function deepMerge(base, user) {
  if (!user || typeof user !== 'object' || Array.isArray(user)) return user;
  const out = Array.isArray(base) ? [...base] : { ...base };
  for (const k of Object.keys(user)) {
    const bv = base ? base[k] : undefined;
    const uv = user[k];
    if (uv === null || uv === undefined) {
      out[k] = uv;
    } else if (Array.isArray(uv)) {
      // 数组：用户改过则用用户的
      out[k] = uv;
    } else if (typeof uv === 'object' && bv && typeof bv === 'object' && !Array.isArray(bv)) {
      out[k] = deepMerge(bv, uv);
    } else {
      out[k] = uv;
    }
  }
  return out;
}

// 智能合并对象数组：按位置 + 关键字段双重匹配
// 默认对象优先提供"项目维护字段"（如 workId、media），用户对象覆盖"内容字段"（title、desc 等）
// systemFields 列表中的字段始终用默认对象的最新值
// fillIfEmptyFields 列表中的字段：仅当用户值为空（空串/null/undefined）时回填默认值
function mergeObjectArray(defaults, users, keyField, systemFields, fillIfEmptyFields) {
  if (!Array.isArray(users)) return defaults;
  if (!Array.isArray(defaults)) return users;
  // 默认数组里的项：尝试找用户数据里对应的项，合并
  const merged = defaults.map((defItem, i) => {
    // 优先按 keyField 匹配，找不到再按位置 i 匹配
    let userItem = null;
    if (keyField && defItem[keyField]) {
      userItem = users.find(u => u && u[keyField] === defItem[keyField]);
    }
    if (!userItem && users[i]) userItem = users[i];
    if (!userItem) return defItem;
    // 合并：用户内容 + 默认系统字段
    const out = Object.assign({}, defItem, userItem);
    (systemFields || []).forEach(f => {
      if (defItem[f] !== undefined) out[f] = defItem[f];
    });
    // fillIfEmptyFields：用户值是空串/null/undefined → 回填默认值
    (fillIfEmptyFields || []).forEach(f => {
      const uv = userItem[f];
      if ((uv === undefined || uv === null || uv === '') && defItem[f]) {
        out[f] = defItem[f];
      }
    });
    return out;
  });
  return merged;
}

window.Store = {
  data: null,

  // 把用户数据 userData 与 defaults 合并：保留用户编辑，补充默认系统字段
  mergeUserData(defaults, userData) {
    if (!userData) return defaults;
    const out = Object.assign({}, defaults, userData);

    // experience（工作经历）：按 company 匹配
    if (Array.isArray(userData.experience)) {
      out.experience = mergeObjectArray(defaults.experience, userData.experience, 'company', [], []);
    }
    // projects（项目经历）：按 title 匹配，workId 始终用最新默认值，link 为空时回填默认值
    if (Array.isArray(userData.projects)) {
      out.projects = mergeObjectArray(defaults.projects, userData.projects, 'title', ['workId'], ['link']);
    }
    // skills（技能）：按 title 匹配
    if (Array.isArray(userData.skills)) {
      out.skills = mergeObjectArray(defaults.skills, userData.skills, 'title', [], []);
    }
    // education（教育）：按 school 匹配
    if (Array.isArray(userData.education)) {
      out.education = mergeObjectArray(defaults.education, userData.education, 'school', [], []);
    }

    // portfolio：默认作品（id=w1..）按 id 匹配，media 始终用最新默认值；用户上传（id=w_*）保留
    // link 字段：用户值为空时回填默认值（让我们后续给某个作品添加链接时能生效）
    if (Array.isArray(userData.portfolio)) {
      const userUploaded = userData.portfolio.filter(w => w.id && w.id.startsWith('w_'));
      const defaultPortfolio = defaults.portfolio.map(defWork => {
        const userEdit = userData.portfolio.find(w => w.id === defWork.id);
        if (!userEdit) return defWork;
        const merged = Object.assign({}, defWork, userEdit, { media: defWork.media });
        // link 为空时回填默认值
        if ((!userEdit.link || userEdit.link === '') && defWork.link) {
          merged.link = defWork.link;
        }
        return merged;
      });
      out.portfolio = [...userUploaded, ...defaultPortfolio];
    }
    return out;
  },

  init() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      const userData = raw ? JSON.parse(raw) : null;
      const storedVersion = localStorage.getItem(VERSION_KEY);
      const defaults = JSON.parse(JSON.stringify(window.DEFAULT_DATA));

      // 版本不匹配或无用户数据 → 直接用最新默认数据（访客每次更新都能看到最新内容）
      if (!userData || storedVersion !== CURRENT_VERSION) {
        this.data = defaults;
        localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
        this.save();
        return this.data;
      }

      // 版本匹配 → 智能合并：保留用户编辑，补充默认数据中新增的字段
      this.data = this.mergeUserData(defaults, userData);
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
      this.save();
    } catch (e) {
      console.warn('读取数据失败，使用默认数据', e);
      this.data = JSON.parse(JSON.stringify(window.DEFAULT_DATA));
    }
    return this.data;
  },

  save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(this.data));
    } catch (e) {
      alert('保存失败：浏览器存储容量超限，请减少图片/视频大小或数量。');
      console.error(e);
    }
  },

  reset() {
    if (confirm('确定恢复为简历默认内容吗？所有自定义将被清空。')) {
      localStorage.removeItem(STORE_KEY);
      this.data = JSON.parse(JSON.stringify(window.DEFAULT_DATA));
      this.save();
      location.reload();
    }
  },

  set(key, value) {
    this.data[key] = value;
    this.save();
  },

  // 列表操作
  listAdd(key, item) {
    if (!Array.isArray(this.data[key])) this.data[key] = [];
    this.data[key].push(item);
    this.save();
  },
  listUpdate(key, index, item) {
    if (!Array.isArray(this.data[key])) return;
    this.data[key][index] = item;
    this.save();
  },
  listRemove(key, index) {
    if (!Array.isArray(this.data[key])) return;
    this.data[key].splice(index, 1);
    this.save();
  },

  // 作品集 - 单独操作（含 id）
  portfolioAdd(item) {
    item.id = item.id || ('w_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7));
    this.data.portfolio = this.data.portfolio || [];
    this.data.portfolio.unshift(item);
    this.save();
    return item;
  },
  portfolioUpdate(id, item) {
    const idx = this.data.portfolio.findIndex(w => w.id === id);
    if (idx >= 0) {
      this.data.portfolio[idx] = Object.assign({}, this.data.portfolio[idx], item, { id });
      this.save();
    }
  },
  portfolioRemove(id) {
    this.data.portfolio = (this.data.portfolio || []).filter(w => w.id !== id);
    this.save();
  },
  portfolioGet(id) {
    return (this.data.portfolio || []).find(w => w.id === id);
  }
};

// 文件 -> base64
window.fileToDataURL = function(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
