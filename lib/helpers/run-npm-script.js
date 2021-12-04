/* eslint-disable import/no-commonjs */
const spawn = require('child_process').spawn

module.exports = (script) => new Promise((resolve, reject) => {
  const child = spawn('npm', ['run', script])
  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })
  child.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`)
  })
  child.on('close', (code) => {
    if (code === 0) {
      resolve()
    } else {
      reject(new Error(`npm script exited with code ${code}`))
    }
  })
})
