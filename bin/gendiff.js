#!/usr/bin/env node
import { Command } from 'commander';
import parseData from '../src/parseFileData.js';

const program = new Command();

program
  .name('gendiff')
  .version('0.0.1')
  .description('CLI to some JavaScript string utilities')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format', 'output format')
  .action((filepath1, filepath2, options) => {
    const data1 = parseData(filepath1);
    console.log('🚀 → .action → data1:', data1);

    const data2 = parseData(filepath2);
    console.log('🚀 → .action → data2:', data2);
  });

program.parse();
