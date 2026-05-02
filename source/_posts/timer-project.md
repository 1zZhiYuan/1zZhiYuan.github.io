---
title: 项目分享：Timer — 轻量学习计时统计工具
date: 2026-05-02 23:00:00
tags: [项目, Python, PyQt6, 桌面开发]
categories: [项目]
cover: /img/covers/timer-project.jpg
top_img: /img/default.jpg
description: 一款使用 Python + PyQt6 开发的 Windows 桌面端专注计时与学习统计工具，纯本地运行，功能完整。
---

## 项目简介

**Timer** 是一款 Windows 桌面端的专注计时与学习统计工具。纯本地运行，无需联网，数据完全由用户掌控。

项目地址：[github.com/1zZhiYuan/Timer](https://github.com/1zZhiYuan/Timer)

---

## 功能一览

{% note primary flat %}
⏱ **专注计时器** — 开始/暂停/继续/重置，进度条展示目标完成率，自动记录每日学习时长
{% endnote %}

{% note success flat %}
🍅 **番茄钟** — 自定义专注/休息时长（默认 25+5），完成后自动同步到学习记录
{% endnote %}

{% note warning flat %}
⛶ **迷你模式** — 一键切换迷你窗口，仅显示时钟和操作按钮，减少视觉干扰
{% endnote %}

{% note danger flat %}
📅 **日历视图** — 按月展示每日学习时长，达标自动标记，一键跳转今日
{% endnote %}

{% note info flat %}
📊 **数据报表** — 趋势图表（折线图/柱状图可切换），汇总卡片（总时长/日均/最佳），时段拆分统计
{% endnote %}

---

## 更多功能

| 功能 | 说明 |
|------|------|
| 💻 应用统计 | 后台静默统计各软件使用时长，自动分类 |
| 🌅 时段分析 | 自动划分上午/下午/晚间，统计各时段学习占比 |
| 🎯 每日目标 | 自定义每日目标时长，连续达标天数统计 |
| 🏆 成就系统 | 18 项成就徽章 + 专注指数评分（0-100） |
| 💺 久坐提醒 | 自定义间隔时间，弹窗提醒起身活动 |
| 🖥 系统托盘 | 关闭窗口最小化到托盘，后台持续计时 |
| 🌗 主题系统 | 5 种精选配色：浅色、深色、静谧蓝、护眼绿、暖阳橙 |
| 📤 数据导出 | 支持导出为 TXT / Excel |

---

## 技术栈

| 技术 | 用途 |
|------|------|
| Python 3.7+ | 运行时 |
| PyQt6 | 桌面 GUI 框架 |
| SQLite | 本地嵌入式数据库 |
| psutil + pywin32 | Windows 前台进程监控 |
| PyInstaller | 单文件 exe 打包 |

Timer 使用 PyQt6 的 QPainter 自绘图表（折线图、柱状图），无 matplotlib 依赖。

---

## 设计思路

- **纯本地优先** — 所有数据存本地 SQLite，无账号、无同步、无隐私泄露风险
- **自绘图表** — 使用 QPainter 绘制图表，避免引入 matplotlib 等重型依赖
- **响应式布局** — 所有面板支持窗口缩放，字体与元素自适应
- **主题模板化** — QSS 基于 string.Template 生成，调色板与样式分离
- **模块化架构** — core 层与 ui 层分离，各面板独立，信号/槽解耦

---

## 运行截图

{% hideToggle 点击展开 %}

项目使用 PyQt6 构建，界面包含计时主页、日历视图、数据报表、番茄钟、设置面板等完整功能模块。

{% endhideToggle %}

---

## 快速开始

```bash
git clone https://github.com/1zZhiYuan/Timer.git
cd Timer
pip install -r requirements.txt
python main.py
```

也可以直接下载 `dist/Timer.exe`，双击运行，无需安装 Python。
