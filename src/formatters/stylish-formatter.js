import sortByAlphabetical from "./sorter.js";

/**
 * Normalizes the comparison result array for printing.
 *
 * @param {Array} comparedResultArray - The array containing the comparison result objects.
 * @return {Array} The normalized array ready for printing.
 */
const formatLikeStylish = (comparedResultArray) => {
  const formattedArray = ["{"];

  const iter = (comparedResultArray) => {
    const nestedElementIndent = "    ";
    sortByAlphabetical(comparedResultArray);

    let currentStr;
    comparedResultArray.forEach((obj) => {
      switch (obj.status) {
        case "deleted":
        case "updated: old":
          currentStr = `${nestedElementIndent.repeat(obj.depth)}  - ${
            obj.name
          }: `;
          break;
        case "added":
        case "updated: new":
          currentStr = `${nestedElementIndent.repeat(obj.depth)}  + ${
            obj.name
          }: `;
          break;
        default:
          currentStr = `${nestedElementIndent.repeat(obj.depth)}    ${
            obj.name
          }: `;
      }
      if (obj?.children === undefined) {
        currentStr = currentStr + obj.value;
        formattedArray.push(currentStr);
      } else if (obj?.children !== undefined) {
        currentStr = currentStr + "{";
        formattedArray.push(currentStr);
        iter(obj.children);
      }
    });

    if (comparedResultArray[0]?.depth > 0) {
      const closingBracketIndent = nestedElementIndent.repeat(
        comparedResultArray[0]?.depth
      );
      formattedArray.push(`${closingBracketIndent}}`);
    }

    return formattedArray;
  };

  const result = iter(comparedResultArray);
  result.push(`}`);

  return result;
};

export default formatLikeStylish;
