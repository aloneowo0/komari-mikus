(function() {
  'use strict';

  var CORE_URL = 'https://cdn.jsdelivr.net/gh/aloneowo0/cf-monitor-mikus@9134078d892b267edd6e4a6a82fbf6802fec124a/theme-mikus-new/custom_script.js';

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

  loadCore();
})();