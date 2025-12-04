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
    let maxVals = [Math.max(...joltages.slice(0, joltages.length - 11))];
    let lastIndexOf = joltages.indexOf(maxVals[0]);
    for (let i = 1; i < 12; i++) {
      maxVals.push(Math.max(...joltages.slice(lastIndexOf + 1, joltages.length - (11 - i))));
      lastIndexOf += joltages.slice(lastIndexOf + 1).indexOf(maxVals[i]) + 1;
    }
    return parseFloat(maxVals.join(''));
  }).reduce((value, sum) => value + sum, 0);

  console.log(output);
} catch(e) {
  console.log('Error:', e.stack);
}
