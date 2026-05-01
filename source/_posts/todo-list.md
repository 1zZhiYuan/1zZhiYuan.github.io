---
title: 项目分享：ToDo List 应用开发记录
date: 2024-03-20 16:00:00
tags: [项目, JavaScript, 前端]
categories: [项目]
cover: /img/covers/todo-list.jpg
---

## 📋 项目简介

这是一个使用原生 JavaScript 开发的 ToDo List（待办清单）应用，功能包括添加任务、标记完成、删除任务、数据持久化等。

## 🛠 技术栈

- **HTML5** — 页面结构
- **CSS3** — 样式美化，支持响应式
- **JavaScript (ES6+)** — 核心逻辑
- **LocalStorage** — 数据存储

## ✨ 核心功能

### 1. 任务管理

```javascript
// 任务数据结构
const todo = {
  id: Date.now(),
  text: "学习 JavaScript",
  completed: false,
  createdAt: new Date().toISOString()
};

// 任务列表
let todos = [];

// 添加任务
function addTodo(text) {
  const todo = {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.push(todo);
  saveTodos();
  renderTodos();
}

// 删除任务
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
}

// 切换完成状态
function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  }
}
```

### 2. 数据持久化

使用 LocalStorage 保存数据，关闭浏览器后数据不会丢失：

```javascript
// 保存数据
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// 加载数据
function loadTodos() {
  const data = localStorage.getItem('todos');
  if (data) {
    todos = JSON.parse(data);
  }
}

// 初始化时加载
loadTodos();
renderTodos();
```

### 3. 数据统计

```javascript
function updateStats() {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;
  
  console.log(`总任务: ${total}`);
  console.log(`已完成: ${completed}`);
  console.log(`待完成: ${active}`);
}
```

## 🎨 UI 设计要点

- **简约风格**：卡片式布局，干净清爽
- **响应式**：适配手机和电脑
- **交互反馈**：完成任务有勾选动画，删除有确认提示
- **状态分类**：全部 / 进行中 / 已完成 三种视图

## 📦 项目结构

```
todo-app/
├── index.html      # 主页面
├── style.css       # 样式文件
└── app.js          # JavaScript 逻辑
```

## 💡 开发收获

1. **DOM 操作**：熟练使用 `createElement`、`querySelector` 等 API
2. **事件处理**：事件委托、表单提交、点击事件
3. **数据管理**：LocalStorage 的使用和 JSON 序列化
4. **代码组织**：模块化思维，数据与视图分离

## 🔗 项目总结

这个项目虽然简单，但涵盖了前端开发的核心概念：DOM 操作、事件处理、数据持久化。非常适合 JavaScript 初学者作为练手项目。

---

如果你也在学习前端开发，不妨自己动手写一个 ToDo List 应用，收获会很大！💪
