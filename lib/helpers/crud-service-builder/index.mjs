import ServiceBuilder from '@juquinha/lib/helpers/service-builder.mjs'
import { capitalizeFirstLetter, kebabToCamel } from '@juquinha/lib/common/helpers/string.mjs'
import create from './create.mjs'
import list from './list.mjs'
import update from './update.mjs'
import remove from './remove.mjs'
import getOneById from './get-one-by-id.mjs'
import getOneByName from './get-one-by-name.mjs'

const DEFAULT_CRUD_OPERATIONS = {
  create,
  list,
  update,
  remove,
  getOneById,
  getOneByName,
}

const DEFAULT_BUILD_METHODS = ['create', 'update', 'remove', 'list', 'getOneById', 'getOneByName']

export default class CrudServiceBuilder extends ServiceBuilder {
  forEntity (entity, { buildMethods = DEFAULT_BUILD_METHODS } = {}) {
    this.name = `${capitalizeFirstLetter(kebabToCamel(entity))}Service`
    this.entity = entity
    this.addDependency(entity)
    buildMethods.forEach(method => {
      this.buildMethod(method)
    })
    return this
  }

  buildMethod (method) {
    this.addMethod(method, DEFAULT_CRUD_OPERATIONS[method](this.entity))
    return this
  }
}
