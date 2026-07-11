(function () {
  'use strict';

  var CDN = 'https://cdn.jsdelivr.net/gh/aloneowo0/cf-monitor-mikus@main/public/dist/assets/img/';
  var MASCOT_URL = CDN + 'QWQ.webp';
  var LOGO_URL = CDN + 'miku.png';
  var LOLI_URL = CDN + 'loli.gif';
  var bannerTimer;

  function applySakura(nav) {
    var petals, i, petal;
    try {
      if (!nav || nav.querySelector('.mikus-sakura')) return;
      petals = document.createElement('div');
      petals.className = 'mikus-sakura';
      for (i = 0; i < 14; i++) {
        petal = document.createElement('span');
        petal.className = 'mikus-sakura-petal';
        petal.style.left = (Math.random() * 95) + '%';
        petal.style.top = '-' + (5 + Math.random() * 60) + 'px';
        petal.style.animationDelay = (Math.random() * 8) + 's';
        petal.style.animationDuration = (8 + Math.random() * 8) + 's';
        petal.style.width = (8 + Math.random() * 8) + 'px';
        petal.style.height = petal.style.width;
        petal.style.opacity = 0.25 + Math.random() * 0.3;
        petals.appendChild(petal);
      }
      nav.appendChild(petals);
    } catch (e) {}
  }

  function applyMascot() {
    var mascot;
    try {
      if (localStorage.getItem('mikus_nomascot') === '1' || window.location.search.indexOf('nomascot') !== -1) return;
      mascot = document.createElement('div');
      mascot.id = 'mikus-mascot';
      mascot.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9998;opacity:0.55;transition:opacity 0.3s ease,transform 0.3s ease;cursor:pointer;';
      mascot.innerHTML = '<img src="' + MASCOT_URL + '" alt="" style="width:96px;height:96px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(232,102,138,0.45));animation:mikusBounce 2.4s ease-in-out infinite;" onerror="this.parentElement.remove()">';
      mascot.addEventListener('mouseenter', function () { mascot.style.opacity = '1'; mascot.style.transform = 'scale(1.08)'; });
      mascot.addEventListener('mouseleave', function () { mascot.style.opacity = '0.55'; mascot.style.transform = 'scale(1)'; });
      mascot.addEventListener('click', function () { mascot.remove(); localStorage.setItem('mikus_nomascot', '1'); });
      document.body.appendChild(mascot);
    } catch (e) {}
  }

  function updateBannerClock() {
    var date = new Date();
    var dateElement = document.getElementById('mikusDate');
    var timeElement = document.getElementById('mikusTime');
    if (dateElement) dateElement.textContent = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
    if (timeElement) timeElement.textContent = String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0') + ':' + String(date.getSeconds()).padStart(2, '0');
  }

  function clearBannerClock() {
    if (bannerTimer) {
      clearInterval(bannerTimer);
      bannerTimer = null;
    }
  }

  function applyBanner(nav) {
    var filterBar, banner, hour, greeting;
    try {
      if (localStorage.getItem('mikus_nobanner') === '1' || window.location.hash.indexOf('admin') !== -1 || window.location.hash.indexOf('server') !== -1) return;
      if (document.getElementById('mikus-banner')) return;
      filterBar = nav.querySelector('.filter-bar');
      banner = document.createElement('div');
      banner.id = 'mikus-banner';
      banner.className = 'mikus-welcome';
      hour = new Date().getHours();
      greeting = hour < 6 ? '凌晨好' : hour < 12 ? '早上好' : hour < 14 ? '中午好' : hour < 18 ? '下午好' : '晚上好';
      banner.innerHTML =
        '<div class="mikus-welcome-deco"><span class="mikus-deco mikus-deco-1"></span><span class="mikus-deco mikus-deco-2"></span><span class="mikus-deco mikus-deco-3"></span></div>' +
        '<div class="mikus-welcome-flex"><div class="mikus-welcome-greet">' +
        '<img class="mikus-greet-icon" src="' + MASCOT_URL + '" alt="" onerror="this.style.display=\'none\'">' +
        '<div class="mikus-greet-info"><span class="mikus-greet-text">' + greeting + '</span><span class="mikus-greet-sub">欢迎回来，一切正常运行中</span></div>' +
        '</div><div class="mikus-welcome-time"><span class="mikus-time-date" id="mikusDate"></span><span class="mikus-time-val" id="mikusTime"></span></div></div>';
      if (filterBar) filterBar.parentNode.insertBefore(banner, filterBar);
      else nav.appendChild(banner);
      updateBannerClock();
      clearBannerClock();
      bannerTimer = setInterval(updateBannerClock, 1000);
    } catch (e) { try { console.warn('[mikus] banner fail:', e && e.message); } catch (_) {} }
  }

  function applyPreloader() {
    var loading, preloader, progress, stages, stageIndex, timer, hide;
    try {
      loading = document.getElementById('loading');
      if (!loading || document.getElementById('mikus-preloader')) return;
      preloader = document.createElement('div');
      preloader.id = 'mikus-preloader';
      preloader.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#0f0a15;display:flex;align-items:center;justify-content:center;transition:opacity 0.6s ease,visibility 0.6s ease;';
      preloader.innerHTML =
        '<div style="display:flex;flex-direction:column;align-items:center;gap:24px;">' +
        '<img src="' + LOLI_URL + '" alt="Loading" style="width:160px;height:160px;object-fit:contain;border-radius:12px;" onerror="this.style.display=\'none\'">' +
        '<div style="display:flex;align-items:center;gap:12px;"><img src="' + LOGO_URL + '" alt="Logo" style="width:36px;height:36px;border-radius:8px;object-fit:contain;animation:mikusBreath 2s ease-in-out infinite;" onerror="this.style.display=\'none\'">' +
        '<span style="font-size:1.4rem;font-weight:700;background:linear-gradient(135deg,#e8dff0 0%,#ff8fa3 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Mikus</span></div>' +
        '<div style="display:flex;align-items:center;gap:12px;width:220px;"><div style="flex:1;height:4px;background:#2d2040;border-radius:2px;overflow:hidden;"><div id="mikusProgress" style="height:100%;width:0;background:linear-gradient(90deg,#ffb7c5,#e8668a);border-radius:2px;transition:width 0.3s ease;"></div></div>' +
        '<span id="mikusProgressText" style="font-size:0.75rem;font-weight:600;color:#7a6b8a;font-family:SF Mono,Consolas,monospace;min-width:32px;text-align:right;">0%</span></div>' +
        '<div id="mikusPreloaderStatus" style="font-size:0.8rem;color:#7a6b8a;">正在加载资源...</div></div>';
      loading.parentNode.replaceChild(preloader, loading);
      progress = 0;
      stages = [{ target: 25, text: '正在加载样式...' }, { target: 50, text: '正在获取配置...' }, { target: 75, text: '正在加载节点...' }, { target: 95, text: '正在初始化...' }];
      stageIndex = 0;
      timer = setInterval(function () {
        var bar = document.getElementById('mikusProgress');
        var text = document.getElementById('mikusProgressText');
        var status = document.getElementById('mikusPreloaderStatus');
        if (stageIndex >= stages.length) return clearInterval(timer);
        if (progress < stages[stageIndex].target) {
          progress++;
          if (bar) bar.style.width = progress + '%';
          if (text) text.textContent = progress + '%';
          if (status) status.textContent = stages[stageIndex].text;
        } else stageIndex++;
      }, 70);
      hide = function () {
        var activePreloader = document.getElementById('mikus-preloader');
        var bar = document.getElementById('mikusProgress');
        var text = document.getElementById('mikusProgressText');
        if (!activePreloader) return;
        if (bar) bar.style.width = '100%';
        if (text) text.textContent = '100%';
        setTimeout(function () {
          activePreloader.style.opacity = '0';
          activePreloader.style.visibility = 'hidden';
          setTimeout(function () { if (activePreloader.parentNode) activePreloader.remove(); }, 600);
        }, 300);
        clearInterval(timer);
      };
      setTimeout(hide, 2200);
    } catch (e) {}
  }

  function updateThemeColor() {
    var meta;
    try {
      meta = document.querySelector('meta[name="theme-color"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'theme-color';
        document.head.appendChild(meta);
      }
      meta.content = document.body.classList.contains('light') ? '#f8f6f9' : '#0f0a15';
    } catch (e) {}
  }

  function observeTheme() {
    try {
      updateThemeColor();
      new MutationObserver(updateThemeColor).observe(document.body, { attributes: true, attributeFilter: ['class'] });
    } catch (e) {}
  }

  function applyRipple() {
    try {
      document.addEventListener('click', function (event) {
        var button = event.target.closest('.btn, .toggle-btn, .filter-tag, .tab-btn, .time-btn, .lang-btn, .theme-btn');
        var rect, size, ripple;
        if (!button) return;
        button.style.position = button.style.position || 'relative';
        button.style.overflow = button.style.overflow || 'hidden';
        rect = button.getBoundingClientRect();
        size = Math.max(rect.width, rect.height) * 2;
        ripple = document.createElement('span');
        ripple.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,0.3);transform:scale(0);animation:mikusRipple 0.6s ease-out;pointer-events:none;width:' + size + 'px;height:' + size + 'px;left:' + (event.clientX - rect.left - size / 2) + 'px;top:' + (event.clientY - rect.top - size / 2) + 'px;';
        button.appendChild(ripple);
        setTimeout(function () { ripple.remove(); }, 600);
      });
    } catch (e) {}
  }

  function injectKeyframes() {
    var style;
    try {
      if (document.getElementById('mikus-dynamic-keyframes')) return;
      style = document.createElement('style');
      style.id = 'mikus-dynamic-keyframes';
      style.textContent = '@keyframes mikusBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes mikusRipple{to{transform:scale(4);opacity:0}}@keyframes mikusBreath{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}@keyframes mikusFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-20px) scale(1.05)}}';
      document.head.appendChild(style);
    } catch (e) {}
  }

  function applyFooterCredit() {
    var footer, version;
    footer = document.querySelector('.footer.status-bar');
    if (!footer || footer.querySelector('.mikus-done')) return;
    version = footer.querySelector('span');
    footer.innerHTML = '<span>' + (version ? version.textContent : '') + '</span>' +
      '<span>Powered by <a href="https://github.com/huilang-me/CF-Server-Monitor" target="_blank">CF-Server-Monitor</a>' +
      '<span class="mikus-credit"> | Theme by <a href="https://github.com/mikus-loli/komari-mikus" target="_blank">komari-mikus</a>, ported by <a href="https://github.com/aloneowo0/cf-monitor-mikus" target="_blank">aloneowo</a></span></span>' +
      '<span class="mikus-done" style="display:none"></span>';
  }

  function syncPage() {
    var nav = document.querySelector('.nav-area');
    var viewToggle, filterBar, headerRow, firstFilter;
    applyFooterCredit();
    if (!nav) return clearBannerClock();
    applyBanner(nav);
    applySakura(nav);
    viewToggle = nav.querySelector('.view-toggle');
    filterBar = nav.querySelector('.filter-bar');
    if (viewToggle && filterBar && viewToggle.parentNode !== filterBar) {
      filterBar.insertBefore(viewToggle, filterBar.firstChild);
      viewToggle.style.marginRight = '12px';
      headerRow = nav.querySelector('.header-row');
      if (headerRow && !headerRow.textContent.trim()) headerRow.style.display = 'none';
    }
    if (filterBar) {
      filterBar.style.justifyContent = 'space-between';
      firstFilter = filterBar.querySelector('.filter-tag');
      if (firstFilter && firstFilter.previousElementSibling && firstFilter.previousElementSibling.className.indexOf('view-toggle') >= 0) firstFilter.style.marginLeft = 'auto';
    }
  }

  function init() {
    injectKeyframes();
    applyPreloader();
    document.documentElement.style.scrollBehavior = 'smooth';
    applyMascot();
    syncPage();
    new MutationObserver(syncPage).observe(document.body, { childList: true, subtree: true });
    observeTheme();
    applyRipple();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
