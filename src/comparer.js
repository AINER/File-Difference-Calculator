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

export default compareFiles;
