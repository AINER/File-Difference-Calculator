#!/usr/bin/env node

import { Command } from 'commander';
import compareFilesAction from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .version('0.0.1')
  .description('CLI to some JavaScript string utilities')
  .argument('<filePath1>')
  .argument('<filePath2>')
  .option('-f, --format [type]', 'output format')
  .action(compareFilesAction);

program.parse();

export default compareFilesAction;
