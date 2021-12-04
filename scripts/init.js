#!/usr/bin/env nodejs
const loading = require('loading-cli')
const ensureDeploymentBucket = require('lib/helpers/ensure-deployment-bucket')
const ensureWebAppBucket = require('lib/helpers/ensure-web-app-bucket')
const runNpmScript = require('lib/helpers/run-npm-script')

const retry = (fn, arg, retries = 3, err = null) => {
  if (!retries) return Promise.reject(err)
  return fn(arg).catch((err) => retry(fn, arg, retries - 1, err))
}

const extractApiUrl = (string) => {
  const match = string.match(/https:\/\/[a-z0-9].+([\\-\\.]amazonaws+)\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/g)
  if (!match) return null
  return match[0]
}

const loader = loading({
  text: '',
  color: 'green',
  interval: 80,
  frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
})

;(async () => {
  try {
    await ensureDeploymentBucket()
    loader.text = 'Deploying API base...'
    loader.start()
    const apiOutput = await retry(runNpmScript, 'deploy:resources:api', 3)
    loader.succeed('API base deployed 🚀')
    loader.text = 'Deploying resources...'
    loader.start()
    await retry(runNpmScript, 'deploy:resources', 3)
    loader.succeed('Resources deployed 🪐')
    loader.text = 'Deploying API endpoints...'
    loader.start()
    await retry(runNpmScript, 'deploy:api', 3)
    loader.succeed('API endpoints deployed 🦄')
    loader.text = 'Deploying frontend...'
    loader.start()
    await ensureWebAppBucket()
    await retry(runNpmScript, 'deploy:web', 3)
    loader.succeed('Successfully deployed 🌈')
    console.log(`Your application is available at: ${extractApiUrl(apiOutput)}`)
  } catch (err) {
    console.error(err)
    loader.fail()
    console.error('IT BLEW UP! 💣🧨⛽🎇')
    console.trace(err.stack)
    process.exit(1)
  }
})()
