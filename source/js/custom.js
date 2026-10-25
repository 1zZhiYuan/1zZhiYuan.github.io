// ===== 自定义功能 · 晴空 Sky Blue =====

// 加载层兜底：第三方资源偶发拖慢 load 事件时，最多 4 秒强制收起
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
  'background: #4aa3ef; color: #fff; font-size: 16px; font-weight: bold; padding: 8px 12px; border-radius: 4px;');
console.log('%c 保持热爱，持续进步 ✿',
  'color: #4aa3ef; font-size: 14px;');

// ===== 花瓣飘落特效（晴空配色：白 + 淡蓝） =====
(function () {
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
      s: 5 + Math.random() * 8,
      sp: 0.35 + Math.random() * 0.85,
      sw: 0.5 + Math.random() * 1.5,
      ph: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.025,
      o: 0.5 + Math.random() * 0.4,
      c: Math.random() < 0.55 ? '255,255,255' : '178,218,250'
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
    var count = window.innerWidth < 768 ? 14 : 24;
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

// ===== 云朵吉祥物「小云」：说话气泡 + 点击互动 =====
(function () {
  var QUOTES = [
    '嗨～我是小云，这片天空的常驻居民 ☁️',
    '保持热爱，持续进步！',
    '今天也要元气满满哦！',
    '写代码累了，就抬头看看天空吧～',
    '点击我可以换一句话哦！',
    '云朵今天也在慢慢飘～',
    '去主页看看 Timer 和聆记 AI 吧！',
    '记得给喜欢的项目点个 Star ✧',
    '有什么想说的话，去留言板找我呀～',
    '蓝天出品，心情必备 ☀️',
    '风好大，快被吹跑了——才怪！',
    '据说看到小云的人今天会有好运气',
    '一行代码一朵云，积少成多～',
    '别刷太久啦，起来活动一下！',
    '今天的天空是我最喜欢的蓝色',
    ' bug 不可怕，可怕的是不修 ໒꒱',
    '与其焦虑，不如现在就写一行',
    '小云会一直在这里陪着你哒'
  ];

  function pickGreeting() {
    var h = new Date().getHours();
    if (h >= 5 && h < 9) return '早上好呀！新的一天也要元气满满 ☀️';
    if (h >= 9 && h < 12) return '上午好！今天的进度条推进了吗？';
    if (h >= 12 && h < 14) return '中午啦，记得休息一下眼睛～';
    if (h >= 14 && h < 18) return '下午好，来杯水再继续吧 💧';
    if (h >= 18 && h < 23) return '晚上好，今天也要平安收工哦 🌙';
    return '夜深了，早点休息呀…';
  }

  var idx = Math.floor(Math.random() * QUOTES.length);

  function buildMascot() {
    if (document.getElementById('sky-mascot')) return;
    var root = document.createElement('div');
    root.id = 'sky-mascot';
    root.innerHTML =
      '<div class="sky-bubble"></div>' +
      '<svg class="sky-cloud" viewBox="0 0 200 130" width="92" height="60" aria-label="小云吉祥物">' +
      '<ellipse cx="102" cy="102" rx="62" ry="13" fill="#cfe6fa" opacity="0.75"/>' +
      '<g fill="#ffffff" stroke="#d4e9fb" stroke-width="3">' +
      '<circle cx="52" cy="76" r="28"/>' +
      '<circle cx="88" cy="58" r="36"/>' +
      '<circle cx="130" cy="68" r="30"/>' +
      '<circle cx="158" cy="84" r="21"/>' +
      '<ellipse cx="102" cy="92" rx="64" ry="26"/>' +
      '</g>' +
      '<g class="sky-eyes">' +
      '<circle cx="82" cy="76" r="4.6" fill="#46607e"/>' +
      '<circle cx="118" cy="76" r="4.6" fill="#46607e"/>' +
      '<circle cx="83.6" cy="74.4" r="1.5" fill="#fff"/>' +
      '<circle cx="119.6" cy="74.4" r="1.5" fill="#fff"/>' +
      '</g>' +
      '<circle cx="70" cy="86" r="6" fill="#ffd3e0" opacity="0.85"/>' +
      '<circle cx="130" cy="86" r="6" fill="#ffd3e0" opacity="0.85"/>' +
      '<path d="M93,84 Q100,91 107,84" stroke="#46607e" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '</svg>';
    document.body.appendChild(root);

    var bubble = root.querySelector('.sky-bubble');
    var cloud = root.querySelector('.sky-cloud');

    function show(text) {
      bubble.classList.remove('show');
      setTimeout(function () {
        bubble.textContent = text;
        bubble.classList.add('show');
      }, 260);
    }

    show(pickGreeting());

    // 定时轮播
    setInterval(function () {
      idx = (idx + 1) % QUOTES.length;
      show(QUOTES[idx]);
    }, 9000);

    cloud.addEventListener('click', function () {
      cloud.classList.remove('bounce');
      void cloud.offsetWidth; // 重启动画
      cloud.classList.add('bounce');
      idx = (idx + 1) % QUOTES.length;
      show(QUOTES[idx]);
    });
  }

  if (document.readyState !== 'loading') buildMascot();
  else document.addEventListener('DOMContentLoaded', buildMascot);
})();

// ===== 延迟加载霞鹜文楷字体（不阻塞页面加载） =====
(function () {
  function boot() {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css';
    document.head.appendChild(link);
  }
  if (document.readyState === 'complete') boot();
  else window.addEventListener('load', boot);
})();