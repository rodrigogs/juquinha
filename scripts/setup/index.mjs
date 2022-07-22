#!/usr/bin/env nodejs
import loading from 'loading-cli'
import ensureDeploymentBucket from '@juquinha/lib/helpers/ensure-deployment-bucket.mjs'
import ensureWebAppBucket from '@juquinha/lib/helpers/ensure-web-app-bucket.mjs'
import runPnpmScript from '@juquinha/lib/helpers/run-npm-script.mjs'
import extractWebAppUrl from './extract-web-app-url.mjs'
import extractApiUrl from './extract-api-url.mjs'
import setupEnv from './setup-env.mjs'
import welcome from './welcome.mjs'

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
