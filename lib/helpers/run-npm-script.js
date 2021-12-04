const spawn = require('child_process').spawn

const isWin = process.platform === 'win32'

module.exports = (script) => new Promise((resolve, reject) => {
  const npmBinary = isWin ? 'npm.cmd' : 'npm'
  const child = spawn(npmBinary, ['run', script])
  let stdout = ''
  child.stdout.on('data', (data) => {
    stdout += data
  })
  child.on('error', reject)
  child.on('close', (code) => {
    if (code === 0) {
      resolve(stdout)
    } else {
      reject(new Error(`npm script exited with code ${code}`))
    }
  })
})
