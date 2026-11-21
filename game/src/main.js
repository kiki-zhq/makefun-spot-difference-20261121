// Twinkle Town — Spot the Difference: game logic and UI.
// Two near-identical pictures side by side; click a difference on either
// panel to mark it on both. Seven differences per scene, three scenes.
// Keyboard: H hint, N next scene (when finished), R restart scene,
// 1/2/3 jump to a scene, M mute. Best total time is kept in localStorage.
// Shot mode (for screenshots): ?shot=play&level=0&found=0,1,2 pre-marks
// differences, and ?shot=win shows the victory screen.

import { SCENES, sceneSvg, PANEL_W, PANEL_H } from './scenes.js';
import { playFound, playWrong, playHint, playWin, playClick, setMuted, isMuted } from './audio.js';

const BEST_KEY = 'twinkle-town.best-seconds';
const $ = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);

const state = {
  level: 0,
  found: new Set(),
  score: 0,
  hintsLeft: 3,
  seconds: 0,
  timer: null,
  over: false,
  hintFlash: null,
};

function scene() {
  return SCENES[state.level];
}

function remaining() {
  return scene().diffs.length - state.found.size;
}

function fmtTime(s) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

function render() {
  const sc = scene();
  $('scene-name').textContent = `${sc.name} — ${sc.hint}`;
  $('left-panel').innerHTML = sceneSvg(sc, false, state.found);
  $('right-panel').innerHTML = sceneSvg(sc, true, state.found);
  $('counter').textContent = `Found ${state.found.size} / ${sc.diffs.length} · ${remaining()} left`;
  $('counter').classList.toggle('done', remaining() === 0);
  $('score').textContent = `Score ${state.score}`;
  $('timer').textContent = `Time ${fmtTime(state.seconds)}`;
  $('hint-btn').textContent = `💡 Hint (${state.hintsLeft})`;
  $('hint-btn').disabled = state.hintsLeft === 0 || remaining() === 0;
  document.querySelectorAll('.level-tab').forEach((btn, i) => {
    btn.classList.toggle('active', i === state.level);
    btn.textContent = `${i + 1} · ${SCENES[i].name}`;
  });
  $('status').textContent = remaining() === 0
    ? `${sc.name} complete!`
    : `${sc.name}: ${remaining()} difference${remaining() === 1 ? '' : 's'} still hiding.`;
  if (state.hintFlash !== null) flashHint(state.hintFlash);
}

function startTimer() {
  if (state.timer) return;
  state.timer = setInterval(() => {
    state.seconds += 1;
    $('timer').textContent = `Time ${fmtTime(state.seconds)}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timer);
  state.timer = null;
}

function loadLevel(i, presetFound) {
  state.level = i;
  state.found = new Set(presetFound ?? []);
  state.hintsLeft = 3;
  state.over = false;
  $('overlay').classList.add('hidden');
  $('overlay').innerHTML = '';
  render();
}

function levelComplete() {
  stopTimer();
  playWin();
  const bonus = Math.max(0, 300 - state.seconds * 2);
  state.score += bonus;
  const totalFound = SCENES.reduce((n, s) => n + s.diffs.length, 0);
  const last = state.level === SCENES.length - 1;
  const best = Number(localStorage.getItem(BEST_KEY) || 0);
  if (last) {
    if (!best || state.seconds < best) localStorage.setItem(BEST_KEY, String(state.seconds));
    $('overlay').innerHTML = `<div class="card"><h2>🎉 You found them all!</h2>
      <p>All ${totalFound} differences across 3 scenes in ${fmtTime(state.seconds)}.</p>
      <p class="big">Final score: ${state.score}</p>
      <p>Best time: ${fmtTime(Number(localStorage.getItem(BEST_KEY)))}</p>
      <button id="again-btn">Play again</button></div>`;
  } else {
    $('overlay').innerHTML = `<div class="card"><h2>✨ ${scene().name} complete!</h2>
      <p>You found all 7 differences. Time bonus +${bonus}.</p>
      <p class="big">Score: ${state.score}</p>
      <button id="next-btn">Next scene: ${SCENES[state.level + 1].name} →</button></div>`;
    $('next-btn').addEventListener('click', () => { playClick(); loadLevel(state.level + 1); });
  }
  $('overlay').classList.remove('hidden');
  if (last) $('again-btn').addEventListener('click', () => { playClick(); resetGame(); });
  render();
}

function resetGame() {
  state.score = 0;
  state.seconds = 0;
  stopTimer();
  loadLevel(0);
}

function handlePanelClick(event, side) {
  if (state.over) return;
  startTimer();
  const panel = event.currentTarget;
  const rect = panel.getBoundingClientRect();
  const svg = panel.querySelector('svg');
  const x = ((event.clientX - rect.left) / rect.width) * PANEL_W;
  const y = ((event.clientY - rect.top) / rect.height) * PANEL_H;
  const sc = scene();
  const idx = sc.diffs.findIndex((d, i) => !state.found.has(i)
    && Math.hypot(d.x - x, d.y - y) <= d.r + 14);
  if (idx >= 0) {
    state.found.add(idx);
    state.score += 100;
    playFound();
    $('toast').textContent = `Found it! ${sc.diffs[idx].label}.`;
    render();
    if (remaining() === 0) levelComplete();
    return;
  }
  state.score = Math.max(0, state.score - 10);
  playWrong();
  $('toast').textContent = 'Not a difference — try again! (−10)';
  const mark = document.createElement('div');
  mark.className = 'miss';
  mark.textContent = '✕';
  mark.style.left = `${event.clientX - rect.left}px`;
  mark.style.top = `${event.clientY - rect.top}px`;
  panel.appendChild(mark);
  setTimeout(() => mark.remove(), 700);
  render();
}

function flashHint(idx) {
  document.querySelectorAll('.hint-ring').forEach((el) => el.remove());
  const sc = scene();
  const d = sc.diffs[idx];
  ['left-panel', 'right-panel'].forEach((id) => {
    const panel = $(id);
    const rect = panel.getBoundingClientRect();
    const ring = document.createElement('div');
    ring.className = 'hint-ring';
    ring.style.left = `${(d.x / PANEL_W) * rect.width}px`;
    ring.style.top = `${(d.y / PANEL_H) * rect.height}px`;
    ring.style.width = `${((d.r + 10) / PANEL_W) * rect.width * 2}px`;
    ring.style.height = `${((d.r + 10) / PANEL_H) * rect.height * 2}px`;
    panel.appendChild(ring);
    setTimeout(() => ring.remove(), 3000);
  });
}

function useHint() {
  if (state.hintsLeft === 0 || remaining() === 0) return;
  startTimer();
  state.hintsLeft -= 1;
  state.score = Math.max(0, state.score - 50);
  const left = scene().diffs.map((d, i) => i).filter((i) => !state.found.has(i));
  const idx = left[Math.floor(Math.random() * left.length)];
  state.hintFlash = idx;
  playHint();
  $('toast').textContent = `Hint: look near — ${scene().diffs[idx].label}. (−50)`;
  render();
  setTimeout(() => { state.hintFlash = null; }, 3000);
}

function init() {
  document.querySelectorAll('.level-tab').forEach((btn, i) => {
    btn.addEventListener('click', () => { playClick(); loadLevel(i); });
  });
  ['left-panel', 'right-panel'].forEach((id) => {
    $(id).addEventListener('click', (e) => handlePanelClick(e, id));
  });
  $('hint-btn').addEventListener('click', useHint);
  $('restart-btn').addEventListener('click', () => { playClick(); loadLevel(state.level); });
  $('mute-btn').addEventListener('click', () => {
    setMuted(!isMuted());
    $('mute-btn').textContent = isMuted() ? '🔇 Muted' : '🔊 Sound';
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'h' || e.key === 'H') useHint();
    else if (e.key === 'r' || e.key === 'R') loadLevel(state.level);
    else if (e.key === 'm' || e.key === 'M') $('mute-btn').click();
    else if (e.key === 'n' || e.key === 'N') { if (remaining() === 0 && state.level < 2) loadLevel(state.level + 1); }
    else if (e.key === '1' || e.key === '2' || e.key === '3') loadLevel(Number(e.key) - 1);
  });
  const shot = params.get('shot');
  const level = Math.min(2, Math.max(0, Number(params.get('level') || 0)));
  const found = (params.get('found') || '').split(',').filter(Boolean).map(Number);
  if (shot === 'win') {
    loadLevel(2, [0, 1, 2, 3, 4, 5, 6]);
    state.seconds = 342;
    state.score = 2450;
    levelComplete();
    return;
  }
  loadLevel(level, found);
  if (found.length) { state.seconds = 47 + level * 30; state.score = found.length * 100; render(); }
}

init();
