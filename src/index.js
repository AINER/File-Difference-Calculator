import parseData from "./parser.js";
import compareFiles from "./comparer.js";
import formatСomparisonResult from "./formatters/index.js";

/**
 * Compares the contents of two files and prints the comparison result in a specified format.
 *
 * @param {string} filePath1 - The path to the first file.
 * @param {string} filePath2 - The path to the second file.
 * @param {Object} formatOption - The object from commander option specifying the format for the comparison result.
 * @param {string} formatOption.format - The format for the comparison result. Valid values are "stylish" or any other format.
 * @return {Array} The array of strings representing the comparison result. For tests
 */
const compareFilesAndPrintResult = (filePath1, filePath2, formatOption) => {
  const fileData1 = parseData(filePath1);
  const fileData2 = parseData(filePath2);

  const comparisonResult = compareFiles(fileData1, fileData2);

  const normalizeFormatOption = formatOption.toLocaleLowerCase().trim();
  let formattedStrings;
  formattedStrings = formatСomparisonResult(
    comparisonResult,
    normalizeFormatOption
  );

  return formattedStrings; // return array for tests
};

export default compareFilesAndPrintResult;
