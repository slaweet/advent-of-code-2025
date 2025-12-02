if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

const fs = require('fs');
const filename = process.argv[2];

function isInvalidId(id) {
  const idString = `${id}`;
  const halfLenght = idString.length / 2;
  for (let i = 1; i <= halfLenght; i++) {
    const firstPart = idString.substr(0, i);
    if (idString.length % i === 0 && Array(idString.length / i + 1).join(firstPart) === idString) {
      return true;
    }
  }
}

try {
  const data = fs.readFileSync(filename, 'utf8');
  const rows = data.toString().trim().split(',');
  
  const idRanges = rows.map((row) => row.split('-').map(parseFloat));

  const output = idRanges.map(([start, end]) => {
    const invalidIds = [];
    for (let i = start; i <= end; i++) {
      if (isInvalidId(i)) {
        invalidIds.push(i);
      }
    }
    return invalidIds;
  }).flat().reduce((sum, next) => sum + next, 0);

  console.log(output);
} catch(e) {
  console.log('Error:', e.stack);
}
