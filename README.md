[![nlm-chat](https://img.shields.io/badge/chat-http%3A%2F%2Fsignup.testiumjs.com%2F-F4D03F?logo=chat&logoColor=white)](http://signup.testiumjs.com/)
[![nlm-github](https://img.shields.io/badge/github-testiumjs%2Ftestium--mocha%2Fissues-F4D03F?logo=github&logoColor=white)](https://github.com/testiumjs/testium-mocha/issues)
![nlm-node](https://img.shields.io/badge/node-%3E%3D8.3.0-blue?logo=node.js&logoColor=white)
![nlm-version](https://img.shields.io/badge/version-5.0.7-blue?logo=version&logoColor=white)
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
