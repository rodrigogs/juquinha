const inquirer = require('inquirer')
const chalk = require('chalk')
const writeDotenv = require('config/write-dotenv')
const resolveDotenvFilePath = require('config/resolve-dotenv-file-path')
const resolveDotenv = require('config/resolve-dotenv')

module.exports = async (currentEnv) => {
  const { STAGE, SERVERLESS_ACCESS_KEY, ORG } = currentEnv
  const filePath = await resolveDotenvFilePath(STAGE)

  if (SERVERLESS_ACCESS_KEY && ORG) {
    console.log(chalk.green(`Serverless credentials found in ${filePath} file`))
    return currentEnv
  }

  console.log(chalk.yellow(`Serverless credentials not found in ${filePath} file`))
  console.log(chalk.yellow('You can choose to use serverless dashboard or not.'))
  console.log(chalk.yellow('You can find more information at https://www.serverless.com/dashboard/'))
  const useServerlessDashboard = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useServerlessDashboard',
      message: 'Do you want to use serverless dashboard?',
      default: false,
    },
  ]).then(({ useServerlessDashboard }) => useServerlessDashboard)

  if (!useServerlessDashboard) return currentEnv

  console.log(chalk.yellow('You can get or create your access key at https://app.serverless.com/YOUR-ORG/settings/accessKeys'))
  const org = await inquirer.prompt([
    {
      type: 'input',
      name: 'org',
      message: 'Enter your Serverless org:',
      validate: input => input.length > 0,
    },
  ]).then(({ org }) => org)

  if (org) {
    const serverlessAccessKey = await inquirer.prompt([
      {
        type: 'password',
        name: 'serverlessAccessKey',
        message: 'Enter your Serverless access key:',
        validate: input => input.length > 0,
      },
    ]).then(({ serverlessAccessKey }) => serverlessAccessKey)

    if (!serverlessAccessKey) {
      console.log(chalk.yellow('You chose not to use serverless dashboard.'))
      return currentEnv
    }

    // Write the serverless access key to the .env file
    await writeDotenv(filePath, {
      ORG: org,
      SERVERLESS_ACCESS_KEY: serverlessAccessKey,
    })
  }

  // Reload the .env file
  return resolveDotenv(STAGE).environment
}
