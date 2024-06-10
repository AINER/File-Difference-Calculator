import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import compareFilesAction from "../src/index.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryName = dirname(currentFilePath);

test("gendiff for flat data with stylish format", () => {
  const format = "stylish";

  const expectedResult = readFileSync(
    resolve(currentDirectoryName, "__fixtures__/result-flat-stylish.txt"),
    {
      encoding: "utf8",
    }
  );

  let fullFilePath1 = resolve(
    currentDirectoryName,
    "__fixtures__/flat-file1.json"
  );
  let fullFilePath2 = resolve(
    currentDirectoryName,
    "__fixtures__/flat-file2.json"
  );
  expect(compareFilesAction(fullFilePath1, fullFilePath2, format)).toEqual(
    expectedResult
  );

  fullFilePath1 = resolve(currentDirectoryName, "__fixtures__/flat-file1.yaml");
  fullFilePath2 = resolve(currentDirectoryName, "__fixtures__/flat-file2.yml");
  expect(compareFilesAction(fullFilePath1, fullFilePath2, format)).toEqual(
    expectedResult
  );
});

test("gendiff for volumetric data with stylish format", () => {
  const format = "stylish";

  const expectedResult = readFileSync(
    resolve(currentDirectoryName, "__fixtures__/result-volumetric-stylish.txt"),
    {
      encoding: "utf8",
    }
  );

  let fullFilePath1 = resolve(
    currentDirectoryName,
    "__fixtures__/volumetric-file1.json"
  );
  let fullFilePath2 = resolve(
    currentDirectoryName,
    "__fixtures__/volumetric-file2.json"
  );
  expect(compareFilesAction(fullFilePath1, fullFilePath2, format)).toEqual(
    expectedResult
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
    expectedResult
  );
});

test("gendiff for volumetric data with plain format", () => {
  const format = "plain";

  const expectedResult = readFileSync(
    resolve(currentDirectoryName, "__fixtures__/result-volumetric-plain.txt"),
    {
      encoding: "utf8",
    }
  );

  let fullFilePath1 = resolve(
    currentDirectoryName,
    "__fixtures__/volumetric-file1.json"
  );
  let fullFilePath2 = resolve(
    currentDirectoryName,
    "__fixtures__/volumetric-file2.json"
  );
  expect(compareFilesAction(fullFilePath1, fullFilePath2, format)).toEqual(
    expectedResult
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
    expectedResult
  );
});

test("gendiff for volumetric data with JSON format", () => {
  const format = "json";
  const jsonData = readFileSync(
    resolve(currentDirectoryName, "__fixtures__/json-format-result.json")
  );
  const expectedResult = JSON.stringify(JSON.parse(jsonData));

  let fullFilePath1 = resolve(
    currentDirectoryName,
    "__fixtures__/volumetric-file1.json"
  );
  let fullFilePath2 = resolve(
    currentDirectoryName,
    "__fixtures__/volumetric-file2.json"
  );
  expect(compareFilesAction(fullFilePath1, fullFilePath2, format)).toEqual(
    expectedResult
  );
});
