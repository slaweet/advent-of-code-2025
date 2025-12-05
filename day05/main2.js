if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

const fs = require('fs');
const filename = process.argv[2];

try {
  const data = fs.readFileSync(filename, 'utf8');
  const [part1] =  data.toString().trim().split('\n\n');
  const freshRanges = part1.split('\n').map((row) => row.split('-').map(parseFloat));

  function getRangeIndex(ingredient, ranges = nonOverlapingFreshRanges) {
    return ranges.findIndex((range) => range[0] <= ingredient && ingredient <= range[1]);
  }
  let nonOverlapingFreshRanges = [];

  freshRanges.forEach((range) => {
    const processedRangesIndices = range.map((r) => getRangeIndex(r));
    if (processedRangesIndices[0] === -1 && processedRangesIndices[1] === -1) {
      nonOverlapingFreshRanges.push(range);
    } else if (processedRangesIndices[0] === processedRangesIndices[1]) {
      // already in another range, so nothing to do
    } else if (processedRangesIndices[0] !== -1 && processedRangesIndices[1] !== -1) {
      nonOverlapingFreshRanges[processedRangesIndices[0]][1] = nonOverlapingFreshRanges[processedRangesIndices[1]][1];
      nonOverlapingFreshRanges.splice(processedRangesIndices[1], 1);
    } else if (processedRangesIndices[1] !== -1) {
      nonOverlapingFreshRanges[processedRangesIndices[1]][0] = range[0];
    } else if (processedRangesIndices[0] !== -1) {
      nonOverlapingFreshRanges[processedRangesIndices[0]][1] = range[1];
    }
    nonOverlapingFreshRanges.forEach((range2) => {
      const rangesWithoutCurrentRange = [...nonOverlapingFreshRanges];
      rangesWithoutCurrentRange.splice(nonOverlapingFreshRanges.indexOf(range2), 1);
      const indices = range2.map((r) => getRangeIndex(r, rangesWithoutCurrentRange));
      if (indices[0] !== -1 && indices[0] === indices[1]) {
        nonOverlapingFreshRanges.splice(nonOverlapingFreshRanges.indexOf(range2), 1);
      }
    })
  })
  
  const output = nonOverlapingFreshRanges
    .map((range) => range[1] - range[0] + 1)
    .reduce(((sum, value) => sum + value), 0);
  /*
    */

  console.log(output);
} catch(e) {
  console.log('Error:', e.stack);
}
