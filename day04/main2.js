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

  let removedRollsCount = 0;
  let infiniteLoopPreventionCounter = 10000;
  
  while(floorMap.map((row, y) => row.map((tile, x) => {
    const isAccessed = (floorMap[y][x] === '@' && canBeAccesed(x, y));
    if (isAccessed) {
      floorMap[y][x] = '.';
      removedRollsCount += 1;
    }
    return isAccessed;
  })).flat().filter(Boolean).length > 0 && infiniteLoopPreventionCounter > 0) {
    infiniteLoopPreventionCounter -= 1;
  }

  const output = removedRollsCount;

  console.log(output);
} catch(e) {
  console.log('Error:', e.stack);
}
