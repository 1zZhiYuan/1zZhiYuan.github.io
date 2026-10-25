---
title: 项目分享：月牙 —— 给开源经期 App 做一次认真的汉化定制
date: 2026-10-25 19:30:00
tags: [项目, Android, 开源, 汉化]
categories: [项目]
cover: /img/yueya/cover-yueya.jpg
top_img: /img/top-home.jpg
description: 把开源经期记录应用 Mensinator 汉化成「月牙」的全过程：霞鹜文楷字体子集、图标与吉祥物重绘、三轮审计（隐私/编译/数据库迁移），以及「阅读不能替代编译」的教训。
---

## 项目简介

**月牙**是我基于开源项目 [Mensinator](https://github.com/EmmaTellblom/Mensinator) 做的中文定制版。Mensinator 是一款主打隐私的经期记录应用（F-Droid 可下载），功能扎实但中文体验一般。我把它的界面完整汉化、重绘了图标和吉祥物、嵌入中文字体子集，并顺手做了三轮系统性的审计——最终产出签名安装包 `yueya-1.2.apk`。

{% img /img/yueya/icon.jpg 96 月牙图标 %}

之所以做这件事，是因为身边有人需要一款**数据绝不上传**的经期记录工具。Mensinator 本身就以此著称，而我想把它的中文体验也做到「认真」的程度，同时在接入之前对代码质量做一次体检——毕竟这是一类对隐私格外敏感的应用。

## 定制清单：改了什么

**语言与字体**

- 全量界面汉化：菜单、设置、症状词条、统计页、导出文案；
- 嵌入**霞鹜文楷字体子集**：写了个脚本扫描 App 里所有会显示的字符串，把真正用到的汉字从完整字库里筛出来打包，只保留 App 里真正会显示的字——中文字体动辄 10 MB，子集后小到可以忽略，还顺手统一了全应用的手写感风格。

**视觉重绘**

- 应用图标、导航栏图标、状态图标全部重绘；
- 画了一只吉祥物，用在空状态和分享卡片里。

<div class="shot-row shot-row-2">
<img src="/img/yueya/mascot.jpg" alt="月牙吉祥物">
<img src="/img/yueya/sharecard.jpg" alt="分享卡片">
</div>

**功能微调**：保留上游全部核心能力——经期与排卵预测、自定义症状、情绪日记、用药与身体指标记录、统计图表，并做了适合中文使用习惯的默认设置。

<div class="shot-row">
<img src="/img/yueya/calendar.jpg" alt="日历视图">
<img src="/img/yueya/stats.jpg" alt="统计视图">
<img src="/img/yueya/symptoms.jpg" alt="症状记录">
</div>

## 隐私审计：结论写在编译产物里

定制之前我先做了隐私审计，核心结论只有一句话：**这份代码没有联网能力。**

验证方式不是「看了一遍觉得没有」，而是：

1. 全文检索权限声明与网络相关 API，`android.permission.INTERNET` 在源码清单中不存在；
2. 真正跑了一次编译，检查**合并后的清单文件**（merged manifest）——确认 INTERNET 权限同样不存在；
3. 源码中没有任何 `import java.net.*`；
4. 分享功能走的是系统的 `ACTION_SEND`，是否传输由接收方决定，App 本身不接触网络。

<div class="shot-row shot-row-2">
<img src="/img/yueya/mood.jpg" alt="情绪日记">
<img src="/img/yueya/settings.jpg" alt="设置页">
</div>

## 编译审计：阅读不能替代编译

这次审计最大的收获其实是一条方法论教训。

上游源码**读起来完全没问题**：结构清晰、命名规范。但真正执行 `assembleDebug` 时，连续撞上两个阻断性错误——

| # | 问题 | 位置 |
|---|------|------|
| A | Vector drawable 使用了 `<ellipse>` 元素（资源链接失败，8 个错误） | `ic_launcher_foreground.xml` |
| B | 5 个表达式函数体的返回类型与接口声明的 `Unit` 不匹配（Kotlin 编译失败） | `PeriodDatabaseHelper.kt` |

两处都修掉之后，`assembleDebug` 才成功产出安装包。而在此之前，另一份「只靠阅读」的审计报告给出的结论是「未发现会破坏构建的 Kotlin 错误」——**它漏掉了全部真问题，还把一个其实无碍的依赖当成了头号风险**。

所以我把这条教训写进了审计文档的标题里：静态阅读可以发现「有什么」，只有编译和运行才能证明「行不行」。

## 数据库迁移审计：一条数据都不能丢

经期记录是最怕丢数据的品类。我逐段核查了 `onUpgrade` 的 v3→v14 迁移路径：

- 唯一两条 `DELETE` 语句是**去重**（按日期保留一条），不会删除任何不同的记录；
- 建表全部是 `CREATE TABLE IF NOT EXISTS`，设置插入全部带 `WHERE NOT EXISTS`，幂等且无破坏性；
- 所有迁移都在 SQLite 的事务保护下，中途失败会整体回滚，不会留下迁移到一半的数据库。

结论：升级路径安全，老用户的数据不会丢。

## 获取安装包

定制版 `yueya-1.2.apk` 为签名发布，目前通过我的渠道分发：可以在[留言板](/messages/)留言或通过侧边栏联系方式找我。上游原版 Mensinator 也可以直接从它的 [GitHub 仓库](https://github.com/EmmaTellblom/Mensinator)或 F-Droid 获取。

## 写在最后

这个项目的体量不大，但它完整地走了一遍「拿到开源项目 → 审计 → 定制 → 出包」的流程，而且每一步都有可复核的产出：审计文档、修复记录、校验过的构建产物。

开源的意义就在于此——不只是白嫖别人的成果，而是在别人的地基上，盖一间自己认真装修过的房子。
