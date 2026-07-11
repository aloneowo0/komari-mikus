(function() {
  'use strict';

  var CDN = 'https://cdn.jsdelivr.net/gh/aloneowo0/cf-monitor-mikus@main/public/dist/assets/img/';
  var MASCOT_URL = CDN + 'QWQ.webp';
  var LOGO_URL = CDN + 'miku.png';
  var LOLI_URL = CDN + 'loli.gif';
  var bannerClock = null;

  function injectKeyframes() {
    var style;
    if (document.getElementById('mikus-dynamic-keyframes')) return;
    style = document.createElement('style');
    style.id = 'mikus-dynamic-keyframes';
    style.textContent =
      '@keyframes mikusBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}' +
      '@keyframes mikusRipple{0%{transform:scale(0)}100%{transform:scale(4);opacity:0}}' +
      '@keyframes mikusBreath{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}' +
      '@keyframes mikusFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-20px) scale(1.05)}}';
    document.head.appendChild(style);
  }

  function applyPreloader() {
    var old, preloader, progress, stageIndex, stages, timer, hidden;
    old = document.getElementById('loading');
    if (!old || document.getElementById('mikus-preloader')) return;
    preloader = document.createElement('div');
    preloader.id = 'mikus-preloader';
    preloader.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#0f0a15;display:flex;align-items:center;justify-content:center;transition:opacity .6s ease,visibility .6s ease;';
    preloader.innerHTML =
      '<div style="display:flex;flex-direction:column;align-items:center;gap:24px;">' +
        '<img class="loli gif" src="' + LOLI_URL + '" alt="Loading" style="width:160px;height:160px;object-fit:contain;border-radius:12px;" onerror="this.style.display=\'none\'">' +
        '<div class="preloader-brand" style="display:flex;align-items:center;gap:12px;">' +
          '<img class="miku png" src="' + LOGO_URL + '" alt="Mikus" style="width:36px;height:36px;object-fit:contain;border-radius:8px;animation:mikusBreath 2s ease-in-out infinite;" onerror="this.style.display=\'none\'">' +
          '<span style="font-size:1.5rem;font-weight:700;letter-spacing:-.02em;background:linear-gradient(135deg,#f8f6f9 0%,#ff8fa3 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;">Mikus</span>' +
        '</div>' +
        '<div class="preloader-progress" style="display:flex;align-items:center;gap:12px;width:220px;">' +
          '<div class="progress-bar" style="flex:1;height:4px;background:#2d2040;border-radius:999px;overflow:hidden;">' +
            '<div class="progress-fill" id="mikusProgress" style="height:100%;width:0%;background:linear-gradient(90deg,#ffb7c5,#e8668a);border-radius:999px;transition:width .3s ease;"></div>' +
          '</div>' +
          '<span class="progress-text" id="mikusProgressText" style="min-width:34px;text-align:right;font:600 .75rem/1 Consolas,monospace;color:#b7a7c8;">0%</span>' +
        '</div>' +
        '<div class="preloader-status" id="mikusPreloaderStatus" style="font-size:.8rem;color:#b7a7c8;">正在加载资源...</div>' +
      '</div>';
    old.parentNode.replaceChild(preloader, old);

    progress = 0;
    stageIndex = 0;
    hidden = false;
    stages = [
      { target: 25, text: '正在加载样式...' },
      { target: 50, text: '正在获取配置...' },
      { target: 75, text: '正在加载节点...' },
      { target: 95, text: '正在初始化...' }
    ];
    timer = setInterval(function() {
      var bar = document.getElementById('mikusProgress');
      var text = document.getElementById('mikusProgressText');
      var status = document.getElementById('mikusPreloaderStatus');
      if (stageIndex >= stages.length) return;
      if (progress < stages[stageIndex].target) progress += 1;
      else stageIndex += 1;
      if (bar) bar.style.width = progress + '%';
      if (text) text.textContent = progress + '%';
      if (status && stages[Math.min(stageIndex, stages.length - 1)]) status.textContent = stages[Math.min(stageIndex, stages.length - 1)].text;
    }, 70);

    function hide() {
      var box = document.getElementById('mikus-preloader');
      var bar = document.getElementById('mikusProgress');
      var text = document.getElementById('mikusProgressText');
      if (hidden || !box) return;
      hidden = true;
      clearInterval(timer);
      if (bar) bar.style.width = '100%';
      if (text) text.textContent = '100%';
      setTimeout(function() {
        box.style.opacity = '0';
        box.style.visibility = 'hidden';
        setTimeout(function() { if (box.parentNode) box.parentNode.removeChild(box); }, 600);
      }, 300);
    }
    setTimeout(hide, 2200);
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function() { setTimeout(hide, 800); });
    else setTimeout(hide, 800);
  }

  function applyMascot() {
    var mascot, img;
    try {
      if (document.getElementById('mikus-mascot')) return;
      if (localStorage.getItem('mikus_nomascot') === '1' || window.location.search.indexOf('nomascot') !== -1) return;
      mascot = document.createElement('div');
      mascot.id = 'mikus-mascot';
      mascot.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9998;opacity:.55;cursor:pointer;transition:opacity .3s ease,transform .3s ease;';
      img = document.createElement('img');
      img.src = MASCOT_URL;
      img.width = 96;
      img.height = 96;
      img.alt = 'Mikus';
      img.style.cssText = 'width:96px;height:96px;object-fit:contain;filter:drop-shadow(0 8px 20px rgba(232,102,138,.45));animation:mikusBounce 2.4s ease-in-out infinite;';
      img.onerror = function() { if (mascot.parentNode) mascot.parentNode.removeChild(mascot); };
      mascot.appendChild(img);
      mascot.onmouseenter = function() { mascot.style.opacity = '1'; mascot.style.transform = 'scale(1.08)'; };
      mascot.onmouseleave = function() { mascot.style.opacity = '.55'; mascot.style.transform = 'scale(1)'; };
      mascot.onclick = function() { if (mascot.parentNode) mascot.parentNode.removeChild(mascot); localStorage.setItem('mikus_nomascot', '1'); };
      document.body.appendChild(mascot);
    } catch (e) {}
  }

  function applyBanner() {
    var filterBar, nav, banner, hour, greet;
    try {
      if (localStorage.getItem('mikus_nobanner') === '1') return;
      if (window.location.hash.indexOf('admin') !== -1 || window.location.hash.indexOf('server') !== -1) return;
      if (document.getElementById('mikus-banner')) return;
      filterBar = document.querySelector('.nav-area .filter-bar') || document.querySelector('.filter-bar');
      nav = document.querySelector('.nav-area');
      if (!filterBar && !nav) return;
      hour = new Date().getHours();
      greet = hour < 6 ? '凌晨好' : hour < 12 ? '早上好' : hour < 14 ? '中午好' : hour < 18 ? '下午好' : '晚上好';
      banner = document.createElement('div');
      banner.id = 'mikus-banner';
      banner.className = 'mikus-welcome';
      banner.innerHTML =
        '<div class="mikus-welcome-deco"><span class="mikus-deco mikus-deco-1"></span><span class="mikus-deco mikus-deco-2"></span><span class="mikus-deco mikus-deco-3"></span></div>' +
        '<div class="mikus-welcome-flex"><div class="mikus-welcome-greet">' +
          '<img class="mikus-greet-icon" src="' + MASCOT_URL + '" alt="Mikus" style="width:110px;height:110px;object-fit:contain;animation:mikusBounce 2.4s ease-in-out infinite;" onerror="this.style.display=\'none\'">' +
          '<div class="mikus-greet-info"><span class="mikus-greet-text">' + greet + '</span><span class="mikus-greet-sub">欢迎回来，一切正常运行中</span></div>' +
        '</div><div class="mikus-welcome-time"><span class="mikus-time-date" id="mikusDate"></span><span class="mikus-time-val" id="mikusTime"></span></div></div>';
      if (filterBar && filterBar.parentNode) filterBar.parentNode.insertBefore(banner, filterBar);
      else nav.appendChild(banner);
      updateClock();
      if (!bannerClock) bannerClock = setInterval(updateClock, 1000);
    } catch (e) {}
  }

  function applySakura() {
    var nav, wrap, i, petal, size;
    try {
      nav = document.querySelector('.nav-area');
      if (!nav || nav.querySelector('.mikus-sakura')) return;
      if (window.getComputedStyle && window.getComputedStyle(nav).position === 'static') nav.style.position = 'relative';
      wrap = document.createElement('div');
      wrap.className = 'mikus-sakura';
      wrap.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0;';
      for (i = 0; i < 14; i += 1) {
        petal = document.createElement('span');
        size = 8 + Math.random() * 8;
        petal.className = 'mikus-sakura-petal';
        petal.style.left = (Math.random() * 95) + '%';
        petal.style.top = '-' + (5 + Math.random() * 60) + 'px';
        petal.style.animationDelay = (Math.random() * 8) + 's';
        petal.style.animationDuration = (8 + Math.random() * 8) + 's';
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.opacity = 0.25 + Math.random() * 0.3;
        wrap.appendChild(petal);
      }
      nav.appendChild(wrap);
    } catch (e) {}
  }

  var navTimer = null;

  function waitForNav() {
    var observer;
    function arrange() {
      var nav, viewToggle, filterBar, headerRow, filterTag;
      if (window.location.hash.indexOf('admin') !== -1 || window.location.hash.indexOf('server') !== -1) return;
      nav = document.querySelector('.nav-area');
      if (!nav) return;
      applyBanner();
      applySakura();
      viewToggle = nav.querySelector('.view-toggle');
      filterBar = nav.querySelector('.filter-bar');
      headerRow = nav.querySelector('.header-row');
      if (viewToggle && filterBar && viewToggle.parentNode !== filterBar) filterBar.insertBefore(viewToggle, filterBar.firstChild);
      if (headerRow && headerRow.textContent.replace(/\s+/g, '') === '') headerRow.style.display = 'none';
      if (filterBar) {
        filterBar.style.justifyContent = 'space-between';
        filterTag = filterBar.querySelector('.filter-tag');
        if (filterTag) filterTag.style.marginLeft = 'auto';
      }
    }
    function debounced() {
      if (navTimer) return;
      navTimer = setTimeout(function() { navTimer = null; arrange(); }, 150);
    }
    try {
      arrange();
      observer = new MutationObserver(debounced);
      observer.observe(document.body, { childList: true, subtree: true });
    } catch (e) {}
  }

  function updateThemeColor() {
    var meta, color;
    try {
      color = document.body.classList.contains('light') ? '#f8f6f9' : '#0f0a15';
      meta = document.querySelector('meta[name="theme-color"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'theme-color';
        document.head.appendChild(meta);
      }
      meta.content = color;
    } catch (e) {}
  }

  function observeTheme() {
    var observer;
    try {
      updateThemeColor();
      observer = new MutationObserver(updateThemeColor);
      observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    } catch (e) {}
  }

  function applyRipple() {
    document.addEventListener('click', function(event) {
      var button, rect, size, ripple;
      if (!event.target.closest) return;
      button = event.target.closest('.btn, .toggle-btn, .filter-tag, .tab-btn, .time-btn, .lang-btn, .theme-btn');
      if (!button) return;
      if (!button.style.position) button.style.position = 'relative';
      if (!button.style.overflow) button.style.overflow = 'hidden';
      rect = button.getBoundingClientRect();
      size = Math.max(rect.width, rect.height) * 2;
      ripple = document.createElement('span');
      ripple.style.cssText = 'position:absolute;width:' + size + 'px;height:' + size + 'px;left:' + (event.clientX - rect.left - size / 2) + 'px;top:' + (event.clientY - rect.top - size / 2) + 'px;border-radius:50%;background:rgba(255,255,255,.35);pointer-events:none;transform:scale(0);animation:mikusRipple .6s ease-out;';
      button.appendChild(ripple);
      setTimeout(function() { if (ripple.parentNode) ripple.parentNode.removeChild(ripple); }, 600);
    });
  }

  function updateClock() {
    var now, date, time;
    now = new Date();
    date = document.getElementById('mikusDate');
    time = document.getElementById('mikusTime');
    if (date) date.textContent = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日';
    if (time) time.textContent = two(now.getHours()) + ':' + two(now.getMinutes()) + ':' + two(now.getSeconds());
  }

  function two(value) {
    return value < 10 ? '0' + value : String(value);
  }

  function applyFooterCredit() {
    var timer;
    function tryFooter() {
      var footer, version;
      footer = document.querySelector('.footer.status-bar');
      if (!footer || footer.querySelector('.mikus-done')) return false;
      version = footer.querySelector('span');
      footer.innerHTML = '<span>' + (version ? version.textContent : '') + '</span>' +
        '<span>Powered by <a href="https://github.com/huilang-me/CF-Server-Monitor" target="_blank">CF-Server-Monitor</a>' +
        '<span class="mikus-credit"> | Theme by <a href="https://github.com/mikus-loli/komari-mikus" target="_blank">komari-mikus</a>, ported by <a href="https://github.com/aloneowo0/cf-monitor-mikus" target="_blank">aloneowo</a></span></span>' +
        '<span class="mikus-done" style="display:none"></span>';
      return true;
    }
    timer = setInterval(function() {
      if (tryFooter()) clearInterval(timer);
    }, 400);
  }

  function init() {
    injectKeyframes();
    applyPreloader();
    document.documentElement.style.scrollBehavior = 'smooth';
    applyMascot();
    waitForNav();
    observeTheme();
    applyRipple();
    applyFooterCredit();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
