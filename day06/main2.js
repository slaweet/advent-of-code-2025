if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

const fs = require('fs');
const filename = process.argv[2];

try {
  const data = fs.readFileSync(filename, 'utf8');
  const rows = data.toString().split('\n').map((row) => row.split('')).slice(0, -1);

  const operations = {
    '+': (a, b) => a + b,
    '*': (a, b) => a * b,
  };
  const initialValues = { '+' : 0, '*': 1 }

  const results = rows[rows.length - 1].reduce((resultsArrays, value, j) => {
    const verticalNumber = parseFloat([...Array(rows.length - 1)].map((__, i) => rows[i][j]).join('').trim());
    if (isNaN(verticalNumber)) {
      resultsArrays.unshift([rows[rows.length - 1][j + 1]]);
    } else {
      resultsArrays[0].push(verticalNumber);
    }
    return resultsArrays;
  }, [[rows[rows.length - 1][0]]]);

  const output = results
    .map((problem) => 
      problem.slice(1).reduce(
        (sum, value) => operations[problem[0]](sum, value),
        initialValues[problem[0]]
      )
    )
    .reduce((sum, value) => sum + value, 0);

  console.log(output);
} catch(e) {
  console.log('Error:', e.stack);
}
