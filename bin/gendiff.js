#!/usr/bin/env node

import { Command } from "commander";
import compareFilesAndPrintResult from "../src/index.js";

const program = new Command();

program
  .name("gendiff")
  .description("CLI to some JavaScript string utilities")
  .version("0.0.1")

  .argument("<filePath1>")
  .argument("<filePath2>")
  .option(
    "-f, --format <type>",
    "output format: plain text', 'json', or 'stylish'",
    "stylish"
  )
  .action((filePath1, filePath2, options) =>
    compareFilesAndPrintResult(filePath1, filePath2, options.format).forEach(
      (stringForPrint) => console.log(stringForPrint)
    )
  );

program.parse();
