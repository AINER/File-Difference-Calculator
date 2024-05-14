#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .version('0.0.1')
  .description('CLI to some JavaScript string utilities')

program.parse();