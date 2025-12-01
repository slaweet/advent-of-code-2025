if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

const fs = require('fs');
const filename = process.argv[2];

try {
  const data = fs.readFileSync(filename, 'utf8');
  const rows = data.toString().trim().split('\n');
  
  const rotations = rows.map((row) => (row[0] === 'L' ? -1 : 1) * parseFloat(row.substring(1)))

  let password = 0;

  rotations.reduce((previous, next) => {
    const move = previous + next;
    const newDial = (move + 10000) % 100;
    if (move > 99) {
      password += (move - newDial) / 100;
    } else if (previous !== 0 && move < 0) {
      password += (move - newDial) / -100;
      if (newDial === 0) {
        password += 1;
      }
    } else if (previous === 0 && move < -100) {
      password += ((move - newDial) / -100) - 1;
    } else if (newDial === 0) {
      password += 1;
    }
    return newDial;
  }, 50);

  output = password;

  console.log(output);
} catch(e) {
  console.log('Error:', e.stack);
}
