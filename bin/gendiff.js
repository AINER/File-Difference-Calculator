#!/usr/bin/env node

import { Command } from 'commander';
import parseData from '../src/parseFileData.js';
import printComparisonResult from '../src/compareFilesData.js';

const program = new Command();

/**
 * Compares the data in two files and print represented differences of strings of files.
 *
 * @param {string} filePath1 - The absolute or relative path of the first file to compare.
 * @param {string} filePath1 - The absolute or relative path of the second file to compare.
 * @return {void} This function does not return a value.
 */
const compareFilesAction = (filePath1, filePath2) => {
  const fileData1 = parseData(filePath1);
  const fileData2 = parseData(filePath2);
  const result = printComparisonResult(fileData1, fileData2);
  return result;
};

program
  .name('gendiff')
  .version('0.0.1')
  .description('CLI to some JavaScript string utilities')
  .argument('<filePath1>')
  .argument('<filePath2>')
  .option('-f, --format', 'output format')
  .action(compareFilesAction);

program.parse();

export default compareFilesAction;
