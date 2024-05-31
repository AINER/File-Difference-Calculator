import { resolve } from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import compareFilesAction from "../src/index.js";
import {
  flatResult,
  volumetricResult,
} from "./__fixtures__/exprected-results.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryName = dirname(currentFilePath);
const format = "stylish";
console.log(format.format);

test("gendiff for flat data with stylish format", () => {
  let fullFilePath1 = resolve(
    currentDirectoryName,
    "__fixtures__/flat-file1.json"
  );
  let fullFilePath2 = resolve(
    currentDirectoryName,
    "__fixtures__/flat-file2.json"
  );
  expect(compareFilesAction(fullFilePath1, fullFilePath2, format)).toEqual(
    flatResult
  );

  fullFilePath1 = resolve(currentDirectoryName, "__fixtures__/flat-file1.yaml");
  fullFilePath2 = resolve(currentDirectoryName, "__fixtures__/flat-file2.yml");
  expect(compareFilesAction(fullFilePath1, fullFilePath2, format)).toEqual(
    flatResult
  );
});

test("gendiff for volumetric data with stylish format", () => {
  let fullFilePath1 = resolve(
    currentDirectoryName,
    "__fixtures__/volumetric-file1.json"
  );
  let fullFilePath2 = resolve(
    currentDirectoryName,
    "__fixtures__/volumetric-file2.json"
  );
  expect(compareFilesAction(fullFilePath1, fullFilePath2, format)).toEqual(
    volumetricResult
  );

  fullFilePath1 = resolve(
    currentDirectoryName,
    "__fixtures__/volumetric-file1.yml"
  );
  fullFilePath2 = resolve(
    currentDirectoryName,
    "__fixtures__/volumetric-file2.yaml"
  );
  expect(compareFilesAction(fullFilePath1, fullFilePath2, format)).toEqual(
    volumetricResult
  );
});

test("gendiff for volumetric data with plain format", () => {
  let fullFilePath1 = resolve(
    currentDirectoryName,
    "__fixtures__/volumetric-file1.json"
  );
  let fullFilePath2 = resolve(
    currentDirectoryName,
    "__fixtures__/volumetric-file2.json"
  );
  expect(compareFilesAction(fullFilePath1, fullFilePath2, format)).toEqual(
    volumetricResult
  );

  fullFilePath1 = resolve(
    currentDirectoryName,
    "__fixtures__/volumetric-file1.yml"
  );
  fullFilePath2 = resolve(
    currentDirectoryName,
    "__fixtures__/volumetric-file2.yaml"
  );
  expect(compareFilesAction(fullFilePath1, fullFilePath2, format)).toEqual(
    volumetricResult
  );
});
