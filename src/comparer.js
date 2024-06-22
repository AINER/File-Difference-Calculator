/* eslint-disable no-lonely-if */

import _ from 'lodash';
import * as STATUS from './STATUS-OF-DATA-CONSTANTS.js';

/**
 * Compares the data in two files and returns an array of objects representing the differences.
 *
 * @param {Object} fileData1 - The data from the first file.
 * @param {Object} fileData2 - The data from the second file.
 * @return {Array} An array of objects representing the differences between the two files.
 */
const compareFiles = (fileData1, fileData2) => {
  /**
   * Recursive function to compare two nodes and their children.
   *
   * @param {Object} node1 - The first node.
   * @param {Object} node2 - The second node.
   * @param {number} depth - The depth of the current node.
   * @param {string} statusOfParent - The status of the parent node.
   * @return {Array} An array of objects representing the differences between the two nodes.
   */
  const iter = (node1, node2, depth, statusOfParent) => {
    const resultArray = [];

    let newStatusOfParentOfObject;

    const keys1 = Object.keys(node1);
    keys1.forEach((key) => {
      if (Object.hasOwn(node2, key)) {
        if (_.isEqual(node1[key], node2[key])) {
          resultArray.push({
            name: key,
            value: node1[key],
            status: STATUS.UNCHANGED,
            depth,
          });
        } else if (!_.isEqual(node1[key], node2[key])) {
          if (typeof node1[key] !== 'object') {
            resultArray.push({
              name: key,
              value: node1[key],
              status: STATUS.UPDATED_OLD,
              depth,
            });
            if (typeof node2[key] !== 'object' || node2[key] === null) {
              resultArray.push({
                name: key,
                value: node2[key],
                status: STATUS.UPDATED_NEW,
                depth,
              });
            } else if (typeof node2[key] === 'object' && node2[key] !== null) {
              newStatusOfParentOfObject = STATUS.PARENT_IS_UPDATED_NEW;
              resultArray.push({
                name: key,
                status: STATUS.UPDATED_NEW,
                depth,
                children: iter({}, node2[key], depth + 1, newStatusOfParentOfObject),
              });
            }
          } else if (typeof node1[key] === 'object') {
            if (node1[key] !== null && node2[key] !== null && typeof node2[key] === 'object'
            ) {
              resultArray.push({
                name: key,
                status: STATUS.MODIFIED_INTERNALLY,
                depth,
                children: iter(node1[key], node2[key], depth + 1, STATUS.MODIFIED_INTERNALLY),
              });
            } else if (node1[key] !== null && (typeof node2[key] !== 'object' || node2[key] === null)
            ) {
              newStatusOfParentOfObject = STATUS.PARENT_IS_UPDATED_OLD;
              resultArray.push({
                name: key,
                status: STATUS.UPDATED_OLD,
                depth,
                children: iter(node1[key], {}, depth + 1, newStatusOfParentOfObject),
              });
              resultArray.push({
                name: key,
                value: node2[key],
                status: STATUS.UPDATED_NEW,
                depth,
              });
            } else if (node1[key] === null && node2[key] !== null && typeof node2[key] === 'object') {
              resultArray.push({
                name: key,
                value: node1[key],
                status: STATUS.UPDATED_OLD,
                depth,
              });
              newStatusOfParentOfObject = STATUS.PARENT_IS_UPDATED_NEW;
              resultArray.push({
                name: key,
                status: newStatusOfParentOfObject,
                depth,
                children: iter({}, node2[key], depth + 1, newStatusOfParentOfObject),
              });
            } else if ((node1[key] === null || typeof node1[key] !== 'object') && (node2[key] === null || typeof node2[key] !== 'object')
            ) {
              resultArray.push({
                name: key,
                value: node1[key],
                status: STATUS.UPDATED_OLD,
                depth,
              });
              resultArray.push({
                name: key,
                value: node2[key],
                status: STATUS.UPDATED_NEW,
                depth,
              });
            }
          }
        }
      } else if (!Object.hasOwn(node2, key)) {
        if (statusOfParent === STATUS.PARENT_IS_DELETED
          || statusOfParent === STATUS.PARENT_IS_UPDATED_OLD) {
          if (typeof node1[key] !== 'object') {
            resultArray.push({
              name: key,
              value: node1[key],
              status: STATUS.PARENT_IS_DELETED,
              depth,
            });
          } else if (typeof node1[key] === 'object') {
            newStatusOfParentOfObject = STATUS.PARENT_IS_DELETED;
            resultArray.push({
              name: key,
              status: newStatusOfParentOfObject,
              depth,
              children: iter(node1[key], {}, depth + 1, newStatusOfParentOfObject),
            });
          }
        } else {
          if (typeof node1[key] !== 'object') {
            resultArray.push({
              name: key,
              value: node1[key],
              status: STATUS.DELETED,
              depth,
            });
          } else if (typeof node1[key] === 'object') {
            newStatusOfParentOfObject = STATUS.PARENT_IS_DELETED;
            resultArray.push({
              name: key,
              status: STATUS.DELETED,
              depth,
              children: iter(node1[key], {}, depth + 1, newStatusOfParentOfObject),
            });
          }
        }
      }
    });

    const keys2 = Object.keys(node2);
    keys2.forEach((key) => {
      if (!Object.hasOwn(node1, key)) {
        if (
          statusOfParent === STATUS.PARENT_IS_ADDED
          || statusOfParent === STATUS.PARENT_IS_UPDATED_NEW
        ) {
          if (typeof node2[key] !== 'object') {
            resultArray.push({
              name: key,
              value: node2[key],
              status: STATUS.PARENT_IS_ADDED,
              depth,
            });
          } else if (typeof node2[key] === 'object') {
            newStatusOfParentOfObject = STATUS.PARENT_IS_ADDED;
            resultArray.push({
              name: key,
              status: newStatusOfParentOfObject,
              depth,
              children: iter({}, node2[key], depth + 1, newStatusOfParentOfObject),
            });
          }
        } else {
          if (typeof node2[key] !== 'object') {
            resultArray.push({
              name: key,
              value: node2[key],
              status: STATUS.ADDED,
              depth,
            });
          } else if (typeof node2[key] === 'object') {
            newStatusOfParentOfObject = STATUS.PARENT_IS_ADDED;
            resultArray.push({
              name: key,
              status: STATUS.ADDED,
              depth,
              children: iter({}, node2[key], depth + 1, newStatusOfParentOfObject),
            });
          }
        }
      }
    });

    return resultArray;
  };

  return iter(fileData1, fileData2, 0, '');
};

export default compareFiles;
