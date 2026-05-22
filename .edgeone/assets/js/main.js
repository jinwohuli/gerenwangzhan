// 入口
(function () {
  // 在入口立即捕获最初的 loader 节点引用（防止后续被 replayHomeLoader 替换后误关）
  const initialLoader = document.getElementById('loader') || document.getElementById('ink-loader');

  // Loader 数字 00 -> 100 滚动
  const counter = document.getElementById('ldCounterNum');
  if (counter) {
    const duration = 2600;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      // ease-out 曲线，让最后阶段慢下来
      const eased = 1 - Math.pow(1 - t, 2.2);
      const v = Math.floor(eased * 100);
      counter.textContent = v.toString().padStart(2, '0');
      if (t < 1) requestAnimationFrame(tick);
      else counter.textContent = '100';
    }
    requestAnimationFrame(tick);
  }

  // 卷帘开启 - 仅关闭最初的 loader（如果它已被 replayHomeLoader 替换走，就不操作新 loader）
  setTimeout(() => {
    if (initialLoader && initialLoader.isConnected) {
      initialLoader.classList.add('done');
    }
    // 如果 initialLoader 已被替换出 DOM（说明用户提前点击导航触发了 replay），不做任何操作
    // 让 replayHomeLoader 内部的 setTimeout 自己控制新 loader
  }, 3200);

  Store.init();
  Render.all();
  Portfolio.init();
  Edit.init();
  initReveal();
  initHeroVideo();

  const nav = document.getElementById('nav');
  const progress = document.getElementById('scrollProgress');

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 80);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress && max > 0) progress.style.width = (y / max * 100) + '%';
    parallax(y);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // 山水视差 + 月浮动 + 飘带视差
  const layers = document.querySelectorAll('.hero-mountains svg, .m-layer');
  const moon = document.querySelector('.hero-moon, .moon');
  const heroFlow = document.querySelector('.hero-flow, .hero-ribbon');
  let mouseX = 0, mouseY = 0;

  function parallax(y) {
    if (y < window.innerHeight * 1.2) {
      layers.forEach((l, i) => {
        const speed = (i + 1) * 0.15;
        l.style.transform = `translate(${mouseX * (i + 1) * -6}px, ${y * speed * -0.3}px)`;
      });
      if (moon) moon.style.transform = `translate(${mouseX * -20}px, ${y * 0.3}px)`;
      if (heroFlow) heroFlow.style.transform = `translate(${mouseX * 30}px, ${mouseY * 15}px)`;
    }
  }

  const hero = document.getElementById('home');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      parallax(window.scrollY);
    });
  }

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  initCursor();
  initMagnetic();
  initEmbers();
  initPageTransition();
})();

// 章节中文/英文映射（用于跳转过渡的标识）
const SECTION_MAP = {
  home:       { num: '00', cn: '首页',   en: 'HOME' },
  about:      { num: '01', cn: '关于',   en: 'ABOUT' },
  education:  { num: '02', cn: '教育',   en: 'EDUCATION' },
  experience: { num: '03', cn: '经历',   en: 'EXPERIENCE' },
  skills:     { num: '04', cn: '技能',   en: 'SKILLS' },
  works:      { num: '05', cn: '作品',   en: 'WORKS' },
  contact:    { num: '06', cn: '联系',   en: 'CONTACT' }
};

// 平滑滚动到目标（精准计算导航栏高度补偿）
function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const dist = targetY - startY;
  const start = performance.now();
  function step(now) {
    const t = Math.min(1, (now - start) / duration);
    // easeInOutCubic
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    window.scrollTo(0, startY + dist * eased);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// 页面跳转过渡：墨幕扫过 + 精准跳转
function initPageTransition() {
  const trans = document.getElementById('pageTransition');
  const ptNum = document.getElementById('ptNum');
  const ptCn  = document.getElementById('ptCn');
  const ptEn  = document.getElementById('ptEn');
  if (!trans) return;

  let isTransitioning = false;
  let transitionLockTimer = null;
  let lastJumpAt = 0; // 最近一次跳转的时间戳

  // 安全地切换 isTransitioning，加超时兜底防止卡死
  function lockTransition() {
    isTransitioning = true;
    lastJumpAt = Date.now();
    if (transitionLockTimer) clearTimeout(transitionLockTimer);
    transitionLockTimer = setTimeout(() => {
      isTransitioning = false;
      // 同时强制清理过渡元素状态
      trans.classList.remove('active', 'leaving');
    }, 6000); // 6 秒兜底
  }
  function unlockTransition() {
    isTransitioning = false;
    if (transitionLockTimer) { clearTimeout(transitionLockTimer); transitionLockTimer = null; }
  }

  // ===== 重播开场 loader（点击"首页"按钮或带 data-replay-loader 的按钮时使用） =====
  // targetId: 'home' = 重置 hero 到未进入；其他 = 开场结束后落到该章节
  function replayHomeLoader(targetId) {
    // 双保险：isTransitioning 锁 + 时间戳节流（500ms 内重复点击直接拒绝）
    const now = Date.now();
    if (isTransitioning || (now - lastJumpAt < 500)) return;
    lockTransition();
    targetId = targetId || 'home';
    const isHome = targetId === 'home';

    const hero = document.getElementById('home');
    const heroHint = document.getElementById('heroCtaHint');
    const heroVideo = document.getElementById('heroVideo');

    if (isHome) {
      // 目标是首页 → 重置 hero 到"未进入"状态，让用户重看视频开场
      if (hero) hero.classList.remove('entered');
      if (heroHint) heroHint.classList.remove('visible');
      if (heroVideo) {
        try { heroVideo.currentTime = 0; } catch (e) {}
        heroVideo.classList.remove('ready');
      }
    } else {
      // 目标不是首页 → hero 标记为已进入（避免回首页时还显示"点击进入"）
      if (hero) hero.classList.add('entered');
      if (heroVideo) heroVideo.classList.add('ready');
    }

    // 2) 立即跳转到目标位置 - 临时禁用 CSS smooth scroll
    let targetY = 0;
    if (!isHome) {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetY = targetEl.getBoundingClientRect().top + window.scrollY;
        const nav = document.getElementById('nav');
        if (nav) targetY -= nav.offsetHeight - 8;
      }
    }
    const html = document.documentElement;
    const prevSb = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    const finalY = Math.max(0, targetY);
    window.scrollTo(0, finalY);
    if (Math.abs(window.scrollY - finalY) > 4) {
      html.scrollTop = finalY;
      document.body.scrollTop = finalY;
    }
    void html.offsetHeight;
    html.style.scrollBehavior = prevSb;
    history.replaceState(null, '', '#' + targetId);

    // 3) 取出旧 loader，深克隆替换，强制重启所有 CSS 动画
    const oldLoader = document.getElementById('loader');
    if (!oldLoader) { unlockTransition(); return; }
    const newLoader = oldLoader.cloneNode(true);
    newLoader.classList.remove('done');
    oldLoader.replaceWith(newLoader);

    // 4) 重新启动数字 00 -> 100 滚动
    const counter = newLoader.querySelector('#ldCounterNum');
    if (counter) {
      counter.textContent = '00';
      const duration = 2600;
      const start = performance.now();
      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 2.2);
        const v = Math.floor(eased * 100);
        counter.textContent = v.toString().padStart(2, '0');
        if (t < 1) requestAnimationFrame(tick);
        else counter.textContent = '100';
      }
      requestAnimationFrame(tick);
    }

    // 5) 3.2s 后卷帘开启
    setTimeout(() => {
      newLoader.classList.add('done');
      // 如果目标是首页，重启视频开场
      if (isHome && heroVideo) {
        // 关键：必须加回 ready 类，否则视频虽然在播但 opacity:0 不可见
        heroVideo.classList.add('ready');
        heroVideo.loop = true;
        try { heroVideo.currentTime = 0; } catch (e) {}
        const p = heroVideo.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
        // 重置 initHeroVideo 内的 entered 状态，让"点击进入"提示能再次显示
        if (typeof window.resetHeroEntered === 'function') {
          window.resetHeroEntered();
        }
        setTimeout(() => {
          if (heroHint && hero && !hero.classList.contains('entered')) {
            heroHint.classList.add('visible');
          }
        }, 1600);
      }
      setTimeout(() => { unlockTransition(); }, 1200);
    }, 3200);
  }

  function jumpTo(hash, opts) {
    opts = opts || {};
    if (isTransitioning) return;
    const id = hash.replace('#', '');
    const target = document.getElementById(id);
    if (!target) return;

    // 特殊：使用完整开场动画
    if (opts.replay) {
      replayHomeLoader(id);
      return;
    }

    lockTransition();

    // 用户既然点了导航，hero 视频开场就视为完成（让首页文字直接显示）
    const hero = document.getElementById('home');
    if (hero && !hero.classList.contains('entered')) {
      hero.classList.add('entered');
      const v = document.getElementById('heroVideo');
      if (v) {
        v.classList.add('ready');
        v.loop = true;
        const p = v.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
    }

    // 更新章节标识
    const meta = SECTION_MAP[id] || { num: '', cn: '', en: id.toUpperCase() };
    if (ptNum) ptNum.textContent = meta.num;
    if (ptCn)  ptCn.textContent  = meta.cn;
    if (ptEn)  ptEn.textContent  = meta.en;

    // 阶段 1：墨幕扫入（0.55s）
    trans.classList.remove('leaving');
    trans.classList.add('active');

    // 阶段 2：在屏幕被完全遮住时（约 550ms）精准跳转 + 修正 hash
    setTimeout(() => {
      // 计算目标位置（首页直接到 0；其他考虑导航高度）
      let targetY = 0;
      if (id !== 'home') {
        const rect = target.getBoundingClientRect();
        targetY = rect.top + window.scrollY;
        // 若导航是固定的并显示，扣掉它的高度（避免被遮住）
        const nav = document.getElementById('nav');
        if (nav) targetY -= nav.offsetHeight - 8;
      }
      // 即时跳转 - 临时禁用 CSS smooth scroll，确保瞬移
      const html = document.documentElement;
      const prev = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      const finalY = Math.max(0, targetY);
      window.scrollTo(0, finalY);
      // 双保险：如果 scrollTo 没生效，直接赋值
      if (Math.abs(window.scrollY - finalY) > 4) {
        html.scrollTop = finalY;
        document.body.scrollTop = finalY;
      }
      void html.offsetHeight;
      html.style.scrollBehavior = prev;
      // 同步 URL hash（不再触发跳转）
      history.replaceState(null, '', '#' + id);

      // 阶段 3：墨幕拉开（0.6s）
      requestAnimationFrame(() => {
        trans.classList.remove('active');
        trans.classList.add('leaving');
      });

      // 阶段 4：动画结束后清理状态
      setTimeout(() => {
        trans.classList.remove('leaving');
        unlockTransition();
      }, 700);
    }, 560);
  }

  // 拦截所有 #xxx 锚点点击 - 用 capture 阶段，确保最先执行，不被其他处理器拦截
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    if (!href.startsWith('#') || href.length <= 1) return;
    const id = href.slice(1);
    if (!document.getElementById(id)) return; // 找不到目标就走默认行为
    // 强力阻止默认行为和冒泡
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    // 所有跳转都使用完整开场加载动画
    jumpTo(href, { replay: true });
  }, true); // capture 阶段

  // 暴露给外部
  window.pageJumpTo = jumpTo;
}

// 自定义光标（高性能：rAF 节流 + GPU 合成）
function initCursor() {
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  if (isCoarse) return;
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  // 鼠标真实位置
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  // dot 立即跟随；ring 平滑追随
  let dx = mx, dy = my;     // dot 显示位置
  let rx = mx, ry = my;     // ring 显示位置
  let needsUpdate = false;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    needsUpdate = true;
  }, { passive: true });

  function loop() {
    if (needsUpdate) {
      // dot 用更高的跟随系数（接近 1.0）= 几乎贴着鼠标
      dx += (mx - dx) * 0.55;
      dy += (my - dy) * 0.55;
      // ring 用低系数（0.18）= 平滑拖尾
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;

      // translate3d 触发 GPU 合成层（注意：内部已用负 margin 居中，不需要 -50%）
      dot.style.transform  = `translate3d(${dx}px, ${dy}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;

      // 当 dot/ring 都接近目标位置时停止更新（省 CPU）
      if (Math.abs(mx - dx) < 0.1 && Math.abs(my - dy) < 0.1 &&
          Math.abs(mx - rx) < 0.1 && Math.abs(my - ry) < 0.1) {
        needsUpdate = false;
      }
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // hover 检测：用事件委托一次，避免多次注册
  const hoverSel = 'a, button, .work-card, .proj-card, .skill-card, .tool-tag, [data-list-item], [data-editable], [data-editable-img], .filter-tab, .contact-card, .as-link, .exp-item, .edu-item';
  let hovering = false;
  function checkHover(e) {
    const isOver = !!(e.target && e.target.closest && e.target.closest(hoverSel));
    if (isOver !== hovering) {
      hovering = isOver;
      ring.classList.toggle('hover', hovering);
      dot.classList.toggle('hover', hovering);
    }
  }
  document.addEventListener('pointerover', checkHover, { passive: true });

  // 鼠标离开窗口隐藏
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '';
    ring.style.opacity = '';
  });
}

// 磁吸效果
function initMagnetic() {
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  if (isCoarse) return;
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}

// 灰烬粒子（金 + 朱红 火星）
function initEmbers() {
  const wrap = document.getElementById('particles') || document.getElementById('embers');
  if (!wrap) return;
  const COUNT = 36;
  for (let i = 0; i < COUNT; i++) {
    spawnEmber(wrap);
  }
}
function spawnEmber(wrap) {
  const e = document.createElement('div');
  e.className = 'particle ember';
  e.style.left = (Math.random() * 100) + 'vw';
  const dur = 8 + Math.random() * 14;
  const delay = -Math.random() * dur;
  const drift = (Math.random() - 0.5) * 220;
  const size = 1 + Math.random() * 2.5;
  e.style.width = size + 'px';
  e.style.height = size + 'px';
  e.style.animationDuration = dur + 's';
  e.style.animationDelay = delay + 's';
  e.style.setProperty('--drift', drift + 'px');
  e.style.opacity = (0.5 + Math.random() * 0.5).toString();
  if (Math.random() < 0.35) {
    e.style.background = '#ef3a3f';
    e.style.boxShadow = '0 0 8px #ef3a3f, 0 0 18px rgba(214,40,40,0.8)';
  }
  wrap.appendChild(e);
}

// Hero 视频开场 + 点击进入
function initHeroVideo() {
  const hero = document.getElementById('home');
  const video = document.getElementById('heroVideo');
  const hint = document.getElementById('heroCtaHint');
  if (!hero || !video) return;

  let entered = false;

  function enter() {
    if (entered) return;
    entered = true;
    hero.classList.add('entered');
    video.loop = true;
    video.play().catch(() => {});
  }

  // 暴露给 replayHomeLoader：回到首页时重置进入状态，使提示再次出现
  window.resetHeroEntered = function () {
    entered = false;
  };

  video.addEventListener('canplay', () => {
    video.classList.add('ready');
  }, { once: true });

  video.addEventListener('error', () => {
    setTimeout(enter, 600);
  });

  video.addEventListener('ended', () => {
    if (!entered) enter();
  });

  setTimeout(() => {
    if (!entered && hint) hint.classList.add('visible');
  }, 3400);

  hero.addEventListener('click', (e) => {
    if (entered) return;
    if (e.target.closest('a, button')) return;
    enter();
  });

  window.addEventListener('scroll', () => {
    if (!entered && window.scrollY > 60) enter();
  }, { passive: true });

  document.addEventListener('keydown', (e) => {
    if (!entered && (e.key === 'Enter' || e.key === ' ')) {
      enter();
    }
  });
}

// 滚动观察
function initReveal() {
  const els = document.querySelectorAll(
    '.reveal:not(.visible), .sec-head, .exp-item, .proj-card, .work-card, .edu-item, .skill-card, .about-portrait, .about-body, .contact-grid, .ap-frame'
  );
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        e.target.classList.add('reveal');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
  els.forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
    obs.observe(el);
  });
}
window.initReveal = initReveal;
