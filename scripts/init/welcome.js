const pkg = require('../../package.json')
const chalk = require('chalk')

module.exports = async () => {
  console.log('')
  console.log(chalk.cyan(' ***********************'))
  console.log(chalk.cyan('  Welcome to'), chalk.white.bold(`${pkg.name}`))
  console.log(chalk.white(`  ${pkg.description}`))
  console.log(chalk.cyan('  Version'), chalk.white.bold(`${pkg.version}`))
  console.log(chalk.cyan(' ***********************'))
}
