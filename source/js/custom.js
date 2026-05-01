// ===== 自定义功能 =====

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 博客运行时间显示
  const runtimeEle = document.getElementById('runtimeshow');
  if (runtimeEle) {
    const birthDate = new Date('2023-05-25T22:00:00');
    setInterval(() => {
      const now = new Date();
      const diff = now - birthDate;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      runtimeEle.innerHTML = `博客已运行 ${days} 天 ${hours} 时 ${minutes} 分 ${seconds} 秒`;
    }, 1000);
  }
});

// 控制台欢迎信息
console.log('%c ZhiYuan 的博客 ',
  'background: #49b1f5; color: #fff; font-size: 16px; font-weight: bold; padding: 8px 12px; border-radius: 4px;');
console.log('%c 保持热爱，持续进步 🚀',
  'color: #49b1f5; font-size: 14px;');
