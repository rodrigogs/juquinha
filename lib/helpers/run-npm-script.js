/* eslint-disable import/no-commonjs */
const os = require('os')
const spawn = require('child_process').spawn

const isWin = process.platform === 'win32'

module.exports = (script, {
  rejectOnNonZeroExitCode = true,
}) => new Promise((resolve, reject) => {
  const npmBinary = isWin ? 'npx.cmd' : 'npx'
  // eslint-disable-next-line no-process-env
  const child = spawn(npmBinary, ['pnpm', 'run', script], { env: process.env })
  let stdout = ''
  let stderr = ''
  let output = ''
  child.stdout.on('data', (data) => {
    stdout += data
    output += data
    console.log(data.toString())
  })
  child.stderr.on('data', (data) => {
    stderr += data
    output += data
    console.log(data.toString()) // never log stderr
  })
  child.on('error', reject)
  child.on('close', (code) => {
    if (code === 0) {
      resolve({ stdout, stderr, output })
    } else {
      if (rejectOnNonZeroExitCode) {
        reject(new Error(`pnpm script [${script}] exited with code ${code}${os.EOL}${stderr}`))
      } else {
        resolve({ stdout, stderr, output })
      }
    }
  })
})
