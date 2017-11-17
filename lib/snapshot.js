/*
 * Copyright (c) 2015, Groupon, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *
 * Neither the name of GROUPON nor the names of its contributors may be
 * used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

const Bluebird = require('bluebird');
const debug = require('debug')('testium:mocha:snapshot');
const mkdirp = require('mkdirp');

const writeFile = require('./write-file');

const mkdirpAsync = Bluebird.promisify(mkdirp);

function getScreenshotData(browser, rawData) {
  if (typeof rawData === 'string') {
    return rawData;
  }

  // wd calls it takeScreenshot, webdriver-http-sync calls it getScreenshot
  return browser.takeScreenshot
    ? browser.takeScreenshot()
    : browser.getScreenshot();
}

function writeScreenshot(rawData, directory, title) {
  if (!rawData) {
    return '';
  }

  const screenshotData =
    typeof rawData === 'string' ? new Buffer(rawData, 'base64') : rawData;

  const screenshotFile = writeFile(
    directory,
    title,
    'png',
    screenshotData,
    'base64'
  );
  return `\n[TESTIUM] Saved screenshot ${screenshotFile}`;
}

function writePageSource(pageSource, directory, title) {
  const pageSourceFile = writeFile(
    directory,
    title,
    'html',
    pageSource,
    'utf8'
  );
  return `\n[TESTIUM] Saved page source ${pageSourceFile}`;
}

function takeSnapshot(directory, test, browser) {
  return mkdirpAsync(directory)
    .then(function getData() {
      return Bluebird.all([
        getScreenshotData(browser, test.err.screen),
        browser.getPageSource(),
      ]);
    })
    .spread(function writeData(screenshotData, pageSource) {
      const title = test.fullTitle();
      test.err.message += writeScreenshot(screenshotData, directory, title);
      test.err.message += writePageSource(pageSource, directory, title);
    })
    .catch(function gracefulFailure(error) {
      /* eslint no-console:0 */
      console.error('Error grabbing snapshot: %s', error.message);
    });
}

function takeSnapshotOnFailure(directory) {
  const browser = this.browser;
  const currentTest = this.currentTest;

  if (!this.browser) {
    debug('Not taking snapshot, no browser available');
    return null;
  }

  if (!currentTest || currentTest.state !== 'failed') {
    return null;
  }

  return takeSnapshot(directory, currentTest, browser);
}

module.exports = takeSnapshotOnFailure;
