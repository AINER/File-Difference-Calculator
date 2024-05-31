/**
 * Normalizes the comparison result array for printing.
 *
 * @param {Array} comparedResultArray - The array containing the comparison result objects.
 * @return {Array} The normalized array ready for printing.
 */
const formatLikePlain = (comparedResultArray) => {
  const formattedArray = [];

  const iter = (comparedResultArray, pathToCurrentNode) => {
    comparedResultArray
      .sort((a, b) => {
        // alphabetical sorting
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
      .forEach((obj) => {
        let value;
        if (typeof obj.value === "string") {
          value = `'${obj.value}'`;
        } else {
          value = obj.value;
        }

        let updatedValue;
        let updatedElements;

        if (obj.status === "updated: deleted") {
          updatedElements = comparedResultArray.filter(
            (el) => el.name === obj.name
          );
          if (typeof updatedElements[1].value === "string") {
            updatedValue = `'${updatedElements[1].value}'`;
          } else {
            updatedValue = updatedElements[1].value;
          }
        }

        if (obj?.children === undefined) {
          switch (obj.status) {
            case "deleted":
              formattedArray.push(
                `Property ${pathToCurrentNode}${obj.name} was removed`
              );
              break;
            case "added":
              formattedArray.push(
                `Property ${pathToCurrentNode}${obj.name} was added with value: ${value}`
              );
              break;
            case "updated: deleted":
              formattedArray.push(
                `Property ${pathToCurrentNode}${obj.name} was updated. From ${value} to ${updatedValue}`
              );
              break;
          }
        } else if (obj?.children !== undefined) {
          switch (obj.status) {
            case "deleted":
              formattedArray.push(
                `Property ${pathToCurrentNode}${obj.name} was removed`
              );
              break;
            case "added":
              formattedArray.push(
                `Property ${pathToCurrentNode}${obj.name} was added with value: [complex value]`
              );
              break;
            case "updated: deleted":
              formattedArray.push(
                `Property ${pathToCurrentNode}${obj.name} was updated. From [complex value] to ${updatedValue}`
              );
              break;
          }
          const newPathToCurrentNode = `${pathToCurrentNode}${obj.name}.`;
          iter(obj.children, newPathToCurrentNode);
        }
      });

    return formattedArray;
  };

  const result = iter(comparedResultArray, "");

  return result;
};

export default formatLikePlain;
