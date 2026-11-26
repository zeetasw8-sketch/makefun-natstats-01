// Small SVG chart builders, no library: a bar chart and a line chart.
// Both take an array of { year, value } (or { name, share }) and return an
// SVG string. They scale to their container, label every value, and use a
// single accent colour so the charts read the same across the site.

const INK = '#17324f';
const ACCENT = '#0b6e4f';
const GRID = '#dbe4ec';
const MUTED = '#5d7285';

function niceMax(values) {
  const m = Math.max(...values.map(Math.abs));
  if (m <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(m)));
  const n = m / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return step * pow;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Axis labels: round to 2 decimals and drop trailing zeros, so a gridline
// never prints a floating-point tail like 0.9475000000000002.
function axis(v) {
  return String(Number(v.toFixed(2)));
}

// Vertical bars. `data` is [{ label, value }], `unit` is appended to values.
export function barChart(data, unit = '') {
  const W = 640, H = 300, padL = 56, padR = 16, padT = 28, padB = 34;
  const max = niceMax(data.map((d) => d.value));
  const min = Math.min(0, ...data.map((d) => d.value));
  const span = max - min || 1;
  const iw = W - padL - padR, ih = H - padT - padB;
  const bw = iw / data.length;
  const y = (v) => padT + ih - ((v - min) / span) * ih;
  const zeroY = y(0);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="bar chart" class="chart">`;
  for (let i = 0; i <= 4; i++) {
    const v = min + (span * i) / 4;
    const yy = y(v);
    s += `<line x1="${padL}" y1="${yy}" x2="${W - padR}" y2="${yy}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${axis(v)}${unit}</text>`;
  }
  s += `<line x1="${padL}" y1="${zeroY}" x2="${W - padR}" y2="${zeroY}" stroke="${INK}" stroke-width="1.5"/>`;
  data.forEach((d, i) => {
    const x = padL + i * bw + bw * 0.18;
    const w = bw * 0.64;
    const top = y(Math.max(d.value, 0));
    const bot = y(Math.min(d.value, 0));
    s += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${w.toFixed(1)}" height="${Math.max(1, bot - top).toFixed(1)}" rx="3" fill="${ACCENT}"/>`;
    s += `<text x="${(x + w / 2).toFixed(1)}" y="${(top - 7).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${d.value}${unit}</text>`;
    s += `<text x="${(x + w / 2).toFixed(1)}" y="${H - 12}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(d.label)}</text>`;
  });
  return s + '</svg>';
}

// Line chart. `data` is [{ year, value }], `unit` appended to values, `fmt` formats a value.
export function lineChart(data, unit = '', fmt = null) {
  const W = 640, H = 300, padL = 56, padR = 20, padT = 28, padB = 34;
  const vals = data.map((d) => d.value);
  let max = Math.max(...vals), min = Math.min(...vals);
  const pad = (max - min || 1) * 0.15;
  max += pad; min -= pad;
  const iw = W - padL - padR, ih = H - padT - padB;
  const x = (i) => padL + (iw * i) / (data.length - 1);
  const y = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  const show = (v) => (fmt ? fmt(v) : `${axis(v)}${unit}`);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="line chart" class="chart">`;
  for (let i = 0; i <= 4; i++) {
    const v = min + ((max - min) * i) / 4;
    const yy = y(v);
    s += `<line x1="${padL}" y1="${yy}" x2="${W - padR}" y2="${yy}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${show(v)}</text>`;
  }
  const pts = data.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
  s += `<polyline points="${pts}" fill="none" stroke="${ACCENT}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  data.forEach((d, i) => {
    s += `<circle cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="4" fill="#ffffff" stroke="${ACCENT}" stroke-width="2.5"/>`;
    s += `<text x="${x(i).toFixed(1)}" y="${(y(d.value) - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${show(d.value)}</text>`;
    s += `<text x="${x(i).toFixed(1)}" y="${H - 12}" text-anchor="middle" font-size="11" fill="${MUTED}">${d.year}</text>`;
  });
  return s + '</svg>';
}

// Horizontal bars for shares (e.g. sectors, age groups). `data` is [{ name, share }].
export function shareBars(data) {
  const W = 640, rowH = 34, padL = 210, padR = 52, padT = 8;
  const H = padT + data.length * rowH + 12;
  const max = Math.max(...data.map((d) => d.share));
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="share chart" class="chart">`;
  data.forEach((d, i) => {
    const y = padT + i * rowH;
    const w = ((W - padL - padR) * d.share) / max;
    s += `<text x="${padL - 10}" y="${y + 19}" text-anchor="end" font-size="12" fill="${INK}">${esc(d.name)}</text>`;
    s += `<rect x="${padL}" y="${y + 6}" width="${Math.max(2, w).toFixed(1)}" height="18" rx="3" fill="${ACCENT}"/>`;
    s += `<text x="${(padL + Math.max(2, w) + 8).toFixed(1)}" y="${y + 20}" font-size="12" font-weight="600" fill="${INK}">${d.share}%</text>`;
  });
  return s + '</svg>';
}
