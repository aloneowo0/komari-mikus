# CF-Monitor-Mikus

将 [Komari Mikus](https://github.com/mikus-loli/komari-mikus) 主题移植到 [CF-Server-Monitor](https://github.com/huilang-me/CF-Server-Monitor) —— 通过后台自定义 HEAD 和 SCRIPT 字段注入樱花粉主题，无需修改源码、无需重新部署。

> [!NOTE]
> 这不是独立前端，需要已部署的 CF-Server-Monitor 实例配合使用。

## 功能

- **樱花粉配色** — 主色 `#e8668a`，深紫底色，渐变文字，柔和阴影
- **圆角卡片悬浮** — hover 上移 4px + 顶部樱花渐变条
- **樱花飘落动画** — 14 片 CSS 花瓣在导航卡片内飘落
- **Mascot 角色** — 右下角浮动 QWQ.webp（可点击关闭）
- **自定义加载界面** — loli.gif 加载动画 + Miku logo + 进度条
- **欢迎横幅** — 问候语 + 实时时钟，融合在导航卡片内
- **明暗主题** — 完整适配 CF-Server-Monitor 的 `body.light` 切换
- **按钮涟漪** — Material 风格点击波纹反馈
- **SPA 路由持久化** — MutationObserver 保证横幅、樱花、页脚在页面切换后不丢失
- **页脚署名** — 自动追加 "Theme by komari-mikus, ported by aloneowo"（带链接）

## 快速开始

1. 打开 CF-Server-Monitor 后台 `https://你的域名/#/admin`
2. 进入 **Settings** → **Appearance**
3. 在 **CUSTOM `<HEAD>`** 中粘贴：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/aloneowo0/cf-monitor-mikus@main/theme-mikus/custom_head.css">
<script src="https://cdn.jsdelivr.net/gh/aloneowo0/cf-monitor-mikus@main/theme-mikus/custom_script.js"></script>
```

4. **CUSTOM SCRIPT** 留空
5. 点击 **Save Configuration**
6. 强制刷新前台（`Ctrl+Shift+R`）

两行搞定，不用复制大段代码。

## 工作原理

| 文件 | 作用 | 加载方式 |
|------|------|----------|
| `custom_head.css` | 视觉覆盖 — 配色、卡片、模态框、动画、布局 | `<link>` 注入 HEAD |
| `custom_script.js` | 运行时功能 — 加载界面、横幅、樱花、mascot、涟漪、页脚 | `<script>` 注入 HEAD |

CSS 覆盖 CF-Server-Monitor 的 CSS 变量（`--bg-primary`、`--accent-pink` 等），重新样式化所有组件类名（`.server-card`、`.modal-dialog`、`.terminal-header` 等）。

JS 以 IIFE 运行，用 MutationObserver 适配 Vue SPA 路由切换，图片资源通过 jsDelivr CDN 从本仓库加载。

## 项目结构

```
cf-monitor-mikus/
├── public/                  # 原作者 Komari Mikus 主题（MIT）
│   ├── dist/                # 主题构建产物
│   │   ├── assets/
│   │   │   ├── img/         # loli.gif, miku.png, QWQ.webp
│   │   │   ├── flags/       # 国旗 SVG
│   │   │   ├── logo/        # OS logo SVG
│   │   │   ├── app.js       # 原主题 JS
│   │   │   └── style.css    # 原主题 CSS
│   │   └── index.html
│   ├── komari-theme.json    # 原主题配置
│   └── mikus.jpg            # 预览截图
├── theme-mikus/             # CF-Server-Monitor 移植
│   ├── custom_head.css      # 注入用 CSS（纯 CSS，无 <style> 标签）
│   ├── custom_head.html     # 同上但包了 <style>（旧版粘贴方式）
│   └── custom_script.js     # 注入用 JS（IIFE，无 <script> 标签）
└── README.md
```

## 自定义

所有设计变量定义在 `custom_head.css` 顶部：

```css
:root {
  --bg-primary: #0f0a15;
  --accent-pink: #ff8fa3;
  --sakura-1: #ffb7c5;
  --sakura-3: #e8668a;
  /* ... */
}
```

修改后推送到你的 fork，jsDelivr 会自动提供新版本（可能需要[手动刷新缓存](https://www.jsdelivr.com/tools/purge)）。

## 致谢

- **原主题**：[komari-mikus](https://github.com/mikus-loli/komari-mikus) by [mikus-loli](https://github.com/mikus-loli)（MIT）
- **目标项目**：[CF-Server-Monitor](https://github.com/huilang-me/CF-Server-Monitor) by [huilang-me](https://github.com/huilang-me)（MIT）
- **移植**：[aloneowo](https://github.com/aloneowo0)

## 许可证

MIT