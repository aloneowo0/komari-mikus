(function() {
  'use strict';

  if (window.__mikusThemeEntryLoaded) return;
  window.__mikusThemeEntryLoaded = true;

  var CORE_URL = 'https://cdn.jsdelivr.net/gh/aloneowo0/cf-monitor-mikus@9134078d892b267edd6e4a6a82fbf6802fec124a/theme-mikus-new/custom_script.js';

  function injectLowPowerStyles() {
    var style = document.getElementById('mikus-low-power-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'mikus-low-power-style';
      document.head.appendChild(style);
    }

    style.textContent =
      ':root{--glass-blur:5px!important;--glass-blur-light:0px!important;--glass-saturate:1!important;}' +
      'body::after{display:block!important;opacity:.72!important;}' +
      '.server-card,.chart-card,.host-card,.settings-section,.table-container,.table-wrapper,.footer,.main-panel,.panel-header,.tab-content,.admin-loading-overlay,.quota-section,.disabled-container,.user-menu-dropdown,.map-wrapper,.status-bar,.global-stats,.stats-grid,.view-toggle,.modal-overlay,.settings-grid,.ping-panel,.time-selector,.tabs{' +
        'backdrop-filter:none!important;-webkit-backdrop-filter:none!important;' +
      '}' +
      '.server-card,.chart-card,.host-card,.settings-section,.table-container,.table-wrapper,.footer,.main-panel,.panel-header,.tab-content,.quota-section,.disabled-container,.user-menu-dropdown,.map-wrapper,.status-bar{' +
        'background:var(--bg-secondary)!important;' +
        'box-shadow:inset 0 1px 0 rgba(255,255,255,.035),var(--mikus-shadow-card)!important;' +
      '}' +
      '.global-stats,.stats-grid,.view-toggle,.settings-grid,.ping-panel,.time-selector,.tabs{' +
        'background:var(--bg-hover)!important;' +
      '}' +
      '.nav-area,.terminal-header,.modal-dialog{' +
        'backdrop-filter:blur(5px)!important;-webkit-backdrop-filter:blur(5px)!important;' +
      '}' +
      '.modal-overlay{background:rgba(0,0,0,.48)!important;}' +
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
    };
    script.onerror = injectBannerCorrection;
    document.head.appendChild(script);
  }

  injectLowPowerStyles();
  loadCore();
})();