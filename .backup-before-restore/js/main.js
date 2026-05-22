// 入口
(function () {
  setTimeout(() => {
    const loader = document.getElementById('loader') || document.getElementById('ink-loader');
    if (loader) loader.classList.add('done');
  }, 2200);

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
})();

// 自定义光标（剑光）
function initCursor() {
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  if (isCoarse) return;
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  const trail = document.getElementById('cursorTrail');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });
  function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    tx += (mx - tx) * 0.08;
    ty += (my - ty) * 0.08;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    if (trail) trail.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  const hoverSel = 'a, button, .work-card, .proj-card, .skill-card, .tool-tag, [data-list-item], [data-editable], [data-editable-img], .filter-tab, .contact-card, .as-link, .exp-item, .edu-item';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSel)) {
      ring.classList.add('hover');
      dot.classList.add('hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest(hoverSel)) {
      ring.classList.remove('hover');
      dot.classList.remove('hover');
    }
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
  let ready = false;

  function markReady() {
    if (ready) return;
    ready = true;
    video.classList.add('ready');
  }

  function enter() {
    if (entered) return;
    entered = true;
    markReady(); // 进入文字模式时强制显示
    hero.classList.add('entered');
    video.loop = true;
    const p = video.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }

  // 多重就绪事件兜底
  ['canplay', 'loadeddata', 'loadedmetadata', 'playing'].forEach(ev => {
    video.addEventListener(ev, markReady, { once: true });
  });

  // 1.2 秒后无论如何先把视频显示出来（避免 autoplay 被拦时整片黑）
  setTimeout(markReady, 1200);

  // 视频加载失败 → 直接进入文字模式
  video.addEventListener('error', () => {
    setTimeout(() => { markReady(); enter(); }, 300);
  });

  // 视频播完一遍 → 自动进入文字模式
  video.addEventListener('ended', () => {
    if (!entered) enter();
  });

  // 1.6 秒后显示点击提示
  setTimeout(() => {
    if (!entered && hint) hint.classList.add('visible');
  }, 1600);

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

  // 主动尝试播放（某些环境 autoplay 属性不够，需手动触发）
  const tryPlay = () => {
    const p = video.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  };
  tryPlay();
  setTimeout(tryPlay, 300);

  // 终极兜底：8 秒内还没进入文字模式（如视频卡住、autoplay 被阻），自动进入
  setTimeout(() => {
    if (!entered) enter();
  }, 8000);
}

// 滚动观察 - 每次进出视口都触发动画（双向触发）
const REVEAL_SELECTOR = '.sec-head, .exp-item, .proj-card, .work-card, .edu-item, .skill-card, .about-portrait, .about-body, .contact-grid, .ap-frame, .tool-tag, .contact-card, .as-link, .about-list li, .hf-item, .reveal';

function initReveal() {
  // 仅创建一次 Observer，重复调用只追加新元素
  if (!window._revealEnterObs) {
    // 进入视口 -> 显示
    window._revealEnterObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -6% 0px'
    });

    // 完全离开视口 -> 复位（下次进入时会重新动画）
    window._revealExitObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) {
          e.target.classList.remove('visible');
        }
      });
    }, {
      threshold: 0,
      rootMargin: '80px 0px 80px 0px'
    });
  }

  document.querySelectorAll(REVEAL_SELECTOR).forEach(el => {
    if (el.dataset.revealBound === '1') return;
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
    el.dataset.revealBound = '1';
    window._revealEnterObs.observe(el);
    window._revealExitObs.observe(el);
  });
}
window.initReveal = initReveal;
