// Tiny WebAudio sound effects, synthesised at play time: no audio files,
// no network, nothing to download. Muted until the player first interacts,
// as browsers require.

let ctx = null;
let muted = false;

export function setMuted(value) {
  muted = value;
}

export function isMuted() {
  return muted;
}

function ensureCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function tone(freq, start, dur, type, vol) {
  if (muted) return;
  try {
    const ac = ensureCtx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, ac.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(vol, ac.currentTime + start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + start + dur);
    osc.connect(gain).connect(ac.destination);
    osc.start(ac.currentTime + start);
    osc.stop(ac.currentTime + start + dur + 0.05);
  } catch {
    // Sound is decoration: a blocked AudioContext never breaks the game.
  }
}

export function playFound() {
  tone(660, 0, 0.18, 'sine', 0.16);
  tone(880, 0.09, 0.22, 'sine', 0.16);
  tone(1320, 0.18, 0.3, 'sine', 0.1);
}

export function playWrong() {
  tone(180, 0, 0.16, 'square', 0.06);
  tone(140, 0.08, 0.2, 'square', 0.05);
}

export function playHint() {
  tone(520, 0, 0.12, 'triangle', 0.12);
  tone(780, 0.1, 0.16, 'triangle', 0.12);
}

export function playWin() {
  [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.35, 'sine', 0.15));
}

export function playClick() {
  tone(440, 0, 0.06, 'sine', 0.07);
}
