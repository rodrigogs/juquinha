# Juquinha

## This is a **very opinionated way** of microservicing with a full serverless approach, featuring [Serverless Framework](https://github.com/serverless/serverless), [JavaScript](https://www.javascript.com/) and [AWS](https://aws.amazon.com/).

## Setup
Copy `.env.sample` to a new file called `.env` and populate the environment variables.
Or:
```bash
$ npm run setup
```
And then you can run
```bash
$ npm run bootstrap
```

## First deploy
```bash
$ npm run init
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
