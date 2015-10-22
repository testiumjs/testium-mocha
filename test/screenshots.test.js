import fs from 'fs';
import { execFile } from 'child_process';

import assert from 'assertive';
import rimraf from 'rimraf';
import { extend } from 'lodash';

const LOG_DIRECTORY = `${__dirname}/screenshot_integration_log`;
const SCREENSHOT_DIRECTORY = `${__dirname}/screenshot_integration_log/screenshots`;
const TEST_FILE = 'test/screenshot_integration/force_screenshot.test.js';

const ENV_OVERRIDES = {
  testium_logDirectory: LOG_DIRECTORY,
  testium_screenshotDirectory: SCREENSHOT_DIRECTORY,
};

describe('screenshots', () => {
  before(`rm -rf ${LOG_DIRECTORY}`, (done) =>
    rimraf(LOG_DIRECTORY, done));

  before('run failing test suite', function runFailingSuite(done) {
    this.timeout(10000);
    const mocha = execFile('./node_modules/.bin/mocha', [ TEST_FILE ], {
      env: extend(ENV_OVERRIDES, process.env),
    }, (err, stdout, stderr) => {
      try {
        assert.equal(2, mocha.exitCode);
        done();
      } catch (exitCodeError) {
        /* eslint no-console:0 */
        console.log('Error: %s\nstdout: %s\nstderr: %s',
          err.stack, stdout, stderr);
        done(exitCodeError);
      }
    });
  });

  let files;
  before(`readdir ${SCREENSHOT_DIRECTORY}`, () => {
    files = fs.readdirSync(SCREENSHOT_DIRECTORY);
    files.sort();
  });

  it('creates two screenshots', () => {
    assert.deepEqual([
      'forced_screenshot_my_test.png',
      'forced_screenshot_some_sPecial_chars.png',
    ], files);
  });
});
