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

var path = require('path');

var debug = require('debug')('testium-mocha');
var _ = require('lodash');
var Testium = require('testium-core');

var takeScreenshotOnFailure = require('./screenshot');

var getConfig = Testium.getConfig;
var getTestium = Testium.getTestium;

var CLOSE_BROWSER = 'closeBrowser';
var CLOSE_BROWSER_PATTERN = /hook: closeBrowser$/;
var DEFAULT_TITLE = '"before all" hook';
var BETTER_TITLE = '"before all" hook: Testium setup hook';

var GlobalBrowser = {};

function isCloseBrowserHook(hook) {
  return CLOSE_BROWSER_PATTERN.test(hook.title);
}

function addCloseBrowserHook(suite, browser) {
  if (suite._afterAll.some(isCloseBrowserHook)) {
    return;
  }
  suite.afterAll(CLOSE_BROWSER, function closeBrowser() {
    if (typeof browser.quit === 'function') {
      // wd API, hopefully also future testium-driver-sync versions
      return browser.quit();
    }
    // old sync API
    return browser.close();
  });
}

function getRootSuite(suite) {
  return suite.parent ? getRootSuite(suite.parent) : suite;
}

function injectBrowser(options) {
  options = _.extend({
    reuseSession: true,
  }, options || {});

  return function injectBrowserHook() {
    var self = this;
    var runnable = this._runnable;

    if (runnable.title === DEFAULT_TITLE) {
      runnable.title = BETTER_TITLE;
    }

    var initialConfig = getConfig();

    var mochaTimeout = +initialConfig.get('mocha.timeout', 20000);
    var mochaSlow = +initialConfig.get('mocha.slow', 2000);

    function setMochaTimeouts(suite) {
      suite.timeout(mochaTimeout);
      suite.slow(mochaSlow);
    }

    function deepMochaTimeouts(suite) {
      setMochaTimeouts(suite);
      suite.suites.forEach(deepMochaTimeouts);
      suite.tests.forEach(setMochaTimeouts);
      suite._beforeEach.forEach(setMochaTimeouts);
      suite._beforeAll.forEach(setMochaTimeouts);
      suite._afterEach.forEach(setMochaTimeouts);
      suite._afterAll.forEach(setMochaTimeouts);
    }

    debug('Overriding mocha timeouts', mochaTimeout, mochaSlow);
    var parentSuite = runnable.parent;
    deepMochaTimeouts(parentSuite);

    var initialTimeout = +initialConfig.get('app.timeout', 0) + mochaTimeout;
    this.timeout(initialTimeout);

    function setupHooks(testium) {
      /* eslint no-proto:0 */
      GlobalBrowser.__proto__ = self.browser = testium.browser;
      var config = testium.config;

      var screenshotDirectory = config.get('screenshotDirectory', null);
      if (screenshotDirectory) {
        screenshotDirectory = path.resolve(config.root, screenshotDirectory);

        var afterEachHook = _.partial(takeScreenshotOnFailure, screenshotDirectory);
        parentSuite.afterEach('takeScreenshotOnFailure', afterEachHook);
      } else {
        debug('Screenshots are disabled');
      }

      var browserScopeSuite =
        options.reuseSession ? getRootSuite(parentSuite) : parentSuite;

      addCloseBrowserHook(browserScopeSuite, testium.browser);
    }

    return getTestium(options).then(setupHooks);
  };
}
module.exports = injectBrowser;
injectBrowser.default = injectBrowser;

GlobalBrowser.beforeHook = injectBrowser;
injectBrowser.browser = GlobalBrowser;
