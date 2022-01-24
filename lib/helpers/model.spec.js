import Model from 'lib/helpers/model'

describe('Model', () => {
  it('should be a class', () => {
    expect(Model).toBeInstanceOf(Function)
  })

  it('should have a constructor', () => {
    expect(Model.constructor).toBeInstanceOf(Function)
  })

  it('should instantiate a new Model', () => {
    const model = new Model('users', { id: String }, {})
    expect(model).toBeInstanceOf(Model)
  })

  it('should throw an error if no tableName is provided', () => {
    expect(() => new Model()).toThrowError(/tableName/)
  })

  it('should throw an error if no schema is provided', () => {
    expect(() => new Model('users')).toThrowError(/schema/)
  })

  it('should throw an error if options is not an object', () => {
    expect(() => new Model('users', {}, 'options')).toThrowError(/options/)
  })

  it('should have a getSchema method', () => {
    const model = new Model('users', { id: String }, {})
    expect(model.getSchema).toBeInstanceOf(Function)
  })

  it('should have a getTableName method', () => {
    const model = new Model('users', { id: String }, {})
    expect(model.getTableName).toBeInstanceOf(Function)
    const tableName = model.getTableName()
    expect(tableName).toBe('users')
  })

  it('should have a getOptions method', () => {
    const model = new Model('users', { id: String }, {})
    expect(model.getOptions).toBeInstanceOf(Function)
    const options = model.getOptions()
    expect(options).toBeInstanceOf(Object)
  })
})
