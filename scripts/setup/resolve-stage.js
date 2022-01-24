const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const writeDotenv = require('config/write-dotenv')
const resolveDotenv = require('config/resolve-dotenv')

module.exports = async (environment) => {
  let { STAGE } = environment
  // If stage is not provided, prompt for it
  if (!STAGE) {
    const otherOption = chalk.yellow('other...')
    ;({ STAGE } = await inquirer.prompt([
      {
        type: 'list',
        name: 'STAGE',
        message: 'Which stage would you like to use?',
        choices: ['dev', 'prod', 'test', otherOption],
      },
    ]))

    // If stage is other, prompt for it
    if (STAGE === otherOption) {
      ;({ STAGE } = await inquirer.prompt([
        {
          type: 'input',
          name: 'STAGE',
          message: 'Enter the stage name:',
          validate: input => input.length > 0,
        },
      ]))
    }

    // Write the stage to the .env file
    const fileName = {
      dev: '.env', // Development defaults to .env for convenience
    }[STAGE] || `.env.${STAGE}`
    const filePath = path.join(process.cwd(), fileName)
    await writeDotenv(filePath, { STAGE })
  } else {
    console.log(`Using stage: ${STAGE}`)
  }

  return resolveDotenv(STAGE).environment
}
