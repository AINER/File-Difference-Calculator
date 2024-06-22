/* eslint-disable no-lonely-if */

import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import yaml from 'js-yaml';

/**
 * Parses data from a file.
 *
 * @param {string} filePath - The absolute or relative path of the file to parse.
 * @return {Object} The parsed data from the file.
 */
const parseData = (filePath) => {
  const fileExtension = extname(filePath);
  const fullPathOfFile = resolve(filePath);
  const jsonData = readFileSync(fullPathOfFile);
  let result;

  if (fileExtension === '.json') {
    result = JSON.parse(jsonData);
  } else if (fileExtension === '.yml' || fileExtension === '.yaml') {
    result = yaml.load(jsonData);
  }

  return result;
};

export default parseData;
