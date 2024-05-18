import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Parses data from a file.
 *
 * @param {string} filePath - The path of the file to parse.
 * @return {Object} The parsed data from the file.
 */
const parseData = (filePath) => {
  const fullPathOfFile = resolve(filePath);
  const jsonData = readFileSync(fullPathOfFile);
  const result = JSON.parse(jsonData);
  return result;
}

export default parseData;
