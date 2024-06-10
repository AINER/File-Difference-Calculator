import sortByAlphabetical from "./sorter.js";

/**
 * Normalizes the comparison result array for printing.
 *
 * @param {Array} comparedResultArray - The array containing the comparison result objects.
 * @return {Array} The normalized array ready for printing.
 */
const formatLikeStylish = (comparedResultArray) => {
  let stringForPrint = "{";

  const iter = (comparedResultArray) => {
    const nestedElementIndent = "    ";
    sortByAlphabetical(comparedResultArray);

    let currentStr;
    comparedResultArray.forEach((obj) => {
      switch (obj.status) {
        case "deleted":
        case "updated: old":
          currentStr = `\n${nestedElementIndent.repeat(obj.depth)}  - ${
            obj.name
          }: `;
          break;
        case "added":
        case "updated: new":
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
        currentStr = currentStr + obj.value;
        stringForPrint = stringForPrint + currentStr;
      } else if (obj?.children !== undefined) {
        currentStr = currentStr + "{";
        stringForPrint = stringForPrint + currentStr;
        iter(obj.children);
      }
    });

    if (comparedResultArray[0]?.depth > 0) {
      const closingBracketIndent = nestedElementIndent.repeat(
        comparedResultArray[0]?.depth
      );
      stringForPrint = stringForPrint + `\n${closingBracketIndent}}`;
    }

    return stringForPrint;
  };

  let result = iter(comparedResultArray);
  result = result + `\n}`;
  return result;
};

export default formatLikeStylish;
