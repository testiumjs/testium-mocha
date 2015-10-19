'use strict';

var Bluebird = require('bluebird');
var debug = require('debug')('testium:mocha:screenshot');
var mkdirp = require('mkdirp');

var writeFile = require('./write-file');

var mkdirpAsync = Bluebird.promisify(mkdirp);

function getScreenshotData(browser, rawData) {
  if (typeof rawData === 'string') {
    return rawData;
  }

  // wd calls it takeScreenshot, webdriver-http-sync calls it getScreenshot
  return browser.takeScreenshot ? browser.takeScreenshot() : browser.getScreenshot();
}

function writeScreenshot(rawData, directory, title) {
  if (!rawData) {
    return '';
  }

  var screenshotData =
    typeof rawData === 'string' ? new Buffer(rawData, 'base64') : rawData;

  var screenshotFile = writeFile(directory, title, screenshotData, 'base64');
  return '\n[TESTIUM] Saved screenshot ' + screenshotFile;
}

function takeScreenshot(directory, test, browser) {
  return mkdirpAsync(directory)
    .then(function getData() {
      return getScreenshotData(browser, test.err.screen);
    })
    .then(function writeData(screenshotData) {
      return writeScreenshot(screenshotData, directory, test.fullTitle());
    })
    .then(function reportFilename(message) {
      test.err.message += message;
    })
    .catch(function gracefulFailure(error) {
      /* eslint no-console:0 */
      console.error('Error grabbing screenshot: %s', error.message);
    });
}

function takeScreenshotOnFailure(directory) {
  var browser = this.browser;
  var currentTest = this.currentTest;

  if (!this.browser) {
    debug('Not taking screenshot, no browser available');
    return null;
  }

  if (!currentTest || currentTest.state !== 'failed') {
    return null;
  }

  return takeScreenshot(directory, currentTest, browser);
}

module.exports = takeScreenshotOnFailure;
