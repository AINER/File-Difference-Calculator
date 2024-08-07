# ➕ File Difference Calculator
[![Maintainability](https://api.codeclimate.com/v1/badges/570939e31f8a1aaf6854/maintainability)](https://codeclimate.com/github/AINER/frontend-project-46/maintainability) 
[![Test Coverage](https://api.codeclimate.com/v1/badges/570939e31f8a1aaf6854/test_coverage)](https://codeclimate.com/github/AINER/frontend-project-46/test_coverage) 
[![Test and lint](https://github.com/AINER/frontend-project-46/actions/workflows/test_and_lint.yml/badge.svg?event=push)](https://github.com/AINER/frontend-project-46/actions/workflows/test_and_lint.yml) 

__Compare two files and see the differences between strings in different formats.__

This is a CLI utility to determine the differences between data configurations.

* Supports working with two files of different formats: json, yaml
* Works with flat and tree data structures
* Has various output formats: stylish, plain, json

[![asciicast](https://asciinema.org/a/vdJ5Tv08IF3BWjyInForTYajO.svg)](https://asciinema.org/a/vdJ5Tv08IF3BWjyInForTYajO)

## How to start
### Requirements
[Node.js](https://nodejs.org/en)

### Installation
Clone this repo and use `make install`


### Usage:

`gendiff -h`  to see docs

`gendiff <path to file1> <path to file2>`  to generate differences with default stylish output

`gendiff --format plain <path to file1> <path to file2>`  to plain output

`gendiff -f json <path to file1> <path to file2>`  to json output
