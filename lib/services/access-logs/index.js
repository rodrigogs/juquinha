import CrudServiceBuilder from '@juquinha/lib/helpers/crud-service-builder'

const BUILD_METHODS = ['create', 'list']

export default new CrudServiceBuilder()
  .forEntity('access-logs', { buildMethods: BUILD_METHODS })
  .build()
