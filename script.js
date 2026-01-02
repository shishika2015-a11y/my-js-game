document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("fortuneBtn");
  const resultDiv = document.getElementById("result");
  const luckyDiv = document.getElementById("lucky");
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  /* 🎵 音声 */
  const sounds = {
    "大吉": new Audio("daikichi.mp3"),
    "中吉": new Audio("chukichi.mp3"),
    "小吉": new Audio("shokichi.m4a"),
    "吉": new Audio("kichi.mp3"),
    "凶": new Audio("kyo.mp3"),
    "SSR": new Audio("ssr.mp3")
  };

  /* 🎨 ラッキーカラー */
  const colors = [
    "❤️ 赤","💙 青","💛 黄色","💚 緑","💜 紫","🖤 黒",
    "🤍 白","🧡 オレンジ","💖 ピンク","🌈 虹色",
    "✨ 金","❄️ 水色"
  ];

  /* 🎁 ラッキーアイテム */
  const items = [
    "📱 スマホ","⌚ 時計","🎧 イヤホン","👜 カバン",
    "📓 ノート","🔑 鍵","🍬 あめ","🧸 ぬいぐるみ",
    "☕ マグカップ","👟 スニーカー",
    "💍 アクセサリー","🌙 お守り"
  ];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  btn.addEventListener("click", fortune);

  function resetEffects() {
    document.body.classList.remove("ssr");
    document.querySelectorAll(".star,.sparkle").forEach(e => e.remove());
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Object.values(sounds).forEach(s => {
      s.pause();
      s.currentTime = 0;
    });
  }

  function fortune() {
    const name = document.getElementById("name").value.trim();
    if (!name) {
      alert("名前を入力してください");
      return;
    }

    resetEffects();
    resultDiv.innerHTML = "";
    luckyDiv.innerHTML = "";

    const fortunes = ["大吉","中吉","小吉","吉","凶","SSR"];
    const today = new Date().toDateString();

    let score = 0;
    for (let c of (name + today)) score += c.charCodeAt(0);

    const result = fortunes[score % fortunes.length];

    sounds[result].play();

    if (result === "SSR") {
      document.body.classList.add("ssr");
      starEffect();
      sparkleEffect();
      confettiEffect();
      if (navigator.vibrate) navigator.vibrate([200,100,200,100,400]);
    }

    const messages = {
      "大吉": "星々があなたを祝福しています…",
      "中吉": "運命は静かに味方しています…",
      "小吉": "小さな奇跡に気づきなさい…",
      "吉": "選択が未来を分けるでしょう…",
      "凶": "闇は試練を与えています…",
      "SSR": "✨禁断の運命が完全覚醒しました…！！✨"
    };

    //const color = colors[Math.floor(Math.random() * colors.length)];
    //const item  = items[Math.floor(Math.random() * items.length)];
    
    // 🌅 日付＋名前で固定値を作る
    let luckyScore = 0;
    for (let c of (name + today + "lucky")) {
      luckyScore += c.charCodeAt(0);
    }

    // 🎨 ラッキーカラー（1日固定）
    const color = colors[luckyScore % colors.length];

    // 🎁 ラッキーアイテム（1日固定）
    const item = items[(luckyScore * 3) % items.length];

    resultDiv.innerHTML = `
      <p><strong>${name}さん</strong></p>
      <p>🔮 運勢：<strong>${result}</strong></p>
      <p>${messages[result]}</p>
    `;

    luckyDiv.innerHTML = `
      <div class="lucky-card">
        <span>🎨</span>
        ラッキーカラー<br><strong>${color}</strong>
      </div>
      <div class="lucky-card">
        <span>🎁</span>
        ラッキーアイテム<br><strong>${item}</strong>
      </div>
    `;
  }

  /* ⭐ 星 */
  function starEffect() {
    for (let i = 0; i < 25; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.textContent = "⭐";
      star.style.left = Math.random() * 100 + "vw";
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 1500);
    }
  }

  /* ✨ キラキラ */
  function sparkleEffect() {
    for (let i = 0; i < 60; i++) {
      const s = document.createElement("div");
      s.className = "sparkle";
      s.style.left = Math.random() * 100 + "vw";
      s.style.top = Math.random() * 100 + "vh";
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1200);
    }
  }

  /* 🎉 紙吹雪 */
  function confettiEffect() {
    let pieces = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 4 + 2
    }));

    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255,215,0,0.9)";
      pieces.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.y += p.d;
        if (p.y > canvas.height) p.y = 0;
      });
      if (frame++ < 150) requestAnimationFrame(draw);
    }
    draw();
  }

});

