/* eslint-disable no-process-env */
const os = require('os')
const fs = require('fs')
const path = require('path')
const config = require('config/env')

const backup = (filePath) =>
  fs.promises
    .access(filePath, fs.F_OK)
    .then(() => `${filePath}.backup`)
    .then((backupFilePath) =>
      fs.promises
        .access(backupFilePath, fs.F_OK)
        .then(() => `${filePath}.backup.${Date.now()}`)
        .catch(() => backupFilePath),
    )
    .then((backupFilePath) => fs.promises.rename(filePath, backupFilePath))
    .catch(() => console.log('No .env file to backup'))

;(async () => {
  const dotenvFilePath = path.resolve(__dirname, '..', '.env')
  let filehandle
  try {
    await backup(dotenvFilePath)
    const fullConfig = {
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      REGION: process.env.REGION,
      SERVERLESS_ACCESS_KEY: process.env.SERVERLESS_ACCESS_KEY,
      E2E_APP_URL: process.env.E2E_APP_URL,
      DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
      ...config,
    }
    filehandle = await fs.promises.open(dotenvFilePath, 'w+')
    const varNames = Object.keys(fullConfig)
    for (const varName of varNames) {
      if (fullConfig[varName] === undefined) continue
      await filehandle.write(`${varName}=${fullConfig[varName]}${os.EOL}`)
    }
  } catch (err) {
    console.error(err)
  } finally {
    if (filehandle) await filehandle.close()
  }
})()
