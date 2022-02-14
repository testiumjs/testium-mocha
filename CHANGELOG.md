### v5.0.7 (2022-02-14)
<a id="v5.0.7"></a>
#### 🏡 Internal

* [#32](https://github.com/testiumjs/testium-mocha/pull/32) audit fix upgrades ([@dbushong](https://github.com/dbushong))


### v5.0.6 (2022-02-11)
<a id="v5.0.6"></a>
#### 🏡 Internal

* [#31](https://github.com/testiumjs/testium-mocha/pull/31) switch to main branch ([@dbushong](https://github.com/dbushong))


### v5.0.5 (2022-02-11)
<a id="v5.0.5"></a>
#### 🏡 Internal

* [#30](https://github.com/testiumjs/testium-mocha/pull/30) upgrade deps & switch to GH actions ([@dbushong](https://github.com/dbushong))


### 5.0.4

* chore(deps): bump dot-prop from 4.2.0 to 4.2.1 - **[@dependabot[bot]](https://github.com/apps/dependabot)** [#23](https://github.com/testiumjs/testium-mocha/pull/23)
  - [`f54e375`](https://github.com/testiumjs/testium-mocha/commit/f54e375609599e5b576b323d85b63c351ac34141) **chore:** bump dot-prop from 4.2.0 to 4.2.1


### 5.0.3

* chore(deps): bump ini from 1.3.5 to 1.3.7 - **[@dependabot[bot]](https://github.com/apps/dependabot)** [#22](https://github.com/testiumjs/testium-mocha/pull/22)
  - [`2c1ce80`](https://github.com/testiumjs/testium-mocha/commit/2c1ce80d7bc2f68280c6af99b2021c80b2b5c16f) **chore:** bump ini from 1.3.5 to 1.3.7 - see: [v1](- [Commits](https://github.com/isaacs/ini/compare/v1)


### 5.0.2

* chore(deps-dev): bump lodash from 4.17.15 to 4.17.19 - **[@dependabot[bot]](https://github.com/apps/dependabot)** [#21](https://github.com/testiumjs/testium-mocha/pull/21)
  - [`b462e83`](https://github.com/testiumjs/testium-mocha/commit/b462e8393cfef28af7f9fdbb95d319aad1ad09b9) **chore:** bump lodash from 4.17.15 to 4.17.19 - see: [4](- [Commits](https://github.com/lodash/lodash/compare/4)


### 5.0.1

* chore(deps): bump acorn from 7.1.0 to 7.1.1 - **[@dependabot[bot]](https://github.com/apps/dependabot)** [#19](https://github.com/testiumjs/testium-mocha/pull/19)
  - [`dd62678`](https://github.com/testiumjs/testium-mocha/commit/dd626783499927f3910996207b8e417fd0ca3f13) **chore:** bump acorn from 7.1.0 to 7.1.1 - see: [7](- [Commits](https://github.com/acornjs/acorn/compare/7)


### 5.0.0

#### Breaking Changes

now requires node 8+, defaults to driver=wd

*See: [`cb0d3a4`](https://github.com/testiumjs/testium-mocha/commit/cb0d3a47af4a1c3132dbe7bc6574382bb2daf586)*

#### Commits

* bump testium-core - **[@dbushong](https://github.com/dbushong)** [#18](https://github.com/testiumjs/testium-mocha/pull/18)
  - [`cb0d3a4`](https://github.com/testiumjs/testium-mocha/commit/cb0d3a47af4a1c3132dbe7bc6574382bb2daf586) **chore:** major bump testium-core
  - [`2f359b5`](https://github.com/testiumjs/testium-mocha/commit/2f359b5d6449ff9c56bccbf082e2e097d84ba15c) **chore:** npm audit fix
  - [`a627d1c`](https://github.com/testiumjs/testium-mocha/commit/a627d1c7df22084c99458d722057986da9dd37fb) **chore:** update devDeps
  - [`0468666`](https://github.com/testiumjs/testium-mocha/commit/0468666137494c9e3d4993d9617f94d54e297620) **fix:** use Buffer.from()


### 4.0.0

#### Breaking Changes

Now `wd` driver is used by default

*See: [`a62621e`](https://github.com/testiumjs/testium-mocha/commit/a62621eaa5a0756e7f57539ee6a1d6091ecc88aa)*

#### Commits

* testium core upgrade - **[@aotarola](https://github.com/aotarola)** [#17](https://github.com/testiumjs/testium-mocha/pull/17)
  - [`a62621e`](https://github.com/testiumjs/testium-mocha/commit/a62621eaa5a0756e7f57539ee6a1d6091ecc88aa) **chore:** major bump testium-core
  - [`ea04872`](https://github.com/testiumjs/testium-mocha/commit/ea048726d9fe9c254042d229ecd66362a425f73a) **chore:** npm audit fix


### 3.0.2

* chore: bump testium-core@1.12.0 - **[@amkirwan](https://github.com/amkirwan)** [#16](https://github.com/testiumjs/testium-mocha/pull/16)
  - [`e6b6a61`](https://github.com/testiumjs/testium-mocha/commit/e6b6a61481f9ad6fdfa3b1782f435ba661339dc6) **chore:** bump testium-core@1.12.0


### 3.0.1

* Npm update testium core - **[@amkirwan](https://github.com/amkirwan)** [#15](https://github.com/testiumjs/testium-mocha/pull/15)
  - [`16091ac`](https://github.com/testiumjs/testium-mocha/commit/16091ac05248642440c813cf8182257502692a13) **chore:** npm audit security fixes
  - [`79b68d4`](https://github.com/testiumjs/testium-mocha/commit/79b68d4404da4b0573f33f9f7f41ee2fbe27b814) **chore:** update testium-core@1.11.0


### 3.0.0

#### Breaking Changes

now requires node 6+

*See: [`de37d8d`](https://github.com/testiumjs/testium-mocha/commit/de37d8d841fc02440e39cf8d0c83960a79d7e268)*

#### Commits

* close testium processes upon test completion - **[@dbushong](https://github.com/dbushong)** [#14](https://github.com/testiumjs/testium-mocha/pull/14)
  - [`33ad991`](https://github.com/testiumjs/testium-mocha/commit/33ad99180a05ed18ed7f18889d0e76724de28bfe) **fix:** close testium processes on test completion
  - [`efc1001`](https://github.com/testiumjs/testium-mocha/commit/efc10014ace3e0b4d87971d6a3dfceabf9d599ff) **chore:** stop using lodash
  - [`6fd8b86`](https://github.com/testiumjs/testium-mocha/commit/6fd8b861ceedf6742d6b878fd7d68e8863cbe88b) **chore:** upgrade assertive devDep
  - [`de37d8d`](https://github.com/testiumjs/testium-mocha/commit/de37d8d841fc02440e39cf8d0c83960a79d7e268) **chore:** upgrade lint & other rules
  - [`17836a8`](https://github.com/testiumjs/testium-mocha/commit/17836a82ec720e470b94cac8dc21c1923bbf011d) **chore:** upgrade versions for `npm audit`
  - [`abd40ac`](https://github.com/testiumjs/testium-mocha/commit/abd40ac4de72f0f1021ad0ce507696e18b47f6d1) **chore:** make sure travis is using npm6


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
