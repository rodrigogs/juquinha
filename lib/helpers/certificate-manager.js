/* eslint-disable import/no-commonjs */
// From https://github.com/hossamelmansy/automating-aws-with-nodejs/blob/a45e267eac6d52128c3a682dc9fa60f875dd269e/01-webotron/certificateManager.js

/**
 * Class representing a ACM certificate.
 *
 * @class CertificateManager
 * @description used to manage all API calls to ACM certificate.
 * @author Hossam ELMansy <hossamelmansy.developer@gmail.com>
 */

const ACM = require('aws-sdk/clients/acm')

class CertificateManager {
  /**
    * @constructor
    */
  constructor () {
    this.acm = new ACM({ apiVersion: 'latest' })
  }

  /**
    * Find the certificate in the ACM.
    * @function findCertificate
    * @param {string} domain - The domain name.
    * @returns {object} - The certificate object.
    */
  async findCertificate (domain = '') {
    // get certificates list
    const { CertificateSummaryList } = await this.acm
      .listCertificates({ CertificateStatuses: ['ISSUED'] })
      .promise()

    // for loop certificates and get each certificate details
    for (const certificateSummary of CertificateSummaryList) {
      const { Certificate } = await this.acm
        .describeCertificate({
          CertificateArn: certificateSummary.CertificateArn,
        })
        .promise()

      // loop through certificate's SubjectAlternativeNames to find the matching which domain name
      for (const subjectAlternateName of Certificate.SubjectAlternativeNames) {
        if (subjectAlternateName === domain) return Certificate
        if (
          subjectAlternateName.charAt(0) === '*' &&
           domain.endsWith(subjectAlternateName.slice(1))
        ) { return Certificate }
      }
    }

    return null
  }
}

module.exports = CertificateManager
