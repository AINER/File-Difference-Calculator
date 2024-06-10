import _ from "lodash";

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
  const iter = (node1, node2, depth, statusOfParent) => {
    const resultArray = [];

    const statusUnchanged = "unchanged";
    const statusUpdatedOld = "updated: old";
    const statusUpdatedNew = "updated: new";
    const statusParentIsDeleted = "parent is deleted";
    const statusParentIsAdded = "parent is added";
    const statusParentIsUpdatedOld = "parent is updated: old";
    const statusParentIsUpdatedNew = "parent is updated: new";
    let newStatusOfParentOfObject;

    const keys1 = Object.keys(node1);
    keys1.forEach((key) => {
      if (Object.hasOwn(node2, key)) {
        if (_.isEqual(node1[key], node2[key])) {
          resultArray.push({
            name: key,
            value: node1[key],
            status: statusUnchanged,
            depth: depth,
          });
        } else if (!_.isEqual(node1[key], node2[key])) {
          if (typeof node1[key] !== "object") {
            resultArray.push({
              name: key,
              value: node1[key],
              status: statusUpdatedOld,
              depth: depth,
            });
            if (typeof node2[key] !== "object" || node2[key] === null) {
              resultArray.push({
                name: key,
                value: node2[key],
                status: statusUpdatedNew,
                depth: depth,
              });
            } else if (typeof node2[key] === "object" && node2[key] !== null) {
              newStatusOfParentOfObject = statusParentIsUpdatedNew;
              resultArray.push({
                name: key,
                status: newStatusOfParentOfObject,
                depth: depth,
                children: iter(
                  {},
                  node2[key],
                  depth + 1,
                  newStatusOfParentOfObject
                ),
              });
            }
          } else if (typeof node1[key] === "object") {
            if (
              node1[key] !== null &&
              node2[key] !== null &&
              typeof node2[key] === "object"
            ) {
              resultArray.push({
                name: key,
                status: "modified internally",
                depth: depth,
                children: iter(node1[key], node2[key], depth + 1),
              });
            } else if (
              node1[key] !== null &&
              (typeof node2[key] !== "object" || node2[key] === null)
            ) {
              newStatusOfParentOfObject = statusParentIsUpdatedOld;
              resultArray.push({
                name: key,
                status: statusUpdatedOld,
                depth: depth,
                children: iter(
                  node1[key],
                  {},
                  depth + 1,
                  newStatusOfParentOfObject
                ),
              });
              resultArray.push({
                name: key,
                value: node2[key],
                status: statusUpdatedNew,
                depth: depth,
              });
            } else if (
              node1[key] === null &&
              typeof node2[key] === "object" &&
              node2[key] !== null
            ) {
              resultArray.push({
                name: key,
                value: node1[key],
                status: statusUpdatedOld,
                depth: depth,
              });
              newStatusOfParentOfObject = statusParentIsUpdatedNew;
              resultArray.push({
                name: key,
                status: newStatusOfParentOfObject,
                depth: depth,
                children: iter(
                  {},
                  node2[key],
                  depth + 1,
                  newStatusOfParentOfObject
                ),
              });
            } else if (node1[key] === null && node2[key] === null) {
              resultArray.push({
                name: key,
                value: node1[key],
                status: statusUpdatedOld,
                depth: depth,
              });
              resultArray.push({
                name: key,
                value: node2[key],
                status: statusUpdatedNew,
                depth: depth,
              });
            }
          }
        }
      } else if (!Object.hasOwn(node2, key)) {
        if (
          statusOfParent === statusParentIsDeleted ||
          statusOfParent === statusParentIsUpdatedOld
        ) {
          if (typeof node1[key] !== "object") {
            resultArray.push({
              name: key,
              value: node1[key],
              status: statusParentIsDeleted,
              depth: depth,
            });
          } else if (typeof node1[key] === "object") {
            newStatusOfParentOfObject = statusParentIsDeleted;
            resultArray.push({
              name: key,
              status: newStatusOfParentOfObject,
              depth: depth,
              children: iter(
                node1[key],
                {},
                depth + 1,
                newStatusOfParentOfObject
              ),
            });
          }
        } else {
          if (typeof node1[key] !== "object") {
            resultArray.push({
              name: key,
              value: node1[key],
              status: "deleted",
              depth: depth,
            });
          } else if (typeof node1[key] === "object") {
            newStatusOfParentOfObject = statusParentIsDeleted;
            resultArray.push({
              name: key,
              status: "deleted",
              depth: depth,
              children: iter(
                node1[key],
                {},
                depth + 1,
                newStatusOfParentOfObject
              ),
            });
          }
        }
      }
    });

    const keys2 = Object.keys(node2);
    keys2.forEach((key) => {
      if (!Object.hasOwn(node1, key)) {
        if (statusOfParent === statusParentIsAdded) {
          if (typeof node2[key] !== "object") {
            resultArray.push({
              name: key,
              value: node2[key],
              status: statusParentIsAdded,
              depth: depth,
            });
          } else if (typeof node2[key] === "object") {
            newStatusOfParentOfObject = statusParentIsAdded;
            resultArray.push({
              name: key,
              status: newStatusOfParentOfObject,
              depth: depth,
              children: iter(
                {},
                node2[key],
                depth + 1,
                newStatusOfParentOfObject
              ),
            });
          }
        } else {
          if (typeof node2[key] !== "object") {
            resultArray.push({
              name: key,
              value: node2[key],
              status: "added",
              depth: depth,
            });
          } else if (typeof node2[key] === "object") {
            newStatusOfParentOfObject = statusParentIsAdded;
            resultArray.push({
              name: key,
              status: "added",
              depth: depth,
              children: iter(
                {},
                node2[key],
                depth + 1,
                newStatusOfParentOfObject
              ),
            });
          }
        }
      }
    });

    return resultArray;
  };

  return iter(fileData1, fileData2, 0, "");
};

export default compareFiles;
