global.PERMISSION_TYPES = ['ALLOW', 'DENY']
global.PERMISSION_METHODS = ['ALL', 'GET', 'POST', 'PUT', 'DELETE']

global.createRandomName = ({ gender, minLength = 8, maxLength = 40 } = {}) => {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789áóãõũúíÀÁÃÓÒÕ '
  let name = ''
  do {
    name += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
    // randonly breaks the loop after reaching min lrngth, so the name length is really random
    if (name.length >= minLength) {
      // 50% chance
      if (Math.random() < 0.5) {
        break
      }
    }
  } while (name.length < maxLength)
  return name.substring(0, maxLength).trim()
}
