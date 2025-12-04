if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

const fs = require('fs');
const filename = process.argv[2];

try {
  const data = fs.readFileSync(filename, 'utf8');
  const rows = data.toString().trim().split('\n');
  const floorMap = rows.map((row) => row.split(''));

  function canBeAccesed(x, y) {
    return [
      floorMap[y - 1]?.[x - 1],
      floorMap[y - 1]?.[x + 1],
      floorMap[y + 1]?.[x - 1],
      floorMap[y + 1]?.[x + 1],
      floorMap[y]?.[x + 1],
      floorMap[y]?.[x - 1],
      floorMap[y + 1]?.[x],
      floorMap[y - 1]?.[x],
    ].filter((value) => value === '@').length < 4;
  }
  
  const output = floorMap.map((row, y) => row.map((tile, x) => (
    (floorMap[y][x] === '@' && canBeAccesed(x, y)) ? 1 : 0
  ))).flat().filter(Boolean).length;

  console.log(output);
} catch(e) {
  console.log('Error:', e.stack);
}
