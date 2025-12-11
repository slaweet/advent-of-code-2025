if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

const fs = require('fs');
const filename = process.argv[2];

try {
  const data = fs.readFileSync(filename, 'utf8');
  const rows =  data.toString().trim().split('\n').map((row) => row.split(''));

  let splitCount = 0;
  rows.forEach((row, y) => {
    row.forEach((current, x) => {
      if (['S', '|'].includes(current) && rows[y + 1]) {
        if (rows[y + 1][x] === '.') {
        rows[y + 1][x] = '|';
        } else if (rows[y + 1][x] === '^') {
          splitCount += 1;
          rows[y + 1][x + 1] = '|';
          rows[y + 1][x - 1] = '|';
        }
      }
    })
  })
  
  const output = splitCount;

  console.log(output);
} catch(e) {
  console.log('Error:', e.stack);
}
