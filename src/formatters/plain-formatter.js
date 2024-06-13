/* eslint-disable no-lonely-if, fp/no-let, fp/no-mutating-methods */

import sortByAlphabetical from './sorter.js';
import * as STATUS from '../STATUS-OF-DATA-CONSTANTS.js';

/**
 * Formats the compared result array into a plain text string representation.
 *
 * @param {Array} comparedResultArray - The array of compared result objects.
 * @return {string} The formatted plain text string representation of the compared result array.
 */
const formatLikePlain = (comparedResultArray) => {
  let stringForPrint = '';

  const iter = (node, pathToCurrentNode) => {
    const sortedNode = sortByAlphabetical(node);

    sortedNode.forEach((obj) => {
      let value;
      if (typeof obj.value === 'string') {
        value = `'${obj.value}'`;
      } else {
        value = obj.value;
      }

      let updatedValue;
      let updatedElements;
      if (obj.status === STATUS.UPDATED_OLD) {
        updatedElements = node.filter((el) => el.name === obj.name);
        if (typeof updatedElements[1].value === 'string') {
          updatedValue = `'${updatedElements[1].value}'`;
        } else {
          updatedValue = updatedElements[1].value;
        }
      }

      let currentStr;
      switch (obj.status) {
        case STATUS.DELETED:
          currentStr = `\nProperty '${pathToCurrentNode}${obj.name}' was removed`;
          stringForPrint += currentStr;
          break;

        case STATUS.ADDED:
          currentStr = `\nProperty '${pathToCurrentNode}${obj.name}' was added with value: `;

          if (obj?.children === undefined) {
            currentStr += value;
          } else if (obj?.children !== undefined) {
            currentStr += '[complex value]';
          }

          stringForPrint += currentStr;
          break;

        case STATUS.UPDATED_OLD:
          currentStr = `\nProperty '${pathToCurrentNode}${obj.name}' was updated. From `;

          if (obj?.children === undefined) {
            currentStr += `${value} `;
          } else if (obj?.children !== undefined) {
            currentStr += '[complex value] ';
          }
          if (updatedElements[1]?.children === undefined) {
            currentStr += `to ${updatedValue}`;
          } else if (updatedElements[1]?.children !== undefined) {
            currentStr += 'to [complex value]';
          }

          stringForPrint += currentStr;
          break;
        default:
      }

      if (obj?.children !== undefined) {
        const newPathToCurrentNode = `${pathToCurrentNode}${obj.name}.`;
        iter(obj.children, newPathToCurrentNode);
      }
    });

    return stringForPrint;
  };

  let result = iter(comparedResultArray, '');
  result = result.slice(1); // Deleting first '\n'
  return result;
};

export default formatLikePlain;
