import sortByAlphabetical from './sorter.js';

/**
 * Formats the comparison result array in a stylish manner.
 *
 * @param {Array} comparedResultArray - The array containing the comparison result objects.
 * @return {string} The formatted string ready for printing.
 */
const formatLikeStylish = (comparedResultArray) => {
  let stringForPrint = '{';

  const iter = (node) => {
    const nestedElementIndent = '    ';
    sortByAlphabetical(node);

    let currentStr;
    node.forEach((obj) => {
      switch (obj.status) {
        case 'deleted':
        case 'updated: old':
          currentStr = `\n${nestedElementIndent.repeat(obj.depth)}  - ${
            obj.name
          }: `;
          break;
        case 'added':
        case 'updated: new':
          currentStr = `\n${nestedElementIndent.repeat(obj.depth)}  + ${
            obj.name
          }: `;
          break;
        default:
          currentStr = `\n${nestedElementIndent.repeat(obj.depth)}    ${
            obj.name
          }: `;
      }
      if (obj?.children === undefined) {
        currentStr += obj.value;
        stringForPrint += currentStr;
      } else if (obj?.children !== undefined) {
        currentStr += '{';
        stringForPrint += currentStr;
        iter(obj.children);
      }
    });

    if (node[0]?.depth > 0) {
      const closingBracketIndent = nestedElementIndent.repeat(node[0]?.depth);
      stringForPrint += `\n${closingBracketIndent}}`;
    }

    return stringForPrint;
  };

  let result = iter(comparedResultArray);
  result += '\n}';
  return result;
};

export default formatLikeStylish;
