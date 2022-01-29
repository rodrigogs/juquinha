const core = require('@actions/core')
const runNpmScript = require('lib/helpers/run-npm-script')

async function run () {
  try {
    await runNpmScript('test:integration')
    process.exit(0)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
