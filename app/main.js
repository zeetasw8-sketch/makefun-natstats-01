// Indonesia in Numbers: hash router and the regions table.
//
//   #/                overview
//   #/population      population
//   #/economy         economy
//   #/health          health
//   #/education       education
//   #/regions         provinces, with a filter box and a sortable table
//   #/about           sources and methods
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { PROVINCES } from './data.js';
import { about, economy, education, health, missing, overview, population, regions } from './views.js';

const app = document.getElementById('app');
const NAV = [
  ['#/', 'Overview'], ['#/population', 'Population'], ['#/economy', 'Economy'],
  ['#/health', 'Health'], ['#/education', 'Education'], ['#/regions', 'Regions'],
  ['#/about', 'Sources'],
];

const PAGES = {
  '': overview, population, economy, health, education, regions, about,
};

// The regions table: filter by name, sort by column, density computed here.
let sortKey = 'pop';
let sortDir = -1;
let query = '';

function density(p) {
  return Math.round((p.pop * 1e6) / p.area);
}

function rows() {
  const q = query.trim().toLowerCase();
  let list = PROVINCES.map((p) => ({ ...p, density: density(p) }));
  if (q) list = list.filter((p) => p.name.toLowerCase().includes(q));
  list.sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    const c = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
    return c * sortDir;
  });
  return list;
}

function paintTable() {
  const tbody = document.querySelector('#prov tbody');
  const count = document.querySelector('#count');
  if (!tbody) return;
  const list = rows();
  tbody.innerHTML = list.map((p) => `
    <tr>
      <td>${p.name}</td><td>${p.capital}</td>
      <td class="num">${p.pop.toFixed(1)}</td>
      <td class="num">${p.area.toLocaleString('en-US')}</td>
      <td class="num">${p.density.toLocaleString('en-US')}</td>
    </tr>`).join('') || '<tr><td colspan="5">No province matches that filter.</td></tr>';
  if (count) count.textContent = `${list.length} of ${PROVINCES.length} provinces shown`;
  document.querySelectorAll('#prov th').forEach((th) => {
    th.classList.toggle('sorted', th.dataset.k === sortKey);
    th.textContent = th.textContent.replace(/ [▲▼]$/, '');
    if (th.dataset.k === sortKey) th.textContent += sortDir === 1 ? ' ▲' : ' ▼';
  });
}

function wireRegions() {
  const input = document.getElementById('q');
  if (!input) return;
  input.addEventListener('input', () => { query = input.value; paintTable(); });
  document.querySelectorAll('#prov th').forEach((th) => {
    th.addEventListener('click', () => {
      const k = th.dataset.k;
      if (k === sortKey) sortDir *= -1;
      else { sortKey = k; sortDir = th.dataset.num ? -1 : 1; }
      paintTable();
    });
  });
  paintTable();
}

function render() {
  window.__shotReady = false;
  const hash = location.hash.replace(/^#\/?/, '').replace(/\/$/, '');
  const page = PAGES[hash] || missing;
  const key = hash.split('/')[0];
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === `#/${key}` || (key === '' && a.getAttribute('href') === '#/'));
  });
  const titles = {
    '': 'Indonesia in Numbers', population: 'Population', economy: 'Economy',
    health: 'Health', education: 'Education', regions: 'Regions', about: 'Sources & methods',
  };
  document.title = `${titles[key] ?? 'Not found'} | Indonesia in Numbers`;
  app.innerHTML = page();
  if (hash === 'regions') wireRegions();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

const nav = document.querySelector('nav');
nav.innerHTML = NAV.map(([href, label]) => `<a href="${href}">${label}</a>`).join('');

window.addEventListener('hashchange', render);
render();
