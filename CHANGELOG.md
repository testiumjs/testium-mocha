### 2.1.1

* set currentTest on testium.browser - **[@dbushong](https://github.com/dbushong)** [#13](https://github.com/testiumjs/testium-mocha/pull/13)
  - [`68d6459`](https://github.com/testiumjs/testium-mocha/commit/68d64597df52d15416cfec969239eed229319ae6) **fix:** set currentTest on testium.browser


### 2.1.0

* supply browser.currentTest property - **[@dbushong](https://github.com/dbushong)** [#12](https://github.com/testiumjs/testium-mocha/pull/12)
  - [`76c1fa7`](https://github.com/testiumjs/testium-mocha/commit/76c1fa75d3b34b9fb8fa80eed7fb894505c0013e) **feat:** supply browser.currentTest property
  - [`377ddb0`](https://github.com/testiumjs/testium-mocha/commit/377ddb093848bb19daaf542e998daf2dc4372b10) **chore:** use testium-driver-wd for tests


### 2.0.0

#### Breaking Changes

Node < 4.x no longer supported

*See: [`3645d4d`](https://github.com/testiumjs/testium-mocha/commit/3645d4dbcec21408629bde3af49220b617f86c7d)*

#### Commits

* re-run generator, use node4 native code - **[@dbushong](https://github.com/dbushong)** [#11](https://github.com/testiumjs/testium-mocha/pull/11)
  - [`3645d4d`](https://github.com/testiumjs/testium-mocha/commit/3645d4dbcec21408629bde3af49220b617f86c7d) **chore:** re-run generator, use node4 native code


### 1.1.0

* feat: save page html on failure w/ screenshot - **[@dbushong](https://github.com/dbushong)** [#8](https://github.com/testiumjs/testium-mocha/pull/8)
  - [`5dc8bfc`](https://github.com/testiumjs/testium-mocha/commit/5dc8bfc8ca2ed578b649216cceb9277b6d32ed0a) **feat:** save page html on failure w/ screenshot


### 1.0.3

* Apply latest nlm generator - **[@i-tier-bot](https://github.com/i-tier-bot)** [#7](https://github.com/testiumjs/testium-mocha/pull/7)
  - [`3b6873b`](https://github.com/testiumjs/testium-mocha/commit/3b6873bab0051afce37ae7ef0ba92111c642f516) **chore:** Apply latest nlm generator
  - [`83200a6`](https://github.com/testiumjs/testium-mocha/commit/83200a6ff003b9e83cf6dc00fadd815e355a10e2) **chore:** Make it work like a normal package
  - [`bf48842`](https://github.com/testiumjs/testium-mocha/commit/bf48842da3e6eca918d5e40f636bfecd3a94aa63) **test:** Prevent port collisions
  - [`f57767b`](https://github.com/testiumjs/testium-mocha/commit/f57767baba7f8e6a126757a6836f478f7632afac) **chore:** Use groupon user for publishing
  - [`eb0d68d`](https://github.com/testiumjs/testium-mocha/commit/eb0d68d495eeab3804ba3489272038f8b7a06acd) **chore:** Remove unused linting dependencies


1.0.1
-----
* Regression: reuseSession=false tore down phantom to early - @jkrems
  https://github.com/testiumjs/testium-mocha/pull/4

1.0.0
-----
Initial release
