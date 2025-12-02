if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

const fs = require('fs');
const filename = process.argv[2];

try {
  const data = fs.readFileSync(filename, 'utf8');
  const rows = data.toString().trim().split(',');
  
  const idRanges = rows.map((row) => row.split('-').map(parseFloat));

  const output = idRanges.map(([start, end]) => {
    const invalidIds = [];
    for (let i = start; i <= end; i++) {
      const idString = `${i}`;
      const halfLenght = idString.length / 2;
      const idParts = [idString.substr(0, halfLenght), idString.substr(halfLenght)];
      if (idParts[0] === idParts[1]) {
        invalidIds.push(i);
      }
    }
    return invalidIds;
  }).flat().reduce((sum, next) => sum + next);

  console.log(output);
} catch(e) {
  console.log('Error:', e.stack);
}
