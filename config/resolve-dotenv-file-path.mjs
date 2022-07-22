import fs from 'fs'
import path from 'path'
import dirname from './__dirname.cjs'

export default (stage) => {
  if (!stage) throw new Error('stage is required')

  let fileName = {
    dev: '.env', // Development defaults to .env for convenience
  }[stage] || `.env.${stage}`

  // If stage is dev, check for .env.dev file
  if (stage === 'dev') {
    const devFile = path.join(process.cwd(), '.env.dev')
    if (fs.existsSync(devFile)) fileName = '.env.dev'
  }

  return path.join(dirname, '..', fileName)
}
