/**
 * Sorts the given array of compared result objects in alphabetical order based on the 'name' property.
 *
 * @param {Array} comparedResultArray - The array of compared result objects to be sorted.
 * @return {Array} The sorted array of compared result objects.
 */
const sortByAlphabetical = (comparedResultArray) =>
  comparedResultArray.sort((a, b) => {
    // alphabetical sorting
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

export default sortByAlphabetical;
