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

const path = require('path');

const debug = require('debug')('testium-mocha');
const _ = require('lodash');
const Testium = require('testium-core');

const takeSnapshotOnFailure = require('./snapshot');

const getConfig = Testium.getConfig;
const getTestium = Testium.getTestium;

const CLOSE_BROWSER = 'closeBrowser';
const CLOSE_BROWSER_PATTERN = /hook: closeBrowser$/;
const DEFAULT_TITLE = '"before all" hook';
const BETTER_TITLE = '"before all" hook: Testium setup hook';

const GlobalBrowser = {};

function isCloseBrowserHook(hook) {
  return CLOSE_BROWSER_PATTERN.test(hook.title);
}

function addCloseBrowserHook(suite, browser) {
  // eslint-disable-next-line no-underscore-dangle
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
  options = _.extend(
    {
      reuseSession: true,
    },
    options || {}
  );

  return function injectBrowserHook() {
    const self = this;
    const runnable = this._runnable;

    if (runnable.title === DEFAULT_TITLE) {
      runnable.title = BETTER_TITLE;
    }

    const initialConfig = getConfig();

    const mochaTimeout = +initialConfig.get('mocha.timeout', 20000);
    const mochaSlow = +initialConfig.get('mocha.slow', 2000);

    function setMochaOverrides(suite) {
      suite.timeout(mochaTimeout);
      suite.slow(mochaSlow);
      const origFn = suite.fn;
      if (origFn) {
        suite.fn = function testiumMochaWrapper() {
          if (GlobalBrowser.__proto__ !== Object.prototype)
            GlobalBrowser.__proto__.currentTest = suite.fullTitle();
          return origFn.apply(this, arguments);
        };
      }
    }

    function deepMochaTimeouts(suite) {
      setMochaOverrides(suite);
      suite.suites.forEach(deepMochaTimeouts);
      suite.tests.forEach(setMochaOverrides);
      /* eslint-disable no-underscore-dangle */
      suite._beforeEach.forEach(setMochaOverrides);
      suite._beforeAll.forEach(setMochaOverrides);
      suite._afterEach.forEach(setMochaOverrides);
      suite._afterAll.forEach(setMochaOverrides);
      /* eslint-enable no-underscore-dangle */
    }

    debug('Overriding mocha timeouts', mochaTimeout, mochaSlow);
    const parentSuite = runnable.parent;
    deepMochaTimeouts(parentSuite);

    const initialTimeout = +initialConfig.get('app.timeout', 0) + mochaTimeout;
    this.timeout(initialTimeout);

    function setupHooks(testium) {
      GlobalBrowser.__proto__ = self.browser = testium.browser;
      const config = testium.config;

      let snapshotDirectory = config.get(
        'snapshotDirectory',
        config.get('screenshotDirectory', null)
      );
      if (snapshotDirectory) {
        snapshotDirectory = path.resolve(config.root, snapshotDirectory);

        const afterEachHook = _.partial(
          takeSnapshotOnFailure,
          snapshotDirectory
        );
        parentSuite.afterEach('takeSnapshotOnFailure', afterEachHook);
      } else {
        debug('Snapshots are disabled');
      }

      const browserScopeSuite = options.reuseSession
        ? getRootSuite(parentSuite)
        : parentSuite;

      addCloseBrowserHook(browserScopeSuite, testium.browser);
    }

    return getTestium(options).then(setupHooks);
  };
}
module.exports = injectBrowser;
injectBrowser.default = injectBrowser;

GlobalBrowser.beforeHook = injectBrowser;
injectBrowser.browser = GlobalBrowser;
