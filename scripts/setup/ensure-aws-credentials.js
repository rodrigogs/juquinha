const inquirer = require('inquirer')
const chalk = require('chalk')
const writeDotenv = require('config/write-dotenv')
const resolveDotenvFilePath = require('config/resolve-dotenv-file-path')
const resolveDotenv = require('config/resolve-dotenv')

module.exports = async (currentEnv) => {
  const { STAGE, AWS_PROFILE, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = currentEnv
  const filePath = await resolveDotenvFilePath(STAGE)

  if (AWS_PROFILE || (AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY && AWS_REGION)) {
    console.log(chalk.green(`AWS credentials found in ${filePath} file`))
    return currentEnv
  }
  console.log(chalk.yellow('AWS credentials not found.'))

  const credentialsType = await inquirer.prompt([
    {
      type: 'list',
      name: 'credentialsType',
      message: 'What type of credentials do you want to use?',
      choices: [
        {
          name: 'AWS secrets',
          value: 'secrets',
        },
        {
          name: 'AWS CLI profile',
          value: 'profile',
        },
      ],
    },
  ]).then(({ credentialsType }) => credentialsType)

  if (credentialsType === 'profile') {
    console.log(chalk.yellow('Please, make sure you have the given profile in your AWS CLI configuration.'))
    const awsProfile = await inquirer.prompt([
      {
        type: 'input',
        name: 'awsProfile',
        message: 'Enter your AWS profile name:',
      },
    ]).then(({ awsProfile }) => awsProfile)
    await writeDotenv(filePath, {
      AWS_PROFILE: awsProfile,
    })
  }

  if (credentialsType === 'secrets') {
    console.log(chalk.yellow('You can find or create secrets at https://console.aws.amazon.com/iam/home?#security_credential'))
    const awsAccessKeyId = await inquirer.prompt([
      {
        type: 'password',
        name: 'awsAccessKeyId',
        message: 'Enter your AWS access key id:',
        validate: input => input.length > 0,
      },
    ]).then(({ awsAccessKeyId }) => awsAccessKeyId)

    const awsSecretAccessKey = await inquirer.prompt([
      {
        type: 'password',
        name: 'awsSecretAccessKey',
        message: 'Enter your AWS secret access key:',
        validate: input => input.length > 0,
      },
    ]).then(({ awsSecretAccessKey }) => awsSecretAccessKey)

    const awsRegion = await inquirer.prompt([
      {
        type: 'list',
        name: 'awsRegion',
        message: 'Select your AWS region:',
        choices: [
          { name: 'US East (N. Virginia) - us-east-1', value: 'us-east-1' },
          { name: 'US East (Ohio) - us-east-2', value: 'us-east-2' },
          { name: 'US West (N. California) - us-west-1', value: 'us-west-1' },
          { name: 'US West (Oregon) - us-west-2', value: 'us-west-2' },
          { name: 'Canada (Central) - ca-central-1', value: 'ca-central-1' },
          { name: 'EU (Frankfurt) - eu-central-1', value: 'eu-central-1' },
          { name: 'EU (Ireland) - eu-west-1', value: 'eu-west-1' },
          { name: 'EU (London) - eu-west-2', value: 'eu-west-2' },
          { name: 'EU (Paris) - eu-west-3', value: 'eu-west-3' },
          { name: 'Asia Pacific (Tokyo) - ap-northeast-1', value: 'ap-northeast-1' },
          { name: 'Asia Pacific (Seoul) - ap-northeast-2', value: 'ap-northeast-2' },
          { name: 'Asia Pacific (Singapore) - ap-southeast-1', value: 'ap-southeast-1' },
          { name: 'Asia Pacific (Sydney) - ap-southeast-2', value: 'ap-southeast-2' },
          { name: 'South America (São Paulo) - sa-east-1', value: 'sa-east-1' },
        ],
      },
    ]).then(({ awsRegion }) => awsRegion)

    // Write AWS access key id and secret access key to .env file
    await writeDotenv(filePath, {
      AWS_ACCESS_KEY_ID: awsAccessKeyId,
      AWS_SECRET_ACCESS_KEY: awsSecretAccessKey,
      AWS_REGION: awsRegion,
    })
  }

  // Reload the .env file
  return resolveDotenv(STAGE).environment
}
