# Testium: Mocha [![Build Status](https://travis-ci.org/testiumjs/testium-mocha.svg?branch=master)](https://travis-ci.org/testiumjs/testium-mocha)

Testium integration for [mocha](https://mochajs.org/).

* Minimal footprint, just add one `before` hook
* Can launch your app, selenium/phantomjs for you
* Automatically takes screenshots on failure

## Install

```bash
npm install --save-dev testium-mocha testium-driver-sync
```

## Usage

```js
// test/my-test.js
var browser = require('testium-mocha').browser;

describe('testium-mocha - the basics', function() {
  before(browser.beforeHook());

  it('can load a page', function() {
    browser.navigateTo('/index.html');
  });
});
```

Run the above test using `mocha test/my-test.js`.
