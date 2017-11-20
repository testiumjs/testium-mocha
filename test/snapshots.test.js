'use strict';

const fs = require('fs');
const execFile = require('child_process').execFile;

const assert = require('assertive');
const rimraf = require('rimraf');
const extend = require('lodash/extend');

const LOG_DIRECTORY = `${__dirname}/snapshot_integration_log`;
const SNAPSHOT_DIRECTORY = `${__dirname}/snapshot_integration_log/snapshots`;
const TEST_FILE = 'test/snapshots.failing';

const ENV_OVERRIDES = {
  testium_logDirectory: LOG_DIRECTORY,
  testium_snapshotDirectory: SNAPSHOT_DIRECTORY,
};

describe('snapshots', () => {
  before(`rm -rf ${LOG_DIRECTORY}`, done => rimraf(LOG_DIRECTORY, done));

  before('run failing test suite', function runFailingSuite(done) {
    this.timeout(10000);
    const mocha = execFile(
      './node_modules/.bin/mocha',
      [TEST_FILE],
      {
        env: extend(ENV_OVERRIDES, process.env),
      },
      (err, stdout, stderr) => {
        try {
          assert.equal(2, mocha.exitCode);
          done();
        } catch (exitCodeError) {
          console.log(
            'Error: %s\nstdout: %s\nstderr: %s',
            err && err.stack,
            stdout,
            stderr
          );
          done(exitCodeError);
        }
      }
    );
  });

  let files;
  before(`readdir ${SNAPSHOT_DIRECTORY}`, () => {
    files = fs.readdirSync(SNAPSHOT_DIRECTORY);
    files.sort();
  });

  it('creates two snapshots', () => {
    assert.deepEqual(
      [
        'forced_snapshot_my_test.html',
        'forced_snapshot_my_test.png',
        'forced_snapshot_some_sPecial_chars.html',
        'forced_snapshot_some_sPecial_chars.png',
      ],
      files
    );
  });
});
