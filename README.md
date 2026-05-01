# ZhiYuan 的博客

基于 **Hexo v6** + **Butterfly v4.13** 主题搭建的个人博客，部署在 GitHub Pages。

访问：[https://1zzhiyuan.github.io/](https://1zzhiyuan.github.io/)

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Hexo 6.3.0 |
| 主题 | Butterfly 4.13.0 |
| 模板 | Pug |
| 样式 | Stylus / CSS |
| 部署 | GitHub Pages + Actions |
| 评论 | Giscus (GitHub Discussions) |
| 搜索 | hexo-generator-search |
| 统计 | 不蒜子 |
| 音乐 | APlayer (网易云音乐) |

## 特性

- Markdown 写作，支持标签外挂（note/btn/tabs/mermaid 等）
- 暗色模式，手动切换，默认亮色
- 站内搜索（本地搜索）
- Giscus 评论系统
- 文章字数统计与阅读时间
- 标签 / 分类管理
- 文章封面自动生成
- APlayer 音乐播放器
- Font Awesome 6 图标
- 响应式设计
- 粒子背景 / 点击烟花 / 点击爱心
- 图片懒加载 / Pjax 无刷新跳转

## 快速开始

```bash
# 安装依赖
npm install

# 本地预览（浏览器访问 http://localhost:4000）
npx hexo server

# 指定端口
npx hexo server -p 4001

# 生成静态文件
npx hexo generate

# 清理缓存
npx hexo clean
```

## 文章管理

```bash
# 新建文章
npx hexo new "文章标题"

# 新建草稿
npx hexo new draft "草稿标题"

# 发布草稿
npx hexo publish "草稿标题"

# 新建页面
npx hexo new page "页面名"
```

文章使用 front-matter 定义元信息：

```yaml
---
title: 文章标题
date: 2026-05-01 22:00:00
tags: [标签1, 标签2]
categories: [分类名]
cover: /img/covers/文章名.jpg
description: 文章摘要
sticky: 1          # 置顶
comments: true     # 开启评论
---
```

## 目录结构

```
1zZhiYuan.github.io/
├── _config.yml                  # Hexo 主配置
├── _config.butterfly.yml        # 主题配置（外观/功能）
├── package.json                 # 依赖管理
├── .gitignore
├── .github/workflows/deploy.yml # GitHub Actions 部署
├── scaffolds/                   # 文章模板
│   ├── post.md
│   ├── page.md
│   └── draft.md
├── source/                      # 源文件目录
│   ├── _posts/                  # 文章 (.md)
│   ├── about/                   # 关于页面
│   ├── categories/              # 分类页面
│   ├── tags/                    # 标签页面
│   ├── link/                    # 友链页面
│   ├── messages/                # 留言板页面
│   ├── img/                     # 图片资源
│   │   ├── covers/              # 文章封面图
│   │   ├── touxiang.jpg         # 头像
│   │   ├── avatar.png           # 头像（PNG 版）
│   │   ├── default.jpg          # 首页横幅
│   │   ├── archive.jpg          # 归档页横幅
│   │   ├── tag.jpg              # 标签页横幅
│   │   ├── category.jpg         # 分类页横幅
│   │   ├── error.jpg            # 错误占位图
│   │   ├── wechat-qr.png        # 微信打赏码
│   │   └── alipay-qr.png        # 支付宝打赏码
│   ├── css/
│   │   └── custom.css           # 自定义样式
│   └── js/
│       └── custom.js            # 自定义脚本
├── public/                      # 生成的文件（自动生成，勿手动修改）
└── node_modules/                # 依赖（自动生成）
```

## 图片系统

各页面横幅图位于 `source/img/`：

| 文件 | 用途 |
|------|------|
| `default.jpg` | 首页顶部横幅 |
| `archive.jpg` | 归档页横幅 |
| `tag.jpg` | 标签页横幅 |
| `category.jpg` | 分类页横幅 |
| `error.jpg` | 404 / 错误占位 |
| `touxiang.jpg` | 头像（替换此文件更新头像） |
| `covers/*.jpg` | 各文章封面图 |

## 主题配置

所有外观和功能在 `_config.butterfly.yml` 中修改：

- **导航栏菜单**：`menu` 下增删条目
- **社交图标**：`social` 下添加链接
- **主题色**：`theme_color` 下修改颜色值
- **侧边栏**：`aside` 下控制各模块显示
- **特效开关**：`canvas_nest` / `fireworks` / `click_heart` 等
- **暗色模式**：`darkmode.autoChangeMode` 设为 1/2/3

### 预设配色方案

| 方案 | 主色 |
|------|------|
| 简约蓝 | #49B1F5 |
| 活力橙 | #FF6B35 |
| 经典红 | #E74C3C |
| 森林绿 | #27AE60 |
| 暗夜紫 | #8E44AD |
| 樱花粉 | #FF9A9E |
| 海洋蓝 | #006994 |

## 部署

推送到 `main` 分支后，GitHub Actions 自动构建并部署到 GitHub Pages。

```bash
git add -A
git commit -m "更新说明"
git push origin main
```

等待 1-2 分钟，访问 https://1zzhiyuan.github.io/ 查看。

## 许可

CC BY-NC-SA 4.0
