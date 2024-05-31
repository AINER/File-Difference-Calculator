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
        if (obj?.children === undefined) {
          switch (obj.status) {
            case "deleted":
            case "updated: deleted":
              formattedArray.push(
                `${nestedElementIndent.repeat(obj.depth)}  - ${obj.name}: ${
                  obj.value
                }`
              );
              break;
            case "added":
            case "updated: added":
              formattedArray.push(
                `${nestedElementIndent.repeat(obj.depth)}  + ${obj.name}: ${
                  obj.value
                }`
              );
              break;
            default:
              formattedArray.push(
                `${nestedElementIndent.repeat(obj.depth)}    ${obj.name}: ${
                  obj.value
                }`
              );
          }
        } else if (obj?.children !== undefined) {
          switch (obj.status) {
            case "deleted":
            case "updated: deleted":
              formattedArray.push(
                `${nestedElementIndent.repeat(obj.depth)}  - ${obj.name}: {`
              );
              break;
            case "added":
            case "updated: added":
              formattedArray.push(
                `${nestedElementIndent.repeat(obj.depth)}  + ${obj.name}: {`
              );
              break;
            default:
              formattedArray.push(
                `${nestedElementIndent.repeat(obj.depth)}    ${obj.name}: {`
              );
          }

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
