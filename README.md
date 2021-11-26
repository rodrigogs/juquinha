# My Microservicing Way
## This is a **very opinionated wat** to microservicing using [Serverless Framework](https://github.com/serverless/serverless), JavaScript and [AWS](https://aws.amazon.com/).

## Setup
```bash
$ npm run bootstrap
```

## First deploy
```bash
$ npm run deploy:init
```

## Deploy options
#### Full
```bash
$ npm run deploy
```

#### Resources only
```bash
$ npm run deploy:resources
```

#### API only
```bash
$ npm run deploy:api
```

#### Use lerna to deploy more specific scopes
* lerna users package.json names property to filter the scope
* use `--no-bail` to prevent process from exiting before all the jobs are finished
```bash
$ lerna exec --no-bail --scope sls-my-specific-scope-* sls deploy
```
