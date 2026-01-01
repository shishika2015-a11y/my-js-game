const btn = document.getElementById("fortuneBtn");
const resultDiv = document.getElementById("result");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

/* 🎵 音声 */
const sounds = {
  "大吉": new Audio("daikichi.mp3"),
  "中吉": new Audio("chukichi.mp3"),
  "小吉": new Audio("shokichi.mp3"),
  "吉": new Audio("kichi.mp3"),
  "凶": new Audio("kyo.mp3"),
  "SSR": new Audio("ssr.mp3")
};

btn.addEventListener("pointerdown", fortune);

function resetEffects() {
  document.body.classList.remove("ssr");
  document.querySelectorAll(".star,.sparkle").forEach(e => e.remove());
  ctx.clearRect(0,0,canvas.width,canvas.height);

  Object.values(sounds).forEach(s => {
    s.pause();
    s.currentTime = 0;
  });
}

function fortune() {
  const name = document.getElementById("name").value;
  if (!name) {
    alert("名前を入力してください");
    return;
  }

  resetEffects();
  resultDiv.innerHTML = "";

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
    "SSR": "禁断の運命が完全覚醒しました…！"
  };

  resultDiv.innerHTML = `
    <p><strong>${name}さん</strong></p>
    <p>🔮 運勢：<strong>${result}</strong></p>
    <p>${messages[result]}</p>
  `;
}

/* ⭐ 星 */
function starEffect() {
  for (let i = 0; i < 25; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.textContent = "⭐";
    star.style.left = Math.random() * 100 + "vw";
    star.style.animationDelay = Math.random() + "s";
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 1500);
  }
}

/* ✨ キラキラ */
function sparkleEffect() {
  for (let i = 0; i < 50; i++) {
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
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  let pieces = Array.from({length: 150}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 4 + 2
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgba(255,215,0,0.8)";
    pieces.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.y += p.d;
      if (p.y > canvas.height) p.y = 0;
    });
    frame++;
    if (frame < 140) requestAnimationFrame(draw);
  }
  draw();
}


