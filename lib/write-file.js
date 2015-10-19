'use strict';

var path = require('path');
var fs = require('fs');

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
  // Take the test title and remove all special characters; limit to 20 characters
  var name = title.replace(/[^\w]/g, '_').replace(/_{2,}/g, '_').substr(0, 40);

  var filePath = path.join(directory, name);
  return uniqueFile(filePath);
}

function writeFile(directory, title, data, encoding) {
  var filename = getFile(directory, title);
  fs.writeFileSync(filename, data, encoding || 'base64');
  return filename;
}
module.exports = writeFile;
