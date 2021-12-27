/**
 * @class ServiceBuilder
 * @param {Object} config Configuration object
 * @param {String} config.name Service name
 * @param {Number} config.version Service version
 * @param {String} config.description Service description
 * @param {String} config.entity Service entity
 * @param {Object} config.methods Service methods
 * @param {String[]} config.dependencies Service dependencies
 */
export default class ServiceBuilder {
  constructor ({ name, version, description, entity, methods, dependencies } = {}) {
    this.name = name
    this.version = version
    this.description = description
    this.entity = entity
    this.methods = methods
    this.dependencies = dependencies
  }

  /**
   * @param {String} name Service name
   * @returns {ServiceBuilder} this Builder instance
   */
  setName (name) {
    if (typeof name !== 'string') throw new Error('name must be a string')
    this.name = name
    return this
  }

  /**
   * @param {Number} version Service version
   * @returns {ServiceBuilder} this Builder instance
   */
  setVersion (version = 0) {
    if (typeof version !== 'number') throw new Error('version must be a number')
    this.version = version
    return this
  }

  /**
   * @param {String} description Service description
   * @returns {ServiceBuilder} this Builder instance
   */
  setDescription (description) {
    this.description = description
    return this
  }

  /**
   * @param {String} method Method name
   * @param {Function} func Method function
   * @returns {ServiceBuilder} this Builder instance
   */
  addMethod (method, func) {
    this.methods = this.methods || {}
    this.methods[method] = func.bind(this)
    return this
  }

  /**
   * @param {String} dependency Service dependency
   * @returns {ServiceBuilder} this Builder instance
   */
  addDependency (dependency) {
    this.dependencies = this.dependencies || []
    this.dependencies.push(dependency)
    return this
  }

  /**
   * Builds the service with service metadata and methods in the root of the service
   * @returns {Object} Service object
   */
  build () {
    return {
      name: this.name,
      version: this.version,
      description: this.description,
      methods: this.methods,
      dependencies: this.dependencies,
      ...this.methods,
    }
  }
}
