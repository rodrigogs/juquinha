// From https://github.com/hossamelmansy/automating-aws-with-nodejs/blob/a45e267eac6d52128c3a682dc9fa60f875dd269e/01-webotron/certificateManager.js

/**
 * Class representing a distribution in CloudFront.
 *
 * @class DistributionManager
 * @description used to manage all API calls to CloudFront distribution.
 * @author Hossam ELMansy <hossamelmansy.developer@gmail.com>
 */

import CloudFront from 'aws-sdk/clients/cloudfront'
import { v4 as uuidv4 } from 'uuid'

export default class DistributionManager {
  /**
   * @constructor
   */
  constructor () {
    this.cloudFront = new CloudFront({ apiVersion: 'latest' })
  }

  /**
   * Find distribution by domain name.
   * @function findDistribution
   * @param {string} domain - The domain name.
   * @returns {object} - The object containing distribution.
   */
  async findDistribution (domain = '') {
    const {
      DistributionList,
    } = await this.cloudFront.listDistributions().promise()

    for (const distribution of DistributionList.Items) {
      if (distribution.Aliases.Items.includes(domain)) return distribution
    }

    return null
  }

  /**
   * Create new distribution.
   * @function createDistribution
   * @param {object} params The params object.
   * @param {string} params.domain The domain name.
   * @param {string} params.certificateArn The certificate ARN.
   * @param {string} params.description The distribution description.
   * @returns {object} The object containing distribution.
   */
  async createDistribution ({ domain = '', certificateArn = '', description = '' } = {}) {
    const originId = `S3-${domain}`
    const originDomain = `${domain}.s3.amazonaws.com`
    const originAccessIdentityId = `access-identity-${originDomain}}`

    const { Distribution } = await this.cloudFront
      .createDistribution({
        DistributionConfig: {
          CallerReference: uuidv4(),
          Comment: description,
          DefaultCacheBehavior: {
            ForwardedValues: {
              Cookies: { Forward: 'all' },
              QueryString: false,
              Headers: { Quantity: 0 },
              QueryStringCacheKeys: { Quantity: 0 },
            },
            MinTTL: 3600,
            TargetOriginId: originId,
            TrustedSigners: { Enabled: false, Quantity: 0 },
            ViewerProtocolPolicy: 'redirect-to-https',
            DefaultTTL: 86400,
          },
          Enabled: true,
          Origins: {
            Items: [
              {
                DomainName: originDomain,
                Id: originId,
                S3OriginConfig: { OriginAccessIdentity: originAccessIdentityId },
              },
            ],
            Quantity: 1,
          },
          Aliases: {
            Items: [domain],
            Quantity: 1,
          },
          DefaultRootObject: 'index.html',
          ViewerCertificate: {
            ACMCertificateArn: certificateArn,
            SSLSupportMethod: 'sni-only',
            MinimumProtocolVersion: 'TLSv1.1_2016',
          },
        },
      })
      .promise()

    return Distribution
  }

  /**
   * Wait for the distribution to be deployed.
   * @function waitForDeploy
   * @param {string} distributionId Distribution ID.
   * @returns {object} The object containing distribution.
   */
  async waitForDeploy (distributionId = '') {
    const {
      Distribution,
    } = await this.cloudFront
      .waitFor('distributionDeployed', { Id: distributionId })
      .promise()

    return Distribution
  }
}
