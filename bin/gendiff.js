#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .version('0.0.1')
  .description('CLI to some JavaScript string utilities')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format', 'output format')

program.parse();