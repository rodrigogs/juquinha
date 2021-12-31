# Juquinha

## This is a **very opinionated way** of microservicing with a full serverless approach, featuring [Serverless Framework](https://github.com/serverless/serverless), [JavaScript](https://www.javascript.com/) and [AWS](https://aws.amazon.com/).

## Setup
Copy `.env.sample` to a new file called `.env` and populate the environment variables.
Or:
```bash
$ pnpm run setup
```
And then you can run
```bash
$ pnpm run bootstrap
```

## First deploy
```bash
$ pnpm run init
```

## Deploy options
#### Full
```bash
$ pnpm run deploy
```

#### Resources only
```bash
$ pnpm run deploy:resources
```

#### API only
```bash
$ pnpm run deploy:api
```
