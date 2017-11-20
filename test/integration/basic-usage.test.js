'use strict';

const browser = require('../../').browser;

describe('testium-mocha - the basics', () => {
  before(browser.beforeHook());

  it('can load a page', () => browser.loadPage('/index.html'));
});
