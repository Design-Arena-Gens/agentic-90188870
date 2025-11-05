const fs = require('fs');
const path = require('path');
const { feature } = require('topojson-client');
const world50m = require('world-atlas/countries-50m.json');

function main() {
  const countries = feature(world50m, world50m.objects.countries);
  const iran = countries.features.find((f) => String(f.id) === '364'); // ISO numeric for Iran
  if (!iran) {
    throw new Error('Iran feature not found in world-atlas countries-50m dataset');
  }
  iran.properties = {
    name: 'Iran',
    iso_a3: 'IRN',
    iso_n3: '364',
    source: 'world-atlas countries-50m',
  };

  const outDir = path.join(__dirname, '..', 'public');
  const outPath = path.join(outDir, 'iran.geo.json');
  fs.writeFileSync(outPath, JSON.stringify(iran));
  console.log(`Wrote ${outPath}`);
}

main();
