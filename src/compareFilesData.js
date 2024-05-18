/**
 * Prints the comparison result array in a formatted way.
 *
 * @param {Array} comparisonResultArray - The array containing the comparison result objects.
 * @return {void} This function does not return a value.
 */
const printComparisonResult = (comparisonResultArray) => {
  console.log('{');
  comparisonResultArray
    .sort((a, b) => {
      if (Object.keys(a)[0] < Object.keys(b)[0]) {
        return -1;
      } else if (Object.keys(a)[0] > Object.keys(b)[0]) {
        return 1;
      }
      return 0;
    })
    .map((obj) => {
      if (obj.status === 'no change') {
        delete obj.status;
        console.log(`    ${Object.keys(obj)}: ${Object.values(obj)}`);
      } else if (obj.status === 'deleted') {
        delete obj.status;
        console.log(`  - ${Object.keys(obj)}: ${Object.values(obj)}`);
      } else if (obj.status === 'added') {
        delete obj.status;
        console.log(`  + ${Object.keys(obj)}: ${Object.values(obj)}`);
      }
    });
  console.log('}');
};

/**
 * Compares the data in two files and returns an array of objects representing the differences.
 *
 * @param {Object} fileData1 - The data from the first file.
 * @param {Object} fileData2 - The data from the second file.
 * @return {Array} An array of objects representing the differences between the two files. Each object has a key-value pair representing a difference, and a 'status' property indicating whether the value was added, deleted, or unchanged.
 */
const compareFiles = (fileData1, fileData2) => {
  const resultArray = [];

  for (const key1 in fileData1) {
    if (Object.hasOwn(fileData2, key1) && fileData1[key1] === fileData2[key1]) {
      resultArray.push({ [key1]: fileData1[key1], 'status': 'no change'});
    } else if (Object.hasOwn(fileData2, key1) && fileData1[key1] !== fileData2[key1]) {
      resultArray.push({ [key1]: fileData1[key1], 'status': 'deleted' });
      resultArray.push({ [key1]: fileData2[key1], 'status': 'added'});
    } else if (!Object.hasOwn(fileData2, key1)) {
      resultArray.push({ [key1]: fileData1[key1], 'status': 'deleted' });
    }
  }

  for (const key2 in fileData2) {
    if (!Object.hasOwn(fileData1, key2)) {
      resultArray.push({ [key2]: fileData2[key2], 'status': 'added'});
    }
  }

  printComparisonResult(resultArray);
};

export default compareFiles;
