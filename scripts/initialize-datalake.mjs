#!/usr/bin/env nodejs
import '@juquinha/config/env.mjs'
import * as models from '@juquinha/lib/models/index.mjs'

const Models = Object.keys(models).filter((key) => key.endsWith('Model'))

;(async () => {
  for (const modelKey of Models) {
    if (modelKey === 'AccessLogsModel') {
      continue
    }
    // eslint-disable-next-line import/namespace
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
