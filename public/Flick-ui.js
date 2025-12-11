export function initFlickUI() {
  const area = document.getElementById("game-area");
  const target = document.getElementById("target");
  const fastestEl = document.getElementById("fastest");
  const streakEl = document.getElementById("streak");
  const startBtn = document.getElementById("start-btn");

  let fastest = null;
  let streak = 0;
  let active = false;
  let startTime = 0;

  function randPos() {
    const size = 60;
    const maxX = area.clientWidth - size;
    const maxY = area.clientHeight - size;
    target.style.left = (Math.random()*maxX) + "px";
    target.style.top = (Math.random()*maxY) + "px";
  }

  function showTarget() {
    randPos();
    startTime = performance.now();
    target.style.display = "block";
  }

  function hideTarget() {
    target.style.display = "none";
  }

  function updateStats() {
    fastestEl.textContent = fastest == null ? "--" : fastest.toFixed(0);
    streakEl.textContent = streak;
  }

  function nextRound() {
    hideTarget();
    setTimeout(() => { if(active) showTarget(); }, 300 + Math.random()*900);
  }

  startBtn.addEventListener("click", () => {
    active = true;
    fastest = null;
    streak = 0;
    updateStats();
    nextRound();
  });

  target.addEventListener("click", () => {
    if(!active) return;
    const t = performance.now() - startTime;
    if(fastest == null || t < fastest) fastest = t;
    streak++;
    updateStats();
    nextRound();
  });
}
