(function() {
  'use strict';
  var style, script, canvas, mascot, meta, observer, size, ripple, rect, s;

  function applySakura() {
    var nav, petals, i, p;
    try {
      nav = document.querySelector('.nav-area');
      if (!nav) return;
      if (nav.querySelector('.mikus-sakura')) return;
      petals = document.createElement('div');
      petals.className = 'mikus-sakura';
      for (i = 0; i < 14; i++) {
        p = document.createElement('span');
        p.className = 'mikus-sakura-petal';
        p.style.left = (Math.random() * 95) + '%';
        p.style.top = '-' + (5 + Math.random() * 60) + 'px';
        p.style.animationDelay = (Math.random() * 8) + 's';
        p.style.animationDuration = (8 + Math.random() * 8) + 's';
        p.style.width = (8 + Math.random() * 8) + 'px';
        p.style.height = p.style.width;
        p.style.opacity = (0.25 + Math.random() * 0.3);
        petals.appendChild(p);
      }
      nav.appendChild(petals);
    } catch(e) {}
  }

  var CDN = 'https://cdn.jsdelivr.net/gh/aloneowo0/komari-mikus@main/public/dist/assets/img/';
  var MASCOT_URL = CDN + 'QWQ.webp';
  var LOGO_URL = CDN + 'miku.png';
  var LOLI_URL = CDN + 'loli.gif';

  function applyMascot() {
    try {
      if (localStorage.getItem('mikus_nomascot') === '1') return;
      if (window.location.search.indexOf('nomascot') !== -1) return;
      mascot = document.createElement('div');
      mascot.id = 'mikus-mascot';
      mascot.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9998;opacity:0.55;transition:opacity 0.3s ease,transform 0.3s ease;cursor:pointer;';
      mascot.innerHTML = '<img src="' + MASCOT_URL + '" alt="" style="width:96px;height:96px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(232,102,138,0.45));animation:mikusBounce 2.4s ease-in-out infinite;" onerror="this.parentElement.remove()">';
      mascot.addEventListener('mouseenter', function() { mascot.style.opacity = '1'; mascot.style.transform = 'scale(1.08)'; });
      mascot.addEventListener('mouseleave', function() { mascot.style.opacity = '0.55'; mascot.style.transform = 'scale(1)'; });
      mascot.addEventListener('click', function() { mascot.remove(); localStorage.setItem('mikus_nomascot', '1'); });
      document.body.appendChild(mascot);
    } catch(e) {}
  }

  function applyBanner() {
    var existing, filterBar, nav, banner, hr, greet, tick;
    try {
      if (localStorage.getItem('mikus_nobanner') === '1') return;
      if (window.location.hash.indexOf('admin') !== -1) return;
      if (window.location.hash.indexOf('server') !== -1) return;
      existing = document.getElementById('mikus-banner');
      if (existing) return;
      filterBar = document.querySelector('.filter-bar');
      nav = document.querySelector('.nav-area');
      if (!filterBar && !nav) return;
      banner = document.createElement('div');
      banner.id = 'mikus-banner';
      banner.className = 'mikus-welcome';
      hr = new Date().getHours();
      greet = hr < 6 ? '凌晨好' : hr < 12 ? '早上好' : hr < 14 ? '中午好' : hr < 18 ? '下午好' : '晚上好';
      banner.innerHTML =
        '<div class="mikus-welcome-deco"><span class="mikus-deco mikus-deco-1"></span><span class="mikus-deco mikus-deco-2"></span><span class="mikus-deco mikus-deco-3"></span></div>' +
        '<div class="mikus-welcome-flex">' +
          '<div class="mikus-welcome-greet">' +
            '<img class="mikus-greet-icon" src="' + MASCOT_URL + '" alt="" onerror="this.style.display=\'none\'">' +
            '<div class="mikus-greet-info"><span class="mikus-greet-text">' + greet + '</span><span class="mikus-greet-sub">欢迎回来，一切正常运行中</span></div>' +
          '</div>' +
          '<div class="mikus-welcome-time"><span class="mikus-time-date" id="mikusDate"></span><span class="mikus-time-val" id="mikusTime"></span></div>' +
        '</div>';
      if (filterBar && filterBar.parentNode) {
        filterBar.parentNode.insertBefore(banner, filterBar);
      } else if (nav) {
        nav.appendChild(banner);
      } else {
        document.body.appendChild(banner);
      }
      tick = function() {
        var d = new Date();
        var dt = document.getElementById('mikusDate');
        var tv = document.getElementById('mikusTime');
        if (dt) dt.textContent = d.getFullYear() + '年' + (d.getMonth()+1) + '月' + d.getDate() + '日';
        if (tv) tv.textContent = String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0') + ':' + String(d.getSeconds()).padStart(2,'0');
      };
      tick();
      setInterval(tick, 1000);
    } catch(e) { try { console.warn('[mikus] banner fail:', e && e.message); } catch(_) {} }
  }

  function applyPreloader() {
    var old, parent, mk, progress, stages, si, timer, hide;
    try {
      old = document.getElementById('loading');
      if (!old) return;
      parent = old.parentNode;
      if (parent.getElementById && parent.getElementById('mikus-preloader')) return;
      mk = document.createElement('div');
      mk.id = 'mikus-preloader';
      mk.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#0f0a15;display:flex;align-items:center;justify-content:center;transition:opacity 0.6s ease,visibility 0.6s ease;';
      mk.innerHTML =
        '<div style="display:flex;flex-direction:column;align-items:center;gap:24px;">' +
          '<img src="' + LOLI_URL + '" alt="Loading" style="width:160px;height:160px;object-fit:contain;border-radius:12px;" onerror="this.style.display=\'none\'">' +
          '<div style="display:flex;align-items:center;gap:12px;">' +
            '<img src="' + LOGO_URL + '" alt="Logo" style="width:36px;height:36px;border-radius:8px;object-fit:contain;animation:mikusBreath 2s ease-in-out infinite;" onerror="this.style.display=\'none\'">' +
            '<span style="font-size:1.4rem;font-weight:700;background:linear-gradient(135deg,#e8dff0 0%,#ff8fa3 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Mikus</span>' +
          '</div>' +
          '<div style="display:flex;align-items:center;gap:12px;width:220px;">' +
            '<div style="flex:1;height:4px;background:#2d2040;border-radius:2px;overflow:hidden;"><div id="mikusProgress" style="height:100%;width:0;background:linear-gradient(90deg,#ffb7c5,#e8668a);border-radius:2px;transition:width 0.3s ease;"></div></div>' +
            '<span id="mikusProgressText" style="font-size:0.75rem;font-weight:600;color:#7a6b8a;font-family:SF Mono,Consolas,monospace;min-width:32px;text-align:right;">0%</span>' +
          '</div>' +
          '<div id="mikusPreloaderStatus" style="font-size:0.8rem;color:#7a6b8a;">正在加载资源...</div>' +
        '</div>';
      parent.replaceChild(mk, old);
      progress = 0;
      stages = [
        { target: 25, text: '正在加载样式...' },
        { target: 50, text: '正在获取配置...' },
        { target: 75, text: '正在加载节点...' },
        { target: 95, text: '正在初始化...' }
      ];
      si = 0;
      timer = setInterval(function() {
        var bar = document.getElementById('mikusProgress');
        var txt = document.getElementById('mikusProgressText');
        var st = document.getElementById('mikusPreloaderStatus');
        if (si >= stages.length) { clearInterval(timer); return; }
        if (progress < stages[si].target) {
          progress += 1;
          if (bar) bar.style.width = progress + '%';
          if (txt) txt.textContent = progress + '%';
          if (st) st.textContent = stages[si].text;
        } else { si++; }
      }, 70);
      hide = function() {
        var p = document.getElementById('mikus-preloader');
        var bar = document.getElementById('mikusProgress');
        var txt = document.getElementById('mikusProgressText');
        if (!p) return;
        if (bar) bar.style.width = '100%';
        if (txt) txt.textContent = '100%';
        setTimeout(function() {
          p.style.opacity = '0';
          p.style.visibility = 'hidden';
          setTimeout(function() { if (p && p.parentNode) p.remove(); }, 600);
        }, 300);
        clearInterval(timer);
      };
      setTimeout(hide, 2200);
      document.addEventListener('DOMContentLoaded', function() { setTimeout(hide, 800); });
    } catch(e) {}
  }

  function updateThemeColor() {
    var isLight, color;
    try {
      isLight = document.body.classList.contains('light');
      color = isLight ? '#f8f6f9' : '#0f0a15';
      meta = document.querySelector('meta[name="theme-color"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'theme-color';
        document.head.appendChild(meta);
      }
      meta.content = color;
    } catch(e) {}
  }

  function observeTheme() {
    try {
      updateThemeColor();
      observer = new MutationObserver(function() { updateThemeColor(); });
      observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    } catch(e) {}
  }

  function applyRipple() {
    try {
      document.addEventListener('click', function(e) {
        var btn = e.target.closest('.btn, .toggle-btn, .filter-tag, .tab-btn, .time-btn, .lang-btn, .theme-btn');
        if (!btn) return;
        btn.style.position = btn.style.position || 'relative';
        btn.style.overflow = btn.style.overflow || 'hidden';
        rect = btn.getBoundingClientRect();
        size = Math.max(rect.width, rect.height) * 2;
        ripple = document.createElement('span');
        ripple.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,0.3);transform:scale(0);animation:mikusRipple 0.6s ease-out;pointer-events:none;width:' + size + 'px;height:' + size + 'px;left:' + (e.clientX - rect.left - size/2) + 'px;top:' + (e.clientY - rect.top - size/2) + 'px;';
        btn.appendChild(ripple);
        setTimeout(function() { ripple.remove(); }, 600);
      });
    } catch(e) {}
  }

  function injectKeyframes() {
    try {
      s = document.createElement('style');
      s.id = 'mikus-dynamic-keyframes';
      s.textContent = '@keyframes mikusBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes mikusRipple{to{transform:scale(4);opacity:0}}@keyframes mikusBreath{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}@keyframes mikusFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-20px) scale(1.05)}}';
      document.head.appendChild(s);
    } catch(e) {}
  }

  function waitForNav() {
    var mo;
    function tryBoth() {
      var vt, fb, hr, ftag;
      if (!document.querySelector('.nav-area')) return;
      applyBanner();
      applySakura();
      vt = document.querySelector('.nav-area .view-toggle');
      fb = document.querySelector('.nav-area .filter-bar');
      if (vt && fb && vt.parentNode !== fb) {
        fb.insertBefore(vt, fb.firstChild);
        vt.style.marginRight = '12px';
        hr = document.querySelector('.nav-area .header-row');
        if (hr && !hr.textContent.trim()) hr.style.display = 'none';
      }
      if (fb) {
        fb.style.justifyContent = 'space-between';
        ftag = fb.querySelector('.filter-tag');
        if (ftag && ftag.previousElementSibling && ftag.previousElementSibling.className.indexOf('view-toggle') >= 0) {
          ftag.style.marginLeft = 'auto';
        }
      }
    }
    try {
      tryBoth();
      mo = new MutationObserver(function() { tryBoth(); });
      mo.observe(document.body, { childList: true, subtree: true });
    } catch(e) {}
  }

  function init() {
    var creditTimer;
    injectKeyframes();
    applyPreloader();
    document.documentElement.style.scrollBehavior = 'smooth';
    applyMascot();
    waitForNav();
    observeTheme();
    applyRipple();
    creditTimer = setInterval(function() {
      var ft, ver;
      ft = document.querySelector('.footer.status-bar');
      if (ft && !ft.querySelector('.mikus-done')) {
        ver = ft.querySelector('span');
        ft.innerHTML = '<span>' + (ver ? ver.textContent : '') + '</span>'
          + '<span>Powered by <a href=\"https://github.com/huilang-me/CF-Server-Monitor\" target=\"_blank\">CF-Server-Monitor</a>'
          + '<span class=\"mikus-credit\"> | Theme by komari-mikus, ported by aloneowo</span></span>'
          + '<span class=\"mikus-done\" style=\"display:none\"></span>';
      }
    }, 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
