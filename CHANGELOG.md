#### 1.7.1 (2019-09-10)

##### Chores

*  Update dependency version ([12af062a](https://github.com/wchen02/apify-etl/commit/12af062a8ff1d4de295654d027dbce07d2c0c6fb))

### 1.7.0 (2019-09-10)

##### New Features

*  Add route to archive files ([5d659079](https://github.com/wchen02/apify-etl/commit/5d659079a4e3b5390832e6a65b2f94976f2f2c6c))

#### 1.6.9 (2019-08-31)

##### Other Changes

*  lock dependencies package version ([eb26c45d](https://github.com/wchen02/apify-etl/commit/eb26c45dad42bae5b2d2eb21c35e1f90d99388f4))

#### 1.6.8 (2019-08-31)

##### Chores

*  update package ([c0795a3c](https://github.com/wchen02/apify-etl/commit/c0795a3c014375250f8ee60e3bf1562e47600e7d))

#### 1.6.7 (2019-08-31)

##### Chores

*  Update package ([621d3cf4](https://github.com/wchen02/apify-etl/commit/621d3cf4a7ed7308f3f40a7a7a4345b8dbce75d7))

#### 1.6.6 (2019-08-31)

##### Chores

*  update package ([707654ae](https://github.com/wchen02/apify-etl/commit/707654aeff061048798b50b0372ed55cbbb20fb5))

#### 1.6.5 (2019-08-31)

##### Chores

*  Update package and env name change ([0444a6a3](https://github.com/wchen02/apify-etl/commit/0444a6a3dd42195caf178b93e971d1a9979e5f20))

#### 1.6.4 (2019-08-31)

##### Chores

*  Update package ([5a763e8e](https://github.com/wchen02/apify-etl/commit/5a763e8e7ed52c6b197948f092834a0dfce1fd33))

#### 1.6.3 (2019-08-25)

##### Chores

*  Update dependencies ([c69664c2](https://github.com/wchen02/apify-etl/commit/c69664c22341fe5d1156537cdc0ab9dde926fb4d))

#### 1.6.2 (2019-08-25)

##### Documentation Changes

* **readme:**  Update readme with endpoints ([a9270d6f](https://github.com/wchen02/apify-etl/commit/a9270d6fea15b81a003bb7fdb9f87c7ee2a72120))

#### 1.6.1 (2019-08-25)

##### Other Changes

*  Update cpanel deploy script to use npm ci to prevent changes to package-lock.json ([31a7d3f8](https://github.com/wchen02/apify-etl/commit/31a7d3f8ad15d7d0b42409fcae44b8b7d523c336))

### 1.6.0 (2019-08-25)

##### New Features

*  Process webhook dataset with rabbitmq worker ([fc189e0c](https://github.com/wchen02/apify-etl/commit/fc189e0cef586107c9d4d571e7c16fba933416b5))
*  Add eslint, rabbitmq, refactor code ([0ad436bf](https://github.com/wchen02/apify-etl/commit/0ad436bffba2b0ced4282009c406f0db61d5a4f1))

#### 1.5.1 (2019-08-20)

##### Bug Fixes

*  Fix typo causing server failing to start ([fd8de0a8](https://github.com/wchen02/apify-etl/commit/fd8de0a8032a82efc2c28ba8ded072b42d2c3289))

### 1.5.0 (2019-08-20)

##### New Features

*  Add webhook task into a queue to be processed ([4c8b4547](https://github.com/wchen02/apify-etl/commit/4c8b4547bd654b4c2b5a4ff84a58675f25292703))

#### 1.4.1 (2019-08-19)

##### Chores

*  Update .env.example options ([d7cabb17](https://github.com/wchen02/apify-etl/commit/d7cabb1708860e619c2ff28170efed0bfafb19cf))

##### Bug Fixes

*  Change /apify/process-dataset from GET to POST ([621d4f85](https://github.com/wchen02/apify-etl/commit/621d4f8564404b96b79266fc33b688c0748fc31b))

### 1.4.0 (2019-08-19)

##### New Features

*  Return version in /apify route, /process-dataset setTimeout to 2 hours ([90767f81](https://github.com/wchen02/apify-etl/commit/90767f812c7c59ab742b613d3f11a0df08e5939b))

#### 1.3.1 (2019-08-19)

##### New Features

*  Auto restart passgenger server on deployment ([78f75542](https://github.com/wchen02/apify-etl/commit/78f75542ba229e04939f71fc45525bb088aa68af))

### 1.3.0 (2019-08-19)

##### New Features

*  Migrate functionality to express server ([45365091](https://github.com/wchen02/apify-etl/commit/45365091a89fe63ef745f9d2aa52af2615e81d28))

##### Bug Fixes

*  Fix error when archive rename fails + refactor ([a48f5861](https://github.com/wchen02/apify-etl/commit/a48f586142b4004e3592cfd02e94bc79b6687feb))

##### Other Changes

*  Move apify-client to apify-etl-lib repo ([e74d3deb](https://github.com/wchen02/apify-etl/commit/e74d3deb15678a122bf8959dc05b3b831cd0d6f3))
*  Remove dadi360 config ([70ad2cce](https://github.com/wchen02/apify-etl/commit/70ad2cceddfff8ed8c22f01095f1e4004213a535))
*  Remove CLI capability, use apify-etl-cli repo instead ([7f887c10](https://github.com/wchen02/apify-etl/commit/7f887c10fb24f9d76e9dbc78dd26c8e4c80e33cf))

##### Refactors

*  Standize project structure, use repos ([6f6f02d1](https://github.com/wchen02/apify-etl/commit/6f6f02d1e58e36d6e354c0f2cd15ddb8e33dec08))
*  Refactor archive cli ([ee3ec11a](https://github.com/wchen02/apify-etl/commit/ee3ec11af822c5eb014cbf148288b9b1881666e3))
*  Refactor archive to use commander ([af926b77](https://github.com/wchen02/apify-etl/commit/af926b7748210dc5e6ff237c81ee3501b5804aef))

#### 1.2.3 (2019-08-18)

##### Bug Fixes

*  Wrong depolyment directory ([ff1d30dd](https://github.com/wchen02/apify-etl/commit/ff1d30dd5098cfcc09b03dee014971e7bf721bab))

#### 1.2.2 (2019-08-18)

##### Bug Fixes

*  Fix deploying to the wrong destination ([e2d6198e](https://github.com/wchen02/apify-etl/commit/e2d6198e8499bec97d61668069c05f044a7257c1))

#### 1.2.1 (2019-08-18)

##### Bug Fixes

*  Run nodejs server on sub uri ([46361334](https://github.com/wchen02/apify-etl/commit/46361334281f7f073c9641615f76f758c04cf92e))

##### Other Changes

*  remove 403 file ([9582fce7](https://github.com/wchen02/apify-etl/commit/9582fce7cc9ab7c925804e6b580c8bbca05d9a6c))

### 1.2.0 (2019-08-18)

##### New Features

*  Add express server to support webhooks ([4b50a247](https://github.com/wchen02/apify-etl/commit/4b50a2478f8a96268214b32148e9e132f88ea130))

### 1.1.0 (2019-08-18)

##### New Features

*  add cpanel deployment script ([9d472340](https://github.com/wchen02/apify-etl/commit/9d472340255fa32ec4c06a2362f142c4652f449a))

## 1.0.0 (2019-08-16)

##### New Features

*  Use default dataset for api webhook to work ([e0e2bc81](https://github.com/wchen02/apify-etl/commit/e0e2bc81cc5dd93b6e7f4e2a249e7c528b52fb4d))
*  add get dataset script and ran as prerequiste to other step ([0de448ed](https://github.com/wchen02/apify-etl/commit/0de448ed80741421bfb1bf81278c07b35ddfa0e2))
*  Archive directories after processing + webhook script ([a9e99441](https://github.com/wchen02/apify-etl/commit/a9e994414561d84ffb0344d135885e5553812385))
*  Add Normalize and load script ([6d06dcc5](https://github.com/wchen02/apify-etl/commit/6d06dcc56e97dda7225804951f108304914b3088))

### 0.1.0 (2019-08-12)

##### Chores

*  Add release management script ([af3dfae4](https://github.com/wchen02/apify-etl/commit/af3dfae48fcfad49d3dfaf95474810f088e36a1e))

##### Documentation Changes

*  Update readme ([9ff656a4](https://github.com/wchen02/apify-etl/commit/9ff656a4fa9b5b98c68f600c431b41da5992c642))

