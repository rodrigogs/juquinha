#!/usr/bin/env nodejs
/* eslint-disable no-console */

require('config/env')
const models = require('../lib/models')

;(async () => {
  const Models = Object.keys(models).filter((key) => key.endsWith('Model'))
  for (const modelKey of Models) {
    if (modelKey === 'AccessLogsModel') {
      continue
    }
    const Model = models[modelKey]
    const allDocuments = await Model.scan().all().exec()
    for (const document of allDocuments) {
      console.log(`Saving document ${document.id} of ${modelKey}`)
      if (modelKey === 'ConversationsModel') {
        if (!document.active) document.active = false
      }
      try {
        await document.save()
      } catch (err) {
        console.log(err)
      }
    }
  }
})()
