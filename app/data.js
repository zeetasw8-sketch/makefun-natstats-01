// Indonesia in Numbers — the data behind the site.
//
// Every figure is a published national statistic, rounded for display.
// Sources are named on each page and in full on #/about: BPS (Statistics
// Indonesia) for the census, GDP, prices, jobs and poverty; the World Bank
// for population, GDP in dollars and life expectancy. Years are the reference
// year of the figure. Where a series is an estimate it is labelled so.

export const META = {
  country: 'Indonesia',
  tagline: 'The country in numbers — population, economy, health, education and regions.',
  updated: 'November 2026',
  currency: 'rupiah (Rp) and US dollars ($)',
  sources: ['BPS — Statistics Indonesia', 'World Bank — World Development Indicators'],
};

export const KEY = [
  { label: 'Population', value: '283.5 million', note: '2024, World Bank', href: '#/population' },
  { label: 'GDP', value: '$1.40 trillion', note: '2024, nominal', href: '#/economy' },
  { label: 'GDP per person', value: '$4,925', note: '2024', href: '#/economy' },
  { label: 'Life expectancy', value: '74.0 years', note: '2024', href: '#/health' },
  { label: 'Unemployment', value: '4.91%', note: 'August 2024, BPS', href: '#/economy' },
  { label: 'Poverty rate', value: '8.57%', note: 'September 2024, BPS', href: '#/economy' },
];

// Population, millions, 2015–2024 (World Bank / BPS estimates).
export const POPULATION_SERIES = [
  { year: 2015, value: 255.5 }, { year: 2016, value: 258.7 },
  { year: 2017, value: 261.9 }, { year: 2018, value: 265.0 },
  { year: 2019, value: 268.1 }, { year: 2020, value: 271.1 },
  { year: 2021, value: 273.9 }, { year: 2022, value: 276.4 },
  { year: 2023, value: 279.4 }, { year: 2024, value: 283.5 },
];

// Real GDP growth, percent per year (BPS).
export const GDP_GROWTH = [
  { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
  { year: 2021, value: 3.70 }, { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
];

// Consumer-price inflation, percent per year (BPS).
export const INFLATION = [
  { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 }, { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 }, { year: 2024, value: 1.57 },
];

// Poverty rate, percent of population (BPS, March/September rounds).
export const POVERTY = [
  { year: 2019, value: 9.22 }, { year: 2020, value: 10.19 },
  { year: 2021, value: 9.71 }, { year: 2022, value: 9.57 },
  { year: 2023, value: 9.36 }, { year: 2024, value: 8.57 },
];

// Open unemployment rate, percent (BPS, August round).
export const UNEMPLOYMENT = [
  { year: 2019, value: 5.28 }, { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 }, { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 }, { year: 2024, value: 4.91 },
];

// Life expectancy at birth, years (World Bank / BPS).
export const LIFE = [
  { year: 2019, value: 71.7 }, { year: 2020, value: 71.9 },
  { year: 2021, value: 72.0 }, { year: 2022, value: 72.2 },
  { year: 2023, value: 73.5 }, { year: 2024, value: 74.0 },
];

// GDP per person, US dollars (World Bank).
export const GDP_PC = [
  { year: 2019, value: 4174 }, { year: 2020, value: 3922 },
  { year: 2021, value: 4332 }, { year: 2022, value: 4788 },
  { year: 2023, value: 4919 }, { year: 2024, value: 4925 },
];

// Share of GDP by sector, 2024 (BPS). Percentages of GDP at current prices.
export const SECTORS = [
  { name: 'Manufacturing', share: 18.9 },
  { name: 'Agriculture, forestry & fishing', share: 12.5 },
  { name: 'Trade & repair', share: 13.0 },
  { name: 'Construction', share: 10.1 },
  { name: 'Mining & quarrying', share: 8.5 },
  { name: 'Transport & storage', share: 5.4 },
  { name: 'Information & communication', share: 4.1 },
  { name: 'Finance & insurance', share: 4.3 },
  { name: 'Other services', share: 23.2 },
];

// Age structure, 2024 (BPS estimate, percent of population).
export const AGE = [
  { group: '0–14 years', share: 24.5 },
  { group: '15–64 years', share: 68.4 },
  { group: '65+ years', share: 7.1 },
];

// Largest provinces by population, 2024 estimates (millions) with area and density.
export const PROVINCES = [
  { name: 'West Java', pop: 49.9, area: 35378, capital: 'Bandung' },
  { name: 'East Java', pop: 41.8, area: 47800, capital: 'Surabaya' },
  { name: 'Central Java', pop: 37.9, area: 32801, capital: 'Semarang' },
  { name: 'North Sumatra', pop: 15.6, area: 72981, capital: 'Medan' },
  { name: 'Banten', pop: 12.4, area: 9663, capital: 'Serang' },
  { name: 'Jakarta', pop: 10.7, area: 664, capital: 'Jakarta' },
  { name: 'South Sulawesi', pop: 9.5, area: 46717, capital: 'Makassar' },
  { name: 'Lampung', pop: 9.3, area: 34624, capital: 'Bandar Lampung' },
  { name: 'South Sumatra', pop: 9.0, area: 91592, capital: 'Palembang' },
  { name: 'Riau', pop: 6.9, area: 87024, capital: 'Pekanbaru' },
  { name: 'West Sumatra', pop: 5.8, area: 42013, capital: 'Padang' },
  { name: 'West Kalimantan', pop: 5.7, area: 147307, capital: 'Pontianak' },
  { name: 'Aceh', pop: 5.5, area: 57957, capital: 'Banda Aceh' },
  { name: 'East Nusa Tenggara', pop: 5.5, area: 48718, capital: 'Kupang' },
  { name: 'West Nusa Tenggara', pop: 5.5, area: 18572, capital: 'Mataram' },
];

// Health indicators, 2024 (BPS / World Bank).
export const HEALTH = [
  { label: 'Life expectancy', value: '74.0 years', note: 'at birth, 2024' },
  { label: 'Infant mortality', value: '16 per 1,000', note: 'live births, 2024 estimate' },
  { label: 'Under-5 mortality', value: '20 per 1,000', note: 'live births, 2024 estimate' },
  { label: 'Maternal mortality', value: '173 per 100,000', note: 'live births, 2023 estimate' },
  { label: 'Health spending', value: '3.7% of GDP', note: '2022, World Bank' },
  { label: 'Hospital beds', value: '1.2 per 1,000', note: 'people, 2023' },
];

// Education indicators (BPS / UNESCO).
export const EDUCATION = [
  { label: 'Adult literacy (15+)', value: '96.5%', note: '2023' },
  { label: 'Youth literacy (15–24)', value: '99.7%', note: '2023' },
  { label: 'Mean years of schooling', value: '9.0 years', note: '2024, age 25+' },
  { label: 'Primary enrolment', value: '99%', note: 'net, 2023' },
  { label: 'Secondary enrolment', value: '89%', note: 'net, 2023' },
  { label: 'Tertiary enrolment', value: '36%', note: 'gross, 2023' },
  { label: 'Education spending', value: '3.5% of GDP', note: '2023' },
];

// Country facts.
export const FACTS = [
  { label: 'Full name', value: 'Republic of Indonesia' },
  { label: 'Capital', value: 'Jakarta (Nusantara under construction)' },
  { label: 'Land area', value: '1,904,569 km²' },
  { label: 'Population density', value: '149 people per km²' },
  { label: 'Provinces', value: '38' },
  { label: 'Islands', value: '17,500+ (about 6,000 inhabited)' },
  { label: 'Official language', value: 'Indonesian (Bahasa Indonesia)' },
  { label: 'Currency', value: 'Rupiah (Rp)' },
  { label: 'Time zones', value: '3 (WIB, WITA, WIT)' },
  { label: 'Median age', value: '30.5 years' },
  { label: 'Urban population', value: '58% of total' },
  { label: 'Human Development Index', value: '0.734 (high, 2023)' },
];
