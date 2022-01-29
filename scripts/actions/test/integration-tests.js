const core = require('@actions/core')
const runNpmScript = require('lib/helpers/run-npm-script')
const chalk = require('chalk')

async function run () {
  try {
    const { output } = await runNpmScript('test:integration', { rejectOnNonZeroExitCode: false })
    // FIXME: this is a hack to get the output of the test script.
    // Even when all the tests passes, in the ci environment, the process returns a non-zero code.
    //
    // check if stdout has a line that contains 'Tests:       {x} passed, {x} total'
    // where {x} is a number and must be equal for passed and total
    const regex = '/Tests:       (\\d+) passed, (\\d+) total/'
    const match = output.match(regex)
    if (match) {
      const passed = Number(match[1])
      const total = Number(match[2])
      if (passed === total) {
        core.setOutput('passed', passed)
        core.setOutput('total', total)
        process.exit(0)
      } else {
        core.setFailed(`Only ${chalk.yellow(passed)} of ${chalk.red(total)} tests passed.`)
      }
    }
    core.setFailed('Failed to parse stdout')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
