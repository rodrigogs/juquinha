import faker from 'faker'

global.PERMISSION_TYPES = ['ALLOW', 'DENY']
global.PERMISSION_METHODS = ['ALL', 'GET', 'POST', 'PUT', 'DELETE']

global.createRandomName = ({ gender, minLength = 8, maxLength = 25 } = {}) => {
  const names = [faker.name.firstName(gender)]
  let name = ''
  let index = 0
  do {
    if (index > 0) {
      names.push(faker.name.lastName(gender))
    } else {
      names.push(faker.name.middleName(gender))
    }
    name = names.join(' ')
    // randonly breaks the loop after reaching min lrngth, so the name length is really random
    if (name.length >= minLength) {
      // 50% chance
      if (Math.random() < 0.5) {
        break
      }
    }
    index++
  } while (name.length < maxLength)
  return name.substring(0, maxLength).trim()
}
