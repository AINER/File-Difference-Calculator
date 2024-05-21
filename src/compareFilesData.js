/* eslint no-console: "off" */

/**
 * Compares the data in two files and returns an array of objects representing the differences.
 *
 * @param {Object} fileData1 - The data from the first file.
 * @param {Object} fileData2 - The data from the second file.
 * @return {Array} An array of objects representing the differences between the two files.
 *                 Each object has a key-value pair representing a difference, and a 'status'
 *                 property indicating whether the value was added, deleted, or unchanged.
 */
const compareFiles = (fileData1, fileData2) => {
  const resultArray = [];

  const keys1 = Object.keys(fileData1);
  keys1.map((key) => {
    if (Object.hasOwn(fileData2, key) && fileData1[key] === fileData2[key]) {
      resultArray.push({ [key]: fileData1[key], status: 'unchanged' });
    } else if (Object.hasOwn(fileData2, key) && fileData1[key] !== fileData2[key]) {
      resultArray.push({ [key]: fileData1[key], status: 'deleted' });
      resultArray.push({ [key]: fileData2[key], status: 'added' });
    } else if (!Object.hasOwn(fileData2, key)) {
      resultArray.push({ [key]: fileData1[key], status: 'deleted' });
    }
  });

  const keys2 = Object.keys(fileData2);
  keys2.map((key) => {
    if (!Object.hasOwn(fileData1, key)) {
      resultArray.push({ [key]: fileData2[key], status: 'added' });
    }
  });

  return resultArray;
};

/**
 * Normalizes the comparison result array for printing.
 *
 * @param {Array} comparedResultArray - The array containing the comparison result objects.
 * @return {Array} The normalized array ready for printing.
 */
const normalizeСomparisonResultForPrint = (comparedResultArray) => {
  const normalizedArray = ['{'];
  comparedResultArray
    .sort((a, b) => { // alphabetical sorting
      if (Object.keys(a)[0] < Object.keys(b)[0]) {
        return -1;
      }
      if (Object.keys(a)[0] > Object.keys(b)[0]) {
        return 1;
      }
      return 0;
    })
    .map((obj) => {
      const { status, ...property } = obj;
      if (status === 'unchanged') {
        normalizedArray.push(`    ${Object.keys(property)}: ${Object.values(property)}`);
      } else if (status === 'deleted') {
        normalizedArray.push(`  - ${Object.keys(property)}: ${Object.values(property)}`);
      } else if (status === 'added') {
        normalizedArray.push(`  + ${Object.keys(property)}: ${Object.values(property)}`);
      }
    });
  normalizedArray.push('}');

  return normalizedArray;
};

/**
 * Prints the comparison result of two file data objects.
 *
 * @param {Object} fileData1 - The first file data object.
 * @param {Object} fileData2 - The second file data object.
 * @return {Array} The normalized array ready for printing. Used for testing.
 */
const printComparisonResult = (fileData1, fileData2) => {
  const elementsForPrint = normalizeСomparisonResultForPrint(compareFiles(fileData1, fileData2));
  elementsForPrint.map((stringForPrint) => console.log(stringForPrint));

  return elementsForPrint;
};

export default printComparisonResult;
