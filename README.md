# Testium: Mocha [![Build Status](https://travis-ci.org/testiumjs/testium-mocha.svg?branch=master)](https://travis-ci.org/testiumjs/testium-mocha)

Testium integration for [mocha](https://mochajs.org/).

* Minimal footprint, just add one `before` hook
* Can launch your app, selenium/phantomjs for you
* Automatically takes snapshots of screen & html source on failure

This project is a safe and inclusive place
for contributors of all kinds.
See the [Code of Conduct](CODE_OF_CONDUCT.md)
for details.

## Install

```bash
npm install --save-dev testium-mocha testium-driver-wd
```

## Usage

```js
// test/my-test.js
const { browser } = require('testium-mocha');

describe('testium-mocha - the basics', () => {
  before(browser.beforeHook());

  it('can load a page', () => {
    return browser.loadPage('/index.html');
  });
});
```

Run the above test using `mocha test/my-test.js`.
