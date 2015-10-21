'use strict';

var path = require('path');
var fs = require('fs');

var MAX_NAME_LENGTH = 40;

function uniqueFile(file) {
  var testPath = file;
  var counter = null;
  while (fs.existsSync(testPath + '.png')) {
    counter = (counter || 0) + 1;
    testPath = file + counter;
  }

  return testPath + '.png';
}

function getFile(directory, title) {
  var name = title
    // 1. Replace all special characters with `_`
    .replace(/[^\w]/g, '_')
    // 2. Collapse consecutive underscores
    .replace(/_{2,}/g, '_')
    // 3. Apply character limit so filenames don't get out of hand
    .substr(0, MAX_NAME_LENGTH);

  var filePath = path.join(directory, name);
  return uniqueFile(filePath);
}

function writeFile(directory, title, data, encoding) {
  var filename = getFile(directory, title);
  fs.writeFileSync(filename, data, encoding || 'base64');
  return filename;
}
module.exports = writeFile;
