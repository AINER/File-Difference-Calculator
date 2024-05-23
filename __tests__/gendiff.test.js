import { resolve } from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import compareFilesAction from '../src/index.js';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryName = dirname(currentFilePath);

const result = [
  '{',
  '  - follow: false',
  '    host: hexlet.io',
  '  - proxy: 123.234.53.22',
  '  - timeout: 50',
  '  + timeout: 20',
  '  + verbose: true',
  '}',
];

test('gendiff', () => {
  let fullFilePath1 = resolve(currentDirectoryName, '__fixtures__/flat-file1.json');
  let fullFilePath2 = resolve(currentDirectoryName, '__fixtures__/flat-file2.json');
  expect(compareFilesAction(fullFilePath1, fullFilePath2)).toEqual(result);

  fullFilePath1 = resolve(currentDirectoryName, '__fixtures__/flat-file1.yaml');
  fullFilePath2 = resolve(currentDirectoryName, '__fixtures__/flat-file2.yml');
  expect(compareFilesAction(fullFilePath1, fullFilePath2)).toEqual(result);
});
