import chalk from 'chalk'
import runNpmScript from '@juquinha/lib/helpers/run-npm-script.mjs'
import resolveStage from '../helpers/resolve-stage.mjs'
import resolveTestModes from './resolve-test-modes.mjs'

;(async () => {
  // eslint-disable-next-line no-process-env
  const environment = await resolveStage({ ...process.env })
  const testModes = await resolveTestModes(environment)

  const results = []

  if (testModes.UNIT) {
    const { exitCode } = await runNpmScript(['test:unit', '--colors'], { printOutput: true, rejectOnNonZeroExitCode: false })
    results.push({
      name: 'Unit',
      succeeded: exitCode === 0,
    })
  }

  if (testModes.INTEGRATION) {
    const { exitCode } = await runNpmScript(['test:integration', '--colors'], { printOutput: true, rejectOnNonZeroExitCode: false })
    results.push({
      name: 'Integration',
      succeeded: exitCode === 0,
    })
  }

  for (const result of results) {
    if (result.succeeded) {
      console.log(`${result.name} tests ${chalk.greenBright('succeeded')} 🎉`)
    } else {
      console.log(`${result.name} tests ${chalk.redBright('failed')} 😭`)
    }
  }

  if (results.some(result => !result.succeeded)) {
    process.exit(1)
  }

  process.exit(0)
})()
