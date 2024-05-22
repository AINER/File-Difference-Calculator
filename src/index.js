import parseData from './parser.js';
import compareFiles from './comparer.js';
import formatСomparisonResultForPrint from './formatter.js';

/**
 * Prints the comparison result of two file data objects.
 *
 * @param {Object} firstFileData - The first file data object.
 * @param {Object} secondFileData - The second file data object.
 * @returns {Array} The normalized array ready for printing.
 */
const printComparisonResult = (firstFileData, secondFileData) => {
  const comparisonResult = compareFiles(firstFileData, secondFileData);
  const normalizedResult = formatСomparisonResultForPrint(comparisonResult);

  normalizedResult.forEach((stringForPrint) => console.log(stringForPrint));

  return normalizedResult;
};

/**
 * Compares the data in two files and print represented differences of strings of files.
 *
 * @param {string} filePath1 - The absolute or relative path of the first file to compare.
 * @param {string} filePath1 - The absolute or relative path of the second file to compare.
 * @return {void} This function does not return a value.
 */
const compareFilesAction = (filePath1, filePath2) => {
  const fileData1 = parseData(filePath1);
  const fileData2 = parseData(filePath2);
  const result = printComparisonResult(fileData1, fileData2);
  return result;
};

export default compareFilesAction;
