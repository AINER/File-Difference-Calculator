/* eslint-disable consistent-return, no-console */

import parseData from './parser.js';
import compareFiles from './comparer.js';
import formatСomparisonResult from './formatters/index.js';

/**
 * Compares the contents of two files and prints the comparison result in a specified format.
 *
 * @param {string} filePath1 - The path to the first file.
 * @param {string} filePath2 - The path to the second file.
 * @param {Object} formatOption - The object from commander specifying the format for result.
 * @return {Array} The array of strings representing the comparison result. For tests
 */
const compareFilesAndPrintResult = (
  filePath1,
  filePath2,
  formatOption = 'stylish',
) => {
  if (
    formatOption !== 'plain'
    && formatOption !== 'stylish'
    && formatOption !== 'json'
  ) {
    console.log('❌  Undefined format. Try to use "plain", "stylish" or "json"');
    return;
  }

  const fileData1 = parseData(filePath1);
  const fileData2 = parseData(filePath2);

  if (
    typeof fileData1 !== 'object'
    || typeof fileData2 !== 'object'
    || fileData1 === null
    || fileData2 === null
  ) {
    console.log('❌  Incorrect type of input data. Check the correctness of the contents in files specified for comparison');
    return;
  }

  const comparisonResult = compareFiles(fileData1, fileData2);

  const normalizeFormatOption = formatOption.toLocaleLowerCase().trim();
  const formattedResult = formatСomparisonResult(comparisonResult, normalizeFormatOption);

  return formattedResult; // return array for tests
};

export default compareFilesAndPrintResult;
