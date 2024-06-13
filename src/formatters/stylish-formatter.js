/* eslint-disable no-lonely-if, fp/no-let, fp/no-mutating-methods */

import sortByAlphabetical from './sorter.js';
import * as STATUS from '../STATUS-OF-DATA-CONSTANTS.js';

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
    const sortedNode = sortByAlphabetical(node);

    let currentStr;
    sortedNode.forEach((obj) => {
      switch (obj.status) {
        case STATUS.DELETED:
        case STATUS.UPDATED_OLD:
          currentStr = `\n${nestedElementIndent.repeat(obj.depth)}  - ${obj.name}: `;
          break;
        case STATUS.ADDED:
        case STATUS.UPDATED_NEW:
          currentStr = `\n${nestedElementIndent.repeat(obj.depth)}  + ${obj.name}: `;
          break;
        default:
          currentStr = `\n${nestedElementIndent.repeat(obj.depth)}    ${obj.name}: `;
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
