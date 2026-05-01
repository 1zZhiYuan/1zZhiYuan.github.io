# ZhiYuan 的博客 🚀

基于 **Hexo** + **Butterfly 主题** 的个人博客，部署在 GitHub Pages。

## 特性

- 📝 Markdown 写作
- 🌙 暗色模式（手动切换）
- 🔍 站内搜索
- 💬 Giscus 评论系统
- 🎨 多配色方案
- 📊 文章字数统计
- 🏷️ 标签/分类管理
- 🎵 APlayer 音乐播放器
- 📱 响应式设计

## 快速开始

```bash
# 安装依赖
npm install

# 本地预览
npx hexo server

# 生成静态文件
npx hexo generate
```

## 部署

推送到 `main` 分支后，GitHub Actions 自动构建部署到 GitHub Pages。

```bash
git add -A
git commit -m "更新内容"
git push origin main
```

访问：https://1zzhiyuan.github.io/

## 目录结构

```
├── _config.yml              # Hexo 主配置
├── _config.butterfly.yml    # Butterfly 主题配置
├── source/                  # 源文件
│   ├── _posts/              # 文章
│   ├── img/                 # 图片资源
│   ├── css/                 # 自定义样式
│   └── js/                  # 自定义脚本
└── .github/workflows/       # 部署配置
```

## 许可

CC BY-NC-SA 4.0
