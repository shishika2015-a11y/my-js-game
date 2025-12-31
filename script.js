const normal = new Audio("normal.mp3");
const ssr = new Audio("ssr.mp3");

function fortune() {
  const r = Math.random();

  if (r < 0.1) {
    ssr.play();
    alert("✨超大吉✨");
  } else {
    normal.play();
    alert("吉");
  }
}
