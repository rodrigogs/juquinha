const pkg = require('../../package.json')
const inquirer = require('inquirer')
const chalk = require('chalk')
const writeDotenv = require('@juquinha/config/write-dotenv')
const resolveDotenvFilePath = require('@juquinha/config/resolve-dotenv-file-path')
const resolveDotenv = require('@juquinha/config/resolve-dotenv')

module.exports = async (currentEnv) => {
  let { STAGE, APP_NAME, APP_PREFIX, DEPLOYMENT_BUCKET_NAME, WEB_APP_BUCKET_NAME, DEFAULT_LANGUAGE } = currentEnv
  const filePath = await resolveDotenvFilePath(STAGE)

  if (!APP_NAME) {
    ; ({ APP_NAME } = await inquirer.prompt([
      {
        type: 'input',
        name: 'APP_NAME',
        message: 'Enter your app name:',
        default: pkg.name,
        validate: input => input.length > 0,
      },
    ]))
    await writeDotenv(filePath, {
      APP_NAME,
    })
  }

  if (!APP_PREFIX) {
    console.log(chalk.yellow('The app prefix should be really short to avoid invalid resource names.'))
    ; ({ APP_PREFIX } = await inquirer.prompt([
      {
        type: 'input',
        name: 'APP_PREFIX',
        message: 'Enter your app prefix:',
        validate: input => input.length > 0,
        default: APP_NAME.substring(0, 2).toLowerCase(),
      },
    ]))
    await writeDotenv(filePath, {
      APP_PREFIX,
    })
  }

  if (!DEPLOYMENT_BUCKET_NAME) {
    ; ({ DEPLOYMENT_BUCKET_NAME } = await inquirer.prompt([
      {
        type: 'input',
        name: 'DEPLOYMENT_BUCKET_NAME',
        message: 'Enter your deployment bucket name:',
        default: `${APP_NAME}-deployments`,
        validate: input => input.length > 0,
      },
    ]))
    await writeDotenv(filePath, {
      DEPLOYMENT_BUCKET_NAME,
    })
  }

  if (!WEB_APP_BUCKET_NAME) {
    ; ({ WEB_APP_BUCKET_NAME } = await inquirer.prompt([
      {
        type: 'input',
        name: 'WEB_APP_BUCKET_NAME',
        message: 'Enter your web app bucket name:',
        default: `${APP_NAME}-web-app`,
        validate: input => input.length > 0,
      },
    ]))
    await writeDotenv(filePath, {
      WEB_APP_BUCKET_NAME,
    })
  }

  if (!DEFAULT_LANGUAGE) {
    ; ({ DEFAULT_LANGUAGE } = await inquirer.prompt([
      {
        type: 'list',
        name: 'DEFAULT_LANGUAGE',
        message: 'Which language would you like to use?',
        choices: ['en', 'pt'],
        default: 'en',
      },
    ]))
    await writeDotenv(filePath, {
      DEFAULT_LANGUAGE,
    })
  }

  // Reload the .env file
  return resolveDotenv(STAGE).environment
}
