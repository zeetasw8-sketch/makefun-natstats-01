# Indonesia in Numbers

A national statistics portal for Indonesia — population, economy, health,
education and regions — as a static site that works offline in a desktop
browser and on a phone. Every number is a published figure from BPS
(Statistics Indonesia) or the World Bank, with the source and year named on
the page. Nothing is fetched from the network: all data lives in the site's
own files.

## What it is

- **Overview** — the country at a glance: six key indicators (population,
  GDP, GDP per person, life expectancy, unemployment, poverty) and a
  population trend chart.
- **Population** — growth 2015–2024, age structure, and the largest
  provinces.
- **Economy** — GDP growth, GDP per person, what the economy is made of,
  inflation, poverty and unemployment, each as a chart.
- **Health** — life expectancy trend and the main health indicators.
- **Education** — literacy, enrolment and years of schooling.
- **Regions** — the 15 largest provinces in a table you can filter by name
  and sort by any column; density is computed from population and area.
- **Sources & methods** — where every number comes from, what was rounded,
  and the full list of 38 provinces.

## How it is built

Static files under `app/` — `index.html`, `style.css`, and ES modules
(`main.js`, `views.js`, `charts.js`, `data.js`). No build step, no framework,
no network request. Charts are small SVG builders in `charts.js`. The router
is hash-based, so every section is a link, and `window.__shotReady` tells a
screenshot script when a page has rendered.

## Run it

```sh
node serve.ts        # serves app/ on http://localhost:8080
```

Hand it in (writes `/output`, or the directory in `MAKEFUN_OUTPUT_DIR`):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output and writes
`dossier.json` with the vendored make.fun library.

## Screenshots

`shots.json` lists the screenshots in `screenshots/`: the overview and the
economy page on desktop (1280×800), and the regions table on a phone
(390×844).

## Sources

BPS — Statistics Indonesia (bps.go.id); World Bank — World Development
Indicators (data.worldbank.org); UNESCO Institute for Statistics. See
#/about in the site for the full list and the methods notes.
