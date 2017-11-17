'use strict';

const browser = require('../../').browser;

describe('reuseSession = false', () => {
  describe('first test', () => {
    before(browser.beforeHook({ reuseSession: false }));

    it('does some stuff', () => browser.navigateTo('/index.html'));
  });

  describe('second test', () => {
    before(browser.beforeHook({ reuseSession: false }));

    // Make sure that if the first tried to tear down phantomjs etc.,
    // it had enough time to do so.
    before(done => setTimeout(done, 500));

    it('keeps doing stuff', () => browser.navigateTo('/index.html'));
  });
});
