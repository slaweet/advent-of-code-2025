if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

const fs = require('fs');
const filename = process.argv[2];

try {
  const data = fs.readFileSync(filename, 'utf8');
  const rows = data.toString().trim().split('\n');
  
  const joltageLists = rows.map((row) => row.split('').map(parseFloat));

  const output = joltageLists.map((joltages) => {
    const max1 = Math.max(...joltages.slice(0, joltages.length - 1));
    const max2 = Math.max(...joltages.slice(joltages.indexOf(max1) + 1));
    return max1 * 10 + max2;
  }).reduce((value, sum) => value + sum);

  console.log(output);
} catch(e) {
  console.log('Error:', e.stack);
}
