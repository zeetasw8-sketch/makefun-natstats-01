// Page renderers for Indonesia in Numbers. Each function returns an HTML
// string for one hash route. Charts come from charts.js; figures from data.js.
// The regions page owns the only state on the site: a search box and a
// sortable table, both handled by plain DOM code in main.js after render.

import {
  META, KEY, POPULATION_SERIES, GDP_GROWTH, INFLATION, POVERTY,
  UNEMPLOYMENT, LIFE, GDP_PC, SECTORS, AGE, PROVINCES, HEALTH,
  EDUCATION, FACTS,
} from './data.js';
import { barChart, lineChart, shareBars } from './charts.js';

const sourceLine = (who) => `<p class="source">Source: ${who}. Figures rounded; see <a href="#/about">Sources &amp; methods</a>.</p>`;

const statCard = (k) => `
  <a class="card" href="${k.href}">
    <span class="card-label">${k.label}</span>
    <span class="card-value">${k.value}</span>
    <span class="card-note">${k.note}</span>
  </a>`;

const factRows = (rows) => rows.map((r) => `
  <tr><th scope="row">${r.label}</th><td>${r.value}</td><td class="muted">${r.note}</td></tr>`).join('');

export function overview() {
  return `
  <section class="hero">
    <p class="eyebrow">National statistics portal · Updated ${META.updated}</p>
    <h1>${META.country} in Numbers</h1>
    <p class="lede">${META.tagline}</p>
    <p class="lede-sub">All figures from ${META.sources.join(' and ')}. Nothing on this site is fetched from the network — every number lives in the site's own files.</p>
  </section>
  <section class="grid" aria-label="Key indicators">
    ${KEY.map(statCard).join('')}
  </section>
  <section class="panel">
    <h2>Population is still growing</h2>
    <p>Indonesia added about 28 million people between 2015 and 2024 — roughly the population of Malaysia — and is now the world's fourth most populous country, after India, China and the United States.</p>
    ${lineChart(POPULATION_SERIES, '', (v) => `${v.toFixed(0)}m`)}
    ${sourceLine('World Bank, World Development Indicators; BPS')}
  </section>
  <section class="panel">
    <h2>The country at a glance</h2>
    <table class="facts">
      <tbody>
        ${FACTS.slice(0, 6).map((f) => `<tr><th scope="row">${f.label}</th><td>${f.value}</td></tr>`).join('')}
      </tbody>
    </table>
    <p><a class="btn" href="#/regions">Explore the 38 provinces →</a></p>
  </section>`;
}

export function population() {
  return `
  <h1>Population</h1>
  <p class="lede">283.5 million people in 2024, spread over 17,500 islands and 38 provinces. Java alone holds more than half the country.</p>
  <section class="panel">
    <h2>Population, 2015–2024 (millions)</h2>
    ${lineChart(POPULATION_SERIES, '', (v) => `${v.toFixed(0)}m`)}
    ${sourceLine('World Bank, World Development Indicators; BPS')}
  </section>
  <section class="panel">
    <h2>Age structure, 2024</h2>
    <p>More than two in three Indonesians are of working age (15–64). The share over 65 is small but rising — the country is ageing slowly.</p>
    ${shareBars(AGE)}
    ${sourceLine('BPS estimate')}
  </section>
  <section class="panel">
    <h2>Largest provinces</h2>
    <p>West Java is the largest province by population — bigger than most countries. The ten largest provinces hold about two-thirds of all Indonesians.</p>
    ${barChart(PROVINCES.slice(0, 8).map((p) => ({ label: p.name.replace(' ', ' '), value: p.pop })), 'm')}
    ${sourceLine('BPS, 2024 estimates')}
    <p><a class="btn" href="#/regions">See the full province table →</a></p>
  </section>`;
}

export function economy() {
  return `
  <h1>Economy</h1>
  <p class="lede">A $1.40 trillion economy in 2024 — the largest in Southeast Asia and the 16th largest in the world — growing about 5% a year.</p>
  <section class="panel">
    <h2>Real GDP growth, % per year</h2>
    <p>The economy shrank in 2020, the COVID year, then returned to about 5% growth and stayed there.</p>
    ${barChart(GDP_GROWTH.map((d) => ({ label: String(d.year), value: d.value })), '%')}
    ${sourceLine('BPS')}
  </section>
  <section class="panel">
    <h2>GDP per person, US dollars</h2>
    ${lineChart(GDP_PC, '', (v) => `$${v.toLocaleString('en-US')}`)}
    ${sourceLine('World Bank')}
  </section>
  <section class="panel">
    <h2>What the economy is made of, 2024 (% of GDP)</h2>
    ${shareBars(SECTORS)}
    ${sourceLine('BPS')}
  </section>
  <section class="panel">
    <h2>Prices, jobs and poverty</h2>
    <div class="two">
      <div>
        <h3>Inflation, % per year</h3>
        ${barChart(INFLATION.map((d) => ({ label: String(d.year), value: d.value })), '%')}
        ${sourceLine('BPS, consumer prices')}
      </div>
      <div>
        <h3>Poverty rate, % of population</h3>
        ${barChart(POVERTY.map((d) => ({ label: String(d.year), value: d.value })), '%')}
        ${sourceLine('BPS')}
      </div>
    </div>
    <h3>Unemployment, % of the labour force</h3>
    ${barChart(UNEMPLOYMENT.map((d) => ({ label: String(d.year), value: d.value })), '%')}
    ${sourceLine('BPS, August round')}
  </section>`;
}

export function health() {
  return `
  <h1>Health</h1>
  <p class="lede">Indonesians live longer than ever — life expectancy reached 74.0 years in 2024 — but child and maternal mortality are still high for the region.</p>
  <section class="panel">
    <h2>Life expectancy at birth, years</h2>
    ${lineChart(LIFE, '', (v) => v.toFixed(1))}
    ${sourceLine('World Bank; BPS')}
  </section>
  <section class="panel">
    <h2>Health in 2024</h2>
    <table class="facts"><tbody>${factRows(HEALTH)}</tbody></table>
    ${sourceLine('BPS; World Bank')}
  </section>
  <section class="panel">
    <h2>Reading the numbers</h2>
    <p>Infant mortality has fallen by more than half since 2000, from about 41 to about 16 deaths per 1,000 live births. Maternal mortality has fallen too, but at 173 per 100,000 live births it remains well above neighbours such as Thailand and Malaysia — the main reason health is a national priority.</p>
  </section>`;
}

export function education() {
  return `
  <h1>Education</h1>
  <p class="lede">Almost every young Indonesian can read and write, and nearly every child is in primary school. The gap is what comes after: only about a third of young adults reach university.</p>
  <section class="panel">
    <h2>Education in 2023–2024</h2>
    <table class="facts"><tbody>${factRows(EDUCATION)}</tbody></table>
    ${sourceLine('BPS; UNESCO Institute for Statistics')}
  </section>
  <section class="panel">
    <h2>Reading the numbers</h2>
    <p>Mean years of schooling for adults is 9.0 — roughly the end of junior secondary school. The government spends about 3.5% of GDP on education, below the 4–6% UNESCO recommends, and the 12-year compulsory schooling programme is the main tool for closing the gap.</p>
  </section>`;
}

export function regions() {
  return `
  <h1>Regions</h1>
  <p class="lede">38 provinces. The table below lists the 15 largest by population — type to filter, click a column header to sort.</p>
  <section class="panel">
    <div class="toolbar">
      <label for="q">Filter provinces
        <input id="q" type="search" placeholder="Type a province name…" autocomplete="off">
      </label>
      <span class="count" id="count"></span>
    </div>
    <div class="table-wrap">
      <table class="data" id="prov">
        <thead>
          <tr>
            <th data-k="name">Province</th>
            <th data-k="capital">Capital</th>
            <th data-k="pop" data-num="1">Population (millions, 2024)</th>
            <th data-k="area" data-num="1">Area (km²)</th>
            <th data-k="density" data-num="1">Density (per km²)</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
    ${sourceLine('BPS, 2024 estimates; density = population ÷ area')}
    <p>Jakarta is the densest by far — about 16,000 people per km² — while the provinces of Kalimantan and Papua are the emptiest. The full list of 38 provinces is in the <a href="#/about">sources page</a>.</p>
  </section>`;
}

export function about() {
  return `
  <h1>Sources &amp; methods</h1>
  <p class="lede">Where every number on this site comes from, and what was rounded.</p>
  <section class="panel">
    <h2>Sources</h2>
    <ul>
      <li><strong>BPS — Statistics Indonesia</strong> (bps.go.id): population census and intercensal estimates, GDP and growth, consumer prices, unemployment (August round), poverty (March and September rounds), provincial figures.</li>
      <li><strong>World Bank — World Development Indicators</strong> (data.worldbank.org): population, GDP in US dollars, GDP per person, life expectancy, health and education spending.</li>
      <li><strong>UNESCO Institute for Statistics</strong>: enrolment and literacy rates.</li>
    </ul>
  </section>
  <section class="panel">
    <h2>Methods and notes</h2>
    <ul>
      <li>Figures are rounded for display: population to 0.1 million, rates to two decimals, money to the nearest dollar. Underlying series are annual.</li>
      <li>Provincial populations are 2024 estimates; densities are population divided by land area.</li>
      <li>Life expectancy for 2023–2024 reflects the BPS revision of the series; the jump from 2022 is a methods change, not a one-year leap.</li>
      <li>GDP per person is nominal GDP divided by population, in current US dollars.</li>
      <li>Nothing on this site is fetched from the network. All data is in the site's own files, and the site works offline.</li>
    </ul>
  </section>
  <section class="panel">
    <h2>All 38 provinces</h2>
    <p>Aceh, North Sumatra, West Sumatra, Riau, Riau Islands, Jambi, South Sumatra, Bangka Belitung, Bengkulu, Lampung, Banten, Jakarta, West Java, Central Java, Yogyakarta, East Java, Bali, West Nusa Tenggara, East Nusa Tenggara, West Kalimantan, Central Kalimantan, South Kalimantan, East Kalimantan, North Kalimantan, North Sulawesi, Gorontalo, Central Sulawesi, South Sulawesi, Southeast Sulawesi, West Sulawesi, Maluku, North Maluku, West Papua, Southwest Papua, Papua, South Papua, Central Papua, Highland Papua.</p>
  </section>`;
}

export function missing() {
  return `
  <h1>Page not found</h1>
  <p class="lede">That section does not exist. Try one of the sections above.</p>
  <p><a class="btn" href="#/">Back to the overview →</a></p>`;
}
