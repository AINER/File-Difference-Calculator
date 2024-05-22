/**
 * Normalizes the comparison result array for printing.
 *
 * @param {Array} comparedResultArray - The array containing the comparison result objects.
 * @return {Array} The normalized array ready for printing.
 */
const formatСomparisonResultForPrint = (comparedResultArray) => {
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

export default formatСomparisonResultForPrint;
