const core = require('@actions/core')
const runNpmScript = require('lib/helpers/run-npm-script')
const chalk = require('chalk')

async function run () {
  try {
    const { output } = await runNpmScript('test:integration', { rejectOnNonZeroExitCode: false })
    // FIXME: this is a hack to get the output of the test script.
    // Even when all the tests passes, in the ci environment, the process returns a non-zero code.
    //
    // Extract the results from the output. The line should look like this:
    // Tests:       57 failed, 2 passed, 59 total
    // Or in case of success:
    // Tests:       57 passed, 59 total
    //
    // Parse the line and get the thest numbers.
    const testResults = output.split('\n').find(line => line.includes('Tests:  '))
    const numbersInLine = testResults
      .split(' ')
      .filter(word => word !== '')
      .filter(word => !isNaN(word))
      .map(Number)
    let failed = 0
    let passed = 0
    let total = 0
    if (numbersInLine.length === 3) {
      failed = numbersInLine[0]
      passed = numbersInLine[1]
      total = numbersInLine[2]
    } else if (numbersInLine.length === 2) {
      passed = numbersInLine[0]
      total = numbersInLine[1]
    } else {
      throw new Error(`Unexpected test results: ${testResults}`)
    }
    if (failed > 0) {
      core.setFailed(`${chalk.red(`${failed} tests failed`)}`)
    } else {
      core.setOutput('tests-total', total)
      core.setOutput('tests-passed-count', passed)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
