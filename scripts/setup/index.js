#!/usr/bin/env nodejs
const loading = require('loading-cli')
const ensureDeploymentBucket = require('lib/helpers/ensure-deployment-bucket')
const ensureWebAppBucket = require('lib/helpers/ensure-web-app-bucket')
const runPnpmScript = require('lib/helpers/run-npm-script')
const extractWebAppUrl = require('./extract-web-app-url')
const extractApiUrl = require('./extract-api-url')
const setupEnv = require('./setup-env')
const welcome = require('./welcome')

const retry = (fn, arg, retries = 3, err = null) => {
  if (!retries) return Promise.reject(err)
  return fn(arg).catch((err) => retry(fn, arg, retries - 1, err))
}

const loader = loading({
  text: '',
  color: 'green',
  interval: 80,
  frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
})

;(async () => {
  try {
    await welcome()
    await setupEnv()
    await ensureDeploymentBucket()
    loader.text = 'Deploying API base...'
    loader.start()
    const apiUrl = extractApiUrl(await retry(runPnpmScript, 'deploy:resources:api', 3))
    loader.succeed('API base deployed 🚀')
    loader.text = 'Deploying resources...'
    loader.start()
    await retry(runPnpmScript, 'deploy:resources', 3)
    loader.succeed('Resources deployed 🪐')
    loader.text = 'Deploying API endpoints...'
    loader.start()
    await retry(runPnpmScript, 'deploy:api', 3)
    loader.succeed('API endpoints deployed 🦄')
    loader.text = 'Deploying frontend...'
    loader.start()
    await ensureWebAppBucket()
    const webAppUrl = extractWebAppUrl(await retry(runPnpmScript, 'deploy:web', 3))
    loader.succeed('Successfully deployed 🌈')
    console.log(`Your API is available at: ${apiUrl}`)
    console.log(`Your web app is available at: ${webAppUrl}`)
  } catch (err) {
    console.error(err)
    loader.fail()
    console.error('IT BLEW UP! 💣🧨⛽🎇')
    console.trace(err.stack)
    process.exit(1)
  }
})()
