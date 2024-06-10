/* eslint-disable no-lonely-if */

import _ from 'lodash';

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

    const statusUnchanged = 'unchanged';
    const statusUpdatedOld = 'updated: old';
    const statusUpdatedNew = 'updated: new';
    const statusDeleted = 'deleted';
    const statusAdded = 'added';
    const statusParentIsDeleted = 'parent is deleted';
    const statusParentIsAdded = 'parent is added';
    const statusParentIsUpdatedOld = 'parent is updated: old';
    const statusParentIsUpdatedNew = 'parent is updated: new';
    const statusModifiedInternally = 'modified internally';
    let newStatusOfParentOfObject;

    const keys1 = Object.keys(node1);
    keys1.forEach((key) => {
      if (Object.hasOwn(node2, key)) {
        if (_.isEqual(node1[key], node2[key])) {
          resultArray.push({
            name: key,
            value: node1[key],
            status: statusUnchanged,
            depth,
          });
        } else if (!_.isEqual(node1[key], node2[key])) {
          if (typeof node1[key] !== 'object') {
            resultArray.push({
              name: key,
              value: node1[key],
              status: statusUpdatedOld,
              depth,
            });
            if (typeof node2[key] !== 'object' || node2[key] === null) {
              resultArray.push({
                name: key,
                value: node2[key],
                status: statusUpdatedNew,
                depth,
              });
            } else if (typeof node2[key] === 'object' && node2[key] !== null) {
              newStatusOfParentOfObject = statusParentIsUpdatedNew;
              resultArray.push({
                name: key,
                status: statusUpdatedNew,
                depth,
                children: iter({}, node2[key], depth + 1, newStatusOfParentOfObject),
              });
            }
          } else if (typeof node1[key] === 'object') {
            if (node1[key] !== null && node2[key] !== null && typeof node2[key] === 'object'
            ) {
              resultArray.push({
                name: key,
                status: statusModifiedInternally,
                depth,
                children: iter(node1[key], node2[key], depth + 1, statusModifiedInternally),
              });
            } else if (node1[key] !== null && (typeof node2[key] !== 'object' || node2[key] === null)
            ) {
              newStatusOfParentOfObject = statusParentIsUpdatedOld;
              resultArray.push({
                name: key,
                status: statusUpdatedOld,
                depth,
                children: iter(node1[key], {}, depth + 1, newStatusOfParentOfObject),
              });
              resultArray.push({
                name: key,
                value: node2[key],
                status: statusUpdatedNew,
                depth,
              });
            } else if (node1[key] === null && node2[key] !== null && typeof node2[key] === 'object') {
              resultArray.push({
                name: key,
                value: node1[key],
                status: statusUpdatedOld,
                depth,
              });
              newStatusOfParentOfObject = statusParentIsUpdatedNew;
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
                status: statusUpdatedOld,
                depth,
              });
              resultArray.push({
                name: key,
                value: node2[key],
                status: statusUpdatedNew,
                depth,
              });
            }
          }
        }
      } else if (!Object.hasOwn(node2, key)) {
        if (statusOfParent === statusParentIsDeleted
          || statusOfParent === statusParentIsUpdatedOld) {
          if (typeof node1[key] !== 'object') {
            resultArray.push({
              name: key,
              value: node1[key],
              status: statusParentIsDeleted,
              depth,
            });
          } else if (typeof node1[key] === 'object') {
            newStatusOfParentOfObject = statusParentIsDeleted;
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
              status: statusDeleted,
              depth,
            });
          } else if (typeof node1[key] === 'object') {
            newStatusOfParentOfObject = statusParentIsDeleted;
            resultArray.push({
              name: key,
              status: statusDeleted,
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
          statusOfParent === statusParentIsAdded
          || statusOfParent === statusParentIsUpdatedNew
        ) {
          if (typeof node2[key] !== 'object') {
            resultArray.push({
              name: key,
              value: node2[key],
              status: statusParentIsAdded,
              depth,
            });
          } else if (typeof node2[key] === 'object') {
            newStatusOfParentOfObject = statusParentIsAdded;
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
              status: statusAdded,
              depth,
            });
          } else if (typeof node2[key] === 'object') {
            newStatusOfParentOfObject = statusParentIsAdded;
            resultArray.push({
              name: key,
              status: statusAdded,
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
