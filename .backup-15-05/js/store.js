// 数据存储 (localStorage)
const STORE_KEY = 'yantai_site_data_v1';
const VERSION_KEY = 'yantai_site_version';
const CURRENT_VERSION = 'cinematic-cn-v1';  // 主题切换时升级版本
const PORTFOLIO_MEDIA_KEY = 'yantai_portfolio_media_v1';

window.Store = {
  data: null,

  init() {
    try {
      const ver = localStorage.getItem(VERSION_KEY);
      // 主题版本变更：重置默认文案字段，保留用户上传的作品集和自定义列表
      if (ver !== CURRENT_VERSION) {
        const raw = localStorage.getItem(STORE_KEY);
        const old = raw ? JSON.parse(raw) : {};
        const fresh = JSON.parse(JSON.stringify(window.DEFAULT_DATA));
        // 仅保留用户的 portfolio（作品集）和明确编辑过的字段
        if (old.portfolio && old.portfolio.length) fresh.portfolio = old.portfolio;
        this.data = fresh;
        localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
        this.save();
        return this.data;
      }

      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        this.data = JSON.parse(raw);
        this.data = Object.assign({}, window.DEFAULT_DATA, this.data);
      } else {
        this.data = JSON.parse(JSON.stringify(window.DEFAULT_DATA));
      }
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
