(function() {
  'use strict';

  if (window.__mikusThemeEntryLoaded) return;
  window.__mikusThemeEntryLoaded = true;

  var CORE_URL = 'https://cdn.jsdelivr.net/gh/aloneowo0/cf-monitor-mikus@9134078d892b267edd6e4a6a82fbf6802fec124a/theme-mikus-new/custom_script.js';
  var routeTimer = null;
  var serverWatch = null;
  var serverWatchStopTimer = null;

  function injectLowPowerStyles() {
    var style = document.getElementById('mikus-low-power-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'mikus-low-power-style';
      document.head.appendChild(style);
    }

    style.textContent =
      ':root{' +
        '--glass-blur:5px!important;' +
        '--glass-blur-light:0px!important;' +
        '--glass-saturate:1!important;' +
        '--mikus-surface:rgba(30,21,48,.28);' +
        '--mikus-surface-strong:rgba(38,28,58,.42);' +
        '--mikus-surface-soft:rgba(30,21,48,.14);' +
        '--mikus-dashboard-card:rgba(30,21,48,.48);' +
        '--mikus-admin-surface:rgba(24,17,39,.72);' +
        '--mikus-admin-surface-soft:rgba(30,21,48,.52);' +
        '--mikus-admin-table-head:rgba(32,23,50,.76);' +
        '--mikus-admin-table-row:rgba(27,19,43,.44);' +
        '--mikus-admin-table-row-alt:rgba(35,25,54,.52);' +
        '--mikus-admin-table-row-hover:rgba(45,32,67,.68);' +
      '}' +
      'body.light{' +
        '--mikus-surface:rgba(255,255,255,.38);' +
        '--mikus-surface-strong:rgba(255,255,255,.56);' +
        '--mikus-surface-soft:rgba(255,255,255,.18);' +
        '--mikus-dashboard-card:rgba(255,255,255,.62);' +
        '--mikus-admin-surface:rgba(255,255,255,.86);' +
        '--mikus-admin-surface-soft:rgba(255,255,255,.68);' +
        '--mikus-admin-table-head:rgba(247,244,249,.78);' +
        '--mikus-admin-table-row:rgba(255,255,255,.48);' +
        '--mikus-admin-table-row-alt:rgba(248,244,251,.56);' +
        '--mikus-admin-table-row-hover:rgba(255,255,255,.70);' +
      '}' +
      'body::after{display:block!important;opacity:.28!important;}' +
      '.server-card,.chart-card,.host-card,.settings-section,.table-container,.table-wrapper,.footer,.main-panel,.panel-header,.tab-content,.admin-loading-overlay,.quota-section,.disabled-container,.user-menu-dropdown,.map-wrapper,.status-bar,.global-stats,.stats-grid,.view-toggle,.modal-overlay,.settings-grid,.ping-panel,.time-selector,.tabs{' +
        'backdrop-filter:none!important;-webkit-backdrop-filter:none!important;' +
      '}' +
      '.main-panel,.panel-header,.tab-content,.table-wrapper,.settings-grid,.status-bar{' +
        'background:transparent!important;' +
        'box-shadow:none!important;' +
      '}' +
      '.server-card,.chart-card,.host-card,.settings-section,.table-container,.footer,.quota-section,.disabled-container,.user-menu-dropdown,.map-wrapper{' +
        'background:var(--mikus-surface)!important;' +
        'box-shadow:inset 0 1px 0 rgba(255,255,255,.04),var(--mikus-shadow-card)!important;' +
      '}' +
      'html.mikus-dashboard .server-card{' +
        'background:var(--mikus-dashboard-card)!important;' +
      '}' +
      '.admin-loading-overlay{' +
        'background:var(--mikus-surface-strong)!important;' +
      '}' +
      '.global-stats,.stats-grid,.view-toggle,.ping-panel,.time-selector,.tabs{' +
        'background:var(--mikus-surface-strong)!important;' +
      '}' +
      '.nav-area,.terminal-header,.modal-dialog{' +
        'background:var(--mikus-surface-soft)!important;' +
        'backdrop-filter:blur(5px)!important;-webkit-backdrop-filter:blur(5px)!important;' +
      '}' +
      '.modal-dialog{' +
        'background:var(--mikus-surface)!important;' +
      '}' +
      '.modal-overlay{background:rgba(0,0,0,.34)!important;}' +
      'html.mikus-admin-servers .table-wrapper,' +
      'html.mikus-admin-servers .servers-grid{' +
        'background:var(--mikus-admin-surface-soft)!important;' +
        'box-shadow:inset 0 1px 0 rgba(255,255,255,.045),var(--mikus-shadow-card)!important;' +
      '}' +
      'html.mikus-admin-servers .table-container,' +
      'html.mikus-admin-servers .server-card,' +
      'html.mikus-admin-servers .host-card{' +
        'background:var(--mikus-admin-surface)!important;' +
        'box-shadow:inset 0 1px 0 rgba(255,255,255,.055),var(--mikus-shadow-card)!important;' +
      '}' +
      'html.mikus-admin-servers table thead th{' +
        'background:var(--mikus-admin-table-head)!important;' +
        'backdrop-filter:none!important;-webkit-backdrop-filter:none!important;' +
      '}' +
      'html.mikus-admin-servers table tbody td{' +
        'background:var(--mikus-admin-table-row)!important;' +
        'backdrop-filter:none!important;-webkit-backdrop-filter:none!important;' +
      '}' +
      'html.mikus-admin-servers table tbody tr:nth-child(even) td{' +
        'background:var(--mikus-admin-table-row-alt)!important;' +
      '}' +
      'html.mikus-admin-servers table tbody tr:hover td{' +
        'background:var(--mikus-admin-table-row-hover)!important;' +
      '}' +
      '.nav-area{animation-duration:18s!important;}' +
      '.nav-area::before{animation-duration:14s!important;}' +
      '.nav-area::after{animation-duration:18s!important;}' +
      '#mikus-mascot img{animation-duration:4.8s!important;filter:drop-shadow(0 4px 10px rgba(232,102,138,.28))!important;}' +
      '.mikus-sakura-petal{animation-duration:18s!important;}' +
      '.server-card,.chart-card,.host-card,.filter-tag,.stat-item,.stat-card,.sysinfo-item{' +
        'transition:transform .2s ease,border-color .2s ease,background-color .2s ease,box-shadow .2s ease!important;' +
      '}' +
      '@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;}.nav-area,.nav-area::before,.nav-area::after,#mikus-mascot img,.mikus-sakura-petal{animation-duration:1ms!important;animation-iteration-count:1!important;}}';
  }

  function isServerTableVisible() {
    var headers, i, text;
    headers = document.querySelectorAll('table thead th, table th');
    for (i = 0; i < headers.length; i += 1) {
      text = (headers[i].textContent || '').replace(/\s+/g, '').toLowerCase();
      if (text.indexOf('主机名') !== -1 || text.indexOf('hostname') !== -1) return true;
    }
    return false;
  }

  function updateRouteClasses() {
    var hash = (window.location.hash || '').toLowerCase();
    var isAdmin = hash.indexOf('admin') !== -1;
    var isDashboard = hash === '' || hash === '#' || hash === '#/';
    var isAdminServers = isAdmin && (
      hash.indexOf('server') !== -1 ||
      hash.indexOf('host') !== -1 ||
      isServerTableVisible()
    );
    document.documentElement.classList.toggle('mikus-dashboard', isDashboard);
    document.documentElement.classList.toggle('mikus-admin-servers', isAdminServers);
    return isAdminServers;
  }

  function scheduleRouteUpdate() {
    if (routeTimer) clearTimeout(routeTimer);
    routeTimer = setTimeout(function() {
      routeTimer = null;
      updateRouteClasses();
    }, 80);
  }

  function stopServerTableWatch() {
    if (serverWatch) {
      serverWatch.disconnect();
      serverWatch = null;
    }
    if (serverWatchStopTimer) {
      clearTimeout(serverWatchStopTimer);
      serverWatchStopTimer = null;
    }
  }

  function watchForServerTable() {
    var target;
    stopServerTableWatch();
    if (updateRouteClasses()) return;

    target = document.getElementById('app') || document.body;
    if (!target || !window.MutationObserver) return;

    serverWatch = new MutationObserver(function() {
      if (updateRouteClasses()) stopServerTableWatch();
    });
    serverWatch.observe(target, { childList: true, subtree: true });

    serverWatchStopTimer = setTimeout(stopServerTableWatch, 10000);
  }

  function injectBannerCorrection() {
    var style = document.getElementById('mikus-banner-position-correction');
    if (!style) {
      style = document.createElement('style');
      style.id = 'mikus-banner-position-correction';
      document.head.appendChild(style);
    }

    style.textContent =
      '.nav-area .header-row{margin-bottom:10px!important;}' +
      '.nav-area .filter-bar{margin-top:16px!important;}' +
      '#mikus-banner.mikus-welcome{margin:8px 0 0!important;padding:2px 0 4px!important;overflow:visible!important;}' +
      '#mikus-banner .mikus-welcome-flex{min-height:0!important;align-items:center!important;}' +
      '#mikus-banner .mikus-welcome-greet{position:relative!important;min-height:0!important;padding-left:0!important;gap:6px!important;overflow:visible!important;}' +
      '#mikus-banner .mikus-greet-icon{position:relative!important;width:140px!important;height:140px!important;left:auto!important;top:auto!important;margin:-18px -8px -16px -26px!important;flex:0 0 140px!important;z-index:3!important;pointer-events:none;}' +
      '#mikus-banner .mikus-greet-info{gap:3px!important;}' +
      '#mikus-banner .mikus-greet-text{font-size:1.5rem!important;line-height:1.16!important;}' +
      '#mikus-banner .mikus-greet-sub{font-size:.91rem!important;line-height:1.4!important;}' +
      '#mikus-banner .mikus-welcome-time{gap:2px!important;}' +
      '#mikus-banner .mikus-time-date{font-size:.91rem!important;line-height:1.3!important;}' +
      '#mikus-banner .mikus-time-val{font-size:1.58rem!important;line-height:1.12!important;}' +
      '@media(max-width:768px){' +
        '.nav-area .filter-bar{margin-top:12px!important;}' +
        '#mikus-banner.mikus-welcome{margin-top:5px!important;padding-bottom:3px!important;}' +
        '#mikus-banner .mikus-welcome-greet{padding-left:0!important;gap:4px!important;}' +
        '#mikus-banner .mikus-greet-icon{width:96px!important;height:96px!important;left:auto!important;top:auto!important;margin:-10px -5px -8px -18px!important;flex-basis:96px!important;}' +
        '#mikus-banner .mikus-greet-text{font-size:1.2rem!important;}' +
        '#mikus-banner .mikus-greet-sub{font-size:.82rem!important;}' +
        '#mikus-banner .mikus-time-date{font-size:.82rem!important;}' +
        '#mikus-banner .mikus-time-val{font-size:1.18rem!important;}' +
      '}' +
      '@media(max-width:520px){' +
        '#mikus-banner .mikus-greet-icon{width:88px!important;height:88px!important;margin:-8px -5px -6px -16px!important;flex-basis:88px!important;}' +
      '}';
  }

  function loadCore() {
    var script;
    if (window.__mikusThemeCoreLoading) {
      injectBannerCorrection();
      return;
    }
    window.__mikusThemeCoreLoading = true;
    script = document.createElement('script');
    script.src = CORE_URL;
    script.async = false;
    script.onload = function() {
      injectBannerCorrection();
      requestAnimationFrame(injectBannerCorrection);
      setTimeout(injectBannerCorrection, 200);
      setTimeout(watchForServerTable, 250);
    };
    script.onerror = injectBannerCorrection;
    document.head.appendChild(script);
  }

  injectLowPowerStyles();
  updateRouteClasses();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      scheduleRouteUpdate();
      watchForServerTable();
    });
  } else {
    setTimeout(watchForServerTable, 120);
  }
  window.addEventListener('hashchange', function() {
    scheduleRouteUpdate();
    setTimeout(watchForServerTable, 120);
  });
  window.addEventListener('popstate', function() {
    scheduleRouteUpdate();
    setTimeout(watchForServerTable, 120);
  });
  loadCore();
})();
