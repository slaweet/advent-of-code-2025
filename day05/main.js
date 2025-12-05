if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

const fs = require('fs');
const filename = process.argv[2];

try {
  const data = fs.readFileSync(filename, 'utf8');
  const [part1, part2] =  data.toString().trim().split('\n\n');
  const freshRanges = part1.split('\n').map((row) => row.split('-').map(parseFloat));
  const availableIngredients = part2.split('\n').map(parseFloat);

  function isFresh(ingredient) {
    return freshRanges.some((range) => range[0] <= ingredient && ingredient <= range[1]);
  }
  
  const output = availableIngredients.filter(isFresh).length;

  console.log(output);
} catch(e) {
  console.log('Error:', e.stack);
}
