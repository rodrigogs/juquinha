import os from 'os'
import { spawn } from 'child_process'
import chalk from 'chalk'

const isWin = process.platform === 'win32'

export default (script, {
  printOutput = false,
  rejectOnNonZeroExitCode = true,
} = {}) => new Promise((resolve, reject) => {
  const npmBinary = isWin ? 'npx.cmd' : 'npx'
  // eslint-disable-next-line no-process-env
  const child = spawn(npmBinary, ['pnpm', 'run', script, '--colors'], { env: process.env })
  let stdout = ''
  let stderr = ''
  let output = ''
  child.stdout.on('data', (data) => {
    stdout += data
    output += data
    if (printOutput) process.stdout.write(data)
  })
  child.stderr.on('data', (data) => {
    stderr += data
    output += data
    if (printOutput) console.log(data.toString()) // never log stderr
  })
  child.on('error', reject)
  child.on('close', (exitCode) => {
    if (exitCode === 0) {
      resolve({ exitCode, stdout, stderr, output })
    } else {
      if (rejectOnNonZeroExitCode) {
        reject(new Error(`pnpm script [${chalk.yellow(script)}] exited with code ${chalk.yellow(exitCode)}${os.EOL}${chalk.red(output)}`))
      } else {
        resolve({ exitCode, stdout, stderr, output })
      }
    }
  })
})
