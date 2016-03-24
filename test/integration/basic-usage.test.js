import { browser } from '../../';

describe('testium-mocha - the basics', () => {
  before(browser.beforeHook());

  // This awkward construct allows us to run this with -wd and -sync.
  // For sync we don't need to return the result but it doesn't hurt.
  it('can load a page', () => {
    return browser.navigateTo('/index.html');
  });
});
