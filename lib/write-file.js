'use strict';

var path = require('path');
var fs = require('fs');

var MAX_NAME_LENGTH = 40;

function uniqueFilename(file) {
  var testPath = file;
  var counter = 0;
  while (fs.existsSync(testPath + '.png')) {
    ++counter;
    testPath = file + counter;
  }

  return testPath + '.png';
}

function generateFilename(directory, title) {
  var name = title
    // 1. Replace all special characters sequences with `_`
    .replace(/[\W_]+/g, '_')
    // 2. Apply character limit so filenames don't get out of hand
    .substr(0, MAX_NAME_LENGTH);

  var filePath = path.join(directory, name);
  return uniqueFilename(filePath);
}

function writeFile(directory, title, data, encoding) {
  var filename = generateFilename(directory, title);
  fs.writeFileSync(filename, data, encoding || 'base64');
  return filename;
}
module.exports = writeFile;
