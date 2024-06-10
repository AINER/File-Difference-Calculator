import sortByAlphabetical from "./sorter.js";

/**
 * Normalizes the comparison result array for printing.
 *
 * @param {Array} comparedResultArray - The array containing the comparison result objects.
 * @return {Array} The normalized array ready for printing.
 */
const formatLikePlain = (comparedResultArray) => {
  let stringForPrint = "";

  const iter = (comparedResultArray, pathToCurrentNode) => {
    sortByAlphabetical(comparedResultArray);

    comparedResultArray.forEach((obj) => {
      let value;
      if (typeof obj.value === "string") {
        value = `'${obj.value}'`;
      } else {
        value = obj.value;
      }

      let updatedValue;
      let updatedElements;
      if (obj.status === "updated: old") {
        updatedElements = comparedResultArray.filter(
          (el) => el.name === obj.name
        );
        if (typeof updatedElements[1].value === "string") {
          updatedValue = `'${updatedElements[1].value}'`;
        } else {
          updatedValue = updatedElements[1].value;
        }
      }

      let currentStr;
      switch (obj.status) {
        case "deleted":
          currentStr = `\nProperty '${pathToCurrentNode}${obj.name}' was removed`;
          stringForPrint = stringForPrint + currentStr;
          break;

        case "added":
          currentStr = `\nProperty '${pathToCurrentNode}${obj.name}' was added with value: `;

          if (obj?.children === undefined) {
            currentStr = currentStr + value;
          } else if (obj?.children !== undefined) {
            currentStr = currentStr + "[complex value]";
          }

          stringForPrint = stringForPrint + currentStr;
          break;

        case "updated: old":
          currentStr = `\nProperty '${pathToCurrentNode}${obj.name}' was updated. From `;

          if (obj?.children === undefined) {
            currentStr = currentStr + `${value} `;
          } else if (obj?.children !== undefined) {
            currentStr = currentStr + `[complex value] `;
          }
          if (updatedElements[1]?.children === undefined) {
            currentStr = currentStr + `to ${updatedValue}`;
          } else if (updatedElements[1]?.children !== undefined) {
            currentStr = currentStr + `to [complex value]`;
          }

          stringForPrint = stringForPrint + currentStr;
          break;
      }

      if (obj?.children !== undefined) {
        const newPathToCurrentNode = `${pathToCurrentNode}${obj.name}.`;
        iter(obj.children, newPathToCurrentNode);
      }
    });

    return stringForPrint;
  };

  let result = iter(comparedResultArray, "");
  result = result.slice(1); // Deleting first '\n'
  return result;
};

export default formatLikePlain;
