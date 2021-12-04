/* eslint-disable import/no-commonjs */
const deepMerge = require('deepmerge')
const defaultRecipe = require('config/default-recipe')
const defaultApiRecipe = require('config/default-api-recipe')
const defaultFunctionRecipe = require('config/default-function-recipe')

/**
 * @class RecipeBuilder
 * @see https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml
 * @param {Object} [recipeObj] Optional recipe object to use instead of the default
 */
module.exports = class RecipeBuilder {
  constructor (recipeObj = defaultRecipe) {
    this.__recipe = deepMerge({}, recipeObj)
  }

  /**
   * Adds api common configuration for the recipe
   * @returns {RecipeBuilder} this Builder instance
   */
  forApi () {
    this.__recipe = deepMerge(defaultApiRecipe, this.__recipe)
    return this
  }

  /**
   * Sets the validation mode
   * @returns {RecipeBuilder} this Builder instance
   */
  setConfigValidationMode (mode) {
    this.__recipe.configValidationMode = mode
    return this
  }

  /**
   * @param {String} [org] Serverless org
   * @returns {RecipeBuilder} this Builder instance
   */
  setOrg (org) {
    this.__recipe.org = org
    return this
  }

  /**
   * @param {String} app Serverless app name
   * @returns {RecipeBuilder} this Builder instance
   */
  setApp (app) {
    this.__recipe.app = app
    return this
  }

  /**
   * @param {String} pluginName Serverless plugin name
   * @returns {RecipeBuilder} this Builder instance
   */
  setService (serviceName) {
    this.__recipe.service = serviceName
    return this
  }

  /**
   * @param {String} pluginName Serverless plugin name
   * @returns {RecipeBuilder} this Builder instance
   */
  addPlugin (pluginName) {
    this.__recipe.plugins = Array.from(new Set([...this.__recipe.plugins, pluginName]))
    return this
  }

  /**
   * @param {String[]} pluginNames Serverless plugin names
   * @returns {RecipeBuilder} this Builder instance
   */
  addPlugins (pluginNames) {
    this.__recipe.plugins = Array.from(new Set([...this.__recipe.plugins, ...pluginNames]))
    return this
  }

  /**
   * @param {String} customKey Custom key
   * @param {*} customValue Custom value
   * @returns {RecipeBuilder} this Builder instance
   */
  setCustom (key, value) {
    this.__recipe.custom = this.__recipe.custom || {}
    this.__recipe.custom[key] = value
    return this
  }

  /**
   * Provider object will be merged with default recipe provider
   * @param {Object} providerObject Serverless provider object
   * @returns {RecipeBuilder} this Builder instance
   */
  setProvider (providerObject) {
    this.__recipe.provider = deepMerge(this.__recipe.provider || {}, providerObject)
    return this
  }

  /**
   * @param {Object} recipe Serverless recipe object
   * @returns {RecipeBuilder} this Builder instance
   */
  setPackage (packageObject) {
    this.__recipe.package = deepMerge(this.__recipe.package || {}, packageObject)
    return this
  }

  /**
   * @param {String} resourceName Resource name
   * @param {Object} resourceObject AWS resource object
   * @returns {RecipeBuilder} this Builder instance
   */
  addResource (resourceName, resourceObject) {
    this.__recipe.resources = this.__recipe.resources || {}
    this.__recipe.resources.Resources = this.__recipe.resources.Resources || {}
    this.__recipe.resources.Resources[resourceName] = resourceObject
    return this
  }

  /**
   * @returns {Object} outputName AWS output name
   * @returns {Object} outputValue AWS output value
   * @returns {RecipeBuilder} this Builder instance
   */
  addOutput (outputName, outputObject) {
    this.__recipe.resources = this.__recipe.resources || {}
    this.__recipe.resources.Outputs = this.__recipe.resources.Outputs || {}
    this.__recipe.resources.Outputs[outputName] = outputObject
    return this
  }

  /**
   * @param {String} functionName Lambda function name
   * @param {Object} functionObject Lambda function object
   * @returns {RecipeBuilder} this Builder instance
   */
  addFunction (functionName, functionObject) {
    this.__recipe.functions = this.__recipe.functions || {}
    this.__recipe.functions[functionName] = deepMerge(defaultFunctionRecipe, functionObject)
    return this
  }

  /**
   * @param {Object} environment Environment object
   * @returns {RecipeBuilder} this Builder instance
   */
  setEnvironment (environment) {
    this.__recipe.provider = this.__recipe.provider || {}
    this.__recipe.provider.environment = { ...this.__recipe.provider.environment, ...environment }
    return this
  }

  /**
   * @returns {Object} recipe Serverless recipe object
   */
  build () {
    return {
      ...this.__recipe,
      plugins: Array.from(new Set(this.__recipe.plugins)),
    }
  }
}
