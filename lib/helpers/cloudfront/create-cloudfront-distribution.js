/* eslint-disable import/no-commonjs */
const { STAGE, REGION, APP_PREFIX, DOMAIN_NAME, WEB_APP_BUCKET_NAME } = require('config/env')
const CertificateManager = require('./certificate-manager')
const DistributionManager = require('./distribution-manager')

const certificateManager = new CertificateManager()
const distributionManager = new DistributionManager()

module.exports = async ({ domain = DOMAIN_NAME }) => {
  const certificate = await certificateManager.findCertificate(domain)
  if (!certificate) console.log(`Certificate not found for domain ${domain}`)

  const distribution = await distributionManager.findDistribution(domain)
  if (distribution) {
    console.log(`Found existing CloudFront distribution: ${distribution.DomainName}`)
    return distribution
  }

  console.log(`Creating CloudFront distribution for ${domain}`)
  const dist = await distributionManager.createDistribution({
    domain: WEB_APP_BUCKET_NAME,
    certificateArn: (certificate || {}).CertificateArn,
    description: `App: ${APP_PREFIX} Region: ${REGION} Stage: ${STAGE}`,
  })
  console.log(`Waiting for CloudFront distribution ${dist.DomainName} to be deployed...`)
  await distributionManager.waitForDeploy(dist.Id)

  return dist
}
