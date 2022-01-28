/* eslint-disable import/no-commonjs */
const spawn = require('child_process').spawn

const isWin = process.platform === 'win32'

module.exports = (script, showStdout = false) => new Promise((resolve, reject) => {
  const npmBinary = isWin ? 'npx.cmd' : 'npx'
  // eslint-disable-next-line no-process-env
  const child = spawn(npmBinary, ['pnpm', 'run', script], { env: process.env })
  let stdout = ''
  if (showStdout) child.stdout.pipe(process.stdout)
  child.stdout.on('data', (data) => {
    stdout += data
  })
  child.on('error', reject)
  child.on('close', (code) => {
    if (code === 0) {
      resolve(stdout)
    } else {
      reject(new Error(`pnpm script [${script}] exited with code ${code}`))
    }
  })
})
