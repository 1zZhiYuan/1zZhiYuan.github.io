// ===== 自定义功能 =====

// 加载层兜底：第三方资源（统计/音乐组件）偶发拖慢 load 事件时，最多 4 秒强制收起
setTimeout(function () {
  var lb = document.getElementById('loading-box');
  if (lb) lb.classList.add('loaded');
}, 4000);

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
  'background: #f28cb1; color: #fff; font-size: 16px; font-weight: bold; padding: 8px 12px; border-radius: 4px;');
console.log('%c 保持热爱，持续进步 ✿',
  'color: #f28cb1; font-size: 14px;');

// ===== 樱花飘落特效 =====
(function () {
  // 尊重系统"减少动态效果"设置
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.__sakuraRunning) return;
  window.__sakuraRunning = true;

  var canvas = document.createElement('canvas');
  canvas.id = 'sakura-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99998;';
  var ctx = null;

  function makePetal(top) {
    return {
      x: Math.random() * window.innerWidth,
      y: top ? -20 : Math.random() * window.innerHeight,
      s: 5 + Math.random() * 8,               // 花瓣大小
      sp: 0.35 + Math.random() * 0.85,        // 下落速度
      sw: 0.5 + Math.random() * 1.5,          // 左右摆动
      ph: Math.random() * Math.PI * 2,        // 相位
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.025,
      o: 0.4 + Math.random() * 0.4,           // 透明度
      c: Math.random() < 0.72 ? '255,183,213' : '238,186,247'
    };
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function start() {
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    var count = window.innerWidth < 768 ? 14 : 26;
    var petals = [];
    for (var i = 0; i < count; i++) petals.push(makePetal(false));

    var hidden = false;
    document.addEventListener('visibilitychange', function () { hidden = document.hidden; });

    (function loop() {
      if (!hidden) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < petals.length; i++) {
          var p = petals[i];
          p.ph += 0.014 + p.sw * 0.006;
          p.y += p.sp;
          p.x += Math.sin(p.ph) * p.sw * 0.55;
          p.rot += p.vr;
          if (p.y > canvas.height + 24 || p.x < -30 || p.x > canvas.width + 30) {
            petals[i] = makePetal(true);
          }
          var q = petals[i];
          ctx.save();
          ctx.translate(q.x, q.y);
          ctx.rotate(q.rot);
          ctx.fillStyle = 'rgba(' + q.c + ',' + q.o + ')';
          ctx.beginPath();
          var s = q.s;
          ctx.moveTo(0, -s);
          ctx.bezierCurveTo(s * 0.85, -s * 0.45, s * 0.65, s * 0.6, 0, s);
          ctx.bezierCurveTo(-s * 0.65, s * 0.6, -s * 0.85, -s * 0.45, 0, -s);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }
      requestAnimationFrame(loop);
    })();
  }

  if (document.readyState !== 'loading') start();
  else document.addEventListener('DOMContentLoaded', start);
})();

// ===== 延迟加载外部资源（霞鹜文楷字体 + 看板娘），不阻塞页面加载 =====
(function () {
  function addStylesheet(href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
  function boot() {
    addStylesheet('https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css');
    setTimeout(function () {
      var s = document.createElement('script');
      s.src = 'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js';
      s.async = true;
      document.body.appendChild(s);
    }, 1500);
  }
  if (document.readyState === 'complete') boot();
  else window.addEventListener('load', boot);
})();
