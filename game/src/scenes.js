// Twinkle Town scenes: three original hand-drawn SVG pictures, each with
// exactly seven differences between the left and right panels.
// Every difference is a small, fair change: something missing, a colour
// swapped, or one detail altered. Coordinates are in the 560x420 viewBox
// of each panel, and each diff's x/y is the centre of the changed thing,
// so a click near it (within r) counts as a find on either panel.

export const PANEL_W = 560;
export const PANEL_H = 420;

function star(cx, cy, r, fill) {
  return `<path d="M ${cx} ${cy - r} L ${cx + r * 0.29} ${cy - r * 0.29} L ${cx + r} ${cy} L ${cx + r * 0.29} ${cy + r * 0.29} L ${cx} ${cy + r} L ${cx - r * 0.29} ${cy + r * 0.29} L ${cx - r} ${cy} L ${cx - r * 0.29} ${cy - r * 0.29} Z" fill="${fill}"/>`;
}

function croissant(cx, cy, s) {
  return `<g transform="translate(${cx} ${cy}) scale(${s})"><path d="M -26 6 Q -14 -14 0 -12 Q 14 -14 26 6 Q 12 12 0 10 Q -12 12 -26 6 Z" fill="#e8a34c" stroke="#b97a2e" stroke-width="2"/><path d="M -12 -8 L -8 8 M 0 -11 L 0 9 M 12 -8 L 8 8" stroke="#b97a2e" stroke-width="2" fill="none"/></g>`;
}

function koi(cx, cy, s, body, flip) {
  const f = flip ? -1 : 1;
  return `<g transform="translate(${cx} ${cy}) scale(${s * f} ${s})"><ellipse cx="0" cy="0" rx="26" ry="12" fill="${body}"/><circle cx="20" cy="-2" r="9" fill="${body}"/><circle cx="23" cy="-4" r="2.4" fill="#1d2b4f"/><path d="M -24 0 L -36 -9 L -36 9 Z" fill="${body}"/><path d="M -6 -10 Q 0 -18 6 -10 Z" fill="#fff" opacity="0.55"/><path d="M 4 -6 Q 12 -2 10 4" stroke="#fff" stroke-width="2" fill="none" opacity="0.7"/></g>`;
}

function cat(cx, cy, s, bow) {
  return `<g transform="translate(${cx} ${cy}) scale(${s})"><ellipse cx="0" cy="14" rx="34" ry="16" fill="#f4a259"/><circle cx="-16" cy="-8" r="17" fill="#f4a259"/><path d="M -30 -18 L -34 -34 L -20 -26 Z M -4 -18 L 0 -34 L 10 -26 Z" fill="#f4a259"/><circle cx="-22" cy="-10" r="2.4" fill="#2b2118"/><circle cx="-10" cy="-10" r="2.4" fill="#2b2118"/><path d="M -18 -2 Q -16 2 -14 -2" stroke="#2b2118" stroke-width="1.8" fill="none"/><path d="M 0 2 L 10 -4 L 10 6 Z" fill="${bow}"/><circle cx="0" cy="1" r="3.4" fill="${bow}"/><path d="M 28 8 Q 40 -6 34 -16" stroke="#f4a259" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;
}

function bakery(right) {
  return `<rect width="560" height="420" fill="#f6cf8f"/>
  <rect y="300" width="560" height="120" fill="#c98a4b"/>
  <rect x="36" y="28" width="150" height="128" rx="10" fill="#2b3a67" stroke="#8a5a2b" stroke-width="6"/>
  <circle cx="150" cy="62" r="20" fill="#ffe9a8"/><circle cx="142" cy="56" r="16" fill="#2b3a67" opacity="0.9"/>
  ${star(66, 58, 7, '#ffe9a8')}${right ? '' : star(96, 46, 5, '#ffe9a8')}${star(120, 92, 6, '#ffe9a8')}
  <rect x="36" y="118" width="150" height="8" fill="#8a5a2b"/>
  <rect x="240" y="30" width="80" height="10" fill="#8a5a2b"/>
  <line x1="280" y1="40" x2="280" y2="66" stroke="#5b3a1e" stroke-width="4"/>
  <path d="M 252 66 L 308 66 L 296 96 L 264 96 Z" fill="${right ? '#9aa0a8' : '#ffd166'}" stroke="#5b3a1e" stroke-width="3"/>
  ${right ? '' : `<circle cx="280" cy="104" r="26" fill="#ffd166" opacity="0.35"/>`}
  <rect x="360" y="36" width="164" height="92" rx="8" fill="#fff3d6" stroke="#8a5a2b" stroke-width="5"/>
  <text x="442" y="76" text-anchor="middle" font-size="26" font-weight="800" fill="#c0392b" font-family="Georgia, serif">FRESH</text>
  <text x="442" y="106" text-anchor="middle" font-size="26" font-weight="800" fill="#c0392b" font-family="Georgia, serif">BREAD</text>
  <rect x="40" y="168" width="480" height="12" fill="#8a5a2b"/>
  <g><rect x="70" y="118" width="52" height="50" rx="8" fill="#bfe3dd" stroke="#5b3a1e" stroke-width="3"/><circle cx="96" cy="142" r="12" fill="#e74c3c"/>${right ? '' : star(96, 142, 7, '#fff')}</g>
  <g><rect x="150" y="118" width="52" height="50" rx="8" fill="#f9e2b8" stroke="#5b3a1e" stroke-width="3"/><circle cx="176" cy="142" r="10" fill="#8e44ad"/></g>
  <rect x="330" y="128" width="34" height="40" rx="6" fill="#d98841" stroke="#5b3a1e" stroke-width="3"/>
  <rect x="380" y="128" width="34" height="40" rx="6" fill="#d98841" stroke="#5b3a1e" stroke-width="3"/>
  <rect x="430" y="128" width="34" height="40" rx="6" fill="#d98841" stroke="#5b3a1e" stroke-width="3"/>
  <rect x="30" y="292" width="500" height="16" fill="#8a5a2b"/>
  <g><rect x="250" y="238" width="110" height="54" rx="10" fill="#fff" stroke="#e8a0b4" stroke-width="3"/><rect x="250" y="238" width="110" height="18" rx="9" fill="#ff8fab"/><path d="M 268 238 L 268 222 M 292 238 L 292 218 M 316 238 L 316 222" stroke="#f4d35e" stroke-width="4"/>${right ? '' : `<path d="M 340 238 L 340 218" stroke="#f4d35e" stroke-width="4"/>`}<circle cx="268" cy="218" r="4" fill="#ffb703"/><circle cx="292" cy="214" r="4" fill="#ffb703"/><circle cx="316" cy="218" r="4" fill="#ffb703"/>${right ? '' : `<circle cx="340" cy="214" r="4" fill="#ffb703"/>`}</g>
  ${croissant(150, 280, 1)}${right ? '' : croissant(205, 280, 0.9)}
  <ellipse cx="178" cy="294" rx="72" ry="9" fill="#e8e0d0"/>
  <g><rect x="486" y="180" width="46" height="58" rx="8" fill="#e2725b" stroke="#5b3a1e" stroke-width="3"/><path d="M 509 180 L 509 152 M 509 152 L 496 132 M 509 152 L 522 132" stroke="#3d8b6f" stroke-width="4" fill="none"/>${right ? `<circle cx="509" cy="126" r="9" fill="#f2c94c"/>` : `<circle cx="509" cy="126" r="11" fill="#ff6b9d"/>`}</g>
  ${cat(430, 268, 0.85, right ? '#2a9d8f' : '#e63946')}
  <text x="280" y="392" text-anchor="middle" font-size="20" font-weight="700" fill="#5b3a1e" font-family="Georgia, serif">Moonlight Bakery · warm bread, sleepy cat</text>`;
}

function garden(right) {
  return `<rect width="560" height="420" fill="#1d2b4f"/>
  <circle cx="470" cy="66" r="30" fill="#ffe9a8"/><circle cx="458" cy="58" r="24" fill="#1d2b4f" opacity="0.85"/>
  ${star(60, 52, 7, '#ffe9a8')}${star(150, 36, 5, '#ffe9a8')}${star(240, 58, 6, '#ffe9a8')}${right ? '' : star(330, 40, 6, '#ffe9a8')}
  <path d="M 0 300 Q 140 260 280 300 T 560 300 L 560 420 L 0 420 Z" fill="#274b7a"/>
  <path d="M 0 330 Q 140 300 280 330 T 560 330 L 560 420 L 0 420 Z" fill="#2f6db3"/>
  <g><path d="M 60 300 Q 90 180 40 120 Q 90 150 110 90 Q 130 170 100 300 Z" fill="#2f6b3a"/><circle cx="72" cy="96" r="16" fill="#3d8b4f"/><circle cx="104" cy="130" r="13" fill="#3d8b4f"/>${right ? `<circle cx="88" cy="70" r="8" fill="#f2c94c"/>` : `<circle cx="88" cy="70" r="8" fill="#ff6b9d"/>`}</g>
  <g><line x1="200" y1="120" x2="200" y2="96" stroke="#5b3a1e" stroke-width="3"/><rect x="176" y="96" width="48" height="58" rx="10" fill="${right ? '#2a9d8f' : '#e63946'}" stroke="#5b3a1e" stroke-width="3"/><circle cx="200" cy="126" r="12" fill="#ffe9a8"/></g>
  <g><line x1="360" y1="120" x2="360" y2="96" stroke="#5b3a1e" stroke-width="3"/><rect x="336" y="96" width="48" height="58" rx="10" fill="#e63946" stroke="#5b3a1e" stroke-width="3"/><circle cx="360" cy="126" r="12" fill="#ffe9a8"/></g>
  <g><path d="M 218 318 Q 280 268 342 318" stroke="#8a5a2b" stroke-width="10" fill="none"/><rect x="232" y="292" width="12" height="26" rx="4" fill="#a9713f"/><rect x="256" y="282" width="12" height="26" rx="4" fill="#a9713f"/><rect x="280" y="278" width="12" height="26" rx="4" fill="#a9713f"/><rect x="304" y="282" width="12" height="26" rx="4" fill="#a9713f"/>${right ? '' : `<rect x="322" y="292" width="12" height="26" rx="4" fill="#a9713f"/>`}</g>
  <ellipse cx="120" cy="350" rx="52" ry="16" fill="#3d8b4f"/><ellipse cx="420" cy="360" rx="58" ry="17" fill="#3d8b4f"/><ellipse cx="290" cy="386" rx="46" ry="13" fill="#3d8b4f"/>
  ${koi(180, 332, 1, '#ff8c42', false)}${koi(330, 372, 0.9, '#fff', true)}${right ? '' : koi(330, 306, 0.85, '#ff6b9d', false)}
  <g><ellipse cx="420" cy="352" rx="20" ry="8" fill="#ff6b9d"/>${right ? `<ellipse cx="420" cy="352" rx="20" ry="8" fill="#ffffff"/>` : ''}</g>
  ${right ? '' : `<g><ellipse cx="120" cy="336" rx="22" ry="12" fill="#7ed957"/><circle cx="112" cy="330" r="3" fill="#1d2b4f"/><circle cx="128" cy="330" r="3" fill="#1d2b4f"/></g>`}
  <circle cx="90" cy="180" r="4" fill="#ffe66d"/><circle cx="150" cy="210" r="4" fill="#ffe66d"/><circle cx="430" cy="180" r="4" fill="#ffe66d"/><circle cx="490" cy="230" r="4" fill="#ffe66d"/>
  <text x="280" y="410" text-anchor="middle" font-size="18" font-weight="700" fill="#bcd6ff" font-family="Georgia, serif">Firefly Garden · koi, lanterns and one shy frog</text>`;
}

function bookNook(right) {
  return `<rect width="560" height="420" fill="#7fb3a0"/>
  <rect y="310" width="560" height="110" fill="#a9713f"/>
  <rect x="36" y="30" width="150" height="130" rx="10" fill="#274b7a" stroke="#5b3a1e" stroke-width="6"/>
  <circle cx="150" cy="66" r="18" fill="#ffe9a8"/>${star(66, 56, 6, '#ffe9a8')}${star(96, 96, 5, '#ffe9a8')}${right ? star(126, 56, 6, '#f2c94c') : star(126, 56, 6, '#ffe9a8')}
  <circle cx="470" cy="70" r="26" fill="#fff3d6" stroke="#5b3a1e" stroke-width="4"/>
  <line x1="470" y1="70" x2="470" y2="52" stroke="#2b2118" stroke-width="3"/><line x1="470" y1="70" x2="484" y2="78" stroke="#2b2118" stroke-width="3"/>${right ? '' : `<circle cx="470" cy="70" r="4" fill="#e63946"/>`}
  <rect x="220" y="36" width="180" height="120" rx="8" fill="#5b3a1e"/>
  <g><rect x="232" y="48" width="26" height="96" fill="#e63946"/><rect x="262" y="48" width="26" height="96" fill="#2a9d8f"/><rect x="292" y="48" width="26" height="96" fill="${right ? '#2a9d8f' : '#f2c94c'}"/><rect x="322" y="48" width="26" height="96" fill="#8e44ad"/><rect x="352" y="48" width="26" height="96" fill="#ff8c42"/></g>
  <rect x="220" y="168" width="180" height="120" rx="8" fill="#5b3a1e"/>
  <g><rect x="232" y="180" width="26" height="96" fill="#f2c94c"/><rect x="262" y="180" width="26" height="96" fill="#e63946"/><rect x="292" y="180" width="26" height="96" fill="#2a9d8f"/><rect x="322" y="180" width="26" height="96" fill="#ff8c42"/><rect x="352" y="180" width="26" height="96" fill="#8e44ad"/></g>
  <rect x="40" y="300" width="180" height="14" fill="#5b3a1e"/><rect x="52" y="314" width="12" height="40" fill="#5b3a1e"/><rect x="196" y="314" width="12" height="40" fill="#5b3a1e"/>
  <g><ellipse cx="130" cy="286" rx="30" ry="16" fill="#bfe3dd"/><path d="M 112 272 Q 130 250 148 272 Z" fill="#bfe3dd"/><circle cx="130" cy="254" r="6" fill="#e63946"/>${right ? '' : `<path d="M 122 240 Q 130 228 138 240" stroke="#fff" stroke-width="3" fill="none" opacity="0.8"/>`}</g>
  <rect x="300" y="300" width="200" height="90" rx="12" fill="#c0392b"/>
  ${cat(400, 268, 0.8, right ? '#e63946' : '#f2c94c')}
  <ellipse cx="280" cy="384" rx="130" ry="14" fill="#e63946"/><ellipse cx="280" cy="384" rx="90" ry="9" fill="#f2c94c"/>${right ? '' : `<ellipse cx="280" cy="384" rx="50" ry="5" fill="#2a9d8f"/>`}
  <g><rect x="486" y="220" width="44" height="66" rx="8" fill="#e2725b" stroke="#5b3a1e" stroke-width="3"/><path d="M 508 220 L 508 196 M 508 196 L 496 178 M 508 196 L 520 178" stroke="#3d8b6f" stroke-width="4" fill="none"/><circle cx="508" cy="172" r="9" fill="${right ? '#f2c94c' : '#ff6b9d'}"/></g>
  <text x="280" y="412" text-anchor="middle" font-size="18" font-weight="700" fill="#1d3a2f" font-family="Georgia, serif">Cosy Book Nook · tea, books and a cat who owns the chair</text>`;
}

export const SCENES = [
  {
    id: 'bakery', name: 'Moonlight Bakery', hint: 'Warm bread, sleepy cat',
    diffs: [
      { x: 96, y: 46, r: 22, label: 'a star vanished from the window' },
      { x: 280, y: 80, r: 26, label: 'the hanging lamp went out' },
      { x: 96, y: 142, r: 22, label: 'the star on the jam jar is gone' },
      { x: 340, y: 222, r: 20, label: 'the cake lost a candle' },
      { x: 205, y: 280, r: 26, label: 'a croissant is missing' },
      { x: 430, y: 272, r: 22, label: "the cat's bow changed colour" },
      { x: 509, y: 126, r: 20, label: 'the plant flower changed colour' },
    ],
    render: bakery,
  },
  {
    id: 'garden', name: 'Firefly Garden', hint: 'Koi, lanterns and one shy frog',
    diffs: [
      { x: 330, y: 40, r: 22, label: 'a star vanished from the sky' },
      { x: 200, y: 126, r: 26, label: 'a lantern changed colour' },
      { x: 330, y: 306, r: 26, label: 'a pink koi is missing' },
      { x: 420, y: 352, r: 24, label: 'the lily flower turned white' },
      { x: 120, y: 336, r: 24, label: 'the frog hopped away' },
      { x: 328, y: 305, r: 22, label: 'a bridge plank is missing' },
      { x: 88, y: 70, r: 20, label: 'a blossom changed colour' },
    ],
    render: garden,
  },
  {
    id: 'nook', name: 'Cosy Book Nook', hint: 'Tea, books and a cat who owns the chair',
    diffs: [
      { x: 470, y: 70, r: 22, label: 'the clock lost its red centre dot' },
      { x: 305, y: 96, r: 22, label: 'a book spine changed colour' },
      { x: 130, y: 236, r: 20, label: 'the teapot lost its steam' },
      { x: 280, y: 384, r: 24, label: 'a stripe vanished from the rug' },
      { x: 126, y: 56, r: 18, label: 'a window star turned gold' },
      { x: 400, y: 268, r: 26, label: "the cat's bow changed colour" },
      { x: 508, y: 172, r: 20, label: 'the plant flower changed colour' },
    ],
    render: bookNook,
  },
];

export function sceneSvg(scene, right, found) {
  const marks = scene.diffs.map((d, i) => {
    if (!found.has(i)) return '';
    // Number goes above the ring, except near the top edge where it goes
    // to the right of the ring (below would collide with the next diff).
    const side = d.y < 80;
    const nx = side ? d.x + d.r + 16 : d.x;
    const ny = side ? d.y + 6 : d.y - d.r - 10;
    const anchor = side ? 'start' : 'middle';
    return `<g><circle cx="${d.x}" cy="${d.y}" r="${d.r + 6}" fill="none" stroke="#ff4757" stroke-width="4"/><circle cx="${d.x}" cy="${d.y}" r="${d.r + 6}" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="4 4"/><text x="${nx}" y="${ny}" text-anchor="${anchor}" font-size="18" font-weight="800" fill="#ff4757" stroke="#fff" stroke-width="4" paint-order="stroke">${i + 1}</text></g>`;
  }).join('');
  return `<svg viewBox="0 0 ${PANEL_W} ${PANEL_H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${scene.name} picture">${scene.render(right)}${marks}</svg>`;
}
