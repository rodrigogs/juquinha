# Juquinha

[![Stage deployment](https://github.com/rodrigogs/juquinha/actions/workflows/test.yml/badge.svg?branch=test)](https://github.com/rodrigogs/juquinha/actions/workflows/test.yml)
#### This is a **very opinionated way** of microservicing with a full serverless approach, featuring [Serverless Framework](https://github.com/serverless/serverless), [AWS](https://aws.amazon.com/), [Node.js](https://nodejs.dev/) and [Nuxt](https://nuxtjs.org/).

## Requirements
* [Node.js v16.x](https://nodejs.org/download/release/latest-v16.x/)
* Should work on any platform(including [termux](https://play.google.com/store/apps/details?id=com.termux) 😲)

## Setup
#### The setup script should literally guide you through all the configuration steps. You don't have to have any specific knowledge in order to setup a stage.
```bash
$ npm run setup
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

#### Web APP only
```bash
$ npm run deploy:web
```
