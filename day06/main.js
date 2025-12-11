if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

const fs = require('fs');
const filename = process.argv[2];

try {
  const data = fs.readFileSync(filename, 'utf8');
  const rows = data.toString().trim().split('\n').map((row) => row.trim().split(/\s+/));

  const operations = {
    '+': (a, b) => a + b,
    '*': (a, b) => a * b,
  };
  const initialValues = { '+' : 0, '*': 1 }

  const results = rows[0].map((_, j) => (
    [...Array(rows.length - 1)].reduce(
      (sum, __, i) => (
        operations[rows[rows.length - 1][j]](sum, parseFloat(rows[i][j]))
      ),
      initialValues[rows[rows.length - 1][j]]
    )
  ));

  const output = results.reduce((sum, value) => sum + value, 0);

  console.log(output);
} catch(e) {
  console.log('Error:', e.stack);
}
