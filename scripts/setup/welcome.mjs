import chalk from 'chalk'
import importJson from '@juquinha/lib/helpers/import-json.mjs'

export default async () => {
  const pkg = await importJson('../../package.json')
  console.log('')
  console.log(chalk.cyan(' ***********************'))
  console.log(chalk.cyan('  Welcome to'), chalk.white.bold(`${pkg.name}`))
  console.log(chalk.white(`  ${pkg.description}`))
  console.log(chalk.cyan('  Version'), chalk.white.bold(`${pkg.version}`))
  console.log(chalk.cyan(' ***********************'))
}
