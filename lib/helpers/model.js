/* eslint-disable import/no-commonjs */
const { isObject } = require('lib/common/helpers/object')
const dynamoose = require('dynamoose')
const NotFoundError = require('lib/errors/api/not-found')

/**
 * @class Model
 * @classdesc A class to build a model
 * @param {String} tableName The name of the table
 * @param {Object} [options] The options object
 * @param {Boolean} [options.optimisticLocking=false] Whether to enable optimistic locking
 * @param {String} [options.versionAttribute='__version'] The name of the version attribute
 */
module.exports = class Model {
  constructor (tableName, schema, options = {}) {
    if (typeof tableName !== 'string') throw new Error('tableName must be a string')
    if (!isObject(schema)) throw new Error('schema must be an object')
    if (options && !isObject(options)) throw new Error('options must be an object')

    let finalSchema = { ...schema }

    this.options = {
      ...options,
      optimisticLocking: options.optimisticLocking || false,
      versionAttribute: options.versionAttribute || '__version',
      create: false,
      update: false,
      waitForActive: false,
      saveUnknown: false,
      timestamps: true,
    }

    if (this.options.optimisticLocking) {
      finalSchema = {
        ...finalSchema,
        [this.options.versionAttribute]: finalSchema[this.options.versionAttribute] || {
          type: Number,
          default: 0,
        },
      }
    }

    this.tableName = tableName
    this.internalSchema = new dynamoose.Schema(finalSchema, this.options)
    this.internalModel = dynamoose.model(tableName, this.internalSchema, this.options)
    this.internalTable = new dynamoose.Table(tableName, [this.internalModel], this.options)
  }

  /**
   * Returns the schema object
   * @returns {dinamoose.Schema} The schema object
   */
  getSchema () {
    return this.internalSchema
  }

  /**
   * Returns the table name
   * @returns {String} The table name
   */
  getTableName () {
    return this.tableName
  }

  /**
   * Returns the options object
   * @returns {Object} The options object
   */
  getOptions () {
    return this.options
  }

  /**
   * Query the table
   * @param {String} key The key to query
   * @returns {dinamoose.Query} The query object
   */
  query (key) {
    return this.internalModel.query(key)
  }

  /**
   * Scan the table
   * @param {String} key The key to query
   * @returns {dinamoose.Scan} The scan object
   */
  scan (key) {
    return this.internalModel.scan(key)
  }

  /**
   * Query the table by index
   * @param {String} index The index to query
   * @param {String} key The key to query
   * @returns {Model} The query object
   */
  async create (data) {
    return this.internalModel.create(data)
  }

  /**
   * Get a record by id
   * @param {*} id The id of the record
   * @returns {Model} The query object
   */
  async get (id) {
    return this.internalModel.get(id)
  }

  /**
   * Delete a record by id
   * @param {*} id The id of the record
   * @returns {undefined}
   */
  async delete (id) {
    return this.internalModel.delete(id)
  }

  /**
   * Update a record by id
   * @param {*} id The id of the record
   * @param {Object} data The data to update
   * @returns {undefined}
   */
  async update (id, data) {
    const payload = { ...data }
    if (this.options.optimisticLocking) {
      await this.putNextVersion(id, payload)
    } else {
      await this.internalModel.update(id, payload)
    }
  }

  /**
   * Update a record by id using optimistic locking
   * @param {*} id The id of the record
   * @param {Object} data The data to update
   * @returns {Model} The query object
   */
  async putNextVersion (id, data) {
    const currentDoc = await this.get(id)
    if (!currentDoc) throw new NotFoundError(`No record found for id ${id}`)
    const currentVersion = currentDoc[this.options.versionAttribute]
    const nextVersion = currentVersion + 1
    const payload = {
      ...data,
      [this.options.versionAttribute]: nextVersion,
    }
    const condition = new dynamoose.Condition().where(this.options.versionAttribute).eq(currentVersion)
    try {
      await this.internalModel.update(id, payload, { condition })
    } catch (err) {
      if (err.name === 'ConditionalCheckFailedException') {
        throw new Error('The record has been updated by another user')
      }
      throw err
    }
  }
}
